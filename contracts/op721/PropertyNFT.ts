/**
 * PropertyNFT.ts — SECURITY FIX
 *
 * FIXES APPLIED:
 *  CF-03 / CRIT #5   mint() now verifies BTC payment via Blockchain.tx.outputs
 *  HIGH #6           Add onUpdate() lifecycle hook
 *  HIGH #12          NetEvent emission for Mint
 *  R-007 (sub-1)     POINTER_ constants now fixed u16 values (100/101) — not Blockchain.nextPointer
 *                    in field initializers (non-deterministic, advances on every call)
 *  R-007 (sub-2)     onlyOwner() replaced with this.onlyDeployer() from base class —
 *                    previous impl compared Address !== string (type mismatch, always failed)
 *  R-007 (sub-3)     Removed custom POINTER_OWNER — deployer tracked by OP_NET base class
 */

import {
  OP721,
  Blockchain,
  Calldata,
  BytesWriter,
  Revert,
  NetEvent,
  ABIDataTypes,
} from '@btc-vision/btc-runtime/runtime';
import { u256 } from '@btc-vision/as-bignum/assembly';

// ── NetEvents ──────────────────────────────────────────────────────────────────

const MintEvent = new NetEvent('Mint', ['address', 'uint256', 'uint64']);

// ── Storage pointer constants (R-007 sub-1) ───────────────────────────────────
// Fixed values — must NOT use Blockchain.nextPointer in field/class-level initializers.
// Values 100/101: safe offset above OP721 base class slots (assumed 0–99).
const POINTER_MINT_PRICE:   u16 = 100;
const POINTER_MINTING_OPEN: u16 = 101;

// ── Contract ───────────────────────────────────────────────────────────────────

@final
export class PropertyNFT extends OP721 {

  // _nextTokenId is NOT declared here — it is managed internally by the OP721 base class.
  // Do NOT add a _nextTokenId field; OP721 handles token ID auto-increment via its own storage.

  private readonly DEFAULT_MINT_PRICE_SATS: u64 = 10_000; // 10,000 sats default

  constructor() {
    super('Property NFT', 'PROP');
  }

  // FIX HIGH #6 / CF-11
  public onUpdate(_calldata: Calldata): void {}

  // ── FIXED mint(): verify payment before minting ──────────────────────────────
  public mint(to: string, tokenId: u256): boolean {
    if (!Blockchain.getStorageBool(POINTER_MINTING_OPEN)) {
      throw new Revert('PropertyNFT: minting not open');
    }

    // FIX CF-03 (CRIT #5): verify BTC payment via Blockchain.tx.outputs
    const mintPriceSats: u64 = Blockchain.getStorageU64(POINTER_MINT_PRICE)
      || this.DEFAULT_MINT_PRICE_SATS;

    let paid: u64 = 0;
    const outputs = Blockchain.tx.outputs;
    const contractAddr = Blockchain.contractAddress;

    for (let i = 0; i < outputs.length; i++) {
      if (outputs[i].to.equals(contractAddr)) {
        paid += outputs[i].value;
      }
    }

    if (paid < mintPriceSats) {
      throw new Revert('PropertyNFT: insufficient BTC payment');
    }

    const success = super.mint(to, tokenId);
    if (success) {
      Blockchain.emit(MintEvent, [to, tokenId, u256.fromU64(paid)]);
    }
    return success;
  }

  // ── Admin: set mint price (R-007 sub-2: onlyDeployer from base class) ─────────
  @method({ name: 'priceSats', type: ABIDataTypes.UINT64 })
  @returns({ name: 'success', type: ABIDataTypes.BOOL })
  public setMintPrice(calldata: Calldata): BytesWriter {
    this.onlyDeployer(Blockchain.tx.sender);
    const priceSats = calldata.readU64();
    Blockchain.setStorageU64(POINTER_MINT_PRICE, priceSats);
    const result = new BytesWriter(1);
    result.writeBoolean(true);
    return result;
  }

  // ── Admin: open/close minting ────────────────────────────────────────────────
  @method({ name: 'open', type: ABIDataTypes.BOOL })
  @returns({ name: 'success', type: ABIDataTypes.BOOL })
  public setMintingOpen(calldata: Calldata): BytesWriter {
    this.onlyDeployer(Blockchain.tx.sender);
    const open = calldata.readBoolean();
    Blockchain.setStorageBool(POINTER_MINTING_OPEN, open);
    const result = new BytesWriter(1);
    result.writeBoolean(true);
    return result;
  }

  // FIX CF-02e / HIGH #6
  public override execute(_calldata: Calldata): BytesWriter {
    return super.execute(_calldata);
  }
}
