# Changelog

All notable changes to the OPWA Protocol are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]
- YieldDistributor — rental income distribution to fractional token holders
- OPWACoin governance activation + airdrop mechanics
- Motoswap liquidity integration for OPWAY/BTC pair
- React modular architecture migration (src/)
- First real tokenized properties on mainnet

---

## [0.9.0] — 2026-03-04 · Session 33

### Fixed
- `vaultDepositOPWAY()` — localStorage now written immediately after stake in both success paths; countdown and position display appear instantly without reload
- `vaultClaimUSDOP()` — calls `vaultRenderPosition()` after success toast, triggering `vaultUpdateAccrued()` on-chain; USDOP balance correctly drops to near-zero after claim
- New `vaultSyncChainState()` — async function called every time the Vault tab opens; fetches `getStake()` + `getDepositBlock()` on-chain:
  - If stake = 0 → clears localStorage (handles post-unstake and new device scenarios)
  - If stake > 0 → writes correct total (including top-ups) and exact block from contract
- `vaultWithdrawOPWAY()` — `localStorage.removeItem('vaultDeposit')` called before render; UI hides position immediately after unstake, mirroring `_stakes.set(key, 0)` on-chain

---

## [0.8.0] — 2026-03-03 · Session 32

### Changed
- Navbar layout migrated from `display:flex` + `margin-left:auto` to `display:grid; grid-template-columns:1fr auto 1fr` — logo left, nav-links centered, controls right
- Partners carousel speed 40s → 35s; padding `8px 16px` → `8px 0` to fix offset desync; keyframes `from/to` → `0%/100%`
- Footer injection replaced `cloneFooterToPages()` + `setTimeout` with `injectSubFooters()` IIFE running at parse time — eliminates blank/wrong footer on subpages

### Fixed
- Vault block number: replaced `mempool.opnet.org/api/blocks/tip/height` (Bitcoin Signet ~235,000) with `dashRpcCallRaw('btc_blockNumber', [])` (OP_NET internal ~3,700) — fixes USDOP absurd values and premature timelock completion
- USDOP display format: `$ 108.00` under 1,000 / `$ 1,090.42` over 1,000 — 2 decimal places, `$` prefix with space
- TX history block numbers: hex → decimal conversion in `renderTxList` for `0x`-prefixed values
- Nav active state: `setNavActive()` called by `renderRoute()`; `IntersectionObserver` tracks sections (assets, simulator, partners, how-it-works)
- Property Vault photo upload: added `pvaultPhotoClear()` and "✕ Remove Photo" button; upload border changes dashed → solid orange on upload
- List Property button: green gradient `#16a34a → #15803d` for visual consistency

### Added
- Section scroll tracking via `IntersectionObserver` — orange top-bar indicator on active nav item
- Active nav indicator via `::before` pseudo-element

---

## [0.7.0] — 2026-03-01 · Sessions 30–31

### Fixed
- Vault block sync restored after regression in cb74e8cd
- `getAccruedRewards()` on-chain query restored for correct USDOP display
- Asset cards expand in column only; ticker text color corrected to white
- OPWAY chart value corrected

### Changed
- Vault cards styling updated
- Footer gap corrected

---

## [0.6.0] — 2026-02-28 · Sessions 28–29

### Added
- **YieldVault v2** deployed — allows top-up stake without "already staked" revert
- **USDOP** stablecoin deployed on OP_NET Testnet (`opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu`)
- Dashboard TX history redesigned in OPScan style: status icon, hash+method badge, value, block, age, status badge
- TX method colored badges: OPWAY=purple, PropertyNFT=orange, YieldVault=green, USDOP=gold
- Pagination redesigned: "Showing 1–N of X" left, prev/next buttons right
- TX hash display: 10 chars + ... + 8 chars

### Changed
- Vault deposit flow uses OP_NET block scale consistently
- `localStorage` used as UI cache; on-chain state is source of truth

---

## [0.5.0] — 2026-02-27 · Sessions 22–27

### Added
- **Dashboard page** (`/dashboard`) always visible in navbar
- Portfolio chart (OPWAY value over time)
- Live BTC price feed via CoinGecko
- Gas converter widget in navbar
- Wallet dropdown with disconnect, copy address, explorer link
- Transaction history with on-chain scan via OP_NET RPC
- Investment simulator with BTC/USD toggle and monthly contribution slider

### Changed
- Wallet modal widened
- Footer unified across all pages (home, vault, dashboard, terms, privacy)

---

## [0.4.0] — 2026-02-27 · Sessions 15–21

### Added
- **Vault page** (`/vault`) with YieldVault staking UI
  - OPWAY deposit → USDOP accrual display
  - 420-block timelock countdown
  - Claim USDOP button
  - Withdraw OPWAY (unlocked after timelock)
- **Property Vault** section — mint PropertyNFT, upload photo, list for fractional investment
- SPA routing with browser History API (`navigate()` → `renderRoute()`)
- Terms of Service page (`/terms`)
- Privacy Policy page (`/privacy`)
- Light / dark mode toggle with CSS variable system
- Custom animated split-pill cursor

### Contracts Deployed
- PropertyNFT (OP-721): `opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6`
- OPWAYield v1 → v3: `opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv`

---

## [0.3.0] — 2026-02-26 · Sessions 8–14

### Added
- Fractional investment accordion cards with receipt preview (tokens, BTC cost)
- Asset marketplace with 5 demo properties (Miami, Manhattan, São Paulo, Lisbon, Dubai)
- Partners scrolling carousel
- "How It Works" section with 4-step protocol explanation
- Protocol / tech stack section with contract addresses
- Wallet modal with OPWallet, UniSat, XVerse, OKX support
- Mobile navigation menu

### Changed
- Design system v4: Bitcoin orange dominant, Syne + DM Sans + DM Mono typography
- Dark-first theme with full light mode support

---

## [0.2.0] — 2026-02-26 · Sessions 3–7

### Added
- **OPWACoin (OPWAY)** deployed on OP_NET Testnet (`opt1sqzr3qjugf334hrjaque5gt5r09fsvm80lqylyrcp`)
- Real wallet integration via `@btc-vision/transaction` SDK
- On-chain mint: BTC sent to treasury → OPWAY minted atomically (1 OPWAY = 1,000 sats)
- Live block height polling
- Deployment scripts: `deploy-token.ts`, `deploy-nft.ts`, `deploy-yield-vault.ts`, `deploy-usdop.ts`, `deploy-property-vault.ts`
- CI/CD pipeline with Vercel auto-deploy on push to `main`

### Added (Contracts)
- `contracts/op20/OPWACoin.ts`
- `contracts/op721/PropertyNFT.ts`
- `contracts/vault/YieldVault.ts`
- `contracts/vault/USDOP.ts`
- `contracts/vault/PropertyVault.ts`
- `contracts/yield/YieldDistributor.ts` (in development)

---

## [0.1.0] — 2026-02-26 · Sessions 1–2

### Added
- Initial commit — OPWA Bitcoin Real Estate Platform
- Skeleton SPA (`index.html`) — standalone HTML deployment
- Institutional documentation suite v0.1.0-testnet
- MIT License
- Vercel deployment configuration (`vercel.json`)
- README initial version

---

## Known Issues (Open)

| Issue | Status | Notes |
|---|---|---|
| TX block shows as hex (`#0xeb5`) | Open | Fix: convert `tx.blockNumber` to decimal in `loadTxHistory` storage step |
| OPWAY balance shows 0 in dashboard | Open | `eth_call` for OPWAYield v3 returns 404 — needs OPScan REST API fallback |
| TX timestamps show "Pending" | Open | `tx.time` is null — OPNet block data has no timestamps; needs per-block fetch |
| Partners fade gradient (light mode) | Cosmetic | `var(--bg-base)` matches background in light mode — cards visible and scrolling |
| Wallet dropdown alignment | Open | `.wallet-btn-wrap` alignment check needed with new grid navbar |

---

[Unreleased]: https://github.com/Opwabtc/OPWABTC/compare/v0.9.0...HEAD
[0.9.0]: https://github.com/Opwabtc/OPWABTC/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/Opwabtc/OPWABTC/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/Opwabtc/OPWABTC/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/Opwabtc/OPWABTC/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/Opwabtc/OPWABTC/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/Opwabtc/OPWABTC/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/Opwabtc/OPWABTC/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Opwabtc/OPWABTC/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Opwabtc/OPWABTC/releases/tag/v0.1.0
