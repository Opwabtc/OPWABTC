import { ml_dsa44, ml_dsa65, ml_dsa87 } from '@btc-vision/post-quantum/ml-dsa.js';
import type { Network } from '@btc-vision/ecpair';
/**
 * ML-DSA security levels
 *
 * These correspond to NIST security levels:
 * - LEVEL2: 128-bit classical security (ML-DSA-44)
 * - LEVEL3: 192-bit classical security (ML-DSA-65)
 * - LEVEL5: 256-bit classical security (ML-DSA-87)
 */
export declare enum MLDSASecurityLevel {
    /** Level 2 security - 128-bit classical security (smallest keys) */
    LEVEL2 = 44,
    /** Level 3 security - 192-bit classical security (balanced) */
    LEVEL3 = 65,
    /** Level 5 security - 256-bit classical security (highest security) */
    LEVEL5 = 87
}
/**
 * ML-DSA algorithm configuration
 */
export interface MLDSAConfig {
    /** Security level identifier */
    level: MLDSASecurityLevel;
    /** Private key size in bytes */
    privateKeySize: number;
    /** Public key size in bytes */
    publicKeySize: number;
    /** Signature size in bytes */
    signatureSize: number;
    /** The actual ML-DSA implementation from post-quantum library */
    algorithm: typeof ml_dsa44 | typeof ml_dsa65 | typeof ml_dsa87;
    /** Network configuration */
    network: Network;
}
/**
 * Default security level (Level 2 - 128-bit classical security)
 */
export declare const DEFAULT_SECURITY_LEVEL: MLDSASecurityLevel;
/**
 * Get ML-DSA configuration for a specific security level and network
 * @param level - Security level (44, 65, or 87)
 * @param network - Network configuration
 */
export declare function getMLDSAConfig(level: MLDSASecurityLevel, network: Network): MLDSAConfig;
/**
 * Find matching network and determine if private/public by version bytes
 * Used when importing from base58
 */
export declare function findNetworkByVersion(version: number): {
    network: Network;
    isPrivate: boolean;
} | null;
