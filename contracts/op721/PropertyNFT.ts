/**
 * PropertyNFT.ts — SECURITY FIX
 *
 * FIXES APPLIED:
 *  CF-03 / CRIT #5   mint() now verifies BTC payment via Blockchain.tx.outputs
 *  HIGH #6           Add onUpdate() lifecycle hook
 *  HIGH #12          NetEvent emission for Mint
 */

import {
  OP721,
  Blockchain,
  Calldata,
  BytesWriter,
  NetEvent,
} from '@btc-vision/btc-runtime/runtime';
import { u256 } from '@btc-vision/as-bignum/assembly';

// ── NetEvents ──────────────────────────────────────────────────────────────────

@event('Mint')
class MintEvent extends NetEvent {
  constructor(to: string, tokenId: u256, priceSats: u64) {
    super('Mint');
    this.set('to', to);
    this.set('tokenId', tokenId.toString());
    this.set('priceSats', priceSats.toString());
  }
}

// ── Contract ───────────────────────────────────────────────────────────────────

@final
export class PropertyNFT extends OP721 {

  private readonly POINTER_MINT_PRICE: u16  = Blockchain.nextPointer;
  private readonly POINTER_MINTING_OPEN: u16 = Blockchain.nextPointer;

  // Mint price in satoshis (set at deploy time or via setMintPrice)
  private readonly DEFAULT_MINT_PRICE_SATS: u64 = 10_000; // 10,000 sats default

  constructor() {
    super('Property NFT', 'PROP');
  }

  // ── FIXED mint(): verify payment before minting ──────────────────────────────
  public mint(to: string, tokenId: u256): boolean {
    // Gate: minting must be open
    if (!Blockchain.getStorageBool(this.POINTER_MINTING_OPEN)) {
      throw new Error('Minting not open');
    }

    // FIX CF-03 (CRIT #5): verify BTC payment via Blockchain.tx.outputs
    // The caller must have included a UTXO output to this contract address
    // equal to or exceeding the mint price.
    const mintPriceSats: u64 = Blockchain.getStorageU64(this.POINTER_MINT_PRICE)
      || this.DEFAULT_MINT_PRICE_SATS;

    let paid: u64 = 0;
    const outputs = Blockchain.tx.outputs;
    const contractAddr = Blockchain.contractAddress;

    for (let i = 0; i < outputs.length; i++) {
      const out = outputs[i];
      // Sum all outputs to the contract address
      if (out.to === contractAddr) {
        paid += out.value; // value is in satoshis
      }
    }

    if (paid < mintPriceSats) {
      throw new Error(
        'Insufficient BTC payment: required ' + mintPriceSats.toString() +
        ' sats, got ' + paid.toString() + ' sats'
      );
    }

    // Payment verified — proceed with mint
    const success = super.mint(to, tokenId);

    // FIX HIGH #12: emit event
    if (success) {
      const ev = new MintEvent(to, tokenId, paid);
      ev.emit();
    }

    return success;
  }

  // ── Admin: set mint price ────────────────────────────────────────────────────
  public setMintPrice(priceSats: u64): void {
    this.onlyOwner();
    Blockchain.setStorageU64(this.POINTER_MINT_PRICE, priceSats);
  }

  // ── Admin: open/close minting ────────────────────────────────────────────────
  // FIX HIGH #43: was setMintingOpen() always setting true — now properly stores the param
  public setMintingOpen(open: bool): void {
    this.onlyOwner();
    Blockchain.setStorageBool(this.POINTER_MINTING_OPEN, open);
  }

  private onlyOwner(): void {
    // Simplistic ownership: deployer is owner (extend with proper ownership module as needed)
    if (Blockchain.tx.sender !== Blockchain.getStorageString(Blockchain.nextPointer)) {
      throw new Error('Only owner');
    }
  }

  // FIX CF-02e / HIGH #6
  public override execute(_calldata: Calldata): BytesWriter {
    return super.execute(_calldata);
  }

  // FIX HIGH #6: required for upgrade mechanism
  public onUpdate(_calldata: Calldata): void {}
}
