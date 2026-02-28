# OPWA — Technical Architecture

> Version: 0.1.0-testnet | Last updated: February 2026

---

## Table of Contents

1. [OP_NET Execution Model](#1-opnet-execution-model)
2. [WASM Deployment Process](#2-wasm-deployment-process)
3. [Property NFT Lifecycle](#3-property-nft-lifecycle)
4. [Fractionalization Mechanism](#4-fractionalization-mechanism)
5. [OP-20 Mint / Burn Flow](#5-op-20-mint--burn-flow)
6. [Yield Distribution Logic](#6-yield-distribution-logic)
7. [Stablecoin Settlement Model](#7-stablecoin-settlement-model-conceptual)
8. [Frontend → Wallet → Contract Call Chain](#8-frontend--wallet--contract-call-chain)

---

## 1. OP_NET Execution Model

OP_NET introduces programmability to Bitcoin Layer 1 without requiring any fork, BIP, sidechain, or bridge. It achieves this through a combination of:

- **Taproot / Tapscript**: Allows embedding arbitrary script data in Bitcoin transactions via the witness field. OP_NET uses this to embed WASM contract bytecode and call data.
- **Native UTXO Model**: Contracts interact with the Bitcoin UTXO set directly. Every contract call is a native Bitcoin L1 transaction.
- **OP-VM**: A Rust-based WebAssembly virtual machine that executes contract logic deterministically off-chain, with results committed on-chain via the OP_NET consensus layer.
- **Consensus Layer**: A decentralized network of OP_NET nodes validates contract execution and reaches consensus on state transitions, anchored to Bitcoin L1.

**Key invariant**: You never leave Bitcoin. Every interaction is a Layer 1 Bitcoin transaction. BTC is never wrapped, bridged, or moved off-chain.

```
Bitcoin Mempool
      │
      ▼
Bitcoin Miners (L1 confirmation)
      │
      ▼
OP_NET Nodes (parse Taproot witness, execute WASM)
      │
      ▼
OP-VM (deterministic WASM execution)
      │
      ▼
State Commitment (anchored to Bitcoin L1 block)
```

---

## 2. WASM Deployment Process

Contracts are written in **AssemblyScript** (TypeScript-like syntax compiled to WASM) and deployed as follows:

```
Developer writes contract.ts (AssemblyScript)
      │
      ▼
asc compiler → contract.wasm (WebAssembly binary)
      │
      ▼
SHA256(contract.wasm) → deployment hash (immutable fingerprint)
      │
      ▼
OP_NET CLI: opnet deploy --contract contract.wasm --network testnet
      │
      ▼
Bitcoin Taproot transaction created
  - Witness: WASM bytecode + deployment metadata
  - Fee paid in native BTC
      │
      ▼
Transaction broadcast → mined in Bitcoin block
      │
      ▼
Contract address assigned (deterministic from TXID + vout)
      │
      ▼
Contract live on OP_NET — callable via opnet SDK
```

**Deployment artifacts to record:**
- Contract address
- Deploy TXID
- Block height
- WASM SHA256 hash
- Network (testnet/mainnet)
- Deployment date

---

## 3. Property NFT Lifecycle

Each real estate property is represented as an OP-721 NFT on Bitcoin L1. The lifecycle:

```
[Off-chain: Legal Structure]
Property wrapped in SPV/LLC
      │
      ▼
[On-chain: Minting]
Property owner calls: PropertyNFT.mint(propertyMetadataURI)
→ Unique tokenId assigned
→ NFT minted to owner's Bitcoin address
→ Metadata URI points to IPFS/Arweave property documents
      │
      ▼
[On-chain: Fractionalization]
Owner calls: PropertyNFT.fractionalize(tokenId, totalShares)
→ FractionalToken (OP-20) contract deployed for this property
→ totalShares tokens minted to owner
→ NFT locked in PropertyNFT contract
      │
      ▼
[On-chain: Distribution]
Owner lists FractionalTokens on marketplace
Investors buy shares using native BTC
      │
      ▼
[On-chain: Yield]
Rental income converted → distributed pro-rata to FractionalToken holders
      │
      ▼
[On-chain: Redemption - Future]
If owner buys back 100% of shares → NFT unlocked → property de-tokenized
```

---

## 4. Fractionalization Mechanism

The fractionalization system uses a two-contract pattern:

**PropertyNFT (OP-721)**
- Represents whole property ownership
- Holds the "master" title claim
- Is locked when fractional shares exist

**FractionalToken (OP-20)**
- One contract deployed per property
- `totalSupply` = total fractional shares defined by original owner
- Each token = proportional ownership claim (e.g., 1/1000 of property)
- Freely tradeable on Motoswap DEX or peer-to-peer

**State machine:**

```
PropertyNFT states:
  WHOLE → (fractionalize) → FRACTIONALIZED → (buyback) → WHOLE

FractionalToken states:
  ACTIVE (while NFT locked)
  REDEEMED (after 100% buyback)
```

**Security consideration**: The PropertyNFT contract enforces that the underlying NFT cannot be transferred while any fractional supply is outstanding. This prevents a scenario where the property "title" moves while investors hold fractional claims.

---

## 5. OP-20 Mint / Burn Flow

**OPWACoin (platform token):**

```
mint():
  → Called only by contract owner (deployer)
  → Adds to totalSupply
  → Credits recipient balance
  → Emits Transfer(address(0), recipient, amount)

burn():
  → Called by token holder on own balance
  → Reduces totalSupply
  → Debits caller balance
  → Emits Transfer(caller, address(0), amount)
```

**FractionalToken (per-property):**

```
Initial mint (fractionalization):
  → Called once by PropertyNFT contract during fractionalize()
  → Fixed supply — no further minting possible
  → All tokens minted to property owner

Burn (redemption):
  → Token holders burn shares when accepting buyback offer
  → When totalSupply reaches 0 → NFT unlocked
```

---

## 6. Yield Distribution Logic

Rental income flows through the `YieldDistributor` contract:

```
[Off-chain] Property manager collects rent
      │
      ▼
[Off-chain] Convert to BTC or stablecoin equivalent
      │
      ▼
[On-chain] Call: YieldDistributor.depositYield(propertyId, amount)
→ Records yield per token = amount / FractionalToken.totalSupply
→ Accumulates in per-address claimable balance
      │
      ▼
[On-chain] Token holders call: YieldDistributor.claimYield(propertyId)
→ Calculates: claimable = (userBalance × yieldPerToken) - alreadyClaimed
→ Transfers BTC/stablecoin to claimant
→ Updates claimed accounting
```

**Formula (checkpoint model):**
```
yieldPerTokenStored += yieldDeposited / totalSupply

userYield = balanceOf(user) × (yieldPerTokenStored - userYieldPerTokenPaid[user])
```

This is the standard "Synthetix staking rewards" checkpoint pattern, adapted for OP_NET WASM.

---

## 7. Stablecoin Settlement Model (Conceptual)

> ⚠️ This section describes a planned future feature. Not yet implemented.

For yield distribution and property purchases, OPWA plans to integrate a BTC-collateralized stablecoin (likely through a future OP_NET native stablecoin protocol) to eliminate BTC price volatility for yield calculations.

**Conceptual flow:**
```
Rental income (USD) 
  → Convert to stablecoin at time of deposit
  → Stored in YieldDistributor as stablecoin units
  → Distributed to investors as stablecoin
  → Investors can hold or swap for BTC via Motoswap
```

**Settlement priority:**
1. Native BTC (current testnet implementation)
2. BTC-backed stablecoin (future mainnet)
3. Cross-chain stablecoin via future bridge (not recommended — contradicts OPWA security model)

---

## 8. Frontend → Wallet → Contract Call Chain

Full call chain for a typical "Buy Fractional Shares" user action:

```
[User clicks "Buy 10 Shares" in React UI]
      │
      ▼
[React Component]
  → Reads: useAppStore (Zustand) for wallet state
  → Calls: buyFractionalShares(propertyId, amount) from src/lib/opnet.ts
      │
      ▼
[src/lib/opnet.ts]
  → Import: opnet SDK (npm package)
  → Construct: ContractInteraction object
      {
        contract: FractionalToken[propertyId].address,
        method: "transfer" or "purchase",
        params: [recipient, amount],
        value: btcAmount  // native BTC to send
      }
      │
      ▼
[opnet SDK]
  → Build Bitcoin transaction (Taproot)
  → Set witness data (contract call ABI-encoded)
  → Calculate BTC fee
  → Request signing from wallet provider
      │
      ▼
[OPWallet / UniSat / XVerse Extension]
  → Display transaction details to user
  → User approves in wallet UI
  → Extension signs transaction with user's private key
  → Returns signed transaction hex
      │
      ▼
[opnet SDK]
  → Broadcast signed transaction to Bitcoin mempool
  → Monitor for confirmation
  → Return transaction result / state update
      │
      ▼
[React UI]
  → Update Zustand store with new balance
  → Show success notification
  → Re-fetch portfolio data
```

**Wallet integration layer** (`src/hooks/useWallet.ts`):
```typescript
// Wallet detection priority
const detectWallet = (): WalletProvider | null => {
  if (window.opnet)   return window.opnet;   // OPWallet (preferred)
  if (window.unisat)  return window.unisat;  // UniSat
  if (window.xverse)  return window.xverse;  // XVerse
  return null;
};
```

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `opnet` | latest | OP_NET JavaScript SDK |
| `react` | 19.x | UI framework |
| `typescript` | 5.x | Type safety |
| `vite` | 5.x | Build tool |
| `tailwindcss` | 3.x | Styling |
| `zustand` | 4.x | State management |
| `recharts` | 2.x | Portfolio charts |
| `lucide-react` | latest | Icons |

---

*For security considerations, see [security-model.md](./security-model.md)*  
*For deployment records, see [testnet-deployments.md](./testnet-deployments.md)*
