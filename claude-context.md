# REPO SNAPSHOT
> Sun Mar  1 11:24:38     2026

## Estrutura
```
./.env
./.env.example
./.github/workflows/ci.yml
./.gitignore
./.nvmrc
./.vercel/README.txt
./.vercel/project.json
./CHANGELOG.md
./CONTRIBUTING.md
./LICENSE
./OPWACoin/.gitattributes
./OPWACoin/.github/dependabot.yml
./OPWACoin/.gitignore
./OPWACoin/.prettierrc.json
./OPWACoin/.vscode/settings.json
./OPWACoin/LICENSE
./OPWACoin/README.md
./OPWACoin/abis/MyToken.abi.json
./OPWACoin/abis/MyToken.abi.ts
./OPWACoin/abis/MyToken.d.ts
./OPWACoin/abis/OP20.abi.json
./OPWACoin/abis/OP20.abi.ts
./OPWACoin/abis/OP20.d.ts
./OPWACoin/abis/OP20S.abi.json
./OPWACoin/abis/OP20S.abi.ts
./OPWACoin/abis/OP20S.d.ts
./OPWACoin/abis/OP721.abi.json
./OPWACoin/abis/OP721.abi.ts
./OPWACoin/abis/OP721.d.ts
./OPWACoin/as-pect.asconfig.json
./OPWACoin/as-pect.config.js
./OPWACoin/asconfig.json
./OPWACoin/build/MyToken.wasm
./OPWACoin/build/OPWAProperty.wasm
./OPWACoin/docs/OP_20.md
./OPWACoin/eslint.config.js
./OPWACoin/package-lock.json
./OPWACoin/package.json
./OPWACoin/src/btc-resolver/BtcNameResolver.ts
./OPWACoin/src/btc-resolver/constants.ts
./OPWACoin/src/btc-resolver/events/ResolverEvents.ts
./OPWACoin/src/btc-resolver/index.ts
./OPWACoin/src/contracts/OPWAProperty.ts
./OPWACoin/src/contracts/index.ts
./OPWACoin/src/multi-oracle-stablecoin/MyMultiOracleStable.ts
./OPWACoin/src/multi-oracle-stablecoin/index.ts
./OPWACoin/src/nft/MyNFT.ts
./OPWACoin/src/nft/events/Reserved.ts
./OPWACoin/src/nft/index.ts
./OPWACoin/src/pegged-token/MyPeggedToken.ts
./OPWACoin/src/pegged-token/index.ts
./OPWACoin/src/registry/PackageRegistry.ts
./OPWACoin/src/registry/README.md
./OPWACoin/src/registry/constants.ts
./OPWACoin/src/registry/events/RegistryEvents.ts
./OPWACoin/src/registry/index.ts
./OPWACoin/src/shared-events/OracleEvents.ts
./OPWACoin/src/stablecoin/MyStableCoin.ts
./OPWACoin/src/stablecoin/events/StableCoinEvents.ts
./OPWACoin/src/stablecoin/index.ts
./OPWACoin/src/token/MyToken.ts
./OPWACoin/src/token/index.ts
./OPWACoin/src/tsconfig.json
./OPWACoin/tests/PackageRegistry.spec.ts
./OPWACoin/tests/as-pect.d.ts
./OPWACoin/tests/tsconfig.json
./OPWACoin/tsconfig.json
./README.md
./SECURITY.md
./claude-context.md
./contracts/README.md
./contracts/op20/OPWACoin.ts
./contracts/op721/PropertyNFT.ts
./contracts/yield/YieldDistributor.ts
./docs/CONTRACTS.md
./docs/legal-structure-example.md
./docs/security-model.md
./docs/technical-architecture.md
./docs/testnet-deployments.md
./docs/tokenomics.md
./docs/whitepaper.md
./fix_nav_classes.cjs
./fix_router_s14.cjs
./fix_ts_s14.cjs
./gen_app.cjs
./gen_app.js
./gen_css.cjs
./gen_css.js
./gen_dashboard.cjs
./gen_dashboard.js
./gen_nav.cjs
./gen_nav.js
./index.html
./index_bob_visual.html
./opwa_fix_s14.py
./opwa_run_s14.sh
./opwa_s14_node_writer.sh
./package-lock.json
./package.json
./public/llms-full.txt
./public/llms.txt
./repo-snapshot.sh
./run_fix_ts.sh
./run_nav_fix.sh
./run_router_fix.sh
./scripts/sanity-check.sh
./src/App.tsx
./src/components/BuyTokenModal.tsx
./src/components/Footer.tsx
./src/components/GasConverterWidget.tsx
./src/components/Layout.tsx
./src/components/Navigation.tsx
./src/components/NotificationSystem.tsx
./src/components/PortfolioChart.tsx
./src/components/PropertyCard.tsx
./src/components/SellTokenModal.tsx
./src/components/ThemeToggle.tsx
./src/components/ToastContainer.tsx
./src/components/WalletButton.tsx
./src/components/WalletDropdown.tsx
./src/components/WalletModal.tsx
./src/contracts/config.ts
./src/hooks/useBTCPrice.ts
./src/hooks/useBlockHeight.ts
./src/hooks/useGasPrice.ts
./src/hooks/useInvestment.ts
./src/hooks/useLivePrices.ts
./src/hooks/useOPNETWallet.ts
./src/hooks/usePropertyContract.ts
./src/hooks/useSendTransaction.ts
./src/hooks/useSyncWallet.ts
./src/hooks/useTheme.ts
./src/hooks/useToast.ts
./src/hooks/useWallet.ts
./src/index.css
./src/lib/motoswap.ts
./src/lib/opnet.ts
./src/lib/utils.ts
./src/main.tsx
./src/pages/AdminMint.tsx
./src/pages/Dashboard.tsx
./src/pages/Home.tsx
./src/pages/Marketplace.tsx
./src/pages/Privacy.tsx
./src/pages/PropertyManagement.tsx
./src/pages/Simulator.tsx
./src/pages/Terms.tsx
./src/store/useAppStore.ts
./src/types/index.ts
./src/types/wallet.d.ts
./src/utils/defaultProvider.ts
./src/utils/opnetContracts.ts
./src/vite-env.d.ts
./tailwind.config.js
./tsconfig.json
./tsconfig.node.json
./tsconfig.node.tsbuildinfo
./tsconfig.tsbuildinfo
./vercel.json
./vite.config.js
./vite.config.ts
```

## package.json
```json
{
  "name": "op-real-estate-platform",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "sanity": "bash scripts/sanity-check.sh"
  },
  "dependencies": {
    "@btc-vision/bitcoin": "^7.0.0-rc.6",
    "@btc-vision/transaction": "^1.8.0-rc.10",
    "@btc-vision/walletconnect": "^1.10.3",
    "clsx": "^2.0.0",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.575.0",
    "opnet": "^1.8.1-rc.16",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.1",
    "recharts": "^3.7.0",
    "tailwindcss": "^3.4.0",
    "zustand": "^5.0.11"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.15",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.27",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "postcss": "^8.4.38",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.48.0",
    "vite": "^7.3.1"
  }
}```

## tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Código Fonte
### `./OPWACoin/abis/MyToken.abi.ts`
```ts
import { ABIDataTypes, BitcoinAbiTypes, OP_NET_ABI } from 'opnet';

export const MyTokenEvents = [
    {
        name: 'Minted',
        values: [
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        type: BitcoinAbiTypes.Event,
    },
];

export const MyTokenAbi = [
    {
        name: 'mint',
        inputs: [
            { name: 'address', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'airdrop',
        inputs: [{ name: 'addressAndAmount', type: ABIDataTypes.ADDRESS_UINT256_TUPLE }],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    ...MyTokenEvents,
    ...OP_NET_ABI,
];

export default MyTokenAbi;
```

### `./OPWACoin/abis/MyToken.d.ts`
```ts
import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------
export type MintedEvent = {
    readonly to: Address;
    readonly amount: bigint;
};

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the mint function call.
 */
export type Mint = CallResult<{}, OPNetEvent<MintedEvent>[]>;

/**
 * @description Represents the result of the airdrop function call.
 */
export type Airdrop = CallResult<{}, OPNetEvent<MintedEvent>[]>;

// ------------------------------------------------------------------
// IMyToken
// ------------------------------------------------------------------
export interface IMyToken extends IOP_NETContract {
    mint(address: Address, amount: bigint): Promise<Mint>;
    airdrop(addressAndAmount: AddressMap<bigint>): Promise<Airdrop>;
}
```

### `./OPWACoin/abis/OP20.abi.ts`
```ts
import { ABIDataTypes, BitcoinAbiTypes, OP_NET_ABI } from 'opnet';

export const OP20Events = [
    {
        name: 'Transferred',
        values: [
            { name: 'operator', type: ABIDataTypes.ADDRESS },
            { name: 'from', type: ABIDataTypes.ADDRESS },
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        type: BitcoinAbiTypes.Event,
    },
    {
        name: 'Approved',
        values: [
            { name: 'owner', type: ABIDataTypes.ADDRESS },
            { name: 'spender', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        type: BitcoinAbiTypes.Event,
    },
    {
        name: 'Burned',
        values: [
            { name: 'from', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        type: BitcoinAbiTypes.Event,
    },
];

export const OP20Abi = [
    {
        name: 'name',
        inputs: [],
        outputs: [{ name: 'name', type: ABIDataTypes.STRING }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'symbol',
        inputs: [],
        outputs: [{ name: 'symbol', type: ABIDataTypes.STRING }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'icon',
        inputs: [],
        outputs: [{ name: 'icon', type: ABIDataTypes.STRING }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'decimals',
        inputs: [],
        outputs: [{ name: 'decimals', type: ABIDataTypes.UINT8 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'totalSupply',
        inputs: [],
        outputs: [{ name: 'totalSupply', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'maximumSupply',
        inputs: [],
        outputs: [{ name: 'maximumSupply', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'domainSeparator',
        inputs: [],
        outputs: [{ name: 'domainSeparator', type: ABIDataTypes.BYTES32 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'balanceOf',
        inputs: [{ name: 'owner', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'balance', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'nonceOf',
        inputs: [{ name: 'owner', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'nonce', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'allowance',
        inputs: [
            { name: 'owner', type: ABIDataTypes.ADDRESS },
            { name: 'spender', type: ABIDataTypes.ADDRESS },
        ],
        outputs: [{ name: 'remaining', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'transfer',
        inputs: [
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'transferFrom',
        inputs: [
            { name: 'from', type: ABIDataTypes.ADDRESS },
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'safeTransfer',
        inputs: [
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
            { name: 'data', type: ABIDataTypes.BYTES },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'safeTransferFrom',
        inputs: [
            { name: 'from', type: ABIDataTypes.ADDRESS },
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
            { name: 'data', type: ABIDataTypes.BYTES },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'increaseAllowance',
        inputs: [
            { name: 'spender', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'decreaseAllowance',
        inputs: [
            { name: 'spender', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'increaseAllowanceBySignature',
        inputs: [
            { name: 'owner', type: ABIDataTypes.BYTES32 },
            { name: 'ownerTweakedPublicKey', type: ABIDataTypes.BYTES32 },
            { name: 'spender', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
            { name: 'deadline', type: ABIDataTypes.UINT64 },
            { name: 'signature', type: ABIDataTypes.BYTES },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'decreaseAllowanceBySignature',
        inputs: [
            { name: 'owner', type: ABIDataTypes.BYTES32 },
            { name: 'ownerTweakedPublicKey', type: ABIDataTypes.BYTES32 },
            { name: 'spender', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
            { name: 'deadline', type: ABIDataTypes.UINT64 },
            { name: 'signature', type: ABIDataTypes.BYTES },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'burn',
        inputs: [{ name: 'amount', type: ABIDataTypes.UINT256 }],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'metadata',
        inputs: [],
        outputs: [
            { name: 'name', type: ABIDataTypes.STRING },
            { name: 'symbol', type: ABIDataTypes.STRING },
            { name: 'icon', type: ABIDataTypes.STRING },
            { name: 'decimals', type: ABIDataTypes.UINT8 },
            { name: 'totalSupply', type: ABIDataTypes.UINT256 },
            { name: 'domainSeparator', type: ABIDataTypes.BYTES32 },
        ],
        type: BitcoinAbiTypes.Function,
    },
    ...OP20Events,
    ...OP_NET_ABI,
];

export default OP20Abi;
```

### `./OPWACoin/abis/OP20.d.ts`
```ts
import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------
export type TransferredEvent = {
    readonly operator: Address;
    readonly from: Address;
    readonly to: Address;
    readonly amount: bigint;
};
export type ApprovedEvent = {
    readonly owner: Address;
    readonly spender: Address;
    readonly amount: bigint;
};
export type BurnedEvent = {
    readonly from: Address;
    readonly amount: bigint;
};

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the name function call.
 */
export type Name = CallResult<
    {
        name: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the symbol function call.
 */
export type Symbol = CallResult<
    {
        symbol: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the icon function call.
 */
export type Icon = CallResult<
    {
        icon: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the decimals function call.
 */
export type Decimals = CallResult<
    {
        decimals: number;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the totalSupply function call.
 */
export type TotalSupply = CallResult<
    {
        totalSupply: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the maximumSupply function call.
 */
export type MaximumSupply = CallResult<
    {
        maximumSupply: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the domainSeparator function call.
 */
export type DomainSeparator = CallResult<
    {
        domainSeparator: Uint8Array;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the balanceOf function call.
 */
export type BalanceOf = CallResult<
    {
        balance: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the nonceOf function call.
 */
export type NonceOf = CallResult<
    {
        nonce: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the allowance function call.
 */
export type Allowance = CallResult<
    {
        remaining: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the transfer function call.
 */
export type Transfer = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the transferFrom function call.
 */
export type TransferFrom = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the safeTransfer function call.
 */
export type SafeTransfer = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the safeTransferFrom function call.
 */
export type SafeTransferFrom = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the increaseAllowance function call.
 */
export type IncreaseAllowance = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the decreaseAllowance function call.
 */
export type DecreaseAllowance = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the increaseAllowanceBySignature function call.
 */
export type IncreaseAllowanceBySignature = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the decreaseAllowanceBySignature function call.
 */
export type DecreaseAllowanceBySignature = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the burn function call.
 */
export type Burn = CallResult<{}, OPNetEvent<BurnedEvent>[]>;

/**
 * @description Represents the result of the metadata function call.
 */
export type Metadata = CallResult<
    {
        name: string;
        symbol: string;
        icon: string;
        decimals: number;
        totalSupply: bigint;
        domainSeparator: Uint8Array;
    },
    OPNetEvent<never>[]
>;

// ------------------------------------------------------------------
// IOP20
// ------------------------------------------------------------------
export interface IOP20 extends IOP_NETContract {
    name(): Promise<Name>;
    symbol(): Promise<Symbol>;
    icon(): Promise<Icon>;
    decimals(): Promise<Decimals>;
    totalSupply(): Promise<TotalSupply>;
    maximumSupply(): Promise<MaximumSupply>;
    domainSeparator(): Promise<DomainSeparator>;
    balanceOf(owner: Address): Promise<BalanceOf>;
    nonceOf(owner: Address): Promise<NonceOf>;
    allowance(owner: Address, spender: Address): Promise<Allowance>;
    transfer(to: Address, amount: bigint): Promise<Transfer>;
    transferFrom(from: Address, to: Address, amount: bigint): Promise<TransferFrom>;
    safeTransfer(to: Address, amount: bigint, data: Uint8Array): Promise<SafeTransfer>;
    safeTransferFrom(from: Address, to: Address, amount: bigint, data: Uint8Array): Promise<SafeTransferFrom>;
    increaseAllowance(spender: Address, amount: bigint): Promise<IncreaseAllowance>;
    decreaseAllowance(spender: Address, amount: bigint): Promise<DecreaseAllowance>;
    increaseAllowanceBySignature(
        owner: Uint8Array,
        ownerTweakedPublicKey: Uint8Array,
        spender: Address,
        amount: bigint,
        deadline: bigint,
        signature: Uint8Array,
    ): Promise<IncreaseAllowanceBySignature>;
    decreaseAllowanceBySignature(
        owner: Uint8Array,
        ownerTweakedPublicKey: Uint8Array,
        spender: Address,
        amount: bigint,
        deadline: bigint,
        signature: Uint8Array,
    ): Promise<DecreaseAllowanceBySignature>;
    burn(amount: bigint): Promise<Burn>;
    metadata(): Promise<Metadata>;
}
```

### `./OPWACoin/abis/OP20S.abi.ts`
```ts
import { ABIDataTypes, BitcoinAbiTypes, OP_NET_ABI } from 'opnet';

export const OP20SEvents = [
    {
        name: 'PegRateUpdated',
        values: [
            { name: 'oldRate', type: ABIDataTypes.UINT256 },
            { name: 'newRate', type: ABIDataTypes.UINT256 },
            { name: 'updatedAt', type: ABIDataTypes.UINT64 },
        ],
        type: BitcoinAbiTypes.Event,
    },
    {
        name: 'MaxStalenessUpdated',
        values: [
            { name: 'oldStaleness', type: ABIDataTypes.UINT64 },
            { name: 'newStaleness', type: ABIDataTypes.UINT64 },
        ],
        type: BitcoinAbiTypes.Event,
    },
    {
        name: 'PegAuthorityTransferStarted',
        values: [
            { name: 'currentAuthority', type: ABIDataTypes.ADDRESS },
            { name: 'pendingAuthority', type: ABIDataTypes.ADDRESS },
        ],
        type: BitcoinAbiTypes.Event,
    },
    {
        name: 'PegAuthorityTransferred',
        values: [
            { name: 'previousAuthority', type: ABIDataTypes.ADDRESS },
            { name: 'newAuthority', type: ABIDataTypes.ADDRESS },
        ],
        type: BitcoinAbiTypes.Event,
    },
    {
        name: 'PegAuthorityRenounced',
        values: [{ name: 'previousAuthority', type: ABIDataTypes.ADDRESS }],
        type: BitcoinAbiTypes.Event,
    },
];

export const OP20SAbi = [
    {
        name: 'pegRate',
        inputs: [],
        outputs: [{ name: 'rate', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'pegAuthority',
        inputs: [],
        outputs: [{ name: 'authority', type: ABIDataTypes.ADDRESS }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'pegUpdatedAt',
        inputs: [],
        outputs: [{ name: 'updatedAt', type: ABIDataTypes.UINT64 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'maxStaleness',
        inputs: [],
        outputs: [{ name: 'staleness', type: ABIDataTypes.UINT64 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'isStale',
        inputs: [],
        outputs: [{ name: 'stale', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'updatePegRate',
        inputs: [{ name: 'newRate', type: ABIDataTypes.UINT256 }],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'updateMaxStaleness',
        inputs: [{ name: 'newStaleness', type: ABIDataTypes.UINT64 }],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'transferPegAuthority',
        inputs: [{ name: 'newAuthority', type: ABIDataTypes.ADDRESS }],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'acceptPegAuthority',
        inputs: [],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'renouncePegAuthority',
        inputs: [],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    ...OP20SEvents,
    ...OP_NET_ABI,
];

export default OP20SAbi;
```

### `./OPWACoin/abis/OP20S.d.ts`
```ts
import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------
export type PegRateUpdatedEvent = {
    readonly oldRate: bigint;
    readonly newRate: bigint;
    readonly updatedAt: bigint;
};
export type MaxStalenessUpdatedEvent = {
    readonly oldStaleness: bigint;
    readonly newStaleness: bigint;
};
export type PegAuthorityTransferStartedEvent = {
    readonly currentAuthority: Address;
    readonly pendingAuthority: Address;
};
export type PegAuthorityTransferredEvent = {
    readonly previousAuthority: Address;
    readonly newAuthority: Address;
};
export type PegAuthorityRenouncedEvent = {
    readonly previousAuthority: Address;
};

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the pegRate function call.
 */
export type PegRate = CallResult<
    {
        rate: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the pegAuthority function call.
 */
export type PegAuthority = CallResult<
    {
        authority: Address;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the pegUpdatedAt function call.
 */
export type PegUpdatedAt = CallResult<
    {
        updatedAt: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the maxStaleness function call.
 */
export type MaxStaleness = CallResult<
    {
        staleness: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the isStale function call.
 */
export type IsStale = CallResult<
    {
        stale: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the updatePegRate function call.
 */
export type UpdatePegRate = CallResult<{}, OPNetEvent<PegRateUpdatedEvent>[]>;

/**
 * @description Represents the result of the updateMaxStaleness function call.
 */
export type UpdateMaxStaleness = CallResult<{}, OPNetEvent<MaxStalenessUpdatedEvent>[]>;

/**
 * @description Represents the result of the transferPegAuthority function call.
 */
export type TransferPegAuthority = CallResult<{}, OPNetEvent<PegAuthorityTransferStartedEvent>[]>;

/**
 * @description Represents the result of the acceptPegAuthority function call.
 */
export type AcceptPegAuthority = CallResult<{}, OPNetEvent<PegAuthorityTransferredEvent>[]>;

/**
 * @description Represents the result of the renouncePegAuthority function call.
 */
export type RenouncePegAuthority = CallResult<{}, OPNetEvent<PegAuthorityRenouncedEvent>[]>;

// ------------------------------------------------------------------
// IOP20S
// ------------------------------------------------------------------
export interface IOP20S extends IOP_NETContract {
    pegRate(): Promise<PegRate>;
    pegAuthority(): Promise<PegAuthority>;
    pegUpdatedAt(): Promise<PegUpdatedAt>;
    maxStaleness(): Promise<MaxStaleness>;
    isStale(): Promise<IsStale>;
    updatePegRate(newRate: bigint): Promise<UpdatePegRate>;
    updateMaxStaleness(newStaleness: bigint): Promise<UpdateMaxStaleness>;
    transferPegAuthority(newAuthority: Address): Promise<TransferPegAuthority>;
    acceptPegAuthority(): Promise<AcceptPegAuthority>;
    renouncePegAuthority(): Promise<RenouncePegAuthority>;
}
```

### `./OPWACoin/abis/OP721.abi.ts`
```ts
import { ABIDataTypes, BitcoinAbiTypes, OP_NET_ABI } from 'opnet';

export const OP721Events = [
    {
        name: 'Transferred',
        values: [
            { name: 'operator', type: ABIDataTypes.ADDRESS },
            { name: 'from', type: ABIDataTypes.ADDRESS },
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        type: BitcoinAbiTypes.Event,
    },
    {
        name: 'Approved',
        values: [
            { name: 'owner', type: ABIDataTypes.ADDRESS },
            { name: 'spender', type: ABIDataTypes.ADDRESS },
            { name: 'amount', type: ABIDataTypes.UINT256 },
        ],
        type: BitcoinAbiTypes.Event,
    },
    {
        name: 'ApprovedForAll',
        values: [
            { name: 'account', type: ABIDataTypes.ADDRESS },
            { name: 'operator', type: ABIDataTypes.ADDRESS },
            { name: 'approved', type: ABIDataTypes.BOOL },
        ],
        type: BitcoinAbiTypes.Event,
    },
    {
        name: 'URI',
        values: [
            { name: 'value', type: ABIDataTypes.STRING },
            { name: 'id', type: ABIDataTypes.UINT256 },
        ],
        type: BitcoinAbiTypes.Event,
    },
];

export const OP721Abi = [
    {
        name: 'name',
        inputs: [],
        outputs: [{ name: 'name', type: ABIDataTypes.STRING }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'symbol',
        inputs: [],
        outputs: [{ name: 'symbol', type: ABIDataTypes.STRING }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'maxSupply',
        inputs: [],
        outputs: [{ name: 'maxSupply', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'collectionInfo',
        inputs: [],
        outputs: [
            { name: 'icon', type: ABIDataTypes.STRING },
            { name: 'banner', type: ABIDataTypes.STRING },
            { name: 'description', type: ABIDataTypes.STRING },
            { name: 'website', type: ABIDataTypes.STRING },
        ],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'tokenURI',
        inputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
        outputs: [{ name: 'uri', type: ABIDataTypes.STRING }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'changeMetadata',
        inputs: [],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'totalSupply',
        inputs: [],
        outputs: [{ name: 'totalSupply', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'balanceOf',
        inputs: [{ name: 'owner', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'balance', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'ownerOf',
        inputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
        outputs: [{ name: 'owner', type: ABIDataTypes.ADDRESS }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'transfer',
        inputs: [
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'tokenId', type: ABIDataTypes.UINT256 },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'transferFrom',
        inputs: [
            { name: 'from', type: ABIDataTypes.ADDRESS },
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'tokenId', type: ABIDataTypes.UINT256 },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'safeTransfer',
        inputs: [
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'tokenId', type: ABIDataTypes.UINT256 },
            { name: 'data', type: ABIDataTypes.BYTES },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'safeTransferFrom',
        inputs: [
            { name: 'from', type: ABIDataTypes.ADDRESS },
            { name: 'to', type: ABIDataTypes.ADDRESS },
            { name: 'tokenId', type: ABIDataTypes.UINT256 },
            { name: 'data', type: ABIDataTypes.BYTES },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'approve',
        inputs: [
            { name: 'operator', type: ABIDataTypes.ADDRESS },
            { name: 'tokenId', type: ABIDataTypes.UINT256 },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'getApproved',
        inputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'setApprovalForAll',
        inputs: [
            { name: 'operator', type: ABIDataTypes.ADDRESS },
            { name: 'approved', type: ABIDataTypes.BOOL },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'isApprovedForAll',
        inputs: [
            { name: 'owner', type: ABIDataTypes.ADDRESS },
            { name: 'operator', type: ABIDataTypes.ADDRESS },
        ],
        outputs: [{ name: 'approved', type: ABIDataTypes.BOOL }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'approveBySignature',
        inputs: [
            { name: 'owner', type: ABIDataTypes.BYTES32 },
            { name: 'ownerTweakedPublicKey', type: ABIDataTypes.BYTES32 },
            { name: 'operator', type: ABIDataTypes.ADDRESS },
            { name: 'tokenId', type: ABIDataTypes.UINT256 },
            { name: 'deadline', type: ABIDataTypes.UINT64 },
            { name: 'signature', type: ABIDataTypes.BYTES },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'setApprovalForAllBySignature',
        inputs: [
            { name: 'owner', type: ABIDataTypes.BYTES32 },
            { name: 'ownerTweakedPublicKey', type: ABIDataTypes.BYTES32 },
            { name: 'operator', type: ABIDataTypes.ADDRESS },
            { name: 'approved', type: ABIDataTypes.BOOL },
            { name: 'deadline', type: ABIDataTypes.UINT64 },
            { name: 'signature', type: ABIDataTypes.BYTES },
        ],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'burn',
        inputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'domainSeparator',
        inputs: [],
        outputs: [{ name: 'domainSeparator', type: ABIDataTypes.BYTES32 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'tokenOfOwnerByIndex',
        inputs: [
            { name: 'owner', type: ABIDataTypes.ADDRESS },
            { name: 'index', type: ABIDataTypes.UINT256 },
        ],
        outputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'getApproveNonce',
        inputs: [{ name: 'owner', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'nonce', type: ABIDataTypes.UINT256 }],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'setBaseURI',
        inputs: [{ name: 'baseURI', type: ABIDataTypes.STRING }],
        outputs: [],
        type: BitcoinAbiTypes.Function,
    },
    {
        name: 'metadata',
        inputs: [],
        outputs: [
            { name: 'name', type: ABIDataTypes.STRING },
            { name: 'symbol', type: ABIDataTypes.STRING },
            { name: 'icon', type: ABIDataTypes.STRING },
            { name: 'banner', type: ABIDataTypes.STRING },
            { name: 'description', type: ABIDataTypes.STRING },
            { name: 'website', type: ABIDataTypes.STRING },
            { name: 'totalSupply', type: ABIDataTypes.UINT256 },
            { name: 'domainSeparator', type: ABIDataTypes.BYTES32 },
        ],
        type: BitcoinAbiTypes.Function,
    },
    ...OP721Events,
    ...OP_NET_ABI,
];

export default OP721Abi;
```

### `./OPWACoin/abis/OP721.d.ts`
```ts
import { Address, AddressMap, ExtendedAddressMap, SchnorrSignature } from '@btc-vision/transaction';
import { CallResult, OPNetEvent, IOP_NETContract } from 'opnet';

// ------------------------------------------------------------------
// Event Definitions
// ------------------------------------------------------------------
export type TransferredEvent = {
    readonly operator: Address;
    readonly from: Address;
    readonly to: Address;
    readonly amount: bigint;
};
export type ApprovedEvent = {
    readonly owner: Address;
    readonly spender: Address;
    readonly amount: bigint;
};
export type ApprovedForAllEvent = {
    readonly account: Address;
    readonly operator: Address;
    readonly approved: boolean;
};
export type URIEvent = {
    readonly value: string;
    readonly id: bigint;
};

// ------------------------------------------------------------------
// Call Results
// ------------------------------------------------------------------

/**
 * @description Represents the result of the name function call.
 */
export type Name = CallResult<
    {
        name: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the symbol function call.
 */
export type Symbol = CallResult<
    {
        symbol: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the maxSupply function call.
 */
export type MaxSupply = CallResult<
    {
        maxSupply: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the collectionInfo function call.
 */
export type CollectionInfo = CallResult<
    {
        icon: string;
        banner: string;
        description: string;
        website: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the tokenURI function call.
 */
export type TokenURI = CallResult<
    {
        uri: string;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the changeMetadata function call.
 */
export type ChangeMetadata = CallResult<{}, OPNetEvent<never>[]>;

/**
 * @description Represents the result of the totalSupply function call.
 */
export type TotalSupply = CallResult<
    {
        totalSupply: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the balanceOf function call.
 */
export type BalanceOf = CallResult<
    {
        balance: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the ownerOf function call.
 */
export type OwnerOf = CallResult<
    {
        owner: Address;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the transfer function call.
 */
export type Transfer = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the transferFrom function call.
 */
export type TransferFrom = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the safeTransfer function call.
 */
export type SafeTransfer = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the safeTransferFrom function call.
 */
export type SafeTransferFrom = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the approve function call.
 */
export type Approve = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the getApproved function call.
 */
export type GetApproved = CallResult<{}, OPNetEvent<never>[]>;

/**
 * @description Represents the result of the setApprovalForAll function call.
 */
export type SetApprovalForAll = CallResult<{}, OPNetEvent<ApprovedForAllEvent>[]>;

/**
 * @description Represents the result of the isApprovedForAll function call.
 */
export type IsApprovedForAll = CallResult<
    {
        approved: boolean;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the approveBySignature function call.
 */
export type ApproveBySignature = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the setApprovalForAllBySignature function call.
 */
export type SetApprovalForAllBySignature = CallResult<{}, OPNetEvent<ApprovedEvent>[]>;

/**
 * @description Represents the result of the burn function call.
 */
export type Burn = CallResult<{}, OPNetEvent<TransferredEvent>[]>;

/**
 * @description Represents the result of the domainSeparator function call.
 */
export type DomainSeparator = CallResult<
    {
        domainSeparator: Uint8Array;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the tokenOfOwnerByIndex function call.
 */
export type TokenOfOwnerByIndex = CallResult<
    {
        tokenId: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the getApproveNonce function call.
 */
export type GetApproveNonce = CallResult<
    {
        nonce: bigint;
    },
    OPNetEvent<never>[]
>;

/**
 * @description Represents the result of the setBaseURI function call.
 */
export type SetBaseURI = CallResult<{}, OPNetEvent<URIEvent>[]>;

/**
 * @description Represents the result of the metadata function call.
 */
export type Metadata = CallResult<
    {
        name: string;
        symbol: string;
        icon: string;
        banner: string;
        description: string;
        website: string;
        totalSupply: bigint;
        domainSeparator: Uint8Array;
    },
    OPNetEvent<never>[]
>;

// ------------------------------------------------------------------
// IOP721
// ------------------------------------------------------------------
export interface IOP721 extends IOP_NETContract {
    name(): Promise<Name>;
    symbol(): Promise<Symbol>;
    maxSupply(): Promise<MaxSupply>;
    collectionInfo(): Promise<CollectionInfo>;
    tokenURI(tokenId: bigint): Promise<TokenURI>;
    changeMetadata(): Promise<ChangeMetadata>;
    totalSupply(): Promise<TotalSupply>;
    balanceOf(owner: Address): Promise<BalanceOf>;
    ownerOf(tokenId: bigint): Promise<OwnerOf>;
    transfer(to: Address, tokenId: bigint): Promise<Transfer>;
    transferFrom(from: Address, to: Address, tokenId: bigint): Promise<TransferFrom>;
    safeTransfer(to: Address, tokenId: bigint, data: Uint8Array): Promise<SafeTransfer>;
    safeTransferFrom(from: Address, to: Address, tokenId: bigint, data: Uint8Array): Promise<SafeTransferFrom>;
    approve(operator: Address, tokenId: bigint): Promise<Approve>;
    getApproved(tokenId: bigint): Promise<GetApproved>;
    setApprovalForAll(operator: Address, approved: boolean): Promise<SetApprovalForAll>;
    isApprovedForAll(owner: Address, operator: Address): Promise<IsApprovedForAll>;
    approveBySignature(
        owner: Uint8Array,
        ownerTweakedPublicKey: Uint8Array,
        operator: Address,
        tokenId: bigint,
        deadline: bigint,
        signature: Uint8Array,
    ): Promise<ApproveBySignature>;
    setApprovalForAllBySignature(
        owner: Uint8Array,
        ownerTweakedPublicKey: Uint8Array,
        operator: Address,
        approved: boolean,
        deadline: bigint,
        signature: Uint8Array,
    ): Promise<SetApprovalForAllBySignature>;
    burn(tokenId: bigint): Promise<Burn>;
    domainSeparator(): Promise<DomainSeparator>;
    tokenOfOwnerByIndex(owner: Address, index: bigint): Promise<TokenOfOwnerByIndex>;
    getApproveNonce(owner: Address): Promise<GetApproveNonce>;
    setBaseURI(baseURI: string): Promise<SetBaseURI>;
    metadata(): Promise<Metadata>;
}
```

### `./OPWACoin/as-pect.config.js`
```js
function __liftString(pointer, memory) {
    if (!pointer) return null;
    const end = (pointer + new Uint32Array(memory.buffer)[(pointer - 4) >>> 2]) >>> 1,
        memoryU16 = new Uint16Array(memory.buffer);
    let start = pointer >>> 1,
        string = '';
    while (end - start > 1024) {
        const a = memoryU16.subarray(start, (start += 1024));
        string += String.fromCharCode(...a);
    }
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
}

function log(text, memory) {
    text = __liftString(text >>> 0, memory);
    console.log(`CONTRACT LOG: ${text}`);
}

export default {
    /**
     * A set of globs passed to the glob package that qualify typescript files for testing.
     */
    entries: ['tests/**/*.spec.ts'],

    /**
     * A set of globs passed to the glob package that quality files to be added to each test.
     */
    include: ['tests/**/*.include.ts'],

    /**
     * A set of regexp that will disclude source files from testing.
     */
    disclude: [/node_modules/],

    /**
     * Add your required AssemblyScript imports here.
     */
    async instantiate(memory, createImports, instantiate, binary) {
        let memory2;
        const resp = instantiate(
            binary,
            createImports({
                env: {
                    memory,
                    'console.log': (data) => {
                        log(data, memory2);
                    },
                },
            }),
        );

        const { exports } = await resp;
        memory2 = exports.memory || memory;

        return resp;
    },

    /** Enable code coverage. */
    coverage: ['src/**/*.ts'],

    /**
     * Specify if the binary wasm file should be written to the file system.
     */
    outputBinary: false,
};
```

### `./OPWACoin/eslint.config.js`
```js
// @ts-check

import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigDirName: import.meta.dirname,
            },
        },
        rules: {
            'no-undef': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'no-empty': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/only-throw-error': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            '@typescript-eslint/unbound-method': 'warn',
            '@typescript-eslint/no-confusing-void-expression': 'off',
            '@typescript-eslint/no-extraneous-class': 'off',
            '@typescript-eslint/restrict-plus-operands': 'off',
            '@typescript-eslint/no-unnecessary-type-assertion': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
        },
    },
    {
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked,
    },
);
```

### `./OPWACoin/src/btc-resolver/BtcNameResolver.ts`
```ts
/**
 * OPNet BTC Name Resolver Smart Contract
 *
 * A decentralized domain name resolver for .btc domains. Manages:
 * - Domain ownership (mysite.btc)
 * - Subdomain support (sub.mysite.btc)
 * - Contenthash storage (CIDv0, CIDv1, IPNS, SHA-256)
 * - Two-step ownership transfers
 * - TTL (time-to-live) per domain
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    ADDRESS_BYTE_LENGTH,
    Blockchain,
    BytesWriter,
    Calldata,
    ExtendedAddress,
    OP_NET,
    Revert,
    SafeMath,
    StoredString,
    U256_BYTE_LENGTH,
    U64_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';
import { StoredMapU256 } from '@btc-vision/btc-runtime/runtime/storage/maps/StoredMapU256';
import { AdvancedStoredString } from '@btc-vision/btc-runtime/runtime/storage/AdvancedStoredString';

import {
    ContenthashChangedEvent,
    ContenthashClearedEvent,
    DomainPriceChangedEvent,
    DomainRegisteredEvent,
    DomainTransferCancelledEvent,
    DomainTransferCompletedEvent,
    DomainTransferInitiatedEvent,
    SubdomainCreatedEvent,
    SubdomainDeletedEvent,
    TreasuryChangedEvent,
    TTLChangedEvent,
} from './events/ResolverEvents';

import {
    CONTENTHASH_TYPE_CIDv0,
    CONTENTHASH_TYPE_CIDv1,
    CONTENTHASH_TYPE_IPNS,
    CONTENTHASH_TYPE_SHA256,
    DEFAULT_DOMAIN_PRICE_SATS,
    DEFAULT_TTL,
    MAX_CONTENTHASH_LENGTH,
    MAX_DOMAIN_LENGTH,
    MAX_FULL_NAME_LENGTH,
    MAX_SUBDOMAIN_LENGTH,
    MAX_TTL,
    MIN_DOMAIN_LENGTH,
    MIN_TTL,
    PREMIUM_TIER_0_DOMAINS,
    PREMIUM_TIER_0_PRICE_SATS,
    PREMIUM_TIER_1_DOMAINS,
    PREMIUM_TIER_1_PRICE_SATS,
    PREMIUM_TIER_2_DOMAINS,
    PREMIUM_TIER_2_PRICE_SATS,
    PREMIUM_TIER_3_DOMAINS,
    PREMIUM_TIER_3_PRICE_SATS,
    PREMIUM_TIER_4_DOMAINS,
    PREMIUM_TIER_4_PRICE_SATS,
    PREMIUM_TIER_5_DOMAINS,
    PREMIUM_TIER_5_PRICE_SATS,
    PREMIUM_TIER_6_DOMAINS,
    RESERVED_DOMAIN,
} from './constants';

// =============================================================================
// Storage Pointer Allocation (Module Level - CRITICAL)
// =============================================================================

// Contract-level settings
const treasuryAddressPointer: u16 = Blockchain.nextPointer;
const domainPriceSatsPointer: u16 = Blockchain.nextPointer;

// Domain storage
const domainExistsPointer: u16 = Blockchain.nextPointer;
const domainOwnerPointer: u16 = Blockchain.nextPointer;
const domainCreatedPointer: u16 = Blockchain.nextPointer;
const domainTTLPointer: u16 = Blockchain.nextPointer;

// Domain transfer tracking
const domainPendingOwnerPointer: u16 = Blockchain.nextPointer;
const domainPendingTimestampPointer: u16 = Blockchain.nextPointer;

// Subdomain storage
const subdomainExistsPointer: u16 = Blockchain.nextPointer;
const subdomainOwnerPointer: u16 = Blockchain.nextPointer;
const subdomainParentPointer: u16 = Blockchain.nextPointer;
const subdomainTTLPointer: u16 = Blockchain.nextPointer;

// Contenthash storage
const contenthashTypePointer: u16 = Blockchain.nextPointer;
const contenthashDataPointer: u16 = Blockchain.nextPointer;
const contenthashStringPointer: u16 = Blockchain.nextPointer;

// =============================================================================
// Contract Implementation
// =============================================================================

@final
export class BtcNameResolver extends OP_NET {
    // -------------------------------------------------------------------------
    // Settings Storage
    // -------------------------------------------------------------------------
    private readonly treasuryAddress: StoredString;
    private readonly domainPriceSats: StoredMapU256;

    // -------------------------------------------------------------------------
    // Domain Storage Maps
    // -------------------------------------------------------------------------
    private readonly domainExists: StoredMapU256;
    private readonly domainOwner: StoredMapU256;
    private readonly domainCreated: StoredMapU256;
    private readonly domainTTL: StoredMapU256;
    private readonly domainPendingOwner: StoredMapU256;
    private readonly domainPendingTimestamp: StoredMapU256;

    // -------------------------------------------------------------------------
    // Subdomain Storage Maps
    // -------------------------------------------------------------------------
    private readonly subdomainExists: StoredMapU256;
    private readonly subdomainOwner: StoredMapU256;
    private readonly subdomainParent: StoredMapU256;
    private readonly subdomainTTL: StoredMapU256;

    // -------------------------------------------------------------------------
    // Contenthash Storage Maps
    // -------------------------------------------------------------------------
    private readonly contenthashType: StoredMapU256;
    private readonly contenthashData: StoredMapU256;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    public constructor() {
        super();

        // Initialize settings storage
        this.treasuryAddress = new StoredString(treasuryAddressPointer);
        this.domainPriceSats = new StoredMapU256(domainPriceSatsPointer);

        // Initialize domain storage
        this.domainExists = new StoredMapU256(domainExistsPointer);
        this.domainOwner = new StoredMapU256(domainOwnerPointer);
        this.domainCreated = new StoredMapU256(domainCreatedPointer);
        this.domainTTL = new StoredMapU256(domainTTLPointer);
        this.domainPendingOwner = new StoredMapU256(domainPendingOwnerPointer);
        this.domainPendingTimestamp = new StoredMapU256(domainPendingTimestampPointer);

        // Initialize subdomain storage
        this.subdomainExists = new StoredMapU256(subdomainExistsPointer);
        this.subdomainOwner = new StoredMapU256(subdomainOwnerPointer);
        this.subdomainParent = new StoredMapU256(subdomainParentPointer);
        this.subdomainTTL = new StoredMapU256(subdomainTTLPointer);

        // Initialize contenthash storage
        this.contenthashType = new StoredMapU256(contenthashTypePointer);
        this.contenthashData = new StoredMapU256(contenthashDataPointer);
    }

    // -------------------------------------------------------------------------
    // Deployment Initialization
    // -------------------------------------------------------------------------
    public override onDeployment(calldata: Calldata): void {
        // Read optional treasury address from calldata
        const treasuryAddr = calldata.readStringWithLength();
        if (treasuryAddr.length > 0) {
            this.treasuryAddress.value = treasuryAddr;
        } else {
            this.treasuryAddress.value = Blockchain.tx.origin.p2tr();
        }

        // Set default price
        this.domainPriceSats.set(u256.Zero, u256.fromU64(DEFAULT_DOMAIN_PRICE_SATS));

        // Reserve 'opnet.btc' for deployer
        const opnetDomainKey = this.getDomainKeyU256(RESERVED_DOMAIN);
        const blockNumber = Blockchain.block.number;
        const deployer = Blockchain.tx.origin;

        this.domainExists.set(opnetDomainKey, u256.One);
        this.domainOwner.set(opnetDomainKey, this._addressToU256(deployer));
        this.domainCreated.set(opnetDomainKey, u256.fromU64(blockNumber));
        this.domainTTL.set(opnetDomainKey, u256.fromU64(DEFAULT_TTL));

        this.emitEvent(new DomainRegisteredEvent(opnetDomainKey, deployer, blockNumber));
    }

    // =========================================================================
    // ADMIN METHODS (Owner Only)
    // =========================================================================

    /**
     * Set the treasury address for receiving payments.
     */
    @method({ name: 'treasuryAddress', type: ABIDataTypes.STRING })
    @emit('TreasuryChanged')
    public setTreasuryAddress(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const newAddress = calldata.readStringWithLength();
        if (newAddress.length == 0) {
            throw new Revert('Invalid treasury address');
        }

        this.validateBitcoinAddress(newAddress);

        const oldAddressHash = this.stringToU256Hash(this.treasuryAddress.value);
        const newAddressHash = this.stringToU256Hash(newAddress);

        this.treasuryAddress.value = newAddress;

        this.emitEvent(
            new TreasuryChangedEvent(oldAddressHash, newAddressHash, Blockchain.block.number),
        );

        return new BytesWriter(0);
    }

    /**
     * Set the base price for registering domains.
     */
    @method({ name: 'priceSats', type: ABIDataTypes.UINT64 })
    @emit('DomainPriceChanged')
    public setDomainPrice(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const newPrice = calldata.readU64();
        const oldPrice = this.domainPriceSats.get(u256.Zero).toU64();

        this.domainPriceSats.set(u256.Zero, u256.fromU64(newPrice));

        this.emitEvent(new DomainPriceChangedEvent(oldPrice, newPrice, Blockchain.block.number));

        return new BytesWriter(0);
    }

    // =========================================================================
    // DOMAIN REGISTRATION METHODS
    // =========================================================================

    /**
     * Register a new .btc domain.
     * @param calldata Contains domain name (without .btc suffix)
     */
    @method({ name: 'domainName', type: ABIDataTypes.STRING })
    @emit('DomainRegistered')
    public registerDomain(calldata: Calldata): BytesWriter {
        const domainName = calldata.readStringWithLength();

        // Validate domain name
        this.validateDomainName(domainName);

        // Check if reserved
        if (domainName == RESERVED_DOMAIN) {
            throw new Revert('Domain is reserved');
        }

        const domainKey = this.getDomainKeyU256(domainName);

        // Check if already exists
        if (!this.domainExists.get(domainKey).isZero()) {
            throw new Revert('Domain already exists');
        }

        // Calculate and verify payment (premium pricing for short domains)
        const price = this.calculateDomainPrice(domainName);
        this.verifyPayment(price);

        // Register domain
        const blockNumber = Blockchain.block.number;
        const sender = Blockchain.tx.sender;

        this.domainExists.set(domainKey, u256.One);
        this.domainOwner.set(domainKey, this._addressToU256(sender));
        this.domainCreated.set(domainKey, u256.fromU64(blockNumber));
        this.domainTTL.set(domainKey, u256.fromU64(DEFAULT_TTL));

        this.emitEvent(new DomainRegisteredEvent(domainKey, sender, blockNumber));

        return new BytesWriter(0);
    }

    // =========================================================================
    // DOMAIN TRANSFER METHODS (Two-Step)
    // =========================================================================

    /**
     * Initiate transfer of domain ownership.
     */
    @method(
... [TRUNCADO - 1352 linhas] ...
```

### `./OPWACoin/src/btc-resolver/constants.ts`
```ts
/**
 * OPNet BTC Name Resolver - Constants
 *
 * This file contains all constants used by the BTC Name Resolver contract.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// =============================================================================
// Contenthash Type Identifiers
// =============================================================================

/** CIDv0 (Qm... prefixed, base58btc, 46 chars) */
export const CONTENTHASH_TYPE_CIDv0: u8 = 1;

/** CIDv1 (bafy... prefixed, base32) */
export const CONTENTHASH_TYPE_CIDv1: u8 = 2;

/** IPNS identifier (k... prefixed, base36) */
export const CONTENTHASH_TYPE_IPNS: u8 = 3;

/** Raw SHA-256 hash (32 bytes, stored as u256) */
export const CONTENTHASH_TYPE_SHA256: u8 = 4;

// =============================================================================
// String Length Limits
// =============================================================================

/** Maximum length of a domain name (without .btc suffix) */
export const MAX_DOMAIN_LENGTH: u32 = 63;

/** Minimum length of a domain name (allowing 1-char premium domains) */
export const MIN_DOMAIN_LENGTH: u32 = 1;

/** Maximum length of a subdomain label */
export const MAX_SUBDOMAIN_LENGTH: u32 = 63;

/** Maximum length of a contenthash string (CID/IPNS) */
export const MAX_CONTENTHASH_LENGTH: u32 = 128;

/** Maximum total length of full name (subdomain.domain.btc) */
export const MAX_FULL_NAME_LENGTH: u32 = 253;

// =============================================================================
// TTL Defaults (in seconds)
// =============================================================================

/** Default TTL for domain records: 1 hour */
export const DEFAULT_TTL: u64 = 3600;

/** Minimum allowed TTL: 60 seconds */
export const MIN_TTL: u64 = 60;

/** Maximum allowed TTL: 1 week */
export const MAX_TTL: u64 = 604800;

// =============================================================================
// Pricing Tiers (in satoshis) - 1 BTC = 100,000,000 sats
// =============================================================================

/** Default price to register a domain: 100,000 sats (0.001 BTC) */
export const DEFAULT_DOMAIN_PRICE_SATS: u64 = 100_000;

/** Tier 0 - ULTRA LEGENDARY (10 BTC): The most iconic names in crypto history */
export const PREMIUM_TIER_0_PRICE_SATS: u64 = 1_000_000_000;

/** Tier 1 - LEGENDARY (1 BTC): 1-char domains + top crypto keywords */
export const PREMIUM_TIER_1_PRICE_SATS: u64 = 150_000_000;

/** Tier 2 - ULTRA PREMIUM (0.4 BTC): 2-char domains + elite crypto/brand keywords */
export const PREMIUM_TIER_2_PRICE_SATS: u64 = 40_000_000;

/** Tier 3 - PREMIUM (0.15 BTC): 3-char domains + high-value keywords */
export const PREMIUM_TIER_3_PRICE_SATS: u64 = 15_000_000;

/** Tier 4 - HIGH VALUE (0.05 BTC): 4-char domains + valuable keywords */
export const PREMIUM_TIER_4_PRICE_SATS: u64 = 5_000_000;

/** Tier 5 - STANDARD PREMIUM (0.01 BTC): 5-char domains + common keywords */
export const PREMIUM_TIER_5_PRICE_SATS: u64 = 1_000_000;

// =============================================================================
// Premium Domain Lists - TIER 0 (10 BTC - Ultra Legendary)
// =============================================================================

/**
 * Tier 0 Keywords - THE MOST ICONIC NAMES IN CRYPTO
 * Once-in-a-lifetime ultra-rare domains worth 10 BTC each
 */
export const PREMIUM_TIER_0_DOMAINS: string[] = [
    // ===== BITCOIN LEGENDS & HISTORY =====
    'satoshi',
    'nakamoto',
    'satoshinakamoto',
    'bitcoin',
    'btc',
    'xbt',
    'hal',
    'finney',
    'halfinney',
    'szabo',
    'nickszabo',
    'wei',
    'weidai',
    'cypherpunk',
    'cypherpunks',
    'whitepaper',
    'genesis',
    'genesisblock',
    'pizzaday',
    'laszlo',
    'silkroad',
    'mtgox',
    'gox',
    'hodl',
    'hodler',

    // ===== CORE CRYPTO CONCEPTS =====
    'crypto',
    'cryptocurrency',
    'cryptocurrencies',
    'blockchain',
    'blockchains',
    'defi',
    'decentralized',
    'decentralization',
    'web3',
    'web4',
    'dapp',
    'dapps',
    'metaverse',
    'metaverses',
    'nft',
    'nfts',
    'token',
    'tokens',
    'coin',
    'coins',
    'mining',
    'miner',
    'staking',
    'stake',
    'validator',
    'node',
    'nodes',
    'smart',
    'smartcontract',
    'smartcontracts',
    'protocol',
    'protocols',
    'layer1',
    'layer2',
    'l1',
    'l2',
    'rollup',
    'rollups',
    'bridge',
    'bridges',

    // ===== MONEY & FINANCE - ULTIMATE WORDS =====
    'money',
    'cash',
    'currency',
    'currencies',
    'fiat',
    'digital',
    'digitalmoney',
    'bank',
    'banks',
    'banking',
    'finance',
    'financial',
    'fintech',
    'gold',
    'silver',
    'platinum',
    'diamond',
    'diamonds',
    'treasure',
    'dollar',
    'dollars',
    'euro',
    'euros',
    'pound',
    'pounds',
    'yen',
    'yuan',
    'wealth',
    'wealthy',
    'rich',
    'riches',
    'fortune',
    'fortunes',
    'billionaire',
    'millionaire',
    'trillionaire',
    'capital',
    'assets',
    'portfolio',
    'wallet',
    'wallets',
    'vault',
    'vaults',
    'treasury',
    'reserve',
    'reserves',
    'payment',
    'payments',
    'pay',
    'transfer',
    'transfers',
    'send',
    'receive',

    // ===== TRADING & EXCHANGES - ALL MAJOR NAMES =====
    'exchange',
    'exchanges',
    'trade',
    'trades',
    'trading',
    'trader',
    'traders',
    'binance',
    'coinbase',
    'kraken',
    'ftx',
    'gemini',
    'bitfinex',
    'bitstamp',
    'huobi',
    'okx',
    'okex',
    'kucoin',
    'bybit',
    'bitget',
    'gate',
    'gateio',
    'deribit',
    'bitmex',
    'phemex',
    'mexc',
    'htx',
    'crypto',
    'cryptocom',
    'upbit',
    'bithumb',
    'bitflyer',
    'coincheck',
    'zaif',
    'korbit',
    'coinone',
    'poloniex',
    'bittrex',
    'cex',
    'cexio',
    'lbank',
    'bitpanda',
    'bitvavo',
    'robinhood',
    'etoro',
    'webull',
    'fidelity',
    'schwab',
    'vanguard',
    'dex',
    'cex',
    'swap',
    'swaps',
    'uniswap',
    'sushiswap',
    'pancakeswap',
    'spot',
    'futures',
    'options',
    'perpetual',
    'perpetuals',
    'leverage',

    // ===== GAMING & GAMBLING - BIG MONEY =====
    'casino',
    'casinos',
    'poker',
    'blackjack',
    'roulette',
    'slots',
    'slot',
    'bet',
    'bets',
    'betting',
    'gamble',
    'gambling',
    'gambler',
    'gamblers',
    'lottery',
    'lotto',
    'jackpot',
    'jackpots',
    'wager',
    'wagers',
    'odds',
... [TRUNCADO - 3902 linhas] ...
```

### `./OPWACoin/src/btc-resolver/events/ResolverEvents.ts`
```ts
/**
 * OPNet BTC Name Resolver - Event Definitions
 *
 * All events emitted by the BTC Name Resolver contract.
 * Events are used for indexing and tracking state changes.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    ADDRESS_BYTE_LENGTH,
    BytesWriter,
    NetEvent,
    U256_BYTE_LENGTH,
    U64_BYTE_LENGTH,
    U8_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

// =============================================================================
// Domain Events
// =============================================================================

/**
 * Emitted when a new domain is registered.
 * @param domainHash - SHA256 hash of the domain name
 * @param owner - Address of the domain owner
 * @param timestamp - Block number when registered
 */
@final
export class DomainRegisteredEvent extends NetEvent {
    constructor(domainHash: u256, owner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeU256(domainHash);
        data.writeAddress(owner);
        data.writeU64(timestamp);

        super('DomainRegistered', data);
    }
}

/**
 * Emitted when a domain transfer is initiated.
 * @param domainHash - SHA256 hash of the domain name
 * @param currentOwner - Address of the current owner
 * @param newOwner - Address of the pending new owner
 * @param timestamp - Block number when initiated
 */
@final
export class DomainTransferInitiatedEvent extends NetEvent {
    constructor(domainHash: u256, currentOwner: Address, newOwner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH * 2 + U64_BYTE_LENGTH,
        );
        data.writeU256(domainHash);
        data.writeAddress(currentOwner);
        data.writeAddress(newOwner);
        data.writeU64(timestamp);

        super('DomainTransferInitiated', data);
    }
}

/**
 * Emitted when a domain transfer is completed.
 * @param domainHash - SHA256 hash of the domain name
 * @param previousOwner - Address of the previous owner
 * @param newOwner - Address of the new owner
 * @param timestamp - Block number when completed
 */
@final
export class DomainTransferCompletedEvent extends NetEvent {
    constructor(domainHash: u256, previousOwner: Address, newOwner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH * 2 + U64_BYTE_LENGTH,
        );
        data.writeU256(domainHash);
        data.writeAddress(previousOwner);
        data.writeAddress(newOwner);
        data.writeU64(timestamp);

        super('DomainTransferCompleted', data);
    }
}

/**
 * Emitted when a domain transfer is cancelled.
 * @param domainHash - SHA256 hash of the domain name
 * @param owner - Address of the owner who cancelled
 * @param timestamp - Block number when cancelled
 */
@final
export class DomainTransferCancelledEvent extends NetEvent {
    constructor(domainHash: u256, owner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeU256(domainHash);
        data.writeAddress(owner);
        data.writeU64(timestamp);

        super('DomainTransferCancelled', data);
    }
}

// =============================================================================
// Subdomain Events
// =============================================================================

/**
 * Emitted when a subdomain is created.
 * @param parentDomainHash - SHA256 hash of the parent domain
 * @param subdomainHash - SHA256 hash of the full subdomain name
 * @param owner - Address of the subdomain owner
 * @param timestamp - Block number when created
 */
@final
export class SubdomainCreatedEvent extends NetEvent {
    constructor(parentDomainHash: u256, subdomainHash: u256, owner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH * 2 + ADDRESS_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeU256(parentDomainHash);
        data.writeU256(subdomainHash);
        data.writeAddress(owner);
        data.writeU64(timestamp);

        super('SubdomainCreated', data);
    }
}

/**
 * Emitted when a subdomain is deleted.
 * @param parentDomainHash - SHA256 hash of the parent domain
 * @param subdomainHash - SHA256 hash of the full subdomain name
 * @param timestamp - Block number when deleted
 */
@final
export class SubdomainDeletedEvent extends NetEvent {
    constructor(parentDomainHash: u256, subdomainHash: u256, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(U256_BYTE_LENGTH * 2 + U64_BYTE_LENGTH);
        data.writeU256(parentDomainHash);
        data.writeU256(subdomainHash);
        data.writeU64(timestamp);

        super('SubdomainDeleted', data);
    }
}

// =============================================================================
// Contenthash Events
// =============================================================================

/**
 * Emitted when contenthash is set or updated.
 * @param nameHash - SHA256 hash of the domain/subdomain name
 * @param contenthashType - Type of contenthash (1=CIDv0, 2=CIDv1, 3=IPNS, 4=SHA256)
 * @param timestamp - Block number when changed
 */
@final
export class ContenthashChangedEvent extends NetEvent {
    constructor(nameHash: u256, contenthashType: u8, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + U8_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeU256(nameHash);
        data.writeU8(contenthashType);
        data.writeU64(timestamp);

        super('ContenthashChanged', data);
    }
}

/**
 * Emitted when contenthash is cleared.
 * @param nameHash - SHA256 hash of the domain/subdomain name
 * @param timestamp - Block number when cleared
 */
@final
export class ContenthashClearedEvent extends NetEvent {
    constructor(nameHash: u256, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(U256_BYTE_LENGTH + U64_BYTE_LENGTH);
        data.writeU256(nameHash);
        data.writeU64(timestamp);

        super('ContenthashCleared', data);
    }
}

// =============================================================================
// TTL Events
// =============================================================================

/**
 * Emitted when TTL is changed for a name.
 * @param nameHash - SHA256 hash of the domain/subdomain name
 * @param oldTTL - Previous TTL value in seconds
 * @param newTTL - New TTL value in seconds
 * @param timestamp - Block number when changed
 */
@final
export class TTLChangedEvent extends NetEvent {
    constructor(nameHash: u256, oldTTL: u64, newTTL: u64, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(U256_BYTE_LENGTH + U64_BYTE_LENGTH * 3);
        data.writeU256(nameHash);
        data.writeU64(oldTTL);
        data.writeU64(newTTL);
        data.writeU64(timestamp);

        super('TTLChanged', data);
    }
}

// =============================================================================
// Admin Events
// =============================================================================

/**
 * Emitted when domain pricing is changed.
 * @param oldPrice - Previous price in satoshis
 * @param newPrice - New price in satoshis
 * @param timestamp - Block number when changed
 */
@final
export class DomainPriceChangedEvent extends NetEvent {
    constructor(oldPrice: u64, newPrice: u64, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(U64_BYTE_LENGTH * 3);
        data.writeU64(oldPrice);
        data.writeU64(newPrice);
        data.writeU64(timestamp);

        super('DomainPriceChanged', data);
    }
}

/**
 * Emitted when treasury address is changed.
 * @param previousAddressHash - Hash of the previous treasury address
 * @param newAddressHash - Hash of the new treasury address
 * @param timestamp - Block number when changed
 */
@final
export class TreasuryChangedEvent extends NetEvent {
    constructor(previousAddressHash: u256, newAddressHash: u256, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(U256_BYTE_LENGTH * 2 + U64_BYTE_LENGTH);
        data.writeU256(previousAddressHash);
        data.writeU256(newAddressHash);
        data.writeU64(timestamp);

        super('TreasuryChanged', data);
    }
}
```

### `./OPWACoin/src/btc-resolver/index.ts`
```ts
/**
 * OPNet BTC Name Resolver - Entry Point
 *
 * Decentralized domain name resolver for .btc domains.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Blockchain } from '@btc-vision/btc-runtime/runtime';
import { revertOnError } from '@btc-vision/btc-runtime/runtime/abort/abort';
import { BtcNameResolver } from './BtcNameResolver';

// DO NOT TOUCH THIS.
Blockchain.contract = (): BtcNameResolver => {
    // ONLY CHANGE THE CONTRACT CLASS NAME.
    // DO NOT ADD CUSTOM LOGIC HERE.
    return new BtcNameResolver();
};

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';

// VERY IMPORTANT
export function abort(message: string, fileName: string, line: u32, column: u32): void {
    revertOnError(message, fileName, line, column);
}
```

### `./OPWACoin/src/contracts/OPWAProperty.ts`
```ts
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    Blockchain,
    BytesWriter,
    Calldata,
    encodeSelector,
    OP20,
    OP20InitParameters,
    SafeMath,
    Selector,
} from '@btc-vision/btc-runtime/runtime';

const MINT_SELECTOR: u32 = encodeSelector('mint(address,uint256)');

@final
export class OPWAProperty extends OP20 {
    public constructor() {
        super();
    }

    public override onDeployment(_calldata: Calldata): void {
        const maxSupply: u256 = u256.fromString('100000000000000000');
        this.instantiate(new OP20InitParameters(maxSupply, 8, 'OPWA Property', 'OPWAP'));
    }

    public override execute(method: Selector, calldata: Calldata): BytesWriter {
        switch (method) {
            case MINT_SELECTOR:
                return this.publicMint(calldata);
            default:
                return super.execute(method, calldata);
        }
    }

    private publicMint(calldata: Calldata): BytesWriter {
        const to: Address = calldata.readAddress();
        const amount: u256 = calldata.readU256();
        const maxSupply: u256 = u256.fromString('100000000000000000');
        const newSupply: u256 = SafeMath.add(this._totalSupply.value, amount);
        assert(u256.le(newSupply, maxSupply), 'Max supply exceeded');
        this._mint(to, amount);
        const writer = new BytesWriter(1);
        writer.writeBoolean(true);
        return writer;
    }
}
```

### `./OPWACoin/src/contracts/index.ts`
```ts
import { Blockchain } from '@btc-vision/btc-runtime/runtime';
import { revertOnError } from '@btc-vision/btc-runtime/runtime/abort/abort';
import { OPWAProperty } from './OPWAProperty';

Blockchain.contract = () => {
    return new OPWAProperty();
};

export * from '@btc-vision/btc-runtime/runtime/exports';

export function abort(message: string, fileName: string, line: u32, column: u32): void {
    revertOnError(message, fileName, line, column);
}
```

### `./OPWACoin/src/multi-oracle-stablecoin/MyMultiOracleStable.ts`
```ts
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    AddressMemoryMap,
    Blockchain,
    BytesWriter,
    Calldata,
    EMPTY_POINTER,
    OP20InitParameters,
    OP20S,
    Revert,
    SafeMath,
    StoredU256,
} from '@btc-vision/btc-runtime/runtime';
import {
    OracleAddedEvent,
    OracleRemovedEvent,
    PriceAggregatedEvent,
    PriceSubmittedEvent,
} from '../shared-events/OracleEvents';

const oracleCountPointer: u16 = Blockchain.nextPointer;
const minOraclesPointer: u16 = Blockchain.nextPointer;
const maxDeviationPointer: u16 = Blockchain.nextPointer;
const submissionWindowPointer: u16 = Blockchain.nextPointer;
const oracleSubmissionsPointer: u16 = Blockchain.nextPointer;
const oracleTimestampsPointer: u16 = Blockchain.nextPointer;
const oracleActivePointer: u16 = Blockchain.nextPointer;
const adminPointer: u16 = Blockchain.nextPointer;

@final
export class MultiOracleStablecoin extends OP20S {
    private readonly _oracleCount: StoredU256;
    private readonly _minOracles: StoredU256;
    private readonly _maxDeviation: StoredU256;
    private readonly _submissionWindow: StoredU256;
    private readonly _oracleSubmissions: AddressMemoryMap;
    private readonly _oracleTimestamps: AddressMemoryMap;
    private readonly _oracleActive: AddressMemoryMap;
    private readonly _adminMap: AddressMemoryMap;

    public constructor() {
        super();
        this._oracleCount = new StoredU256(oracleCountPointer, EMPTY_POINTER);
        this._minOracles = new StoredU256(minOraclesPointer, EMPTY_POINTER);
        this._maxDeviation = new StoredU256(maxDeviationPointer, EMPTY_POINTER);
        this._submissionWindow = new StoredU256(submissionWindowPointer, EMPTY_POINTER);
        this._oracleSubmissions = new AddressMemoryMap(oracleSubmissionsPointer);
        this._oracleTimestamps = new AddressMemoryMap(oracleTimestampsPointer);
        this._oracleActive = new AddressMemoryMap(oracleActivePointer);
        this._adminMap = new AddressMemoryMap(adminPointer);
    }

    public override onDeployment(calldata: Calldata): void {
        const admin = calldata.readAddress();
        const initialRate = calldata.readU256();
        const minOracles = calldata.readU64();
        const maxDeviation = calldata.readU64();
        const submissionWindow = calldata.readU64();

        if (admin.equals(Address.zero())) {
            throw new Revert('Invalid admin');
        }

        if (initialRate.isZero()) {
            throw new Revert('Invalid initial rate');
        }

        if (minOracles == 0) {
            throw new Revert('Invalid min oracles');
        }

        if (maxDeviation == 0 || maxDeviation > 1000) {
            throw new Revert('Invalid max deviation');
        }

        if (submissionWindow == 0) {
            throw new Revert('Invalid submission window');
        }

        const maxSupply: u256 = u256.Max;
        const decimals: u8 = 8;
        const name: string = 'USD Stablecoin';
        const symbol: string = 'opUSD';

        this.instantiate(new OP20InitParameters(maxSupply, decimals, name, symbol));
        this.initializePeg(admin, initialRate, submissionWindow * 2);

        this._setAdmin(admin);
        this._minOracles.value = u256.fromU64(minOracles);
        this._maxDeviation.value = u256.fromU64(maxDeviation);
        this._submissionWindow.value = u256.fromU64(submissionWindow);
    }

    @method({ name: 'oracle', type: ABIDataTypes.ADDRESS })
    @emit('OracleAdded')
    public addOracle(calldata: Calldata): BytesWriter {
        this._onlyAdmin();

        const oracle = calldata.readAddress();
        if (oracle.equals(Address.zero())) {
            throw new Revert('Invalid oracle');
        }

        const alreadyActive = this._oracleActive.get(oracle);
        if (!alreadyActive.isZero()) {
            throw new Revert('Oracle exists');
        }

        this._oracleActive.set(oracle, u256.One);
        this._oracleCount.value = SafeMath.add(this._oracleCount.value, u256.One);

        this.emitEvent(new OracleAddedEvent(oracle, Blockchain.tx.sender));

        return new BytesWriter(0);
    }

    @method({ name: 'oracle', type: ABIDataTypes.ADDRESS })
    @emit('OracleRemoved')
    public removeOracle(calldata: Calldata): BytesWriter {
        this._onlyAdmin();

        const oracle = calldata.readAddress();
        const active = this._oracleActive.get(oracle);
        if (active.isZero()) {
            throw new Revert('Oracle not active');
        }

        this._oracleActive.set(oracle, u256.Zero);
        this._oracleCount.value = SafeMath.sub(this._oracleCount.value, u256.One);

        this.emitEvent(new OracleRemovedEvent(oracle, Blockchain.tx.sender));

        return new BytesWriter(0);
    }

    @method({ name: 'price', type: ABIDataTypes.UINT256 })
    @emit('PriceSubmitted')
    public submitPrice(calldata: Calldata): BytesWriter {
        const sender = Blockchain.tx.sender;
        const active = this._oracleActive.get(sender);
        if (active.isZero()) {
            throw new Revert('Not an oracle');
        }

        const price = calldata.readU256();
        if (price.isZero()) {
            throw new Revert('Invalid price');
        }

        const blockNumber = Blockchain.block.number;

        this._oracleSubmissions.set(sender, price);
        this._oracleTimestamps.set(sender, u256.fromU64(blockNumber));

        this.emitEvent(new PriceSubmittedEvent(sender, price, blockNumber));

        return new BytesWriter(0);
    }

    @method({ name: 'oracles', type: ABIDataTypes.ARRAY_OF_ADDRESSES })
    @emit('PriceAggregated')
    public aggregatePrice(calldata: Calldata): BytesWriter {
        const oracleCount = calldata.readU32();
        if (u256.fromU32(oracleCount) < this._minOracles.value) {
            throw new Revert('Not enough oracles');
        }

        const currentBlock = Blockchain.block.number;
        const window = this._submissionWindow.value.toU64();
        const maxDev = this._maxDeviation.value;

        const prices = new Array<u256>();

        for (let i: u32 = 0; i < oracleCount; i++) {
            const oracle = calldata.readAddress();

            const active = this._oracleActive.get(oracle);
            if (active.isZero()) continue;

            const timestamp = this._oracleTimestamps.get(oracle).toU64();
            if (currentBlock > timestamp + window) continue;

            const price = this._oracleSubmissions.get(oracle);
            if (price.isZero()) continue;

            prices.push(price);
        }

        const validCount: u32 = <u32>prices.length;

        if (u256.fromU32(validCount) < this._minOracles.value) {
            throw new Revert('Insufficient valid submissions');
        }

        for (let i = 0; i < prices.length - 1; i++) {
            for (let j = 0; j < prices.length - i - 1; j++) {
                if (prices[j] > prices[j + 1]) {
                    const temp = prices[j];
                    prices[j] = prices[j + 1];
                    prices[j + 1] = temp;
                }
            }
        }

        const median = prices[prices.length / 2];

        const basisPoints = u256.fromU64(10000);
        for (let i = 0; i < prices.length; i++) {
            const price = prices[i];
            let deviation: u256;
            if (price > median) {
                deviation = SafeMath.div(
                    SafeMath.mul(SafeMath.sub(price, median), basisPoints),
                    median,
                );
            } else {
                deviation = SafeMath.div(
                    SafeMath.mul(SafeMath.sub(median, price), basisPoints),
                    median,
                );
            }

            if (deviation > maxDev) {
                throw new Revert('Deviation too high');
            }
        }

        this._pegRate.value = median;
        this._pegUpdatedAt.value = u256.fromU64(currentBlock);

        this.emitEvent(new PriceAggregatedEvent(median, validCount, currentBlock));

        return new BytesWriter(0);
    }

    @method(
        { name: 'to', type: ABIDataTypes.ADDRESS },
        { name: 'amount', type: ABIDataTypes.UINT256 },
    )
    @emit('Minted')
    public mint(calldata: Calldata): BytesWriter {
        this._onlyAdmin();

        const to = calldata.readAddress();
        const amount = calldata.readU256();

        if (to.equals(Address.zero())) {
            throw new Revert('Invalid recipient');
        }
        if (amount.isZero()) {
            throw new Revert('Amount is zero');
        }

        this._mint(to, amount);

        return new BytesWriter(0);
    }

    @method()
    @returns({ name: 'count', type: ABIDataTypes.UINT256 })
    public oracleCount(_: Calldata): BytesWriter {
        const w = new BytesWriter(32);
        w.writeU256(this._oracleCount.value);
        return w;
    }

    @method()
    @returns({ name: 'min', type: ABIDataTypes.UINT256 })
    public minOracles(_: Calldata): BytesWriter {
        const w = new BytesWriter(32);
        w.writeU256(this._minOracles.value);
        return w;
    }

    @method({ name: 'oracle', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'active', type: ABIDataTypes.BOOL })
    public isOracleActive(calldata: Calldata): BytesWriter {
        const oracle = calldata.readAddress();
        const w = new BytesWriter(1);
        w.writeBoolean(!this._oracleActive.get(oracle).isZero());
        return w;
    }

    @method({ name: 'oracle', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'price', type: ABIDataTypes.UINT256 })
    public oracleSubmission(calldata: Calldata): BytesWriter {
        const oracle = calldata.readAddress();
        const w = new BytesWriter(32);
        w.writeU256(this._oracleSubmissions.get(oracle));
        return w;
    }

    @method()
    @returns({ name: 'admin', type: ABIDataTypes.ADDRESS })
    public admin(_: Calldata): BytesWriter {
        const w = new BytesWriter(32);
        w.writeAddress(this._getAdmin());
        return w;
    }
... [TRUNCADO - 317 linhas] ...
```

### `./OPWACoin/src/multi-oracle-stablecoin/index.ts`
```ts
import { Blockchain } from '@btc-vision/btc-runtime/runtime';
import { revertOnError } from '@btc-vision/btc-runtime/runtime/abort/abort';
import { MultiOracleStablecoin } from './MyMultiOracleStable';

// DO NOT TOUCH TO THIS.
Blockchain.contract = () => {
    // ONLY CHANGE THE CONTRACT CLASS NAME.
    // DO NOT ADD CUSTOM LOGIC HERE.

    return new MultiOracleStablecoin();
};

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';

// VERY IMPORTANT
export function abort(message: string, fileName: string, line: u32, column: u32): void {
    revertOnError(message, fileName, line, column);
}
```

### `./OPWACoin/src/nft/MyNFT.ts`
```ts
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    Blockchain,
    BytesWriter,
    Calldata,
    EMPTY_POINTER,
    OP721,
    OP721InitParameters,
    Potential,
    Revert,
    SafeMath,
    StoredBoolean,
    StoredMapU256,
    StoredString,
    StoredU256,
    StoredU64Array,
    TransactionOutput,
    U256_BYTE_LENGTH,
    U32_BYTE_LENGTH,
    U64_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';
import {
    MintStatusChangedEvent,
    ReservationClaimedEvent,
    ReservationCreatedEvent,
    ReservationExpiredEvent,
} from './events/Reserved';

@final
class PurgeResult {
    constructor(
        public totalPurged: u256,
        public blocksProcessed: u32,
    ) {}
}

const treasuryAddressPointer: u16 = Blockchain.nextPointer;
const reservationBlockPointer: u16 = Blockchain.nextPointer;
const reservationAmountPointer: u16 = Blockchain.nextPointer;
const blockReservedAmountPointer: u16 = Blockchain.nextPointer;
const totalActiveReservedPointer: u16 = Blockchain.nextPointer;
const blocksWithReservationsPointer: u16 = Blockchain.nextPointer;
const mintEnabledPointer: u16 = Blockchain.nextPointer;

@final
export class MyNFT extends OP721 {
    // Constants
    private static readonly MINT_PRICE: u64 = 100000; // 0.001 BTC per NFT
    private static readonly RESERVATION_FEE_PERCENT: u64 = 15; // 15% upfront
    private static readonly MIN_RESERVATION_FEE: u64 = 1000; // Minimum 1000 sats
    private static readonly RESERVATION_BLOCKS: u64 = 5; // 5 blocks to pay
    private static readonly GRACE_BLOCKS: u64 = 1; // 1 block grace period
    private static readonly MAX_RESERVATION_AMOUNT: u32 = 20; // Max per reservation
    private static readonly MAX_BLOCKS_TO_PURGE: u32 = 10; // Max blocks per purge

    private readonly treasuryAddress: StoredString;
    private readonly mintEnabled: StoredBoolean;

    // User reservations
    private userReservationBlock: StoredMapU256; // address -> block number when reserved
    private userReservationAmount: StoredMapU256; // address -> amount reserved

    // Block tracking
    private blockReservedAmount: StoredMapU256; // block number -> total reserved in that block
    private totalActiveReserved: StoredU256; // Global active reservations counter

    public constructor() {
        super();

        this.userReservationBlock = new StoredMapU256(reservationBlockPointer);
        this.userReservationAmount = new StoredMapU256(reservationAmountPointer);
        this.blockReservedAmount = new StoredMapU256(blockReservedAmountPointer);
        this.totalActiveReserved = new StoredU256(totalActiveReservedPointer, EMPTY_POINTER);

        this.treasuryAddress = new StoredString(treasuryAddressPointer);
        this.mintEnabled = new StoredBoolean(mintEnabledPointer, false);
    }

    private _blocksWithReservations: Potential<StoredU64Array> = null; // Sorted list of blocks with reservations

    public get blocksWithReservations(): StoredU64Array {
        if (this._blocksWithReservations === null) {
            this._blocksWithReservations = new StoredU64Array(
                blocksWithReservationsPointer,
                EMPTY_POINTER,
            );
        }

        return this._blocksWithReservations as StoredU64Array;
    }

    public override onDeployment(_calldata: Calldata): void {
        const maxSupply: u256 = u256.fromU32(10000);

        // Validate max supply against current state
        if (this._totalSupply.value >= maxSupply) {
            throw new Revert('Max supply already reached');
        }

        const name: string = 'Cool NFT';
        const symbol: string = 'O_o';

        const baseURI: string = '';

        // Should be 1500x500-1500x300
        const collectionBanner: string =
            'https://raw.githubusercontent.com/btc-vision/contract-logo/refs/heads/main/nft/demo_banner.jpg';

        const collectionIcon: string =
            'https://raw.githubusercontent.com/btc-vision/contract-logo/refs/heads/main/nft/icon.png';

        const collectionWebsite: string = 'https://example.com';
        const collectionDescription: string = 'This NFT collection is awesome! 😎';

        this.instantiate(
            new OP721InitParameters(
                name,
                symbol,
                baseURI,
                maxSupply,
                collectionBanner,
                collectionIcon,
                collectionWebsite,
                collectionDescription,
            ),
        );

        this.treasuryAddress.value = Blockchain.tx.origin.p2tr();
        this.mintEnabled.value = false; // Start with minting disabled
    }

    @method({ name: 'enabled', type: ABIDataTypes.BOOL })
    @emit('MintStatusChanged')
    public setMintEnabled(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const enabled: boolean = calldata.readBoolean();
        this.mintEnabled.value = enabled;

        // Emit event for transparency
        this.emitEvent(new MintStatusChangedEvent(enabled));

        return new BytesWriter(0);
    }

    @method()
    @returns({ name: 'enabled', type: ABIDataTypes.BOOL })
    public isMintEnabled(_: Calldata): BytesWriter {
        const response: BytesWriter = new BytesWriter(1);
        response.writeBoolean(<boolean>this.mintEnabled.value);
        return response;
    }

    @method(
        {
            name: 'addresses',
            type: ABIDataTypes.ARRAY_OF_ADDRESSES,
        },
        {
            name: 'amounts',
            type: ABIDataTypes.ARRAY_OF_UINT8,
        },
    )
    @emit('Transferred')
    public airdrop(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const addresses: Address[] = calldata.readAddressArray();
        const amounts: u8[] = calldata.readU8Array();

        if (addresses.length !== amounts.length || addresses.length === 0) {
            throw new Revert('Mismatched or empty arrays');
        }

        let totalToMint: u32 = 0;

        const addressLength: u32 = u32(addresses.length);
        for (let i: u32 = 0; i < addressLength; i++) {
            totalToMint += amounts[i];
        }

        if (totalToMint === 0) {
            throw new Revert('Total mint amount is zero');
        }

        // Check supply availability
        const currentSupply: u256 = this._totalSupply.value;
        const available: u256 = SafeMath.sub(
            this.maxSupply,
            SafeMath.add(currentSupply, this.totalActiveReserved.value),
        );

        if (u256.fromU32(totalToMint) > available) {
            throw new Revert('Insufficient supply available');
        }

        // Mint NFTs
        const startTokenId: u256 = this._nextTokenId.value;
        let mintedSoFar: u32 = 0;

        for (let i: u32 = 0; i < addressLength; i++) {
            const addr: Address = addresses[i];
            const amount: u32 = amounts[i];

            if (amount === 0) continue;

            for (let j: u32 = 0; j < amount; j++) {
                const tokenId: u256 = SafeMath.add(startTokenId, u256.fromU32(mintedSoFar));
                this._mint(addr, tokenId);
                mintedSoFar++;
            }
        }

        this._nextTokenId.value = SafeMath.add(startTokenId, u256.fromU32(mintedSoFar));

        return new BytesWriter(0);
    }

    /**
     * @notice Reserve NFTs by paying 15% upfront fee (minimum 1000 sats total)
     * @dev Reservations expire after RESERVATION_BLOCKS + GRACE_BLOCKS (6 blocks total)
     * @param calldata
     */
    @method({
        name: 'quantity',
        type: ABIDataTypes.UINT256,
    })
    @emit('ReservationCreated')
    @returns(
        { name: 'remainingPayment', type: ABIDataTypes.UINT64 },
        { name: 'reservationBlock', type: ABIDataTypes.UINT64 },
    )
    public reserve(calldata: Calldata): BytesWriter {
        // Check if minting is enabled
        if (!this.mintEnabled.value) {
            throw new Revert('Minting is disabled');
        }

        // Auto-purge expired reservations first
        this.autoPurgeExpired();

        const quantity: u256 = calldata.readU256();
        const sender: Address = Blockchain.tx.sender;

        if (quantity.isZero() || quantity > u256.fromU32(MyNFT.MAX_RESERVATION_AMOUNT)) {
            throw new Revert('Invalid quantity: 1-20 only');
        }

        const senderKey: u256 = this._u256FromAddress(sender);

        // Check if user has existing reservation (expired or not)
        const existingBlock: u256 = this.userReservationBlock.get(senderKey);

        if (!existingBlock.isZero()) {
            const currentBlock: u64 = Blockchain.block.number;
            const totalExpiry: u64 = SafeMath.add64(
                SafeMath.add64(existingBlock.toU64(), MyNFT.RESERVATION_BLOCKS),
                MyNFT.GRACE_BLOCKS,
            );

            if (currentBlock <= totalExpiry) {
                throw new Revert('Active reservation exists');
            }
            // If expired, we just overwrite it below - no cleanup
        }

        const qty: u64 = quantity.toU64();
        const totalCost: u64 = SafeMath.mul64(MyNFT.MINT_PRICE, qty);
        const calculatedFee: u64 = SafeMath.div64(
            SafeMath.mul64(totalCost, MyNFT.RESERVATION_FEE_PERCENT),
            100,
        );

        // Apply minimum fee of 1000 sats
        const reservationFee: u64 =
            calculatedFee < MyNFT.MIN_RESERVATION_FEE ? MyNFT.MIN_RESERVATION_FEE : calculatedFee;

        // Validate payment
        if (!this.validatePayment(reservationFee)) {
            throw new Revert('Insufficient reservation fee');
        }

        // Check supply availability
        const currentSupply: u256 = this._totalSupply.value;
        const available: u256 = SafeMath.sub(
            this.maxSupply,
            SafeMath.add(currentSupply, this.totalActiveReserved.value),
        );

        if (quantity > available) {
            throw new Revert('Insufficient supply available');
        }

        // Store reservation (overwrite any expired data)
        const currentBlock: u256 = u256.fromU64(Blockchain.block.number);
        this.userReservationBlock.set(senderKey, currentBlock);
        this.userReservationAmount.set(senderKey, quantity);

        // Update block reserved amount
... [TRUNCADO - 545 linhas] ...
```

### `./OPWACoin/src/nft/events/Reserved.ts`
```ts
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    ADDRESS_BYTE_LENGTH,
    BOOLEAN_BYTE_LENGTH,
    BytesWriter,
    NetEvent,
    U256_BYTE_LENGTH,
    U64_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

@final
export class ReservationCreatedEvent extends NetEvent {
    constructor(user: Address, amount: u256, block: u64, feePaid: u64) {
        const eventData: BytesWriter = new BytesWriter(
            ADDRESS_BYTE_LENGTH + U256_BYTE_LENGTH + U64_BYTE_LENGTH * 2,
        );
        eventData.writeAddress(user);
        eventData.writeU256(amount);
        eventData.writeU64(block);
        eventData.writeU64(feePaid);

        super('ReservationCreated', eventData);
    }
}

@final
export class ReservationClaimedEvent extends NetEvent {
    constructor(user: Address, amount: u256, firstTokenId: u256) {
        const eventData: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH + U256_BYTE_LENGTH * 2);
        eventData.writeAddress(user);
        eventData.writeU256(amount);
        eventData.writeU256(firstTokenId);

        super('ReservationClaimed', eventData);
    }
}

@final
export class ReservationExpiredEvent extends NetEvent {
    constructor(block: u64, amountRecovered: u256) {
        const eventData: BytesWriter = new BytesWriter(U64_BYTE_LENGTH + U256_BYTE_LENGTH);
        eventData.writeU64(block);
        eventData.writeU256(amountRecovered);

        super('ReservationExpired', eventData);
    }
}

@final
export class MintStatusChangedEvent extends NetEvent {
    constructor(enabled: boolean) {
        const eventData = new BytesWriter(BOOLEAN_BYTE_LENGTH);
        eventData.writeBoolean(enabled);

        super('MintStatusChanged', eventData);
    }
}
```

### `./OPWACoin/src/nft/index.ts`
```ts
import { Blockchain } from '@btc-vision/btc-runtime/runtime';
import { revertOnError } from '@btc-vision/btc-runtime/runtime/abort/abort';
import { MyNFT } from './MyNFT';

// DO NOT TOUCH TO THIS.
Blockchain.contract = () => {
    // ONLY CHANGE THE CONTRACT CLASS NAME.
    // DO NOT ADD CUSTOM LOGIC HERE.

    return new MyNFT();
};

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';

// VERY IMPORTANT
export function abort(message: string, fileName: string, line: u32, column: u32): void {
    revertOnError(message, fileName, line, column);
}
```

### `./OPWACoin/src/pegged-token/MyPeggedToken.ts`
```ts
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    AddressMemoryMap,
    Blockchain,
    BytesWriter,
    Calldata,
    OP20InitParameters,
    OP20S,
    Revert,
} from '@btc-vision/btc-runtime/runtime';
import { CustodianChangedEvent } from '../shared-events/OracleEvents';

const custodianPointer: u16 = Blockchain.nextPointer;
const pendingCustodianPointer: u16 = Blockchain.nextPointer;

@final
export class MyPeggedToken extends OP20S {
    private readonly _custodianMap: AddressMemoryMap;
    private readonly _pendingCustodianMap: AddressMemoryMap;

    public constructor() {
        super();
        this._custodianMap = new AddressMemoryMap(custodianPointer);
        this._pendingCustodianMap = new AddressMemoryMap(pendingCustodianPointer);
    }

    public override onDeployment(calldata: Calldata): void {
        const custodian = calldata.readAddress();

        if (custodian.equals(Address.zero())) {
            throw new Revert('Invalid custodian');
        }

        const maxSupply: u256 = u256.fromU64(2100000000000000);
        const decimals: u8 = 8;
        const name: string = 'Wrapped BTC';
        const symbol: string = 'WBTC';

        this.instantiate(new OP20InitParameters(maxSupply, decimals, name, symbol));
        this.initializePeg(custodian, u256.One, u64.MAX_VALUE);

        this._setCustodian(custodian);

        this.emitEvent(new CustodianChangedEvent(Address.zero(), custodian));
    }

    @method(
        { name: 'to', type: ABIDataTypes.ADDRESS },
        { name: 'amount', type: ABIDataTypes.UINT256 },
    )
    @emit('Minted')
    public mint(calldata: Calldata): BytesWriter {
        this._onlyCustodian();

        const to = calldata.readAddress();
        const amount = calldata.readU256();

        if (to.equals(Address.zero())) {
            throw new Revert('Invalid recipient');
        }
        if (amount.isZero()) {
            throw new Revert('Amount is zero');
        }

        this._mint(to, amount);

        return new BytesWriter(0);
    }

    @method(
        { name: 'from', type: ABIDataTypes.ADDRESS },
        { name: 'amount', type: ABIDataTypes.UINT256 },
    )
    @emit('Burned')
    public burnFrom(calldata: Calldata): BytesWriter {
        this._onlyCustodian();

        const from = calldata.readAddress();
        const amount = calldata.readU256();

        if (from.equals(Address.zero())) {
            throw new Revert('Invalid address');
        }

        const balance = this._balanceOf(from);
        if (balance < amount) {
            throw new Revert('Insufficient balance');
        }

        this._burn(from, amount);

        return new BytesWriter(0);
    }

    @method({ name: 'newCustodian', type: ABIDataTypes.ADDRESS })
    public transferCustodian(calldata: Calldata): BytesWriter {
        this._onlyCustodian();

        const newCustodian = calldata.readAddress();
        if (newCustodian.equals(Address.zero())) {
            throw new Revert('Invalid new custodian');
        }

        this._setPendingCustodian(newCustodian);

        return new BytesWriter(0);
    }

    @method()
    @emit('CustodianChanged')
    public acceptCustodian(_: Calldata): BytesWriter {
        const pending = this._getPendingCustodian();
        if (pending.equals(Address.zero())) {
            throw new Revert('No pending custodian');
        }
        if (!Blockchain.tx.sender.equals(pending)) {
            throw new Revert('Not pending custodian');
        }

        const previousCustodian = this._getCustodian();
        this._setCustodian(pending);
        this._setPendingCustodian(Address.zero());

        this.emitEvent(new CustodianChangedEvent(previousCustodian, pending));

        return new BytesWriter(0);
    }

    @method()
    @returns({ name: 'custodian', type: ABIDataTypes.ADDRESS })
    public custodian(_: Calldata): BytesWriter {
        const w = new BytesWriter(32);
        w.writeAddress(this._getCustodian());
        return w;
    }

    @method()
    @returns({ name: 'pendingCustodian', type: ABIDataTypes.ADDRESS })
    public pendingCustodian(_: Calldata): BytesWriter {
        const w = new BytesWriter(32);
        w.writeAddress(this._getPendingCustodian());
        return w;
    }

    private _getCustodian(): Address {
        const stored = this._custodianMap.get(Address.zero());
        if (stored.isZero()) return Address.zero();
        return this._u256ToAddress(stored);
    }

    private _setCustodian(addr: Address): void {
        this._custodianMap.set(Address.zero(), this._addressToU256(addr));
    }

    private _getPendingCustodian(): Address {
        const stored = this._pendingCustodianMap.get(Address.zero());
        if (stored.isZero()) return Address.zero();
        return this._u256ToAddress(stored);
    }

    private _setPendingCustodian(addr: Address): void {
        this._pendingCustodianMap.set(Address.zero(), this._addressToU256(addr));
    }

    private _onlyCustodian(): void {
        if (!Blockchain.tx.sender.equals(this._getCustodian())) {
            throw new Revert('Not custodian');
        }
    }
}
```

### `./OPWACoin/src/pegged-token/index.ts`
```ts
import { Blockchain } from '@btc-vision/btc-runtime/runtime';
import { revertOnError } from '@btc-vision/btc-runtime/runtime/abort/abort';
import { MyPeggedToken } from './MyPeggedToken';

// DO NOT TOUCH TO THIS.
Blockchain.contract = () => {
    // ONLY CHANGE THE CONTRACT CLASS NAME.
    // DO NOT ADD CUSTOM LOGIC HERE.

    return new MyPeggedToken();
};

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';

// VERY IMPORTANT
export function abort(message: string, fileName: string, line: u32, column: u32): void {
    revertOnError(message, fileName, line, column);
}
```

### `./OPWACoin/src/registry/PackageRegistry.ts`
```ts
/**
 * OPNet Package Registry Smart Contract
 *
 * A decentralized package registry for OPNet plugins. Manages:
 * - Package ownership (tied to MLDSA public key hash)
 * - Scoped packages (@scope/package-name)
 * - Version metadata with IPFS storage
 * - 72-hour mutability window for deprecation
 * - Two-step ownership transfers
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    Blockchain,
    BytesWriter,
    Calldata,
    OP_NET,
    Revert,
    SafeMath,
    StoredString,
} from '@btc-vision/btc-runtime/runtime';
import { StoredMapU256 } from '@btc-vision/btc-runtime/runtime/storage/maps/StoredMapU256';
import { AdvancedStoredString } from '@btc-vision/btc-runtime/runtime/storage/AdvancedStoredString';

import {
    PackagePriceChangedEvent,
    PackageRegisteredEvent,
    PackageTransferCancelledEvent,
    PackageTransferCompletedEvent,
    PackageTransferInitiatedEvent,
    ScopePriceChangedEvent,
    ScopeRegisteredEvent,
    ScopeTransferCancelledEvent,
    ScopeTransferCompletedEvent,
    ScopeTransferInitiatedEvent,
    TreasuryAddressChangedEvent,
    VersionDeprecatedEvent,
    VersionPublishedEvent,
    VersionUndeprecatedEvent,
} from './events/RegistryEvents';

import {
    MLDSA44_SIGNATURE_LEN,
    MLDSA65_SIGNATURE_LEN,
    MLDSA87_SIGNATURE_LEN,
} from '@btc-vision/btc-runtime/runtime/env/consensus/MLDSAMetadata';

import {
    DEFAULT_PACKAGE_PRICE_SATS,
    DEFAULT_SCOPE_PRICE_SATS,
    MAX_CID_LENGTH,
    MAX_NAME_LENGTH,
    MAX_OPNET_RANGE_LENGTH,
    MAX_REASON_LENGTH,
    MAX_SCOPE_LENGTH,
    MAX_VERSION_LENGTH,
    MUTABILITY_WINDOW_BLOCKS,
    RESERVED_SCOPE,
} from './constants';

// =============================================================================
// Storage Pointer Allocation (Module Level - CRITICAL)
// =============================================================================

// Contract-level settings
const treasuryAddressPointer: u16 = Blockchain.nextPointer;
const scopePriceSatsPointer: u16 = Blockchain.nextPointer;
const packagePriceSatsPointer: u16 = Blockchain.nextPointer;

// Scope storage
const scopeExistsPointer: u16 = Blockchain.nextPointer;
const scopeOwnerPointer: u16 = Blockchain.nextPointer;
const scopeCreatedPointer: u16 = Blockchain.nextPointer;

// Scope transfer tracking
const scopePendingOwnerPointer: u16 = Blockchain.nextPointer;
const scopePendingTimestampPointer: u16 = Blockchain.nextPointer;

// Package-level storage
const packageExistsPointer: u16 = Blockchain.nextPointer;
const packageOwnerPointer: u16 = Blockchain.nextPointer;
const packageCreatedPointer: u16 = Blockchain.nextPointer;
const packageVersionCountPointer: u16 = Blockchain.nextPointer;
const packageLatestVersionPointer: u16 = Blockchain.nextPointer;

// Package transfer tracking
const pkgPendingOwnerPointer: u16 = Blockchain.nextPointer;
const pkgPendingTimestampPointer: u16 = Blockchain.nextPointer;

// Version-level storage
const versionExistsPointer: u16 = Blockchain.nextPointer;
const versionIpfsCidPointer: u16 = Blockchain.nextPointer;
const versionChecksumPointer: u16 = Blockchain.nextPointer;
const versionSigHashPointer: u16 = Blockchain.nextPointer;
const versionMldsaLevelPointer: u16 = Blockchain.nextPointer;
const versionOpnetRangePointer: u16 = Blockchain.nextPointer;
const versionPluginTypePointer: u16 = Blockchain.nextPointer;
const versionPermHashPointer: u16 = Blockchain.nextPointer;
const versionDepsHashPointer: u16 = Blockchain.nextPointer;
const versionPublisherPointer: u16 = Blockchain.nextPointer;
const versionTimestampPointer: u16 = Blockchain.nextPointer;
const versionDeprecatedPointer: u16 = Blockchain.nextPointer;
const versionDepReasonPointer: u16 = Blockchain.nextPointer;

// =============================================================================
// Contract Implementation
// =============================================================================

@final
export class PackageRegistry extends OP_NET {
    // -------------------------------------------------------------------------
    // Settings Storage
    // -------------------------------------------------------------------------
    private readonly treasuryAddress: StoredString;
    private readonly scopePriceSats: StoredMapU256; // Use map with key 0
    private readonly packagePriceSats: StoredMapU256; // Use map with key 0

    // -------------------------------------------------------------------------
    // Scope Storage Maps
    // -------------------------------------------------------------------------
    private readonly scopeExists: StoredMapU256;
    private readonly scopeOwner: StoredMapU256;
    private readonly scopeCreated: StoredMapU256;
    private readonly scopePendingOwner: StoredMapU256;
    private readonly scopePendingTimestamp: StoredMapU256;

    // -------------------------------------------------------------------------
    // Package Storage Maps
    // -------------------------------------------------------------------------
    private readonly packageExists: StoredMapU256;
    private readonly packageOwner: StoredMapU256;
    private readonly packageCreated: StoredMapU256;
    private readonly packageVersionCount: StoredMapU256;

    // Package transfer tracking
    private readonly pkgPendingOwner: StoredMapU256;
    private readonly pkgPendingTimestamp: StoredMapU256;

    // -------------------------------------------------------------------------
    // Version Storage Maps
    // -------------------------------------------------------------------------
    private readonly versionExists: StoredMapU256;
    private readonly versionChecksum: StoredMapU256;
    private readonly versionSigHash: StoredMapU256;
    private readonly versionMldsaLevel: StoredMapU256;
    private readonly versionPluginType: StoredMapU256;
    private readonly versionPermHash: StoredMapU256;
    private readonly versionDepsHash: StoredMapU256;
    private readonly versionPublisher: StoredMapU256;
    private readonly versionTimestamp: StoredMapU256;
    private readonly versionDeprecated: StoredMapU256;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    public constructor() {
        super();

        // Initialize settings storage
        this.treasuryAddress = new StoredString(treasuryAddressPointer);
        this.scopePriceSats = new StoredMapU256(scopePriceSatsPointer);
        this.packagePriceSats = new StoredMapU256(packagePriceSatsPointer);

        // Initialize scope storage
        this.scopeExists = new StoredMapU256(scopeExistsPointer);
        this.scopeOwner = new StoredMapU256(scopeOwnerPointer);
        this.scopeCreated = new StoredMapU256(scopeCreatedPointer);
        this.scopePendingOwner = new StoredMapU256(scopePendingOwnerPointer);
        this.scopePendingTimestamp = new StoredMapU256(scopePendingTimestampPointer);

        // Initialize package storage
        this.packageExists = new StoredMapU256(packageExistsPointer);
        this.packageOwner = new StoredMapU256(packageOwnerPointer);
        this.packageCreated = new StoredMapU256(packageCreatedPointer);
        this.packageVersionCount = new StoredMapU256(packageVersionCountPointer);
        this.pkgPendingOwner = new StoredMapU256(pkgPendingOwnerPointer);
        this.pkgPendingTimestamp = new StoredMapU256(pkgPendingTimestampPointer);

        // Initialize version storage
        this.versionExists = new StoredMapU256(versionExistsPointer);
        this.versionChecksum = new StoredMapU256(versionChecksumPointer);
        this.versionSigHash = new StoredMapU256(versionSigHashPointer);
        this.versionMldsaLevel = new StoredMapU256(versionMldsaLevelPointer);
        this.versionPluginType = new StoredMapU256(versionPluginTypePointer);
        this.versionPermHash = new StoredMapU256(versionPermHashPointer);
        this.versionDepsHash = new StoredMapU256(versionDepsHashPointer);
        this.versionPublisher = new StoredMapU256(versionPublisherPointer);
        this.versionTimestamp = new StoredMapU256(versionTimestampPointer);
        this.versionDeprecated = new StoredMapU256(versionDeprecatedPointer);
    }

    // -------------------------------------------------------------------------
    // Deployment Initialization
    // -------------------------------------------------------------------------
    public override onDeployment(calldata: Calldata): void {
        // Read optional treasury address from calldata, or use deployer's P2TR address
        const treasuryAddr = calldata.readStringWithLength();
        if (treasuryAddr.length > 0) {
            this.treasuryAddress.value = treasuryAddr;
        } else {
            this.treasuryAddress.value = Blockchain.tx.origin.p2tr();
        }

        // Set default prices
        this.scopePriceSats.set(u256.Zero, u256.fromU64(DEFAULT_SCOPE_PRICE_SATS));
        this.packagePriceSats.set(u256.Zero, u256.fromU64(DEFAULT_PACKAGE_PRICE_SATS));

        // Reserve @opnet scope for deployer
        const opnetScopeKey = this.getScopeKeyU256(RESERVED_SCOPE);
        const blockNumber = Blockchain.block.number;
        const deployer = Blockchain.tx.origin;

        this.scopeExists.set(opnetScopeKey, u256.One);
        this.scopeOwner.set(opnetScopeKey, this._addressToU256(deployer));
        this.scopeCreated.set(opnetScopeKey, u256.fromU64(blockNumber));

        this.emitEvent(new ScopeRegisteredEvent(opnetScopeKey, deployer, blockNumber));
    }

    // =========================================================================
    // ADMIN METHODS (Owner Only)
    // =========================================================================

    /**
     * Set the treasury address for receiving payments.
     * @param calldata Contains the new treasury address as a string.
     */
    @method({ name: 'treasuryAddress', type: ABIDataTypes.STRING })
    @emit('TreasuryAddressChanged')
    public setTreasuryAddress(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const newAddress = calldata.readStringWithLength();
        if (newAddress.length == 0) {
            throw new Revert('Invalid treasury address');
        }

        this.validateTreasuryAddress(newAddress);

        const oldAddressHash = this.stringToU256Hash(this.treasuryAddress.value);
        const newAddressHash = this.stringToU256Hash(newAddress);

        this.treasuryAddress.value = newAddress;

        this.emitEvent(
            new TreasuryAddressChangedEvent(
                oldAddressHash,
                newAddressHash,
                Blockchain.block.number,
            ),
        );

        return new BytesWriter(0);
    }

    /**
     * Set the price for registering a scope.
     * @param calldata Contains the new price in satoshis (u64).
     */
    @method({ name: 'priceSats', type: ABIDataTypes.UINT64 })
    @emit('ScopePriceChanged')
    public setScopePrice(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const newPrice = calldata.readU64();
        const oldPrice = this.scopePriceSats.get(u256.Zero).toU64();

        this.scopePriceSats.set(u256.Zero, u256.fromU64(newPrice));

        this.emitEvent(new ScopePriceChangedEvent(oldPrice, newPrice, Blockchain.block.number));

        return new BytesWriter(0);
    }

    /**
     * Set the price for registering an unscoped package.
     * @param calldata Contains the new price in satoshis (u64).
     */
    @method({ name: 'priceSats', type: ABIDataTypes.UINT64 })
    @emit('PackagePriceChanged')
    public setPackagePrice(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const newPrice = calldata.readU64();
        const oldPrice = this.packagePriceSats.get(u256.Zero).toU64();

        this.packagePriceSats.set(u256.Zero, u256.fromU64(newPrice));

        this.emitEvent(new PackagePriceChangedEvent(oldPrice, newPrice, Blockchain.block.number));

        return new BytesWriter(0);
    }

    // =========================================================================
    // SCOPE METHODS
    // =========================================================================

... [TRUNCADO - 1615 linhas] ...
```

### `./OPWACoin/src/registry/constants.ts`
```ts
/**
 * OPNet Package Registry - Constants
 *
 * This file contains all constants used by the Package Registry contract.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// =============================================================================
// Plugin Types
// =============================================================================

/** Standalone plugin that runs independently */
export const PLUGIN_STANDALONE: u8 = 1;

/** Library plugin that provides shared functionality */
export const PLUGIN_LIBRARY: u8 = 2;

// =============================================================================
// String Length Limits
// =============================================================================

/** Maximum length of a scope name (without @) */
export const MAX_SCOPE_LENGTH: u32 = 32;

/** Maximum length of an unscoped package name */
export const MAX_NAME_LENGTH: u32 = 64;

/** Maximum length of a version string (semver) */
export const MAX_VERSION_LENGTH: u32 = 32;

/** Maximum length of an IPFS CID string */
export const MAX_CID_LENGTH: u32 = 128;

/** Maximum length of an OPNet version range string */
export const MAX_OPNET_RANGE_LENGTH: u32 = 64;

/** Maximum length of a deprecation reason string */
export const MAX_REASON_LENGTH: u32 = 256;

// =============================================================================
// Block Constants
// =============================================================================

/** 72-hour mutability window in blocks (~432 blocks, assuming 10 min/block) */
export const MUTABILITY_WINDOW_BLOCKS: u64 = 432;

// =============================================================================
// Pricing Defaults (in satoshis)
// =============================================================================

/** Default price to register an unscoped package: 10,000 sats */
export const DEFAULT_PACKAGE_PRICE_SATS: u64 = 10_000;

/** Default price to register a scope: ~$50 worth of sats (adjustable by owner) */
export const DEFAULT_SCOPE_PRICE_SATS: u64 = 50_000;

// =============================================================================
// Reserved Scopes
// =============================================================================

/** The @opnet scope is reserved for the contract deployer */
export const RESERVED_SCOPE: string = 'opnet';
```

### `./OPWACoin/src/registry/events/RegistryEvents.ts`
```ts
/**
 * OPNet Package Registry - Event Definitions
 *
 * All events emitted by the Package Registry contract.
 * Events are used for indexing and tracking state changes.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    ADDRESS_BYTE_LENGTH,
    BytesWriter,
    NetEvent,
    U256_BYTE_LENGTH,
    U64_BYTE_LENGTH,
    U8_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

// =============================================================================
// Scope Events
// =============================================================================

/**
 * Emitted when a new scope is registered.
 * @param scopeHash - SHA256 hash of the scope name (without @)
 * @param owner - Address of the scope owner
 * @param timestamp - Block timestamp when registered
 */
@final
export class ScopeRegisteredEvent extends NetEvent {
    constructor(scopeHash: u256, owner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeU256(scopeHash);
        data.writeAddress(owner);
        data.writeU64(timestamp);

        super('ScopeRegistered', data);
    }
}

/**
 * Emitted when a scope ownership transfer is initiated.
 * @param scopeHash - SHA256 hash of the scope name
 * @param currentOwner - Address of the current owner
 * @param newOwner - Address of the pending new owner
 * @param timestamp - Block timestamp when initiated
 */
@final
export class ScopeTransferInitiatedEvent extends NetEvent {
    constructor(scopeHash: u256, currentOwner: Address, newOwner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH * 2 + U64_BYTE_LENGTH,
        );
        data.writeU256(scopeHash);
        data.writeAddress(currentOwner);
        data.writeAddress(newOwner);
        data.writeU64(timestamp);

        super('ScopeTransferInitiated', data);
    }
}

/**
 * Emitted when a scope ownership transfer is completed.
 * @param scopeHash - SHA256 hash of the scope name
 * @param previousOwner - Address of the previous owner
 * @param newOwner - Address of the new owner
 * @param timestamp - Block timestamp when completed
 */
@final
export class ScopeTransferCompletedEvent extends NetEvent {
    constructor(scopeHash: u256, previousOwner: Address, newOwner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH * 2 + U64_BYTE_LENGTH,
        );
        data.writeU256(scopeHash);
        data.writeAddress(previousOwner);
        data.writeAddress(newOwner);
        data.writeU64(timestamp);

        super('ScopeTransferCompleted', data);
    }
}

/**
 * Emitted when a scope ownership transfer is cancelled.
 * @param scopeHash - SHA256 hash of the scope name
 * @param owner - Address of the owner who cancelled
 * @param timestamp - Block timestamp when cancelled
 */
@final
export class ScopeTransferCancelledEvent extends NetEvent {
    constructor(scopeHash: u256, owner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeU256(scopeHash);
        data.writeAddress(owner);
        data.writeU64(timestamp);

        super('ScopeTransferCancelled', data);
    }
}

// =============================================================================
// Package Events
// =============================================================================

/**
 * Emitted when a new package is registered.
 * @param packageHash - SHA256 hash of the full package name
 * @param owner - Address of the package owner
 * @param timestamp - Block timestamp when registered
 */
@final
export class PackageRegisteredEvent extends NetEvent {
    constructor(packageHash: u256, owner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeU256(packageHash);
        data.writeAddress(owner);
        data.writeU64(timestamp);

        super('PackageRegistered', data);
    }
}

/**
 * Emitted when a package ownership transfer is initiated.
 * @param packageHash - SHA256 hash of the package name
 * @param currentOwner - Address of the current owner
 * @param newOwner - Address of the pending new owner
 * @param timestamp - Block timestamp when initiated
 */
@final
export class PackageTransferInitiatedEvent extends NetEvent {
    constructor(packageHash: u256, currentOwner: Address, newOwner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH * 2 + U64_BYTE_LENGTH,
        );
        data.writeU256(packageHash);
        data.writeAddress(currentOwner);
        data.writeAddress(newOwner);
        data.writeU64(timestamp);

        super('PackageTransferInitiated', data);
    }
}

/**
 * Emitted when a package ownership transfer is completed.
 * @param packageHash - SHA256 hash of the package name
 * @param previousOwner - Address of the previous owner
 * @param newOwner - Address of the new owner
 * @param timestamp - Block timestamp when completed
 */
@final
export class PackageTransferCompletedEvent extends NetEvent {
    constructor(packageHash: u256, previousOwner: Address, newOwner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH * 2 + U64_BYTE_LENGTH,
        );
        data.writeU256(packageHash);
        data.writeAddress(previousOwner);
        data.writeAddress(newOwner);
        data.writeU64(timestamp);

        super('PackageTransferCompleted', data);
    }
}

/**
 * Emitted when a package ownership transfer is cancelled.
 * @param packageHash - SHA256 hash of the package name
 * @param owner - Address of the owner who cancelled
 * @param timestamp - Block timestamp when cancelled
 */
@final
export class PackageTransferCancelledEvent extends NetEvent {
    constructor(packageHash: u256, owner: Address, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + ADDRESS_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeU256(packageHash);
        data.writeAddress(owner);
        data.writeU64(timestamp);

        super('PackageTransferCancelled', data);
    }
}

// =============================================================================
// Version Events
// =============================================================================

/**
 * Emitted when a new version is published.
 * @param packageHash - SHA256 hash of the package name
 * @param versionHash - SHA256 hash of the version string
 * @param publisher - Address of the publisher
 * @param checksum - SHA256 checksum of the binary
 * @param timestamp - Block timestamp when published
 * @param mldsaLevel - MLDSA security level (1, 2, or 3)
 * @param pluginType - Plugin type (1=standalone, 2=library)
 */
@final
export class VersionPublishedEvent extends NetEvent {
    constructor(
        packageHash: u256,
        versionHash: u256,
        publisher: Address,
        checksum: u256,
        timestamp: u64,
        mldsaLevel: u8,
        pluginType: u8,
    ) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH * 3 + ADDRESS_BYTE_LENGTH + U64_BYTE_LENGTH + U8_BYTE_LENGTH * 2,
        );
        data.writeU256(packageHash);
        data.writeU256(versionHash);
        data.writeAddress(publisher);
        data.writeU256(checksum);
        data.writeU64(timestamp);
        data.writeU8(mldsaLevel);
        data.writeU8(pluginType);

        super('VersionPublished', data);
    }
}

/**
 * Emitted when a version is deprecated.
 * @param packageHash - SHA256 hash of the package name
 * @param versionHash - SHA256 hash of the version string
 * @param timestamp - Block timestamp when deprecated
 */
@final
export class VersionDeprecatedEvent extends NetEvent {
    constructor(packageHash: u256, versionHash: u256, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(U256_BYTE_LENGTH * 2 + U64_BYTE_LENGTH);
        data.writeU256(packageHash);
        data.writeU256(versionHash);
        data.writeU64(timestamp);

        super('VersionDeprecated', data);
    }
}

/**
 * Emitted when a version deprecation is removed.
 * @param packageHash - SHA256 hash of the package name
 * @param versionHash - SHA256 hash of the version string
 * @param timestamp - Block timestamp when undeprecated
 */
@final
export class VersionUndeprecatedEvent extends NetEvent {
    constructor(packageHash: u256, versionHash: u256, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(U256_BYTE_LENGTH * 2 + U64_BYTE_LENGTH);
        data.writeU256(packageHash);
        data.writeU256(versionHash);
        data.writeU64(timestamp);

        super('VersionUndeprecated', data);
    }
}

// =============================================================================
// Admin Events
// =============================================================================

/**
 * Emitted when the treasury address is changed.
 * @param previousAddress - Previous treasury address (as hash)
 * @param newAddress - New treasury address (as hash)
 * @param timestamp - Block timestamp when changed
 */
@final
export class TreasuryAddressChangedEvent extends NetEvent {
    constructor(previousAddressHash: u256, newAddressHash: u256, timestamp: u64) {
        const data: BytesWriter = new BytesWriter(U256_BYTE_LENGTH * 2 + U64_BYTE_LENGTH);
        data.writeU256(previousAddressHash);
        data.writeU256(newAddressHash);
        data.writeU64(timestamp);

        super('TreasuryAddressChanged', data);
    }
}

/**
 * Emitted when the scope price is changed.
 * @param oldPrice - Previous price in satoshis
 * @param newPrice - New price in satoshis
 * @param timestamp - Block timestamp when changed
 */
... [TRUNCADO - 329 linhas] ...
```

### `./OPWACoin/src/registry/index.ts`
```ts
/**
 * OPNet Package Registry - Entry Point
 *
 * Decentralized package registry for OPNet plugins.
 * Manages package ownership, version metadata, and deprecation status.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Blockchain } from '@btc-vision/btc-runtime/runtime';
import { revertOnError } from '@btc-vision/btc-runtime/runtime/abort/abort';
import { PackageRegistry } from './PackageRegistry';

// DO NOT TOUCH THIS.
Blockchain.contract = (): PackageRegistry => {
    // ONLY CHANGE THE CONTRACT CLASS NAME.
    // DO NOT ADD CUSTOM LOGIC HERE.
    return new PackageRegistry();
};

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';

// VERY IMPORTANT
export function abort(message: string, fileName: string, line: u32, column: u32): void {
    revertOnError(message, fileName, line, column);
}
```

### `./OPWACoin/src/shared-events/OracleEvents.ts`
```ts
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    ADDRESS_BYTE_LENGTH,
    BytesWriter,
    NetEvent,
    U256_BYTE_LENGTH,
    U32_BYTE_LENGTH,
    U64_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

@final
export class OracleAddedEvent extends NetEvent {
    constructor(oracle: Address, addedBy: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(oracle);
        data.writeAddress(addedBy);

        super('OracleAdded', data);
    }
}

@final
export class OracleRemovedEvent extends NetEvent {
    constructor(oracle: Address, removedBy: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(oracle);
        data.writeAddress(removedBy);

        super('OracleRemoved', data);
    }
}

@final
export class PriceSubmittedEvent extends NetEvent {
    constructor(oracle: Address, price: u256, blockNumber: u64) {
        const data: BytesWriter = new BytesWriter(
            ADDRESS_BYTE_LENGTH + U256_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeAddress(oracle);
        data.writeU256(price);
        data.writeU64(blockNumber);

        super('PriceSubmitted', data);
    }
}

@final
export class PriceAggregatedEvent extends NetEvent {
    constructor(medianPrice: u256, oracleCount: u32, blockNumber: u64) {
        const data: BytesWriter = new BytesWriter(
            U256_BYTE_LENGTH + U32_BYTE_LENGTH + U64_BYTE_LENGTH,
        );
        data.writeU256(medianPrice);
        data.writeU32(oracleCount);
        data.writeU64(blockNumber);

        super('PriceAggregated', data);
    }
}

@final
export class TWAPUpdatedEvent extends NetEvent {
    constructor(oldPrice: u256, newPrice: u256, timeElapsed: u64) {
        const data: BytesWriter = new BytesWriter(U256_BYTE_LENGTH * 2 + U64_BYTE_LENGTH);
        data.writeU256(oldPrice);
        data.writeU256(newPrice);
        data.writeU64(timeElapsed);

        super('TWAPUpdated', data);
    }
}

@final
export class PoolChangedEvent extends NetEvent {
    constructor(previousPool: Address, newPool: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(previousPool);
        data.writeAddress(newPool);

        super('PoolChanged', data);
    }
}

@final
export class CustodianChangedEvent extends NetEvent {
    constructor(previousCustodian: Address, newCustodian: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(previousCustodian);
        data.writeAddress(newCustodian);

        super('CustodianChanged', data);
    }
}
```

### `./OPWACoin/src/stablecoin/MyStableCoin.ts`
```ts
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    Blockchain,
    BytesWriter,
    Calldata,
    OP20InitParameters,
    OP20S,
    Revert,
    Selector,
    StoredBoolean,
} from '@btc-vision/btc-runtime/runtime';

import {
    BlacklistedEvent,
    BlacklisterChangedEvent,
    MinterChangedEvent,
    OwnershipTransferredEvent,
    OwnershipTransferStartedEvent,
    PausedEvent,
    PauserChangedEvent,
    UnblacklistedEvent,
    UnpausedEvent,
} from './events/StableCoinEvents';
import { AddressMemoryMap } from '@btc-vision/btc-runtime/runtime/memory/AddressMemoryMap';

export const IS_BLACKLISTED_SELECTOR: u32 = 0xd20d08bb;
export const IS_PAUSED_SELECTOR: u32 = 0xe57e24b7;

const ownerPointer: u16 = Blockchain.nextPointer;
const pendingOwnerPointer: u16 = Blockchain.nextPointer;
const minterPointer: u16 = Blockchain.nextPointer;
const blacklisterPointer: u16 = Blockchain.nextPointer;
const pauserPointer: u16 = Blockchain.nextPointer;
const pausedPointer: u16 = Blockchain.nextPointer;
const blacklistMapPointer: u16 = Blockchain.nextPointer;

@final
export class MyStableCoin extends OP20S {
    private readonly _ownerMap: AddressMemoryMap;
    private readonly _pendingOwnerMap: AddressMemoryMap;
    private readonly _minterMap: AddressMemoryMap;
    private readonly _blacklisterMap: AddressMemoryMap;
    private readonly _pauserMap: AddressMemoryMap;
    private readonly _paused: StoredBoolean;
    private readonly _blacklist: AddressMemoryMap;

    public constructor() {
        super();
        this._ownerMap = new AddressMemoryMap(ownerPointer);
        this._pendingOwnerMap = new AddressMemoryMap(pendingOwnerPointer);
        this._minterMap = new AddressMemoryMap(minterPointer);
        this._blacklisterMap = new AddressMemoryMap(blacklisterPointer);
        this._pauserMap = new AddressMemoryMap(pauserPointer);
        this._paused = new StoredBoolean(pausedPointer, false);
        this._blacklist = new AddressMemoryMap(blacklistMapPointer);
    }

    public override onDeployment(calldata: Calldata): void {
        const owner = calldata.readAddress();
        const minter = calldata.readAddress();
        const blacklister = calldata.readAddress();
        const pauser = calldata.readAddress();
        const pegAuthority = calldata.readAddress();
        const initialPegRate = calldata.readU256();

        this._validateAddress(owner, 'Invalid owner');
        this._validateAddress(minter, 'Invalid minter');
        this._validateAddress(blacklister, 'Invalid blacklister');
        this._validateAddress(pauser, 'Invalid pauser');
        this._validateAddress(pegAuthority, 'Invalid peg authority');

        if (initialPegRate.isZero()) {
            throw new Revert('Invalid peg rate');
        }

        const maxSupply: u256 = u256.Max;
        const decimals: u8 = 6;
        const name: string = 'Stable USD';
        const symbol: string = 'SUSD';

        this.instantiate(new OP20InitParameters(maxSupply, decimals, name, symbol));
        this.initializePeg(pegAuthority, initialPegRate, 144);

        this._setOwner(owner);
        this._setMinter(minter);
        this._setBlacklister(blacklister);
        this._setPauser(pauser);

        this.emitEvent(new OwnershipTransferredEvent(Address.zero(), owner));
        this.emitEvent(new MinterChangedEvent(Address.zero(), minter));
        this.emitEvent(new BlacklisterChangedEvent(Address.zero(), blacklister));
        this.emitEvent(new PauserChangedEvent(Address.zero(), pauser));
    }

    @method(
        { name: 'to', type: ABIDataTypes.ADDRESS },
        { name: 'amount', type: ABIDataTypes.UINT256 },
    )
    @emit('Minted')
    public mint(calldata: Calldata): BytesWriter {
        this._onlyMinter();
        this._requireNotPaused();

        const to = calldata.readAddress();
        const amount = calldata.readU256();

        this._validateAddress(to, 'Invalid recipient');
        this._requireNotBlacklisted(to);

        if (amount.isZero()) {
            throw new Revert('Amount is zero');
        }

        this._mint(to, amount);

        return new BytesWriter(0);
    }

    @method(
        { name: 'from', type: ABIDataTypes.ADDRESS },
        { name: 'amount', type: ABIDataTypes.UINT256 },
    )
    @emit('Burned')
    public burnFrom(calldata: Calldata): BytesWriter {
        this._onlyMinter();
        this._requireNotPaused();

        const from = calldata.readAddress();
        const amount = calldata.readU256();

        this._validateAddress(from, 'Invalid address');

        const balance = this._balanceOf(from);
        if (balance < amount) {
            throw new Revert('Insufficient balance');
        }

        this._burn(from, amount);

        return new BytesWriter(0);
    }

    @method({ name: 'account', type: ABIDataTypes.ADDRESS })
    @emit('Blacklisted')
    public blacklist(calldata: Calldata): BytesWriter {
        this._onlyBlacklister();

        const account = calldata.readAddress();
        this._validateAddress(account, 'Invalid address');

        if (this._isBlacklisted(account)) {
            throw new Revert('Already blacklisted');
        }

        this._blacklist.set(account, u256.One);

        this.emitEvent(new BlacklistedEvent(account, Blockchain.tx.sender));

        return new BytesWriter(0);
    }

    @method({ name: 'account', type: ABIDataTypes.ADDRESS })
    @emit('Unblacklisted')
    public unblacklist(calldata: Calldata): BytesWriter {
        this._onlyBlacklister();

        const account = calldata.readAddress();
        this._validateAddress(account, 'Invalid address');

        if (!this._isBlacklisted(account)) {
            throw new Revert('Not blacklisted');
        }

        this._blacklist.set(account, u256.Zero);

        this.emitEvent(new UnblacklistedEvent(account, Blockchain.tx.sender));

        return new BytesWriter(0);
    }

    @method({ name: 'account', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'blacklisted', type: ABIDataTypes.BOOL })
    public isBlacklisted(calldata: Calldata): BytesWriter {
        const account = calldata.readAddress();
        const w = new BytesWriter(1);
        w.writeBoolean(this._isBlacklisted(account));
        return w;
    }

    @method()
    @emit('Paused')
    public pause(_: Calldata): BytesWriter {
        this._onlyPauser();

        if (this._paused.value) {
            throw new Revert('Already paused');
        }

        this._paused.value = true;

        this.emitEvent(new PausedEvent(Blockchain.tx.sender));

        return new BytesWriter(0);
    }

    @method()
    @emit('Unpaused')
    public unpause(_: Calldata): BytesWriter {
        this._onlyPauser();

        if (!this._paused.value) {
            throw new Revert('Not paused');
        }

        this._paused.value = false;

        this.emitEvent(new UnpausedEvent(Blockchain.tx.sender));

        return new BytesWriter(0);
    }

    @method()
    @returns({ name: 'paused', type: ABIDataTypes.BOOL })
    public isPaused(_: Calldata): BytesWriter {
        const w = new BytesWriter(1);
        w.writeBoolean(<boolean>this._paused.value);
        return w;
    }

    @method({ name: 'newOwner', type: ABIDataTypes.ADDRESS })
    @emit('OwnershipTransferStarted')
    public transferOwnership(calldata: Calldata): BytesWriter {
        this._onlyOwner();

        const newOwner = calldata.readAddress();
        this._validateAddress(newOwner, 'Invalid new owner');

        const currentOwner = this._getOwner();
        this._setPendingOwner(newOwner);

        this.emitEvent(new OwnershipTransferStartedEvent(currentOwner, newOwner));

        return new BytesWriter(0);
    }

    @method()
    @emit('OwnershipTransferred')
    public acceptOwnership(_: Calldata): BytesWriter {
        const pending = this._getPendingOwner();
        if (pending.equals(Address.zero())) {
            throw new Revert('No pending owner');
        }
        if (!Blockchain.tx.sender.equals(pending)) {
            throw new Revert('Not pending owner');
        }

        const previousOwner = this._getOwner();
        this._setOwner(pending);
        this._setPendingOwner(Address.zero());

        this.emitEvent(new OwnershipTransferredEvent(previousOwner, pending));

        return new BytesWriter(0);
    }

    @method({ name: 'newMinter', type: ABIDataTypes.ADDRESS })
    @emit('MinterChanged')
    public setMinter(calldata: Calldata): BytesWriter {
        this._onlyOwner();

        const newMinter = calldata.readAddress();
        this._validateAddress(newMinter, 'Invalid minter');

        const previousMinter = this._getMinter();
        this._setMinter(newMinter);

        this.emitEvent(new MinterChangedEvent(previousMinter, newMinter));

        return new BytesWriter(0);
    }

    @method({ name: 'newBlacklister', type: ABIDataTypes.ADDRESS })
    @emit('BlacklisterChanged')
    public setBlacklister(calldata: Calldata): BytesWriter {
        this._onlyOwner();

        const newBlacklister = calldata.readAddress();
        this._validateAddress(newBlacklister, 'Invalid blacklister');

        const previousBlacklister = this._getBlacklister();
        this._setBlacklister(newBlacklister);

        this.emitEvent(new BlacklisterChangedEvent(previousBlacklister, newBlacklister));

        return new BytesWriter(0);
    }

    @method({ name: 'newPauser', type: ABIDataTypes.ADDRESS })
    @emit('PauserChanged')
... [TRUNCADO - 474 linhas] ...
```

### `./OPWACoin/src/stablecoin/events/StableCoinEvents.ts`
```ts
import {
    Address,
    ADDRESS_BYTE_LENGTH,
    BytesWriter,
    NetEvent,
} from '@btc-vision/btc-runtime/runtime';

@final
export class BlacklistedEvent extends NetEvent {
    constructor(account: Address, blacklister: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(account);
        data.writeAddress(blacklister);

        super('Blacklisted', data);
    }
}

@final
export class UnblacklistedEvent extends NetEvent {
    constructor(account: Address, blacklister: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(account);
        data.writeAddress(blacklister);

        super('Unblacklisted', data);
    }
}

@final
export class PausedEvent extends NetEvent {
    constructor(pauser: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH);
        data.writeAddress(pauser);

        super('Paused', data);
    }
}

@final
export class UnpausedEvent extends NetEvent {
    constructor(pauser: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH);
        data.writeAddress(pauser);

        super('Unpaused', data);
    }
}

@final
export class OwnershipTransferStartedEvent extends NetEvent {
    constructor(currentOwner: Address, pendingOwner: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(currentOwner);
        data.writeAddress(pendingOwner);

        super('OwnershipTransferStarted', data);
    }
}

@final
export class OwnershipTransferredEvent extends NetEvent {
    constructor(previousOwner: Address, newOwner: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(previousOwner);
        data.writeAddress(newOwner);

        super('OwnershipTransferred', data);
    }
}

@final
export class MinterChangedEvent extends NetEvent {
    constructor(previousMinter: Address, newMinter: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(previousMinter);
        data.writeAddress(newMinter);

        super('MinterChanged', data);
    }
}

@final
export class BlacklisterChangedEvent extends NetEvent {
    constructor(previousBlacklister: Address, newBlacklister: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(previousBlacklister);
        data.writeAddress(newBlacklister);

        super('BlacklisterChanged', data);
    }
}

@final
export class PauserChangedEvent extends NetEvent {
    constructor(previousPauser: Address, newPauser: Address) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH * 2);
        data.writeAddress(previousPauser);
        data.writeAddress(newPauser);

        super('PauserChanged', data);
    }
}
```

### `./OPWACoin/src/stablecoin/index.ts`
```ts
import { Blockchain } from '@btc-vision/btc-runtime/runtime';
import { revertOnError } from '@btc-vision/btc-runtime/runtime/abort/abort';
import { MyStableCoin } from './MyStableCoin';

// DO NOT TOUCH TO THIS.
Blockchain.contract = () => {
    // ONLY CHANGE THE CONTRACT CLASS NAME.
    // DO NOT ADD CUSTOM LOGIC HERE.

    return new MyStableCoin();
};

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';

// VERY IMPORTANT
export function abort(message: string, fileName: string, line: u32, column: u32): void {
    revertOnError(message, fileName, line, column);
}
```

### `./OPWACoin/src/token/MyToken.ts`
```ts
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    AddressMap,
    Blockchain,
    BytesWriter,
    Calldata,
    OP20,
    OP20InitParameters,
    SafeMath,
} from '@btc-vision/btc-runtime/runtime';

@final
export class MyToken extends OP20 {
    public constructor() {
        super();
    }

    public override onDeployment(_calldata: Calldata): void {
        const maxSupply: u256 = u256.fromString('100000000000000000'); // 1 bilhão OPWA × 10^8 decimais
        const decimals: u8 = 8;
        const name: string = 'OPWA Coin';
        const symbol: string = 'OPWA';
        this.instantiate(new OP20InitParameters(maxSupply, decimals, name, symbol));
    }

    public override onUpdate(_calldata: Calldata): void {
        super.onUpdate(_calldata);
    }

    @method(
        { name: 'address', type: ABIDataTypes.ADDRESS },
        { name: 'amount',  type: ABIDataTypes.UINT256 },
    )
    @emit('Minted')
    @returns()
    public mint(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        this._mint(calldata.readAddress(), calldata.readU256());
        return new BytesWriter(0);
    }

    @method({ name: 'addressAndAmount', type: ABIDataTypes.ADDRESS_UINT256_TUPLE })
    @emit('Minted')
    @returns()
    public airdrop(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        const addressAndAmount: AddressMap<u256> = calldata.readAddressMapU256();
        const addresses: Address[] = addressAndAmount.keys();
        let totalAirdropped: u256 = u256.Zero;
        for (let i: i32 = 0; i < addresses.length; i++) {
            const address = addresses[i];
            if (!address) throw new Error('Invalid address in airdrop list');
            const amount = addressAndAmount.get(address);
            const currentBalance: u256 = this.balanceOfMap.get(address);
            if (currentBalance) {
                this.balanceOfMap.set(address, SafeMath.add(currentBalance, amount));
            } else {
                this.balanceOfMap.set(address, amount);
            }
            totalAirdropped = SafeMath.add(totalAirdropped, amount);
            this.createMintedEvent(address, amount);
        }
        this._totalSupply.set(SafeMath.add(this._totalSupply.value, totalAirdropped));
        return new BytesWriter(0);
    }
}
```

### `./OPWACoin/src/token/index.ts`
```ts
import { Blockchain } from '@btc-vision/btc-runtime/runtime';
import { revertOnError } from '@btc-vision/btc-runtime/runtime/abort/abort';
import { MyToken } from './MyToken';

// DO NOT TOUCH TO THIS.
Blockchain.contract = () => {
    // ONLY CHANGE THE CONTRACT CLASS NAME.
    // DO NOT ADD CUSTOM LOGIC HERE.

    return new MyToken();
};

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';

// VERY IMPORTANT
export function abort(message: string, fileName: string, line: u32, column: u32): void {
    revertOnError(message, fileName, line, column);
}
```

### `./OPWACoin/tests/PackageRegistry.spec.ts`
```ts
import {
    DEFAULT_PACKAGE_PRICE_SATS,
    DEFAULT_SCOPE_PRICE_SATS,
    MAX_CID_LENGTH,
    MAX_NAME_LENGTH,
    MAX_OPNET_RANGE_LENGTH,
    MAX_REASON_LENGTH,
    MAX_SCOPE_LENGTH,
    MAX_VERSION_LENGTH,
    MUTABILITY_WINDOW_BLOCKS,
    PLUGIN_LIBRARY,
    PLUGIN_STANDALONE,
    RESERVED_SCOPE,
} from '../src/registry/constants';

import {
    MLDSA44_SIGNATURE_LEN,
    MLDSA65_SIGNATURE_LEN,
    MLDSA87_SIGNATURE_LEN,
} from '@btc-vision/btc-runtime/runtime/env/consensus/MLDSAMetadata';

// MLDSA security levels
const MLDSA44: u8 = 1;
const MLDSA65: u8 = 2;
const MLDSA87: u8 = 3;

/**
 * PackageRegistry Unit Tests
 *
 * Tests for the OPNet Package Registry smart contract.
 * Covers validation functions and helper utilities.
 * Note: Tests that require Blockchain imports (sha256, etc.) are excluded
 * as they require the full runtime environment.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// ============================================================================
// Constants Tests
// ============================================================================

describe('Constants', () => {
    describe('MLDSA Levels', () => {
        it('should have correct MLDSA level values', () => {
            expect(MLDSA44).toBe(1);
            expect(MLDSA65).toBe(2);
            expect(MLDSA87).toBe(3);
        });

        it('should have correct MLDSA signature lengths', () => {
            expect(MLDSA44_SIGNATURE_LEN).toBe(2420);
            expect(MLDSA65_SIGNATURE_LEN).toBe(3309);
            expect(MLDSA87_SIGNATURE_LEN).toBe(4627);
        });
    });

    describe('Plugin Types', () => {
        it('should have correct plugin type values', () => {
            expect(PLUGIN_STANDALONE).toBe(1);
            expect(PLUGIN_LIBRARY).toBe(2);
        });
    });

    describe('Length Limits', () => {
        it('should have correct length limits', () => {
            expect(MAX_SCOPE_LENGTH).toBe(32);
            expect(MAX_NAME_LENGTH).toBe(64);
            expect(MAX_VERSION_LENGTH).toBe(32);
            expect(MAX_CID_LENGTH).toBe(128);
            expect(MAX_OPNET_RANGE_LENGTH).toBe(64);
            expect(MAX_REASON_LENGTH).toBe(256);
        });
    });

    describe('Block Constants', () => {
        it('should have correct mutability window in blocks (~72 hours)', () => {
            expect(MUTABILITY_WINDOW_BLOCKS).toBe(432); // ~432 blocks at 10 min/block
        });
    });

    describe('Pricing', () => {
        it('should have correct default pricing', () => {
            expect(DEFAULT_PACKAGE_PRICE_SATS).toBe(10000);
            expect(DEFAULT_SCOPE_PRICE_SATS).toBe(50000);
        });
    });

    describe('Reserved Scope', () => {
        it('should have opnet as reserved scope', () => {
            expect(RESERVED_SCOPE).toBe('opnet');
        });
    });
});

// ============================================================================
// Validation Logic Tests (Reimplemented for testing)
// ============================================================================

/**
 * Validate scope name format (reimplemented for testing)
 */
function validateScopeName(scope: string): bool {
    const len = scope.length;
    if (len < 1 || len > <i32>MAX_SCOPE_LENGTH) return false;

    const first = scope.charCodeAt(0);
    if (first < 97 || first > 122) return false; // Must start with lowercase letter

    for (let i = 1; i < len; i++) {
        const c = scope.charCodeAt(i);
        const isLower = c >= 97 && c <= 122;
        const isDigit = c >= 48 && c <= 57;
        const isHyphen = c == 45;

        if (!isLower && !isDigit && !isHyphen) return false;
    }
    return true;
}

/**
 * Validate unscoped package name format
 */
function validateUnscopedName(name: string): bool {
    const len = name.length;
    if (len < 1 || len > <i32>MAX_NAME_LENGTH) return false;

    const first = name.charCodeAt(0);
    if (first < 97 || first > 122) return false;

    for (let i = 1; i < len; i++) {
        const c = name.charCodeAt(i);
        const isLower = c >= 97 && c <= 122;
        const isDigit = c >= 48 && c <= 57;
        const isHyphen = c == 45;

        if (!isLower && !isDigit && !isHyphen) return false;
    }
    return true;
}

/**
 * Check if package name is scoped
 */
function isScoped(packageName: string): bool {
    return packageName.length > 0 && packageName.charCodeAt(0) == 64;
}

/**
 * Validate IPFS CID format
 */
function validateIpfsCid(cid: string): bool {
    const len = cid.length;
    if (len < 46 || len > <i32>MAX_CID_LENGTH) return false;

    // CIDv0: starts with "Qm"
    const isV0 = cid.charCodeAt(0) == 81 && cid.charCodeAt(1) == 109;

    // CIDv1: starts with "baf" (covers bafy, bafk, bafz, etc.)
    const isV1 = cid.charCodeAt(0) == 98 && cid.charCodeAt(1) == 97 && cid.charCodeAt(2) == 102;

    return isV0 || isV1;
}

/**
 * Validate version string format (semver: x.y.z)
 */
function validateVersionString(version: string): bool {
    const len = version.length;
    if (len < 5 || len > <i32>MAX_VERSION_LENGTH) return false;

    const first = version.charCodeAt(0);
    if (first < 48 || first > 57) return false;

    let dotCount: i32 = 0;
    let lastWasDot = false;

    for (let i: i32 = 0; i < len; i++) {
        const c = version.charCodeAt(i);
        const isDot = c == 46;
        const isDigit = c >= 48 && c <= 57;
        const isHyphen = c == 45;

        if (isHyphen) {
            if (dotCount < 2) return false;
            break;
        }

        if (isDot) {
            if (lastWasDot) return false;
            dotCount++;
            lastWasDot = true;
        } else if (isDigit) {
            lastWasDot = false;
        } else {
            return false;
        }
    }

    return dotCount >= 2;
}

/**
 * Validate OPNet version range string format
 */
function validateOpnetVersionRange(range: string): bool {
    const len = range.length;
    if (len == 0 || len > <i32>MAX_OPNET_RANGE_LENGTH) return false;

    let hasDigit = false;
    for (let i: i32 = 0; i < len; i++) {
        const c = range.charCodeAt(i);
        if (c >= 48 && c <= 57) {
            hasDigit = true;
            break;
        }
    }
    if (!hasDigit) return false;

    for (let i: i32 = 0; i < len; i++) {
        const c = range.charCodeAt(i);
        const isDigit = c >= 48 && c <= 57;
        const isDot = c == 46;
        const isSpace = c == 32;
        const isCompare = c == 60 || c == 62 || c == 61 || c == 94 || c == 126;
        const isLogical = c == 124 || c == 38;
        const isWildcard = c == 120 || c == 42;
        const isHyphen = c == 45;

        if (
            !isDigit &&
            !isDot &&
            !isSpace &&
            !isCompare &&
            !isLogical &&
            !isWildcard &&
            !isHyphen
        ) {
            return false;
        }
    }
    return true;
}

/**
 * Validate treasury address format (bc1p or bc1q)
 */
function validateTreasuryAddress(address: string): bool {
    const len = address.length;
    if (len < 42 || len > 62) return false;

    if (address.charCodeAt(0) != 98 || address.charCodeAt(1) != 99 || address.charCodeAt(2) != 49) {
        return false;
    }

    const fourth = address.charCodeAt(3);
    if (fourth != 112 && fourth != 113) return false;

    for (let i: i32 = 4; i < len; i++) {
        const c = address.charCodeAt(i);
        const isDigit = c >= 48 && c <= 57 && c != 49;
        const isLower = c >= 97 && c <= 122 && c != 98 && c != 105 && c != 111;

        if (!isDigit && !isLower) return false;
    }
    return true;
}

/**
 * Validate signature length matches MLDSA level
 */
function validateSignatureLength(sigLen: u32, mldsaLevel: u8): bool {
    if (mldsaLevel == 1) return sigLen == MLDSA44_SIGNATURE_LEN;
    if (mldsaLevel == 2) return sigLen == MLDSA65_SIGNATURE_LEN;
    if (mldsaLevel == 3) return sigLen == MLDSA87_SIGNATURE_LEN;
    return false;
}

// ============================================================================
// Scope Name Validation Tests
// ============================================================================

describe('Scope Name Validation', () => {
    describe('Valid scope names', () => {
        it('should accept simple lowercase names', () => {
            expect(validateScopeName('opnet')).toBe(true);
            expect(validateScopeName('myorg')).toBe(true);
            expect(validateScopeName('abc')).toBe(true);
        });

        it('should accept names with digits', () => {
            expect(validateScopeName('org123')).toBe(true);
            expect(validateScopeName('my2org')).toBe(true);
        });

        it('should accept names with hyphens', () => {
            expect(validateScopeName('my-org')).toBe(true);
            expect(validateScopeName('my-cool-org')).toBe(true);
        });

        it('should accept single character names', () => {
... [TRUNCADO - 728 linhas] ...
```

### `./OPWACoin/tests/as-pect.d.ts`
```ts
/// <reference types="@btc-vision/as-pect-assembly/types/as-pect" />
```

### `./contracts/op20/OPWACoin.ts`
```ts
/**
 * Contract Name:  OPWACoin
 * Standard:       OP-20 (Bitcoin L1 Fungible Token)
 * Network:        testnet → mainnet (Q2 2026)
 * Version:        0.1.0
 * WASM SHA256:    [TO BE FILLED AFTER COMPILATION]
 * Deploy TXID:    [TO BE FILLED AFTER DEPLOYMENT]
 * Block Number:   [TO BE FILLED AFTER DEPLOYMENT]
 * Author:         OPWA Team
 * License:        MIT
 *
 * Description:
 *   OPWACoin is the platform utility and governance token for the OPWA
 *   real estate tokenization protocol on Bitcoin Layer 1 via OP_NET.
 *
 *   Max supply mirrors Bitcoin: 21,000,000 OPWA.
 *   8 decimal places for satoshi-level precision.
 *
 * Dependencies:
 *   @btc-vision/btc-runtime (AssemblyScript Bitcoin runtime)
 *   opnet SDK (frontend interaction)
 *
 * References:
 *   OP-20 Standard: https://github.com/btc-vision/btc-runtime
 *   OP_NET Docs:    https://docs.opnet.org
 */

import {
  OP20,
  OP20InitParameters,
} from '@btc-vision/btc-runtime/runtime/contracts/OP20';
import { u256 } from 'as-bignum/assembly';

/**
 * OPWACoin — OPWA Platform Token
 *
 * Inherits the full OP-20 standard from btc-runtime.
 * All transfer, approve, allowance, mint, and burn logic
 * is implemented in the parent OP20 class.
 */
@final
export class OPWACoin extends OP20 {
  // Maximum supply: 21,000,000 OPWA (with 8 decimals = 2,100,000,000,000,000 base units)
  private readonly MAX_SUPPLY: u256 = u256.fromString('2100000000000000');

  constructor() {
    super();
  }

  /**
   * Called once on contract deployment.
   * Initializes the token with name, symbol, decimals, and max supply.
   */
  public override onDeployment(_calldata: Calldata): void {
    const maxSupply: u256 = this.MAX_SUPPLY;
    const decimals: u8 = 8;

    this.instantiate(
      new OP20InitParameters(
        u256.Zero,    // Initial supply — zero; minted via governance
        maxSupply,    // Hard cap: 21,000,000 OPWA
        decimals,     // 8 decimal places
        'OPWACoin',   // Token name
        'OPWA',       // Token symbol
      ),
    );
  }

  /**
   * Execute — routes incoming contract calls to the correct handler.
   * Parent OP20 handles: transfer, approve, transferFrom, burn.
   * Mint is restricted to contract owner via parent onlyOwner modifier.
   */
  public override execute(method: Selector, calldata: Calldata): BytesWriter {
    return super.execute(method, calldata);
  }
}
```

### `./contracts/op721/PropertyNFT.ts`
```ts
/**
 * Contract Name:  PropertyNFT
 * Standard:       OP-721 (Bitcoin L1 Non-Fungible Token)
 * Network:        testnet → mainnet (Q2 2026)
 * Version:        0.1.0
 * WASM SHA256:    [TO BE FILLED AFTER COMPILATION]
 * Deploy TXID:    [TO BE FILLED AFTER DEPLOYMENT]
 * Block Number:   [TO BE FILLED AFTER DEPLOYMENT]
 * Author:         OPWA Team
 * License:        MIT
 *
 * Description:
 *   PropertyNFT represents unique real estate asset ownership on Bitcoin L1.
 *   Each tokenId maps to a single real-world property.
 *   The NFT's tokenURI points to IPFS/Arweave property legal documents.
 *
 *   When fractionalized:
 *   - NFT is locked in this contract
 *   - A FractionalToken (OP-20) contract is deployed for the property
 *   - NFT is unlocked only when 100% of fractional shares are redeemed
 *
 * State Machine:
 *   WHOLE → (fractionalize) → FRACTIONALIZED → (redeem all) → WHOLE
 *
 * Dependencies:
 *   @btc-vision/btc-runtime (AssemblyScript Bitcoin runtime)
 *
 * References:
 *   OP-721 Standard: https://github.com/btc-vision/btc-runtime
 *   OP_NET Docs:     https://docs.opnet.org
 */

import {
  OP721,
} from '@btc-vision/btc-runtime/runtime/contracts/OP721';
import { Address, Blockchain, BytesWriter, Calldata, Selector } from '@btc-vision/btc-runtime/runtime';
import { u256 } from 'as-bignum/assembly';
import { StoredU256 } from '@btc-vision/btc-runtime/runtime/storage/StoredU256';
import { StoredBoolean } from '@btc-vision/btc-runtime/runtime/storage/StoredBoolean';

// Storage pointers — unique u16 IDs for each state variable
const POINTER_TOKEN_ID_COUNTER: u16 = 100;
const POINTER_FRACTIONALIZED_MAP: u16 = 101;  // tokenId → bool
const POINTER_FRACTIONAL_CONTRACT_MAP: u16 = 102;  // tokenId → Address

// Method selectors
const MINT_SELECTOR: u32 = Selector.for('mint(string)');
const FRACTIONALIZE_SELECTOR: u32 = Selector.for('fractionalize(uint256,uint256)');
const UNLOCK_SELECTOR: u32 = Selector.for('unlockOnRedemption(uint256)');

/**
 * PropertyNFT — OPWA Real Estate Property Token
 *
 * Inherits OP-721 base functionality.
 * Adds property-specific minting, fractionalization, and redemption logic.
 */
@final
export class PropertyNFT extends OP721 {
  // Auto-incrementing token ID counter
  private tokenIdCounter: StoredU256 = new StoredU256(POINTER_TOKEN_ID_COUNTER, u256.Zero);

  constructor() {
    super('OPWA Property', 'OPWA-PROP');
  }

  public override onDeployment(_calldata: Calldata): void {
    // No additional initialization required beyond OP721 parent
  }

  public override execute(method: Selector, calldata: Calldata): BytesWriter {
    switch (method) {
      case MINT_SELECTOR:
        return this.mintProperty(calldata);

      case FRACTIONALIZE_SELECTOR:
        return this.fractionalizeProperty(calldata);

      case UNLOCK_SELECTOR:
        return this.unlockOnRedemption(calldata);

      default:
        // Delegate to OP721 for standard NFT methods
        // (ownerOf, transferFrom, approve, tokenURI, etc.)
        return super.execute(method, calldata);
    }
  }

  /**
   * mint(metadataURI: string) → tokenId: u256
   *
   * Mints a new PropertyNFT to the caller.
   * metadataURI should point to IPFS/Arweave property legal documents.
   * Only callable by authorized property validators (onlyAuthorized).
   */
  private mintProperty(calldata: Calldata): BytesWriter {
    this.onlyOwner(Blockchain.tx.origin);  // Restrict to authorized minter

    const metadataURI: string = calldata.readStringWithLength();

    // Increment counter and assign new tokenId
    const newTokenId: u256 = u256.add(this.tokenIdCounter.value, u256.One);
    this.tokenIdCounter.value = newTokenId;

    // Mint NFT to caller
    this._mint(Blockchain.tx.origin, newTokenId);

    // Store metadata URI
    this._setTokenURI(newTokenId, metadataURI);

    const result = new BytesWriter(32);
    result.writeU256(newTokenId);
    return result;
  }

  /**
   * fractionalize(tokenId: u256, totalShares: u256) → void
   *
   * Locks the PropertyNFT and records it as fractionalized.
   * Called by the FractionalToken contract deployment flow.
   * Only callable by the NFT owner.
   */
  private fractionalizeProperty(calldata: Calldata): BytesWriter {
    const tokenId: u256 = calldata.readU256();
    const fractionalContractAddress: Address = calldata.readAddress();

    // Verify caller is the NFT owner
    const owner: Address = this._ownerOf(tokenId);
    if (owner !== Blockchain.tx.origin) {
      throw new Error('PropertyNFT: caller is not token owner');
    }

    // Mark as fractionalized
    const fractionalizedKey = new StoredBoolean(POINTER_FRACTIONALIZED_MAP, tokenId);
    fractionalizedKey.value = true;

    // Record fractional contract address
    const contractKey = new StoredU256(POINTER_FRACTIONAL_CONTRACT_MAP, tokenId);
    // Store address as u256 (OP_NET address encoding)
    contractKey.value = u256.fromBytes(fractionalContractAddress, true);

    return new BytesWriter(0);
  }

  /**
   * unlockOnRedemption(tokenId: u256) → void
   *
   * Called by FractionalToken contract when totalSupply reaches zero
   * (all shares redeemed). Unlocks the NFT, returning it to WHOLE state.
   * Only callable by the registered FractionalToken contract for this tokenId.
   */
  private unlockOnRedemption(calldata: Calldata): BytesWriter {
    const tokenId: u256 = calldata.readU256();

    // Verify caller is the registered fractional contract for this tokenId
    const contractKey = new StoredU256(POINTER_FRACTIONAL_CONTRACT_MAP, tokenId);
    const registeredContract: Address = u256.toBytes(contractKey.value);

    if (Blockchain.tx.origin !== registeredContract) {
      throw new Error('PropertyNFT: only registered fractional contract can unlock');
    }

    // Remove fractionalized status
    const fractionalizedKey = new StoredBoolean(POINTER_FRACTIONALIZED_MAP, tokenId);
    fractionalizedKey.value = false;

    return new BytesWriter(0);
  }

  /**
   * Override transfer to block transfers of fractionalized tokens.
   * A fractionalized property NFT cannot change hands while shares exist.
   */
  public override _transfer(from: Address, to: Address, tokenId: u256): void {
    const fractionalizedKey = new StoredBoolean(POINTER_FRACTIONALIZED_MAP, tokenId);
    if (fractionalizedKey.value) {
      throw new Error('PropertyNFT: token is fractionalized — redeem all shares first');
    }
    super._transfer(from, to, tokenId);
  }
}
```

### `./contracts/yield/YieldDistributor.ts`
```ts
/**
 * Contract Name:  YieldDistributor
 * Standard:       Custom (Bitcoin L1 via OP_NET)
 * Network:        testnet → mainnet (Q2 2026)
 * Version:        0.1.0-dev
 * WASM SHA256:    [TO BE FILLED AFTER COMPILATION]
 * Deploy TXID:    [NOT YET DEPLOYED]
 * Block Number:   [NOT YET DEPLOYED]
 * Author:         OPWA Team
 * License:        MIT
 *
 * Description:
 *   YieldDistributor manages rental income distribution to FractionalToken holders.
 *   Uses the Synthetix "reward per token" checkpoint model for gas-efficient
 *   yield accounting with no per-holder loops.
 *
 *   Yield accounting formula:
 *     yieldPerTokenStored += yieldDeposited / totalSupply
 *     userClaimable = balance × (yieldPerTokenStored - userYieldPerTokenPaid)
 *
 * Status: DEVELOPMENT — Not deployed. Interface defined for integration planning.
 *
 * Dependencies:
 *   @btc-vision/btc-runtime (AssemblyScript Bitcoin runtime)
 *   FractionalToken (OP-20, per-property)
 *
 * References:
 *   Synthetix Staking Rewards: https://github.com/Synthetixio/synthetix
 *   OP_NET Docs: https://docs.opnet.org
 */

import {
  OP20,
} from '@btc-vision/btc-runtime/runtime/contracts/OP20';
import {
  Address,
  Blockchain,
  BytesWriter,
  Calldata,
  Selector,
} from '@btc-vision/btc-runtime/runtime';
import { u256 } from 'as-bignum/assembly';
import { StoredU256 } from '@btc-vision/btc-runtime/runtime/storage/StoredU256';

// Method selectors
const DEPOSIT_YIELD_SELECTOR: u32 = Selector.for('depositYield(address,uint256)');
const CLAIM_YIELD_SELECTOR: u32 = Selector.for('claimYield(address)');
const EARNED_SELECTOR: u32 = Selector.for('earned(address,address)');

// Storage pointers
const POINTER_YIELD_PER_TOKEN: u16 = 200;       // propertyContract → yieldPerTokenStored
const POINTER_USER_PAID: u16 = 201;              // hash(user, property) → userYieldPerTokenPaid
const POINTER_TOTAL_DEPOSITED: u16 = 202;        // propertyContract → totalYieldDeposited

/**
 * YieldDistributor — Rental Income Distribution for OPWA
 *
 * Property managers deposit yield; token holders claim their proportional share.
 *
 * Checkpoint model ensures O(1) claim operations regardless of holder count.
 */
@final
export class YieldDistributor {

  constructor() {}

  public onDeployment(_calldata: Calldata): void {
    // No initialization required
  }

  public execute(method: Selector, calldata: Calldata): BytesWriter {
    switch (method) {
      case DEPOSIT_YIELD_SELECTOR:
        return this.depositYield(calldata);

      case CLAIM_YIELD_SELECTOR:
        return this.claimYield(calldata);

      case EARNED_SELECTOR:
        return this.earned(calldata);

      default:
        throw new Error('YieldDistributor: unknown method');
    }
  }

  /**
   * depositYield(propertyContract: Address, amount: u256) → void
   *
   * Called by authorized property manager to deposit rental income.
   * Updates the global yieldPerToken checkpoint.
   *
   * Formula: yieldPerToken += amount / totalSupply
   *
   * @param propertyContract — Address of the FractionalToken (OP-20) for this property
   * @param amount — BTC amount of yield being deposited (in satoshis)
   */
  private depositYield(calldata: Calldata): BytesWriter {
    const propertyContract: Address = calldata.readAddress();
    const amount: u256 = calldata.readU256();

    // TODO: Verify caller is authorized property manager for this contract
    // this.onlyAuthorizedManager(propertyContract, Blockchain.tx.origin);

    // Get total supply of fractional shares
    // TODO: Cross-contract call to FractionalToken.totalSupply()
    // const totalSupply: u256 = OP20(propertyContract).totalSupply();

    // Update yieldPerToken checkpoint
    // yieldPerTokenStored += amount / totalSupply
    const yieldKey = new StoredU256(POINTER_YIELD_PER_TOKEN, u256.fromBytes(propertyContract, true));
    // TODO: Fixed-point arithmetic for precision
    // yieldKey.value = u256.add(yieldKey.value, u256.div(amount, totalSupply));

    // Track total deposited for analytics
    const totalKey = new StoredU256(POINTER_TOTAL_DEPOSITED, u256.fromBytes(propertyContract, true));
    totalKey.value = u256.add(totalKey.value, amount);

    return new BytesWriter(0);
  }

  /**
   * claimYield(propertyContract: Address) → claimedAmount: u256
   *
   * Called by a FractionalToken holder to claim their accumulated yield.
   * Updates the per-user checkpoint to prevent double-claiming.
   *
   * Formula:
   *   claimable = balance × (yieldPerToken - userYieldPerTokenPaid[user])
   *   userYieldPerTokenPaid[user] = yieldPerToken (mark as paid)
   *   transfer(claimable BTC) to user
   *
   * @param propertyContract — Address of the FractionalToken for this property
   */
  private claimYield(calldata: Calldata): BytesWriter {
    const propertyContract: Address = calldata.readAddress();
    const caller: Address = Blockchain.tx.origin;

    // TODO: Calculate claimable amount via earned()
    // const claimable: u256 = this._earned(caller, propertyContract);

    // TODO: Update user checkpoint
    // userYieldPerTokenPaid[caller][propertyContract] = yieldPerTokenStored

    // TODO: Transfer BTC to caller
    // Blockchain.transfer(caller, claimable);

    const result = new BytesWriter(32);
    // result.writeU256(claimable);
    result.writeU256(u256.Zero); // Placeholder
    return result;
  }

  /**
   * earned(user: Address, propertyContract: Address) → claimable: u256
   *
   * View function — returns how much yield a user can currently claim.
   *
   * @param user — Address of the token holder
   * @param propertyContract — Address of the FractionalToken contract
   */
  private earned(calldata: Calldata): BytesWriter {
    const user: Address = calldata.readAddress();
    const propertyContract: Address = calldata.readAddress();

    // TODO: Implement earned calculation
    // const yieldPerToken = yieldPerTokenStored[propertyContract]
    // const userPaid = userYieldPerTokenPaid[user][propertyContract]
    // const balance = FractionalToken(propertyContract).balanceOf(user)
    // claimable = balance × (yieldPerToken - userPaid)

    const result = new BytesWriter(32);
    result.writeU256(u256.Zero); // Placeholder
    return result;
  }
}
```

### `./gen_app.js`
```js
const fs = require('fs');
const content = `import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

const Dashboard = lazy(() => import('./pages/Dashboard'));

const Spinner = () => (
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'60vh',color:'rgba(255,255,255,.3)',fontSize:'0.85rem',letterSpacing:'0.12em'}}>
    LOADING...
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
`;
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('OK App.tsx');
```

### `./gen_css.js`
```js
const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
// Remove previous s14 patch if exists
css = css.replace(/\/\* s14-patch-start \*\/[\s\S]*?\/\* s14-patch-end \*\//g, '').trimEnd();

const patch = `

/* s14-patch-start */

/* SLIDER - dot overlay posicionado via JS */
.sim-slider-wrap { position: relative; width: 100%; height: 36px; display: flex; align-items: center; }
.sim-slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px;
  background: rgba(255,255,255,.1); border-radius: 2px;
  outline: none; cursor: pointer; position: relative; z-index: 1;
}
.sim-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 0; height: 0; opacity: 0; }
.sim-slider::-moz-range-thumb { width: 0; height: 0; border: none; background: transparent; }
.sim-slider-track {
  position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  height: 4px; background: var(--accent); border-radius: 2px; pointer-events: none; z-index: 0;
}
.sim-slider-dot {
  position: absolute; top: 50%; transform: translate(-50%, -50%);
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--accent); border: 3px solid #fff;
  box-shadow: 0 0 0 4px rgba(249,115,22,.3), 0 2px 10px rgba(0,0,0,.5);
  pointer-events: none; z-index: 3;
}

/* HOW IT WORKS - numero branco no hover, sem sombra */
.step { transition: transform .22s, box-shadow .22s; }
.step:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(249,115,22,.14); }
.step-number {
  font-size: 3.5rem; font-weight: 900;
  color: rgba(255,255,255,.07); line-height: 1;
  text-shadow: none !important; transition: color .2s;
}
.step:hover .step-number { color: #ffffff !important; text-shadow: none !important; }
.step:hover .step-icon-wrap { border-color: var(--accent); background: rgba(249,115,22,.15); }

/* NAV - aba Dashboard */
.nav-link-dashboard {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(249,115,22,.1); border: 1px solid rgba(249,115,22,.28);
  border-radius: 6px; padding: 4px 10px;
  color: var(--accent) !important; font-size: .78rem; font-weight: 600;
  transition: background .18s, border-color .18s;
}
.nav-link-dashboard:hover, .nav-link-dashboard.active { background: rgba(249,115,22,.22); border-color: var(--accent); }

/* CARDS - profundidade 3D */
.ativo-card, .asset-card {
  background: linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.01));
  border: 1px solid rgba(255,255,255,.08); border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.06);
  backdrop-filter: blur(8px);
  transition: transform .25s, box-shadow .25s, border-color .25s;
}
.ativo-card:hover, .asset-card:hover {
  transform: translateY(-6px) scale(1.012);
  box-shadow: 0 20px 50px rgba(0,0,0,.42), 0 0 0 1px rgba(249,115,22,.18), inset 0 1px 0 rgba(255,255,255,.1);
  border-color: rgba(249,115,22,.22);
}

/* BOTOES - glass highlight */
.btn-primary, .nav-connect-btn {
  position: relative; overflow: hidden;
  box-shadow: 0 4px 18px rgba(249,115,22,.38), inset 0 1px 0 rgba(255,255,255,.22);
  transition: transform .15s, box-shadow .15s;
}
.btn-primary::before, .nav-connect-btn::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.16) 0%, transparent 55%);
  border-radius: inherit; pointer-events: none;
}
.btn-primary:hover, .nav-connect-btn:hover { box-shadow: 0 6px 26px rgba(249,115,22,.52), inset 0 1px 0 rgba(255,255,255,.22); transform: translateY(-1px); }
.btn-primary:active, .nav-connect-btn:active { transform: translateY(1px); }

/* DASHBOARD PAGE */
.dashboard-page { min-height: 100vh; padding: 104px 0 64px; }
.dashboard-container { max-width: 920px; margin: 0 auto; padding: 0 24px; }
.dashboard-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 36px; gap: 16px; flex-wrap: wrap; }
.dashboard-title { font-size: 2rem; font-weight: 800; color: #fff; margin: 0 0 4px; }
.dashboard-addr { font-size: .78rem; color: rgba(255,255,255,.38); font-family: monospace; }

.dashboard-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; margin-bottom: 28px; }
.dashboard-stat-card {
  background: linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.018));
  border: 1px solid rgba(255,255,255,.09); border-radius: 14px; padding: 22px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.05);
}
.dashboard-stat-label { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.38); margin-bottom: 10px; }
.dashboard-stat-value { font-size: 1.55rem; font-weight: 800; line-height: 1.1; margin-bottom: 5px; }
.dashboard-stat-unit { font-size: .8rem; opacity: .65; }
.dashboard-stat-sub { font-size: .72rem; color: rgba(255,255,255,.32); }

.dashboard-supply { background: rgba(255,255,255,.038); border: 1px solid rgba(255,255,255,.08); border-radius: 14px; padding: 20px; margin-bottom: 28px; }
.dashboard-supply-header { display: flex; justify-content: space-between; font-size: .82rem; color: rgba(255,255,255,.5); margin-bottom: 10px; }
.dashboard-supply-pct { color: var(--accent); font-weight: 700; }
.dashboard-supply-bar { height: 7px; background: rgba(255,255,255,.08); border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
.dashboard-supply-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--gold)); border-radius: 4px; transition: width .6s ease; }
.dashboard-supply-numbers { display: flex; justify-content: space-between; font-size: .7rem; color: rgba(255,255,255,.28); }

.dashboard-section { margin-bottom: 32px; }
.dashboard-section-title { font-size: .7rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.35); margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,.06); }

.dashboard-holdings { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }
.dashboard-holding-card {
  background: linear-gradient(135deg, rgba(249,115,22,.09), rgba(251,191,36,.04));
  border: 1px solid rgba(249,115,22,.22); border-radius: 14px; padding: 22px;
  transition: border-color .2s, box-shadow .2s;
}
.dashboard-holding-card:hover { border-color: rgba(249,115,22,.4); box-shadow: 0 8px 28px rgba(249,115,22,.12); }
.dashboard-holding-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.dashboard-holding-symbol { font-weight: 800; font-size: 1rem; color: var(--accent); }
.dashboard-holding-badge { font-size: .68rem; background: rgba(34,197,94,.18); color: #4ade80; border-radius: 20px; padding: 3px 9px; font-weight: 700; }
.dashboard-holding-val { font-size: 1.65rem; font-weight: 900; color: #fff; margin-bottom: 4px; }
.dashboard-holding-sub { font-size: .72rem; color: rgba(255,255,255,.38); margin-bottom: 10px; }
.dashboard-holding-apy { font-size: .8rem; color: #4ade80; font-weight: 700; }

.dashboard-empty { text-align: center; padding: 48px 24px; }
.dashboard-tx-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--accent); font-size: .88rem; font-weight: 600; text-decoration: none;
  border: 1px solid rgba(249,115,22,.28); border-radius: 9px; padding: 11px 18px;
  background: rgba(249,115,22,.07); transition: background .2s, border-color .2s;
}
.dashboard-tx-link:hover { background: rgba(249,115,22,.16); border-color: var(--accent); }

.dashboard-gate { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.dashboard-gate-card {
  text-align: center; max-width: 380px; padding: 52px 36px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09);
  border-radius: 20px; box-shadow: 0 8px 40px rgba(0,0,0,.3);
}
.btn-outline-sm {
  display: inline-flex; align-items: center; gap: 6px; background: transparent;
  border: 1px solid rgba(255,255,255,.2); color: rgba(255,255,255,.65);
  border-radius: 8px; padding: 8px 16px; font-size: .8rem; font-weight: 600;
  cursor: pointer; text-decoration: none; transition: border-color .18s, color .18s; white-space: nowrap;
}
.btn-outline-sm:hover { border-color: rgba(255,255,255,.5); color: #fff; }

/* s14-patch-end */
`;

fs.writeFileSync('src/index.css', css + patch, 'utf8');
console.log('OK index.css');
```

### `./gen_dashboard.js`
```js
const fs = require('fs');
const content = `import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useLivePrices } from '../hooks/useLivePrices';

const OPWAP_ADDR = (import.meta as any).env?.VITE_OPWAP_TOKEN_ADDRESS || 'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp';

export default function Dashboard() {
  const { connected, walletAddr, walletSats } = useAppStore();
  const { btcPrice } = useLivePrices();
  const [opwapBal, setOpwapBal] = useState<number | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const btcVal = walletSats != null ? walletSats / 1e8 : 0;
  const usdVal = btcPrice ? btcVal * btcPrice : 0;

  useEffect(() => {
    if (!connected || !walletAddr) { setLoading(false); return; }
    let cancelled = false;
    async function load() {
      try {
        const mod = await import('@btc-vision/transaction');
        const { JSONRpcProvider, getContract, networks } = mod;
        const NET = (networks as any).opnetTestnet;
        const provider = new JSONRpcProvider({ url: 'https://testnet.opnet.org', network: NET });
        const ABI: any[] = [
          { name: 'balanceOf', type: 'function', inputs: [{ name: 'address', type: 'address' }], outputs: [{ name: 'balance', type: 'uint256' }] },
          { name: 'totalSupply', type: 'function', inputs: [], outputs: [{ name: 'supply', type: 'uint256' }] },
        ];
        const c = getContract<any>(OPWAP_ADDR, ABI, provider, NET);
        const [b, s] = await Promise.allSettled([c.balanceOf(walletAddr), c.totalSupply()]);
        if (cancelled) return;
        if (b.status === 'fulfilled') {
          const raw = (b.value as any)?.properties?.balance ?? (b.value as any)?.result?.balance ?? (b.value as any)?.balance;
          if (raw != null) setOpwapBal(Number(raw));
        }
        if (s.status === 'fulfilled') {
          const raw = (s.value as any)?.properties?.supply ?? (s.value as any)?.result?.supply ?? (s.value as any)?.supply;
          if (raw != null) setTotalSupply(Number(raw));
        }
      } catch(e) { console.warn('[Dashboard]', e); }
      finally { if (!cancelled) setLoading(false); }
    }
    load();
    const iv = setInterval(load, 30000);
    return () => { cancelled = true; clearInterval(iv); };
  }, [connected, walletAddr]);

  if (!connected) return (
    <div className="dashboard-gate">
      <div className="dashboard-gate-card">
        <div style={{fontSize:'3rem',marginBottom:'16px'}}>lock</div>
        <h2 style={{marginBottom:'8px'}}>Connect Your Wallet</h2>
        <p style={{color:'rgba(255,255,255,.45)',marginBottom:'24px'}}>Connect to view your portfolio dashboard.</p>
        <Link to="/" className="btn-primary" style={{display:'inline-block',textDecoration:'none',padding:'12px 28px'}}>Go to Home</Link>
      </div>
    </div>
  );

  const short = walletAddr ? walletAddr.slice(0,8) + '...' + walletAddr.slice(-6) : '';
  const supplyPct = totalSupply != null ? Math.min((totalSupply / 1e8 / 1e9) * 100, 100) : 0;
  const opwapDisplay = loading ? '...' : (opwapBal != null ? (opwapBal / 1e8).toFixed(4) : '0.0000');
  const opwapUsd = opwapBal != null && btcPrice ? ((opwapBal / 1e8) * 0.001 * btcPrice).toFixed(2) : '0.00';

  const stats = [
    { label: 'BTC Balance', value: btcVal.toFixed(6), unit: 'BTC', color: '#f97316', sub: 'approx USD ' + usdVal.toFixed(2) },
    { label: 'OPWAP Tokens', value: opwapDisplay, unit: 'OPWAP', color: '#fbbf24', sub: 'approx USD ' + opwapUsd },
    { label: 'Est. Annual Yield', value: '15%', unit: 'APY', color: '#22c55e', sub: 'Platform target rate' },
    { label: 'Network', value: 'Testnet4', unit: '', color: '#60a5fa', sub: 'OP_NET Signet fork' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Portfolio Dashboard</h1>
            <p className="dashboard-addr">{short}</p>
          </div>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="btn-outline-sm">
            View on OPScan
          </a>
        </div>

        <div className="dashboard-stats">
          {stats.map(s => (
            <div key={s.label} className="dashboard-stat-card">
              <div className="dashboard-stat-label">{s.label}</div>
              <div className="dashboard-stat-value" style={{color: s.color}}>
                {s.value}{s.unit && <span className="dashboard-stat-unit"> {s.unit}</span>}
              </div>
              <div className="dashboard-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {totalSupply != null && (
          <div className="dashboard-supply">
            <div className="dashboard-supply-header">
              <span>OPWAP Supply Minted</span>
              <span className="dashboard-supply-pct">{supplyPct.toFixed(4)}%</span>
            </div>
            <div className="dashboard-supply-bar">
              <div className="dashboard-supply-fill" style={{width: Math.max(supplyPct, 0.1) + '%'}} />
            </div>
            <div className="dashboard-supply-numbers">
              <span>{(totalSupply / 1e8).toLocaleString()} OPWAP minted</span>
              <span>1,000,000,000 max supply</span>
            </div>
          </div>
        )}

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Your Holdings</h2>
          {opwapBal != null && opwapBal > 0 ? (
            <div className="dashboard-holdings">
              <div className="dashboard-holding-card">
                <div className="dashboard-holding-header">
                  <span className="dashboard-holding-symbol">OPWAP</span>
                  <span className="dashboard-holding-badge">Active</span>
                </div>
                <div className="dashboard-holding-val">{(opwapBal / 1e8).toFixed(4)}</div>
                <div className="dashboard-holding-sub">OPWAProperty Token - Asset Alpha</div>
                <div className="dashboard-holding-apy">15% APY</div>
              </div>
            </div>
          ) : (
            <div className="dashboard-empty">
              <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>empty</div>
              <p style={{color:'rgba(255,255,255,.35)'}}>No holdings yet. <Link to="/#assets" style={{color:'var(--accent)'}}>Invest in an asset</Link> to start.</p>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Transaction History</h2>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="dashboard-tx-link">
            View all transactions on OPScan Explorer
          </a>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/Dashboard.tsx', content, 'utf8');
console.log('OK Dashboard.tsx');
```

### `./gen_nav.js`
```js
const fs = require('fs');
const content = `import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useWallet } from '../hooks/useWallet';
import { useLivePrices } from '../hooks/useLivePrices';

export function Navigation() {
  const { connected, walletAddr, walletSats, theme, setTheme } = useAppStore();
  const { connect, disconnect } = useWallet();
  const { btcPrice, gasPrice } = useLivePrices();
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const short = walletAddr ? walletAddr.slice(0, 6) + '...' + walletAddr.slice(-4) : '';
  const balBtc = walletSats != null ? (walletSats / 1e8).toFixed(6) : null;
  const balUsd = btcPrice && walletSats != null ? ((walletSats / 1e8) * btcPrice).toFixed(2) : null;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Assets', href: '/#assets' },
    { label: 'Simulator', href: '/#simulator' },
    { label: 'How It Works', href: '/#how-it-works' },
  ];

  const wallets = [
    { id: 'opwallet', name: 'OP_Wallet', desc: 'Official OP_NET wallet', badge: 'Recommended', color: '#f97316' },
    { id: 'unisat',   name: 'Unisat',    desc: 'Bitcoin native · OP_NET compatible', badge: null, color: '#f59e0b' },
    { id: 'xverse',   name: 'Xverse',    desc: 'Bitcoin · Ordinals · OP_NET', badge: null, color: '#8b5cf6' },
    { id: 'okx',      name: 'OKX Wallet', desc: 'Multi-chain · Web3', badge: null, color: '#64748b' },
  ];

  const btcPriceStr = btcPrice ? '$' + btcPrice.toLocaleString() : '';

  return (
    <>
      <nav className="nav-bar" role="navigation">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-op">OP</span>
            <span className="nav-logo-opwa">OPWA</span>
            <span className="nav-logo-platform">Platform</span>
          </Link>

          <div className="nav-links-desktop">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            {connected && (
              <Link
                to="/dashboard"
                className={'nav-link nav-link-dashboard' + (location.pathname === '/dashboard' ? ' active' : '')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                </svg>
                Dashboard
              </Link>
            )}
          </div>

          <div className="nav-gas">
            <span className="nav-gas-dot" />
            <span className="nav-gas-label">Gas</span>
            <span className="nav-gas-value">{gasPrice != null ? gasPrice + ' sat/vB' : '—'}</span>
            {btcPrice && <span className="nav-gas-btc">{btcPriceStr}</span>}
          </div>

          <button className="nav-theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {!connected ? (
            <button className="nav-connect-btn" onClick={() => setWalletModal(true)}>Connect Wallet</button>
          ) : (
            <div className="nav-wallet-wrap">
              <button className="nav-wallet-btn" onClick={() => setDropdownOpen(o => !o)}>
                <span className="nav-wallet-dot" />
                <span>{short}</span>
                {balBtc && <span className="nav-wallet-bal">&#x20BF; {balBtc}</span>}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-addr">{walletAddr}</div>
                  {balUsd && <div className="nav-dropdown-bal">approx. {balUsd} USD</div>}
                  <hr className="nav-dropdown-sep"/>
                  <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="nav-dropdown-link">View on OPScan</a>
                  <button className="nav-dropdown-disc" onClick={() => { disconnect(); setDropdownOpen(false); }}>Disconnect</button>
                </div>
              )}
            </div>
          )}

          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="nav-mobile-menu">
            {navLinks.map(l => <a key={l.href} href={l.href} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</a>)}
            {connected && <Link to="/dashboard" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
            {!connected
              ? <button className="nav-connect-btn" style={{margin:'12px 16px'}} onClick={() => { setWalletModal(true); setMenuOpen(false); }}>Connect Wallet</button>
              : <button className="nav-dropdown-disc" style={{margin:'12px 16px'}} onClick={() => { disconnect(); setMenuOpen(false); }}>Disconnect</button>
            }
          </div>
        )}
      </nav>

      {walletModal && (
        <div className="modal-overlay" onClick={() => setWalletModal(false)}>
          <div className="wallet-modal" onClick={e => e.stopPropagation()}>
            <div className="wallet-modal-header">
              <h2>Connect Wallet</h2>
              <button className="wallet-modal-close" onClick={() => setWalletModal(false)}>x</button>
            </div>
            <p className="wallet-modal-sub">Choose your Bitcoin wallet to connect to the OP_NET platform.</p>
            {wallets.map(w => (
              <button key={w.id} className="wallet-option" onClick={() => { connect(w.id); setWalletModal(false); }}>
                <span className="wallet-option-icon" style={{background: w.color + '22', border: '1.5px solid ' + w.color + '55'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={w.color}><circle cx="12" cy="12" r="9"/></svg>
                </span>
                <span className="wallet-option-info">
                  <span className="wallet-option-name">{w.name}</span>
                  <span className="wallet-option-desc">{w.desc}</span>
                </span>
                {w.badge && <span className="wallet-option-badge">{w.badge}</span>}
              </button>
            ))}
            <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noreferrer" className="wallet-get-banner">
              No OP_Wallet? Install from Chrome Web Store
            </a>
          </div>
        </div>
      )}
    </>
  );
}
`;
fs.writeFileSync('src/components/Navigation.tsx', content, 'utf8');
console.log('OK Navigation.tsx');
```

### `./src/App.tsx`
```tsx
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import { useAppStore } from './store/useAppStore'
import { useLivePrices } from './hooks/useLivePrices'

export default function App() {
  useLivePrices()
  const theme = useAppStore(s => s.theme)
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Layout>
  )
}
```

### `./src/components/BuyTokenModal.tsx`
```tsx
import React, { useState } from 'react';
import { X, Bitcoin, TrendingUp } from 'lucide-react';
import type { Property } from '@/types';
import { formatSatsToBTC, formatNumber } from '@/lib/utils';

interface BuyTokenModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (amount: number, totalPrice: number) => Promise<void>;
}

export const BuyTokenModal: React.FC<BuyTokenModalProps> = ({ 
  property, 
  isOpen, 
  onClose, 
  onBuy 
}) => {
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !property) return null;

  const amountNum = parseFloat(amount) || 0;
  const totalPrice = amountNum * property.pricePerToken;

  const handleBuy = async () => {
    if (amountNum <= 0 || amountNum > property.availableTokens) {
      alert('Invalid amount');
      return;
    }

    setIsLoading(true);
    try {
      await onBuy(amountNum, totalPrice);
      onClose();
      setAmount('');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Buy Property Tokens
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Property Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {property.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {property.city}, {property.country}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Token Price</p>
              <p className="font-mono font-semibold text-gray-900 dark:text-white">
                {formatSatsToBTC(property.pricePerToken)} BTC
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(property.availableTokens)} tokens
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount of Tokens
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="1"
                max={property.availableTokens}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                tokens
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Min: 1 token</span>
              <span>Max: {formatNumber(property.availableTokens)} tokens</span>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Token Price</span>
                <span className="text-sm font-mono">{formatSatsToBTC(property.pricePerToken)} BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                <span className="text-sm font-mono">{amountNum.toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-600">
                <span>Total Cost</span>
                <span className="font-mono text-bitcoin-orange">
                  {formatSatsToBTC(totalPrice)} BTC
                </span>
              </div>
            </div>
          </div>

          {/* Investment Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Investment Information
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  You will receive {amountNum.toLocaleString()} tokens representing fractional ownership 
                  of this property. Expected APY: {property.apy}%.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleBuy}
              disabled={isLoading || amountNum <= 0 || amountNum > property.availableTokens}
              className="flex-1 bg-bitcoin-orange hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Bitcoin className="w-4 h-4" />
                  Buy Tokens
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### `./src/components/Footer.tsx`
```tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => (
  <footer>
    <div className="footer-grid">
      <div className="footer-brand">
        <div style={{fontWeight:'800',fontSize:'1.1rem',letterSpacing:'-0.02em'}}>
          <span style={{color:'var(--accent)'}}>OP</span>WA
        </div>
        <p>Real estate tokenization on Bitcoin Layer 1 via OP_NET. Borderless, trustless, and transparent.</p>
        <div style={{marginTop:'16px'}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(16,185,129,0.1)',color:'#10b981',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#10b981',display:'inline-block'}}></span>
            Testnet Live
          </span>
        </div>
      </div>

      <div>
        <div className="footer-col-title">Platform</div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Assets</Link>
          <Link to="/simulator" className="footer-link">Simulator</Link>
          <Link to="/dashboard" className="footer-link">Portfolio</Link>
          <Link to="/marketplace" className="footer-link">Marketplace</Link>
        </div>
      </div>

      <div>
        <div className="footer-col-title">Developers</div>
        <div className="footer-links">
          <a href="https://github.com/Opwabtc/OPWABTC" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://ai.opnet.org" target="_blank" rel="noopener noreferrer" className="footer-link">Build on OP_NET</a>
          <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener noreferrer" className="footer-link">OPScan Explorer</a>
          <a href="https://mempool.opnet.org/pt/testnet4" target="_blank" rel="noopener noreferrer" className="footer-link">Mempool</a>
        </div>
      </div>

      <div>
        <div className="footer-col-title">Resources</div>
        <div className="footer-links">
          <a href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/whitepaper.md" target="_blank" rel="noopener noreferrer" className="footer-link">Whitepaper</a>
          <a href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/technical-architecture.md" target="_blank" rel="noopener noreferrer" className="footer-link">Architecture</a>
          <a href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/security-model.md" target="_blank" rel="noopener noreferrer" className="footer-link">Security Model</a>
          <a href="https://op-real-estate-platform.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-link">Live Platform</a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="footer-legal">
        © 2026 OPWA · Real Estate on Bitcoin · Built with OP_NET ·
        <Link to="/terms" style={{color:'var(--text-3)',marginLeft:'8px'}}>Terms</Link>
        <Link to="/privacy" style={{color:'var(--text-3)',marginLeft:'8px'}}>Privacy</Link>
        <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener noreferrer" style={{color:'var(--text-3)',marginLeft:'8px'}}>OPScan</a>
        <a href="https://mempool.opnet.org/pt/testnet4" target="_blank" rel="noopener noreferrer" style={{color:'var(--text-3)',marginLeft:'8px'}}>Mempool</a>
      </div>
      <div className="footer-copy">⚠️ Testnet only — no real assets at risk</div>
    </div>
  </footer>
);
```

### `./src/components/GasConverterWidget.tsx`
```tsx
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

export function GasConverterWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const { gasPrice, btcPrice } = useAppStore()
  const gasSat = gasPrice || 10
  const txUsd = btcPrice ? ((gasSat * 250) / 1e8 * btcPrice).toFixed(4) : null

  const convert = () => {
    const val = parseFloat(input)
    if (!val || isNaN(val)) { setResult('Enter a valid BTC amount'); return }
    if (!btcPrice) { setResult('Price unavailable'); return }
    setResult((val * btcPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
  }

  return (
    <>
      {/* Widget panel */}
      <div className={'gas-converter-widget' + (open ? ' open' : '')} id="gasWidget">
        <div className="gcw-header">
          <span className="gcw-title">Gas Converter</span>
          <div className="gcw-live">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
            Live
          </div>
        </div>

        <div className="gcw-rows">
          <div className="gcw-row">
            <div className="gcw-row-label">
              <div className="gcw-row-icon gas">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
                </svg>
              </div>
              Gas
            </div>
            <span className="gcw-row-val">{gasSat} sat/vB</span>
          </div>
          <div className="gcw-row">
            <div className="gcw-row-label">
              <div className="gcw-row-icon btc">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              BTC Price
            </div>
            <span className="gcw-row-val accent">{btcPrice ? '$' + btcPrice.toLocaleString('en-US') : '—'}</span>
          </div>
          <div className="gcw-row">
            <div className="gcw-row-label">
              <div className="gcw-row-icon usd">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
              </div>
              Tx Cost
            </div>
            <span className="gcw-row-val gold">{txUsd ? '~$' + txUsd : '—'}</span>
          </div>
        </div>

        <div className="gcw-divider" />

        <div className="gcw-input-row">
          <input
            className="gcw-input"
            type="number"
            placeholder="BTC amount"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="gcw-convert-btn" onClick={convert}>→</button>
        </div>
        {result && <div className="gcw-result">{result}</div>}
      </div>

      {/* Botão toggle fixo bottom-right
          Fechado: borda #ae005b, fundo transparente, ícone #ae005b
          Aberto:  fundo #ae005b sólido, ícone branco */}
      <button
        onClick={() => setOpen(v => !v)}
        title={open ? 'Close Gas Converter' : 'Gas Converter'}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 999,
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: '2px solid #ae005b',
          background: open ? '#ae005b' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s, box-shadow 0.2s',
          boxShadow: open
            ? '0 0 0 4px rgba(174,0,91,0.25), 0 4px 20px rgba(174,0,91,0.4)'
            : '0 4px 16px rgba(174,0,91,0.3)',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? 'white' : '#ae005b'}
          strokeWidth="2.2"
        >
          <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
        </svg>
      </button>
    </>
  )
}
```

### `./src/components/Layout.tsx`
```tsx
import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Navigation } from './Navigation'
import { GasConverterWidget } from './GasConverterWidget'
import { ToastContainer } from './ToastContainer'

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useAppStore(s => s.theme)
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  return (
    <>
      <Navigation />
      <div style={{ paddingTop: 'var(--navbar-h)' }}>{children}</div>
      <GasConverterWidget />
      <ToastContainer />
    </>
  )
}
```

### `./src/components/Navigation.tsx`
```tsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'

export function Navigation() {
  const { connected, walletAddr, walletSats, btcPrice, gasPrice, theme, setTheme } = useAppStore()
  const { connect, disconnect } = useWallet()
  const [menuOpen, setMenuOpen] = useState(false)
  const [walletModal, setWalletModal] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  const short = walletAddr ? walletAddr.slice(0, 6) + '...' + walletAddr.slice(-4) : ''
  const balBtc = walletSats != null ? (walletSats / 1e8).toFixed(6) : null
  const btcPriceStr = btcPrice ? '$' + btcPrice.toLocaleString() : null
  const gasPriceStr = gasPrice != null ? gasPrice + ' sat/vB' : '—'

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Assets', href: '/#assets' },
    { label: 'Simulator', href: '/#simulator' },
    { label: 'How It Works', href: '/#how-it-works' },
  ]

  const wallets = [
    { id: 'opwallet', name: 'OP_Wallet', desc: 'Official OP_NET wallet', badge: 'Recommended', color: '#f97316' },
    { id: 'unisat',   name: 'Unisat',    desc: 'Bitcoin native · OP_NET compatible', badge: null, color: '#f59e0b' },
    { id: 'xverse',   name: 'Xverse',    desc: 'Bitcoin · Ordinals · OP_NET', badge: null, color: '#8b5cf6' },
    { id: 'okx',      name: 'OKX Wallet', desc: 'Multi-chain · Web3', badge: null, color: '#64748b' },
  ]

  return (
    <>
      <nav className="nav-bar" role="navigation">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-op">OP</span>
            <span className="nav-logo-opwa">OPWA</span>
            <span className="nav-logo-platform">Platform</span>
          </Link>

          <div className="nav-links-desktop">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            {connected && (
              <Link
                to="/dashboard"
                className={'nav-link nav-link-dashboard' + (location.pathname === '/dashboard' ? ' active' : '')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                </svg>
                Dashboard
              </Link>
            )}
          </div>

          <div className="nav-gas">
            <span className="nav-gas-dot" />
            <span className="nav-gas-label">Gas</span>
            <span className="nav-gas-value">{gasPriceStr}</span>
            {btcPriceStr && <span className="nav-gas-btc">{btcPriceStr}</span>}
          </div>

          <button className="nav-theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {!connected ? (
            <button className="nav-connect-btn" onClick={() => setWalletModal(true)}>Connect Wallet</button>
          ) : (
            <div className="nav-wallet-wrap">
              <button className="nav-wallet-btn" onClick={() => setDropdownOpen(o => !o)}>
                <span className="nav-wallet-dot" />
                <span>{short}</span>
                {balBtc && <span className="nav-wallet-bal">&#x20BF; {balBtc}</span>}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-addr">{walletAddr}</div>
                  <hr className="nav-dropdown-sep"/>
                  <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="nav-dropdown-link">View on OPScan</a>
                  <button className="nav-dropdown-disc" onClick={() => { disconnect(); setDropdownOpen(false) }}>Disconnect</button>
                </div>
              )}
            </div>
          )}

          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="nav-mobile-menu">
            {navLinks.map(l => <a key={l.href} href={l.href} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</a>)}
            {connected && <Link to="/dashboard" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
            {!connected
              ? <button className="nav-connect-btn" style={{margin:'12px 16px'}} onClick={() => { setWalletModal(true); setMenuOpen(false) }}>Connect Wallet</button>
              : <button className="nav-dropdown-disc" style={{margin:'12px 16px'}} onClick={() => { disconnect(); setMenuOpen(false) }}>Disconnect</button>
            }
          </div>
        )}
      </nav>

      {walletModal && (
        <div className="modal-overlay" onClick={() => setWalletModal(false)}>
          <div className="wallet-modal" onClick={e => e.stopPropagation()}>
            <div className="wallet-modal-header">
              <h2>Connect Wallet</h2>
              <button className="wallet-modal-close" onClick={() => setWalletModal(false)}>x</button>
            </div>
            <p className="wallet-modal-sub">Choose your Bitcoin wallet to connect to the OP_NET platform.</p>
            {wallets.map(w => (
              <button key={w.id} className="wallet-option" onClick={() => { connect(w.id); setWalletModal(false) }}>
                <span className="wallet-option-icon" style={{background: w.color + '22', border: '1.5px solid ' + w.color + '55'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={w.color}><circle cx="12" cy="12" r="9"/></svg>
                </span>
                <span className="wallet-option-info">
                  <span className="wallet-option-name">{w.name}</span>
                  <span className="wallet-option-desc">{w.desc}</span>
                </span>
                {w.badge && <span className="wallet-option-badge">{w.badge}</span>}
              </button>
            ))}
            <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noreferrer" className="wallet-get-banner">
              No OP_Wallet? Install from Chrome Web Store
            </a>
          </div>
        </div>
      )}
    </>
  )
}
```

### `./src/components/NotificationSystem.tsx`
```tsx
export function NotificationSystem() { return null }
```

### `./src/components/PortfolioChart.tsx`
```tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import type { PriceHistory } from '@/types';
import { formatSatsToBTC, formatNumber } from '@/lib/utils';

interface PortfolioChartProps {
  data: PriceHistory[];
  title?: string;
  type?: 'line' | 'area';
  height?: number;
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ 
  data, 
  title = 'Portfolio Performance', 
  type = 'area',
  height = 300 
}) => {
  const ChartComponent = type === 'line' ? LineChart : AreaChart;
  const DataComponent = type === 'line' ? Line : Area;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => formatSatsToBTC(value)}
          />
          <Tooltip 
            formatter={(value) => [formatSatsToBTC(Number(value || 0)), 'Price (BTC)']}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              });
            }}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#f3f4f6'
            }}
          />
          <DataComponent
            type="monotone"
            dataKey="price"
            stroke="#f7931a"
            fill="#f7931a"
            fillOpacity={type === 'area' ? 0.3 : 1}
            strokeWidth={2}
            dot={false}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

interface PortfolioStatsProps {
  totalValueBTC: number;
  totalValueUSD: number;
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export const PortfolioStats: React.FC<PortfolioStatsProps> = ({ 
  totalValueBTC, 
  totalValueUSD, 
  performance 
}) => {
  const stats = [
    {
      label: 'Total Value',
      valueBTC: formatSatsToBTC(totalValueBTC),
      valueUSD: `$${formatNumber(totalValueUSD)}`,
      change: performance.daily,
      period: '24h'
    },
    {
      label: 'Weekly Change',
      valueBTC: formatSatsToBTC(totalValueBTC * (performance.weekly / 100)),
      valueUSD: `$${formatNumber(totalValueUSD * (performance.weekly / 100))}`,
      change: performance.weekly,
      period: '7d'
    },
    {
      label: 'Monthly Change',
      valueBTC: formatSatsToBTC(totalValueBTC * (performance.monthly / 100)),
      valueUSD: `$${formatNumber(totalValueUSD * (performance.monthly / 100))}`,
      change: performance.monthly,
      period: '30d'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.valueBTC} BTC
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({stat.valueUSD})
                </span>
              </div>
            </div>
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              stat.change >= 0 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {stat.period} performance
          </p>
        </div>
      ))}
    </div>
  );
};
```

### `./src/components/PropertyCard.tsx`
```tsx
import React from 'react';
import { MapPin, Home, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import type { Property } from '@/types';
import { formatSatsToBTC, formatNumber, formatDate } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  onBuyClick?: (property: Property) => void;
  onDetailsClick?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onBuyClick, 
  onDetailsClick 
}) => {
  const availablePercentage = ((property.availableTokens / property.totalSupply) * 100).toFixed(1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800';
          }}
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            property.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : property.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
            {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
          </span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {property.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-1" />
            {property.city}, {property.country}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm">
            <Home className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {property.squareMeters}m²
              {property.bedrooms && ` • ${property.bedrooms} bed`}
              {property.bathrooms && ` • ${property.bathrooms} bath`}
            </span>
          </div>
          
          {property.apy && (
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                {property.apy}% APY
              </span>
            </div>
          )}
        </div>

        {/* Token Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Token Price</span>
            <span className="font-mono font-medium">
              {formatSatsToBTC(property.pricePerToken)} BTC
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
            <span className="text-sm">
              {formatNumber(property.availableTokens)} / {formatNumber(property.totalSupply)} 
              <span className="text-gray-500 ml-1">({availablePercentage}%)</span>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
            <span className="font-mono font-medium">
              {formatSatsToBTC(property.totalValue)} BTC
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Funding Progress</span>
            <span>{availablePercentage}% Available</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${100 - parseFloat(availablePercentage)}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onBuyClick?.(property)}
            disabled={property.availableTokens === 0}
            className="flex-1 bg-bitcoin-orange hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Buy Tokens
          </button>
          
          <button
            onClick={() => onDetailsClick?.(property)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            View Details
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Listed {formatDate(property.createdAt)}
            </div>
            {property.monthlyRent && (
              <div>
                Monthly Rent: {formatSatsToBTC(property.monthlyRent)} BTC
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### `./src/components/SellTokenModal.tsx`
```tsx
import React, { useState } from 'react';
import { X, TrendingDown, AlertTriangle } from 'lucide-react';
import type { PropertyToken } from '@/types';
import { formatSatsToBTC, formatNumber } from '@/lib/utils';

interface SellTokenModalProps {
  token: PropertyToken | null;
  isOpen: boolean;
  onClose: () => void;
  onSell: (amount: number, totalPrice: number) => Promise<void>;
}

export const SellTokenModal: React.FC<SellTokenModalProps> = ({ 
  token, 
  isOpen, 
  onClose, 
  onSell 
}) => {
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !token) return null;

  const amountNum = parseFloat(amount) || 0;
  const currentPrice = token.pricePerToken; // In a real app, this would be current market price
  const totalPrice = amountNum * currentPrice;

  const handleSell = async () => {
    if (amountNum <= 0 || amountNum > token.balance) {
      alert('Invalid amount');
      return;
    }

    setIsLoading(true);
    try {
      await onSell(amountNum, totalPrice);
      onClose();
      setAmount('');
    } catch (error) {
      console.error('Sale failed:', error);
      alert('Sale failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Sell Property Tokens
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Token Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              {token.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Symbol: {token.symbol}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
              <p className="font-mono font-semibold text-gray-900 dark:text-white">
                {formatSatsToBTC(currentPrice)} BTC
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Balance</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(token.balance)} tokens
              </p>
            </div>
          </div>
        </div>

        {/* Sale Form */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount to Sell
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="1"
                max={token.balance}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                tokens
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Min: 1 token</span>
              <span>Max: {formatNumber(token.balance)} tokens</span>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Token Price</span>
                <span className="text-sm font-mono">{formatSatsToBTC(currentPrice)} BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                <span className="text-sm font-mono">{amountNum.toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-600">
                <span>You'll Receive</span>
                <span className="font-mono text-bitcoin-orange">
                  {formatSatsToBTC(totalPrice)} BTC
                </span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                  Important Notice
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                  Selling tokens will reduce your ownership percentage and future rental income. 
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSell}
              disabled={isLoading || amountNum <= 0 || amountNum > token.balance}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4" />
                  Sell Tokens
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### `./src/components/ThemeToggle.tsx`
```tsx
import { useAppStore } from '../store/useAppStore'
export function ThemeToggle() {
  const { theme, setTheme } = useAppStore()
  return (
    <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
      <div className="theme-toggle-track">
        <svg className={`theme-toggle-icon ${theme === 'light' ? 'active' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg className={`theme-toggle-icon ${theme === 'dark' ? 'active' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      </div>
      <div className="theme-toggle-thumb" />
    </button>
  )
}
```

### `./src/components/ToastContainer.tsx`
```tsx
import { useEffect, useState } from 'react'
interface Toast { id: number; type: string; title: string; desc: string }
export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])
  useEffect(() => {
    const h = (e: Event) => {
      const { type, title, desc } = (e as CustomEvent).detail
      const id = Date.now()
      setToasts(t => [...t, { id, type, title, desc }])
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000)
    }
    window.addEventListener('opwa-toast', h)
    return () => window.removeEventListener('opwa-toast', h)
  }, [])
  const icons: Record<string,string> = {
    success: '<polyline points="20 6 9 17 4 12"/>',
    error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/>',
  }
  return (
    <div className="toast-area">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <svg className={`toast-icon ${t.type}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            dangerouslySetInnerHTML={{ __html: icons[t.type] || icons.info }} />
          <div className="toast-body">
            <div className="toast-title">{t.title}</div>
            <div className="toast-desc">{t.desc}</div>
          </div>
          <button className="toast-close" onClick={() => setToasts(x => x.filter(i => i.id !== t.id))}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
```

### `./src/components/WalletButton.tsx`
```tsx
export function WalletButton() { return null }
```

### `./src/components/WalletDropdown.tsx`
```tsx
import React from 'react';
import { Copy, ExternalLink, LogOut } from 'lucide-react';

interface WalletDropdownProps {
  isOpen: boolean;
  address: string;
  balance: string;
  balanceUsd: string;
  onCopyAddress: () => void;
  onDisconnect: () => void;
  onViewExplorer: () => void;
}

export const WalletDropdown: React.FC<WalletDropdownProps> = ({
  isOpen,
  address,
  balance,
  balanceUsd,
  onCopyAddress,
  onDisconnect,
  onViewExplorer
}) => {
  if (!isOpen) return null;

  return (
    <div className="wallet-dropdown open">
      <div className="wd-address">{address}</div>
      <div className="wd-balance">₿ {balance}</div>
      <div className="wd-balance-usd">≈ ${balanceUsd}</div>
      <div className="wd-divider"></div>
      <div className="wd-actions">
        <button className="wd-action" onClick={onCopyAddress}>
          <Copy size={15} />
          Copy Address
        </button>
        <button className="wd-action" onClick={onViewExplorer}>
          <ExternalLink size={15} />
          View on Explorer
        </button>
        <div className="wd-divider"></div>
        <button className="wd-action danger" onClick={onDisconnect}>
          <LogOut size={15} />
          Disconnect
        </button>
      </div>
    </div>
  );
};
```

### `./src/components/WalletModal.tsx`
```tsx
import { useEffect, useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { useAppStore } from '../store/useAppStore'

interface Props { open: boolean; onClose: () => void }

// Logos reais de cada wallet em SVG/PNG via CDN
function OPWalletLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#f97316"/>
      <text x="50" y="68" textAnchor="middle" fontSize="52" fontWeight="900" fontFamily="Arial" fill="white">OP</text>
    </svg>
  )
}
function UnisatLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#1a1a1a"/>
      <circle cx="50" cy="50" r="28" stroke="#f97316" strokeWidth="8"/>
      <circle cx="50" cy="50" r="12" fill="#f97316"/>
    </svg>
  )
}
function XverseLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#7B3FE4"/>
      <text x="50" y="68" textAnchor="middle" fontSize="52" fontWeight="900" fontFamily="Arial" fill="white">X</text>
    </svg>
  )
}
function OKXLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#000"/>
      <rect x="28" y="28" width="16" height="16" fill="white"/>
      <rect x="52" y="28" width="16" height="16" fill="white"/>
      <rect x="28" y="56" width="16" height="16" fill="white"/>
      <rect x="52" y="56" width="16" height="16" fill="white"/>
      <rect x="40" y="40" width="16" height="16" fill="white"/>
    </svg>
  )
}

const WALLETS = [
  { name: 'Unisat', desc: 'Popular Bitcoin wallet', Logo: UnisatLogo },
  { name: 'Xverse', desc: 'Bitcoin & Ordinals wallet', Logo: XverseLogo },
  { name: 'OKX', desc: 'OKX multi-chain wallet', Logo: OKXLogo },
]

export function WalletModal({ open, onClose }: Props) {
  const { connect } = useWallet()
  const network = useAppStore(s => s.network)
  const setWallet = useAppStore(s => s.setWallet)
  const [opInstalled, setOpInstalled] = useState(true)

  useEffect(() => { if (open) setOpInstalled(!!(window as any).opnet) }, [open])
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const handleConnect = async (name: string) => { await connect(name); onClose() }

  return (
    <div className={`modal-backdrop ${open ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Connect Wallet</span>
          <button className="modal-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <p className="modal-subtitle">Connect your Bitcoin wallet to invest in tokenized real estate.</p>

        <div className="wallet-options">
          {/* OP_Wallet — primário */}
          <button className="wallet-option wallet-option-primary" onClick={() => handleConnect('OP_Wallet')}>
            <div className="wallet-option-icon wallet-option-icon-primary">
              <OPWalletLogo />
            </div>
            <div>
              <div className="wallet-option-name">OP_Wallet</div>
              <div className="wallet-option-desc">Official OP_NET wallet — recommended</div>
            </div>
            <span className="wallet-option-badge">Official</span>
          </button>

          {/* Aviso + download se não instalado */}
          {!opInstalled && (
            <a
              href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 16px', borderRadius: 12, textDecoration: 'none',
                background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.35)',
                fontSize: 12, color: 'var(--text-1)', transition: 'background .2s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: 1 }}>OP_Wallet not detected</div>
                <div style={{ color: 'var(--text-3)' }}>Click to install from Chrome Web Store →</div>
              </div>
            </a>
          )}

          {/* Outras wallets */}
          {WALLETS.map(({ name, desc, Logo }) => (
            <button key={name} className="wallet-option" onClick={() => handleConnect(name)}>
              <div className="wallet-option-icon">
                <Logo />
              </div>
              <div>
                <div className="wallet-option-name">{name}</div>
                <div className="wallet-option-desc">{desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Network selector */}
        <div style={{ marginTop: 20 }}>
          <div className="network-selector-label">Network</div>
          <div className="network-options">
            {['OP_NET Testnet', 'Mainnet'].map(n => (
              <button key={n} className={`network-option ${network === n ? 'active' : ''}`} onClick={() => setWallet({ network: n })}>
                <div className="network-option-name">{n}</div>
                <div className="network-option-status">
                  <span className="dot" style={{ background: n === 'OP_NET Testnet' ? 'var(--success)' : 'var(--text-3)' }}/>
                  {n === 'OP_NET Testnet' ? 'Live' : 'Soon'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

### `./src/contracts/config.ts`
```ts
/**
 * Contract addresses on OPNet testnet (Signet fork).
 *
 * HOW TO UPDATE AFTER DEPLOYMENT:
 *   1. Deploy OPWACoin    → paste TXID into CONTRACTS.opwaCoin
 *   2. Deploy PropertyNFT → paste TXID into CONTRACTS.propertyNft
 *   3. For each property, deploy a FractionalToken contract and paste
 *      its address into PROPERTY_CONTRACT_MAP[propertyId].
 *   4. Run `npm run build` and redeploy to Vercel.
 *
 * Network: OPNet Testnet  (NOT Bitcoin Testnet4 — different chain)
 * RPC URL: https://testnet.opnet.org
 */

// Platform-level contracts
export const CONTRACTS = {
  opwaCoin:    '' as string,   // OPWACoin OP-20 governance token
  propertyNft: '' as string,   // PropertyNFT OP-721
} as const;

/**
 * Maps each property ID (from the Zustand store / useAppStore) to the
 * address of its deployed FractionalToken OP-20 contract on OPNet testnet.
 *
 * Leave empty string ('') until the contract is deployed.
 * The UI will show a "Not yet deployed" message for empty entries.
 */
export const PROPERTY_CONTRACT_MAP: Record<string, string> = {
  'prop-001': '', // Manhattan Luxury Penthouse  — deploy FractionalToken and paste address here
  'prop-002': '', // Miami Beachfront Villa       — deploy FractionalToken and paste address here
  'prop-003': '', // Commercial Office Tower      — deploy FractionalToken and paste address here
};

/** Returns the contract address for a property, or null if not yet deployed. */
export function getPropertyContractAddress(propertyId: string): string | null {
  const addr = PROPERTY_CONTRACT_MAP[propertyId];
  return addr || null;
}
```

### `./src/hooks/useBTCPrice.ts`
```ts
import { useState, useEffect } from 'react';

export function useBTCPrice() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const r = await globalThis.fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
      );
      const d = await r.json();
      setPrice(d?.bitcoin?.usd ?? null);
    };
    fetch();
    const i = setInterval(fetch, 60_000);
    return () => clearInterval(i);
  }, []);

  return price;
}
```

### `./src/hooks/useBlockHeight.ts`
```ts
import { useState, useEffect } from 'react';
import { getBlockHeight } from '@/lib/opnet';

/** Polls the OP_NET Testnet for the current block height every 30 seconds. */
export function useBlockHeight() {
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      try {
        const height = await getBlockHeight();
        if (!cancelled) {
          setBlockHeight(height);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError('RPC unavailable');
        }
      }
    };

    fetch();
    const interval = setInterval(fetch, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { blockHeight, error };
}
```

### `./src/hooks/useGasPrice.ts`
```ts
import { useState, useEffect } from 'react';

export const useGasPrice = () => {
  const [gasPrice, setGasPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch real-time gas data from OP_NET mempool
        const response = await fetch('https://mempool.opnet.org/api/v1/fees/recommended');
        
        if (!response.ok) {
          throw new Error('Failed to fetch gas price');
        }
        
        const data = await response.json();
        
        // Use the half hour fee rate (standard priority)
        const standardFee = data?.halfHourFee || data?.hourFee || data?.economyFee || 10;
        
        setGasPrice(standardFee);
      } catch (err) {
        console.error('Error fetching gas price:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch gas price');
        // Fallback to default value
        setGasPrice(10);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchGasPrice();

    // Update every 30 seconds
    const interval = setInterval(fetchGasPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  const getTxUsd = () => {
    if (!gasPrice) return null;
    
    const txBytes = 250;
    const txBtc = (gasPrice * txBytes) / 1e8;
    return (txBtc * 1).toFixed(4);
  };

  return { 
    gasPrice, 
    loading, 
    error,
    txUsd: getTxUsd(),
    refetch: () => {
      const fetchGasPrice = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await fetch('https://mempool.opnet.org/api/v1/fees/recommended');
          
          if (!response.ok) {
            throw new Error('Failed to fetch gas price');
          }
          
          const data = await response.json();
          const standardFee = data?.halfHourFee || data?.hourFee || data?.economyFee || 10;
          
          setGasPrice(standardFee);
        } catch (err) {
          console.error('Error fetching gas price:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch gas price');
          setGasPrice(10);
        } finally {
          setLoading(false);
        }
      };
      
      fetchGasPrice();
    }
  };
};
```

### `./src/hooks/useInvestment.ts`
```ts
import {
  getContract,
  JSONRpcProvider,
  TransactionOutputFlags,
  CallResult,
  BaseContractProperties,
  BitcoinInterfaceAbi,
  BitcoinAbiTypes,
  ABIDataTypes,
} from 'opnet';
import { Address } from '@btc-vision/transaction';
import { networks, Satoshi } from '@btc-vision/bitcoin';
import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

const CONTRACT_ADDRESS: string =
  (import.meta.env.VITE_OPWAP_TOKEN_ADDRESS as string) ||
  'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp';

const NETWORK = networks.opnetTestnet;
export const SATS_PER_TOKEN = 1000;
export const BTC_TO_SATS = 100_000_000;

function _hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/, '');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function buildSenderAddress(publicKey: string): Promise<Address> {
  const pubkeyBytes = _hexToBytes(publicKey);
  const opnet = window.opnet as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (opnet && typeof opnet.getMLDSAPublicKey === 'function') {
    try {
      const raw: string = await opnet.getMLDSAPublicKey();
      return new Address(_hexToBytes(raw), pubkeyBytes);
    } catch (_) {}
  }
  return new Address(new Uint8Array(32), pubkeyBytes);
}

// ABI com OP_20 padrão
const OPWAP_ABI: BitcoinInterfaceAbi = [
  {
    name: 'mint',
    type: BitcoinAbiTypes.Function,
    constant: false,
    payable: true,
    inputs: [
      { name: 'to', type: ABIDataTypes.ADDRESS },
      { name: 'amount', type: ABIDataTypes.UINT256 },
    ],
    outputs: [],
  },
  {
    name: 'balanceOf',
    type: BitcoinAbiTypes.Function,
    constant: true,
    payable: false,
    inputs: [{ name: 'account', type: ABIDataTypes.ADDRESS }],
    outputs: [{ name: 'balance', type: ABIDataTypes.UINT256 }],
  },
];

interface IMintableToken extends BaseContractProperties {
  balanceOf(owner: Address): Promise<CallResult<{ balance: bigint }, []>>;
  mint(to: Address, amount: bigint): Promise<CallResult<Record<string, never>, []>>;
}

export interface InvestmentResult {
  txHash: string;
  opscanUrl: string;
}

// Patch: intercepta getSelector para mint retornar string que o SDK hasheia para 0x40c10f19
// Descoberta: 0x40c10f19 = 1086394137 é keccak256, não SHA256
// Solução: patch no writeSelector do writer dentro de encodeFunctionData
// FIX DEFINITIVO (Bob confirmou): BinaryWriter tem campo 'buffer' como Uint8Array
// writer.buffer[0..3] = selector bytes em big-endian após writeSelector()
function applyMintSelectorPatch(contract: unknown): (() => void) {
  const c = contract as Record<string, unknown>;
  const proto = Object.getPrototypeOf(c) as Record<string, unknown>;
  const origEncode = proto['encodeFunctionData'] as ((el: unknown, args: unknown[]) => Record<string, unknown>) | undefined;
  if (!origEncode) return () => {};

  proto['encodeFunctionData'] = function(element: Record<string, unknown>, args: unknown[]) {
    const writer = origEncode.call(this, element, args) as Record<string, unknown>;
    if (element['name'] === 'mint') {
      const buf = writer['buffer'] as Uint8Array | undefined;
      if (buf && buf.length >= 4) {
        buf[0] = 0x40; buf[1] = 0xc1; buf[2] = 0x0f; buf[3] = 0x19;
        console.log('[OPWA] ✓ mint selector patched → 0x40C10F19');
      }
    }
    return writer;
  };

  return () => { proto['encodeFunctionData'] = origEncode; };
}

export function useInvestment() {
  const { walletAddr, publicKey } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const invest = useCallback(async (btcAmount: number) => {
    setError(null);
    setResult(null);

    if (!walletAddr) { setError('Connect your wallet first.'); return; }

    let effectivePublicKey = publicKey;
    if (!effectivePublicKey && window.opnet) {
      try {
        effectivePublicKey = await (window.opnet as any).getPublicKey(); // eslint-disable-line @typescript-eslint/no-explicit-any
      } catch (_) {}
    }
    if (!effectivePublicKey) { setError('Could not retrieve public key. Reconnect and try again.'); return; }
    if (!CONTRACT_ADDRESS) { setError('Contract address not configured.'); return; }
    if (btcAmount <= 0) { setError('Enter a valid BTC amount.'); return; }

    const satsAmount = BigInt(Math.round(btcAmount * BTC_TO_SATS));
    if (satsAmount < BigInt(SATS_PER_TOKEN)) { setError('Minimum: 1000 sats (0.00001 BTC).'); return; }

    setLoading(true);
    let removePatch: (() => void) | undefined;

    try {
      console.log('[OPWA] 1. building sender address...');
      const senderAddress = await buildSenderAddress(effectivePublicKey);
      console.log('[OPWA] 2. senderAddress:', senderAddress);

      const provider = new JSONRpcProvider({
        url: 'https://testnet.opnet.org',
        network: NETWORK,
      });

      const contract = getContract<IMintableToken>(
        CONTRACT_ADDRESS,
        OPWAP_ABI,
        provider,
        NETWORK,
        senderAddress,
      );

      // Aplicar patch para inspecionar o BinaryWriter e tentar corrigir selector
      removePatch = applyMintSelectorPatch(contract);

      contract.setTransactionDetails({
        inputs: [],
        outputs: [
          {
            to: CONTRACT_ADDRESS,
            value: satsAmount,
            index: 1,
            flags: TransactionOutputFlags.hasTo,
          },
        ],
      });

      const tokenAmount = (satsAmount * BigInt(10 ** 8)) / BigInt(SATS_PER_TOKEN);

      console.log('[OPWA] 3. simulating mint...', { satsAmount: satsAmount.toString(), tokenAmount: tokenAmount.toString() });
      const sim = await contract.mint(senderAddress, tokenAmount);
      console.log('[OPWA] 4. sim result:', sim);

      if (!sim || 'error' in sim || (sim as any).revert || (sim as any).ok === false) {
        throw new Error('Simulation failed: ' + JSON.stringify(sim));
      }

      console.log('[OPWA] 5. sending transaction...');
      const receipt = await sim.sendTransaction({
        signer: null,
        mldsaSigner: null,
        refundTo: walletAddr,
        maximumAllowedSatToSpend: satsAmount + 50_000n,
        network: NETWORK,
        extraOutputs: [
          {
            address: CONTRACT_ADDRESS,
            value: Number(satsAmount) as unknown as Satoshi,
          },
        ],
      });
      console.log('[OPWA] 6. receipt:', receipt);

      if (!receipt) throw new Error('Transaction rejected or timed out.');

      const txHash: string = receipt.transactionId ?? '';
      const opscanUrl = 'https://opscan.org/transactions/' + txHash + '?network=testnet';
      setResult({ txHash, opscanUrl });

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed.';
      console.error('OPWA MINT ERROR:', err);
      setError(msg);
    } finally {
      if (removePatch) removePatch();
      setLoading(false);
    }
  }, [walletAddr, publicKey]);

  const reset = useCallback(() => { setError(null); setResult(null); }, []);
  return { invest, loading, error, result, reset };
}

export function calcTokens(btcAmount: number): number {
  return Math.floor(Math.round(btcAmount * BTC_TO_SATS) / SATS_PER_TOKEN);
}
```

### `./src/hooks/useLivePrices.ts`
```ts
import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

async function fetchPrices(setPrices: (b: number|null, g: number) => void) {
  try {
    const [priceRes, gasRes] = await Promise.allSettled([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
      fetch('https://mempool.opnet.org/testnet4/api/v1/fees/recommended')
    ])
    let btc = null, gas = 10
    if (priceRes.status === 'fulfilled' && priceRes.value.ok) {
      const d = await priceRes.value.json(); btc = d?.bitcoin?.usd || null
    }
    if (gasRes.status === 'fulfilled' && gasRes.value.ok) {
      const g = await gasRes.value.json(); gas = g?.fastestFee ?? g?.halfHourFee ?? 10
    } else {
      try {
        const fb = await fetch('https://mempool.opnet.org/api/v1/fees/recommended')
        if (fb.ok) { const g = await fb.json(); gas = g?.fastestFee ?? 10 }
      } catch(_) {}
    }
    setPrices(btc, gas)
  } catch(_) {}
}

export function useLivePrices() {
  const setPrices = useAppStore(s => s.setPrices)
  useEffect(() => {
    fetchPrices(setPrices)
    const id = setInterval(() => fetchPrices(setPrices), 30_000)
    return () => clearInterval(id)
  }, [setPrices])
}
```

### `./src/hooks/useOPNETWallet.ts`
```ts
// src/hooks/useOPNETWallet.ts
import { useWalletConnect } from '@btc-vision/walletconnect';

export const useOPNETWallet = () => {
  const {
    openConnectModal,
    connectToWallet,
    disconnect,
    walletAddress,
    publicKey,
    address,
    network,
    provider,
    signer,
    walletBalance,
    connecting,
    walletType,
    walletInstance,
    mldsaPublicKey,
    hashedMLDSAKey,
  } = useWalletConnect();

  // Helper: is the wallet connected?
  const isConnected = !!walletAddress;

  // Helper: formatted short address for display (e.g. "bc1q...4f8e")
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
    : null;

  // Helper: BTC balance in human-readable form
  const btcBalance = walletBalance
    ? (walletBalance.total / 1e8).toFixed(8)
    : null;

  // Helper: USD balance string already provided by SDK
  const usdBalance = walletBalance?.usd_value ?? null;

  return {
    // raw SDK values
    openConnectModal,
    connectToWallet,
    disconnect,
    walletAddress,
    publicKey,
    address,
    network,
    provider,
    signer,
    walletBalance,
    connecting,
    walletType,
    walletInstance,
    mldsaPublicKey,
    hashedMLDSAKey,
    // computed helpers
    isConnected,
    shortAddress,
    btcBalance,
    usdBalance,
  };
};
```

### `./src/hooks/usePropertyContract.ts`
```ts
export function usePropertyContract() { return {} }
```

### `./src/hooks/useSendTransaction.ts`
```ts
import { TransactionParameters } from 'opnet';
import { useOPNETWallet } from './useOPNETWallet';

export function useSendTransaction() {
  const { provider, network, walletAddress } = useOPNETWallet();

  async function executeTransaction(simulation: any) {
    if (!provider || !network || !walletAddress) {
      throw new Error('Wallet not connected');
    }

    // 1. Get current fee rate from provider
    const feeRateResult = await (provider as any).getFeeRate?.() || { result: 10 };
    const feeRate = feeRateResult?.result ?? 10; // fallback 10 sat/vB

    // 2. Build transaction parameters.
    // FRONTEND RULE: signer=null and mldsaSigner=null — the wallet extension handles signing.
    const params: TransactionParameters = {
      signer:                   null as any,
      mldsaSigner:              null as any,
      refundTo:                 walletAddress,
      maximumAllowedSatToSpend: 100_000n,
      feeRate:                  feeRate,
      network:                  network,
    };

    // 3. Send — this prompts the wallet extension to sign
    const tx = await simulation.sendTransaction(params);

    if (!tx || !tx.txid) {
      throw new Error('Transaction failed or was rejected');
    }

    return tx.txid as string;
  }

  return { executeTransaction };
}
```

### `./src/hooks/useSyncWallet.ts`
```ts
import { useEffect, useCallback } from 'react';
import { useOPNETWallet } from './useOPNETWallet';
import { useAppStore } from '@/store/useAppStore';
import { provider as defaultProvider, network as testnet, getTokenBalance } from '@/lib/opnet';
import { JSONRpcProvider } from 'opnet';

// Replace with actual deployed contract addresses after deployment
const OPWA_TOKEN_ADDRESS = (import.meta.env.VITE_OPWA_TOKEN_ADDRESS as string) ?? '';

export function useSyncWallet() {
  const {
    provider: walletProvider,
    network: walletNetwork,
    walletBalance,
    isConnected,
    walletAddress,
  } = useOPNETWallet();

  const { setWallet } = useAppStore();

  const sync = useCallback(async () => {
    if (!isConnected || !walletAddress) {
      setWallet({ connected: false });
      return;
    }

    // Prefer wallet's own provider; fall back to public RPC
    void ((walletProvider as JSONRpcProvider | undefined) ?? defaultProvider);
    void testnet;

    try {
      // BTC balance from SDK (already confirmed UTXO balance in satoshis)
      const btcSats = walletBalance?.total ?? 0;

      // Optional: fetch OPWA token balance if contract is deployed
      if (OPWA_TOKEN_ADDRESS) {
        try {
          void await getTokenBalance(OPWA_TOKEN_ADDRESS, walletAddress);
        } catch {
          // Contract not yet deployed — skip silently
        }
      }

      // WalletConnectNetwork extends Network; bech32 === 'bc' means mainnet
      const networkName: 'mainnet' | 'testnet' =
        walletNetwork?.bech32 === 'bc' ? 'mainnet' : 'testnet';

      setWallet({
        connected: true,
        walletAddr: walletAddress,
        walletSats: btcSats,
        network: networkName,
      });
    } catch (err) {
      console.error('[OPWA] Wallet sync failed:', err);
    }
  }, [isConnected, walletAddress, walletBalance, walletNetwork, walletProvider, setWallet]);

  // Sync on connect/disconnect and every 60 s
  useEffect(() => {
    sync();
    const interval = setInterval(sync, 60_000);
    return () => {
      clearInterval(interval);
    };
  }, [sync]);

  return { sync };
}
```

### `./src/hooks/useTheme.ts`
```ts
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('opwa-theme') || 'dark';
    setTheme(savedTheme as 'dark' | 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('opwa-theme', newTheme);
  };

  return { theme, toggleTheme };
};
```

### `./src/hooks/useToast.ts`
```ts
import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast['type'], title: string, description: string) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, title, description };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((title: string, description: string) => {
    addToast('success', title, description);
  }, [addToast]);

  const error = useCallback((title: string, description: string) => {
    addToast('error', title, description);
  }, [addToast]);

  const info = useCallback((title: string, description: string) => {
    addToast('info', title, description);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info
  };
};
```

### `./src/hooks/useWallet.ts`
```ts
import { useAppStore } from '../store/useAppStore'

function showToast(type: string, title: string, desc: string) {
  window.dispatchEvent(new CustomEvent('opwa-toast', { detail: { type, title, desc } }))
}

export function useWallet() {
  const { setWallet, disconnect: storeDisconnect } = useAppStore.getState()

  async function connect(name: string) {
    try {
      showToast('info', 'Connecting...', 'Waiting for ' + name + ' wallet approval.')
      let address: string | null = null, balanceSats = 0, publicKey: string | null = null

      if (name === 'OP_Wallet') {
        if (!window.opnet) { showToast('error', 'OP_Wallet Not Found', 'Install OP_Wallet from Chrome Web Store.'); return }
        const accs = await window.opnet.requestAccounts()
        address = accs?.[0] || null
        if (!address) { showToast('error', 'No Account', 'No account returned by OP_Wallet.'); return }
        try { publicKey = await window.opnet.getPublicKey() } catch(_) {}
        try { const b = await window.opnet.getBalance(); balanceSats = b?.total ?? b?.confirmed ?? 0 } catch(_) {}

      } else if (name === 'Unisat') {
        if (!window.unisat) { showToast('error', 'UniSat Not Found', 'Install UniSat wallet.'); return }
        const accs = await window.unisat.requestAccounts()
        address = accs?.[0] || null
        if (!address) { showToast('error', 'No Account', 'No account returned by UniSat.'); return }
        try { publicKey = await window.unisat.getPublicKey() } catch(_) {}
        try { const b = await window.unisat.getBalance(); balanceSats = b?.total ?? b?.confirmed ?? 0 } catch(_) {}

      } else if (name === 'Xverse') {
        const xverse = window.BitcoinProvider || window.XverseProviders?.BitcoinProvider
        if (!xverse) { showToast('error', 'Xverse Not Found', 'Install Xverse wallet.'); return }
        const res = await xverse.request('getAccounts', { purposes: ['payment', 'ordinals'] })
        const accts = res?.result?.addresses || []
        address = accts?.[0]?.address || null
        publicKey = accts?.[0]?.publicKey || null
        if (!address) { showToast('error', 'No Account', 'No account returned by Xverse.'); return }

      } else if (name === 'OKX') {
        if (!window.okxwallet?.bitcoin) { showToast('error', 'OKX Not Found', 'Install OKX Wallet.'); return }
        const res = await window.okxwallet.bitcoin.requestAccounts()
        address = res?.[0] || null
        if (!address) { showToast('error', 'No Account', 'No account returned by OKX.'); return }
        try { const b = await window.okxwallet.bitcoin.getBalance(); balanceSats = b?.total ?? 0 } catch(_) {}
      }

      if (!address) { showToast('error', 'Connection Failed', 'Could not get address from wallet.'); return }

      setWallet({ connected: true, wallet: name, walletAddr: address, walletSats: balanceSats, publicKey })
      const short = address.slice(0,8) + '...' + address.slice(-6)
      showToast('success', 'Wallet Connected', name + ' connected - ' + short)

      const provider = window.opnet || window.unisat || null
      if (provider?.on) {
        provider.on('accountsChanged', (accs: string[]) => {
          if (!accs?.length) { disconnect(); return }
          setWallet({ walletAddr: accs[0] })
          showToast('info', 'Account Changed', accs[0].slice(0,8) + '...' + accs[0].slice(-6))
        })
        provider.on('disconnect', () => disconnect())
      }
    } catch(err: any) {
      showToast('error', 'Connection Failed', err?.message || 'User rejected or wallet error.')
    }
  }

  function disconnect() {
    storeDisconnect()
    showToast('info', 'Wallet Disconnected', 'You have safely signed out.')
  }

  function requireWallet() {
    const { connected, wallet } = useAppStore.getState()
    if (!connected) { showToast('info', 'Wallet Required', 'Connect your wallet to invest.'); return false }
    showToast('success', 'Initiating Transaction...', 'Confirm in your ' + wallet + ' wallet.')
    return true
  }

  return { connect, disconnect, requireWallet }
}
```

### `./src/index.css`
```css
/* ═══════════════════════════════════════════════════════════════════════
   OPWA SKELETON v6
   ─────────────────────────────────────────────────────────────────────
   AI REPLICATION GUIDE — READ BEFORE TOUCHING ANY CODE:

   COLOURS:
   • Orange accent: --accent #f97316 / --accent-dark #ea580c
   • Gold stat values: --gold #fbbf24 (used in hero-stat-val ONLY)
   • Pill cursor: left half white, right half orange — DO NOT animate

   HERO STATS BAND:
   • Exactly 6 .hero-stat items in a CSS grid repeat(3,1fr) — always 3+3
   • Values are --gold Syne 800. Labels are --text-3 uppercase small-caps
   • ₿ symbol = &#x20BF; (Unicode Bitcoin sign U+20BF in text node, NOT SVG)
   • .hero-stats background = var(--bg-base) to isolate from ::after mesh
   • ::after grid mask stops 180px from bottom so mesh never bleeds into stats
   • MOBILE: keep grid-template-columns: repeat(3,1fr) — never stack to 1 col

   WALLET:
   • OP_Wallet is PRIMARY (orange border, orange icon, "Official" badge)
   • openWalletModal() / closeWalletModal() ONLY from navbar + CTA buttons
   • Never call openWalletModal() from footer or status bar

   GAS WIDGET:
   • Fixed bottom-RIGHT (24px). Toggle via flame button → .open class
   • Never overlaps footer or status bar

   LIVE DATA (real, not mock):
   • Gas: fetch('https://mempool.opnet.org/testnet4/api/v1/fees/recommended')
     → state.gasPrice = response.fastestFee (sat/vB). Refreshed every 30s.
     Fallback: mainnet mempool.opnet.org if testnet4 unreachable.
   • BTC Price: CoinGecko free API, refreshed every 30s.
   • Tx cost estimate: gasSat × 250 vBytes / 1e8 × btcPrice = USD

   WALLET (real browser extension APIs, no mocks):
   • OP_Wallet:  window.opnet.requestAccounts() / getBalance() / getPublicKey()
   • UniSat:     window.unisat.requestAccounts() / getBalance() / getPublicKey()
   • Xverse:     window.BitcoinProvider.request('getAccounts', {...})
   • OKX:        window.okxwallet.bitcoin.requestAccounts() / getBalance()
   • state.walletAddr = real address string (never hardcoded)
   • state.walletSats = balance in satoshis from wallet API
   • detectInstalledWallets() called on modal open to check extensions
   • Account/disconnect events wired via provider.on('accountsChanged')
   • GitHub: Assets header link + Developers footer column ONLY
   • Whitepaper: Resources footer column → opwa_strategic_document

   FOOTER:
   • Columns: Brand | Platform (anchors) | Developers (external) | Resources
   • No wallet connect button in footer
   • No duplicate X, GitHub, or Live Platform links across columns

   ASSETS:
   • data-type on .ativo-card for filter tabs (filterAssets)
   • data-name for search (searchAssets)
   • "Invest Now" → toggleExpand(btnEl) → .ativo-expand-panel.open

   SMART CONTRACTS:
   • requireWallet(btn) checks state.connected before any OP_NET tx
   • All invest buttons call requireWallet — never bypass this
   • MCP integration points: all .btn-invest, .btn-card, connectWallet()

   SECTIONS (one-page anchors): #home #assets #simulator #how-it-works #partners
═══════════════════════════════════════════════════════════════════════ */

/* ── TOKENS ── */
:root,
[data-theme="dark"] {
  --bg-base:       #0a0a0a;
  --bg-surface:    #111111;
  --bg-card:       #161616;
  --bg-elevated:   #1e1e1e;
  --bg-modal:      #131313;
  --accent:        #f97316;
  --accent-dim:    rgba(249,115,22,0.12);
  --accent-border: rgba(249,115,22,0.30);
  --accent-glow:   rgba(249,115,22,0.25);
  --accent-dark:   #ea580c;
  --gold:          #fbbf24;
  --text-1:  #f5f5f5;
  --text-2:  #a3a3a3;
  --text-3:  #525252;
  --border:  rgba(255,255,255,0.06);
  --border-hover: rgba(255,255,255,0.12);
  --success: #10b981;
  --danger:  #ef4444;
  --info:    #3b82f6;
  --shadow-card:  0 4px 24px rgba(0,0,0,0.4);
  --shadow-modal: 0 24px 80px rgba(0,0,0,0.7);
  --navbar-bg: rgba(17,17,17,0.88);
  --partners-gradient: linear-gradient(90deg,#0a0a0a 0%,transparent 18%,transparent 82%,#0a0a0a 100%);
}

[data-theme="light"] {
  --bg-base:       #f4f4f0;
  --bg-surface:    #ffffff;
  --bg-card:       #fafafa;
  --bg-elevated:   #f0f0ec;
  --bg-modal:      #ffffff;
  --accent:        #f97316;
  --accent-dim:    rgba(249,115,22,0.08);
  --accent-border: rgba(249,115,22,0.25);
  --accent-glow:   rgba(249,115,22,0.18);
  --accent-dark:   #ea580c;
  --gold:          #d97706;
  --text-1:  #111111;
  --text-2:  #555555;
  --text-3:  #999999;
  --border:  rgba(0,0,0,0.08);
  --border-hover: rgba(0,0,0,0.14);
  --success: #059669;
  --danger:  #dc2626;
  --info:    #2563eb;
  --shadow-card:  0 2px 16px rgba(0,0,0,0.07);
  --shadow-modal: 0 24px 80px rgba(0,0,0,0.18);
  --navbar-bg: rgba(255,255,255,0.92);
  --partners-gradient: linear-gradient(90deg,#f4f4f0 0%,transparent 18%,transparent 82%,#f4f4f0 100%);
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg-base);
  color: var(--text-1);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background .3s, color .3s;
}
a { text-decoration: none; color: inherit; }
button { cursor: pointer; font-family: 'DM Sans', sans-serif; border: none; background: none; }
ul { list-style: none; }
input, select { font-family: 'DM Sans', sans-serif; }

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track  { background: var(--bg-base); }
::-webkit-scrollbar-thumb  { background: var(--bg-elevated); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

/* ═══════════════════════════════════════════════════════════════════════
   PILL CURSOR
   AI NOTE: left half white, right half orange. Fixed size 28×16px.
   DO NOT change shape on :hover or :active. Only swap the orange shade.
═══════════════════════════════════════════════════════════════════════ */
body {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='16' viewBox='0 0 28 16'%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Crect x='1' y='1' width='26' height='14' rx='7'/%3E%3C/clipPath%3E%3C/defs%3E%3Crect x='1' y='1' width='13' height='14' fill='%23ffffff' clip-path='url(%23a)'/%3E%3Crect x='14' y='1' width='13' height='14' fill='%23f97316' clip-path='url(%23a)'/%3E%3Crect x='1' y='1' width='26' height='14' rx='7' fill='none' stroke='%23777' stroke-width='1'/%3E%3Cline x1='14' y1='1' x2='14' y2='15' stroke='%23777' stroke-width='.8'/%3E%3C/svg%3E") 14 8, default;
}
a, button, [role="button"], .filter-tab, .wallet-option, .wd-action,
.network-option, .partner-slot, .sim-stepper-btn, .theme-toggle,
.modal-close, .wallet-chevron, .social-btn, select, .gcw-convert-btn,
.value-toggle-btn, .filter-select, .btn-card, .btn-sim, .btn-primary,
.btn-primary-lg, .btn-outline-lg, .btn-ghost-nav, .btn-link, .btn-menu,
.step, .footer-link {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='16' viewBox='0 0 28 16'%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Crect x='1' y='1' width='26' height='14' rx='7'/%3E%3C/clipPath%3E%3C/defs%3E%3Crect x='1' y='1' width='13' height='14' fill='%23ffffff' clip-path='url(%23a)'/%3E%3Crect x='14' y='1' width='13' height='14' fill='%23ea580c' clip-path='url(%23a)'/%3E%3Crect x='1' y='1' width='26' height='14' rx='7' fill='none' stroke='%23777' stroke-width='1'/%3E%3Cline x1='14' y1='1' x2='14' y2='15' stroke='%23777' stroke-width='.8'/%3E%3C/svg%3E") 14 8, pointer !important;
}
input, textarea {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='24' viewBox='0 0 16 24'%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Crect x='1' y='1' width='14' height='22' rx='7'/%3E%3C/clipPath%3E%3C/defs%3E%3Crect x='1' y='1' width='7' height='22' fill='%23ffffff' clip-path='url(%23a)'/%3E%3Crect x='8' y='1' width='7' height='22' fill='%23f97316' clip-path='url(%23a)'/%3E%3Crect x='1' y='1' width='14' height='22' rx='7' fill='none' stroke='%23777' stroke-width='1'/%3E%3Cline x1='8' y1='1' x2='8' y2='23' stroke='%23777' stroke-width='.8'/%3E%3C/svg%3E") 8 12, text !important;
}

/* global theme transition */
*, *::before, *::after {
  transition: background-color .25s ease, border-color .25s ease, color .15s ease, box-shadow .25s ease;
}
.no-transition, .no-transition * { transition: none !important; }

/* ── LAYOUT VARS ── */
:root { --navbar-h: 68px; --radius-card: 14px; --radius-btn: 10px; --radius-sm: 8px; }

/* ═══════════════════════════════════════════════════════════════════════
   FADE-IN ANIMATIONS
═══════════════════════════════════════════════════════════════════════ */
@keyframes fadeIn    { from { opacity:0 } to { opacity:1 } }
@keyframes fadeInUp  { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
.fade-in     { animation: fadeIn 0.6s ease both; }
.fade-in-up  { animation: fadeInUp 0.6s ease both; }
.d1 { animation-delay:.05s } .d2 { animation-delay:.12s }
.d3 { animation-delay:.19s } .d4 { animation-delay:.26s }

/* ═══════════════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════════════ */
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--navbar-h);
  background: var(--navbar-bg);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(18px) saturate(180%);
  display: flex; align-items: center;
  padding: 0 40px; gap: 32px;
  z-index: 200;
}

.logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.logo-mark {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg, #f97316, #ea580c);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 13px; color: #fff;
  box-shadow: 0 0 18px rgba(249,115,22,.3); flex-shrink: 0;
}
.logo-name    { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; }
.logo-tagline { font-size: 10px; color: var(--text-3); text-transform: uppercase; letter-spacing: .06em; }

.nav-links { display: flex; gap: 4px; flex: 1; }
.nav-link {
  padding: 8px 14px; border-radius: var(--radius-sm);
  font-size: 14px; font-weight: 500; color: var(--text-2);
  transition: all .15s; display: flex; align-items: center; gap: 6px;
}
.nav-link:hover { color: var(--text-1); background: var(--bg-card); }
.nav-link.active { color: var(--accent); background: var(--accent-dim); }
.nav-link svg { width: 15px; height: 15px; flex-shrink: 0; }

.navbar-right { display: flex; align-items: center; gap: 10px; margin-left: auto; }

/* gas ticker */
.gas-ticker {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 20px;
  background: var(--bg-card); border: 1px solid var(--border);
  font-size: 12px; color: var(--text-2); cursor: default;
}
.gas-ticker:hover { border-color: var(--accent-border); }
.gas-ticker-icon { color: var(--success); }
.gas-ticker-val  { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-1); font-weight: 500; }
.gas-ticker-usd  { font-size: 10px; color: var(--text-3); }

/* theme toggle */
.theme-toggle {
  width: 60px; height: 30px; border-radius: 20px;
  background: var(--bg-card); border: 1px solid var(--border);
  position: relative; cursor: pointer; padding: 0; flex-shrink: 0;
}
.theme-toggle:hover { border-color: var(--accent-border); }
.theme-toggle-track {
  width: 100%; height: 100%; border-radius: 20px;
  display: flex; align-items: center; justify-content: space-between; padding: 0 7px;
}
.theme-toggle-icon { width: 14px; height: 14px; color: var(--text-3); flex-shrink: 0; transition: color .2s; }
.theme-toggle-icon.active { color: var(--accent); }
.theme-toggle-thumb {
  position: absolute; top: 3px;
  width: 24px; height: 24px; border-radius: 50%;
  background: linear-gradient(135deg, #f97316, #ea580c);
  box-shadow: 0 2px 8px rgba(249,115,22,.35);
  transition: left .25s cubic-bezier(.34,1.56,.64,1);
}
[data-theme="dark"]  .theme-toggle-thumb { left: 3px; }
[data-theme="light"] .theme-toggle-thumb { left: 33px; }

/* buttons */
.btn-ghost-nav {
  padding: 8px 18px; border-radius: var(--radius-btn);
  background: none; border: 1px solid var(--border);
  color: var(--text-2); font-size: 13px; font-weight: 600; transition: all .15s;
}
.btn-ghost-nav:hover { border-color: var(--accent-border); color: var(--text-1); }

.btn-primary {
  padding: 9px 20px; border-radius: var(--radius-btn);
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: #fff; font-size: 13px; font-weight: 600;
  box-shadow: 0 4px 16px rgba(249,115,22,.25);
  transition: transform .15s, box-shadow .15s;
  display: flex; align-items: center; gap: 6px;
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(249,115,22,.38); }
.btn-primary:active { transform: translateY(0); }

/* wallet connected state */
.wallet-connected {
  display: flex; align-items: center; gap: 0;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-btn); overflow: hidden; transition: border-color .15s;
}
.wallet-connected:hover { border-color: var(--accent-border); }
.wallet-balance {
  padding: 8px 12px; font-size: 12px; font-weight: 600;
  color: var(--text-1); border-right: 1px solid var(--border);
  display: flex; align-items: center; gap: 5px; font-family: 'DM Mono', monospace;
}
.wallet-balance-icon { color: var(--accent); }
.wallet-addr {
  padding: 8px 12px; font-size: 12px; font-weight: 500;
  color: var(--text-2); font-family: 'DM Mono', monospace;
  display: flex; align-items: center; gap: 6px;
}
.wallet-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); }
.wallet-chevron { padding: 8px 10px; color: var(--text-3); border-left: 1px solid var(--border); transition: color .15s; }
.wallet-chevron:hover { color: var(--accent); }

.btn-menu {
  display: none; width: 36px; height: 36px; border-radius: var(--radius-sm);
  background: var(--bg-card); border: 1px solid var(--border);
  color: var(--text-2); align-items: center; justify-content: center;
}

/* ═══════════════════════════════════════════════════════════════════════
   WALLET MODAL
... [TRUNCADO - 1384 linhas] ...
```

### `./src/lib/motoswap.ts`
```ts
/**
 * Motoswap integration helpers.
 *
 * Motoswap is the native AMM DEX on OP_NET that supports BTC/OP-20 pairs.
 * OPWA tokens will have a BTC/OPWA liquidity pool there post-mainnet.
 *
 * Docs: https://docs.motoswap.org
 */

const MOTOSWAP_BASE_URL = 'https://motoswap.org';

/** OP_NET Testnet contract address for the OPWA token (set after deployment). */
const OPWA_TOKEN_ADDRESS = (import.meta.env.VITE_OPWA_TOKEN_ADDRESS as string) ?? '';

/**
 * Returns the Motoswap swap URL for trading OPWA/BTC.
 * If the token address is not yet configured, returns the Motoswap homepage.
 */
export function getMotoswapTradeUrl(): string {
  if (!OPWA_TOKEN_ADDRESS) {
    return MOTOSWAP_BASE_URL;
  }
  return `${MOTOSWAP_BASE_URL}/swap?inputToken=BTC&outputToken=${OPWA_TOKEN_ADDRESS}`;
}

/**
 * Returns the Motoswap liquidity pool URL for OPWA/BTC.
 */
export function getMotoswapPoolUrl(): string {
  if (!OPWA_TOKEN_ADDRESS) {
    return `${MOTOSWAP_BASE_URL}/pools`;
  }
  return `${MOTOSWAP_BASE_URL}/pools/${OPWA_TOKEN_ADDRESS}`;
}

/**
 * Open the Motoswap trade page for OPWA in a new browser tab.
 */
export function openMotoswapTrade(): void {
  window.open(getMotoswapTradeUrl(), '_blank', 'noopener,noreferrer');
}
```

### `./src/lib/opnet.ts`
```ts
import { JSONRpcProvider } from 'opnet';
import { networks } from '@btc-vision/bitcoin';
import { fetchTokenMetadata, fetchTokenBalance } from '@/utils/opnetContracts';
import { Address } from '@btc-vision/transaction';

const TESTNET_RPC = (import.meta.env.VITE_OP_NET_TESTNET_RPC as string) ?? 'https://testnet.opnet.org';

export const network = networks.testnet;

export const provider = new JSONRpcProvider({
  url: TESTNET_RPC,
  network,
});

/** Returns the current Bitcoin block height on OP_NET Testnet. */
export async function getBlockHeight(): Promise<number> {
  const result = await provider.getBlockNumber();
  return Number(result);
}

/**
 * Returns the BTC balance (in satoshis) for a Bitcoin address.
 * The SDK returns the confirmed UTXO balance as a bigint.
 */
export async function getBalance(address: string): Promise<bigint> {
  return provider.getBalance(address);
}

/** Returns metadata (name, symbol, decimals, totalSupply) for an OP-20 token. */
export async function getTokenInfo(contractAddress: string) {
  return fetchTokenMetadata(contractAddress, provider, network);
}

/** Returns the OP-20 token balance for a user address in base units. */
export async function getTokenBalance(
  contractAddress: string,
  userAddress: string,
): Promise<bigint> {
  const addr = Address.fromString(userAddress);
  return fetchTokenBalance(contractAddress, addr, provider, network);
}
```

### `./src/lib/utils.ts`
```ts
import { format } from 'date-fns';

export const formatSatsToBTC = (sats: number): string => {
  return (sats / 100000000).toFixed(8);
};

export const formatBTCtoSats = (btc: number): number => {
  return Math.floor(btc * 100000000);
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number, decimals = 2): string => {
  if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K';
  return num.toFixed(decimals);
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy HH:mm');
};

export const truncateAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return '';
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

export const truncateTxHash = (hash: string, startChars = 10, endChars = 6): string => {
  if (!hash) return '';
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const calculateAPY = (monthlyRent: number, propertyValue: number): number => {
  if (propertyValue === 0) return 0;
  const annualRent = monthlyRent * 12;
  return (annualRent / propertyValue) * 100;
};

export const generateMockPriceHistory = (days: number, basePrice: number) => {
  const history = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random walk with slight upward trend
    const change = (Math.random() - 0.48) * 0.02; // -0.96% to +1.04%
    currentPrice = currentPrice * (1 + change);
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(currentPrice),
      volume: Math.floor(Math.random() * 1000000) + 100000,
      marketCap: Math.round(currentPrice * 1000000), // Assuming 1M tokens
    });
  }
  
  return history;
};

export const generateMockProperties = () => {
  return [
    {
      id: 'prop-001',
      name: 'Luxury Downtown Apartment',
      description: 'Modern 2-bedroom apartment in the heart of the financial district with stunning city views.',
      address: '123 Main St, Suite 45B',
      city: 'New York',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      totalSupply: 1000000,
      availableTokens: 750000,
      pricePerToken: 50000, // 0.0005 BTC
      totalValue: 50000000000, // 500 BTC
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      ],
      documents: ['QmPropertyDoc1', 'QmPropertyDoc2'],
      propertyType: 'residential' as const,
      squareMeters: 120,
      bedrooms: 2,
      bathrooms: 2,
      yearBuilt: 2020,
      status: 'active' as const,
      apy: 8.5,
      monthlyRent: 4166667, // 0.04166667 BTC
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-02-20T14:30:00Z',
    },
    {
      id: 'prop-002',
      name: 'Beachfront Villa Miami',
      description: 'Exclusive beachfront property with private beach access and panoramic ocean views.',
      address: '456 Ocean Drive',
      city: 'Miami',
      country: 'USA',
      coordinates: { lat: 25.7617, lng: -80.1918 },
      totalSupply: 2000000,
      availableTokens: 1800000,
      pricePerToken: 75000, // 0.00075 BTC
      totalValue: 150000000000, // 1500 BTC
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      ],
      documents: ['QmPropertyDoc3', 'QmPropertyDoc4'],
      propertyType: 'residential' as const,
      squareMeters: 350,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2018,
      status: 'active' as const,
      apy: 7.2,
      monthlyRent: 9000000, // 0.09 BTC
      createdAt: '2024-02-01T09:00:00Z',
      updatedAt: '2024-02-18T16:45:00Z',
    },
    {
      id: 'prop-003',
      name: 'Commercial Office Tower',
      description: 'Prime commercial space in central business district with high tenant demand.',
      address: '789 Business Ave',
      city: 'San Francisco',
      country: 'USA',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      totalSupply: 5000000,
      availableTokens: 3500000,
      pricePerToken: 25000, // 0.00025 BTC
      totalValue: 125000000000, // 1250 BTC
      images: [
        'https://images.unsplash.com/photo-1486406146921-c63de6c0e5a0?w=800',
        'https://images.unsplash.com/photo-1497366216548-375f70e41755?w=800',
      ],
      documents: ['QmPropertyDoc5', 'QmPropertyDoc6'],
      propertyType: 'commercial' as const,
      squareMeters: 2000,
      yearBuilt: 2015,
      status: 'active' as const,
      apy: 6.8,
      monthlyRent: 7083333, // 0.07083333 BTC
      createdAt: '2023-12-10T11:00:00Z',
      updatedAt: '2024-02-15T10:20:00Z',
    },
  ];
};

export const generateMockPortfolio = () => {
  return {
    totalValueBTC: 2.5 * 100000000, // 2.5 BTC in satoshis
    totalValueUSD: 125000, // Assuming $50,000 per BTC
    properties: [
      {
        propertyId: 'prop-001',
        symbol: 'LDA',
        name: 'Luxury Downtown Apartment',
        decimals: 8,
        balance: 250000,
        totalSupply: 1000000,
        pricePerToken: 50000,
        valueInBTC: 12500000000, // 0.125 BTC
      },
      {
        propertyId: 'prop-002',
        symbol: 'BFV',
        name: 'Beachfront Villa Miami',
        decimals: 8,
        balance: 200000,
        totalSupply: 2000000,
        pricePerToken: 75000,
        valueInBTC: 15000000000, // 0.15 BTC
      },
    ],
    monthlyIncome: 20833333, // 0.20833333 BTC
    totalIncome: 250000000, // 2.5 BTC
    performance: {
      daily: 2.5,
      weekly: 8.2,
      monthly: 15.7,
    },
  };
};

export const generateMockTransactions = () => {
  return [
    {
      id: 'tx-001',
      type: 'buy' as const,
      propertyId: 'prop-001',
      propertyName: 'Luxury Downtown Apartment',
      amount: 250000,
      price: 50000,
      totalValue: 12500000000,
      timestamp: '2024-02-20T14:30:00Z',
      status: 'completed' as const,
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
    },
    {
      id: 'tx-002',
      type: 'rent_claim' as const,
      propertyId: 'prop-001',
      propertyName: 'Luxury Downtown Apartment',
      amount: 0,
      price: 0,
      totalValue: 2083333,
      timestamp: '2024-02-15T10:00:00Z',
      status: 'completed' as const,
      txHash: '0x2345678901bcdef12345678901bcdef12345678',
    },
    {
      id: 'tx-003',
      type: 'buy' as const,
      propertyId: 'prop-002',
      propertyName: 'Beachfront Villa Miami',
      amount: 200000,
      price: 75000,
      totalValue: 15000000000,
      timestamp: '2024-02-10T16:45:00Z',
      status: 'completed' as const,
      txHash: '0x3456789012cdef123456789012cdef12345678',
    },
  ];
};
```

### `./src/main.tsx`
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WalletConnectProvider } from '@btc-vision/walletconnect';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletConnectProvider theme="dark">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WalletConnectProvider>
  </React.StrictMode>
);
```

### `./src/pages/AdminMint.tsx`
```tsx
import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

const PROPERTY_NFT_ADDRESS = (import.meta.env.VITE_PROPERTY_NFT_ADDRESS as string) ?? '';
const OPSCAN_BASE = 'https://testnet.opscan.io/tx/';

interface MintForm {
  name: string;
  location: string;
  area_sqm: string;
  valuation_sats: string;
  property_type: 'residential' | 'commercial' | 'mixed';
  total_fractions: string;
  image_uri: string;
}

const EMPTY_FORM: MintForm = {
  name: '',
  location: '',
  area_sqm: '',
  valuation_sats: '',
  property_type: 'residential',
  total_fractions: '1000000',
  image_uri: '',
};

export const AdminMint: React.FC = () => {
  const { connected: isConnected } = useAppStore();
  
  

  const [form, setForm] = useState<MintForm>(EMPTY_FORM);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isConnected) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Connect your wallet to access the admin mint panel.
        </p>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTxHash(null);

    if (!PROPERTY_NFT_ADDRESS) {
      setError('VITE_PROPERTY_NFT_ADDRESS is not set. Deploy the contract first.');
      return;
    }

    setMinting(true);
    try {
      // Build the metadata URI (JSON encoded as data URI for testnet convenience)
      const metadata = {
        property_id: `prop-${Date.now()}`,
        name: form.name,
        location: form.location,
        area_sqm: Number(form.area_sqm),
        valuation_sats: Number(form.valuation_sats),
        property_type: form.property_type,
        total_fractions: Number(form.total_fractions),
        image_uri: form.image_uri,
      };
      const metadataUri = `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;

      // TODO: Call PropertyNFT.mint(metadataUri) via OP_WALLET signer
      // Example (once signer API is finalized):
      //   const signer = walletInstance.getSigner();
      //   const contract = getContract(PROPERTY_NFT_ADDRESS, PROPERTY_NFT_ABI, signer, network);
      //   const tx = await contract.mint(metadataUri);
      //   setTxHash(tx.txid);

      // Placeholder — show what would be sent
      console.log('[AdminMint] Would mint:', metadataUri);
      throw new Error(
        'Contract not deployed yet. Set VITE_PROPERTY_NFT_ADDRESS in .env to enable minting.',
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      console.log({ type: 'error', title: 'Mint Failed', message: msg });
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Admin — Mint Property NFT
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Only the contract owner wallet can mint. Contract:{' '}
        {PROPERTY_NFT_ADDRESS ? (
          <a
            href={`${OPSCAN_BASE}${PROPERTY_NFT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bitcoin-orange underline font-mono"
          >
            {PROPERTY_NFT_ADDRESS.slice(0, 10)}…
          </a>
        ) : (
          <span className="text-red-400">not configured</span>
        )}
      </p>

      <form onSubmit={handleMint} className="space-y-4">
        {[
          { label: 'Property Name', name: 'name', placeholder: 'Downtown Penthouse São Paulo' },
          { label: 'Location', name: 'location', placeholder: 'Av. Paulista 1000, São Paulo, BR' },
          { label: 'Area (m²)', name: 'area_sqm', placeholder: '120', type: 'number' },
          {
            label: 'Valuation (satoshis)',
            name: 'valuation_sats',
            placeholder: '5000000000',
            type: 'number',
          },
          {
            label: 'Total Fractions',
            name: 'total_fractions',
            placeholder: '1000000',
            type: 'number',
          },
          { label: 'Image URI (IPFS / https)', name: 'image_uri', placeholder: 'ipfs://Qm...' },
        ].map(({ label, name, placeholder, type = 'text' }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={(form as unknown as Record<string, string>)[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Property Type
          </label>
          <select
            name="property_type"
            value={form.property_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {txHash && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-700 dark:text-green-400">
            Minted! TX:{' '}
            <a
              href={`${OPSCAN_BASE}${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-mono"
            >
              {txHash.slice(0, 12)}…
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={minting}
          className="w-full bg-bitcoin-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {minting ? 'Minting...' : 'Mint Property NFT'}
        </button>
      </form>
    </div>
  );
};
```

### `./src/pages/Dashboard.tsx`
```tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const OPWAP_ADDR = (import.meta as any).env?.VITE_OPWAP_TOKEN_ADDRESS || 'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp'

export default function Dashboard() {
  const { connected, walletAddr, walletSats, btcPrice } = useAppStore()
  const [opwapBal, setOpwapBal] = useState<number | null>(null)
  const [totalSupply, setTotalSupply] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const btcVal = walletSats != null ? walletSats / 1e8 : 0
  const usdVal = btcPrice ? btcVal * btcPrice : 0

  useEffect(() => {
    if (!connected || !walletAddr) { setLoading(false); return }
    let cancelled = false
    async function load() {
      try {
        const opnet = await import('opnet')
        const { JSONRpcProvider, getContract, OP_20_ABI } = opnet as any
        const provider = new JSONRpcProvider({ url: 'https://testnet.opnet.org' })
        const c = getContract(OPWAP_ADDR, OP_20_ABI, provider)
        const [b, s] = await Promise.allSettled([
          c.balanceOf(walletAddr),
          c.totalSupply(),
        ])
        if (cancelled) return
        if (b.status === 'fulfilled') {
          const raw = (b.value as any)?.balance ?? (b.value as any)?.result?.balance
          if (raw != null) setOpwapBal(Number(raw))
        }
        if (s.status === 'fulfilled') {
          const raw = (s.value as any)?.totalSupply ?? (s.value as any)?.result?.totalSupply
          if (raw != null) setTotalSupply(Number(raw))
        }
      } catch(e) { console.warn('[Dashboard]', e) }
      finally { if (!cancelled) setLoading(false) }
    }
    load()
    const iv = setInterval(load, 30000)
    return () => { cancelled = true; clearInterval(iv) }
  }, [connected, walletAddr])

  if (!connected) return (
    <div className="dashboard-gate">
      <div className="dashboard-gate-card">
        <div style={{fontSize:'3rem',marginBottom:'16px'}}>&#x1F512;</div>
        <h2 style={{marginBottom:'8px'}}>Connect Your Wallet</h2>
        <p style={{color:'rgba(255,255,255,.45)',marginBottom:'24px'}}>Connect to view your portfolio.</p>
        <Link to="/" className="btn-primary" style={{display:'inline-block',textDecoration:'none',padding:'12px 28px'}}>Go to Home</Link>
      </div>
    </div>
  )

  const short = walletAddr ? walletAddr.slice(0,8) + '...' + walletAddr.slice(-6) : ''
  const supplyPct = totalSupply != null ? Math.min((totalSupply / 1e9) * 100, 100) : 0
  const opwapDisplay = loading ? '...' : (opwapBal != null ? (opwapBal / 1e8).toFixed(4) : '0.0000')

  const stats = [
    { label: 'BTC Balance', value: btcVal.toFixed(6), unit: 'BTC', color: '#f97316', sub: 'approx $' + usdVal.toFixed(2) + ' USD' },
    { label: 'OPWAP Tokens', value: opwapDisplay, unit: 'OPWAP', color: '#fbbf24', sub: 'Asset Alpha - 15% APY' },
    { label: 'Est. Annual Yield', value: '15%', unit: 'APY', color: '#22c55e', sub: 'Platform target rate' },
    { label: 'Network', value: 'Testnet4', unit: '', color: '#60a5fa', sub: 'OP_NET Signet fork' },
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Portfolio Dashboard</h1>
            <p className="dashboard-addr">{short}</p>
          </div>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="btn-outline-sm">
            View on OPScan
          </a>
        </div>

        <div className="dashboard-stats">
          {stats.map(s => (
            <div key={s.label} className="dashboard-stat-card">
              <div className="dashboard-stat-label">{s.label}</div>
              <div className="dashboard-stat-value" style={{color: s.color}}>
                {s.value}{s.unit && <span className="dashboard-stat-unit"> {s.unit}</span>}
              </div>
              <div className="dashboard-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {totalSupply != null && (
          <div className="dashboard-supply">
            <div className="dashboard-supply-header">
              <span>OPWAP Supply Minted</span>
              <span className="dashboard-supply-pct">{supplyPct.toFixed(4)}%</span>
            </div>
            <div className="dashboard-supply-bar">
              <div className="dashboard-supply-fill" style={{width: Math.max(supplyPct, 0.1) + '%'}} />
            </div>
            <div className="dashboard-supply-numbers">
              <span>{(totalSupply / 1e8).toLocaleString()} OPWAP minted</span>
              <span>1,000,000,000 max supply</span>
            </div>
          </div>
        )}

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Your Holdings</h2>
          {opwapBal != null && opwapBal > 0 ? (
            <div className="dashboard-holdings">
              <div className="dashboard-holding-card">
                <div className="dashboard-holding-header">
                  <span className="dashboard-holding-symbol">OPWAP</span>
                  <span className="dashboard-holding-badge">Active</span>
                </div>
                <div className="dashboard-holding-val">{(opwapBal / 1e8).toFixed(4)}</div>
                <div className="dashboard-holding-sub">OPWAProperty - Asset Alpha</div>
                <div className="dashboard-holding-apy">15% APY</div>
              </div>
            </div>
          ) : (
            <div className="dashboard-empty">
              <p style={{color:'rgba(255,255,255,.35)'}}>No holdings yet. <Link to="/#assets" style={{color:'var(--accent)'}}>Invest in an asset</Link> to start.</p>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Transaction History</h2>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="dashboard-tx-link">
            View all transactions on OPScan Explorer
          </a>
        </div>
      </div>
    </div>
  )
}
```

### `./src/pages/Home.tsx`
```tsx
import React, { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { useInvestment } from '../hooks/useInvestment'

const SATS_PER_TOKEN = 1000
const BTC_TO_SATS = 100_000_000
const BTC_PER_TOKEN = SATS_PER_TOKEN / BTC_TO_SATS

function normalizeBtcInput(raw: string): number {
  const val = parseFloat(raw.replace(',', '.'))
  return isNaN(val) ? 0 : val
}
function calcTokensFromBtc(btc: number): number {
  return Math.floor(Math.round(btc * BTC_TO_SATS) / SATS_PER_TOKEN)
}
function calcBtcFromTokens(tokens: number): string {
  return (tokens * BTC_PER_TOKEN).toFixed(8).replace(/\.?0+$/, '')
}

interface AssetCardProps {
  id: string; title: string; desc: string; apy: string; apyClass: string
  change: string; available: number; total: number; type: string
  imgStyle?: React.CSSProperties; badgeClass: string; badgeLabel: string; delay: string
}

function AssetCard({ id, title, desc, apy, apyClass, change, available, total, type, imgStyle, badgeClass, badgeLabel, delay }: AssetCardProps) {
  const { connected } = useAppStore()
  const { connect } = useWallet()
  const { invest, loading, error, result, reset } = useInvestment()
  const [open, setOpen] = useState(false)
  const [btcRaw, setBtcRaw] = useState('')
  const [tokensRaw, setTokensRaw] = useState('')

  const handleBtcChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setBtcRaw(raw)
    const btc = normalizeBtcInput(raw)
    setTokensRaw(btc > 0 ? String(calcTokensFromBtc(btc)) : '')
  }, [])

  const handleTokensChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setTokensRaw(raw)
    const t = parseInt(raw, 10)
    setBtcRaw(!isNaN(t) && t > 0 ? calcBtcFromTokens(t) : '')
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!connected) { connect('opnet'); return }
    const btc = normalizeBtcInput(btcRaw)
    if (btc <= 0) return
    await invest(btc)
  }, [connected, connect, btcRaw, invest])

  const handleOpen = useCallback(() => { reset(); setBtcRaw(''); setTokensRaw(''); setOpen(true) }, [reset])

  const progressPct = Math.min(100, Math.round(((total - available) / total) * 100))
  const btcValue = normalizeBtcInput(btcRaw)
  const tokenCount = calcTokensFromBtc(btcValue)
  const isValidAmount = btcValue >= BTC_PER_TOKEN

  return (
    <div className={`ativo-card fade-in-up ${delay}`} data-type={type} data-name={title}>
      <div className="ativo-img" style={imgStyle}>
        <div className="ativo-img-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <div className="ativo-img-overlay" />
        <div className="ativo-badges">
          <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
          <span className="badge badge-ok">Active</span>
        </div>
      </div>

      <div className="ativo-body">
        <div className="ativo-id">{id} · OP_NET/OPWA</div>
        <div className="ativo-name">{title}</div>
        <div className="ativo-desc">{desc}</div>
        <div className="value-toggle-row">
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Display in:</span>
          <button className="value-toggle-btn active">BTC</button>
          <button className="value-toggle-btn">USD</button>
        </div>
        <div className="ativo-stats">
          <div className="ativo-stat"><div className="ativo-stat-label">Price</div><div className="ativo-stat-value">—</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">APY</div><div className={`ativo-stat-value ${apyClass}`}>{apy}</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">24h</div><div className="ativo-stat-value pos">{change}</div></div>
        </div>
        <div className="tx-details">
          <div className="tx-detail-row"><span>Est. Gas</span><span className="tx-detail-val acc">—</span></div>
          <div className="tx-detail-row"><span>Slippage</span><span className="tx-detail-val">0.5%</span></div>
          <div className="tx-detail-row"><span>Contract</span><span className="tx-detail-val" style={{ fontSize: 10 }}>OP_NET</span></div>
        </div>
        <div className="progress-wrap">
          <div className="progress-label">
            <span>Availability</span>
            <span style={{ color: 'var(--text-3)' }}>{available} / {total} tokens</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progressPct}%` }} /></div>
        </div>
        <button className="btn-card" onClick={open ? () => { setOpen(false); reset() } : handleOpen}>
          {open ? 'Close ✕' : 'Invest Now'}
        </button>
      </div>

      <div className={`ativo-expand-panel${open ? ' open' : ''}`}>
        <div className="ativo-expand-inner">
          <div className="ativo-expand-title">Investment Details</div>
          <div className="expand-field">
            <label>Amount (BTC)</label>
            <input className="expand-input" type="text" inputMode="decimal" placeholder="0.00001" value={btcRaw} onChange={handleBtcChange} />
            {btcRaw && !isValidAmount && <div style={{ fontSize: 11, color: 'var(--danger)', marginTop: 4 }}>Minimum: 0.00001 BTC (1 token)</div>}
          </div>
          <div className="expand-field">
            <label>Number of tokens</label>
            <input className="expand-input" type="text" inputMode="numeric" placeholder="1" value={tokensRaw} onChange={handleTokensChange} />
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>1 token = 0.00001 BTC (1,000 sats)</div>
          </div>
          {isValidAmount && tokenCount > 0 && (
            <div style={{ padding: 12, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 10, marginBottom: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 4 }}>You will receive</div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--accent)' }}>{tokenCount.toLocaleString()} OPWAP</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'DM Mono,monospace', marginTop: 2 }}>≈ {btcValue.toFixed(8)} BTC</div>
            </div>
          )}
          {error && <div style={{ fontSize: 12, color: 'var(--danger)', marginBottom: 10, padding: '8px 12px', background: 'rgba(239,68,68,.08)', borderRadius: 8, border: '1px solid rgba(239,68,68,.2)' }}>{error}</div>}
          {result && (
            <div style={{ fontSize: 12, color: 'var(--success)', marginBottom: 10, padding: '8px 12px', background: 'rgba(16,185,129,.08)', borderRadius: 8, border: '1px solid rgba(16,185,129,.2)' }}>
              ✅ Mint successful!{' '}<a href={result.opscanUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>View on OPScan ↗</a>
            </div>
          )}
          <button className="btn-invest" onClick={handleConfirm} disabled={loading || (connected && !isValidAmount)}>
            {loading ? 'Processing...' : !connected ? 'Connect Wallet' : 'Confirm Investment'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Gato laranja SVG para o thumb do slider
function SliderThumb() {
  return (
    <div style={{
      width: 20, height: 20, borderRadius: '50%',
      background: 'var(--accent)',
      border: '2px solid #fff',
      boxShadow: '0 0 8px rgba(249,115,22,.6)',
    }} />
  )
}

function Simulator() {
  const { btcPrice } = useAppStore()
  const price = btcPrice || 65000

  const [currency, setCurrency] = useState<'btc' | 'usd'>('btc')
  // strings para permitir apagar tudo
  const [initialRaw, setInitialRaw] = useState('0.005')
  const [monthlyRaw, setMonthlyRaw] = useState('0')
  const [years, setYears] = useState(1)

  // parse seguro — retorna 0 se vazio/inválido
  const parseRaw = (s: string) => { const v = parseFloat(s.replace(',', '.')); return isNaN(v) ? 0 : Math.max(0, v) }

  const initialBtc = currency === 'btc' ? parseRaw(initialRaw) : parseRaw(initialRaw) / price
  const monthlyBtc = currency === 'btc' ? parseRaw(monthlyRaw) : parseRaw(monthlyRaw) / price

  const initialUsd = initialBtc * price
  const monthlyUsd = monthlyBtc * price

  const prefix = currency === 'btc' ? '₿ ' : '$ '
  const fmtBtc = (v: number) => '₿ ' + v.toFixed(5)
  const fmtUsd = (v: number) => '$ ' + v.toLocaleString('en-US', { maximumFractionDigits: 0 })
  const fmt = (btc: number) => currency === 'btc' ? fmtBtc(btc) : fmtUsd(btc * price)

  const OPWA_APY = 15
  const ALT_APY_A = 6.9
  const ALT_APY_B = 4.2

  function calcTotal(apy: number) {
    const r = apy / 100 / 12
    const n = years * 12
    const fv = initialBtc * Math.pow(1 + r, n) +
      (r > 0 ? monthlyBtc * (Math.pow(1 + r, n) - 1) / r : monthlyBtc * n)
    return { total: fv, returns: fv - initialBtc - monthlyBtc * n }
  }

  const opwa = calcTotal(OPWA_APY)
  const altA = calcTotal(ALT_APY_A)
  const altB = calcTotal(ALT_APY_B)

  const stepInitial = currency === 'btc' ? 0.001 : 100
  const stepMonthly = currency === 'btc' ? 0.0001 : 10

  const bumpInitial = (dir: number) => {
    const cur = parseRaw(initialRaw)
    const next = Math.max(0, cur + dir * stepInitial)
    setInitialRaw(currency === 'btc' ? next.toFixed(5) : next.toFixed(2))
  }
  const bumpMonthly = (dir: number) => {
    const cur = parseRaw(monthlyRaw)
    const next = Math.max(0, cur + dir * stepMonthly)
    setMonthlyRaw(currency === 'btc' ? next.toFixed(5) : next.toFixed(2))
  }

  const comparisons = [
    { name: 'OPWA Platform', apy: OPWA_APY, data: opwa, main: true, apyColor: '#22c55e' },
    { name: 'Fixed Income', apy: ALT_APY_A, data: altA, main: false, apyColor: '#eab308' },
    { name: 'Savings Account', apy: ALT_APY_B, data: altB, main: false, apyColor: '#ef4444' },
  ]

  return (
    <div className="simulador-section" id="simulator">
      <div className="simulador-inner">
        <div className="section-eyebrow">Tool</div>
        <h2 className="section-title">Investment Simulator</h2>
        <p className="section-subtitle" style={{ marginBottom: 32 }}>
          Model your returns and compare the platform against traditional alternatives.
        </p>
        <div className="simulador-grid">
          <div className="sim-panel">

            {/* Toggle BTC/USD */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <button
                onClick={() => setCurrency('btc')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                  border: '1.5px solid',
                  borderColor: currency === 'btc' ? 'var(--accent)' : 'var(--border)',
                  background: currency === 'btc' ? 'var(--accent-dim)' : 'transparent',
                  color: currency === 'btc' ? 'var(--accent)' : '#444',
                  cursor: 'pointer', transition: 'all .15s',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                BTC
              </button>
              <button
                onClick={() => setCurrency('usd')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                  border: '1.5px solid',
                  borderColor: currency === 'usd' ? '#22c55e' : 'var(--border)',
                  background: currency === 'usd' ? 'rgba(34,197,94,.1)' : 'transparent',
                  color: currency === 'usd' ? '#22c55e' : '#444',
                  cursor: 'pointer', transition: 'all .15s',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
                USD
              </button>
            </div>

            {/* Initial Investment */}
            <div className="sim-field">
              <label>Initial Investment
                <span style={{ color: 'var(--text-3)', marginLeft: 8, fontWeight: 400 }}>
                  ≈ {currency === 'btc' ? fmtUsd(initialUsd) : fmtBtc(initialBtc)}
                </span>
              </label>
              <div className="sim-stepper">
                <button className="sim-stepper-btn" onClick={() => bumpInitial(-1)}>−</button>
                <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: 10, fontSize: 13, color: currency === 'btc' ? 'var(--accent)' : '#22c55e', fontWeight: 700, pointerEvents: 'none' }}>{prefix}</span>
                  <input
                    className="sim-stepper-input"
                    type="text"
                    inputMode="decimal"
                    value={initialRaw}
                    onChange={e => setInitialRaw(e.target.value)}
                    onBlur={e => {
                      const v = parseRaw(e.target.value)
                      setInitialRaw(currency === 'btc' ? v.toFixed(5) : v.toFixed(2))
                    }}
                    style={{ textAlign: 'center', fontFamily: 'DM Mono, monospace', fontSize: 15, paddingLeft: 22 }}
                  />
                </div>
                <button className="sim-stepper-btn" onClick={() => bumpInitial(1)}>+</button>
              </div>
            </div>

            {/* Monthly Investment */}
            <div className="sim-field">
              <label>Monthly Investment
                <span style={{ color: 'var(--text-3)', marginLeft: 8, fontWeight: 400 }}>
                  ≈ {currency === 'btc' ? fmtUsd(monthlyUsd) : fmtBtc(monthlyBtc)}
                </span>
              </label>
              <div className="sim-stepper">
... [TRUNCADO - 616 linhas] ...
```

### `./src/pages/Marketplace.tsx`
```tsx
export default function Marketplace() {
  return <div style={{padding:'120px 40px',textAlign:'center',color:'var(--text-2)'}}>Marketplace — coming soon</div>
}
```

### `./src/pages/Privacy.tsx`
```tsx
export default function Privacy() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 100px' }}>
      <div className="section-eyebrow">Legal</div>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: '8px 0 8px' }}>Privacy Policy</h1>
      <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 40, fontFamily: 'DM Mono, monospace' }}>Last updated: January 2025 · OPWA Protocol</p>

      {[
        { title: '1. Overview', body: 'OPWA Protocol ("we", "us") is committed to transparency. This Privacy Policy explains what data we collect, how we use it, and your rights. Because OPWA operates on a public blockchain, certain information is inherently public and cannot be made private.' },
        { title: '2. Information We Collect', body: 'We do not collect personally identifiable information directly. When you interact with the Platform, your Bitcoin wallet address and all transaction data are recorded on the OP_NET blockchain and are publicly visible. We do not store your private keys, seed phrases, or passwords at any point.' },
        { title: '3. Blockchain Data', body: 'All transactions executed through OPWA smart contracts are permanently recorded on the Bitcoin blockchain via OP_NET. This includes wallet addresses, token amounts, timestamps, and transaction hashes. This data is public, immutable, and cannot be deleted.' },
        { title: '4. Analytics', body: 'The Platform may use privacy-respecting analytics tools to understand aggregate usage patterns (e.g., page views, session duration). We do not use cookies for advertising or share usage data with third-party advertisers.' },
        { title: '5. Third-Party Services', body: 'The Platform integrates with third-party services including: CoinGecko (BTC price data), Mempool.opnet.org (gas price data), and OPScan (blockchain explorer). Each of these services has its own privacy policy. We encourage you to review them.' },
        { title: '6. Wallet Extensions', body: 'When you connect a wallet (OP_Wallet, Unisat, Xverse, or OKX), the wallet extension may request your public key and Bitcoin address. OPWA only reads the public key — we never request your private key or seed phrase. Wallet extension data handling is governed by each wallet\'s own privacy policy.' },
        { title: '7. Data Retention', body: 'We do not maintain a database of user information. Blockchain transaction data is retained indefinitely by the OP_NET network by its nature. Any off-chain analytics data is retained for a maximum of 90 days.' },
        { title: '8. Your Rights', body: 'Because we collect minimal off-chain data, most privacy rights (access, deletion, correction) do not apply to on-chain transaction data. For any off-chain data inquiries, contact us via GitHub. We will respond within 30 days.' },
        { title: '9. Security', body: 'We take reasonable measures to secure any off-chain systems. However, no system is 100% secure. The decentralized nature of OP_NET means that smart contract interactions are secured by the Bitcoin network\'s consensus mechanism.' },
        { title: '10. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the Platform after changes constitutes acceptance of the new policy.' },
        { title: '11. Contact', body: 'For privacy inquiries, contact us via GitHub at github.com/Opwabtc or through official OPWA community channels.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{s.title}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>{s.body}</p>
        </div>
      ))}

      <div style={{ marginTop: 48, padding: '20px 24px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-3)' }}>
        We are committed to protecting your privacy and operating transparently on a public blockchain.
        <div style={{ marginTop: 12 }}>
          <a href="/" style={{ color: 'var(--accent)', marginRight: 16 }}>← Back to Platform</a>
          <a href="/terms" style={{ color: 'var(--text-3)' }}>Terms of Service →</a>
        </div>
      </div>
    </div>
  )
}
```

### `./src/pages/PropertyManagement.tsx`
```tsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Home, DollarSign, Calendar } from 'lucide-react';
import type { Property } from '@/types';
import { formatSatsToBTC, formatNumber } from '@/lib/utils';

export const PropertyManagement: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 'prop-001',
      name: 'Luxury Downtown Apartment',
      description: 'Modern 2-bedroom apartment in the heart of the financial district with stunning city views.',
      address: '123 Main St, Suite 45B',
      city: 'New York',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      totalSupply: 1000000,
      availableTokens: 750000,
      pricePerToken: 50000,
      totalValue: 50000000000,
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
      documents: ['QmPropertyDoc1', 'QmPropertyDoc2'],
      propertyType: 'residential',
      squareMeters: 120,
      bedrooms: 2,
      bathrooms: 2,
      yearBuilt: 2020,
      status: 'active',
      apy: 8.5,
      monthlyRent: 4166667,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-02-20T14:30:00Z',
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handleCreateProperty = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== propertyId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Property Management
              </h1>
              <span className="ml-3 px-3 py-1 bg-bitcoin-orange text-white text-xs rounded-full">
                Admin
              </span>
            </div>
            
            <button
              onClick={handleCreateProperty}
              className="flex items-center gap-2 bg-bitcoin-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {properties.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {properties.filter(p => p.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatSatsToBTC(properties.reduce((sum, p) => sum + p.totalValue, 0))} BTC
                </p>
              </div>
              <div className="p-3 bg-bitcoin-orange bg-opacity-10 rounded-lg">
                <span className="text-bitcoin-orange text-xl font-bold">₿</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. APY</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(properties.reduce((sum, p) => sum + (p.apy || 0), 0) / properties.length).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Properties
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Token Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Available
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={property.images[0]}
                          alt={property.name}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {property.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {property.squareMeters}m²
                            {property.bedrooms && ` • ${property.bedrooms} bed`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {property.city}, {property.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {property.propertyType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900 dark:text-white">
                        {formatSatsToBTC(property.pricePerToken)} BTC
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatNumber(property.availableTokens)} / {formatNumber(property.totalSupply)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {((property.availableTokens / property.totalSupply) * 100).toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProperty(property)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {properties.length === 0 && (
            <div className="text-center py-12">
              <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No properties found. Add your first property to get started.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Create/Edit Property Modal */}
      {(isCreateModalOpen || editingProperty) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </h3>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingProperty(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Property Name
                    </label>
                    <input
                      type="text"
                      defaultValue={editingProperty?.name}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter property name"
                    />
... [TRUNCADO - 481 linhas] ...
```

### `./src/pages/Simulator.tsx`
```tsx
import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Info } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export const Simulator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('1000');
  const [period, setPeriod] = useState<string>('12');
  const [rate, setRate] = useState<string>('1.2');

  const initial = parseFloat(initialInvestment) || 0;
  const monthly = parseFloat(monthlyInvestment) || 0;
  const months = parseInt(period) || 12;
  const monthlyRate = parseFloat(rate) / 100;

  // Calculate compound interest with monthly contributions
  const calculateFutureValue = () => {
    let futureValue = initial * Math.pow(1 + monthlyRate, months);
    
    if (monthly > 0) {
      const contributionValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      futureValue += contributionValue;
    }
    
    return futureValue;
  };

  const futureValue = calculateFutureValue();
  const totalInvested = initial + (monthly * months);
  const totalReturns = futureValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 animate-fadeInUp">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Simulador de Investimentos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calcule o potencial de retorno dos seus investimentos imobiliários tokenizados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="card">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Parâmetros de Simulação
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investimento Inicial (R$)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
                    placeholder="10000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aporte Mensal (R$)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Período (meses)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
                  >
                    <option value="6">6 meses</option>
                    <option value="12">12 meses</option>
                    <option value="24">24 meses</option>
                    <option value="36">36 meses</option>
                    <option value="60">5 anos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rentabilidade Mensal (%)
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
                    placeholder="1.2"
                  />
                </div>
                <div className="mt-2 flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Rentabilidade média baseada em histórico de ativos imobiliários tokenizados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Main Result */}
          <div className="gradient-bitcoin rounded-2xl p-8 text-white text-center">
            <h3 className="text-lg font-medium mb-2 opacity-90">
              Valor na carteira após {months} meses
            </h3>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              R$ {formatNumber(futureValue)}
            </div>
            <div className="text-lg opacity-90">
              Total investido: R$ {formatNumber(totalInvested)}
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Detalhamento do Retorno
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Investimento Inicial</span>
                  <span className="font-mono font-semibold">R$ {formatNumber(initial)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Aportes Mensais</span>
                  <span className="font-mono font-semibold">R$ {formatNumber(monthly * months)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Investido</span>
                  <span className="font-mono font-semibold">R$ {formatNumber(totalInvested)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Ganhos</span>
                  <span className="font-mono font-semibold text-green-600 dark:text-green-400">
                    R$ {formatNumber(totalReturns)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-900 dark:text-white font-semibold">Retorno Percentual</span>
                  <span className="font-mono font-bold text-bitcoin-orange">
                    {returnPercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Comparação com Poupança
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Seu investimento</span>
                  <span className="font-mono font-semibold text-bitcoin-orange">
                    R$ {formatNumber(futureValue)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Poupança (0.5% ao ano)</span>
                  <span className="font-mono text-gray-500">
                    R$ {formatNumber(totalInvested * 1.0025)}
                  </span>
                </div>
                
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white font-semibold">Diferença</span>
                    <span className="font-mono font-bold text-green-600 dark:text-green-400">
                      R$ {formatNumber(futureValue - (totalInvested * 1.0025))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12">
        <div className="card text-center">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Pronto para começar a investir?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Abra sua conta e comece a aplicar esses retornos em nossos ativos imobiliários tokenizados
            </p>
            <button className="btn-primary text-lg px-8 py-3">
              Abrir Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### `./src/pages/Terms.tsx`
```tsx
export default function Terms() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 100px' }}>
      <div className="section-eyebrow">Legal</div>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: '8px 0 8px' }}>Terms of Service</h1>
      <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 40, fontFamily: 'DM Mono, monospace' }}>Last updated: January 2025 · OPWA Protocol</p>

      {[
        { title: '1. Acceptance of Terms', body: 'By accessing or using the OPWA platform ("Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform. OPWA is a decentralized real estate tokenization protocol built on the Bitcoin network via OP_NET smart contracts.' },
        { title: '2. Nature of the Platform', body: 'OPWA enables fractional ownership of real-world assets through blockchain tokenization. All transactions are executed on OP_NET Testnet for demonstration purposes. The Platform does not guarantee returns, liquidity, or the value of any tokens. OPWAP tokens represent a fractional interest in tokenized property assets and are subject to market risk.' },
        { title: '3. Eligibility', body: 'You must be at least 18 years old and legally permitted to participate in digital asset transactions in your jurisdiction. By using the Platform, you represent that you meet these requirements and that your use complies with all applicable laws and regulations.' },
        { title: '4. Wallet & Private Keys', body: 'OPWA does not custody your funds or private keys. You are solely responsible for the security of your Bitcoin wallet. Lost private keys cannot be recovered. All investment transactions are irreversible once confirmed on-chain. Use of testnet faucet funds carries no financial risk.' },
        { title: '5. Risks', body: 'Digital assets involve significant risk including price volatility, regulatory uncertainty, and smart contract bugs. Past performance is not indicative of future results. The Platform is currently operating on OP_NET Testnet — mainnet features are under development. Do not invest more than you can afford to lose.' },
        { title: '6. Prohibited Activities', body: 'You may not use the Platform to launder money, evade sanctions, or engage in any fraudulent activity. Automated scraping, reverse engineering of smart contracts for malicious purposes, or any action that compromises the integrity of the OP_NET protocol is strictly prohibited.' },
        { title: '7. Intellectual Property', body: 'All content, branding, and code on the OPWA Platform is the property of OPWA Protocol. The smart contracts are open-source and available on GitHub. You may fork and build upon the contracts subject to the applicable open-source license.' },
        { title: '8. Disclaimers', body: 'THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. OPWA PROTOCOL DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. WE ARE NOT RESPONSIBLE FOR ANY LOSSES RESULTING FROM USE OF THE PLATFORM.' },
        { title: '9. Governing Law', body: 'These Terms are governed by the laws of the applicable jurisdiction without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration.' },
        { title: '10. Contact', body: 'For questions regarding these Terms, contact us via GitHub at github.com/Opwabtc or through the official OPWA community channels.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{s.title}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>{s.body}</p>
        </div>
      ))}

      <div style={{ marginTop: 48, padding: '20px 24px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-3)' }}>
        By using OPWA, you acknowledge that you have read, understood, and agree to these Terms of Service.
        <div style={{ marginTop: 12 }}>
          <a href="/" style={{ color: 'var(--accent)', marginRight: 16 }}>← Back to Platform</a>
          <a href="/privacy" style={{ color: 'var(--text-3)' }}>Privacy Policy →</a>
        </div>
      </div>
    </div>
  )
}
```

### `./src/store/useAppStore.ts`
```ts
import { create } from 'zustand'

interface AppState {
  connected: boolean; wallet: string | null; walletAddr: string | null
  walletSats: number; publicKey: string | null; network: string
  btcPrice: number | null; gasPrice: number; theme: 'dark' | 'light'
  setWallet: (d: Partial<AppState>) => void
  disconnect: () => void
  setPrices: (btc: number | null, gas: number) => void
  setTheme: (t: 'dark' | 'light') => void
}

export const useAppStore = create<AppState>((set) => ({
  connected: false, wallet: null, walletAddr: null,
  walletSats: 0, publicKey: null, network: 'OP_NET Testnet',
  btcPrice: null, gasPrice: 10,
  theme: (typeof localStorage !== 'undefined'
    ? (localStorage.getItem('opwa-theme') as 'dark' | 'light') : null) || 'dark',
  setWallet: (d) => set(d),
  disconnect: () => set({ connected: false, wallet: null, walletAddr: null, walletSats: 0, publicKey: null }),
  setPrices: (btcPrice, gasPrice) => set({ btcPrice, gasPrice }),
  setTheme: (theme) => { localStorage.setItem('opwa-theme', theme); set({ theme }) },
}))
```

### `./src/types/index.ts`
```ts
export interface Property {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  totalSupply: number;
  availableTokens: number;
  pricePerToken: number; // in BTC satoshis
  totalValue: number; // in BTC satoshis
  images: string[];
  documents: string[];
  propertyType: 'residential' | 'commercial' | 'mixed';
  squareMeters: number;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  status: 'active' | 'pending' | 'sold_out';
  apy?: number; // Annual percentage yield from rent
  monthlyRent?: number; // in BTC satoshis
  createdAt: string;
  updatedAt: string;
}

export interface PropertyToken {
  propertyId: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: number;
  totalSupply: number;
  pricePerToken: number;
  valueInBTC: number;
}

export interface WalletState {
  isConnected: boolean;
  address?: string;
  balance: number; // in satoshis
  network: 'mainnet' | 'testnet';
}

export interface Portfolio {
  totalValueBTC: number;
  totalValueUSD: number;
  properties: PropertyToken[];
  monthlyIncome: number;
  totalIncome: number;
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'rent_claim' | 'token_transfer';
  propertyId: string;
  propertyName: string;
  amount: number;
  price: number;
  totalValue: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

export interface PriceHistory {
  date: string;
  price: number;
  volume: number;
  marketCap: number;
}

export interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  activeProperties: number;
  totalInvestors: number;
  averageAPY: number;
}

export interface User {
  address: string;
  reputation: number;
  joinedAt: string;
  totalInvested: number;
  totalEarned: number;
  propertiesOwned: string[];
}

export interface Listing {
  id: string;
  propertyId: string;
  seller: string;
  tokenAmount: number;
  pricePerToken: number;
  totalPrice: number;
  type: 'fixed_price' | 'auction';
  status: 'active' | 'cancelled' | 'sold';
  createdAt: string;
  expiresAt?: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
```

### `./src/types/wallet.d.ts`
```ts
export {}
declare global {
  interface Window {
    opnet?: any
    unisat?: any
    BitcoinProvider?: any
    XverseProviders?: { BitcoinProvider?: any }
    okxwallet?: { bitcoin?: any }
  }
}
```

### `./src/utils/defaultProvider.ts`
```ts
import { JSONRpcProvider } from 'opnet';
import { networks } from '@btc-vision/bitcoin';

// Default provider for read-only calls before wallet connects
export const defaultProvider = new JSONRpcProvider({
  url: 'https://testnet.opnet.org',
  network: networks.opnetTestnet,
});
```

### `./src/utils/opnetContracts.ts`
```ts
import {
  getContract,
  IOP20Contract,
  JSONRpcProvider,
  OP_20_ABI,
  TransactionParameters,
} from 'opnet';
import { Address } from '@btc-vision/transaction';
import { Network } from '@btc-vision/bitcoin';

// ── READ: get an OP-20 contract instance (read-only, no signer needed) ──────
export function getOP20Contract(
  contractAddress: string,
  provider: JSONRpcProvider,
  network: Network,
  callerAddress?: Address,
): IOP20Contract {
  return getContract<IOP20Contract>(
    contractAddress,
    OP_20_ABI,
    provider,
    network,
    callerAddress,
  );
}

// ── READ: fetch token metadata ───────────────────────────────────────────────
export async function fetchTokenMetadata(
  contractAddress: string,
  provider: JSONRpcProvider,
  network: Network,
) {
  const contract = getOP20Contract(contractAddress, provider, network);
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
  ]);
  return {
    name:        name.properties.name        as string,
    symbol:      symbol.properties.symbol    as string,
    decimals:    decimals.properties.decimals as number,
    totalSupply: totalSupply.properties.totalSupply as bigint,
  };
}

// ── READ: get a user's token balance ─────────────────────────────────────────
export async function fetchTokenBalance(
  contractAddress: string,
  userAddress: Address,
  provider: JSONRpcProvider,
  network: Network,
): Promise<bigint> {
  const contract = getOP20Contract(contractAddress, provider, network, userAddress);
  const result = await contract.balanceOf(userAddress);
  return result.properties.balance as bigint;
}

// ── WRITE: build a transfer simulation, ready to sign ────────────────────────
export async function buildTransferTx(
  contractAddress: string,
  toAddress: Address,
  amount: bigint,
  provider: JSONRpcProvider,
  network: Network,
  senderAddress: Address,
): Promise<TransactionParameters> {
  const contract = getOP20Contract(
    contractAddress, provider, network, senderAddress
  );
  // Returns a simulation — call .sendTransaction(params) to execute
  return contract.transfer(toAddress, amount) as unknown as TransactionParameters;
}
```

### `./src/vite-env.d.ts`
```ts
/// <reference types="vite/client" />
```

### `./tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        bitcoin: {
          orange: '#f7931a',
          dark: '#4a4a4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
```

### `./vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 3000,
        host: true
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    }
});
```

### `./vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

## Erros TypeScript
```
```
## Git Log
```
b0456c36 fix: remove BrowserRouter duplo do App.tsx — tela preta resolvida (s14)
2acca5d6 fix: TS errors Navigation+Dashboard — any cast store, opnet import (s14)
123b4f69 feat: dashboard + nav tab + slider dot fix + step hover white + 3D card polish (s14)
9fc00775 fix: circulo slider + step hover branco + mint writer.buffer patch definitivo (s13)
de6cf415 fix: mint debug patch + slider clean (s13)
299fe5cc fix: slider gato sincronizado + trilho laranja + step hover + mint BinaryWriter patch (s13)
d2d28988 fix: mint selector patch keccak256 0x40c10f19 via encodeFunctionData override (s13)
139860a6 fix: MINT_ABI selector cast — remove campo inválido FunctionBaseData (s13)
a952661d feat: Dashboard link no wallet dropdown + menu mobile (s13)
81944000 fix: mint keccak256 0x40c10f19 + gato centralizado + mobile polish + step hover + gas mobile (s13)
```
