/**
 * Standard BIP derivation paths for Bitcoin wallets
 *
 * These paths follow Bitcoin Improvement Proposals (BIPs) that define
 * standardized derivation paths for different address types and use cases.
 */
/**
 * Standard derivation paths for Bitcoin addresses
 */
export declare enum DerivationPath {
    /** BIP44 - Legacy P2PKH addresses (1...) */
    BIP44 = "m/44'/0'/0'/0/0",
    /** BIP49 - SegWit P2SH-P2WPKH addresses (3...) */
    BIP49 = "m/49'/0'/0'/0/0",
    /** BIP84 - Native SegWit P2WPKH addresses (bc1q...) */
    BIP84 = "m/84'/0'/0'/0/0",
    /** BIP86 - Taproot P2TR addresses (bc1p...) */
    BIP86 = "m/86'/0'/0'/0/0",
    /** BIP360 - Post-Quantum (experimental, quantum-resistant keys) */
    BIP360 = "m/360'/0'/0'/0/0"
}
/**
 * Quantum-specific derivation paths (using coin type 360' for quantum)
 */
export declare enum QuantumDerivationPath {
    /** Standard quantum path - m/360'/0'/0'/0/0 */
    STANDARD = "m/360'/0'/0'/0/0",
    /** Quantum change path - m/360'/0'/0'/1/0 */
    CHANGE = "m/360'/0'/0'/1/0",
    /** Quantum account 0, address 0 */
    ACCOUNT_0_ADDRESS_0 = "m/360'/0'/0'/0/0",
    /** Quantum account 0, address 1 */
    ACCOUNT_0_ADDRESS_1 = "m/360'/0'/0'/0/1",
    /** Quantum account 1, address 0 */
    ACCOUNT_1_ADDRESS_0 = "m/360'/1'/0'/0/0"
}
/**
 * Get derivation path by account and address index
 * @param account - Account index (default: 0)
 * @param addressIndex - Address index (default: 0)
 * @param isChange - Whether this is a change address (default: false)
 * @returns BIP32 derivation path string
 */
export declare function getQuantumPath(account?: number, addressIndex?: number, isChange?: boolean): string;
/**
 * Get standard Bitcoin derivation path by account and address index
 * @param bipType - BIP type (44, 49, 84, or 86)
 * @param account - Account index (default: 0)
 * @param addressIndex - Address index (default: 0)
 * @param isChange - Whether this is a change address (default: false)
 * @returns BIP32 derivation path string
 */
export declare function getBitcoinPath(bipType: 44 | 49 | 84 | 86, account?: number, addressIndex?: number, isChange?: boolean): string;
/**
 * Type representing valid derivation paths for standard BIP32
 * Can be an enum value or any custom BIP32 path string
 */
export type DerivationPathType = DerivationPath | string;
/**
 * Type representing valid derivation paths for quantum BIP32
 * Can be an enum value or any custom BIP32 path string
 */
export type QuantumDerivationPathType = QuantumDerivationPath | string;
