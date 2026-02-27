import * as crypto from './crypto.js';
import { testEcc } from './testecc.js';
import * as bs58check from '@btc-vision/bs58check';
import { validateBip32Path, validateBytes32, validateBytes33, } from './types.js';
import * as wif from '@btc-vision/wif';
import * as tools from 'uint8array-tools';
import { BITCOIN } from './networks.js';
import { SignerCapability } from '@btc-vision/ecpair';
const BITCOIN_SEED = tools.fromUtf8('Bitcoin seed');
const testedLibs = new WeakSet();
/**
 * Creates a BIP32 HD wallet factory.
 *
 * Accepts either a raw `tiny-secp256k1` object ({@link TinySecp256k1Interface})
 * or a {@link CryptoBackend} from `@btc-vision/ecpair` (e.g. `createNobleBackend()`
 * or `createLegacyBackend(ecc)`).
 */
export function BIP32Factory(ecc) {
    // At runtime, CryptoBackend branded-type parameters ARE Uint8Array,
    // so we can safely normalize to TinySecp256k1Interface.
    const lib = ecc;
    if (!testedLibs.has(lib)) {
        testEcc(lib);
        testedLibs.add(lib);
    }
    const HIGHEST_BIT = 0x80000000;
    function toXOnly(pubKey) {
        return pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);
    }
    class Bip32Signer {
        __D;
        __Q;
        network;
        lowR = false;
        constructor(__D, __Q, network) {
            this.__D = __D;
            this.__Q = __Q;
            this.network = network;
        }
        get publicKey() {
            if (this.__Q === undefined)
                this.__Q = lib.pointFromScalar(this.__D, true);
            return this.__Q;
        }
        get xOnlyPublicKey() {
            return toXOnly(this.publicKey);
        }
        get privateKey() {
            return this.__D;
        }
        get compressed() {
            return true;
        }
        get capabilities() {
            let caps = SignerCapability.EcdsaVerify | SignerCapability.PublicKeyTweak;
            if (this.__D !== undefined) {
                caps |= SignerCapability.EcdsaSign | SignerCapability.PrivateKeyExport;
            }
            if (lib.signSchnorr && this.__D !== undefined) {
                caps |= SignerCapability.SchnorrSign;
            }
            if (lib.verifySchnorr) {
                caps |= SignerCapability.SchnorrVerify;
            }
            return caps;
        }
        hasCapability(cap) {
            return (this.capabilities & cap) !== 0;
        }
        sign(hash, lowR) {
            if (!this.privateKey)
                throw new Error('Missing private key');
            if (lowR === undefined)
                lowR = this.lowR;
            if (!lowR) {
                return lib.sign(hash, this.privateKey);
            }
            else {
                let sig = lib.sign(hash, this.privateKey);
                const extraData = new Uint8Array(32);
                let counter = 0;
                // if first try is lowR, skip the loop
                // for second try and on, add extra entropy counting up
                while (sig[0] > 0x7f) {
                    counter++;
                    tools.writeUInt32(extraData, 0, counter, 'LE');
                    sig = lib.sign(hash, this.privateKey, extraData);
                }
                return sig;
            }
        }
        signSchnorr(hash) {
            if (!this.privateKey)
                throw new Error('Missing private key');
            if (!lib.signSchnorr)
                throw new Error('signSchnorr not supported by ecc library');
            return lib.signSchnorr(hash, this.privateKey);
        }
        verify(hash, signature) {
            return lib.verify(hash, this.publicKey, signature);
        }
        verifySchnorr(hash, signature) {
            if (!lib.verifySchnorr)
                throw new Error('verifySchnorr not supported by ecc library');
            return lib.verifySchnorr(hash, this.publicKey.subarray(1, 33), signature);
        }
        tweak(t) {
            if (this.privateKey)
                return this.tweakFromPrivateKey(t);
            return this.tweakFromPublicKey(t);
        }
        toWIF() {
            if (!this.privateKey)
                throw new TypeError('Missing private key');
            return wif.encode({
                version: this.network.wif,
                privateKey: this.privateKey,
                compressed: true,
            });
        }
        tweakFromPublicKey(t) {
            const xOnlyPubKey = toXOnly(this.publicKey);
            // Runtime guard: lib may lack xOnlyPointAddTweak despite interface contract
            const xOnlyPointAddTweak = lib.xOnlyPointAddTweak;
            if (!xOnlyPointAddTweak)
                throw new Error('xOnlyPointAddTweak not supported by ecc library');
            const tweakedPublicKey = xOnlyPointAddTweak(xOnlyPubKey, t);
            if (!tweakedPublicKey || tweakedPublicKey.xOnlyPubkey === null)
                throw new Error('Cannot tweak public key!');
            const parityByte = Uint8Array.from([
                tweakedPublicKey.parity === 0 ? 0x02 : 0x03,
            ]);
            const tweakedPublicKeyCompresed = tools.concat([
                parityByte,
                tweakedPublicKey.xOnlyPubkey,
            ]);
            return new Bip32Signer(undefined, tweakedPublicKeyCompresed, this.network);
        }
        tweakFromPrivateKey(t) {
            const hasOddY = this.publicKey[0] === 3 ||
                (this.publicKey[0] === 4 && (this.publicKey[64] & 1) === 1);
            const privateKey = (() => {
                if (!hasOddY)
                    return this.privateKey;
                else if (!lib.privateNegate)
                    throw new Error('privateNegate not supported by ecc library');
                else
                    return lib.privateNegate(this.privateKey);
            })();
            const tweakedPrivateKey = lib.privateAdd(privateKey, t);
            if (!tweakedPrivateKey)
                throw new Error('Invalid tweaked private key!');
            return new Bip32Signer(tweakedPrivateKey, undefined, this.network);
        }
    }
    class BIP32 extends Bip32Signer {
        chainCode;
        __DEPTH;
        __INDEX;
        __PARENT_FINGERPRINT;
        constructor(__D, __Q, chainCode, network, __DEPTH = 0, __INDEX = 0, __PARENT_FINGERPRINT = 0x00000000) {
            super(__D, __Q, network);
            this.chainCode = chainCode;
            this.__DEPTH = __DEPTH;
            this.__INDEX = __INDEX;
            this.__PARENT_FINGERPRINT = __PARENT_FINGERPRINT;
        }
        #ID;
        get capabilities() {
            return super.capabilities | SignerCapability.HdDerivation;
        }
        get depth() {
            return this.__DEPTH;
        }
        get index() {
            return this.__INDEX;
        }
        get parentFingerprint() {
            return this.__PARENT_FINGERPRINT;
        }
        get identifier() {
            if (this.#ID === undefined)
                this.#ID = crypto.hash160(this.publicKey);
            return this.#ID;
        }
        get fingerprint() {
            return this.identifier.subarray(0, 4);
        }
        // Private === not neutered
        // Public === neutered
        isNeutered() {
            return this.__D === undefined;
        }
        neutered() {
            return new BIP32(undefined, this.publicKey, this.chainCode, this.network, this.depth, this.index, this.parentFingerprint);
        }
        toBase58() {
            const network = this.network;
            const version = !this.isNeutered()
                ? network.bip32.private
                : network.bip32.public;
            const buffer = new Uint8Array(78);
            // 4 bytes: version bytes
            tools.writeUInt32(buffer, 0, version, 'BE');
            // 1 byte: depth: 0x00 for master nodes, 0x01 for level-1 descendants, ....
            tools.writeUInt8(buffer, 4, this.depth);
            // 4 bytes: the fingerprint of the parent's key (0x00000000 if master key)
            tools.writeUInt32(buffer, 5, this.parentFingerprint, 'BE');
            // 4 bytes: child number. This is the number i in xi = xpar/i, with xi the key being serialized.
            // This is encoded in big endian. (0x00000000 if master key)
            tools.writeUInt32(buffer, 9, this.index, 'BE');
            // 32 bytes: the chain code
            buffer.set(this.chainCode, 13);
            // 33 bytes: the public key or private key data
            if (!this.isNeutered()) {
                // 0x00 + k for private keys
                tools.writeUInt8(buffer, 45, 0);
                buffer.set(this.privateKey, 46);
                // 33 bytes: the public key
            }
            else {
                // X9.62 encoding for public keys
                buffer.set(this.publicKey, 45);
            }
            return bs58check.encode(buffer);
        }
        // https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#child-key-derivation-ckd-functions
        derive(index) {
            if (index !== (index >>> 0))
                throw new TypeError('Expected UInt32, got ' + index);
            const isHardened = index >= HIGHEST_BIT;
            const data = new Uint8Array(37);
            // Hardened child
            if (isHardened) {
                if (this.isNeutered())
                    throw new TypeError('Missing private key for hardened child key');
                // data = 0x00 || ser256(kpar) || ser32(index)
                data[0] = 0x00;
                data.set(this.privateKey, 1);
                tools.writeUInt32(data, 33, index, 'BE');
                // Normal child
            }
            else {
                // data = serP(point(kpar)) || ser32(index)
                //      = serP(Kpar) || ser32(index)
                data.set(this.publicKey, 0);
                tools.writeUInt32(data, 33, index, 'BE');
            }
            const I = crypto.hmacSHA512(this.chainCode, data);
            const IL = I.slice(0, 32);
            const IR = I.slice(32);
            // if parse256(IL) >= n, proceed with the next value for i
            if (!lib.isPrivate(IL))
                return this.derive(index + 1);
            const parentFp = tools.readUInt32(this.fingerprint, 0, 'BE');
            const nextDepth = this.depth + 1;
            // Private parent key -> private child key
            if (!this.isNeutered()) {
                // ki = parse256(IL) + kpar (mod n)
                const ki = lib.privateAdd(this.privateKey, IL);
                // In case ki == 0, proceed with the next value for i
                if (ki == null)
                    return this.derive(index + 1);
                return new BIP32(ki, undefined, IR, this.network, nextDepth, index, parentFp);
                // Public parent key -> public child key
            }
            else {
                // Ki = point(parse256(IL)) + Kpar
                //    = G*IL + Kpar
                const Ki = lib.pointAddScalar(this.publicKey, IL, true);
                // In case Ki is the point at infinity, proceed with the next value for i
                if (Ki === null)
                    return this.derive(index + 1);
                return new BIP32(undefined, Ki, IR, this.network, nextDepth, index, parentFp);
            }
        }
        deriveHardened(index) {
            if (!Number.isInteger(index) ||
                index < 0 ||
                index > 0x7fffffff)
                throw new TypeError('Expected UInt31, got ' + index);
            // Only derives hardened private keys by default
            return this.derive(index + HIGHEST_BIT);
        }
        derivePath(path) {
            validateBip32Path(path);
            let splitPath = path.split('/');
            if (splitPath[0] === 'm') {
                if (this.parentFingerprint)
                    throw new TypeError('Expected master, got child');
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
    function fromBase58(inString, network) {
        const buffer = bs58check.decode(inString);
        if (buffer.length !== 78)
            throw new TypeError('Invalid buffer length');
        network = network || BITCOIN;
        // 4 bytes: version bytes
        const version = tools.readUInt32(buffer, 0, 'BE');
        if (version !== network.bip32.private && version !== network.bip32.public)
            throw new TypeError('Invalid network version');
        // 1 byte: depth: 0x00 for master nodes, 0x01 for level-1 descendants, ...
        const depth = buffer[4];
        // 4 bytes: the fingerprint of the parent's key (0x00000000 if master key)
        const parentFingerprint = tools.readUInt32(buffer, 5, 'BE');
        if (depth === 0) {
            if (parentFingerprint !== 0x00000000)
                throw new TypeError('Invalid parent fingerprint');
        }
        // 4 bytes: child number. This is the number i in xi = xpar/i, with xi the key being serialized.
        // This is encoded in MSB order. (0x00000000 if master key)
        const index = tools.readUInt32(buffer, 9, 'BE');
        if (depth === 0 && index !== 0)
            throw new TypeError('Invalid index');
        // 32 bytes: the chain code
        const chainCode = buffer.slice(13, 45);
        let hd;
        // 33 bytes: private key data (0x00 + k)
        if (version === network.bip32.private) {
            if (buffer[45] !== 0x00)
                throw new TypeError('Invalid private key');
            const k = buffer.slice(46, 78);
            hd = fromPrivateKeyLocal(k, chainCode, network, depth, index, parentFingerprint);
            // 33 bytes: public key data (0x02 + X or 0x03 + X)
        }
        else {
            const X = buffer.slice(45, 78);
            hd = fromPublicKeyLocal(X, chainCode, network, depth, index, parentFingerprint);
        }
        return hd;
    }
    function fromPrivateKey(privateKey, chainCode, network) {
        return fromPrivateKeyLocal(privateKey, chainCode, network);
    }
    function fromPrivateKeyLocal(privateKey, chainCode, network, depth, index, parentFingerprint) {
        validateBytes32(privateKey);
        validateBytes32(chainCode);
        network = network || BITCOIN;
        if (!lib.isPrivate(privateKey))
            throw new TypeError('Private key not in range [1, n)');
        return new BIP32(privateKey, undefined, chainCode, network, depth, index, parentFingerprint);
    }
    function fromPublicKey(publicKey, chainCode, network) {
        return fromPublicKeyLocal(publicKey, chainCode, network);
    }
    function fromPublicKeyLocal(publicKey, chainCode, network, depth, index, parentFingerprint) {
        validateBytes33(publicKey);
        validateBytes32(chainCode);
        network = network || BITCOIN;
        // verify the X coordinate is a point on the curve
        if (!lib.isPoint(publicKey))
            throw new TypeError('Point is not on the curve');
        return new BIP32(undefined, publicKey, chainCode, network, depth, index, parentFingerprint);
    }
    function fromSeed(seed, network) {
        if (!(seed instanceof Uint8Array))
            throw new TypeError('Expected Uint8Array');
        if (seed.length < 16)
            throw new TypeError('Seed should be at least 128 bits');
        if (seed.length > 64)
            throw new TypeError('Seed should be at most 512 bits');
        network = network || BITCOIN;
        const I = crypto.hmacSHA512(BITCOIN_SEED, seed);
        const IL = I.slice(0, 32);
        const IR = I.slice(32);
        return fromPrivateKey(IL, IR, network);
    }
    function fromPrecomputed(privateKey, publicKey, chainCode, depth, index, parentFingerprint, network) {
        return new BIP32(privateKey, publicKey, chainCode, network || BITCOIN, depth, index, parentFingerprint);
    }
    return {
        fromSeed,
        fromBase58,
        fromPublicKey,
        fromPrivateKey,
        fromPrecomputed,
    };
}
