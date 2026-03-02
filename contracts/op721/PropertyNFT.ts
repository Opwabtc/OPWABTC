import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Blockchain,
    BytesWriter,
    Calldata,
    EMPTY_POINTER,
    OP721,
    OP721InitParameters,
    Revert,
    SafeMath,
    StoredBoolean,
    StoredU256,
} from '@btc-vision/btc-runtime/runtime';

@final
export class PropertyNFT extends OP721 {
    // ABIDataTypes is a global declared by opnet-transform — no import needed

    // Inline initializers ensure correct pointer allocation order
    private _price: StoredU256 = new StoredU256(Blockchain.nextPointer, EMPTY_POINTER);
    private _mintingOpen: StoredBoolean = new StoredBoolean(Blockchain.nextPointer, false);

    public constructor() {
        super();
    }

    public override onDeployment(_calldata: Calldata): void {
        this.instantiate(
            new OP721InitParameters(
                'PropertyNFT',
                'OPWANFT',
                'https://opwabtc.io/nft/',
                u256.fromU64(100),
            ),
        );

        // 10 000 satoshis mint price
        this._price.value = u256.fromU64(10000);
        // Minting is active from deployment
        this._mintingOpen.value = true;
    }

    // --- Views ---

    @method()
    @returns({ name: 'price', type: ABIDataTypes.UINT256 })
    public mintPrice(_calldata: Calldata): BytesWriter {
        const writer = new BytesWriter(32);
        writer.writeU256(this._price.value);
        return writer;
    }

    @method()
    @returns({ name: 'open', type: ABIDataTypes.BOOL })
    public mintingOpen(_calldata: Calldata): BytesWriter {
        const writer = new BytesWriter(1);
        writer.writeBoolean(this._mintingOpen.value);
        return writer;
    }

    // --- Mint ---

    @method()
    @returns({ name: 'tokenId', type: ABIDataTypes.UINT256 })
    @emit('Transferred')
    public mint(_calldata: Calldata): BytesWriter {
        if (!this._mintingOpen.value) {
            throw new Revert('PropertyNFT: minting is closed');
        }

        const currentSupply = this.totalSupply;
        const max = this.maxSupply;

        if (SafeMath.add(currentSupply, u256.One) > max) {
            throw new Revert('PropertyNFT: max supply reached');
        }

        const to = Blockchain.tx.sender;
        const tokenId = this._nextTokenId.value;
        this._mint(to, tokenId);
        this._nextTokenId.value = SafeMath.add(tokenId, u256.One);

        const writer = new BytesWriter(32);
        writer.writeU256(tokenId);
        return writer;
    }

    // --- Admin ---

    @method()
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setMintingOpen(_calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        this._mintingOpen.value = true;
        const writer = new BytesWriter(1);
        writer.writeBoolean(true);
        return writer;
    }

    @method()
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setMintingClosed(_calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        this._mintingOpen.value = false;
        const writer = new BytesWriter(1);
        writer.writeBoolean(true);
        return writer;
    }

    @method({ name: 'newPrice', type: ABIDataTypes.UINT256 })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setMintPrice(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        const newPrice = calldata.readU256();
        this._price.value = newPrice;
        const writer = new BytesWriter(1);
        writer.writeBoolean(true);
        return writer;
    }
}
