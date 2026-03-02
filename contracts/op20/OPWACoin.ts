import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    OP20,
    OP20InitParameters,
    Blockchain,
    Address,
    Calldata,
    BytesWriter,
    SafeMath,
    Revert,
    StoredU256,
    StoredAddress,
    TransactionOutput,
} from '@btc-vision/btc-runtime/runtime';

const EMPTY_POINTER = new Uint8Array(30);

// 1,000,000 tokens × 10^8 decimals
const MAX_SUPPLY: u256 = u256.fromString('100000000000000');

// 10^8 — used to convert raw units → whole tokens
const DECIMALS: u256 = u256.fromString('100000000');

@final
export class OPWACoin extends OP20 {
    // Treasury: 32-byte x-only tweaked P2TR pubkey stored as Address bytes
    private _treasury: StoredAddress = new StoredAddress(Blockchain.nextPointer);

    // Price in satoshis per whole token (default 1000 sats/token)
    private _price: StoredU256 = new StoredU256(Blockchain.nextPointer, EMPTY_POINTER);

    public constructor() {
        super();
    }

    public override onDeployment(_calldata: Calldata): void {
        this.instantiate(
            new OP20InitParameters(MAX_SUPPLY, 8, 'OPWA Property Token', 'OPWA'),
        );
        // Initial price: 1 000 sats per whole token
        this._price.value = u256.fromU64(1000);
    }

    // ── Owner functions ─────────────────────────────────────────────────────

    @method({ name: 'pubkey', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setTreasury(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        const pubkey = calldata.readAddress();
        this._treasury.value = pubkey;
        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    @method({ name: 'newPrice', type: ABIDataTypes.UINT256 })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setPrice(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        this._price.value = calldata.readU256();
        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── View functions ──────────────────────────────────────────────────────

    @method()
    @returns({ name: 'price', type: ABIDataTypes.UINT256 })
    public getPrice(_calldata: Calldata): BytesWriter {
        const result = new BytesWriter(32);
        result.writeU256(this._price.value);
        return result;
    }

    @method()
    @returns({ name: 'treasury', type: ABIDataTypes.ADDRESS })
    public getTreasury(_calldata: Calldata): BytesWriter {
        const result = new BytesWriter(32);
        result.writeAddress(this._treasury.value);
        return result;
    }

    // ── Buy ─────────────────────────────────────────────────────────────────

    @method(
        { name: 'to',     type: ABIDataTypes.ADDRESS },
        { name: 'amount', type: ABIDataTypes.UINT256 },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public buy(calldata: Calldata): BytesWriter {
        const treasury = this._treasury.value;
        if (treasury.equals(Address.zero())) {
            throw new Revert('Treasury not configured');
        }

        const to     = calldata.readAddress();
        const amount = calldata.readU256();

        if (amount.isZero()) {
            throw new Revert('Amount must be > 0');
        }

        // requiredSats = floor(amount * price / 10^8)
        const requiredSats: u256 = SafeMath.div(
            SafeMath.mul(amount, this._price.value),
            DECIMALS,
        );

        // Sum BTC outputs to treasury via dual-path check:
        //
        // Path 1 — Real Bitcoin P2TR transactions:
        //   The OPNet node serializes the raw P2TR scriptPubKey (0x51 0x20 + 32-byte pubkey)
        //   with the hasScriptPubKey flag. We compare the 32 pubkey bytes against treasury.
        //
        // Path 2 — SDK simulation (setTransactionDetails with hasTo flag):
        //   The esm.sh SDK bundle only supports the hasTo flag (hasScriptPubKey causes errors).
        //   We tell callers to pass `to: treasury.toHex()` (the 64-char hex of the pubkey bytes).
        //   The node serializes this string; output.to === treasury.toHex() matches.
        let satsSent: u64 = 0;
        const outputs: TransactionOutput[] = Blockchain.tx.outputs;
        const treasuryHex: string = treasury.toHex();
        for (let i = 0; i < outputs.length; i++) {
            // Path 1: P2TR script bytes (real on-chain transactions)
            const script: Uint8Array | null = outputs[i].scriptPublicKey;
            if (
                script !== null &&
                script.length == 34 &&
                script[0] == 0x51 &&
                script[1] == 0x20 &&
                this.matchesTreasury(script, treasury)
            ) {
                satsSent = SafeMath.add64(satsSent, outputs[i].value);
                continue;
            }
            // Path 2: hex string comparison (simulation via setTransactionDetails hasTo)
            const outputTo: string | null = outputs[i].to;
            if (outputTo !== null && outputTo === treasuryHex) {
                satsSent = SafeMath.add64(satsSent, outputs[i].value);
            }
        }

        if (u256.fromU64(satsSent) < requiredSats) {
            throw new Revert('Insufficient BTC payment');
        }

        this._mint(to, amount);

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── Helpers ─────────────────────────────────────────────────────────────

    /** Compare script[2..34] with the stored treasury pubkey byte-by-byte */
    private matchesTreasury(script: Uint8Array, treasury: Address): bool {
        for (let i = 0; i < 32; i++) {
            if (script[i + 2] != treasury[i]) return false;
        }
        return true;
    }
}
