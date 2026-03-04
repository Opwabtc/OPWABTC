# OPWA Protocol — Tokenomics

> **Status:** Draft — Full tokenomics and airdrop mechanics to be announced prior to mainnet launch.

---

## Token Overview

The OPWA Protocol uses two native tokens and one NFT standard:

| Token | Standard | Role |
|---|---|---|
| OPWAY (OPWACoin) | OP-20 | Governance & utility token |
| USDOP | OP-20 | Protocol stablecoin — yield and payment currency |
| PropertyNFT | OP-721 | Represents sole title of a real-world property |

---

## OPWAY (OPWACoin)

**Standard:** OP-20 (Bitcoin L1 via OP_NET)
**Contract:** `opt1sqzr3qjugf334hrjaque5gt5r09fsvm80lqylyrcp`

### Price & Minting
- 1 OPWAY = 1,000 sats = 0.00001 BTC
- Minting is atomic on-chain: BTC sent to treasury → OPWAY minted in the same transaction
- No intermediary, no off-chain step, no bridge

### Utility
- **Staking:** Deposit OPWAY into YieldVault to earn USDOP stablecoin yield
- **Investing:** Use OPWAY to purchase fractional shares of tokenized real estate
- **Governance:** On-chain voting rights for protocol parameters (activation planned Q4 2026)
- **Airdrop eligibility:** Early holders and stakers will be considered for airdrop (details TBA)

### Supply & Distribution
> Full supply schedule, allocation breakdown, vesting, and airdrop mechanics to be published before mainnet launch.

---

## USDOP

**Standard:** OP-20 (Bitcoin L1 via OP_NET)
**Contract:** `opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu`

### Earning Mechanism
- Stake OPWAY in the YieldVault contract
- Earn **1 USDOP per 100 OPWAY per OP_NET block**
- 420-block timelock before withdrawal (~70 minutes on OP_NET Testnet)
- Approximate yield: ~15% APY

### Use Cases (current and planned)
- Yield payment for OPWAY stakers
- Future: property purchase payments on the marketplace
- Future: rental income distribution via YieldDistributor
- Future: platform fee settlement

### Minting
- USDOP is minted exclusively by the YieldVault contract
- Cannot be purchased directly — must be earned through staking

---

## PropertyNFT

**Standard:** OP-721 (Bitcoin L1 via OP_NET)
**Contract:** `opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6`

- One NFT per real-world property
- Represents sole on-chain title of the asset
- Legal documentation linked via IPFS
- Can be deposited into PropertyVault to enable fractional community investment
- When 100% of fractional shares are acquired, NFT is unlocked and full title transferred

---

## YieldVault Parameters

| Parameter | Value |
|---|---|
| Yield rate | 1 USDOP per 100 OPWAY per block |
| Timelock | 420 blocks (~70 min on OP_NET Testnet) |
| Top-up | Supported (YieldVault v2) |
| Withdrawal | After timelock expiry |
| Approximate APY | ~15% |

---

## Disclaimer

All figures above apply to OP_NET Testnet only. Parameters including yield rate, timelock duration, and token supply are subject to change via protocol governance before and after mainnet launch. This document does not constitute financial advice.
