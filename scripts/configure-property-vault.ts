/**
 * configure-property-vault.ts
 *
 * FIX HIGH #48: Buffer.from() → Uint8Array
 *
 * Usage:
 *   OPNET_MNEMONIC="..." PROPERTY_VAULT_ADDR="opt1s..." npx tsx scripts/configure-property-vault.ts
 */
import { networks } from '@btc-vision/bitcoin';
import {
  ABIDataTypes,
  Mnemonic,
  MLDSASecurityLevel,
  AddressTypes,
  Address,
} from '@btc-vision/transaction';
import { BitcoinAbiTypes, BitcoinInterfaceAbi, getContract, JSONRpcProvider } from 'opnet';

const TESTNET_RPC       = 'https://testnet.opnet.org';
const NETWORK           = networks.opnetTestnet;
const PROPERTY_NFT_ADDR = 'opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6';
const mnemonic          = process.env.OPNET_MNEMONIC;
const propertyVaultAddr = process.env.PROPERTY_VAULT_ADDR;

if (!mnemonic)          { console.error('ERROR: set OPNET_MNEMONIC');      process.exit(1); }
if (!propertyVaultAddr) { console.error('ERROR: set PROPERTY_VAULT_ADDR'); process.exit(1); }

// FIX HIGH #48: replaces Buffer.from(x).toString('hex')
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1 /* FIX 5.106: LEVEL1 (ML-DSA-44) provides 128-bit quantum security — sufficient for testnet; upgrade to LEVEL3/LEVEL5 for mainnet production */);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });

// FIX HIGH #48: was Buffer.from(wallet.keypair.publicKey).toString('hex')
const senderAddr = Address.fromString(
  wallet.address.toString(),
  bytesToHex(wallet.keypair.publicKey as Uint8Array),
);

const PVAULT_ABI: BitcoinInterfaceAbi = [
  { name: 'setPropertyNft', type: BitcoinAbiTypes.Function, payable: false,
    inputs:  [{ name: 'addr', type: ABIDataTypes.ADDRESS }],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }] },
];

interface IPropertyVault {
  setPropertyNft(addr: Address): Promise<import('opnet').CallResult<{ success: boolean }>>;
}

async function run(): Promise<void> {
  const providerCast = provider as unknown as JSONRpcProvider;

  console.log('\nResolving PropertyNFT address…');
  const nftAddress = await providerCast.getPublicKeyInfo(PROPERTY_NFT_ADDR, true);
  if (!nftAddress) throw new Error('Could not resolve PropertyNFT address');
  console.log('✓ PropertyNFT resolved');

  const pvaultContract = getContract<IPropertyVault>(
    propertyVaultAddr!, PVAULT_ABI, providerCast, NETWORK, senderAddr,
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
  console.log('\n  Update index.html:');
  console.log('   var PROPERTY_VAULT_ADDR = "' + propertyVaultAddr + '";');
}

run().catch((err) => { console.error('Failed:', err); process.exit(1); });
