/**
 * OPWACoin deployment script — OPNet Testnet (Signet fork)
 * Usage (from repo root): OPNET_MNEMONIC="..." npx tsx scripts/deploy-token.ts
 *
 * Build first: cd contracts && npm install && npm run build:token
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

// ── Config ──────────────────────────────────────────────────────────────────
const TESTNET_RPC = 'https://testnet.opnet.org';
const WASM_PATH   = './contracts/build/OPWACoin.wasm';
const NETWORK     = networks.opnetTestnet;
const FEE_RATE    = 5;   // sat/vbyte
const GAS_SAT_FEE = 15_000n;

// ── Wallet ──────────────────────────────────────────────────────────────────
const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) {
    console.error('ERROR: set OPNET_MNEMONIC env var before running deploy-token.ts');
    process.exit(1);
}

const mnemonicObj = new Mnemonic(mnemonic, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Deployer P2TR address :', wallet.p2tr);
console.log('Deployer OPNet address:', wallet.address.toString());

// Treasury = deployer's x-only tweaked P2TR pubkey (32 bytes)
// Decoded from the bech32m P2TR address
let treasuryPubkeyHex: string;
try {
    const decoded      = btcAddress.fromBech32(wallet.p2tr);
    treasuryPubkeyHex  = Buffer.from(decoded.data).toString('hex');
    console.log('Treasury pubkey (hex) :', treasuryPubkeyHex);
} catch (e) {
    console.error('ERROR: could not decode P2TR address:', e);
    process.exit(1);
}

// ── Provider & Factory ──────────────────────────────────────────────────────
const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });
const factory  = new TransactionFactory();

// ── Deploy ───────────────────────────────────────────────────────────────────
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
    console.log(' 2. Run set-treasury.ts to configure the payment address:');
    console.log('    OPNET_MNEMONIC="..." OPWACOIN_ADDRESS="' + deployment.contractAddress + '" npx tsx set-treasury.ts');
    console.log(' 3. Update src/contracts/config.ts in OPWABTC:');
    console.log('    opwaCoin:    "' + deployment.contractAddress + '"');
    console.log('    treasuryP2TR: "' + wallet.p2tr + '"');
    console.log('═══════════════════════════════════════════════════════════════');
}

deploy().catch((err) => {
    console.error('Deployment failed:', err);
    process.exit(1);
});
