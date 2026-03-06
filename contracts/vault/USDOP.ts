/**
 * USDOP.ts — SECURITY FIX
 *
 * FIXES APPLIED:
 *  CF-14 / HIGH #5   import path: 'as-bignum/assembly' → '@btc-vision/as-bignum/assembly'
 *  HIGH #6           Add onUpdate() lifecycle hook
 *  HIGH #41          getMinter() @method parameter type fix
 *  HIGH #13 (cap)    setMinter() locked after first set (centralization guard)
 */

// FIX CF-14: correct import path (was 'as-bignum/assembly')
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
  OP20,
  OP20InitParameters,
  Blockchain,
  Calldata,
  BytesWriter,
  NetEvent,
} from '@btc-vision/btc-runtime/runtime';

@event('MinterSet')
class MinterSetEvent extends NetEvent {
  constructor(minter: string) {
    super('MinterSet');
    this.set('minter', minter);
  }
}

@final
export class USDOP extends OP20 {

  private readonly POINTER_MINTER: u16      = Blockchain.nextPointer;
  private readonly POINTER_MINTER_LOCKED: u16 = Blockchain.nextPointer;
  private readonly POINTER_EPOCH_MINT: u16    = Blockchain.nextPointer;
  private readonly POINTER_EPOCH_BLOCK: u16   = Blockchain.nextPointer;

  // Epoch limit: max mint per 144-block (~1 day) window
  private readonly EPOCH_BLOCKS: u64 = 144;
  private readonly MAX_EPOCH_MINT: u256 = u256.fromU64(1_000_000_000_000_000); // 10M USDOP (8 decimals)

  private static readonly MAX_SUPPLY: u256 = u256.fromU64(10_000_000_000_000_000_000); // 100B USDOP

  constructor() {
    // Matches pattern from USDOP docs: 4 args, correct order
    super(new OP20InitParameters(
      USDOP.MAX_SUPPLY,
      8,
      'USD on OPNet',
      'USDOP'
    ));
  }

  // ── setMinter: FIX HIGH #63 — lock after first set ──────────────────────────
  public setMinter(minter: string): void {
    if (Blockchain.tx.sender !== Blockchain.owner) {
      throw new Error('Only owner can set minter');
    }
    // FIX HIGH #13: prevent post-deploy minter swaps (centralization guard)
    if (Blockchain.getStorageBool(this.POINTER_MINTER_LOCKED)) {
      throw new Error('Minter already locked — cannot change');
    }
    Blockchain.setStorageString(this.POINTER_MINTER, minter);
    Blockchain.setStorageBool(this.POINTER_MINTER_LOCKED, true);

    const ev = new MinterSetEvent(minter);
    ev.emit();
  }

  // FIX HIGH #41: @method decorator with correct parameter
  @method('getMinter')
  public getMinter(): string {
    return Blockchain.getStorageString(this.POINTER_MINTER);
  }

  // ── mint: called only by YieldVault. FIX HIGH #13: epoch cap ─────────────────
  public mint(to: string, amount: u256): bool {
    const sender = Blockchain.tx.sender;
    const minter = Blockchain.getStorageString(this.POINTER_MINTER);
    if (sender !== minter) {
      throw new Error('Only minter can mint');
    }

    // FIX HIGH #13 (CRIT #12): enforce per-epoch mint cap
    const currentBlock = Blockchain.block.number;
    const epochStart   = Blockchain.getStorageU64(this.POINTER_EPOCH_BLOCK);
    let   epochMinted  = Blockchain.getStorageU256(this.POINTER_EPOCH_MINT);

    if (currentBlock - epochStart >= this.EPOCH_BLOCKS) {
      // New epoch — reset counter
      Blockchain.setStorageU64(this.POINTER_EPOCH_BLOCK, currentBlock);
      epochMinted = u256.Zero;
    }

    const newEpochTotal = SafeMath.add(epochMinted, amount);
    if (SafeMath.gt(newEpochTotal, this.MAX_EPOCH_MINT)) {
      throw new Error('Epoch mint cap exceeded — max 10M USDOP per day');
    }
    Blockchain.setStorageU256(this.POINTER_EPOCH_MINT, newEpochTotal);

    return super.mint(to, amount);
  }

  // FIX CF-02e / HIGH #6
  public override execute(_calldata: Calldata): BytesWriter {
    return super.execute(_calldata);
  }

  // FIX HIGH #6: required for upgrade mechanism
  public onUpdate(_calldata: Calldata): void {}
}
