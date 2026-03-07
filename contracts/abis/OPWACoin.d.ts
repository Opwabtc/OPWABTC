import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the buy function call.
 */
export type Buy = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the setTreasury function call.
 */
export type SetTreasury = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getTreasury function call.
 */
export type GetTreasury = CallResult<
    {
        treasury: Address;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the setPrice function call.
 */
export type SetPrice = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getPrice function call.
 */
export type GetPrice = CallResult<
    {
        price: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the setMinter function call.
 */
export type SetMinter = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

// ------------------------------------------------------------------
// IOPWACoin
// ------------------------------------------------------------------
export interface IOPWACoin extends IOP_NETContract {
    buy(to: Address, amount: bigint): Promise<Buy>;
    setTreasury(pubkey: Address): Promise<SetTreasury>;
    getTreasury(): Promise<GetTreasury>;
    setPrice(price: bigint): Promise<SetPrice>;
    getPrice(): Promise<GetPrice>;
    setMinter(minter: Address): Promise<SetMinter>;
}
