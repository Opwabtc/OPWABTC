# OPWA — Smart Contract API Reference

> Network: OP_NET Testnet | Standard: OP-20 / OP-721 (AssemblyScript → WASM)
> Source: `contracts/op20/OPWACoin.ts` | `contracts/op721/PropertyNFT.ts`

---

## OPWACoin (OP-20)

**Symbol:** `OPWA` | **Decimals:** 8 | **Max Supply:** 21,000,000 OPWA
**Contract Address:** See [testnet-deployments.md](./testnet-deployments.md)

### Read Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `name()` | `string` | Token name: `"OPWACoin"` |
| `symbol()` | `string` | Token ticker: `"OPWA"` |
| `decimals()` | `u8` | Decimal places: `8` |
| `totalSupply()` | `u256` | Current circulating supply |
| `balanceOf(account: Address)` | `u256` | Token balance for `account` |
| `allowance(owner: Address, spender: Address)` | `u256` | Approved spend amount |

### Write Methods

| Method | Parameters | Description |
|--------|-----------|-------------|
| `transfer(to: Address, value: u256)` | recipient, amount | Transfer tokens from caller |
| `approve(spender: Address, value: u256)` | spender, amount | Approve spend on caller's behalf |
| `transferFrom(from, to, value)` | sender, recipient, amount | Transfer with allowance |
| `mint(to: Address, value: u256)` | recipient, amount | **Owner only** — mint new tokens |
| `burn(value: u256)` | amount | Burn caller's tokens |

### Frontend Usage (opnet SDK)

```typescript
import { getContract, IOP20Contract, OP_20_ABI } from 'opnet';
import { provider, network } from '@/lib/opnet';

const contract = getContract<IOP20Contract>(
  OPWA_TOKEN_ADDRESS,
  OP_20_ABI,
  provider,
  network,
);

// Read balance
const result = await contract.balanceOf(userAddress);
const balance: bigint = result.properties.balance;

// Read metadata
const name = (await contract.name()).properties.name;
const symbol = (await contract.symbol()).properties.symbol;
const decimals = (await contract.decimals()).properties.decimals;
const totalSupply = (await contract.totalSupply()).properties.totalSupply;
```

---

## PropertyNFT (OP-721)

**Name:** `OPWA Property` | **Symbol:** `OPWA-PROP`
**Contract Address:** See [testnet-deployments.md](./testnet-deployments.md)

Each NFT token ID maps to a unique real-world property. The `tokenURI` points to IPFS/Arweave metadata containing legal documents and property details.

### Read Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `name()` | `string` | Collection name |
| `symbol()` | `string` | Collection symbol |
| `tokenURI(tokenId: u256)` | `string` | IPFS URI for token metadata |
| `ownerOf(tokenId: u256)` | `Address` | Current owner of token |
| `balanceOf(owner: Address)` | `u256` | NFTs held by `owner` |
| `getApproved(tokenId: u256)` | `Address` | Approved operator for token |
| `isApprovedForAll(owner, operator)` | `bool` | Operator approval status |

### Write Methods

| Method | Parameters | Description |
|--------|-----------|-------------|
| `mint(metadataURI: string)` | IPFS/data URI | **Owner only** — mint new property NFT |
| `fractionalize(tokenId, fractionalContract)` | token ID, contract address | Lock NFT, mark as fractionalized |
| `unlockOnRedemption(tokenId)` | token ID | **Fractional contract only** — unlock NFT |
| `transferFrom(from, to, tokenId)` | sender, recipient, token | Transfer (blocked if fractionalized) |
| `approve(to, tokenId)` | operator, token | Approve single transfer |
| `setApprovalForAll(operator, approved)` | operator, bool | Approve all tokens |

### Token Metadata Schema

```json
{
  "property_id": "prop-001",
  "name": "Downtown Penthouse São Paulo",
  "location": "Av. Paulista 1000, São Paulo, BR",
  "area_sqm": 120,
  "valuation_sats": 5000000000,
  "property_type": "residential",
  "total_fractions": 1000000,
  "image_uri": "ipfs://QmXxx..."
}
```

### Mint via Admin Panel

The frontend provides an admin panel at `/admin/mint` (accessible after wallet connection). Only the contract owner address can successfully call `mint()`.

---

## YieldDistributor (Custom)

> Status: In Development — not yet deployed on testnet.

Distributes rental income collected in BTC/OPWA to `FractionalToken` holders pro-rata.

| Method | Description |
|--------|-------------|
| `depositYield(propertyId, amount)` | Owner deposits rental income |
| `claim(propertyId)` | Holder claims proportional yield |
| `pendingYield(propertyId, holder)` | View unclaimed yield |

---

## Error Codes

| Error | Meaning |
|-------|---------|
| `PropertyNFT: caller is not token owner` | Only NFT owner can fractionalize |
| `PropertyNFT: token is fractionalized — redeem all shares first` | Transfer blocked while fractionalized |
| `PropertyNFT: only registered fractional contract can unlock` | Unlock restricted to paired contract |
| `OP-20: transfer amount exceeds balance` | Insufficient token balance |
| `OP-20: transfer amount exceeds allowance` | Insufficient approved amount |

---

*Last updated: February 2026*
