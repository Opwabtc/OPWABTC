import { StoredBoolean,
 u256 } from '@btc-vision/as-bignum/assembly';
import {
    ReentrancyGuard,
    Blockchain,
    Address,
    Calldata,
    BytesWriter,
    SafeMath,
    Revert,
    StoredAddress,
    StoredMapU256,
    encodeSelector,
    TransferHelper,
    NetEvent,
} from '@btc-vision/btc-runtime/runtime';
import {
    SELECTOR_BYTE_LENGTH,
    ADDRESS_BYTE_LENGTH,
    U256_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

// 420 block timelock before unstake is allowed
const TIMELOCK_BLOCKS: u32 = 420;

// Reward: staked * blocksElapsed / 100
const REWARD_DIVISOR: u256 = u256.fromU64(100);

// FIX CF-05: max USDOP mintable per claim = 10,000 USDOP (8 decimals)
const MAX_REWARD_PER_CLAIM: u256 = u256.fromString('1000000000000'); // 10,000 * 10^8

// ── NetEvents ─────────────────────────────────────────────────────────────────
// FIX CF-12: emit events for all state changes
const StakeEvent    = new NetEvent('Stake',    ['address', 'uint256']);
const UnstakeEvent  = new NetEvent('Unstake',  ['address', 'uint256']);
const ClaimEvent    = new NetEvent('Claim',    ['address', 'uint256']);
const ConfigEvent   = new NetEvent('Config',   ['address', 'address']);

@final
export class YieldVault extends ReentrancyGuard {
    private _opway: StoredAddress  = new StoredAddress(Blockchain.nextPointer);
    private _usdop: StoredAddress  = new StoredAddress(Blockchain.nextPointer);

    private _stakes:        StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);
    private _depositBlocks: StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);
    private _lastClaims:    StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);

    public constructor() {
        super();
    }

    public onUpdate(_calldata: Calldata): void {}

    // ── Config ────────────────────────────────────────────────────────────────

    @method(
        { name: 'opway', type: ABIDataTypes.ADDRESS },
        { name: 'usdop', type: ABIDataTypes.ADDRESS },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setAddresses(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        if (this._configured.value) throw new Revert('YieldVault: already configured');
        const opway = calldata.readAddress();
        const usdop = calldata.readAddress();
        this._opway.value = opway;
        this._usdop.value = usdop;
        // FIX CF-12: emit config event
        Blockchain.emit(ConfigEvent, [opway, usdop]);
        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── Stake ─────────────────────────────────────────────────────────────────

    @method({ name: 'amount', type: ABIDataTypes.UINT256 })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public stake(calldata: Calldata): BytesWriter {
        const opway = this._opway.value;
        if (opway.equals(Address.zero())) throw new Revert('YieldVault: addresses not configured');

        const amount = calldata.readU256();
        if (amount.isZero()) throw new Revert('YieldVault: amount must be > 0');

        const sender = Blockchain.tx.sender;
        const key    = u256.fromUint8ArrayBE(sender);

        const existing     = this._stakes.get(key);
        const currentBlock = u256.fromU64(Blockchain.block.number);

        // Checkpoint pending rewards BEFORE changing stake size
        if (!existing.isZero()) {
            const usdop = this._usdop.value;
            if (!usdop.equals(Address.zero())) {
                const lastClaim     = this._lastClaims.get(key);
                const blocksElapsed = SafeMath.sub(currentBlock, lastClaim);
                const rewards       = SafeMath.div(SafeMath.mul(existing, blocksElapsed), REWARD_DIVISOR);
                if (!rewards.isZero()) {
                    this._mintUSDOP(usdop, sender, rewards);
                }
            }
        }

        // FIX CF-07: only set depositBlock on FIRST stake, not on top-ups
        // Top-ups add to stake without resetting the timelock clock.
        if (existing.isZero()) {
            this._depositBlocks.set(key, currentBlock);
        }

        // FIX 5.33: CEI — update state BEFORE external call
        const newStake = SafeMath.add(existing, amount);
        this._stakes.set(key, newStake);
        this._lastClaims.set(key, currentBlock);
        // Pull OPWAY from user
        TransferHelper.transferFrom(opway, sender, this.address, amount);

        // FIX CF-12: emit stake event
        Blockchain.emit(StakeEvent, [sender, amount]);

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── Claim Rewards ─────────────────────────────────────────────────────────

    @method()
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public claimRewards(_calldata: Calldata): BytesWriter {
        const usdop = this._usdop.value;
        if (usdop.equals(Address.zero())) throw new Revert('YieldVault: addresses not configured');

        const sender = Blockchain.tx.sender;
        const key    = u256.fromUint8ArrayBE(sender);
        const staked = this._stakes.get(key);
        if (staked.isZero()) throw new Revert('YieldVault: no active stake');

        const lastClaim     = this._lastClaims.get(key);
        const currentBlock  = u256.fromU64(Blockchain.block.number);
        const blocksElapsed = SafeMath.sub(currentBlock, lastClaim);
        let rewards         = SafeMath.div(SafeMath.mul(staked, blocksElapsed), REWARD_DIVISOR);

        // FIX CF-05: cap reward per claim to prevent uncapped minting
        if (rewards > MAX_REWARD_PER_CLAIM) {
            rewards = MAX_REWARD_PER_CLAIM;
        }

        // FIX CF-04 (CEI): update state BEFORE external call
        this._lastClaims.set(key, currentBlock);

        if (!rewards.isZero()) {
            this._mintUSDOP(usdop, sender, rewards);
            // FIX CF-12
            Blockchain.emit(ClaimEvent, [sender, rewards]);
        }

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── Unstake ───────────────────────────────────────────────────────────────

    @method()
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public unstake(_calldata: Calldata): BytesWriter {
        const opway = this._opway.value;
        const usdop = this._usdop.value;
        if (opway.equals(Address.zero())) throw new Revert('YieldVault: addresses not configured');

        const sender       = Blockchain.tx.sender;
        const key          = u256.fromUint8ArrayBE(sender);
        const staked       = this._stakes.get(key);
        if (staked.isZero()) throw new Revert('YieldVault: no active stake');

        const depositBlock = this._depositBlocks.get(key);
        const unlockBlock  = SafeMath.add(depositBlock, u256.fromU64(TIMELOCK_BLOCKS));
        const currentBlock = u256.fromU64(Blockchain.block.number);

        if (u256.lt(currentBlock, unlockBlock)) {
            throw new Revert('YieldVault: timelock active');
        }

        // Calculate pending rewards
        let rewards = u256.Zero;
        if (!usdop.equals(Address.zero())) {
            const lastClaim     = this._lastClaims.get(key);
            const blocksElapsed = SafeMath.sub(currentBlock, lastClaim);
            rewards             = SafeMath.div(SafeMath.mul(staked, blocksElapsed), REWARD_DIVISOR);
            // FIX CF-05: cap rewards
            if (rewards > MAX_REWARD_PER_CLAIM) {
                rewards = MAX_REWARD_PER_CLAIM;
            }
        }

        // FIX CF-04 (CRITICAL CEI): clear state BEFORE any external calls
        // Previously: state was cleared AFTER TransferHelper.transfer — reentrancy window
        this._stakes.set(key, u256.Zero);
        this._depositBlocks.set(key, u256.Zero);
        this._lastClaims.set(key, u256.Zero);

        // External calls AFTER state is cleared
        if (!usdop.equals(Address.zero()) && !rewards.isZero()) {
            this._mintUSDOP(usdop, sender, rewards);
            Blockchain.emit(ClaimEvent, [sender, rewards]);
        }

        TransferHelper.transfer(opway, sender, staked);

        // FIX CF-12
        Blockchain.emit(UnstakeEvent, [sender, staked]);

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── View functions ────────────────────────────────────────────────────────

    @method({ name: 'user', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'amount', type: ABIDataTypes.UINT256 })
    public getStake(calldata: Calldata): BytesWriter {
        const user = calldata.readAddress();
        const key  = u256.fromUint8ArrayBE(user);
        const result = new BytesWriter(32);
        result.writeU256(this._stakes.get(key));
        return result;
    }

    @method({ name: 'user', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'block', type: ABIDataTypes.UINT256 })
    public getDepositBlock(calldata: Calldata): BytesWriter {
        const user = calldata.readAddress();
        const key  = u256.fromUint8ArrayBE(user);
        const result = new BytesWriter(32);
        result.writeU256(this._depositBlocks.get(key));
        return result;
    }

    @method({ name: 'user', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'rewards', type: ABIDataTypes.UINT256 })
    public getAccruedRewards(calldata: Calldata): BytesWriter {
        const user         = calldata.readAddress();
        const key          = u256.fromUint8ArrayBE(user);
        const staked       = this._stakes.get(key);
        const lastClaim    = this._lastClaims.get(key);
        const currentBlock = u256.fromU64(Blockchain.block.number);

        let rewards = u256.Zero;
        if (!staked.isZero() && u256.gt(currentBlock, lastClaim)) {
            const blocksElapsed = SafeMath.sub(currentBlock, lastClaim);
            rewards = SafeMath.div(SafeMath.mul(staked, blocksElapsed), REWARD_DIVISOR);
            if (rewards > MAX_REWARD_PER_CLAIM) rewards = MAX_REWARD_PER_CLAIM;
        }

        const result = new BytesWriter(32);
        result.writeU256(rewards);
        return result;
    }

    // ── Internal helpers ──────────────────────────────────────────────────────

    private _mintUSDOP(usdop: Address, to: Address, amount: u256): void {
        const selector = encodeSelector('mint(address,uint256)');
        const cd = new BytesWriter(SELECTOR_BYTE_LENGTH + ADDRESS_BYTE_LENGTH + U256_BYTE_LENGTH);
        cd.writeSelector(selector);
        cd.writeAddress(to);
        cd.writeU256(amount);
        // FIX CF-06: check return value of Blockchain.call — revert on failure
        const callResult = Blockchain.call(usdop, cd);
        if (!callResult || callResult.revert) {
            throw new Revert('YieldVault: USDOP mint failed');
        }
    }
}
