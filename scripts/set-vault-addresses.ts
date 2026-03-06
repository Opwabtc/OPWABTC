/**
 * set-vault-addresses.ts — Post-deploy configuration
 *
 * FIX HIGH #42: Buffer.from() → Uint8Array (forbidden in OP_NET runtime)
 * FIX HIGH #31: uses getPublicKeyInfo() correctly (already present — verified)
 *
 * Usage:
 *   OPNET_MNEMONIC="..." USDOP_ADDR="opt1s..." YIELD_VAULT_ADDR="opt1s..." PROPERTY_VAULT_ADDR="opt1s..."
 *   npx tsx scripts/set-vault-addresses.ts
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

const TESTNET_RPC = 'https://testnet.opnet.org';
const NETWORK     = networks.opnetTestnet;

const OPWAY_ADDR        = 'opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv';
const PROPERTY_NFT_ADDR = 'opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6';

const mnemonic          = process.env.OPNET_MNEMONIC;
const usdopAddr         = process.env.USDOP_ADDR;
const yieldVaultAddr    = process.env.YIELD_VAULT_ADDR;
const propertyVaultAddr = process.env.PROPERTY_VAULT_ADDR;

if (!mnemonic)          { console.error('ERROR: set OPNET_MNEMONIC');      process.exit(1); }
if (!usdopAddr)         { console.error('ERROR: set USDOP_ADDR');          process.exit(1); }
if (!yieldVaultAddr)    { console.error('ERROR: set YIELD_VAULT_ADDR');    process.exit(1); }
if (!propertyVaultAddr) { console.error('ERROR: set PROPERTY_VAULT_ADDR'); process.exit(1); }

// FIX HIGH #42: helper replaces all Buffer.from(x).toString('hex') usages
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Deployer P2TR  :', wallet.p2tr);

const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });

// FIX HIGH #42: was Buffer.from(wallet.keypair.publicKey).toString('hex')
const senderAddr = Address.fromString(
  wallet.address.toString(),
  bytesToHex(wallet.keypair.publicKey as Uint8Array),
);

async function toContractAddr(contractStr: string): Promise<Address> {
  const resolved = await (provider as unknown as JSONRpcProvider).getPublicKeyInfo(contractStr, true);
  if (!resolved) throw new Error(`Could not resolve address: ${contractStr}`);
  return resolved;
}

const TX_OPTS = {
  signer:                   wallet.keypair,
  mldsaSigner:              wallet.mldsaKeypair,
  refundTo:                 wallet.p2tr,
  network:                  NETWORK,
  maximumAllowedSatToSpend: 50_000n,
};

const USDOP_ABI: BitcoinInterfaceAbi = [
  { name: 'setMinter', type: BitcoinAbiTypes.Function, payable: false,
    inputs: [{ name: 'minter', type: ABIDataTypes.ADDRESS }],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }] },
];
const YIELD_VAULT_ABI: BitcoinInterfaceAbi = [
  { name: 'setAddresses', type: BitcoinAbiTypes.Function, payable: false,
    inputs: [{ name: 'opway', type: ABIDataTypes.ADDRESS }, { name: 'usdop', type: ABIDataTypes.ADDRESS }],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }] },
];
const PROPERTY_VAULT_ABI: BitcoinInterfaceAbi = [
  { name: 'configure', type: BitcoinAbiTypes.Function, payable: false,
    inputs: [{ name: 'nft', type: ABIDataTypes.ADDRESS }, { name: 'opway', type: ABIDataTypes.ADDRESS }],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }] },
];

interface IUSDOP          { setMinter(minter: Address): Promise<import('opnet').CallResult<{ success: boolean }>> }
interface IYieldVault     { setAddresses(opway: Address, usdop: Address): Promise<import('opnet').CallResult<{ success: boolean }>> }
interface IPropertyVault  { configure(nft: Address, opway: Address): Promise<import('opnet').CallResult<{ success: boolean }>> }

async function run(): Promise<void> {
  const providerCast = provider as unknown as JSONRpcProvider;

  console.log('\nResolving contract addresses…');
  const [yieldVaultAddress, opwayAddress, usdopAddress, nftAddress] = await Promise.all([
    toContractAddr(yieldVaultAddr!),
    toContractAddr(OPWAY_ADDR),
    toContractAddr(usdopAddr!),
    toContractAddr(PROPERTY_NFT_ADDR),
  ]);
  console.log('✓ All addresses resolved');

  console.log('\n[1/3] USDOP.setMinter(YieldVault)…');
  const usdopContract = getContract<IUSDOP>(usdopAddr!, USDOP_ABI, providerCast, NETWORK, senderAddr);
  const sim1 = await usdopContract.setMinter(yieldVaultAddress);
  if (sim1.revert) throw new Error(sim1.revert);
  const receipt1 = await sim1.sendTransaction(TX_OPTS);
  console.log('✓ TX:', receipt1.transactionId);

  console.log('\n[2/3] YieldVault.setAddresses(OPWAY, USDOP)…');
  const yieldVaultContract = getContract<IYieldVault>(yieldVaultAddr!, YIELD_VAULT_ABI, providerCast, NETWORK, senderAddr);
  const sim2 = await yieldVaultContract.setAddresses(opwayAddress, usdopAddress);
  if (sim2.revert) throw new Error(sim2.revert);
  const receipt2 = await sim2.sendTransaction(TX_OPTS);
  console.log('✓ TX:', receipt2.transactionId);

  console.log('\n[3/3] PropertyVault.configure(PropertyNFT, OPWAY)…');
  const propertyVaultContract = getContract<IPropertyVault>(propertyVaultAddr!, PROPERTY_VAULT_ABI, providerCast, NETWORK, senderAddr);
  const sim3 = await propertyVaultContract.configure(nftAddress, opwayAddress);
  if (sim3.revert) throw new Error(sim3.revert);
  const receipt3 = await sim3.sendTransaction(TX_OPTS);
  console.log('✓ TX:', receipt3.transactionId);

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(' ✓ All vault addresses configured!');
  console.log('   var USDOP_ADDR          = "' + usdopAddr + '";');
  console.log('   var YIELD_VAULT_ADDR    = "' + yieldVaultAddr + '";');
  console.log('   var PROPERTY_VAULT_ADDR = "' + propertyVaultAddr + '";');
  console.log('═══════════════════════════════════════════════════════════════');
}

run().catch((err) => { console.error('Failed:', err); process.exit(1); });
