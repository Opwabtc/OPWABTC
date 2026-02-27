/**
 * Quantum-resistant BIP32 implementation using ML-DSA
 *
 * This module provides hierarchical deterministic key derivation using
 * ML-DSA (FIPS 204) for post-quantum security.
 *
 * Key features:
 * - Uses BIP32 path derivation (e.g., m/360'/0'/0'/0/0)
 * - Supports ML-DSA-44 (default), ML-DSA-65, and ML-DSA-87
 * - ML-DSA-44 provides Level 2 security (128-bit classical security)
 * - ML-DSA-65 provides Level 3 security (192-bit classical security)
 * - ML-DSA-87 provides Level 5 security (256-bit classical security)
 * - Compatible with standard BIP32 mnemonic seeds
 *
 * Usage:
 * ```typescript
 * import {
 *   QuantumBIP32Factory,
 *   MLDSASecurityLevel,
 *   QuantumDerivationPath
 * } from '@btc-vision/bip32/quantum';
 *
 * const seed = ...; // Your BIP39 seed
 *
 * // Default: ML-DSA-44 (Level 2 security)
 * const master = QuantumBIP32Factory.fromSeed(seed);
 *
 * // Or specify security level explicitly using enum
 * const master87 = QuantumBIP32Factory.fromSeed(seed, MLDSASecurityLevel.LEVEL5);
 * const master65 = QuantumBIP32Factory.fromSeed(seed, MLDSASecurityLevel.LEVEL3);
 * const master44 = QuantumBIP32Factory.fromSeed(seed, MLDSASecurityLevel.LEVEL2);
 *
 * // Use standard derivation paths
 * const child = master.derivePath(QuantumDerivationPath.STANDARD);
 *
 * const signature = child.sign(messageHash);
 * const isValid = child.verify(messageHash, signature);
 * ```
 */
export { QuantumBIP32Factory } from './mldsa.js';
export { QuantumBIP32Interface, QuantumBIP32API, QuantumSigner, MLDSAKeyPair, } from './types.js';
export { MLDSASecurityLevel, MLDSAConfig, DEFAULT_SECURITY_LEVEL, getMLDSAConfig, } from './config.js';
