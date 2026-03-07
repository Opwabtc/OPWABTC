import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the configure function call.
 */
export type Configure = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the setPropertyNft function call.
 */
export type SetPropertyNft = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the listProperty function call.
 */
export type ListProperty = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the delistProperty function call.
 */
export type DelistProperty = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the purchaseProperty function call.
 */
export type PurchaseProperty = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getOwner function call.
 */
export type GetOwner = CallResult<
    {
        owner: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getMaxOpway function call.
 */
export type GetMaxOpway = CallResult<
    {
        maxOpway: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the isListed function call.
 */
export type IsListed = CallResult<
    {
        listed: boolean;
    },
    OPNetEvent<never>[]
>;

// ------------------------------------------------------------------
// IPropertyVault
// ------------------------------------------------------------------
export interface IPropertyVault extends IOP_NETContract {
    configure(nft: Address, opway: Address): Promise<Configure>;
    setPropertyNft(addr: Address): Promise<SetPropertyNft>;
    listProperty(tokenId: bigint, maxOpway: bigint): Promise<ListProperty>;
    delistProperty(tokenId: bigint): Promise<DelistProperty>;
    purchaseProperty(tokenId: bigint, offerOpway: bigint): Promise<PurchaseProperty>;
    getOwner(tokenId: bigint): Promise<GetOwner>;
    getMaxOpway(tokenId: bigint): Promise<GetMaxOpway>;
    isListed(tokenId: bigint): Promise<IsListed>;
}
