# OPWA — Onchain Proof of World Asset

> Real Estate Tokenization on Bitcoin Layer 1, Powered by OP_NET

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Network: Bitcoin L1](https://img.shields.io/badge/Network-Bitcoin%20L1-orange.svg)](https://opnet.org)
[![Status: Testnet](https://img.shields.io/badge/Status-Testnet-blue.svg)](https://opwa-protocol.vercel.app)
[![Deploy: Vercel](https://img.shields.io/badge/Deploy-Vercel-black.svg)](https://opwa-protocol.vercel.app)

---

## Overview

OPWA is the first real estate tokenization protocol built natively on Bitcoin Layer 1 via the OP_NET smart contract infrastructure. It enables fractional ownership of premium real estate through **OPWAY tokens** (OP-20) and **PropertyNFTs** (OP-721) — without bridges, sidechains, or wrapped assets.

Investors buy OPWAY tokens with native BTC, stake them in the **YieldVault** to earn **USDOP** (the protocol's stablecoin), and use those tokens to invest in fractional real estate shares. **OPWACoin (OPWAY)** is also the governance token of the protocol — tokenomics and airdrop details to be announced.

Full self-custody is preserved throughout the entire investment lifecycle. Your BTC never leaves your wallet.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        USER LAYER                            │
│       OPWallet / UniSat / XVerse / OKX Browser Extension     │
└─────────────────────────┬────────────────────────────────────┘
                          │  BTC Transaction (native L1)
┌─────────────────────────▼────────────────────────────────────┐
│                     FRONTEND LAYER                           │
│         Single-Page App — HTML / CSS / JavaScript            │
│              https://opwa-protocol.vercel.app                │
│    Pages: Home · Vault · Dashboard · Terms · Privacy         │
└─────────────────────────┬────────────────────────────────────┘
                          │  OP_NET SDK / JSON-RPC
┌─────────────────────────▼────────────────────────────────────┐
│                  OP_NET LAYER (Bitcoin L1)                   │
│  ┌───────────┐  ┌─────────────┐  ┌──────────────────────┐   │
│  │  OPWAY    │  │ PropertyNFT │  │  YieldVault + USDOP  │   │
│  │  (OP-20)  │  │  (OP-721)   │  │  (Yield + Stable)    │   │
│  └───────────┘  └─────────────┘  └──────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐    │
│  │         PropertyVault — NFT locking + fractionalize  │    │
│  └──────────────────────────────────────────────────────┘    │
│              WASM Contracts (AssemblyScript → OP-VM)         │
│             Deployed via Taproot / UTXO Model                │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                   BITCOIN LAYER 1                            │
│           Settlement Layer — ~$1.9T Market Cap               │
│             Taproot + Tapscript + Native UTXO                │
└──────────────────────────────────────────────────────────────┘
```

---

## Smart Contract Stack

| Contract | Standard | Description | Status |
|---|---|---|---|
| OPWACoin (OPWAY) | OP-20 | Governance & utility token. 1 OPWAY = 1,000 sats. Minted atomically on BTC send. | ✅ Testnet |
| PropertyNFT | OP-721 | Represents unique real estate asset. One NFT per property. | ✅ Testnet |
| YieldVault | Custom | Accepts OPWAY deposits. Distributes USDOP yield. 420-block timelock. | ✅ Testnet |
| USDOP | OP-20 | Protocol stablecoin. Earned by staking OPWAY. Future payment currency. | ✅ Testnet |
| PropertyVault | Custom | Locks PropertyNFT and enables fractional OPWAY investment. | ✅ Testnet |
| YieldDistributor | Custom | Distributes rental income pro-rata to fractional token holders. | 🔧 Development |
| Governance | Custom | On-chain voting for protocol parameters via OPWACoin. | 📋 Planned |

All contracts are written in AssemblyScript, compiled to WASM, and deployed on Bitcoin L1 via OP_NET. No EVM. No Solidity. Native Bitcoin.

---

## Token Model

### OPWAY (OPWACoin)
- **Standard:** OP-20
- **Role:** Governance token of the OPWA Protocol. Future utility includes protocol voting, fee discounts, and airdrop eligibility.
- **Price:** 1 OPWAY = 1,000 sats = 0.00001 BTC
- **Minting:** Atomic on-chain — BTC sent to treasury mints OPWAY in the same transaction, no intermediary.
- **Tokenomics & Airdrop:** To be announced.

### USDOP
- **Standard:** OP-20
- **Role:** Protocol-native stablecoin. The yield and payment currency of the OPWA ecosystem.
- **Earning:** Stake OPWAY in the YieldVault → earn 1 USDOP per 100 OPWAY per OP_NET block (~15% APY).
- **Future use:** Property purchases, rental distributions, platform fees.

### PropertyNFT
- **Standard:** OP-721
- **Role:** Represents sole title of a real-world property on-chain. One NFT per asset.
- **Locking:** Deposited into PropertyVault to enable fractional community investment.

---

## Deployed Contracts (OP_NET Testnet)

Contracts are compiled to WASM (AssemblyScript → OP-VM) and deployed on Bitcoin L1 via OP_NET Testnet.

| Contract | Standard | Address | Explorer |
|---|---|---|---|
| OPWACoin (OPWAY) | OP-20 | `opt1sqzr3qjugf334hrjaque5gt5r09fsvm80lqylyrcp` | [OPScan ↗](https://opscan.org/tokens/0xa4c529ac2a92cc21cb34bf6f17835cf466dc7345a61af0df82eee54d56dbd7b9?network=op_testnet) |
| PropertyNFT | OP-721 | `opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6` | [OPScan ↗](https://opscan.org/tokens/0x5be08132f3efd4d59a4adb27a8f53c1dc8e788db79e5aa086017f82359dfecfc?network=op_testnet) |
| YieldVault | Custom | `opt1sqrlvv7l5gdpfagzhgs80rzevyf60cn9t5qa0us8g` | [OPScan ↗](https://opscan.org/accounts/opt1sqrlvv7l5gdpfagzhgs80rzevyf60cn9t5qa0us8g?network=op_testnet) |
| USDOP | OP-20 | `opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu` | [OPScan ↗](https://opscan.org/accounts/opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu?network=op_testnet) |
| OPWAYield v3 | Custom | `opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv` | [OPScan ↗](https://opscan.org/tokens/0x50569f8a290f5f5eaa50321f3113d989cd6ea52384d25b49fe977ac2f266bbc8?network=op_testnet) |
| PropertyVault | Custom | `opt1sqpqkdmpr6z84l4lw8nhxuj66q02t5ay2vqu4zc6z` | [OPScan ↗](https://opscan.org/accounts/opt1sqpqkdmpr6z84l4lw8nhxuj66q02t5ay2vqu4zc6z?network=op_testnet) |

> ⚠️ Do not change contract addresses. See [docs/testnet-deployments.md](docs/testnet-deployments.md) for full deployment records.

---

## How It Works

### For Investors

```
1. ACQUIRE   — Buy OPWAY tokens with native BTC.
               1 OPWAY = 1,000 sats. No bridge. No wrapping.

2. STAKE     — Deposit OPWAY into the YieldVault.
               420-block timelock (~70 min on OP_NET Testnet).

3. EARN      — Accrue USDOP stablecoin every block.
               Rate: 1 USDOP per 100 OPWAY per block (~15% APY).

4. INVEST    — Use OPWAY to buy fractional shares of real estate
               assets listed on the OPWA marketplace.

5. REDEEM    — When 100% of fractional shares are acquired, the
               PropertyNFT is unlocked and full property title
               transferred to the buyer.
```

### For Property Owners

```
1. TOKENIZE     — Verify property and upload legal docs to IPFS.
                  Mint a PropertyNFT (OP-721) representing sole title.

2. FRACTIONALIZE — Deposit NFT into PropertyVault.
                   Set maximum OPWAY amount to raise.
                   Community can invest fractionally via the marketplace.

3. COLLECT      — Receive OPWAY from investors.
                   Future: distribute rental income via YieldDistributor.
```

---

## Frontend

The OPWA frontend is a single-page application (SPA) built as a static HTML/CSS/JS file, deployed on Vercel. No build step required — the entire interface, routing, and contract interactions are self-contained in `index.html`.

**Live:** https://opwa-protocol.vercel.app

**Pages:**
- `/` — Home: marketplace, asset cards, simulator, how it works, partners
- `/vault` — Yield Vault: deposit OPWAY, earn USDOP, list PropertyNFTs
- `/dashboard` — Portfolio: wallet balance, transaction history (OPScan-style), OPWAY chart
- `/terms` — Terms of Service
- `/privacy` — Privacy Policy

**Supported Wallets:** OPWallet · UniSat · XVerse · OKX

**Features implemented:**
- Live BTC price feed (CoinGecko)
- Gas converter widget
- Dark / Light mode
- Custom animated cursor
- Fractional investment accordion cards with receipt preview
- Investment simulator with BTC/USD toggle
- Scrolling partners carousel
- YieldVault with on-chain block polling and USDOP accrual display
- Dashboard with live OPWAY balance, portfolio chart, and paginated TX history
- PropertyNFT minting with photo upload
- SPA routing with browser history API

---

## OP-20 Standard Overview

OP-20 is the Bitcoin-native fungible token standard on OP_NET, analogous to ERC-20 on Ethereum.

**Key differences from ERC-20:**
- Gas paid in native BTC — no secondary token required
- Transactions are Bitcoin Layer 1 UTXOs — not account-model
- Contracts execute in WASM via the OP-VM engine
- Full self-custody — your BTC never leaves your wallet

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

OP-721 is the Bitcoin-native non-fungible token standard. Each PropertyNFT represents a unique real estate asset with on-chain metadata.

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

## Project Structure

```
OPWABTC/
├── contracts/
│   ├── abis/               # ABI definitions for all contracts
│   ├── op20/               # OPWACoin (OPWAY) fungible token
│   ├── op721/              # PropertyNFT non-fungible token
│   ├── vault/              # YieldVault, USDOP, PropertyVault contracts
│   └── yield/              # YieldDistributor (in development)
├── OPWACoin/
│   └── src/                # Extended token contracts (stablecoin, pegged, oracle)
├── scripts/                # Deployment and configuration scripts
│   ├── deploy-token.ts
│   ├── deploy-nft.ts
│   ├── deploy-yield-vault.ts
│   ├── deploy-usdop.ts
│   ├── deploy-property-vault.ts
│   ├── configure-property-vault.ts
│   ├── set-minter.ts
│   ├── set-treasury.ts
│   └── set-vault-addresses.ts
├── src/                    # React component library (in development)
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   └── types/
├── docs/
│   ├── whitepaper.md
│   ├── technical-architecture.md
│   ├── tokenomics.md
│   ├── security-model.md
│   ├── legal-structure-example.md
│   └── testnet-deployments.md
├── audits/                 # Security audit reports
├── tests/                  # Contract unit tests
├── index.html              # ← Production frontend (SPA, deployed on Vercel)
├── dist/                   # Vercel build output
├── vercel.json
├── package.json
├── vite.config.ts
└── README.md
```

> **Note:** The production frontend is `index.html` — a self-contained SPA deployed directly via Vercel. The `src/` directory contains a React component library under development for a future modular architecture migration.

---

## Quickstart

### Prerequisites
- Node.js 18+
- npm 9+
- OPWallet, UniSat, XVerse, or OKX browser extension

### Run Locally

```bash
git clone https://github.com/Opwabtc/OPWABTC.git
cd OPWABTC
```

Open `index.html` directly in your browser, or serve it locally:

```bash
npx serve .
# → http://localhost:3000
```

### Deploy to Vercel

```bash
vercel --prod
```

Vercel serves `index.html` as a static SPA. Routing is handled client-side via the History API — `vercel.json` rewrites all paths to `index.html`.

### Environment

The app uses public RPC endpoints configured directly in `index.html`:

```
OP_NET Testnet RPC: https://regtest.opnet.org
OP_NET Chain ID: 1338
```

---

## Roadmap

| Quarter | Milestone | Status |
|---|---|---|
| Q1 2026 | Contracts on Testnet (OPWAY, PropertyNFT, YieldVault, USDOP, PropertyVault) | ✅ Done |
| Q1 2026 | Wallet integration (OPWallet, UniSat, XVerse, OKX) | ✅ Done |
| Q1 2026 | Frontend: marketplace, vault, dashboard, simulator | ✅ Live |
| Q2 2026 | OP_NET Mainnet migration (post March 17, 2026) | ⏳ In progress |
| Q2 2026 | First real tokenized properties listed | 🔜 Planned |
| Q2 2026 | Motoswap liquidity integration | 🔜 Planned |
| Q3 2026 | Rental yield distribution via YieldDistributor | 🔧 In development |
| Q3 2026 | Multi-geography property expansion | 🔜 Planned |
| Q4 2026 | OPWACoin governance activation + airdrop | 🔜 Planned |
| Q4 2026 | Institutional partnerships, secondary market | 🔜 Planned |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit using conventional commits: `feat(contract): add yield distributor`
4. Push and open a Pull Request

**Commit convention:** `feat | fix | refactor | docs | chore | test` + `(scope)` + description.

---

## Security Notice

OPWA is currently operating exclusively on Bitcoin Testnet via OP_NET. No real assets are at risk. All tokens are test-only and carry zero monetary value.

Some dependencies inherited from the OP_NET ecosystem may surface advisories in `npm audit`. These are known upstream issues and do not affect the security of the testnet deployment. A full audit will be conducted prior to mainnet launch.

See [docs/security-model.md](docs/security-model.md) for the complete security architecture.

---

## License

MIT License — see [LICENSE](LICENSE)

---

## Disclaimer

This platform is experimental and operates on testnet. Cryptocurrency investments carry significant risk. This is not financial, investment, or legal advice. Always conduct your own research before making investment decisions.

---

**Bitcoin is the settlement layer. OP_NET is the execution layer. OPWA is the application layer.**
