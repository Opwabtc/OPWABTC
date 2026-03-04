# OPWA Protocol — Technical Architecture

---

## System Overview

OPWA is a single-page application (SPA) deployed as a static HTML file on Vercel, communicating directly with smart contracts on Bitcoin Layer 1 via the OP_NET protocol.

```
┌──────────────────────────────────────────────────────────────┐
│                        USER LAYER                            │
│       OPWallet / UniSat / XVerse / OKX Browser Extension     │
└─────────────────────────┬────────────────────────────────────┘
                          │  BTC Transaction (native L1)
┌─────────────────────────▼────────────────────────────────────┐
│                     FRONTEND LAYER                           │
│         Single-Page App — index.html (~5,200 lines)          │
│         HTML / CSS / JavaScript — no build step              │
│              https://opwa-protocol.vercel.app                │
│                                                              │
│  Pages:  / (home)  /vault  /dashboard  /terms  /privacy      │
└─────────────────────────┬────────────────────────────────────┘
                          │  OP_NET SDK + JSON-RPC
                          │  (@btc-vision/transaction)
┌─────────────────────────▼────────────────────────────────────┐
│                  OP_NET LAYER (Bitcoin L1)                   │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐     │
│  │  OPWACoin   │  │ PropertyNFT │  │    YieldVault    │     │
│  │   (OP-20)   │  │  (OP-721)   │  │  + USDOP (OP-20) │     │
│  └─────────────┘  └─────────────┘  └──────────────────┘     │
│  ┌──────────────────────────────────────────────────────┐    │
│  │         PropertyVault — NFT locking + fractionalize  │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│         WASM Contracts (AssemblyScript → OP-VM)              │
│        Deployed via Taproot / UTXO Model                     │
└─────────────────────────┬────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                   BITCOIN LAYER 1                            │
│           Settlement Layer — ~$1.9T Market Cap               │
│             Taproot + Tapscript + Native UTXO                │
└──────────────────────────────────────────────────────────────┘
```

---

## Frontend

### Stack
- **Runtime:** Static HTML/CSS/JavaScript — single file (`index.html`)
- **Deployment:** Vercel (static, no build step)
- **Routing:** Browser History API — `navigate(path)` → `renderRoute()`
- **State:** In-memory JS variables + `localStorage` as UI cache (on-chain is source of truth)
- **Fonts:** Syne, DM Sans, DM Mono (Google Fonts CDN)
- **Wallet SDK:** `@btc-vision/transaction` (loaded via import)

### Pages

| Route | ID | Description |
|---|---|---|
| `/` | `#main-content` | Home: marketplace, asset cards, simulator, how it works, partners |
| `/vault` | `#page-vault` | YieldVault staking, USDOP accrual, PropertyNFT listing |
| `/dashboard` | `#page-dashboard` | Portfolio: balances, OPWAY chart, TX history |
| `/terms` | `#page-terms` | Terms of Service |
| `/privacy` | `#page-privacy` | Privacy Policy |

### Routing Pattern
```javascript
navigate(path)   // pushState + renderRoute()
renderRoute()    // shows/hides page divs + calls setNavActive()
```

### Supported Wallets
- OPWallet
- UniSat
- XVerse
- OKX

---

## Smart Contract Layer

### RPC Communication
```javascript
dashRpcCallRaw(method, params)
// Endpoint: https://regtest.opnet.org
// Methods used:
//   btc_blockNumber     → OP_NET internal block counter (~3,700)
//   eth_blockNumber     → fallback
//   btc_getBlockByNumber
//   eth_call            → contract read calls
```

> **Important:** OP_NET internal block numbers (~3,700) are different from Bitcoin Signet block height (~235,000). Always use `btc_blockNumber` for vault timelock calculations.

### Contract Interaction Pattern
```javascript
// All contract calls use @btc-vision/transaction
// signer: null — wallet signs externally via window.opnet
// Private keys are never stored or logged

const contract = getContract(ADDRESS, ABI, provider, network, senderAddr);
const result = await contract.METHOD(params);
```

### Vault Deposit Flow
```javascript
// 1. User approves YieldVault to spend OPWAY
// 2. User calls stake(amount)
// 3. depositBlock = btc_blockNumber at time of deposit
// 4. localStorage.setItem('vaultDeposit', { amount, depositBlock })
// 5. Timelock: depositBlock + 420 blocks (~70 min)
// 6. USDOP accrual: (currentBlock - depositBlock) * (amount / 100) per block
// 7. On vault tab open: vaultSyncChainState() syncs from getStake() + getDepositBlock()
```

### State Sync Strategy
- `localStorage` used for immediate UI feedback after transactions
- `vaultSyncChainState()` called on every vault page open — fetches on-chain truth
- If on-chain stake = 0 → clears localStorage (handles post-unstake, new device)
- If on-chain stake > 0 → overwrites localStorage with contract values

---

## React Component Library *(In Development)*

The `src/` directory contains a React 19 + TypeScript component library being developed for a future modular architecture migration. It is not the current production frontend.

| Directory | Contents |
|---|---|
| `src/components/` | UI components (wallet, cards, charts, modals) |
| `src/hooks/` | Custom hooks (wallet, prices, contracts, blocks) |
| `src/pages/` | Page components mirroring current SPA routes |
| `src/lib/` | OP_NET and Motoswap integration libraries |
| `src/store/` | Zustand global state |
| `src/contracts/` | Contract config and ABI bindings |

---

## Deployment

### Vercel Configuration (`vercel.json`)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
All routes rewrite to `index.html` — client-side routing handles the rest.

### Deploy Command
```bash
git add index.html
git commit -m "fix: description of change"
git push origin main
```
Vercel auto-deploys on every push to `main`. Average deploy time: ~1 minute.

---

## External Dependencies

| Service | Purpose | Data Shared |
|---|---|---|
| CoinGecko API | Live BTC price feed | None (public API) |
| regtest.opnet.org | OP_NET RPC — block data, contract calls | Wallet address (in TX) |
| opscan.org | Block explorer links | Public data only |
| Google Fonts CDN | Syne, DM Sans, DM Mono | IP address (Google policy) |

---

## Security Considerations

- No private keys are ever stored, logged, or transmitted
- All signing happens externally via wallet browser extension (`window.opnet`)
- `localStorage` stores only UI state (theme, vault deposit cache) — never credentials
- All contract addresses are hardcoded constants — not configurable by users
- Full audit planned before mainnet launch — see `audits/`
