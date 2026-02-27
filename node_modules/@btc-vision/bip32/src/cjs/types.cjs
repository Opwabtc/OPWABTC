"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBip32Path = validateBip32Path;
exports.validateBytes32 = validateBytes32;
exports.validateBytes33 = validateBytes33;
const BIP32_PATH_REGEX = /^(m\/)?(\d+'?\/)*\d+'?$/;
function validateBip32Path(path) {
    if (typeof path !== 'string' || !BIP32_PATH_REGEX.test(path)) {
        throw new TypeError('Expected BIP32 derivation path');
    }
}
function validateBytes32(buf) {
    if (!(buf instanceof Uint8Array) || buf.length !== 32) {
        throw new TypeError('Expected Uint8Array of length 32');
    }
}
function validateBytes33(buf) {
    if (!(buf instanceof Uint8Array) || buf.length !== 33) {
        throw new TypeError('Expected Uint8Array of length 33');
    }
}
