# Testnet Deployments

Network: **OPNet Testnet** (Signet fork — NOT Bitcoin Testnet4)
RPC: `https://testnet.opnet.org`
Explorer: `https://testnet.opscan.io`

---

## OPWACoin (OP-20)

| Field | Value |
|-------|-------|
| Contract Address | `opt1sqzr3qjugf334hrjaque5gt5r09fsvm80lqylyrcp` |
| Funding TX | `bc18a99eecf59292a89e3341413d6a979c4755121d486402d92b4205f79ac124` |
| Reveal TX | `8f755248524e6b035b96e9c03aed54d1d6506bf8527b419fb7de1f7c07b1e45f` |
| setTreasury TX | `a3d3a951b8e0612248a534d4dbbc56b1e6d7c9d5506a113fd878b45e4985a212` |
| Symbol | OPWA |
| Decimals | 8 |
| Max Supply | 1,000,000 OPWA |
| Price | 1,000 sats / token |
| Treasury (OPNet) | `opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t` |
| Treasury pubkey | `5efba299a9b980c664a2fa82e675473fe471af7e745cea1bac4e8c909f994658` |
| Source | `contracts/op20/OPWACoin.ts` |
| ABI | `contracts/abis/OPWACoin.abi.json` |

---

## OPWAYield (Yield Distributor — OP-20 mint)

| Field | Value |
|-------|-------|
| Contract Address | `opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv` |
| setTreasury TX | `e15f4ae9f3f7faf6075f0dc9d8fbe6f58e652f6300161e35218c8956acdfc0b9` |
| Symbol | OPWAY |
| Decimals | 8 |
| Price | 1,000 sats / token |
| Treasury (OPNet) | `opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t` |
| Source | `C:/Users/peluc/AppData/Local/Temp/property-nft/src/yield/OPWAYield.ts` |
| Design | StoredString bech32 treasury — dual-path payment check (simulation + real tx) |

---

## PropertyNFT (OP-721)

| Field | Value |
|-------|-------|
| Contract Address | `opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6` |
| Funding TX | `93e21744a6a6129b9a6020e7c06437cc7ccc4346ee57d6deaed5006f8f689cd9` |
| Reveal TX | `7f08b9ba43fd61e966c19559f05723ff6de78f859c294394ad69008dbaa9a7bb` |
| Symbol | OPWANFT |
| Max Supply | 100 NFTs |
| Mint Price | 10,000 sats |
| Minting | Open |
| Source | `contracts/op721/PropertyNFT.ts` |
| ABI | `contracts/abis/PropertyNFT.abi.json` |

---

## Deployer

| Field | Value |
|-------|-------|
| OPNet Address | `opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t` |
| Derivation | `deriveOPWallet(P2TR, 0)` · MLDSA Level 1 |
| Scripts | `scripts/deploy-token.ts` · `scripts/deploy-nft.ts` · `scripts/set-treasury.ts` |

---

## Pending

| Contract | Status |
|----------|--------|
| FractionalToken (OP-20 per property) | Not deployed |
| Governance | Planned |
