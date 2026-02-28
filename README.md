# OPWA — Onchain Proof of World Asset

> **Real Estate Tokenization on Bitcoin Layer 1, Powered by OP_NET**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Network: Bitcoin L1](https://img.shields.io/badge/Network-Bitcoin%20L1-orange)](https://opnet.org)
[![Status: Testnet](https://img.shields.io/badge/Status-Testnet-blue)](./docs/testnet-deployments.md)
[![Frontend: Live](https://img.shields.io/badge/Frontend-Live-green)](https://op-real-estate-platform.vercel.app/)

---

## Overview

OPWA is the first real estate tokenization protocol built **natively on Bitcoin Layer 1** via the [OP_NET](https://opnet.org) smart contract infrastructure. It enables fractional ownership of premium real estate through OP-20 fungible tokens and OP-721 NFTs — without bridges, sidechains, or wrapped assets.

Bitcoin holders interact with real estate tokens using native BTC, on the Bitcoin blockchain, with full self-custody preserved throughout the entire investment lifecycle.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        USER LAYER                            │
│           OPWallet / UniSat / XVerse Browser Extension       │
└─────────────────────────┬────────────────────────────────────┘
                          │  BTC Transaction (native L1)
┌─────────────────────────▼────────────────────────────────────┐
│                     FRONTEND LAYER                           │
│      React 19 + TypeScript + Vite + TailwindCSS + Zustand    │
│          https://op-real-estate-platform.vercel.app/         │
└─────────────────────────┬────────────────────────────────────┘
                          │  opnet SDK calls
┌─────────────────────────▼────────────────────────────────────┐
│                    OP_NET LAYER (Bitcoin L1)                  │
│   ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐    │
│   │  OPWACOIN   │  │ Property NFT │  │  Yield Dist.     │    │
│   │  (OP-20)    │  │  (OP-721)   │  │  (Yield.ts)      │    │
│   └─────────────┘  └─────────────┘  └──────────────────┘    │
│              WASM Contracts (AssemblyScript)                  │
│              Deployed via Taproot / UTXO Model               │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                   BITCOIN LAYER 1                            │
│           Settlement Layer — ~$1.9T Market Cap              │
│           Taproot + Tapscript + Native UTXO                  │
└──────────────────────────────────────────────────────────────┘
```

---

## Smart Contract Stack

| Contract | Standard | Description | Status |
|----------|----------|-------------|--------|
| `OPWACoin` | OP-20 | Platform governance & utility token | Testnet |
| `PropertyNFT` | OP-721 | Represents unique real estate asset ownership | Testnet |
| `FractionalToken` | OP-20 | Per-property fungible fractional shares | Testnet |
| `YieldDistributor` | Custom | Rental income distribution to token holders | Development |
| `Governance` | Custom | On-chain voting for protocol parameters | Planned |

All contracts are written in **AssemblyScript**, compiled to **WASM**, and deployed on Bitcoin L1 via OP_NET. No EVM. No Solidity. Native Bitcoin.

---

## OP-20 Standard Overview

OP-20 is the Bitcoin-native fungible token standard on OP_NET, analogous to ERC-20 on Ethereum. Key differences:

- Gas is paid in **native BTC** — no secondary token required
- Transactions are **Bitcoin Layer 1 UTXOs** — not account-model
- Contracts execute in **WASM** via the OP-VM engine
- Full **self-custody** — your BTC never leaves your wallet

Core interface:

```typescript
// Standard OP-20 interface (AssemblyScript)
interface IOP20 {
  name(): string;
  symbol(): string;
  decimals(): u8;
  totalSupply(): u256;
  balanceOf(account: Address): u256;
  transfer(to: Address, value: u256): bool;
  approve(spender: Address, value: u256): bool;
  allowance(owner: Address, spender: Address): u256;
  transferFrom(from: Address, to: Address, value: u256): bool;
}
```

---

## OP-721 Standard Overview

OP-721 is the Bitcoin-native non-fungible token standard. Each `PropertyNFT` represents a unique real estate asset with on-chain metadata.

Core interface:

```typescript
// Standard OP-721 interface (AssemblyScript)
interface IOP721 {
  name(): string;
  symbol(): string;
  tokenURI(tokenId: u256): string;
  ownerOf(tokenId: u256): Address;
  balanceOf(owner: Address): u256;
  transferFrom(from: Address, to: Address, tokenId: u256): void;
  approve(to: Address, tokenId: u256): void;
  getApproved(tokenId: u256): Address;
}
```

---

## Deployed Contracts (OP_NET Testnet)

> Contracts are compiled to WASM (AssemblyScript → OP-VM) and deployed on Bitcoin L1 via OP_NET Testnet.

| Contract | Standard | Address | Explorer |
|----------|----------|---------|----------|
| `OPWACoin` | OP-20 | _pending deployment_ | [OPScan](https://testnet.opscan.io) |
| `PropertyNFT` | OP-721 | _pending deployment_ | [OPScan](https://testnet.opscan.io) |
| `YieldDistributor` | Custom | _pending deployment_ | [OPScan](https://testnet.opscan.io) |

Full deployment records: [docs/testnet-deployments.md](./docs/testnet-deployments.md)

---

## How It Works

```
1. TOKENIZE  — A real-world property is verified and its legal docs uploaded to IPFS.
               The owner mints a PropertyNFT (OP-721) representing sole title.

2. FRACTIONALIZE — The NFT is locked and a FractionalToken (OP-20) is deployed.
                   Investors buy fractional shares with native BTC.

3. EARN      — Rental income is deposited on-chain to the YieldDistributor contract,
               which distributes yield pro-rata to FractionalToken holders in OPWA.

4. TRADE     — Fractional shares and OPWA tokens trade on Motoswap (AMM DEX on OP_NET)
               with native BTC liquidity pairs.

5. REDEEM    — When 100% of fractional shares are bought back, the PropertyNFT is
               unlocked and the full property title is returned to the redeemer.
```

---

## Testnet Status

See [docs/testnet-deployments.md](./docs/testnet-deployments.md) for current deployment records.

OP_NET Mainnet launch: **March 17, 2026**. OPWA will migrate all contracts post-mainnet launch.

---

## Quickstart

### Prerequisites

- Node.js 18+
- npm 9+
- OPWallet, UniSat, or XVerse browser extension

### Frontend Setup

```bash
git clone https://github.com/Opwabtc/OPWABTC.git
cd OPWABTC

npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Environment Variables

Create a `.env` file at project root:

```env
VITE_OP_NET_TESTNET_RPC=https://testnet.opnet.org/rpc
VITE_OP_NET_TESTNET_CHAIN_ID=1338
VITE_API_BASE_URL=https://api.opwa.btc
```

### Build & Deploy

```bash
npm run build       # Outputs to dist/
npm run preview     # Preview production build locally
vercel --prod       # Deploy to Vercel
```

---

## Project Structure

```
OPWABTC/
├── contracts/
│   ├── op20/               # OPWACOIN fungible token contract
│   ├── op721/              # PropertyNFT non-fungible token contract
│   ├── yield/              # Yield distribution contract
│   └── governance/         # Governance contract (planned)
├── docs/
│   ├── whitepaper.md
│   ├── technical-architecture.md
│   ├── tokenomics.md
│   ├── security-model.md
│   ├── legal-structure-example.md
│   └── testnet-deployments.md
├── audits/                 # Security audit reports
├── tests/                  # Contract unit tests
├── src/                    # React frontend
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── store/
│   └── types/
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
├── README.md
├── CHANGELOG.md
└── LICENSE
```

---

## Roadmap

| Quarter | Milestone |
|---------|-----------|
| Q1 2026 | Smart contracts on OP_NET testnet (OP-20 + OP-721), wallet integration, frontend marketplace |
| Q2 2026 | Mainnet migration (post March 17), first tokenized properties listed, Motoswap liquidity |
| Q3 2026 | Rental yield distribution via smart contracts, multi-geography expansion |
| Q4 2026 | Governance token activation, institutional partnerships, secondary market |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit using conventional commits: `feat(contract): add yield distributor`
4. Push and open a Pull Request

Commit convention: `feat | fix | refactor | docs | chore | test` + `(scope)` + description.

---

## License

MIT License — see [LICENSE](./LICENSE)

---

## Disclaimer

This platform is experimental and operates on testnet. Cryptocurrency investments carry significant risk. This is not financial, investment, or legal advice. Always conduct your own research before making investment decisions.

---

> **Bitcoin is the settlement layer. OP_NET is the execution layer. OPWA is the application layer.**
