/**
 * OPWAYield — OPWAY Yield Token (OP-20)
 *
 * Public mint: anyone can call mint(to, amount) by paying BTC to the treasury.
 *
 * BUG FIX (CRIT): Previous version only checked that SOME payment went to treasury,
 * not that the amount was proportional to tokens minted. This allowed minting any
 * quantity for a minimal payment.
 *
 * FIXED: mint() now verifies totalPaid >= (amount * price) / 10^8
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
    StoredString,
    SafeMath,
    NetEvent,
    OP20InitParameters,
    EMPTY_POINTER,
} from '@btc-vision/btc-runtime/runtime';

// Storage pointers — start at 200+ to avoid collision with OP20 base (0-199)
const POINTER_TREASURY_ADDR: u16 = 200; // treasury Address (mldsaKey)
const POINTER_TREASURY_TO:   u16 = 201; // treasury P2TR bech32 string (for output.to comparison)
const POINTER_PRICE:          u16 = 202; // sats per 1 whole token (8 decimals)

// ── NetEvents ─────────────────────────────────────────────────────────────────

@final
class MintEvent extends NetEvent {
    constructor(to: Address, amount: u256, paid: u256) {
        const data = new BytesWriter(96); // 32 + 32 + 32
        data.writeAddress(to);
        data.writeU256(amount);
        data.writeU256(paid);
        super('Mint', data);
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
class PriceSetEvent extends NetEvent {
    constructor(price: u256) {
        const data = new BytesWriter(32);
        data.writeU256(price);
        super('PriceSet', data);
    }
}

// ── Contract ──────────────────────────────────────────────────────────────────

@final
export class OPWAYield extends OP20 {
    // Max supply: 1,000,000,000 OPWAY × 10^8 = 100,000,000,000,000,000 raw units
    private readonly MAX_SUPPLY: u256 = u256.fromString('100000000000000000');

    private _treasuryAddr: StoredAddress = new StoredAddress(POINTER_TREASURY_ADDR);
    private _treasuryTo:   StoredString  = new StoredString(POINTER_TREASURY_TO);
    private _price:        StoredU256    = new StoredU256(POINTER_PRICE, EMPTY_POINTER);

    constructor() {
        super();
    }

    public override onDeployment(_calldata: Calldata): void {
        this.instantiate(
            new OP20InitParameters(
                this.MAX_SUPPLY,
                8,
                'OPWA Yield',
                'OPWAY',
            ),
        );
    }

    public onUpdate(_calldata: Calldata): void {}

    // ── mint(to, amount) ──────────────────────────────────────────────────────
    // Public — anyone can call.
    // Verifies BTC payment proportional to tokens requested.
    // FIX: was only checking output existence, not amount.

    @method(
        { name: 'to',     type: ABIDataTypes.ADDRESS },
        { name: 'amount', type: ABIDataTypes.UINT256 },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public mint(calldata: Calldata): BytesWriter {
        const to     = calldata.readAddress();
        const amount = calldata.readU256();
        if (amount.isZero()) throw new Revert('OPWAYield: amount must be > 0');

        const price      = this._price.value;
        const treasuryTo = this._treasuryTo.value;

        if (!price.isZero() && treasuryTo.length > 0) {
            // Sum all outputs going to the treasury bech32 address
            const outputs  = Blockchain.tx.outputs;
            let totalPaid  = u256.Zero;
            for (let i = 0; i < outputs.length; i++) {
                const outTo = outputs[i].to;
                if (outTo !== null && outTo == treasuryTo) {
                    totalPaid = SafeMath.add(totalPaid, u256.fromU64(outputs[i].value));
                }
            }

            // FIX: verify paid >= (amount * price) / 10^8
            // amount is in raw units (8 decimals), price is sats per whole token
            // expectedSats = amount * price / 100_000_000
            const expectedSats = SafeMath.div(
                SafeMath.mul(amount, price),
                u256.fromString('100000000'),
            );
            if (u256.lt(totalPaid, expectedSats)) {
                throw new Revert('OPWAYield: insufficient BTC payment');
            }

            Blockchain.emit(new MintEvent(to, amount, totalPaid));
        }

        super._mint(to, amount);

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── setTreasury(pubkey, bech32To) ─────────────────────────────────────────
    // Stores the treasury Address (for identity) and bech32 string (for output.to comparison).

    @method(
        { name: 'pubkey',   type: ABIDataTypes.ADDRESS },
        { name: 'bech32To', type: ABIDataTypes.STRING  },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setTreasury(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        const addr    = calldata.readAddress();
        const bech32  = calldata.readStringWithLength();
        this._treasuryAddr.value = addr;
        this._treasuryTo.value   = bech32;
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
        result.writeAddress(this._treasuryAddr.value);
        return result;
    }

    // ── setPrice(satsPerToken) ────────────────────────────────────────────────

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
}
