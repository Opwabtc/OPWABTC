import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------
export type PegRateUpdatedEvent = {
    readonly oldRate: bigint;
    readonly newRate: bigint;
    readonly updatedAt: bigint;
};
export type MaxStalenessUpdatedEvent = {
    readonly oldStaleness: bigint;
    readonly newStaleness: bigint;
};
export type PegAuthorityTransferStartedEvent = {
    readonly currentAuthority: Address;
    readonly pendingAuthority: Address;
};
export type PegAuthorityTransferredEvent = {
    readonly previousAuthority: Address;
    readonly newAuthority: Address;
};
export type PegAuthorityRenouncedEvent = {
    readonly previousAuthority: Address;
};

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the pegRate function call.
 */
export type PegRate = CallResult<
    {
        rate: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the pegAuthority function call.
 */
export type PegAuthority = CallResult<
    {
        authority: Address;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the pegUpdatedAt function call.
 */
export type PegUpdatedAt = CallResult<
    {
        updatedAt: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the maxStaleness function call.
 */
export type MaxStaleness = CallResult<
    {
        staleness: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the isStale function call.
 */
export type IsStale = CallResult<
    {
        stale: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the updatePegRate function call.
 */
export type UpdatePegRate = CallResult<{}, OPNetEvent<PegRateUpdatedEvent>[]>;

/**
 * @description Represents the result of the updateMaxStaleness function call.
 */
export type UpdateMaxStaleness = CallResult<{}, OPNetEvent<MaxStalenessUpdatedEvent>[]>;

/**
 * @description Represents the result of the transferPegAuthority function call.
 */
export type TransferPegAuthority = CallResult<{}, OPNetEvent<PegAuthorityTransferStartedEvent>[]>;

/**
 * @description Represents the result of the acceptPegAuthority function call.
 */
export type AcceptPegAuthority = CallResult<{}, OPNetEvent<PegAuthorityTransferredEvent>[]>;

/**
 * @description Represents the result of the renouncePegAuthority function call.
 */
export type RenouncePegAuthority = CallResult<{}, OPNetEvent<PegAuthorityRenouncedEvent>[]>;

// ------------------------------------------------------------------
// IOP20S
// ------------------------------------------------------------------
export interface IOP20S extends IOP_NETContract {
    pegRate(): Promise<PegRate>;
    pegAuthority(): Promise<PegAuthority>;
    pegUpdatedAt(): Promise<PegUpdatedAt>;
    maxStaleness(): Promise<MaxStaleness>;
    isStale(): Promise<IsStale>;
    updatePegRate(newRate: bigint): Promise<UpdatePegRate>;
    updateMaxStaleness(newStaleness: bigint): Promise<UpdateMaxStaleness>;
    transferPegAuthority(newAuthority: Address): Promise<TransferPegAuthority>;
    acceptPegAuthority(): Promise<AcceptPegAuthority>;
    renouncePegAuthority(): Promise<RenouncePegAuthority>;
}
