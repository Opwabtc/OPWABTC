/**
 * PropertyNFT.ts — SECURITY FIX
 *
 * FIXES APPLIED:
 *  CF-03 / CRIT #5   mint() now verifies BTC payment via Blockchain.tx.outputs
 *  HIGH #6           Add onUpdate() lifecycle hook
 *  HIGH #12          NetEvent emission for Mint
 *  R-007 (sub-1)     POINTER_ constants now fixed u16 values (100/101)
 *  R-007 (sub-2)     onlyOwner() replaced with this.onlyDeployer() from base class
 *  R-007 (sub-3)     Removed custom POINTER_OWNER — deployer tracked by OP_NET base class
 *  API-FIX           OP721 constructor now takes 0 args; name/symbol set in onDeployment()
 *                    StoredBoolean/StoredU64 replace removed Blockchain.getStorage* methods
 *                    mint() uses @method decorator + Calldata; calls _mint() not super.mint()
 */

import {
  OP721,
  Blockchain,
  Calldata,
  BytesWriter,
  Revert,
  NetEvent,
  Address,
  StoredBoolean,
  StoredU64,
  OP721InitParameters,
  EMPTY_POINTER,
} from '@btc-vision/btc-runtime/runtime';
import { u256 } from '@btc-vision/as-bignum/assembly';

// ── NetEvents ──────────────────────────────────────────────────────────────────

@final
class MintEvent extends NetEvent {
    constructor(to: Address, tokenId: u256, paid: u64) {
        const data = new BytesWriter(72); // 32 + 32 + 8
        data.writeAddress(to);
        data.writeU256(tokenId);
        data.writeU64(paid);
        super('Mint', data);
    }
}

// ── Storage pointer constants (R-007 sub-1) ───────────────────────────────────
// Fixed values — must NOT use Blockchain.nextPointer in field/class-level initializers.
// Values 100/101: safe offset above OP721 base class slots (assumed 0–99).
const POINTER_MINT_PRICE:   u16 = 100;
const POINTER_MINTING_OPEN: u16 = 101;

// ── Contract ───────────────────────────────────────────────────────────────────

@final
export class PropertyNFT extends OP721 {

  private readonly DEFAULT_MINT_PRICE_SATS: u64 = 10_000; // 10,000 sats default

  // StoredU64 and StoredBoolean replace Blockchain.getStorage*/setStorage* (removed in btc-runtime)
  private _mintPrice:   StoredU64     = new StoredU64(POINTER_MINT_PRICE, EMPTY_POINTER);
  private _mintingOpen: StoredBoolean = new StoredBoolean(POINTER_MINTING_OPEN, false);

  constructor() {
    super();
  }

  public override onDeployment(_calldata: Calldata): void {
    this.instantiate(
      new OP721InitParameters(
        'Property NFT',
        'PROP',
        '',                    // baseURI
        u256.fromU64(10000),   // maxSupply
      ),
    );
  }

  // FIX HIGH #6 / CF-11
  public onUpdate(_calldata: Calldata): void {}

  // ── FIXED mint(): verify payment before minting ──────────────────────────────
  @method(
    { name: 'to',      type: ABIDataTypes.ADDRESS },
    { name: 'tokenId', type: ABIDataTypes.UINT256 },
  )
  @returns({ name: 'success', type: ABIDataTypes.BOOL })
  public mintNFT(calldata: Calldata): BytesWriter {
    if (!this._mintingOpen.value) {
      throw new Revert('PropertyNFT: minting not open');
    }

    const to      = calldata.readAddress();
    const tokenId = calldata.readU256();

    // FIX CF-03 (CRIT #5): verify BTC payment via Blockchain.tx.outputs
    const storedPrice: u64 = this._mintPrice.get(0);
    const mintPriceSats: u64 = storedPrice > 0 ? storedPrice : this.DEFAULT_MINT_PRICE_SATS;

    let paid: u64 = 0;
    const outputs      = Blockchain.tx.outputs;
    const contractAddr = this.address.p2tr(); // bech32 for string comparison

    for (let i = 0; i < outputs.length; i++) {
      const outTo = outputs[i].to;
      if (outTo !== null && outTo == contractAddr) {
        paid += outputs[i].value;
      }
    }

    if (paid < mintPriceSats) {
      throw new Revert('PropertyNFT: insufficient BTC payment');
    }

    // Call protected _mint from OP721 base class
    super._mint(to, tokenId);
    Blockchain.emit(new MintEvent(to, tokenId, paid));

    const result = new BytesWriter(1);
    result.writeBoolean(true);
    return result;
  }

  // ── Admin: set mint price (R-007 sub-2: onlyDeployer from base class) ─────────
  @method({ name: 'priceSats', type: ABIDataTypes.UINT64 })
  @returns({ name: 'success', type: ABIDataTypes.BOOL })
  public setMintPrice(calldata: Calldata): BytesWriter {
    this.onlyDeployer(Blockchain.tx.sender);
    const priceSats = calldata.readU64();
    this._mintPrice.set(0, priceSats);
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
    this._mintingOpen.value = open;
    const result = new BytesWriter(1);
    result.writeBoolean(true);
    return result;
  }
}
