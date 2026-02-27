# @btc-vision/bip32

[![CI](https://github.com/btc-vision/bip32/actions/workflows/main_ci.yml/badge.svg)](https://github.com/btc-vision/bip32/actions/workflows/main_ci.yml)
[![NPM](https://img.shields.io/npm/v/@btc-vision/bip32.svg)](https://www.npmjs.org/package/@btc-vision/bip32)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

BIP32 hierarchical deterministic wallet library for Bitcoin with quantum-resistant ML-DSA support.

## Installation

```bash
npm install @btc-vision/bip32
```

**Requirements:** Node.js >= 24.0.0

---

## Classical BIP32

Requires a secp256k1 backend from [`@btc-vision/ecpair`](https://github.com/btc-vision/ecpair).

```typescript
import { createNobleBackend } from '@btc-vision/ecpair';
import { BIP32Factory } from '@btc-vision/bip32';

const bip32 = BIP32Factory(createNobleBackend());

// From seed
const seed = Buffer.from('000102030405060708090a0b0c0d0e0f', 'hex');
const master = bip32.fromSeed(seed);

// Derive keys
const child = master.derivePath("m/84'/0'/0'/0/0");

console.log(Buffer.from(child.publicKey).toString('hex'));
console.log(child.toWIF());
console.log(child.toBase58());

// Sign and verify
const hash = new Uint8Array(32).fill(0x01);
const signature = child.sign(hash);
console.log(child.verify(hash, signature)); // true
```

### From Base58

```typescript
const node = bip32.fromBase58(
  'xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi',
);
const child = node.derivePath('m/0/0');
```

---

## Quantum-Resistant BIP32

Uses [ML-DSA (FIPS 204)](https://csrc.nist.gov/pubs/fips/204/final) for post-quantum signatures. No ECC library needed.

```typescript
import {
  QuantumBIP32Factory,
  MLDSASecurityLevel,
  QuantumDerivationPath,
} from '@btc-vision/bip32';

const seed = Buffer.from(
  '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f',
  'hex',
);

// Default: ML-DSA-44 (LEVEL2)
const master = QuantumBIP32Factory.fromSeed(seed);

// Derive using BIP-360 path
const child = master.derivePath(QuantumDerivationPath.STANDARD);

// Sign and verify
const hash = new Uint8Array(32).fill(0x01);
const signature = child.sign(hash);
console.log(child.verify(hash, signature)); // true

// Higher security level
const masterL5 = QuantumBIP32Factory.fromSeed(
  seed,
  undefined,
  MLDSASecurityLevel.LEVEL5,
);
```

### Security Levels

| Level | Algorithm | Private Key | Public Key | Signature |
|-------|-----------|-------------|------------|-----------|
| LEVEL2 (default) | ML-DSA-44 | 2,560 bytes | 1,312 bytes | 2,420 bytes |
| LEVEL3 | ML-DSA-65 | 4,032 bytes | 1,952 bytes | 3,309 bytes |
| LEVEL5 | ML-DSA-87 | 4,896 bytes | 2,592 bytes | 4,627 bytes |

### Key Differences from Classical BIP32

- **No public-only derivation** — ML-DSA does not support additive key derivation. All derivation requires the private key.
- **BIP-360 paths** — Uses `m/360'/...` by convention.
- **Larger keys** — Trade-off for quantum resistance.

---

## Derivation Paths

```typescript
import { getBitcoinPath, getQuantumPath, DerivationPath } from '@btc-vision/bip32';

// Standard paths via enum
master.derivePath(DerivationPath.BIP84);  // m/84'/0'/0'/0/0

// Custom paths via helper
getBitcoinPath(84, 1, 0);     // m/84'/0'/1'/0/0  (account 1)
getQuantumPath(0, 0, true);   // m/360'/0'/1'/0    (change)
```

| BIP | Path | Address Type |
|-----|------|-------------|
| 44 | `m/44'/0'/0'/0/0` | Legacy P2PKH |
| 49 | `m/49'/0'/0'/0/0` | SegWit P2SH-P2WPKH |
| 84 | `m/84'/0'/0'/0/0` | Native SegWit P2WPKH |
| 86 | `m/86'/0'/0'/0/0` | Taproot P2TR |
| 360 | `m/360'/0'/0'/0/0` | Post-Quantum |

---

## Networks

```typescript
import { BITCOIN, TESTNET, REGTEST } from '@btc-vision/bip32';

const mainnetKey = bip32.fromSeed(seed, BITCOIN);
const testnetKey = bip32.fromSeed(seed, TESTNET);
```

Custom networks are supported — pass any object conforming to the `Network` type from `@btc-vision/ecpair`.

---

## Documentation

Full API documentation is available in the [docs](./docs/) folder:

- [Getting Started](./docs/getting-started/overview.md)
- [BIP32 API](./docs/api-reference/bip32-api.md)
- [Quantum API](./docs/api-reference/quantum-api.md)
- [Types & Interfaces](./docs/api-reference/types-interfaces.md)

### External References

- [BIP-32 Specification](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP-360 (Post-Quantum)](https://bip360.org/)
- [FIPS 204 (ML-DSA)](https://csrc.nist.gov/pubs/fips/204/final)

---

## License

[MIT](LICENSE)
