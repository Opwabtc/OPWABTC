// FIX 5.101: Hashing in this contract (StoredMapU256 composite keys) uses the
// AssemblyScript native SHA256 provided by the @btc-vision/btc-runtime runtime.
// No external WASM SHA256 module is required or loaded.
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    OP_NET,
    Blockchain,
    Address,
    Calldata,
    BytesWriter,
    Revert,
    SafeMath,
    StoredAddress,
    StoredMapU256,
    TransferHelper,
    NetEvent,
    encodeSelector,
} from '@btc-vision/btc-runtime/runtime';
import {
    SELECTOR_BYTE_LENGTH,
    ADDRESS_BYTE_LENGTH,
    U256_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

// ── NetEvents ─────────────────────────────────────────────────────────────────
// FIX CF-12: emit events

@final
class ListEvent extends NetEvent {
    constructor(tokenId: u256, owner: Address, price: u256) {
        const data = new BytesWriter(96); // 32 + 32 + 32
        data.writeU256(tokenId);
        data.writeAddress(owner);
        data.writeU256(price);
        super('PropertyListed', data);
    }
}

@final
class DelistEvent extends NetEvent {
    constructor(tokenId: u256, owner: Address) {
        const data = new BytesWriter(64); // 32 + 32
        data.writeU256(tokenId);
        data.writeAddress(owner);
        super('PropertyDelisted', data);
    }
}

@final
class PurchaseEvent extends NetEvent {
    constructor(tokenId: u256, seller: Address, buyer: Address, price: u256) {
        const data = new BytesWriter(128); // 32 + 32 + 32 + 32
        data.writeU256(tokenId);
        data.writeAddress(seller);
        data.writeAddress(buyer);
        data.writeU256(price);
        super('PropertyPurchased', data);
    }
}

@final
export class PropertyVault extends OP_NET {
    // PropertyNFT contract address
    private _propertyNft: StoredAddress = new StoredAddress(Blockchain.nextPointer);
    // OPWAY token address (for purchases)
    private _opway:       StoredAddress = new StoredAddress(Blockchain.nextPointer);

    // tokenId → original owner (as u256, zero if not listed)
    private _owners:     StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);
    // tokenId → listing price in OPWAY
    private _maxOpways:  StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);
    // tokenId → block when listed
    private _listBlocks: StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);
    // address → active listing count (FIX 5.87: max 50 simultaneous listings)
    private _listCounts: StoredMapU256 = new StoredMapU256(Blockchain.nextPointer);

    public constructor() {
        super();
    }

    public onUpdate(_calldata: Calldata): void {}

    // ── Config ────────────────────────────────────────────────────────────────

    @method(
        { name: 'nft',   type: ABIDataTypes.ADDRESS },
        { name: 'opway', type: ABIDataTypes.ADDRESS },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public configure(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        this._propertyNft.value = calldata.readAddress();
        this._opway.value       = calldata.readAddress();
        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // Keep backward compat — configure with NFT address only
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
        if (maxOpway.isZero()) throw new Revert('PropertyVault: price must be > 0');
        // FIX 5.84: upper bound guard — prevent absurd listing prices
        const MAX_OPWAY = u256.fromU64(1_000_000_000_000_000); // 10M OPWAY (8 decimals)
        if (u256.gt(maxOpway, MAX_OPWAY)) throw new Revert('PropertyVault: price exceeds maximum');

        const sender = Blockchain.tx.sender;

        // FIX 5.87: cap simultaneous listings per address
        const senderKey = u256.fromUint8ArrayBE(sender);
        const listCount = this._listCounts.get(senderKey);
        if (u256.ge(listCount, u256.fromU64(50))) throw new Revert('PropertyVault: max 50 active listings');

        const existingOwner = this._owners.get(tokenId);
        if (!existingOwner.isZero()) throw new Revert('PropertyVault: token already listed');

        // Transfer NFT custody to vault (requires prior approve)
        TransferHelper.transferFrom(nft, sender, this.address, tokenId);

        // Record listing + increment owner counter (FIX 5.87)
        this._owners.set(tokenId, senderKey);
        this._maxOpways.set(tokenId, maxOpway);
        this._listBlocks.set(tokenId, u256.fromU64(Blockchain.block.number));
        this._listCounts.set(senderKey, SafeMath.add(listCount, u256.One));

        // FIX CF-12
        Blockchain.emit(new ListEvent(tokenId, sender, maxOpway));

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

        const tokenId   = calldata.readU256();
        const sender    = Blockchain.tx.sender;
        const ownerU256 = this._owners.get(tokenId);

        if (ownerU256.isZero()) throw new Revert('PropertyVault: token not listed');

        const senderU256 = u256.fromUint8ArrayBE(sender);
        if (!u256.eq(ownerU256, senderU256)) throw new Revert('PropertyVault: not the original owner'); // V2-C-04: was JS `!=` — u256.eq for correct comparison

        // FIX CF-08 (HIGH CEI): clear state BEFORE external call (FIX 5.87: decrement counter)
        this._owners.set(tokenId, u256.Zero);
        this._maxOpways.set(tokenId, u256.Zero);
        this._listBlocks.set(tokenId, u256.Zero);
        const prevCount = this._listCounts.get(senderU256);
        if (!prevCount.isZero()) this._listCounts.set(senderU256, SafeMath.sub(prevCount, u256.One));

        // External call AFTER state cleared
        TransferHelper.transfer(nft, sender, tokenId);

        // FIX CF-12
        Blockchain.emit(new DelistEvent(tokenId, sender));

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── Purchase property ─────────────────────────────────────────────────────
    // FIX CF-09 (HIGH): was missing entirely — maxOpway stored but no purchase() function

    @method(
        { name: 'tokenId', type: ABIDataTypes.UINT256 },
        { name: 'offerOpway', type: ABIDataTypes.UINT256 },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public purchaseProperty(calldata: Calldata): BytesWriter {
        const nft   = this._propertyNft.value;
        const opway = this._opway.value;
        if (nft.equals(Address.zero()))   throw new Revert('PropertyVault: NFT not configured');
        if (opway.equals(Address.zero())) throw new Revert('PropertyVault: OPWAY not configured');

        const tokenId    = calldata.readU256();
        const offerOpway = calldata.readU256();
        const buyer      = Blockchain.tx.sender;

        const ownerU256 = this._owners.get(tokenId);
        if (ownerU256.isZero()) throw new Revert('PropertyVault: token not listed');

        const listPrice = this._maxOpways.get(tokenId);
        if (u256.lt(offerOpway, listPrice)) throw new Revert('PropertyVault: offer below list price'); // V2-C-04: was JS `<` — u256.lt for correct comparison

        // Reconstruct seller address from stored u256 (big-endian 32 bytes)
        const sellerBytes = ownerU256.toUint8Array(true); // big-endian
        const seller      = Address.fromUint8Array(sellerBytes);

        // CEI: clear listing BEFORE external calls (FIX 5.87: decrement seller counter)
        this._owners.set(tokenId, u256.Zero);
        this._maxOpways.set(tokenId, u256.Zero);
        this._listBlocks.set(tokenId, u256.Zero);
        const sellerCount = this._listCounts.get(ownerU256);
        if (!sellerCount.isZero()) this._listCounts.set(ownerU256, SafeMath.sub(sellerCount, u256.One));

        // Transfer OPWAY from buyer to seller
        TransferHelper.transferFrom(opway, buyer, seller, listPrice);

        // Transfer NFT from vault to buyer
        TransferHelper.transfer(nft, buyer, tokenId);

        // FIX CF-12
        Blockchain.emit(new PurchaseEvent(tokenId, seller, buyer, listPrice));

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
}
