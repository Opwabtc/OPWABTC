# OPWA Testnet Deployments

**Network:** OP_NET Testnet (Bitcoin Signet)
**RPC:** https://regtest.opnet.org
**Explorer:** https://opscan.org

> ⚠️ Do NOT change contract addresses or logic without a full redeployment + documentation update.

---

## Deployed Contracts

| Contract | Standard | Address | OPScan |
|---|---|---|---|
| OPWACoin (OPWAY) | OP-20 | `opt1sqzr3qjugf334hrjaque5gt5r09fsvm80lqylyrcp` | [View ↗](https://opscan.org/tokens/0xa4c529ac2a92cc21cb34bf6f17835cf466dc7345a61af0df82eee54d56dbd7b9?network=op_testnet) |
| PropertyNFT | OP-721 | `opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6` | [View ↗](https://opscan.org/tokens/0x5be08132f3efd4d59a4adb27a8f53c1dc8e788db79e5aa086017f82359dfecfc?network=op_testnet) |
| YieldVault | Custom | `opt1sqzjaxfszmf6dltnjhx2txz08ezzqxvakzcuz7msw` | [View ↗](https://opscan.org/accounts/opt1sqzjaxfszmf6dltnjhx2txz08ezzqxvakzcuz7msw?network=op_testnet) |
| USDOP | OP-20 | `opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu` | [View ↗](https://opscan.org/accounts/opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu?network=op_testnet) |
| OPWAYield v3 | Custom | `opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv` | [View ↗](https://opscan.org/tokens/0x50569f8a290f5f5eaa50321f3113d989cd6ea52384d25b49fe977ac2f266bbc8?network=op_testnet) |

---

## Deployment History

| Version | Contract | Date | Notes |
|---|---|---|---|
| v1 | OPWACoin (OPWAY) | Jan 2026 | Initial OP-20 deployment |
| v1 | PropertyNFT | Jan 2026 | Initial OP-721 deployment |
| v1 | OPWAYield | Feb 2026 | Initial yield contract |
| v2 | YieldVault | Mar 2026 | Allows top-up stake, fixes "already staked" revert |
| v1 | USDOP | Mar 2026 | Protocol stablecoin — earned via YieldVault staking |
| v3 | OPWAYield | Mar 2026 | Current active yield contract |

---

## Key Parameters

| Parameter | Value |
|---|---|
| OPWAY Price | 1,000 sats (0.00001 BTC) |
| Yield Rate | 1 USDOP per 100 OPWAY per block |
| Timelock | 420 blocks (~70 minutes on OP_NET Testnet) |
| Block Number Scale | OP_NET internal ~3,700 (NOT Bitcoin Signet ~235,000) |
| RPC Block Method | `btc_blockNumber` (fallback: `eth_blockNumber`) |

---

## Mainnet Migration

OP_NET Mainnet launch: **March 17, 2026**

All contracts will be redeployed on mainnet post-launch. New addresses will be published here and updated in `index.html`.
