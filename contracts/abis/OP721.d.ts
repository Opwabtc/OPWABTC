import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------
export type TransferredEvent = {
    readonly operator: Address;
    readonly from: Address;
    readonly to: Address;
    readonly amount: bigint;
};
export type ApprovedEvent = {
    readonly owner: Address;
    readonly spender: Address;
    readonly amount: bigint;
};
export type ApprovedForAllEvent = {
    readonly account: Address;
    readonly operator: Address;
    readonly approved: boolean;
};
export type URIEvent = {
    readonly value: string;
    readonly id: bigint;
};

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the name function call.
 */
export type Name = CallResult<
    {
        name: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the symbol function call.
 */
export type Symbol = CallResult<
    {
        symbol: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the maxSupply function call.
 */
export type MaxSupply = CallResult<
    {
        maxSupply: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the collectionInfo function call.
 */
export type CollectionInfo = CallResult<
    {
        icon: string;
        banner: string;
        description: string;
        website: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the tokenURI function call.
 */
export type TokenURI = CallResult<
    {
        uri: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the changeMetadata function call.
 */
export type ChangeMetadata = CallResult<{}, OPNetEvent<never>[]>;

/**
 * @description Represents the result of the totalSupply function call.
 */
export type TotalSupply = CallResult<
    {
        totalSupply: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the balanceOf function call.
 */
export type BalanceOf = CallResult<
    {
        balance: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the ownerOf function call.
 */
export type OwnerOf = CallResult<
    {
        owner: Address;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the transfer function call.
 */
export type Transfer = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the transferFrom function call.
 */
export type TransferFrom = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the safeTransfer function call.
 */
export type SafeTransfer = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the safeTransferFrom function call.
 */
export type SafeTransferFrom = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the approve function call.
 */
export type Approve = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the getApproved function call.
 */
export type GetApproved = CallResult<{}, OPNetEvent<never>[]>;

/**
 * @description Represents the result of the setApprovalForAll function call.
 */
export type SetApprovalForAll = CallResult<{}, OPNetEvent<ApprovedForAllEvent>[]>;

/**
 * @description Represents the result of the isApprovedForAll function call.
 */
export type IsApprovedForAll = CallResult<
    {
        approved: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the approveBySignature function call.
 */
export type ApproveBySignature = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the setApprovalForAllBySignature function call.
 */
export type SetApprovalForAllBySignature = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the burn function call.
 */
export type Burn = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the domainSeparator function call.
 */
export type DomainSeparator = CallResult<
    {
        domainSeparator: Uint8Array;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the tokenOfOwnerByIndex function call.
 */
export type TokenOfOwnerByIndex = CallResult<
    {
        tokenId: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getApproveNonce function call.
 */
export type GetApproveNonce = CallResult<
    {
        nonce: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the setBaseURI function call.
 */
export type SetBaseURI = CallResult<{}, OPNetEvent<URIEvent>[]>;

/**
 * @description Represents the result of the metadata function call.
 */
export type Metadata = CallResult<
    {
        name: string;
        symbol: string;
        icon: string;
        banner: string;
        description: string;
        website: string;
        totalSupply: bigint;
        domainSeparator: Uint8Array;
    },
    OPNetEvent<never>[]
>;

// ------------------------------------------------------------------
// IOP721
// ------------------------------------------------------------------
export interface IOP721 extends IOP_NETContract {
    name(): Promise<Name>;
    symbol(): Promise<Symbol>;
    maxSupply(): Promise<MaxSupply>;
    collectionInfo(): Promise<CollectionInfo>;
    tokenURI(tokenId: bigint): Promise<TokenURI>;
    changeMetadata(): Promise<ChangeMetadata>;
    totalSupply(): Promise<TotalSupply>;
    balanceOf(owner: Address): Promise<BalanceOf>;
    ownerOf(tokenId: bigint): Promise<OwnerOf>;
    transfer(to: Address, tokenId: bigint): Promise<Transfer>;
    transferFrom(from: Address, to: Address, tokenId: bigint): Promise<TransferFrom>;
    safeTransfer(to: Address, tokenId: bigint, data: Uint8Array): Promise<SafeTransfer>;
    safeTransferFrom(from: Address, to: Address, tokenId: bigint, data: Uint8Array): Promise<SafeTransferFrom>;
    approve(operator: Address, tokenId: bigint): Promise<Approve>;
    getApproved(tokenId: bigint): Promise<GetApproved>;
    setApprovalForAll(operator: Address, approved: boolean): Promise<SetApprovalForAll>;
    isApprovedForAll(owner: Address, operator: Address): Promise<IsApprovedForAll>;
    approveBySignature(
        owner: Uint8Array,
        ownerTweakedPublicKey: Uint8Array,
        operator: Address,
        tokenId: bigint,
        deadline: bigint,
        signature: Uint8Array,
    ): Promise<ApproveBySignature>;
    setApprovalForAllBySignature(
        owner: Uint8Array,
        ownerTweakedPublicKey: Uint8Array,
        operator: Address,
        approved: boolean,
        deadline: bigint,
        signature: Uint8Array,
    ): Promise<SetApprovalForAllBySignature>;
    burn(tokenId: bigint): Promise<Burn>;
    domainSeparator(): Promise<DomainSeparator>;
    tokenOfOwnerByIndex(owner: Address, index: bigint): Promise<TokenOfOwnerByIndex>;
    getApproveNonce(owner: Address): Promise<GetApproveNonce>;
    setBaseURI(baseURI: string): Promise<SetBaseURI>;
    metadata(): Promise<Metadata>;
}
