import { OP20, OP20InitParameters } from '@btc-vision/btc-runtime/runtime';
import { u256 } from '@btc-vision/as-bignum/assembly'; // FIX #5: correct import path

// FIX #6: NetEvent imports for emissions
import { NetEvent } from '@btc-vision/btc-runtime/runtime';
import { Blockchain, Calldata } from '@btc-vision/btc-runtime/runtime';

// FIX #12: Define events
@event('Transfer')
export class TransferEvent extends NetEvent {
  constructor(from: string, to: string, amount: u256) {
    super('Transfer');
    this.set('from', from);
    this.set('to', to);
    this.set('amount', amount.toString());
  }
}

@event('Approval')
export class ApprovalEvent extends NetEvent {
  constructor(owner: string, spender: string, amount: u256) {
    super('Approval');
    this.set('owner', owner);
    this.set('spender', spender);
    this.set('amount', amount.toString());
  }
}

@final
export class OPWACoin extends OP20 {
  // FIX #5 (import path) + FIX #1 (OP20InitParameters: 4 args, not 5)
  // WRONG (before): new OP20InitParameters(u256.Zero, this.MAX_SUPPLY, 8, 'OPWA Coin', 'OPWA')
  // CORRECT (after): new OP20InitParameters(this.MAX_SUPPLY, 8, 'OPWA Coin', 'OPWA')
  // Pattern matches USDOP.ts: new OP20InitParameters(MAX_SUPPLY, 8, 'USD on OPNet', 'USDOP')

  public readonly MAX_SUPPLY: u256 = u256.fromU64(1_000_000_000); // 1 billion OPWA

  constructor() {
    // FIX #1 — was: new OP20InitParameters(u256.Zero, this.MAX_SUPPLY, 8, 'OPWA Coin', 'OPWA')
    super(new OP20InitParameters(
      /* maxSupply  */ u256.fromU64(1_000_000_000),
      /* decimals   */ 8,
      /* name       */ 'OPWA Coin',
      /* symbol     */ 'OPWA'
    ));
  }

  // FIX #6 — required execute() override for all OP20 subclasses
  public override execute(_calldata: Calldata): BytesWriter {
    return super.execute(_calldata);
  }

  // FIX #6 (HIGH #6) — without this, contract cannot be upgraded via OP_NET upgrade mechanism
  public onUpdate(_calldata: Calldata): void {}
}
