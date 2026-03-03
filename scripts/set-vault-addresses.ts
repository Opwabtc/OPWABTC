/**
 * set-vault-addresses.ts — Post-deploy configuration for USDOP + YieldVault + PropertyVault
 *
 * Calls (in order):
 *   1. USDOP.setMinter(YIELD_VAULT_ADDR)
 *   2. YieldVault.setAddresses(OPWAY_ADDR, USDOP_ADDR)
 *   3. PropertyVault.setPropertyNft(PROPERTY_NFT_ADDR)
 *
 * Usage:
 *   OPNET_MNEMONIC="..."
 *   USDOP_ADDR="opt1s..."
 *   YIELD_VAULT_ADDR="opt1s..."
 *   PROPERTY_VAULT_ADDR="opt1s..."
 *   npx tsx set-vault-addresses.ts
 */
import { networks } from '@btc-vision/bitcoin';
import {
    ABIDataTypes,
    Mnemonic,
    MLDSASecurityLevel,
    AddressTypes,
    Address,
} from '@btc-vision/transaction';
import {
    BitcoinAbiTypes,
    BitcoinInterfaceAbi,
    getContract,
    JSONRpcProvider,
} from 'opnet';

// ── Config ────────────────────────────────────────────────────────────────────
const TESTNET_RPC = 'https://testnet.opnet.org';
const NETWORK     = networks.opnetTestnet;

// Existing deployed contract addresses (from memory)
const OPWAY_ADDR        = 'opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv';
const PROPERTY_NFT_ADDR = 'opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6';

// New vault addresses (required env vars)
const mnemonic           = process.env.OPNET_MNEMONIC;
const usdopAddr          = process.env.USDOP_ADDR;
const yieldVaultAddr     = process.env.YIELD_VAULT_ADDR;
const propertyVaultAddr  = process.env.PROPERTY_VAULT_ADDR;

if (!mnemonic)          { console.error('ERROR: set OPNET_MNEMONIC');        process.exit(1); }
if (!usdopAddr)         { console.error('ERROR: set USDOP_ADDR');            process.exit(1); }
if (!yieldVaultAddr)    { console.error('ERROR: set YIELD_VAULT_ADDR');      process.exit(1); }
if (!propertyVaultAddr) { console.error('ERROR: set PROPERTY_VAULT_ADDR');   process.exit(1); }

// ── Wallet ────────────────────────────────────────────────────────────────────
const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Deployer P2TR  :', wallet.p2tr);
console.log('USDOP          :', usdopAddr);
console.log('YieldVault     :', yieldVaultAddr);
console.log('PropertyVault  :', propertyVaultAddr);
console.log('OPWAY          :', OPWAY_ADDR);
console.log('PropertyNFT    :', PROPERTY_NFT_ADDR);

// ── Provider ──────────────────────────────────────────────────────────────────
const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });

// ── Sender address ────────────────────────────────────────────────────────────
const senderAddr = Address.fromString(
    wallet.address.toString(),
    Buffer.from(wallet.keypair.publicKey).toString('hex'),
);

// ── Helper: resolve contract address to OPNet Address object ──────────────────
// Uses getPublicKeyInfo to get the tweakedPubkey (32-byte identity used by runtime)
async function toContractAddr(contractStr: string): Promise<Address> {
    const resolved = await (provider as unknown as import('opnet').JSONRpcProvider).getPublicKeyInfo(contractStr, true);
    if (!resolved) throw new Error(`Could not resolve address: ${contractStr}`);
    return resolved;
}

// ── Helper: sendTransaction options ──────────────────────────────────────────
const TX_OPTS = {
    signer:                   wallet.keypair,
    mldsaSigner:              wallet.mldsaKeypair,
    refundTo:                 wallet.p2tr,
    network:                  NETWORK,
    maximumAllowedSatToSpend: 50_000n,
};

// ── ABIs ──────────────────────────────────────────────────────────────────────

const USDOP_ABI: BitcoinInterfaceAbi = [
    {
        name:    'setMinter',
        type:    BitcoinAbiTypes.Function,
        payable: false,
        inputs:  [{ name: 'minter', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
    },
];

const YIELD_VAULT_ABI: BitcoinInterfaceAbi = [
    {
        name:    'setAddresses',
        type:    BitcoinAbiTypes.Function,
        payable: false,
        inputs:  [
            { name: 'opway', type: ABIDataTypes.ADDRESS },
            { name: 'usdop', type: ABIDataTypes.ADDRESS },
        ],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
    },
];

const PROPERTY_VAULT_ABI: BitcoinInterfaceAbi = [
    {
        name:    'setPropertyNft',
        type:    BitcoinAbiTypes.Function,
        payable: false,
        inputs:  [{ name: 'addr', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
    },
];

// ── Interfaces ────────────────────────────────────────────────────────────────
interface IUSDOP {
    setMinter(minter: Address): Promise<import('opnet').CallResult<{ success: boolean }>>;
}
interface IYieldVault {
    setAddresses(opway: Address, usdop: Address): Promise<import('opnet').CallResult<{ success: boolean }>>;
}
interface IPropertyVault {
    setPropertyNft(addr: Address): Promise<import('opnet').CallResult<{ success: boolean }>>;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function run(): Promise<void> {
    const providerCast = provider as unknown as import('opnet').JSONRpcProvider;

    console.log('\nResolving contract addresses via getPublicKeyInfo…');
    const [yieldVaultAddress, opwayAddress, usdopAddress, nftAddress] = await Promise.all([
        toContractAddr(yieldVaultAddr!),
        toContractAddr(OPWAY_ADDR),
        toContractAddr(usdopAddr!),
        toContractAddr(PROPERTY_NFT_ADDR),
    ]);
    console.log('✓ All addresses resolved');

    // ── 1. USDOP.setMinter(YieldVault) ────────────────────────────────────────
    console.log('\n[1/3] Calling USDOP.setMinter(YieldVault)…');
    const usdopContract = getContract<IUSDOP>(
        usdopAddr!,
        USDOP_ABI,
        providerCast,
        NETWORK,
        senderAddr,
    );
    const sim1 = await usdopContract.setMinter(yieldVaultAddress);
    if ('error' in sim1) throw new Error(String((sim1 as Record<string, unknown>).error));
    if (sim1.revert) throw new Error(sim1.revert);
    const receipt1 = await sim1.sendTransaction(TX_OPTS);
    console.log('✓ setMinter TX:', receipt1.transactionId);

    // ── 2. YieldVault.setAddresses(OPWAY, USDOP) ──────────────────────────────
    console.log('\n[2/3] Calling YieldVault.setAddresses(OPWAY, USDOP)…');
    const yieldVaultContract = getContract<IYieldVault>(
        yieldVaultAddr!,
        YIELD_VAULT_ABI,
        providerCast,
        NETWORK,
        senderAddr,
    );
    const sim2 = await yieldVaultContract.setAddresses(opwayAddress, usdopAddress);
    if ('error' in sim2) throw new Error(String((sim2 as Record<string, unknown>).error));
    if (sim2.revert) throw new Error(sim2.revert);
    const receipt2 = await sim2.sendTransaction(TX_OPTS);
    console.log('✓ setAddresses TX:', receipt2.transactionId);

    // ── 3. PropertyVault.setPropertyNft(PropertyNFT) ───────────────────────────
    console.log('\n[3/3] Calling PropertyVault.setPropertyNft(PropertyNFT)…');
    const propertyVaultContract = getContract<IPropertyVault>(
        propertyVaultAddr!,
        PROPERTY_VAULT_ABI,
        providerCast,
        NETWORK,
        senderAddr,
    );
    const sim3 = await propertyVaultContract.setPropertyNft(nftAddress);
    if ('error' in sim3) throw new Error(String((sim3 as Record<string, unknown>).error));
    if (sim3.revert) throw new Error(sim3.revert);
    const receipt3 = await sim3.sendTransaction(TX_OPTS);
    console.log('✓ setPropertyNft TX:', receipt3.transactionId);

    // ── Summary ───────────────────────────────────────────────────────────────
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log(' ✓ All vault addresses configured!');
    console.log('');
    console.log(' Add these constants to index.html:');
    console.log('   var USDOP_ADDR          = "' + usdopAddr + '";');
    console.log('   var YIELD_VAULT_ADDR    = "' + yieldVaultAddr + '";');
    console.log('   var PROPERTY_VAULT_ADDR = "' + propertyVaultAddr + '";');
    console.log('═══════════════════════════════════════════════════════════════');
}

run().catch((err) => {
    console.error('Failed:', err);
    process.exit(1);
});
