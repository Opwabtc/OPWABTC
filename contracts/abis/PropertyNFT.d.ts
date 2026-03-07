import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the mintNFT function call.
 */
export type MintNFT = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the setMintPrice function call.
 */
export type SetMintPrice = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the setMintingOpen function call.
 */
export type SetMintingOpen = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

// ------------------------------------------------------------------
// IPropertyNFT
// ------------------------------------------------------------------
export interface IPropertyNFT extends IOP_NETContract {
    mintNFT(to: Address, tokenId: bigint): Promise<MintNFT>;
    setMintPrice(priceSats: bigint): Promise<SetMintPrice>;
    setMintingOpen(open: boolean): Promise<SetMintingOpen>;
}
