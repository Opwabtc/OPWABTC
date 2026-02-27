"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash160 = hash160;
exports.hash256 = hash256;
exports.hmacSHA512 = hmacSHA512;
const hmac_js_1 = require("@noble/hashes/hmac.js");
const legacy_js_1 = require("@noble/hashes/legacy.js");
const sha2_js_1 = require("@noble/hashes/sha2.js");
function hash160(buffer) {
    return (0, legacy_js_1.ripemd160)((0, sha2_js_1.sha256)(buffer));
}
function hash256(buffer) {
    return (0, sha2_js_1.sha256)(buffer);
}
function hmacSHA512(key, data) {
    return (0, hmac_js_1.hmac)(sha2_js_1.sha512, key, data);
}
