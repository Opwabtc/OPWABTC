import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the mint function call.
 */
export type Mint = CallResult<
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

// ------------------------------------------------------------------
// IOPWAYield
// ------------------------------------------------------------------
export interface IOPWAYield extends IOP_NETContract {
    mint(to: Address, amount: bigint): Promise<Mint>;
    setTreasury(pubkey: Address, bech32To: string): Promise<SetTreasury>;
    getTreasury(): Promise<GetTreasury>;
    setPrice(price: bigint): Promise<SetPrice>;
    getPrice(): Promise<GetPrice>;
}
