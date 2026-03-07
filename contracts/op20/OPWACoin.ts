/**
 * OPWACoin — OPWA Platform Token
 *
 * FIX CF-01: OP20InitParameters correct 4-arg call (was 5 args with u256.Zero first)
 * FIX CF-10: Added buy(), setTreasury(), setPrice(), getPrice(), getTreasury()
 *            These methods exist in the frontend ABI but were missing from the contract source.
 * FIX CF-14: Import path as-bignum → @btc-vision/as-bignum/assembly
 * FIX CF-11: onUpdate() lifecycle hook added
 * FIX CF-12: NetEvents for buy, config, price
 */
import { OP20 } from '@btc-vision/btc-runtime/runtime/contracts/OP20';
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
  Blockchain,
  Address,
  Calldata,
  BytesWriter,
  Revert,
  StoredAddress,
  StoredU256,
  SafeMath,
  TransferHelper,
  NetEvent,
  OP20InitParameters,
  EMPTY_POINTER,
} from '@btc-vision/btc-runtime/runtime';

// Storage pointers for new fields
const POINTER_TREASURY: u16 = 200;
const POINTER_PRICE:    u16 = 201;
const POINTER_MINTER:   u16 = 202;
const POINTER_MINTER_LOCKED: u16 = 203;

// ── NetEvent concrete subclasses (FIX CF-12) ─────────────────────────────────

@final
class BuyEvent extends NetEvent {
    constructor(to: Address, amount: u256, price: u256) {
        const data = new BytesWriter(96); // 32 + 32 + 32
        data.writeAddress(to);
        data.writeU256(amount);
        data.writeU256(price);
        super('Buy', data);
    }
}

@final
class TreasurySetEvent extends NetEvent {
    constructor(addr: Address) {
        const data = new BytesWriter(32);
        data.writeAddress(addr);
        super('TreasurySet', data);
    }
}

@final
class MinterSetEvent extends NetEvent {
    constructor(addr: Address) {
        const data = new BytesWriter(32);
        data.writeAddress(addr);
        super('MinterSet', data);
    }
}

@final
class PriceSetEvent extends NetEvent {
    constructor(price: u256) {
        const data = new BytesWriter(32);
        data.writeU256(price);
        super('PriceSet', data);
    }
}

@final
export class OPWACoin extends OP20 {
  // Max supply: 1,000,000,000 OPWA with 8 decimals
  private readonly MAX_SUPPLY: u256 = u256.fromString('100000000000000000');

  // New storage fields
  private _treasury:      StoredAddress = new StoredAddress(POINTER_TREASURY);
  private _price:         StoredU256    = new StoredU256(POINTER_PRICE, EMPTY_POINTER);
  private _minter:        StoredAddress = new StoredAddress(POINTER_MINTER);
  private _minterLocked:  StoredU256    = new StoredU256(POINTER_MINTER_LOCKED, EMPTY_POINTER);

  constructor() {
    super();
  }

  // FIX CF-11
  public onUpdate(_calldata: Calldata): void {}

  public override onDeployment(_calldata: Calldata): void {
    // FIX CF-01: was 5 args — correct OP20InitParameters takes 4 args
    this.instantiate(
      new OP20InitParameters(
        this.MAX_SUPPLY,  // maxSupply (hard cap)
        8,                // decimals
        'OPWA Coin',      // name
        'OPWA',           // symbol
      ),
    );
  }

  // V2-M-05: removed manual execute() override — @method decorators handle routing automatically.
  // Having both caused duplicate routing conflict.

  // ── buy(to, amount) ───────────────────────────────────────────────────────
  // FIX CF-10: was in ABI but not implemented
  // Verifies BTC payment to treasury via tx outputs, then mints tokens.

  @method(
    { name: 'to',     type: ABIDataTypes.ADDRESS },
    { name: 'amount', type: ABIDataTypes.UINT256 },
  )
  @returns({ name: 'success', type: ABIDataTypes.BOOL })
  public buy(calldata: Calldata): BytesWriter {
    const to     = calldata.readAddress();
    const amount = calldata.readU256();
    if (amount.isZero()) throw new Revert('OPWACoin: amount must be > 0');

    const price     = this._price.value;
    const treasury  = this._treasury.value;

    if (!treasury.equals(Address.zero()) && !price.isZero()) {
      // Verify BTC payment: sum outputs to treasury address
      const outputs       = Blockchain.tx.outputs;
      const treasuryAddr  = treasury.p2tr(); // bech32 string for comparison with output.to
      let totalPaid  = u256.Zero;
      for (let i = 0; i < outputs.length; i++) {
        const outTo = outputs[i].to;
        if (outTo !== null && outTo == treasuryAddr) {
          totalPaid = SafeMath.add(totalPaid, u256.fromU64(outputs[i].value));
        }
      }
      // Expected cost = amount * price / 10^8 (token has 8 decimals, price in sats per whole token)
      const expectedSats = SafeMath.div(SafeMath.mul(amount, price), u256.fromString('100000000'));
      if (u256.lt(totalPaid, expectedSats)) { // V2-C-05: was JS `<` — u256.lt for correct comparison
        throw new Revert('OPWACoin: insufficient BTC payment');
      }
    }

    this._mintBuy(to, amount);
    Blockchain.emit(new BuyEvent(to, amount, price));

    const result = new BytesWriter(1);
    result.writeBoolean(true);
    return result;
  }

  // ── setTreasury(address) ──────────────────────────────────────────────────

  @method({ name: 'pubkey', type: ABIDataTypes.ADDRESS })
  @returns({ name: 'success', type: ABIDataTypes.BOOL })
  public setTreasury(calldata: Calldata): BytesWriter {
    this.onlyDeployer(Blockchain.tx.sender);
    const addr = calldata.readAddress();
    this._treasury.value = addr;
    Blockchain.emit(new TreasurySetEvent(addr));
    const result = new BytesWriter(1);
    result.writeBoolean(true);
    return result;
  }

  // ── getTreasury() ─────────────────────────────────────────────────────────

  @method()
  @returns({ name: 'treasury', type: ABIDataTypes.ADDRESS })
  public getTreasury(_calldata: Calldata): BytesWriter {
    const result = new BytesWriter(32);
    result.writeAddress(this._treasury.value);
    return result;
  }

  // ── setPrice(uint256) ─────────────────────────────────────────────────────

  @method({ name: 'price', type: ABIDataTypes.UINT256 })
  @returns({ name: 'success', type: ABIDataTypes.BOOL })
  public setPrice(calldata: Calldata): BytesWriter {
    this.onlyDeployer(Blockchain.tx.sender);
    const price = calldata.readU256();
    this._price.value = price;
    Blockchain.emit(new PriceSetEvent(price));
    const result = new BytesWriter(1);
    result.writeBoolean(true);
    return result;
  }

  // ── getPrice() ────────────────────────────────────────────────────────────

  @method()
  @returns({ name: 'price', type: ABIDataTypes.UINT256 })
  public getPrice(_calldata: Calldata): BytesWriter {
    const result = new BytesWriter(32);
    result.writeU256(this._price.value);
    return result;
  }

  // ── setMinter(address) — FIX CF-13: locked after first set ───────────────

  @method({ name: 'minter', type: ABIDataTypes.ADDRESS })
  @returns({ name: 'success', type: ABIDataTypes.BOOL })
  public setMinter(calldata: Calldata): BytesWriter {
    this.onlyDeployer(Blockchain.tx.sender);
    // FIX CF-13: once locked, minter cannot be changed
    if (!this._minterLocked.value.isZero()) {
      throw new Revert('OPWACoin: minter already locked');
    }
    const minter = calldata.readAddress();
    this._minter.value       = minter;
    this._minterLocked.value = u256.One;
    Blockchain.emit(new MinterSetEvent(minter));
    const result = new BytesWriter(1);
    result.writeBoolean(true);
    return result;
  }

  // Internal buy-path mint — bypasses caller guard because buy() already verified BTC payment.
  // NEVER call this from any public method other than buy().
  private _mintBuy(to: Address, amount: u256): void {
    super._mint(to, amount);
  }

  // Override _mint to also allow the designated minter (YieldVault)
  // Parent OP20._mint is owner-only; we extend to allow minter address too.
  protected override _mint(to: Address, amount: u256): void {
    const caller = Blockchain.tx.sender;
    const minter = this._minter.value;
    if (!caller.equals(this.deployer) && !caller.equals(minter)) {
      throw new Revert('OPWACoin: caller is not owner or minter');
    }
    super._mint(to, amount);
  }
}
