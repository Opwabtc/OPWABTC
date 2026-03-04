# OPWA Protocol — Contract Reference

**Network:** OP_NET Testnet (Bitcoin Signet)
**RPC:** https://regtest.opnet.org
**Explorer:** https://opscan.org

---

## Deployed Contracts

| Contract | Standard | Address | Explorer |
|---|---|---|---|
| OPWACoin (OPWAY) | OP-20 | `opt1sqzr3qjugf334hrjaque5gt5r09fsvm80lqylyrcp` | [OPScan ↗](https://opscan.org/tokens/0xa4c529ac2a92cc21cb34bf6f17835cf466dc7345a61af0df82eee54d56dbd7b9?network=op_testnet) |
| PropertyNFT | OP-721 | `opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6` | [OPScan ↗](https://opscan.org/tokens/0x5be08132f3efd4d59a4adb27a8f53c1dc8e788db79e5aa086017f82359dfecfc?network=op_testnet) |
| YieldVault | Custom | `opt1sqrlvv7l5gdpfagzhgs80rzevyf60cn9t5qa0us8g` | [OPScan ↗](https://opscan.org/accounts/opt1sqrlvv7l5gdpfagzhgs80rzevyf60cn9t5qa0us8g?network=op_testnet) |
| USDOP | OP-20 | `opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu` | [OPScan ↗](https://opscan.org/accounts/opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu?network=op_testnet) |
| OPWAYield v3 | Custom | `opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv` | [OPScan ↗](https://opscan.org/tokens/0x50569f8a290f5f5eaa50321f3113d989cd6ea52384d25b49fe977ac2f266bbc8?network=op_testnet) |
| PropertyVault | Custom | `opt1sqpqkdmpr6z84l4lw8nhxuj66q02t5ay2vqu4zc6z` | [OPScan ↗](https://opscan.org/accounts/opt1sqpqkdmpr6z84l4lw8nhxuj66q02t5ay2vqu4zc6z?network=op_testnet) |

> ⚠️ Do NOT change contract addresses or redeploy without a full documentation update.

---

## Contract Details

### OPWACoin (OPWAY) — OP-20
**File:** `contracts/op20/OPWACoin.ts`
**ABI:** `contracts/abis/OPWACoin.abi.json`

The governance and utility token of the OPWA Protocol.

| Function | Description |
|---|---|
| `mint()` | Called by treasury — mints OPWAY atomically when BTC is received |
| `transfer(to, amount)` | Transfer OPWAY between addresses |
| `approve(spender, amount)` | Approve spender for vault deposits |
| `balanceOf(address)` | Query OPWAY balance |
| `totalSupply()` | Query total minted supply |

---

### PropertyNFT — OP-721
**File:** `contracts/op721/PropertyNFT.ts`
**ABI:** `contracts/abis/PropertyNFT.abi.json`

Represents unique real estate asset ownership. One NFT per property.

| Function | Description |
|---|---|
| `mint(to, tokenId, uri)` | Mint a new PropertyNFT with IPFS metadata URI |
| `ownerOf(tokenId)` | Query current owner |
| `transferFrom(from, to, tokenId)` | Transfer NFT ownership |
| `approve(to, tokenId)` | Approve PropertyVault to lock the NFT |
| `tokenURI(tokenId)` | Get IPFS metadata URI |

---

### YieldVault — Custom
**File:** `contracts/vault/YieldVault.ts`
**ABI:** `contracts/abis/YieldVault.abi.json`

Accepts OPWAY deposits and distributes USDOP yield per block.

| Function | Description |
|---|---|
| `stake(amount)` | Deposit OPWAY. Starts 420-block timelock. Supports top-up. |
| `getStake(address)` | Query staked OPWAY amount |
| `getDepositBlock(address)` | Query block number at time of deposit |
| `getAccruedRewards(address)` | Query accrued USDOP (on-chain) |
| `claimRewards()` | Claim accrued USDOP to wallet |
| `unstake()` | Withdraw OPWAY after timelock expires |

**Parameters:**
- Yield rate: 1 USDOP per 100 OPWAY per block
- Timelock: 420 blocks (~70 min on OP_NET Testnet)
- Version: v2 (supports top-up stake)

---

### USDOP — OP-20
**File:** `contracts/vault/USDOP.ts`

Protocol-native stablecoin. Minted exclusively by the YieldVault contract.

| Function | Description |
|---|---|
| `mint(to, amount)` | Called by YieldVault only — mints USDOP on claim |
| `transfer(to, amount)` | Transfer USDOP between addresses |
| `balanceOf(address)` | Query USDOP balance |

---

### PropertyVault — Custom
**File:** `contracts/vault/PropertyVault.ts`
**ABI:** `contracts/abis/PropertyVault.abi.json`

Locks a PropertyNFT and enables fractional OPWAY investment from the community.

| Function | Description |
|---|---|
| `listProperty(tokenId, maxOpway)` | Lock NFT and set maximum OPWAY raise amount |
| `invest(tokenId, amount)` | Invest OPWAY into a listed property |
| `getPropertyInfo(tokenId)` | Query property listing details |
| `withdrawNFT(tokenId)` | Unlock NFT when fully funded or cancelled |

---

### YieldDistributor — Custom *(In Development)*
**File:** `contracts/yield/YieldDistributor.ts`

Distributes rental income pro-rata to fractional token holders. Not yet deployed.

---

### Governance — Custom *(Planned)*
**Directory:** `contracts/governance/`

On-chain voting for protocol parameters using OPWACoin. Planned for Q4 2026.

---

## ABI Files

All ABI files are located in `contracts/abis/`:

| File | Contract |
|---|---|
| `OPWACoin.abi.json` | OPWACoin (OPWAY) |
| `PropertyNFT.abi.json` | PropertyNFT |
| `YieldVault.abi.json` | YieldVault |
| `PropertyVault.abi.json` | PropertyVault |
| `OP20.abi.json` | Generic OP-20 interface |
| `OP721.abi.json` | Generic OP-721 interface |

---

## Build Artifacts

Compiled WASM files in `contracts/build/`:

| File | Contract |
|---|---|
| `OPWACoin.wasm` | OPWACoin (OPWAY) |
| `YieldVault.wasm` | YieldVault |
| `USDOP.wasm` | USDOP |
| `PropertyVault.wasm` | PropertyVault |
