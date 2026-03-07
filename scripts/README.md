# Deploy Scripts — OPWABTC

FIX 5.93: documents the correct execution order for all deploy scripts.

## Prerequisites

```bash
export OPNET_MNEMONIC="your twelve word mnemonic phrase here"
```

All scripts use `MLDSASecurityLevel.LEVEL1` (ML-DSA-44, 128-bit quantum security) — sufficient for testnet.

## Execution Order

Run each script with `npx tsx scripts/<name>.ts`. Wait for the transaction to confirm on-chain before proceeding to the next step.

### Step 1 — Deploy OPWACoin (OP-20 + buy())
```bash
npx tsx scripts/deploy-token.ts
```
Save the contract address from output. This is `OPWACoin`.

### Step 2 — Deploy PropertyNFT (OP-721)
```bash
npx tsx scripts/deploy-nft.ts
```
Save the contract address. This is `PropertyNFT`.

### Step 3 — Deploy USDOP (reward token)
```bash
npx tsx scripts/deploy-usdop.ts
```
Save the contract address. This is `USDOP`.

### Step 4 — Deploy YieldVault
```bash
npx tsx scripts/deploy-yield-vault.ts
```
Save the contract address. This is `YieldVault`.

### Step 5 — Set minter on USDOP
```bash
npx tsx scripts/set-minter.ts
```
Sets the YieldVault address as the only authorized minter on USDOP.

### Step 6 — Deploy PropertyVault
```bash
npx tsx scripts/deploy-property-vault.ts
```
Save the contract address. This is `PropertyVault`.

### Step 7 — Configure vault addresses (YieldVault + PropertyVault)
```bash
npx tsx scripts/set-vault-addresses.ts
```
Links USDOP, OPWACoin, and PropertyNFT into YieldVault and PropertyVault.

### Step 8 — Set treasury on OPWACoin and OPWAYield
```bash
npx tsx scripts/set-treasury.ts
```
Configures the treasury P2TR address that receives sats on buy/mint.

### Step 9 — Configure PropertyVault (set NFT contract)
```bash
npx tsx scripts/configure-property-vault.ts
```

### Step 10 — Sanity check
```bash
bash scripts/sanity-check.sh
```
Verifies all contract addresses respond correctly on testnet.

## Deployed Addresses (OPNet Testnet)

| Contract       | Address                                        |
|----------------|------------------------------------------------|
| OPWACoin       | `opt1sqzr3qjugf334hrjaque5gt5r09fsvm80lqylyrcp` |
| OPWAYield v3   | `opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv` |
| USDOP          | `opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu` |
| PropertyNFT    | `opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6` |
| YieldVault v3  | `opt1sqqna5kthnryd4e44q0urp4veg6y6xp5k65jgj9mv` |
| PropertyVault  | `opt1sqpqkdmpr6z84l4lw8nhxuj66q02t5ay2vqu4zc6z` |

Network: OPNet Testnet (Signet fork) — use `networks.opnetTestnet` from `@btc-vision/bitcoin`.
