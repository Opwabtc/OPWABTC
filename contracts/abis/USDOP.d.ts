import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the setMinter function call.
 */
export type SetMinter = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getMinter function call.
 */
export type GetMinter = CallResult<
    {
        minter: Address;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the mintUSDOP function call.
 */
export type MintUSDOP = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

// ------------------------------------------------------------------
// IUSDOP
// ------------------------------------------------------------------
export interface IUSDOP extends IOP_NETContract {
    setMinter(minter: Address): Promise<SetMinter>;
    getMinter(): Promise<GetMinter>;
    mintUSDOP(to: Address, amount: bigint): Promise<MintUSDOP>;
}
