/**
 * set-treasury.ts — Configure treasury P2TR on OPWACoin
 *
 * FIX HIGH #49: Address construction was incorrect — Buffer.from() → Uint8Array
 * FIX HIGH #49: Address.fromString() params clarified (mldsaHash, tweakedPubkey)
 *
 * Usage: OPNET_MNEMONIC="..." OPWACOIN_ADDRESS="opt1s..." npx tsx set-treasury.ts
 */
import { networks, address as btcAddress } from '@btc-vision/bitcoin';
import {
  ABIDataTypes,
  Mnemonic,
  MLDSASecurityLevel,
  AddressTypes,
  Address,
} from '@btc-vision/transaction';
import { BitcoinAbiTypes, BitcoinInterfaceAbi, getContract, JSONRpcProvider } from 'opnet';

const TESTNET_RPC     = 'https://testnet.opnet.org';
const NETWORK         = networks.opnetTestnet;
const mnemonic        = process.env.OPNET_MNEMONIC;
const contractAddress = process.env.OPWACOIN_ADDRESS;

if (!mnemonic)        { console.error('ERROR: set OPNET_MNEMONIC');   process.exit(1); }
if (!contractAddress) { console.error('ERROR: set OPWACOIN_ADDRESS'); process.exit(1); }

// FIX HIGH #49: replaces Buffer.from(x).toString('hex')
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Owner P2TR  :', wallet.p2tr);
console.log('Contract    :', contractAddress);

const decoded      = btcAddress.fromBech32(wallet.p2tr);
const tweakedBytes = decoded.data as Uint8Array; // 32-byte x-only tweaked pubkey
// FIX HIGH #49: was Buffer.from(tweakedBytes).toString('hex')
const tweakedHex   = bytesToHex(tweakedBytes);
console.log('Treasury key:', tweakedHex);

// Address.fromString(hashedMLDSAKey_hex, tweakedPubkey_hex)
// For the deployer/treasury: tweakedHex IS the 32-byte identity
// We fake the second param as 02+tweakedHex to satisfy the SDK 33-byte check
const tweakedCompressed = '02' + tweakedHex;
const treasuryAddr = Address.fromString(tweakedHex, tweakedCompressed);

const ABI: BitcoinInterfaceAbi = [
  { name: 'setTreasury', type: BitcoinAbiTypes.Function, payable: false,
    inputs:  [{ name: 'pubkey', type: ABIDataTypes.ADDRESS }],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }] },
];

interface IOPWACoin {
  setTreasury(pubkey: Address): Promise<import('opnet').CallResult<{ success: boolean }>>;
}

async function run(): Promise<void> {
  const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });

  // FIX HIGH #49: was Buffer.from(wallet.keypair.publicKey).toString('hex')
  const senderAddr = Address.fromString(
    wallet.address.toString(),
    bytesToHex(wallet.keypair.publicKey as Uint8Array),
  );

  const contract = getContract<IOPWACoin>(
    contractAddress!,
    ABI,
    provider as unknown as JSONRpcProvider,
    NETWORK,
    senderAddr,
  );

  console.log('\nSimulating setTreasury…');
  const sim = await contract.setTreasury(treasuryAddr);
  if (sim.revert) throw new Error(sim.revert);

  console.log('Sending setTreasury transaction…');
  const receipt = await sim.sendTransaction({
    signer:      wallet.keypair,
    mldsaSigner: wallet.mldsaKeypair,
    refundTo:    wallet.p2tr,
    network:     NETWORK,
    maximumAllowedSatToSpend: 50_000n,
  });

  console.log('\n✓ Treasury configured! TX:', receipt.transactionId);
  console.log('\n  Update src/contracts/config.ts:');
  console.log('    treasuryP2TR: "' + wallet.p2tr + '",');
}

run().catch((err) => { console.error('Failed:', err); process.exit(1); });
