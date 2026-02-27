import type { Network } from '@btc-vision/ecpair';
import type { CryptoBackend, TinySecp256k1Interface as EcpairTinySecp256k1Interface, UniversalSigner } from '@btc-vision/ecpair';
/**
 * Extends ecpair's TinySecp256k1Interface to require pointAddScalar,
 * which bip32 key derivation needs unconditionally.
 */
export interface TinySecp256k1Interface extends EcpairTinySecp256k1Interface {
    pointAddScalar(p: Uint8Array, tweak: Uint8Array, compressed?: boolean): Uint8Array | null;
}
export interface BIP32Interface extends UniversalSigner {
    chainCode: Uint8Array;
    depth: number;
    index: number;
    parentFingerprint: number;
    identifier: Uint8Array;
    fingerprint: Uint8Array;
    lowR: boolean;
    isNeutered(): boolean;
    neutered(): BIP32Interface;
    toBase58(): string;
    derive(index: number): BIP32Interface;
    deriveHardened(index: number): BIP32Interface;
    derivePath(path: string): BIP32Interface;
}
export interface BIP32API {
    fromSeed(seed: Uint8Array, network?: Network): BIP32Interface;
    fromBase58(inString: string, network?: Network): BIP32Interface;
    fromPublicKey(publicKey: Uint8Array, chainCode: Uint8Array, network?: Network): BIP32Interface;
    fromPrivateKey(privateKey: Uint8Array, chainCode: Uint8Array, network?: Network): BIP32Interface;
    fromPrecomputed(privateKey: Uint8Array | undefined, publicKey: Uint8Array, chainCode: Uint8Array, depth: number, index: number, parentFingerprint: number, network?: Network): BIP32Interface;
}
/**
 * Creates a BIP32 HD wallet factory.
 *
 * Accepts either a raw `tiny-secp256k1` object ({@link TinySecp256k1Interface})
 * or a {@link CryptoBackend} from `@btc-vision/ecpair` (e.g. `createNobleBackend()`
 * or `createLegacyBackend(ecc)`).
 */
export declare function BIP32Factory(ecc: TinySecp256k1Interface | CryptoBackend): BIP32API;
