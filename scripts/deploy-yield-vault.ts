/**
 * YieldVault deployment script — OPNet Testnet (Signet fork)
 * Usage: OPNET_MNEMONIC="..." npx tsx deploy-yield-vault.ts
 */
import { readFileSync } from 'fs';
import { networks } from '@btc-vision/bitcoin';
import {
    IDeploymentParameters,
    Mnemonic,
    MLDSASecurityLevel,
    TransactionFactory,
    AddressTypes,
} from '@btc-vision/transaction';
import { JSONRpcProvider } from 'opnet';

const TESTNET_RPC = 'https://testnet.opnet.org';
const WASM_PATH   = './contracts/build/YieldVault.wasm';
const NETWORK     = networks.opnetTestnet;
const FEE_RATE    = 5;
const GAS_SAT_FEE = 15_000n;

const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) {
    console.error('ERROR: set OPNET_MNEMONIC env var');
    process.exit(1);
}

const mnemonicObj = new Mnemonic(mnemonic, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Deployer P2TR   :', wallet.p2tr);
console.log('Deployer OPNet  :', wallet.address.toString());

const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });
const factory  = new TransactionFactory();

async function deploy(): Promise<void> {
    const bytecode = readFileSync(WASM_PATH);
    console.log('WASM size (bytes):', bytecode.length);

    const utxos = await provider.utxoManager.getUTXOs({ address: wallet.p2tr });
    console.log('Available UTXOs  :', utxos.length);
    if (utxos.length === 0) {
        console.error('ERROR: no UTXOs for', wallet.p2tr, '— fund with testnet BTC first');
        process.exit(1);
    }

    const challenge = await provider.getChallenge();

    const params: IDeploymentParameters = {
        from:                        wallet.p2tr,
        utxos,
        signer:                      wallet.keypair,
        mldsaSigner:                 wallet.mldsaKeypair,
        network:                     NETWORK,
        feeRate:                     FEE_RATE,
        priorityFee:                 0n,
        gasSatFee:                   GAS_SAT_FEE,
        bytecode,
        challenge,
        linkMLDSAPublicKeyToAddress: true,
        revealMLDSAPublicKey:        true,
    };

    console.log('\nSigning deployment…');
    const deployment = await factory.signDeployment(params);
    console.log('Contract address :', deployment.contractAddress);

    console.log('\nBroadcasting funding TX…');
    const funding = await provider.sendRawTransaction(deployment.transaction[0]);
    console.log('Funding TX       :', funding.txid ?? funding);

    console.log('Broadcasting reveal TX…');
    const reveal = await provider.sendRawTransaction(deployment.transaction[1]);
    console.log('Reveal  TX       :', reveal.txid ?? reveal);

    console.log('\n✓ YieldVault deployed at:', deployment.contractAddress);
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log(' NEXT STEPS:');
    console.log(' 1. Wait ~1 block for deployment to confirm');
    console.log(' 2. Deploy PropertyVault:');
    console.log('    OPNET_MNEMONIC="..." npx tsx deploy-property-vault.ts');
    console.log(' 3. Then run set-vault-addresses.ts with all 3 addresses');
    console.log('    YIELD_VAULT_ADDR="' + deployment.contractAddress + '"');
    console.log('═══════════════════════════════════════════════════════════════');
}

deploy().catch((err) => {
    console.error('Deployment failed:', err);
    process.exit(1);
});
