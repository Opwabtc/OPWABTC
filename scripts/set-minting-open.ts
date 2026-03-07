/**
 * set-minting-open.ts — Open minting on PropertyNFT
 *
 * Usage: OPNET_MNEMONIC="..." npx tsx scripts/set-minting-open.ts
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
const PROPERTY_NFT_ADDR = 'opt1sqpvldyanfs6edn5vxxd8ven58tp8qcrxdyzd2pvl';

const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) { console.error('ERROR: set OPNET_MNEMONIC'); process.exit(1); }

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

const ABI: BitcoinInterfaceAbi = [
  { name: 'setMintingOpen', type: BitcoinAbiTypes.Function, payable: false,
    inputs:  [{ name: 'open', type: ABIDataTypes.BOOL }],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }] },
];

interface IPropertyNFT {
  setMintingOpen(open: boolean): Promise<import('opnet').CallResult<{ success: boolean }>>;
}

async function run(): Promise<void> {
  const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });

  const senderAddr = Address.fromString(
    wallet.address.toString(),
    bytesToHex(wallet.keypair.publicKey as Uint8Array),
  );

  const contract = getContract<IPropertyNFT>(
    PROPERTY_NFT_ADDR,
    ABI,
    provider as unknown as JSONRpcProvider,
    NETWORK,
    senderAddr,
  );

  console.log('Simulating setMintingOpen(true)…');
  const sim = await contract.setMintingOpen(true);
  if (sim.revert) throw new Error('Simulation reverted: ' + sim.revert);

  console.log('Sending transaction…');
  const receipt = await sim.sendTransaction({
    signer:                   wallet.keypair,
    mldsaSigner:              wallet.mldsaKeypair,
    refundTo:                 wallet.p2tr,
    network:                  NETWORK,
    maximumAllowedSatToSpend: 50_000n,
  });

  console.log('\n✓ Minting is now OPEN. TX:', receipt.transactionId);
}

run().catch((err) => { console.error('Failed:', err); process.exit(1); });
