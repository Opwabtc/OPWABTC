import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    OP_NET,
    Blockchain,
    Address,
    Calldata,
    BytesWriter,
    Revert,
    StoredAddress,
    StoredMapU256,
    TransferHelper,
} from '@btc-vision/btc-runtime/runtime';

@final
export class PropertyVault extends OP_NET {
    // PropertyNFT contract address
    private _propertyNft: StoredAddress = new StoredAddress(Blockchain.nextPointer);

    // tokenId (u256) → original owner (as u256, zero if not listed)
    private _owners:     StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);
    // tokenId → maxOpway listed price
    private _maxOpways:  StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);
    // tokenId → block when listed
    private _listBlocks: StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);

    public constructor() {
        super();
    }

    // ── Config ────────────────────────────────────────────────────────────────

    @method({ name: 'addr', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setPropertyNft(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        this._propertyNft.value = calldata.readAddress();
        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── List property ─────────────────────────────────────────────────────────

    @method(
        { name: 'tokenId',  type: ABIDataTypes.UINT256 },
        { name: 'maxOpway', type: ABIDataTypes.UINT256 },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public listProperty(calldata: Calldata): BytesWriter {
        const nft = this._propertyNft.value;
        if (nft.equals(Address.zero())) throw new Revert('PropertyVault: NFT not configured');

        const tokenId  = calldata.readU256();
        const maxOpway = calldata.readU256();
        const sender   = Blockchain.tx.sender;

        // Ensure not already listed
        const existingOwner = this._owners.get(tokenId);
        if (!existingOwner.isZero()) {
            throw new Revert('PropertyVault: token already listed');
        }

        // Transfer NFT custody to this vault (requires prior approve)
        TransferHelper.transferFrom(nft, sender, this.address, tokenId);

        // Record listing
        this._owners.set(tokenId, u256.fromUint8ArrayBE(sender));
        this._maxOpways.set(tokenId, maxOpway);
        this._listBlocks.set(tokenId, u256.fromU64(Blockchain.block.number));

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── Delist property ───────────────────────────────────────────────────────

    @method({ name: 'tokenId', type: ABIDataTypes.UINT256 })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public delistProperty(calldata: Calldata): BytesWriter {
        const nft = this._propertyNft.value;
        if (nft.equals(Address.zero())) throw new Revert('PropertyVault: NFT not configured');

        const tokenId  = calldata.readU256();
        const sender   = Blockchain.tx.sender;
        const ownerU256 = this._owners.get(tokenId);

        if (ownerU256.isZero()) throw new Revert('PropertyVault: token not listed');

        const senderU256 = u256.fromUint8ArrayBE(sender);
        if (ownerU256 != senderU256) throw new Revert('PropertyVault: not the original owner');

        // Return NFT to original owner
        TransferHelper.transfer(nft, sender, tokenId);

        // Clear all records
        this._owners.set(tokenId, u256.Zero);
        this._maxOpways.set(tokenId, u256.Zero);
        this._listBlocks.set(tokenId, u256.Zero);

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── Views ─────────────────────────────────────────────────────────────────

    @method({ name: 'tokenId', type: ABIDataTypes.UINT256 })
    @returns({ name: 'owner', type: ABIDataTypes.UINT256 })
    public getOwner(calldata: Calldata): BytesWriter {
        const tokenId = calldata.readU256();
        const result  = new BytesWriter(32);
        result.writeU256(this._owners.get(tokenId));
        return result;
    }

    @method({ name: 'tokenId', type: ABIDataTypes.UINT256 })
    @returns({ name: 'maxOpway', type: ABIDataTypes.UINT256 })
    public getMaxOpway(calldata: Calldata): BytesWriter {
        const tokenId = calldata.readU256();
        const result  = new BytesWriter(32);
        result.writeU256(this._maxOpways.get(tokenId));
        return result;
    }

    @method({ name: 'tokenId', type: ABIDataTypes.UINT256 })
    @returns({ name: 'listed', type: ABIDataTypes.BOOL })
    public isListed(calldata: Calldata): BytesWriter {
        const tokenId = calldata.readU256();
        const owner   = this._owners.get(tokenId);
        const result  = new BytesWriter(1);
        result.writeBoolean(!owner.isZero());
        return result;
    }

    public onUpdate(_calldata: Calldata): void {}

}
