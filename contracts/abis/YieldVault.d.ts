import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the setAddresses function call.
 */
export type SetAddresses = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the stake function call.
 */
export type Stake = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the claimRewards function call.
 */
export type ClaimRewards = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the unstake function call.
 */
export type Unstake = CallResult<
    {
        success: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getStake function call.
 */
export type GetStake = CallResult<
    {
        amount: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getDepositBlock function call.
 */
export type GetDepositBlock = CallResult<
    {
        block: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getAccruedRewards function call.
 */
export type GetAccruedRewards = CallResult<
    {
        rewards: bigint;
    },
    OPNetEvent<never>[]
>;

// ------------------------------------------------------------------
// IYieldVault
// ------------------------------------------------------------------
export interface IYieldVault extends IOP_NETContract {
    setAddresses(opway: Address, usdop: Address): Promise<SetAddresses>;
    stake(amount: bigint): Promise<Stake>;
    claimRewards(): Promise<ClaimRewards>;
    unstake(): Promise<Unstake>;
    getStake(user: Address): Promise<GetStake>;
    getDepositBlock(user: Address): Promise<GetDepositBlock>;
    getAccruedRewards(user: Address): Promise<GetAccruedRewards>;
}
