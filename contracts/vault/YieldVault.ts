import { u256 } from '@btc-vision/as-bignum/assembly';
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
} from '@btc-vision/btc-runtime/runtime';
import {
    SELECTOR_BYTE_LENGTH,
    ADDRESS_BYTE_LENGTH,
    U256_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

// 420 block timelock before unstake is allowed
const TIMELOCK_BLOCKS: u64 = 420;

// Reward: staked * blocksElapsed / 100
// (100 OPWAY staked × 1 block = 1 USDOP, both 8 decimals)
const REWARD_DIVISOR: u256 = u256.fromU64(100);

@final
export class YieldVault extends ReentrancyGuard {
    // Contract addresses configured after deploy
    private _opway: StoredAddress  = new StoredAddress(Blockchain.nextPointer);
    private _usdop: StoredAddress  = new StoredAddress(Blockchain.nextPointer);

    // Per-user storage (keyed by u256.fromUint8ArrayBE(address))
    private _stakes:        StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);
    private _depositBlocks: StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);
    private _lastClaims:    StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);

    public constructor() {
        super();
    }

    // ── Config ────────────────────────────────────────────────────────────────

    @method(
        { name: 'opway', type: ABIDataTypes.ADDRESS },
        { name: 'usdop', type: ABIDataTypes.ADDRESS },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setAddresses(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        this._opway.value = calldata.readAddress();
        this._usdop.value = calldata.readAddress();
        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── Stake ─────────────────────────────────────────────────────────────────
    // (reentrancy protection is automatic via ReentrancyGuard.onExecutionStarted/Completed)

    @method({ name: 'amount', type: ABIDataTypes.UINT256 })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public stake(calldata: Calldata): BytesWriter {
        const opway = this._opway.value;
        if (opway.equals(Address.zero())) throw new Revert('YieldVault: addresses not configured');

        const amount = calldata.readU256();
        if (amount.isZero()) throw new Revert('YieldVault: amount must be > 0');

        const sender = Blockchain.tx.sender;
        const key    = u256.fromUint8ArrayBE(sender);

        // Must not already have an active stake
        const existing = this._stakes.get(key);
        if (!existing.isZero()) throw new Revert('YieldVault: already staked — unstake first');

        // Pull OPWAY tokens from user (requires prior approve)
        TransferHelper.transferFrom(opway, sender, this.address, amount);

        const currentBlock = u256.fromU64(Blockchain.block.number);
        this._stakes.set(key, amount);
        this._depositBlocks.set(key, currentBlock);
        this._lastClaims.set(key, currentBlock);

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

        const lastClaim      = this._lastClaims.get(key);
        const currentBlock   = u256.fromU64(Blockchain.block.number);
        const blocksElapsed  = SafeMath.sub(currentBlock, lastClaim);
        const rewards        = SafeMath.div(SafeMath.mul(staked, blocksElapsed), REWARD_DIVISOR);

        if (!rewards.isZero()) {
            this._mintUSDOP(usdop, sender, rewards);
        }
        this._lastClaims.set(key, currentBlock);

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

        if (currentBlock < unlockBlock) {
            throw new Revert('YieldVault: timelock active');
        }

        // Auto-claim pending rewards before returning principal
        if (!usdop.equals(Address.zero())) {
            const lastClaim     = this._lastClaims.get(key);
            const blocksElapsed = SafeMath.sub(currentBlock, lastClaim);
            const rewards       = SafeMath.div(SafeMath.mul(staked, blocksElapsed), REWARD_DIVISOR);
            if (!rewards.isZero()) {
                this._mintUSDOP(usdop, sender, rewards);
            }
        }

        // Return staked OPWAY to user
        TransferHelper.transfer(opway, sender, staked);

        // Clear state
        this._stakes.set(key, u256.Zero);
        this._depositBlocks.set(key, u256.Zero);
        this._lastClaims.set(key, u256.Zero);

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
        if (!staked.isZero() && currentBlock > lastClaim) {
            const blocksElapsed = SafeMath.sub(currentBlock, lastClaim);
            rewards = SafeMath.div(SafeMath.mul(staked, blocksElapsed), REWARD_DIVISOR);
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
        Blockchain.call(usdop, cd);
    }
}
