# OPWA — Tokenomics

> Version: 0.1.0-testnet | Last updated: February 2026  
> ⚠️ Tokenomics are subject to change before mainnet. This is a working document.

---

## OPWACOIN (OP-20 Platform Token)

### Overview

| Parameter | Value |
|-----------|-------|
| Token Name | OPWACoin |
| Symbol | OPWA |
| Standard | OP-20 (Bitcoin L1 via OP_NET) |
| Decimals | 8 (matching Bitcoin satoshi precision) |
| Max Supply | 21,000,000 OPWA |
| Initial Supply | TBD |
| Network | Bitcoin L1 (OP_NET) |

The maximum supply of 21,000,000 deliberately mirrors Bitcoin's 21 million BTC supply cap — a philosophical alignment with Bitcoin's scarcity model.

---

### Token Utility

OPWACoin serves multiple functions within the OPWA ecosystem:

**Governance:** Token holders vote on protocol parameter changes — fee rates, approved property validators, yield distribution schedules, and protocol upgrades. Voting power is proportional to token holdings.

**Platform fees:** A portion of marketplace transaction fees may be paid in OPWA tokens, creating protocol-level demand. Specific fee structures will be defined before mainnet.

**Staking (Planned):** Token holders may stake OPWA to earn a share of platform fees. Staking parameters to be defined in governance documentation.

**Validator whitelisting (Planned):** Property validators (entities that verify off-chain legal compliance) may be required to stake OPWA as a performance bond.

---

### Supply Distribution (Proposed)

> ⚠️ This is a preliminary allocation model. Final allocations will be published before mainnet token generation event (TGE).

| Allocation | % | Amount | Vesting |
|------------|---|--------|---------|
| Community & Ecosystem | 40% | 8,400,000 | 4-year linear |
| Team & Founders | 20% | 4,200,000 | 1-year cliff + 3-year linear |
| Investors | 15% | 3,150,000 | 6-month cliff + 2-year linear |
| Protocol Treasury | 15% | 3,150,000 | DAO-controlled |
| Liquidity Provision | 10% | 2,100,000 | Immediate (DEX liquidity) |

---

## FractionalTokens (Per-Property OP-20)

Each tokenized property has its own dedicated FractionalToken contract.

### Parameters

| Parameter | Value |
|-----------|-------|
| Standard | OP-20 |
| Supply | Fixed at fractionalization — no further minting |
| Decimals | 0 (whole share units) or 8 (sub-share precision) |
| Transferability | Freely transferable on Motoswap or P2P |

### Pricing Model (Conceptual)

Initial share price at fractionalization:
```
initialSharePrice = propertyValuation / totalShares

Example:
  propertyValuation = 1,000,000 USD (converted to BTC equivalent)
  totalShares = 10,000
  initialSharePrice = 100 USD per share (in BTC equivalent)
```

Secondary market price is determined by supply/demand on Motoswap DEX. The "floor" price is theoretically the redemption value (buyback price offered by property owner), but market price may trade above or below this.

---

## Fee Structure (Proposed)

| Action | Fee | Recipient |
|--------|-----|-----------|
| Property tokenization (minting NFT) | 0.1% of property value | Protocol treasury |
| Fractionalization | 0.05% of total share value | Protocol treasury |
| Marketplace buy/sell | 0.5% per side | Protocol treasury (50%) + liquidity providers (50%) |
| Yield deposit | 0.2% of yield amount | Protocol treasury |
| Yield claim | 0% | — |

All fees are subject to governance vote adjustment within hardcoded bounds (min 0%, max 2% for marketplace).

---

## Motoswap Integration

OPWA FractionalTokens will be listed on **Motoswap** — the native Bitcoin L1 DEX built on OP_NET — enabling:

- Automated Market Maker (AMM) liquidity pools
- Price discovery for fractional property shares
- BTC ↔ FractionalToken swaps in one transaction
- Liquidity provider fees for OPWA/BTC and property token/BTC pairs

This integration is planned for **Q2 2026** alongside mainnet migration.

---

*For technical implementation, see [technical-architecture.md](./technical-architecture.md)*  
*For security considerations, see [security-model.md](./security-model.md)*
