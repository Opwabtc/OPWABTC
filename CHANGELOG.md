# Changelog

All notable changes to OPWA will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- YieldDistributor contract implementation
- Governance contract (on-chain voting)
- Motoswap DEX integration for FractionalToken trading
- Mainnet migration (post OP_NET mainnet March 17, 2026)
- Full smart contract security audit

---

## [0.1.0-testnet] — 2026-02-28

### Added
- Initial project structure with React 19 + TypeScript + Vite + TailwindCSS
- Zustand state management for wallet and portfolio state
- Multi-wallet support: OPWallet, UniSat, XVerse browser extensions
- Property marketplace frontend with browsing and filtering
- Portfolio analytics with Recharts charts
- OPWACoin OP-20 contract (AssemblyScript / WASM) — testnet
- PropertyNFT OP-721 contract (AssemblyScript / WASM) — testnet
- FractionalToken OP-20 per-property contract template — testnet
- Vercel deployment configuration (`vercel.json`)
- GitHub Actions CI workflow
- Institutional documentation suite:
  - `docs/whitepaper.md`
  - `docs/technical-architecture.md`
  - `docs/tokenomics.md`
  - `docs/security-model.md`
  - `docs/legal-structure-example.md`
  - `docs/testnet-deployments.md`
- Contract source header templates with WASM SHA256 fields
- `CHANGELOG.md` (this file)
- `LICENSE` (MIT)

### Infrastructure
- OP_NET testnet RPC integration
- Bitcoin L1 transaction construction via opnet SDK
- Taproot transaction signing flow

---

## Commit Convention

```
feat(scope):     New feature
fix(scope):      Bug fix
refactor(scope): Code refactor without behavior change
docs:            Documentation only changes
chore:           Build process or tooling changes
test:            Adding or updating tests
```

**Scopes:** `contract`, `wallet`, `frontend`, `marketplace`, `yield`, `governance`, `docs`, `ci`

**Examples:**
```
feat(contract): add YieldDistributor checkpoint accounting
fix(wallet):    handle XVerse connection timeout gracefully
refactor(frontend): extract PropertyCard to shared component
docs: update testnet deployment registry with TXID
chore: upgrade opnet SDK to latest version
```

## [0.2.0-testnet] — 2026-03-03

### Added
- OPWAYield v3 contract deployed (`opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv`)
- Treasury configured on OPWAYield via StoredString bech32 dual-path payment verification
- PropertyNFT #1 and #2 minted on-chain (testnet)
- confirmInvest() flow wired to OPWAYield mint() with hasTo flag

### Fixed
- BigInt type error in confirmInvest() — maximumAllowedSatToSpend converted to Number
- Treasury not configured error — setTreasury executed on correct contract
- Browser SDK Uint8Array serialization bug — eliminated by storing treasury as bech32 string
