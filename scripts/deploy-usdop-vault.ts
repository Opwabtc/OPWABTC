/**
 * deploy-usdop-vault.ts — Deploy USDOP v2 + YieldVault v4 in sequence
 *
 * Usage: OPNET_MNEMONIC="..." npx tsx scripts/deploy-usdop-vault.ts
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

const NETWORK = networks.opnetTestnet;
const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) { console.error('ERROR: set OPNET_MNEMONIC'); process.exit(1); }

const wallet  = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1).deriveOPWallet(AddressTypes.P2TR, 0);
const provider = new JSONRpcProvider({ url: 'https://testnet.opnet.org', network: NETWORK });
const factory  = new TransactionFactory();

async function deployWasm(wasmPath: string, label: string): Promise<string> {
    const bytecode  = readFileSync(wasmPath);
    console.log('\n[' + label + '] WASM size:', bytecode.length, 'bytes');
    const utxos     = await provider.utxoManager.getUTXOs({ address: wallet.p2tr });
    console.log('[' + label + '] UTXOs:', utxos.length);
    if (utxos.length === 0) throw new Error('No UTXOs for ' + label);
    const challenge = await provider.getChallenge();
    const params: IDeploymentParameters = {
        from: wallet.p2tr, utxos, signer: wallet.keypair, mldsaSigner: wallet.mldsaKeypair,
        network: NETWORK, feeRate: 5, priorityFee: 0n, gasSatFee: 15_000n,
        bytecode, challenge, linkMLDSAPublicKeyToAddress: true, revealMLDSAPublicKey: true,
    };
    const d = await factory.signDeployment(params);
    console.log('[' + label + '] address:', d.contractAddress);
    const f = await provider.sendRawTransaction(d.transaction[0]);
    console.log('[' + label + '] funding:', (f as any).result ?? f);
    const r = await provider.sendRawTransaction(d.transaction[1]);
    console.log('[' + label + '] reveal :', (r as any).result ?? r);
    return d.contractAddress;
}

(async () => {
    const NEW_OPWAYIELD = 'opt1sqpp23havwmyn6fykg2x8pr4vkqzw848suq828lwz'; // already deployed

    const usdop = await deployWasm('./contracts/build/USDOP.wasm', 'USDOP v2');
    const vault = await deployWasm('./contracts/build/YieldVault.wasm', 'YieldVault v4');

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log(' Deployed:');
    console.log('   OPWAYield v4  :', NEW_OPWAYIELD);
    console.log('   USDOP v2      :', usdop);
    console.log('   YieldVault v4 :', vault);
    console.log('');
    console.log(' NEXT (wait ~1 block, then run in order):');
    console.log('');
    console.log(' 1. Set treasury + price on OPWAYield v4:');
    console.log('    OPNET_MNEMONIC="..." OPWAYIELD_ADDR="' + NEW_OPWAYIELD + '" npx tsx scripts/set-treasury-opwayield.ts');
    console.log('');
    console.log(' 2. Configure USDOP minter + YieldVault addresses:');
    console.log('    OPNET_MNEMONIC="..." \\');
    console.log('    USDOP_ADDR="' + usdop + '" \\');
    console.log('    YIELD_VAULT_ADDR="' + vault + '" \\');
    console.log('    PROPERTY_VAULT_ADDR="opt1sqz5styqz7lcq92028p6pyjwlpnvzmjpmnufny8rs" \\');
    console.log('    OPWAYIELD_ADDR="' + NEW_OPWAYIELD + '" \\');
    console.log('    npx tsx scripts/set-vault-addresses-v4.ts');
    console.log('');
    console.log(' 3. Update index.html:');
    console.log("    opwayYield:  '" + NEW_OPWAYIELD + "'");
    console.log("    var USDOP_ADDR       = '" + usdop + "';");
    console.log("    var YIELD_VAULT_ADDR = '" + vault + "';");
    console.log('═══════════════════════════════════════════════════════════════');
})().catch(e => { console.error('Deploy failed:', e); process.exit(1); });
