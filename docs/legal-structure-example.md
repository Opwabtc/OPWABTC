# OPWA — Legal Structure Example

> ⚠️ **EXAMPLE ONLY — NOT ACTIVE**  
> This document describes a *conceptual* legal framework for how OPWA tokenization could be structured.  
> This is not legal advice. OPWA is not a legal entity providing investment services.  
> Consult qualified legal counsel before structuring any real estate tokenization.

---

## Overview

For on-chain tokens to carry meaningful legal weight as property ownership claims, the digital assets must be connected to an off-chain legal structure. This document describes one example model — a **Special Purpose Vehicle (SPV) + LLC structure** — as an illustrative framework.

---

## 1. SPV / LLC Ownership Structure

```
[Real Property]
      │
      │ Owned by
      ▼
[Property LLC]
(Special Purpose Vehicle)
  - Single-asset LLC
  - Formed in jurisdiction of property
  - Purpose: hold title to one specific property
      │
      │ Equity in LLC represented by
      ▼
[PropertyNFT (OP-721)]
  - Minted on Bitcoin L1 via OP_NET
  - Represents 100% equity claim in Property LLC
  - Transferable on-chain = transfer of LLC equity
      │
      │ Fractionalized into
      ▼
[FractionalTokens (OP-20)]
  - Each token = fractional share of PropertyNFT
  - PropertyNFT locked in smart contract while shares outstanding
  - Token holders = fractional LLC equity holders (conceptually)
```

**Key legal document linkage:**
- The Property LLC operating agreement explicitly states that ownership of the PropertyNFT constitutes control of the LLC
- The LLC operating agreement is stored on IPFS, referenced in the NFT's `tokenURI`
- Token holders can verify legal documents on-chain via the NFT metadata

---

## 2. NFT as Equity Claim

The PropertyNFT token serves as the on-chain representation of LLC equity:

| OP-721 NFT Field | Off-chain Legal Equivalent |
|------------------|---------------------------|
| `tokenId` | Unique property identifier |
| `ownerOf(tokenId)` | Current LLC equity holder |
| `transferFrom(...)` | LLC equity transfer |
| `tokenURI` | IPFS link to LLC operating agreement + property title docs |

**Limitations of this model:**
- Legal recognition varies significantly by jurisdiction
- Property laws in many jurisdictions do not yet recognize tokenized title transfers
- Transfer of the NFT may not automatically trigger a legal title transfer in some jurisdictions
- Additional off-chain legal steps may be required (deed recording, notarization, etc.)

---

## 3. Rental Income Distribution Example

**Scenario:** A $1,000,000 property generates $4,000/month in rental income. 1,000 FractionalToken shares are outstanding.

```
Monthly rental income: $4,000 USD
Less: property management fee (10%): -$400
Less: maintenance reserve (5%): -$200
Net distributable income: $3,400

Per-share yield: $3,400 / 1,000 = $3.40/share/month

Token holder with 50 shares:
  Monthly yield = 50 × $3.40 = $170/month
  Annualized yield = $2,040/year
  Yield on $50,000 invested = 4.08% annually
```

**On-chain implementation:**
```
YieldDistributor.depositYield(propertyId, btcAmount)
  → btcAmount = $3,400 converted to BTC at time of deposit
  → yieldPerToken += btcAmount / 1000

Token holder claims:
YieldDistributor.claimYield(propertyId)
  → claimable = 50 × yieldPerToken
  → BTC transferred to holder's address
```

---

## 4. Optional KYC Structure

For certain jurisdictions or investor types, KYC (Know Your Customer) verification may be required.

**Permissioned token model (conceptual):**

```
Before purchase:
  User completes KYC via trusted verifier
  Verifier issues on-chain attestation to user's Bitcoin address
  FractionalToken.transfer() checks: isKYCApproved(recipient)
  Transfer blocked if recipient not KYC-approved

This creates a "permissioned" token class suitable for:
  - Accredited investor-only offerings (Reg D in USA)
  - Jurisdictions requiring investor verification
  - Institutional-grade property tokens
```

**Unverified / permissionless model:**
- Default OPWA tokens operate without KYC
- Suitable for jurisdictions where unregulated fractional property investment is permitted
- Platform users are responsible for their own compliance with local laws

---

## 5. Jurisdiction Considerations

| Jurisdiction | Tokenized Real Estate Status | Notes |
|--------------|------------------------------|-------|
| Dubai / UAE | Active pilot programs | Dubai Land Department testing tokenized title deeds |
| USA | Emerging — complex | Likely requires SEC compliance (Reg A/D/S) for securities classification |
| EU | MiCA framework emerging | Property tokens may qualify as Asset Referenced Tokens under MiCA |
| Bermuda | Crypto-friendly | OP_NET is headquartered in Hamilton, Bermuda |
| Singapore | Progressive framework | MAS has issued guidance on digital asset securities |

---

## Disclaimer

This document is an **illustrative example only**. It does not constitute legal advice, investment advice, or a securities offering. The legal validity of any specific implementation depends on applicable law in the relevant jurisdiction(s). Before tokenizing any real property or offering fractional ownership to investors, obtain qualified legal and regulatory counsel.

OPWA does not currently operate any active legal structures for property ownership. All current deployments are testnet simulations only.

---

*For technical implementation, see [technical-architecture.md](./technical-architecture.md)*
