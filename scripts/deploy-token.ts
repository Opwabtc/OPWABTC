/**
 * deploy-token.ts — OPWACoin deployment script
 *
 * FIX HIGH #38: Buffer.from() is Node.js-specific and forbidden in OP_NET WASM runtime.
 * All Buffer usages replaced with Uint8Array / hex conversion helpers.
 *
 * Usage: OPNET_MNEMONIC="..." npx tsx scripts/deploy-token.ts
 */
import { readFileSync } from 'fs';
import { networks, address as btcAddress } from '@btc-vision/bitcoin';
import {
  IDeploymentParameters,
  Mnemonic,
  MLDSASecurityLevel,
  TransactionFactory,
  AddressTypes,
} from '@btc-vision/transaction';
import { JSONRpcProvider } from 'opnet';

const TESTNET_RPC = 'https://testnet.opnet.org';
const WASM_PATH   = './contracts/build/OPWACoin.wasm';
const NETWORK     = networks.opnetTestnet;
const FEE_RATE    = 5;
const GAS_SAT_FEE = 15_000n;

// FIX HIGH #38: helper replaces Buffer.from(bytes).toString('hex')
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) {
  console.error('ERROR: set OPNET_MNEMONIC env var before running deploy-token.ts');
  process.exit(1);
}

const mnemonicObj = new Mnemonic(mnemonic, '', NETWORK, MLDSASecurityLevel.LEVEL1 /* FIX 5.106: LEVEL1 (ML-DSA-44) provides 128-bit quantum security — sufficient for testnet; upgrade to LEVEL3/LEVEL5 for mainnet production */);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Deployer P2TR address :', wallet.p2tr);
console.log('Deployer OPNet address:', wallet.address.toString());

let treasuryPubkeyHex: string;
try {
  const decoded     = btcAddress.fromBech32(wallet.p2tr);
  // FIX HIGH #38: was Buffer.from(decoded.data).toString('hex')
  treasuryPubkeyHex = bytesToHex(decoded.data as Uint8Array);
  console.log('Treasury pubkey (hex) :', treasuryPubkeyHex);
} catch (e) {
  console.error('ERROR: could not decode P2TR address:', e);
  process.exit(1);
}

const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });
const factory  = new TransactionFactory();

async function deploy(): Promise<void> {
  const bytecode = readFileSync(WASM_PATH);
  console.log('\nWASM size (bytes):', bytecode.length);

  const utxos = await provider.utxoManager.getUTXOs({ address: wallet.p2tr });
  console.log('Available UTXOs   :', utxos.length);

  if (utxos.length === 0) {
    console.error('ERROR: no UTXOs for', wallet.p2tr, '— fund with testnet BTC first.');
    process.exit(1);
  }

  const challenge = await provider.getChallenge();

  const params: IDeploymentParameters = {
    from:    wallet.p2tr,
    utxos,
    signer:      wallet.keypair,
    mldsaSigner: wallet.mldsaKeypair,
    network:     NETWORK,
    feeRate:     FEE_RATE,
    priorityFee: 0n,
    gasSatFee:   GAS_SAT_FEE,
    bytecode,
    challenge,
    linkMLDSAPublicKeyToAddress: true,
    revealMLDSAPublicKey:        true,
  };

  console.log('\nSigning deployment…');
  const deployment = await factory.signDeployment(params);
  console.log('Contract address  :', deployment.contractAddress);

  console.log('\nBroadcasting funding TX…');
  const funding = await provider.sendRawTransaction(deployment.transaction[0]);
  console.log('Funding TX ID     :', funding.txid ?? funding);

  console.log('Broadcasting reveal TX…');
  const reveal = await provider.sendRawTransaction(deployment.transaction[1]);
  console.log('Reveal  TX ID     :', reveal.txid ?? reveal);

  console.log('\n✓ OPWACoin deployed at:', deployment.contractAddress);
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(' NEXT STEPS:');
  console.log(' 1. Wait ~1 block for the deployment to confirm');
  console.log(' 2. Run set-treasury.ts:');
  console.log('    OPNET_MNEMONIC="..." OPWACOIN_ADDRESS="' + deployment.contractAddress + '" npx tsx set-treasury.ts');
  console.log(' 3. Update src/contracts/config.ts:');
  console.log('    opwaCoin:     "' + deployment.contractAddress + '"');
  console.log('    treasuryP2TR: "' + wallet.p2tr + '"');
  console.log('═══════════════════════════════════════════════════════════════');
}

deploy().catch((err) => {
  console.error('Deployment failed:', err);
  process.exit(1);
});
