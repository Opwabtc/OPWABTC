# Security Audits

OPWA Protocol is currently operating on OP_NET Testnet. No real assets are at risk at this stage.

A full third-party security audit of all smart contracts will be conducted prior to mainnet launch. Audit reports will be published in this directory upon completion.

## Planned Audit Scope

- `contracts/op20/OPWACoin.ts` — OP-20 token, minting logic
- `contracts/op721/PropertyNFT.ts` — OP-721 NFT, metadata handling
- `contracts/vault/YieldVault.ts` — Staking, timelock, reward accrual
- `contracts/vault/USDOP.ts` — Stablecoin minting access control
- `contracts/vault/PropertyVault.ts` — NFT locking, fractional investment
- `contracts/yield/YieldDistributor.ts` — Rental income distribution (pending development)

## Status

| Contract | Audit Status |
|---|---|
| OPWACoin (OPWAY) | Pending — pre-mainnet |
| PropertyNFT | Pending — pre-mainnet |
| YieldVault | Pending — pre-mainnet |
| USDOP | Pending — pre-mainnet |
| PropertyVault | Pending — pre-mainnet |
| YieldDistributor | Pending — development not complete |

## Known Issues (Testnet)

See the open issues table in [CHANGELOG.md](../CHANGELOG.md) for current known bugs and their status.

## Dependency Advisories

Some dependencies inherited from the OP_NET ecosystem may surface advisories in `npm audit`. These are known upstream issues in the AssemblyScript/OP_NET toolchain and do not affect the security of the testnet deployment. They will be resolved or formally accepted before mainnet launch.
