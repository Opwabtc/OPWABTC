import { hmac } from '@noble/hashes/hmac.js';
import { ripemd160 } from '@noble/hashes/legacy.js';
import { sha256, sha512 } from '@noble/hashes/sha2.js';
export function hash160(buffer) {
    return ripemd160(sha256(buffer));
}
export function hash256(buffer) {
    return sha256(buffer);
}
export function hmacSHA512(key, data) {
    return hmac(sha512, key, data);
}
