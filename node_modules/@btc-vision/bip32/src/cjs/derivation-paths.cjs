"use strict";
/**
 * Standard BIP derivation paths for Bitcoin wallets
 *
 * These paths follow Bitcoin Improvement Proposals (BIPs) that define
 * standardized derivation paths for different address types and use cases.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuantumDerivationPath = exports.DerivationPath = void 0;
exports.getQuantumPath = getQuantumPath;
exports.getBitcoinPath = getBitcoinPath;
/**
 * Standard derivation paths for Bitcoin addresses
 */
var DerivationPath;
(function (DerivationPath) {
    /** BIP44 - Legacy P2PKH addresses (1...) */
    DerivationPath["BIP44"] = "m/44'/0'/0'/0/0";
    /** BIP49 - SegWit P2SH-P2WPKH addresses (3...) */
    DerivationPath["BIP49"] = "m/49'/0'/0'/0/0";
    /** BIP84 - Native SegWit P2WPKH addresses (bc1q...) */
    DerivationPath["BIP84"] = "m/84'/0'/0'/0/0";
    /** BIP86 - Taproot P2TR addresses (bc1p...) */
    DerivationPath["BIP86"] = "m/86'/0'/0'/0/0";
    /** BIP360 - Post-Quantum (experimental, quantum-resistant keys) */
    DerivationPath["BIP360"] = "m/360'/0'/0'/0/0";
})(DerivationPath || (exports.DerivationPath = DerivationPath = {}));
/**
 * Quantum-specific derivation paths (using coin type 360' for quantum)
 */
var QuantumDerivationPath;
(function (QuantumDerivationPath) {
    /** Standard quantum path - m/360'/0'/0'/0/0 */
    QuantumDerivationPath["STANDARD"] = "m/360'/0'/0'/0/0";
    /** Quantum change path - m/360'/0'/0'/1/0 */
    QuantumDerivationPath["CHANGE"] = "m/360'/0'/0'/1/0";
    /** Quantum account 0, address 0 */
    QuantumDerivationPath["ACCOUNT_0_ADDRESS_0"] = "m/360'/0'/0'/0/0";
    /** Quantum account 0, address 1 */
    QuantumDerivationPath["ACCOUNT_0_ADDRESS_1"] = "m/360'/0'/0'/0/1";
    /** Quantum account 1, address 0 */
    QuantumDerivationPath["ACCOUNT_1_ADDRESS_0"] = "m/360'/1'/0'/0/0";
})(QuantumDerivationPath || (exports.QuantumDerivationPath = QuantumDerivationPath = {}));
/**
 * Get derivation path by account and address index
 * @param account - Account index (default: 0)
 * @param addressIndex - Address index (default: 0)
 * @param isChange - Whether this is a change address (default: false)
 * @returns BIP32 derivation path string
 */
function getQuantumPath(account = 0, addressIndex = 0, isChange = false) {
    const changeIndex = isChange ? 1 : 0;
    return `m/360'/${account}'/${changeIndex}'/${addressIndex}`;
}
/**
 * Get standard Bitcoin derivation path by account and address index
 * @param bipType - BIP type (44, 49, 84, or 86)
 * @param account - Account index (default: 0)
 * @param addressIndex - Address index (default: 0)
 * @param isChange - Whether this is a change address (default: false)
 * @returns BIP32 derivation path string
 */
function getBitcoinPath(bipType, account = 0, addressIndex = 0, isChange = false) {
    const changeIndex = isChange ? 1 : 0;
    return `m/${bipType}'/0'/${account}'/${changeIndex}/${addressIndex}`;
}
