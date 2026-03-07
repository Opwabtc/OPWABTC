/**
 * set-price.ts — Set token price on OPWACoin
 *
 * Usage: OPNET_MNEMONIC="..." npx tsx scripts/set-price.ts
 *
 * Sets the buy price to 1000 satoshis per OPWA token (0.00001 BTC).
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

const TESTNET_RPC    = 'https://testnet.opnet.org';
const NETWORK        = networks.opnetTestnet;
const OPWACOIN_ADDR  = 'opt1sqpz0m0uql87kz425y6h99p2k0lqut59vsgaxq8t2';
const PRICE_SATS     = 1000n; // 1000 satoshis = 0.00001 BTC per token

const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) { console.error('ERROR: set OPNET_MNEMONIC'); process.exit(1); }

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

const ABI: BitcoinInterfaceAbi = [
  { name: 'setPrice', type: BitcoinAbiTypes.Function, payable: false,
    inputs:  [{ name: 'price', type: ABIDataTypes.UINT256 }],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }] },
  { name: 'getPrice', type: BitcoinAbiTypes.Function, payable: false,
    inputs:  [],
    outputs: [{ name: 'price', type: ABIDataTypes.UINT256 }] },
];

interface IOPWACoin {
  setPrice(price: bigint): Promise<import('opnet').CallResult<{ success: boolean }>>;
  getPrice():              Promise<import('opnet').CallResult<{ price: bigint }>>;
}

async function run(): Promise<void> {
  const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });

  const senderAddr = Address.fromString(
    wallet.address.toString(),
    bytesToHex(wallet.keypair.publicKey as Uint8Array),
  );

  const contract = getContract<IOPWACoin>(
    OPWACOIN_ADDR,
    ABI,
    provider as unknown as JSONRpcProvider,
    NETWORK,
    senderAddr,
  );

  // Read current price first
  const priceRes = await contract.getPrice().catch(() => null);
  const current  = priceRes?.properties?.price ?? 'unknown';
  console.log('Current price:', current, 'sats');

  if (String(current) === String(PRICE_SATS)) {
    console.log('Price already set correctly — nothing to do.');
    return;
  }

  console.log('\nSimulating setPrice(' + PRICE_SATS + ')…');
  const sim = await contract.setPrice(PRICE_SATS);
  if (sim.revert) throw new Error('Simulation reverted: ' + sim.revert);

  console.log('Sending setPrice transaction…');
  const receipt = await sim.sendTransaction({
    signer:                   wallet.keypair,
    mldsaSigner:              wallet.mldsaKeypair,
    refundTo:                 wallet.p2tr,
    network:                  NETWORK,
    maximumAllowedSatToSpend: 50_000n,
  });

  console.log('\n✓ Price set to', PRICE_SATS, 'sats/token. TX:', receipt.transactionId);
}

run().catch((err) => { console.error('Failed:', err); process.exit(1); });
