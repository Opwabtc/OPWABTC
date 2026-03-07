/**
 * deploy-opwayield.ts — Deploy OPWAYield v4 (fixed payment check)
 *
 * After deploy:
 *   1. setTreasury
 *   2. setPrice(1000)
 *   3. Update USDOP minter → new address
 *   4. Update YieldVaultV3 addresses → new address
 *   5. Update CONTRACTS.opwayYield in index.html
 *
 * Usage: OPNET_MNEMONIC="..." npx tsx scripts/deploy-opwayield.ts
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
const WASM_PATH   = './contracts/build/OPWAYield.wasm';
const NETWORK     = networks.opnetTestnet;
const FEE_RATE    = 5;
const GAS_SAT_FEE = 15_000n;

function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) { console.error('ERROR: set OPNET_MNEMONIC'); process.exit(1); }

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Deployer P2TR   :', wallet.p2tr);
console.log('Deployer OPNet  :', wallet.address.toString());

let treasuryPubkeyHex: string;
try {
    const decoded     = btcAddress.fromBech32(wallet.p2tr);
    treasuryPubkeyHex = bytesToHex(decoded.data as Uint8Array);
} catch (e) {
    console.error('ERROR: could not decode P2TR:', e);
    process.exit(1);
}

const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });
const factory  = new TransactionFactory();

async function deploy(): Promise<void> {
    const bytecode = readFileSync(WASM_PATH);
    console.log('\nOPWAYield.wasm size:', bytecode.length, 'bytes');

    const utxos = await provider.utxoManager.getUTXOs({ address: wallet.p2tr });
    console.log('UTXOs available :', utxos.length);
    if (utxos.length === 0) { console.error('ERROR: no UTXOs — fund the deployer wallet first'); process.exit(1); }

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
    console.log('Contract address:', deployment.contractAddress);

    console.log('\nBroadcasting funding TX…');
    const funding = await provider.sendRawTransaction(deployment.transaction[0]);
    console.log('Funding TX:', funding.txid ?? funding);

    console.log('Broadcasting reveal TX…');
    const reveal = await provider.sendRawTransaction(deployment.transaction[1]);
    console.log('Reveal TX :', reveal.txid ?? reveal);

    console.log('\n✓ OPWAYield v4 deployed at:', deployment.contractAddress);
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log(' NEXT STEPS (wait ~1 block, then run in order):');
    console.log('');
    console.log(' 1. Set treasury:');
    console.log('    OPNET_MNEMONIC="..." OPWAYIELD_ADDR="' + deployment.contractAddress + '" npx tsx scripts/set-treasury-opwayield.ts');
    console.log('');
    console.log(' 2. Set minter on USDOP:');
    console.log('    OPNET_MNEMONIC="..." MINTER_ADDR="' + deployment.contractAddress + '" npx tsx scripts/set-minter.ts');
    console.log('');
    console.log(' 3. Update YieldVaultV3 addresses:');
    console.log('    OPNET_MNEMONIC="..." OPWAYIELD_ADDR="' + deployment.contractAddress + '" npx tsx scripts/set-vault-addresses.ts');
    console.log('');
    console.log(' 4. Update index.html:');
    console.log("    opwayYield: '" + deployment.contractAddress + "'");
    console.log('═══════════════════════════════════════════════════════════════');
}

deploy().catch(err => { console.error('Deploy failed:', err); process.exit(1); });
