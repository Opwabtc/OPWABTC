# Testnet Deployments

Network: **OPNet Testnet** (Signet fork — NOT Bitcoin Testnet4)
RPC: `https://testnet.opnet.org`
Explorer: `https://testnet.opscan.io`

---

## OPWACoin (OP-20 + buy())

| Field | Value |
|-------|-------|
| Contract Address | `opt1sqzr3qjugf334hrjaque5gt5r09fsvm80lqylyrcp` |
| Funding TX | `bc18a99eecf59292a89e3341413d6a979c4755121d486402d92b4205f79ac124` |
| Reveal TX | `8f755248524e6b035b96e9c03aed54d1d6506bf8527b419fb7de1f7c07b1e45f` |
| setTreasury TX | `(pending — run set-treasury.ts)` |
| Symbol | OPWA |
| Decimals | 8 |
| Max Supply | 1,000,000 OPWA |
| Price | 1,000 sats / token |
| Treasury (P2TR) | `opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t` |
| Treasury pubkey | `5efba299a9b980c664a2fa82e675473fe471af7e745cea1bac4e8c909f994658` |
| Source | `contracts/op20/OPWACoin.ts` |
| ABI | `contracts/abis/OPWACoin.abi.json` |

**Payment check (v2 — dual-path):**
- Simulation: `output.to === treasury.toHex()` (hasTo flag + hex pubkey string)
- Real tx: `output.scriptPublicKey` P2TR bytes match treasury pubkey

**Key methods:**
- `buy(to: address, amount: uint256)` — payable; verifies BTC output to treasury, mints tokens
- `getPrice() → uint256` — current price in sats per whole token
- `setPrice(uint256)` — owner only
- `setTreasury(address)` — owner only

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

**Key methods:**
- `mint()` — mints 1 NFT to sender (10,000 sats fee in the tx)
- `mintPrice() → uint256`
- `mintingOpen() → bool`
- `setMintPrice(uint256)` / `setMintingOpen()` / `setMintingClosed()` — owner only

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
