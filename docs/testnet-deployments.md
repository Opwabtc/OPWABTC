# OPWA — Testnet Deployment Registry

> ⚠️ All contracts below are deployed on **OP_NET Testnet only**. Zero real-world value.  
> Source references: [btc-vision GitHub](https://github.com/btc-vision) | [OP_NET Bob](https://ai.opnet.org/)

---

## Deployment Format

Each record follows this schema:

```
Contract Name  : Human-readable name
Standard       : OP-20 / OP-721 / Custom
Network        : testnet / mainnet
Version        : Semantic version (e.g., 0.1.0)
Contract Address: Bitcoin-style OP_NET contract address
Deploy TXID    : Bitcoin transaction ID of deployment
Block Number   : Bitcoin block height at deployment
WASM SHA256    : SHA256 hash of deployed WASM bytecode
Deployment Date: ISO 8601 date
Deployed By    : Deployer Bitcoin address
```

---

## Active Testnet Contracts

### OPWACoin (OP-20 Utility Token)

```
Contract Name   : OPWACoin
Standard        : OP-20
Network         : testnet
Version         : 0.1.0
Contract Address: [TO BE FILLED AFTER DEPLOYMENT]
Deploy TXID     : [TO BE FILLED AFTER DEPLOYMENT]
Block Number    : [TO BE FILLED AFTER DEPLOYMENT]
WASM SHA256     : [TO BE FILLED AFTER DEPLOYMENT]
Deployment Date : [TO BE FILLED AFTER DEPLOYMENT]
Deployed By     : [Deployer address]
Notes           : Platform utility and governance token. Max supply: 21,000,000 OPWA.
```

### PropertyNFT (OP-721 Property Title)

```
Contract Name   : PropertyNFT
Standard        : OP-721
Network         : testnet
Version         : 0.1.0
Contract Address: [TO BE FILLED AFTER DEPLOYMENT]
Deploy TXID     : [TO BE FILLED AFTER DEPLOYMENT]
Block Number    : [TO BE FILLED AFTER DEPLOYMENT]
WASM SHA256     : [TO BE FILLED AFTER DEPLOYMENT]
Deployment Date : [TO BE FILLED AFTER DEPLOYMENT]
Deployed By     : [Deployer address]
Notes           : Each NFT represents a unique tokenized property.
```

### FractionalToken Template (OP-20 Per-Property Shares)

```
Contract Name   : FractionalToken (Template)
Standard        : OP-20
Network         : testnet
Version         : 0.1.0
Contract Address: [Deployed per property — see instance registry below]
Deploy TXID     : [TO BE FILLED AFTER DEPLOYMENT]
Block Number    : [TO BE FILLED AFTER DEPLOYMENT]
WASM SHA256     : [TO BE FILLED AFTER DEPLOYMENT]
Deployment Date : [TO BE FILLED AFTER DEPLOYMENT]
Deployed By     : [Deployer address]
Notes           : One instance deployed per tokenized property. Supply fixed at fractionalization.
```

---

## Testnet Property Instance Registry

| Property ID | Property Name | FractionalToken Address | Total Shares | Deploy TXID | Status |
|-------------|---------------|------------------------|--------------|-------------|--------|
| `0x01` | [Test Property A] | [TBD] | [TBD] | [TBD] | Pending |
| `0x02` | [Test Property B] | [TBD] | [TBD] | [TBD] | Pending |

---

## Mainnet Migration Plan

**Target Date:** Q2 2026 (post OP_NET mainnet launch March 17, 2026)

Pre-mainnet checklist:
- [ ] Full smart contract security audit completed
- [ ] Audit report published in `/audits/`
- [ ] Testnet stress testing complete (1000+ transactions)
- [ ] Legal structure documentation finalized
- [ ] Multi-sig deployer wallet configured
- [ ] Emergency pause mechanism tested

Mainnet contracts will be recorded in this file under a `## Mainnet Contracts` section upon deployment.

---

## Verification

All deployed contracts can be verified on:
- **OPScan (Testnet):** https://testnet.opscan.io
- **OP_NET Explorer:** https://explorer.opnet.org

To verify a contract independently:
1. Obtain the WASM binary from this registry's SHA256 hash
2. Recompile from source: `asc contracts/op20/OPWACoin.ts -o OPWACoin.wasm`
3. Compare SHA256: `sha256sum OPWACoin.wasm`
4. Compare against the `WASM SHA256` field above

---

*Last updated: February 2026*
