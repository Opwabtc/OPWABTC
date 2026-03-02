# Testnet Deployments

Network: **OPNet Testnet** (Signet fork — NOT Bitcoin Testnet4)
RPC: `https://testnet.opnet.org`
Explorer: `https://testnet.opscan.io`

---

## OPWACoin (OP-20 + buy())

| Field | Value |
|-------|-------|
| Contract Address | `opt1sqqthcct66va3sv9f3tmp9sgwprpvteheksycrz88` |
| Funding TX | `c0d7e2bb4586be6d88ed767a6beca0fac556db038cf53861e7f0e6d360ae7ac3` |
| Reveal TX | `b429b350330f306dd77db69a6358311b9c3f764b3e2405f64d4ea123a4138426` |
| setTreasury TX | `2ee6ec6de5e579ba2bee42c07b0f1f4dee8f5acee9760097c52d75914aba3e1e` |
| Symbol | OPWA |
| Decimals | 8 |
| Max Supply | 1,000,000 OPWA |
| Price | 1,000 sats / token |
| Treasury (P2TR) | `opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t` |
| Treasury pubkey | `5efba299a9b980c664a2fa82e675473fe471af7e745cea1bac4e8c909f994658` |
| Source | `contracts/op20/OPWACoin.ts` |
| ABI | `contracts/abis/OPWACoin.abi.json` |

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
