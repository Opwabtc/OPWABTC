/**
 * configure-property-vault.ts — Call setPropertyNft on a newly deployed PropertyVault
 *
 * Usage:
 *   OPNET_MNEMONIC="..."
 *   PROPERTY_VAULT_ADDR="opt1s..."
 *   npx tsx scripts/configure-property-vault.ts
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

const TESTNET_RPC       = 'https://testnet.opnet.org';
const NETWORK           = networks.opnetTestnet;
const PROPERTY_NFT_ADDR = 'opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6';

const mnemonic          = process.env.OPNET_MNEMONIC;
const propertyVaultAddr = process.env.PROPERTY_VAULT_ADDR;

if (!mnemonic)          { console.error('ERROR: set OPNET_MNEMONIC');       process.exit(1); }
if (!propertyVaultAddr) { console.error('ERROR: set PROPERTY_VAULT_ADDR');  process.exit(1); }

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Deployer P2TR  :', wallet.p2tr);
console.log('PropertyVault  :', propertyVaultAddr);
console.log('PropertyNFT    :', PROPERTY_NFT_ADDR);

const provider   = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });
const senderAddr = Address.fromString(
    wallet.address.toString(),
    Buffer.from(wallet.keypair.publicKey).toString('hex'),
);

const PVAULT_ABI: BitcoinInterfaceAbi = [
    {
        name:    'setPropertyNft',
        type:    BitcoinAbiTypes.Function,
        payable: false,
        inputs:  [{ name: 'addr', type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
    },
];

interface IPropertyVault {
    setPropertyNft(addr: Address): Promise<import('opnet').CallResult<{ success: boolean }>>;
}

async function run(): Promise<void> {
    const providerCast = provider as unknown as import('opnet').JSONRpcProvider;

    console.log('\nResolving PropertyNFT address…');
    const nftAddress = await providerCast.getPublicKeyInfo(PROPERTY_NFT_ADDR, true);
    if (!nftAddress) throw new Error('Could not resolve PropertyNFT address');
    console.log('✓ PropertyNFT resolved');

    console.log('\nCalling PropertyVault.setPropertyNft(PropertyNFT)…');
    const pvaultContract = getContract<IPropertyVault>(
        propertyVaultAddr!,
        PVAULT_ABI,
        providerCast,
        NETWORK,
        senderAddr,
    );

    const sim = await pvaultContract.setPropertyNft(nftAddress);
    if (sim.revert) throw new Error(sim.revert);

    const receipt = await sim.sendTransaction({
        signer:                   wallet.keypair,
        mldsaSigner:              wallet.mldsaKeypair,
        refundTo:                 wallet.p2tr,
        network:                  NETWORK,
        maximumAllowedSatToSpend: 50_000n,
    });
    console.log('✓ setPropertyNft TX:', receipt.transactionId);

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log(' ✓ PropertyVault configured!');
    console.log('');
    console.log(' Update index.html:');
    console.log('   var PROPERTY_VAULT_ADDR = "' + propertyVaultAddr + '";');
    console.log('═══════════════════════════════════════════════════════════════');
}

run().catch((err) => {
    console.error('Failed:', err);
    process.exit(1);
});
