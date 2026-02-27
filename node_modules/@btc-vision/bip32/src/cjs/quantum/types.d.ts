import { MLDSASecurityLevel } from './config.js';
import type { Network } from '@btc-vision/ecpair';
/**
 * ML-DSA key pair interface
 *
 * This represents a basic ML-DSA key pair without BIP32 functionality.
 * Key sizes vary by security level:
 * - LEVEL2 (44): 2560-byte private, 1312-byte public
 * - LEVEL3 (65): 4032-byte private, 1952-byte public
 * - LEVEL5 (87): 4896-byte private, 2592-byte public
 */
export interface MLDSAKeyPair {
    /** Private key containing polynomial vectors and matrices */
    privateKey: Uint8Array;
    /** Public key */
    publicKey: Uint8Array;
}
/**
 * Quantum-resistant signer interface using ML-DSA
 *
 * Provides sign/verify functionality for any ML-DSA security level.
 * This is essentially the same as MLDSAKeyPair but with methods instead of just data.
 */
export interface QuantumSigner {
    /** ML-DSA public key (size depends on security level) */
    publicKey: Uint8Array;
    /** ML-DSA private key (size depends on security level), undefined for neutered keys */
    privateKey?: Uint8Array;
    /**
     * Sign a message hash using ML-DSA
     * @param hash - The hash to sign
     * @returns ML-DSA signature (size depends on security level)
     */
    sign(hash: Uint8Array): Uint8Array;
    /**
     * Verify a signature using ML-DSA
     * @param hash - The hash that was signed
     * @param signature - The ML-DSA signature to verify
     * @returns true if signature is valid
     */
    verify(hash: Uint8Array, signature: Uint8Array): boolean;
}
/**
 * Quantum BIP32 interface extending standard BIP32 with ML-DSA support
 */
export interface QuantumBIP32Interface extends QuantumSigner {
    chainCode: Uint8Array;
    network: Network;
    depth: number;
    index: number;
    parentFingerprint: number;
    identifier: Uint8Array;
    fingerprint: Uint8Array;
    securityLevel: MLDSASecurityLevel;
    /**
     * Check if this is a neutered (public-only) key
     */
    isNeutered(): boolean;
    /**
     * Create a neutered (public-only) version of this key
     */
    neutered(): QuantumBIP32Interface;
    /**
     * Derive a child key at the given index
     * @param index - Child index (use >= 0x80000000 for hardened)
     */
    derive(index: number): QuantumBIP32Interface;
    /**
     * Derive a hardened child key
     * @param index - Child index (will be made hardened automatically)
     */
    deriveHardened(index: number): QuantumBIP32Interface;
    /**
     * Derive a key using a BIP32 path (e.g., "m/360'/0'/0'/0/0")
     * @param path - BIP32 derivation path
     */
    derivePath(path: string): QuantumBIP32Interface;
    /**
     * Export as base58-encoded extended key
     */
    toBase58(): string;
}
/**
 * Quantum BIP32 API interface
 */
export interface QuantumBIP32API {
    /**
     * Create a quantum master key from a seed
     * Uses ML-DSA for key generation (default: ML-DSA-44 on mainnet)
     * @param seed - Seed bytes (16-64 bytes)
     * @param network - Network configuration (defaults to quantum mainnet)
     * @param securityLevel - ML-DSA security level (44, 65, or 87) - defaults to 44
     */
    fromSeed(seed: Uint8Array, network?: Network, securityLevel?: MLDSASecurityLevel): QuantumBIP32Interface;
    /**
     * Import a quantum key from base58
     * Security level and network are detected from the version bytes
     * @param inString - Base58-encoded extended key
     */
    fromBase58(inString: string): QuantumBIP32Interface;
    /**
     * Create quantum key from public key and chain code
     * @param publicKey - ML-DSA public key (size depends on security level)
     * @param chainCode - Chain code (32 bytes)
     * @param network - Network configuration (defaults to quantum mainnet)
     * @param securityLevel - ML-DSA security level (44, 65, or 87) - required if not using default
     */
    fromPublicKey(publicKey: Uint8Array, chainCode: Uint8Array, network?: Network, securityLevel?: MLDSASecurityLevel): QuantumBIP32Interface;
    /**
     * Create quantum key from private key and chain code
     * @param privateKey - ML-DSA private key (size depends on security level)
     * @param chainCode - Chain code (32 bytes)
     * @param network - Network configuration (defaults to quantum mainnet)
     * @param securityLevel - ML-DSA security level (44, 65, or 87) - required if not using default
     */
    fromPrivateKey(privateKey: Uint8Array, chainCode: Uint8Array, network?: Network, securityLevel?: MLDSASecurityLevel): QuantumBIP32Interface;
    /**
     * Create quantum key from private key, public key, and chain code.
     * This avoids the expensive getPublicKey() derivation when the public key is already known.
     * Use this for faster imports when both keys are available (e.g., from backup/export).
     * @param privateKey - ML-DSA private key (size depends on security level)
     * @param publicKey - ML-DSA public key (size depends on security level)
     * @param chainCode - Chain code (32 bytes)
     * @param network - Network configuration (defaults to quantum mainnet)
     * @param securityLevel - ML-DSA security level (44, 65, or 87) - required if not using default
     */
    fromKeyPair(privateKey: Uint8Array, publicKey: Uint8Array, chainCode: Uint8Array, network?: Network, securityLevel?: MLDSASecurityLevel): QuantumBIP32Interface;
    /**
     * Restore a quantum BIP32 node from precomputed values.
     * Skips all validation — the caller must ensure values are correct.
     * Use this when restoring from cache/backup where keys and hierarchy metadata are already known.
     * @param privateKey - ML-DSA private key (or undefined for neutered)
     * @param publicKey - ML-DSA public key
     * @param chainCode - Chain code (32 bytes)
     * @param depth - Derivation depth
     * @param index - Child index
     * @param parentFingerprint - Parent key fingerprint
     * @param network - Network configuration (defaults to quantum mainnet)
     * @param securityLevel - ML-DSA security level (44, 65, or 87) - required if not using default
     */
    fromPrecomputed(privateKey: Uint8Array | undefined, publicKey: Uint8Array, chainCode: Uint8Array, depth: number, index: number, parentFingerprint: number, network?: Network, securityLevel?: MLDSASecurityLevel): QuantumBIP32Interface;
}
