"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuantumBIP32Factory = void 0;
const utils_js_1 = require("@btc-vision/post-quantum/utils.js");
const crypto = __importStar(require("../crypto.cjs"));
const tools = __importStar(require("uint8array-tools"));
const types_js_1 = require("../types.cjs");
const bs58check = __importStar(require("@btc-vision/bs58check"));
const config_js_1 = require("./config.cjs");
const networks_js_1 = require("../networks.cjs");
const CHAIN_CODE_SIZE = 32;
const HIGHEST_BIT = 0x80000000;
const BITCOIN_SEED = tools.fromUtf8('Bitcoin seed');
/**
 * Quantum signer implementation using ML-DSA
 */
class QuantumBip32Signer {
    _privateKey;
    _publicKey;
    config;
    constructor(_privateKey, _publicKey, config) {
        this._privateKey = _privateKey;
        this._publicKey = _publicKey;
        this.config = config;
    }
    get publicKey() {
        if (!this._publicKey) {
            throw new Error('Public key not available');
        }
        return this._publicKey;
    }
    get privateKey() {
        return this._privateKey;
    }
    sign(hash) {
        if (!this._privateKey) {
            throw new Error('Missing private key');
        }
        // ML-DSA signature with extra entropy for enhanced security
        const signature = this.config.algorithm.sign(hash, this._privateKey, {
            extraEntropy: (0, utils_js_1.randomBytes)(32),
        });
        return signature;
    }
    verify(hash, signature) {
        return this.config.algorithm.verify(signature, hash, this._publicKey);
    }
}
/**
 * Quantum BIP32 implementation using ML-DSA
 * Uses BIP32 for hierarchical seed derivation, then ML-DSA for key generation
 */
class QuantumBIP32 extends QuantumBip32Signer {
    chainCode;
    _depth;
    _index;
    _parentFingerprint;
    constructor(_privateKey, _publicKey, chainCode, config, _depth = 0, _index = 0, _parentFingerprint = 0x00000000) {
        super(_privateKey, _publicKey, config);
        this.chainCode = chainCode;
        this._depth = _depth;
        this._index = _index;
        this._parentFingerprint = _parentFingerprint;
    }
    get depth() {
        return this._depth;
    }
    get index() {
        return this._index;
    }
    get parentFingerprint() {
        return this._parentFingerprint;
    }
    #ID;
    get identifier() {
        if (this.#ID === undefined)
            this.#ID = crypto.hash160(this.publicKey);
        return this.#ID;
    }
    get fingerprint() {
        return this.identifier.subarray(0, 4);
    }
    get securityLevel() {
        return this.config.level;
    }
    get network() {
        return this.config.network;
    }
    isNeutered() {
        return this._privateKey === undefined;
    }
    neutered() {
        return new QuantumBIP32(undefined, this.publicKey, this.chainCode, this.config, this.depth, this.index, this.parentFingerprint);
    }
    toBase58() {
        const version = !this.isNeutered()
            ? this.config.network.bip32.private
            : this.config.network.bip32.public;
        const isPrivate = !this.isNeutered();
        const keySize = isPrivate
            ? this.config.privateKeySize
            : this.config.publicKeySize;
        // Byte layout:
        // 4 bytes: version
        // 1 byte: depth
        // 4 bytes: parent fingerprint
        // 4 bytes: child index
        // 32 bytes: chain code
        // variable bytes: key data (depends on security level)
        const bufferSize = 4 + 1 + 4 + 4 + 32 + keySize;
        const buffer = new Uint8Array(bufferSize);
        let offset = 0;
        // Version
        tools.writeUInt32(buffer, offset, version, 'BE');
        offset += 4;
        // Depth
        tools.writeUInt8(buffer, offset, this.depth);
        offset += 1;
        // Parent fingerprint
        tools.writeUInt32(buffer, offset, this.parentFingerprint, 'BE');
        offset += 4;
        // Child index
        tools.writeUInt32(buffer, offset, this.index, 'BE');
        offset += 4;
        // Chain code
        buffer.set(this.chainCode, offset);
        offset += 32;
        // Key data
        if (isPrivate) {
            buffer.set(this._privateKey, offset);
        }
        else {
            buffer.set(this._publicKey, offset);
        }
        return bs58check.encode(buffer);
    }
    /**
     * Derive a child key using BIP32 HMAC chain for seed derivation,
     * then ML-DSA for key generation
     */
    derive(index) {
        if (index !== (index >>> 0))
            throw new TypeError('Expected UInt32, got ' + index);
        // ML-DSA cannot derive child keys without the private key
        // Unlike EC crypto, you cannot do public key only derivation
        if (this.isNeutered()) {
            throw new TypeError('Cannot derive child keys without private key');
        }
        const isHardened = index >= HIGHEST_BIT;
        let data;
        // Hardened child
        if (isHardened) {
            // For ML-DSA, we use a hash of the private key for derivation data
            // since the private key can be large
            const privateKeyHash = crypto.hash256(this._privateKey);
            data = new Uint8Array(1 + 32 + 4);
            data[0] = 0x00;
            data.set(privateKeyHash, 1);
            tools.writeUInt32(data, 33, index, 'BE');
        }
        else {
            // Normal child - still needs private key for ML-DSA
            // Use hash of private key (not public key like EC)
            const privateKeyHash = crypto.hash256(this._privateKey);
            data = new Uint8Array(32 + 4);
            data.set(privateKeyHash, 0);
            tools.writeUInt32(data, 32, index, 'BE');
        }
        // Derive 512-bit seed using HMAC-SHA512
        const I = crypto.hmacSHA512(this.chainCode, data);
        const IL = I.slice(0, 32); // 256 bits for key generation seed
        const IR = I.slice(32); // 256 bits for new chain code
        // Use IL as entropy for ML-DSA key generation
        // Generate ML-DSA key pair from seed
        const { secretKey: privateKey, publicKey } = this.config.algorithm.keygen(IL);
        return new QuantumBIP32(privateKey, publicKey, IR, this.config, this.depth + 1, index, tools.readUInt32(this.fingerprint, 0, 'BE'));
    }
    deriveHardened(index) {
        if (!Number.isInteger(index) ||
            index < 0 ||
            index > 0x7fffffff)
            throw new TypeError('Expected UInt31, got ' + index);
        return this.derive(index + HIGHEST_BIT);
    }
    derivePath(path) {
        (0, types_js_1.validateBip32Path)(path);
        let splitPath = path.split('/');
        if (splitPath[0] === 'm') {
            if (this.parentFingerprint) {
                throw new TypeError('Expected master, got child');
            }
            splitPath = splitPath.slice(1);
        }
        return splitPath.reduce((prevHd, indexStr) => {
            let index;
            if (indexStr.slice(-1) === `'`) {
                index = parseInt(indexStr.slice(0, -1), 10);
                return prevHd.deriveHardened(index);
            }
            else {
                index = parseInt(indexStr, 10);
                return prevHd.derive(index);
            }
        }, this);
    }
}
/**
 * Create a quantum BIP32 master key from a seed
 * Follows standard BIP32 pattern: fromSeed(seed, network?, securityLevel?)
 */
function fromSeed(seed, network, securityLevel) {
    if (!(seed instanceof Uint8Array))
        throw new TypeError('Expected Uint8Array');
    if (seed.length < 16) {
        throw new TypeError('Seed should be at least 128 bits');
    }
    if (seed.length > 64) {
        throw new TypeError('Seed should be at most 512 bits');
    }
    const config = (0, config_js_1.getMLDSAConfig)(securityLevel || config_js_1.MLDSASecurityLevel.LEVEL2, network || networks_js_1.BITCOIN);
    // Use BIP32 standard HMAC for initial seed derivation
    const I = crypto.hmacSHA512(BITCOIN_SEED, seed);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    // Generate ML-DSA master key pair
    const { secretKey: privateKey, publicKey } = config.algorithm.keygen(IL);
    return new QuantumBIP32(privateKey, publicKey, IR, // Chain code
    config, 0, // depth
    0, // index
    0);
}
/**
 * Import a quantum key from base58
 * Network is detected from version bytes, security level from key size
 */
function fromBase58(inString) {
    const buffer = bs58check.decode(inString);
    // Read version to determine network
    const version = tools.readUInt32(buffer, 0, 'BE');
    // Find matching network by version
    const match = (0, config_js_1.findNetworkByVersion)(version);
    if (!match) {
        throw new TypeError('Unknown network version');
    }
    const { network, isPrivate } = match;
    // Determine security level from payload size
    // Byte layout: 4 (version) + 1 (depth) + 4 (parent fp) + 4 (index) + 32 (chain code) + key data
    const headerSize = 4 + 1 + 4 + 4 + 32;
    const keyDataSize = buffer.length - headerSize;
    // Map key sizes to security levels
    let securityLevel;
    if (isPrivate) {
        // Private key sizes: 2560 (44), 4032 (65), 4896 (87)
        if (keyDataSize === 2560) {
            securityLevel = config_js_1.MLDSASecurityLevel.LEVEL2;
        }
        else if (keyDataSize === 4032) {
            securityLevel = config_js_1.MLDSASecurityLevel.LEVEL3;
        }
        else if (keyDataSize === 4896) {
            securityLevel = config_js_1.MLDSASecurityLevel.LEVEL5;
        }
        else {
            throw new TypeError(`Invalid private key size: ${keyDataSize}`);
        }
    }
    else {
        // Public key sizes: 1312 (44), 1952 (65), 2592 (87)
        if (keyDataSize === 1312) {
            securityLevel = config_js_1.MLDSASecurityLevel.LEVEL2;
        }
        else if (keyDataSize === 1952) {
            securityLevel = config_js_1.MLDSASecurityLevel.LEVEL3;
        }
        else if (keyDataSize === 2592) {
            securityLevel = config_js_1.MLDSASecurityLevel.LEVEL5;
        }
        else {
            throw new TypeError(`Invalid public key size: ${keyDataSize}`);
        }
    }
    const config = (0, config_js_1.getMLDSAConfig)(securityLevel, network);
    const expectedSize = isPrivate
        ? 4 + 1 + 4 + 4 + 32 + config.privateKeySize
        : 4 + 1 + 4 + 4 + 32 + config.publicKeySize;
    if (buffer.length !== expectedSize) {
        throw new TypeError(`Invalid buffer length: expected ${expectedSize}, got ${buffer.length}`);
    }
    let offset = 4;
    // Depth
    const depth = buffer[offset];
    offset += 1;
    // Parent fingerprint
    const parentFingerprint = tools.readUInt32(buffer, offset, 'BE');
    if (depth === 0 && parentFingerprint !== 0x00000000) {
        throw new TypeError('Invalid parent fingerprint');
    }
    offset += 4;
    // Child index
    const index = tools.readUInt32(buffer, offset, 'BE');
    if (depth === 0 && index !== 0) {
        throw new TypeError('Invalid index');
    }
    offset += 4;
    // Chain code
    const chainCode = buffer.slice(offset, offset + 32);
    offset += 32;
    // Key data
    if (isPrivate) {
        const privateKey = buffer.slice(offset, offset + config.privateKeySize);
        const publicKey = config.algorithm.getPublicKey(privateKey);
        return new QuantumBIP32(privateKey, publicKey, chainCode, config, depth, index, parentFingerprint);
    }
    else {
        const publicKey = buffer.slice(offset, offset + config.publicKeySize);
        return new QuantumBIP32(undefined, publicKey, chainCode, config, depth, index, parentFingerprint);
    }
}
/**
 * Create quantum key from public key and chain code
 * Follows standard BIP32 pattern: fromPublicKey(publicKey, chainCode, network?, securityLevel?)
 */
function fromPublicKey(publicKey, chainCode, network, securityLevel) {
    const config = (0, config_js_1.getMLDSAConfig)(securityLevel || config_js_1.MLDSASecurityLevel.LEVEL2, network || networks_js_1.BITCOIN);
    if (publicKey.length !== config.publicKeySize) {
        throw new TypeError(`Invalid public key length for ML-DSA-${securityLevel}: expected ${config.publicKeySize}, got ${publicKey.length}`);
    }
    if (chainCode.length !== CHAIN_CODE_SIZE) {
        throw new TypeError(`Invalid chain code length: expected ${CHAIN_CODE_SIZE}, got ${chainCode.length}`);
    }
    return new QuantumBIP32(undefined, publicKey, chainCode, config, 0, 0, 0);
}
/**
 * Create quantum key from private key and chain code
 * Follows standard BIP32 pattern: fromPrivateKey(privateKey, chainCode, network?, securityLevel?)
 */
function fromPrivateKey(privateKey, chainCode, network, securityLevel) {
    const config = (0, config_js_1.getMLDSAConfig)(securityLevel || config_js_1.MLDSASecurityLevel.LEVEL2, network || networks_js_1.BITCOIN);
    if (privateKey.length !== config.privateKeySize) {
        throw new TypeError(`Invalid private key length for ML-DSA-${securityLevel}: expected ${config.privateKeySize}, got ${privateKey.length}`);
    }
    if (chainCode.length !== CHAIN_CODE_SIZE) {
        throw new TypeError(`Invalid chain code length: expected ${CHAIN_CODE_SIZE}, got ${chainCode.length}`);
    }
    // Derive public key from private key
    const publicKey = config.algorithm.getPublicKey(privateKey);
    return new QuantumBIP32(privateKey, publicKey, chainCode, config, 0, 0, 0);
}
/**
 * Create quantum key from private key, public key, and chain code.
 * This avoids the expensive getPublicKey() derivation when the public key is already known.
 * Use this for faster imports when both keys are available (e.g., from backup/export).
 *
 * IMPORTANT: This function does NOT verify that the public key matches the private key.
 * The caller is responsible for ensuring the keys are a valid pair.
 *
 * @param privateKey - ML-DSA private key
 * @param publicKey - ML-DSA public key (must correspond to the private key)
 * @param chainCode - Chain code (32 bytes)
 * @param network - Network configuration
 * @param securityLevel - ML-DSA security level
 */
function fromKeyPair(privateKey, publicKey, chainCode, network, securityLevel) {
    const config = (0, config_js_1.getMLDSAConfig)(securityLevel || config_js_1.MLDSASecurityLevel.LEVEL2, network || networks_js_1.BITCOIN);
    if (privateKey.length !== config.privateKeySize) {
        throw new TypeError(`Invalid private key length for ML-DSA-${securityLevel}: expected ${config.privateKeySize}, got ${privateKey.length}`);
    }
    if (publicKey.length !== config.publicKeySize) {
        throw new TypeError(`Invalid public key length for ML-DSA-${securityLevel}: expected ${config.publicKeySize}, got ${publicKey.length}`);
    }
    if (chainCode.length !== CHAIN_CODE_SIZE) {
        throw new TypeError(`Invalid chain code length: expected ${CHAIN_CODE_SIZE}, got ${chainCode.length}`);
    }
    return new QuantumBIP32(privateKey, publicKey, chainCode, config, 0, 0, 0);
}
/**
 * Restore a quantum BIP32 node from precomputed values.
 * Skips all validation and key derivation — the caller must ensure values are correct.
 * Use this when restoring from cache/backup where keys and hierarchy metadata are already known.
 *
 * @param privateKey - ML-DSA private key (or undefined for neutered)
 * @param publicKey - ML-DSA public key
 * @param chainCode - Chain code (32 bytes)
 * @param depth - Derivation depth
 * @param index - Child index
 * @param parentFingerprint - Parent key fingerprint
 * @param network - Network configuration
 * @param securityLevel - ML-DSA security level
 */
function fromPrecomputed(privateKey, publicKey, chainCode, depth, index, parentFingerprint, network, securityLevel) {
    const config = (0, config_js_1.getMLDSAConfig)(securityLevel || config_js_1.MLDSASecurityLevel.LEVEL2, network || networks_js_1.BITCOIN);
    return new QuantumBIP32(privateKey, publicKey, chainCode, config, depth, index, parentFingerprint);
}
/**
 * Quantum BIP32 Factory
 * Provides API for creating and managing ML-DSA hierarchical deterministic keys
 * Supports ML-DSA-44 (default), ML-DSA-65, and ML-DSA-87
 */
exports.QuantumBIP32Factory = {
    fromSeed,
    fromBase58,
    fromPublicKey,
    fromPrivateKey,
    fromKeyPair,
    fromPrecomputed,
};
