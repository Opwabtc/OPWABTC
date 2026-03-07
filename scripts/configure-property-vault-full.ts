/**
 * configure-property-vault-full.ts
 *
 * Calls PropertyVault.configure(nft, opway) — sets BOTH the PropertyNFT
 * and OPWAYield addresses so that purchaseProperty() works.
 *
 * Usage:
 *   OPNET_MNEMONIC="..." npx tsx scripts/configure-property-vault-full.ts
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

const TESTNET_RPC        = 'https://testnet.opnet.org';
const NETWORK            = networks.opnetTestnet;
const PROPERTY_VAULT_ADDR = 'opt1sqz5styqz7lcq92028p6pyjwlpnvzmjpmnufny8rs';
const PROPERTY_NFT_ADDR  = 'opt1sqpvldyanfs6edn5vxxd8ven58tp8qcrxdyzd2pvl'; // v4 (hrp=opt)
const OPWAY_YIELD_ADDR   = 'opt1sqpp23havwmyn6fykg2x8pr4vkqzw848suq828lwz';  // OPWAYield v3

const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) { console.error('ERROR: set OPNET_MNEMONIC'); process.exit(1); }

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });

const senderAddr = Address.fromString(
  wallet.address.toString(),
  bytesToHex(wallet.keypair.publicKey as Uint8Array),
);

const PVAULT_ABI: BitcoinInterfaceAbi = [
  {
    name: 'configure',
    type: BitcoinAbiTypes.Function,
    payable: false,
    inputs:  [
      { name: 'nft',   type: ABIDataTypes.ADDRESS },
      { name: 'opway', type: ABIDataTypes.ADDRESS },
    ],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
  },
];

interface IPropertyVault {
  configure(nft: Address, opway: Address): Promise<import('opnet').CallResult<{ success: boolean }>>;
}

async function resolveAddress(label: string, addr: string): Promise<Address> {
  const providerCast = provider as unknown as JSONRpcProvider;
  console.log(`Resolving ${label} (${addr})...`);
  const resolved = await providerCast.getPublicKeyInfo(addr, true);
  if (!resolved) throw new Error(`Could not resolve ${label}: ${addr}`);
  console.log(`  ✓ ${label} resolved`);
  return resolved;
}

async function run(): Promise<void> {
  const providerCast = provider as unknown as JSONRpcProvider;

  const nftAddress   = await resolveAddress('PropertyNFT', PROPERTY_NFT_ADDR);
  const opwayAddress = await resolveAddress('OPWAYield',   OPWAY_YIELD_ADDR);

  const pvaultContract = getContract<IPropertyVault>(
    PROPERTY_VAULT_ADDR, PVAULT_ABI, providerCast, NETWORK, senderAddr,
  );

  console.log('\nSimulating configure(nft, opway)...');
  const sim = await pvaultContract.configure(nftAddress, opwayAddress);
  if (sim.revert) throw new Error('Simulation reverted: ' + sim.revert);

  console.log('Sending transaction...');
  const receipt = await sim.sendTransaction({
    signer:                   wallet.keypair,
    mldsaSigner:              wallet.mldsaKeypair,
    refundTo:                 wallet.p2tr,
    network:                  NETWORK,
    maximumAllowedSatToSpend: 50_000n,
  });

  console.log('\n✓ PropertyVault fully configured.');
  console.log('  TX:', receipt.transactionId);
  console.log('  NFT:   ', PROPERTY_NFT_ADDR);
  console.log('  OPWAY: ', OPWAY_YIELD_ADDR);
}

run().catch((err) => { console.error('Failed:', err); process.exit(1); });
