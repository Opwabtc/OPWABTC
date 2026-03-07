/**
 * USDOP.ts — USD on OPNet (yield reward token)
 *
 * FIXES APPLIED:
 *   CF-13 MEDIUM:  setMinter() lock after first set — prevent post-deploy minter swap
 *   CF-14 LOW:     import path as-bignum → @btc-vision/as-bignum/assembly
 *   HIGH #6:       onUpdate() lifecycle hook
 *   HIGH #13:      per-epoch mint cap (10M USDOP per 144 blocks)
 *   HIGH #41:      correct OP_NET method signatures (@method decorator + Calldata pattern)
 *
 * Minter: only YieldVault address (set once, locked forever after)
 * Epoch:  144 blocks (~1 Bitcoin day), max 10M USDOP mintable per epoch
 */
// FIX CF-14: was 'as-bignum/assembly'
import { u256 } from '@btc-vision/as-bignum/assembly';
import { OP20 } from '@btc-vision/btc-runtime/runtime/contracts/OP20';
import {
    Blockchain,
    Address,
    Calldata,
    BytesWriter,
    Revert,
    SafeMath,
    StoredAddress,
    StoredU256,
    NetEvent,
    OP20InitParameters,
    EMPTY_POINTER,
} from '@btc-vision/btc-runtime/runtime';

// Fixed storage pointers (NOT Blockchain.nextPointer — must be deterministic across upgrades)
const POINTER_MINTER:        u16 = 200;
const POINTER_MINTER_LOCKED: u16 = 201;
const POINTER_EPOCH_MINT:    u16 = 202;
const POINTER_EPOCH_BLOCK:   u16 = 203;

// Epoch: 144 blocks ≈ 1 Bitcoin day
const EPOCH_BLOCKS: u64 = 144;

// Max 10M USDOP per epoch (8 decimals → 10_000_000 × 10^8)
const MAX_EPOCH_MINT: u256 = u256.fromString('1000000000000000'); // 10M × 10^8

// Max supply: 100B USDOP (8 decimals)
const MAX_SUPPLY: u256 = u256.fromString('10000000000000000000'); // 100B × 10^8

// ── NetEvent concrete subclasses ──────────────────────────────────────────────
@final
class MinterChangedEvent extends NetEvent {
    constructor(minter: Address) {
        const data = new BytesWriter(32);
        data.writeAddress(minter);
        super('MinterChanged', data);
    }
}

@final
class MintUSDOPEvent extends NetEvent {
    constructor(to: Address, amount: u256) {
        const data = new BytesWriter(64);
        data.writeAddress(to);
        data.writeU256(amount);
        super('MintUSDOP', data);
    }
}

@final
export class USDOP extends OP20 {
    // FIX HIGH #41: use StoredAddress/StoredU256 — not raw Blockchain.getStorage*
    private _minter:       StoredAddress = new StoredAddress(POINTER_MINTER);
    private _minterLocked: StoredU256    = new StoredU256(POINTER_MINTER_LOCKED, EMPTY_POINTER);
    private _epochMint:    StoredU256    = new StoredU256(POINTER_EPOCH_MINT,    EMPTY_POINTER);
    private _epochBlock:   StoredU256    = new StoredU256(POINTER_EPOCH_BLOCK,   EMPTY_POINTER);

    public constructor() {
        super();
    }

    public override onDeployment(_calldata: Calldata): void {
        this.instantiate(
            new OP20InitParameters(
                MAX_SUPPLY,
                8,
                'USD on OPNet',
                'USDOP',
            ),
        );
    }

    // FIX HIGH #6: required lifecycle hook
    public onUpdate(_calldata: Calldata): void {}

    // ── setMinter(address) ────────────────────────────────────────────────────
    // FIX CF-13: once set and locked, minter CANNOT be changed.
    // This prevents the deployer from swapping the minter to a malicious address
    // after users have staked.

    @method({ name: 'minter', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setMinter(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        // FIX CF-13: reject if already locked
        if (!this._minterLocked.value.isZero()) {
            throw new Revert('USDOP: minter already locked — cannot change');
        }

        const minter = calldata.readAddress();
        if (minter.equals(Address.zero())) throw new Revert('USDOP: zero address');

        this._minter.value       = minter;
        this._minterLocked.value = u256.One; // lock forever

        Blockchain.emit(new MinterChangedEvent(minter));

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── getMinter() ───────────────────────────────────────────────────────────

    @method()
    @returns({ name: 'minter', type: ABIDataTypes.ADDRESS })
    public getMinter(_calldata: Calldata): BytesWriter {
        const result = new BytesWriter(33); // FIX 5.41: Address = 33 bytes
        result.writeAddress(this._minter.value);
        return result;
    }

    // ── mint(to, amount) ──────────────────────────────────────────────────────
    // Only callable by the locked minter (YieldVault).
    // FIX HIGH #13: per-epoch mint cap enforced.

    @method(
        { name: 'to',     type: ABIDataTypes.ADDRESS },
        { name: 'amount', type: ABIDataTypes.UINT256 },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public mintUSDOP(calldata: Calldata): BytesWriter {
        const sender = Blockchain.tx.sender;
        const minter = this._minter.value;

        if (minter.equals(Address.zero())) throw new Revert('USDOP: minter not set');
        if (!sender.equals(minter))        throw new Revert('USDOP: only minter can mint');

        const to     = calldata.readAddress();
        const amount = calldata.readU256();
        if (amount.isZero()) throw new Revert('USDOP: amount must be > 0');

        // FIX HIGH #13: epoch cap
        const currentBlock = u256.fromU64(Blockchain.block.number);
        const epochStart   = this._epochBlock.value;
        let   epochMinted  = this._epochMint.value;

        // Check if we're in a new epoch (currentBlock - epochStart >= EPOCH_BLOCKS)
        const blocksSinceEpoch = SafeMath.sub(currentBlock, epochStart);
        if (u256.ge(blocksSinceEpoch, u256.fromU64(EPOCH_BLOCKS))) {
            // New epoch — reset counter
            this._epochBlock.value = currentBlock;
            epochMinted = u256.Zero;
        }

        const newEpochTotal = SafeMath.add(epochMinted, amount);
        if (u256.gt(newEpochTotal, MAX_EPOCH_MINT)) {
            throw new Revert('USDOP: epoch mint cap exceeded — max 10M USDOP per day');
        }

        // CEI: update epoch counter BEFORE minting
        this._epochMint.value = newEpochTotal;

        // Mint via parent OP20
        this._mint(to, amount);

        Blockchain.emit(new MintUSDOPEvent(to, amount));

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }
}
