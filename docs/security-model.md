# OPWA — Security Model

> Version: 0.1.0-testnet | Last updated: February 2026  
> ⚠️ TESTNET ONLY — Do not use real funds on testnet

---

## 1. Self-Custody Architecture

OPWA is designed around a strict non-custodial principle: **at no point does OPWA hold, control, or have access to user funds**.

- All BTC remains in the user's own Bitcoin address
- Wallet signing happens exclusively in the user's browser extension (OPWallet, UniSat, XVerse)
- OPWA frontend is a read/write interface — it constructs transactions but cannot sign them
- Private keys never leave the user's device
- Even if the OPWA frontend is compromised, an attacker cannot access user funds without the user's wallet approval

**Threat model boundary:**
```
OPWA Frontend          │  User's Wallet
(potentially untrusted) │  (trusted — user controls)
                        │
Constructs transaction ──► User reviews ──► User approves ──► Signed TX broadcast
```

---

## 2. No Bridge Design

OPWA operates exclusively on Bitcoin Layer 1 via OP_NET. This eliminates the most common attack vector in the blockchain ecosystem: **bridge exploits**.

Bridge exploits have resulted in over $2.5 billion in losses across the industry (Ronin Bridge, Wormhole, Nomad, etc.). OPWA's architecture makes this class of attack structurally impossible:

- No BTC is ever sent to a bridge contract
- No wrapped BTC (wBTC, cbBTC, etc.) is used
- No cross-chain message passing is required
- Every transaction settles on Bitcoin L1 directly

---

## 3. BTC as Gas

OP_NET uses **native BTC as the gas currency**. This has important security implications:

**Benefits:**
- No secondary token needed — eliminates "gas token volatility" attacks
- Gas costs are denominated in Bitcoin — the most liquid, most secure asset
- No risk of gas token price manipulation affecting contract execution

**Considerations:**
- Gas costs may be higher than Ethereum L2s during high Bitcoin fee periods
- Users must maintain a small BTC balance for gas in addition to their investment amounts
- Testnet uses testnet BTC (tBTC) — no real value

---

## 4. Upgradeability Considerations

OP_NET contracts, once deployed, are **immutable by default**. Contract logic cannot be changed after deployment. This is a security feature:

- No "admin upgrade key" that could be compromised to drain funds
- Contract behavior is deterministic and auditable from the deployment TXID
- The WASM SHA256 hash serves as a permanent fingerprint of the deployed logic

**OPWA upgrade strategy:**
- New contract versions are deployed as separate contracts
- Users migrate voluntarily through a defined migration period
- Old contracts remain functional — no forced migration
- All contract versions are documented in [testnet-deployments.md](./testnet-deployments.md)

**Governance-controlled parameters (future):**
- Fee rates (within hardcoded bounds)
- Approved property validators
- Yield distribution schedules
These will be controlled by the Governance contract once live, requiring token holder votes.

---

## 5. Attack Surface Analysis

### 5.1 Smart Contract Risks

| Attack Vector | Mitigation |
|---------------|------------|
| Reentrancy | OP_NET WASM contracts do not support cross-contract calls mid-execution in the same way as EVM — reentrancy is structurally limited |
| Integer overflow | AssemblyScript `u256` arithmetic; overflow checked at compile time |
| Access control bypass | `onlyOwner` / `onlyAuthorized` modifiers on all privileged functions |
| Fractionalization race condition | Atomic state transitions — NFT lock and token mint happen in one transaction |
| Yield calculation manipulation | Checkpoint model with per-user accounting; yield per token stored immutably |

### 5.2 Frontend Risks

| Attack Vector | Mitigation |
|---------------|------------|
| XSS injection | React's built-in XSS protection; no `dangerouslySetInnerHTML` usage |
| Malicious transaction injection | All transactions reviewed by user in wallet before signing |
| MITM / DNS hijacking | Vercel HTTPS with HSTS; all RPC calls over TLS |
| Phishing (fake OPWA site) | Official domain documented in README; community education |
| Compromised npm dependency | `package-lock.json` lockfile; regular audit with `npm audit` |

### 5.3 Oracle / Data Risks

| Attack Vector | Mitigation |
|---------------|------------|
| Property valuation manipulation | Valuations are off-chain; on-chain contracts do not depend on price oracles for core logic |
| Metadata tampering | Property metadata URIs stored on IPFS/Arweave (content-addressed — immutable by design) |

---

## 6. Yield Risk Analysis

Investors in OPWA FractionalTokens are exposed to the following yield-related risks:

**Real estate market risk:** Property values may decline. Token price reflects market sentiment on underlying property value, which is not guaranteed.

**Rental income risk:** Properties may have vacancy periods or rental income shortfalls. Yield distribution is not guaranteed.

**Currency risk:** If yield is distributed in BTC, fluctuations in BTC/USD exchange rate affect the fiat value of yield payments.

**Liquidity risk:** FractionalTokens may have limited secondary market liquidity, particularly during early platform stages. Investors may not be able to exit positions at desired prices.

**Legal/jurisdictional risk:** The legal enforceability of the NFT-to-property-ownership claim depends on the jurisdiction and the off-chain legal structure (SPV/LLC). See [legal-structure-example.md](./legal-structure-example.md).

**Smart contract risk:** Despite best efforts, undiscovered bugs may exist in contract code. See audit status in [audits/](../audits/).

---

## 7. Testnet-Only Disclaimer

> ⚠️ **CRITICAL**: The current OPWA deployment operates exclusively on **OP_NET Testnet**.

- All tokens have **zero real-world value**
- All transactions use **testnet BTC (tBTC)** — not real Bitcoin
- Smart contracts are **unaudited** at this stage
- The platform is under active development — breaking changes may occur
- **Do not connect a wallet containing real funds to testnet deployments**

OP_NET Mainnet launches on **March 17, 2026**. OPWA will conduct a full security audit before mainnet deployment. Audit reports will be published in the [audits/](../audits/) directory.

---

## 8. Responsible Disclosure

If you discover a security vulnerability in OPWA contracts or frontend, please do not disclose it publicly. Contact the OPWA team via:

- Twitter: [@opwabtc](https://twitter.com/opwabtc)
- GitHub Security Advisory: [github.com/Opwabtc/OPWABTC/security](https://github.com/Opwabtc/OPWABTC/security)

We are committed to responding to valid security reports within 48 hours and will credit researchers upon fix disclosure.

---

*For technical architecture, see [technical-architecture.md](./technical-architecture.md)*  
*For deployment records, see [testnet-deployments.md](./testnet-deployments.md)*
