/**
 * PropertyNFT deployment script — OPNet Testnet (Signet fork)
 * Usage: OPNET_MNEMONIC="..." npx tsx scripts/deploy-nft.ts
 *
 * Deploys: contracts/op721/PropertyNFT.ts  (compiled → contracts/build/PropertyNFT.wasm)
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
const WASM_PATH   = './contracts/build/PropertyNFT.wasm';
const NETWORK     = networks.opnetTestnet;
const FEE_RATE    = 5;
const GAS_SAT_FEE = 15_000n;

const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) { console.error('ERROR: set OPNET_MNEMONIC'); process.exit(1); }

const mnemonicObj = new Mnemonic(mnemonic, '', NETWORK, MLDSASecurityLevel.LEVEL1 /* FIX 5.106: LEVEL1 (ML-DSA-44) provides 128-bit quantum security — sufficient for testnet; upgrade to LEVEL3/LEVEL5 for mainnet production */);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);
console.log('Deployer:', wallet.p2tr);

const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });
const factory  = new TransactionFactory();

async function deploy(): Promise<void> {
    const bytecode = readFileSync(WASM_PATH);
    const utxos    = await provider.utxoManager.getUTXOs({ address: wallet.p2tr });
    if (!utxos.length) { console.error('No UTXOs — fund wallet first.'); process.exit(1); }

    const challenge = await provider.getChallenge();
    const params: IDeploymentParameters = {
        from: wallet.p2tr, utxos,
        signer: wallet.keypair, mldsaSigner: wallet.mldsaKeypair,
        network: NETWORK, feeRate: FEE_RATE, priorityFee: 0n,
        gasSatFee: GAS_SAT_FEE, bytecode, challenge,
        linkMLDSAPublicKeyToAddress: true, revealMLDSAPublicKey: true,
    };

    const deployment = await factory.signDeployment(params);
    await provider.sendRawTransaction(deployment.transaction[0]);
    await provider.sendRawTransaction(deployment.transaction[1]);

    console.log('\n✓ PropertyNFT deployed at:', deployment.contractAddress);
    console.log('  Update CONTRACTS.propertyNft in src/contracts/config.ts');
}

deploy().catch((e) => { console.error(e); process.exit(1); });
