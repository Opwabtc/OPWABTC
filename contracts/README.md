# OPWA Smart Contracts

All contracts are written in **AssemblyScript**, compiled to **WebAssembly (WASM)**, and deployed on **Bitcoin Layer 1** via OP_NET.

## Contract Directory

| Directory | Contract | Standard | Status |
|-----------|----------|----------|--------|
| `op20/` | `OPWACoin.ts` | OP-20 | Testnet |
| `op721/` | `PropertyNFT.ts` | OP-721 | Testnet |
| `yield/` | `YieldDistributor.ts` | Custom | Development |
| `governance/` | `Governance.ts` | Custom | Planned |

## Build Instructions

### Prerequisites

```bash
npm install -g assemblyscript
npm install @btc-vision/btc-runtime
```

### Compile a Contract

```bash
# Compile OPWACoin
asc contracts/op20/OPWACoin.ts \
  --target release \
  --optimize \
  --outFile dist/OPWACoin.wasm \
  --textFile dist/OPWACoin.wat

# Get WASM SHA256 (for deployment registry)
sha256sum dist/OPWACoin.wasm
```

### Deploy to Testnet

```bash
# Using OP_NET CLI
npx opnet deploy \
  --contract dist/OPWACoin.wasm \
  --network testnet \
  --wallet <your-wallet>

# Record the returned TXID and contract address in:
# docs/testnet-deployments.md
```

## Security Notes

- All contracts are **immutable** once deployed — no upgrade keys
- Privileged functions use `onlyOwner` / `onlyAuthorized` guards
- The PropertyNFT contract enforces fractionalization state machine atomically
- YieldDistributor uses checkpoint model — no per-holder loops (O(1) claims)

## Audits

Security audits will be conducted before mainnet deployment. Audit reports published in `../audits/`.
