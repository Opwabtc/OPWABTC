import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    OP20,
    OP20InitParameters,
    Blockchain,
    Address,
    Calldata,
    BytesWriter,
    Revert,
    StoredAddress,
} from '@btc-vision/btc-runtime/runtime';

// 1 trillion × 10^8 decimals = 10^20 raw units
const MAX_SUPPLY: u256 = u256.fromString('100000000000000000000');

@final
export class USDOP extends OP20 {
    // The address authorized to call mint() — set to YieldVault after deploy
    private _minter: StoredAddress = new StoredAddress(Blockchain.nextPointer);

    public constructor() {
        super();
    }

    public override onDeployment(_calldata: Calldata): void {
        this.instantiate(
            new OP20InitParameters(MAX_SUPPLY, 8, 'USD on OPNet', 'USDOP'),
        );
    }

    // ── Admin ──────────────────────────────────────────────────────────────────

    @method({ name: 'minter', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setMinter(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        this._minter.value = calldata.readAddress();
        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    @method()
    @returns({ name: 'minter', type: ABIDataTypes.ADDRESS })
    public getMinter(_calldata: Calldata): BytesWriter {
        const result = new BytesWriter(32);
        result.writeAddress(this._minter.value);
        return result;
    }

    // ── Minter-only mint ──────────────────────────────────────────────────────

    @method(
        { name: 'to',     type: ABIDataTypes.ADDRESS },
        { name: 'amount', type: ABIDataTypes.UINT256 },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public mint(calldata: Calldata): BytesWriter {
        if (!Blockchain.tx.sender.equals(this._minter.value)) {
            throw new Revert('USDOP: not authorized minter');
        }

        const to     = calldata.readAddress();
        const amount = calldata.readU256();

        if (amount.isZero()) {
            throw new Revert('USDOP: amount must be > 0');
        }

        this._mint(to, amount);

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }
}
