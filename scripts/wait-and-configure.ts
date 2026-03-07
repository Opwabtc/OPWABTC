/**
 * wait-and-configure.ts
 * Polls until the new YieldVault is indexed, then calls set-vault-addresses.
 */
import { networks } from '@btc-vision/bitcoin';
import {
    ABIDataTypes, Mnemonic, MLDSASecurityLevel, AddressTypes, Address,
} from '@btc-vision/transaction';
import { BitcoinAbiTypes, BitcoinInterfaceAbi, getContract, JSONRpcProvider } from 'opnet';

const TESTNET_RPC       = 'https://testnet.opnet.org';
const NETWORK           = networks.opnetTestnet;
const OPWAY_ADDR        = 'opt1sqryxvl6fypj72l77ncfave5cfpvxs5c2d596cdtv';
const PROPERTY_NFT_ADDR = 'opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6';
const NEW_YIELD_VAULT   = 'opt1sqrlvv7l5gdpfagzhgs80rzevyf60cn9t5qa0us8g';
const USDOP_ADDR        = 'opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu';
const PROPERTY_VAULT    = 'opt1sqpqkdmpr6z84l4lw8nhxuj66q02t5ay2vqu4zc6z';

const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) { console.error('ERROR: set OPNET_MNEMONIC'); process.exit(1); }

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1 /* FIX 5.106: LEVEL1 (ML-DSA-44) provides 128-bit quantum security — sufficient for testnet; upgrade to LEVEL3/LEVEL5 for mainnet production */);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);
const provider    = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });
const providerCast = provider as unknown as import('opnet').JSONRpcProvider;
function bytesToHex(bytes) {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}
const senderAddr  = Address.fromString(
    wallet.address.toString(),
    bytesToHex(wallet.keypair.publicKey),
);
const TX_OPTS = {
    signer: wallet.keypair, mldsaSigner: wallet.mldsaKeypair,
    refundTo: wallet.p2tr, network: NETWORK, maximumAllowedSatToSpend: 50_000n,
};

async function waitForContract(addr: string, label: string): Promise<Address> {
    console.log(`\nWaiting for ${label} to be indexed...`);
    for (let i = 0; i < 60; i++) {
        try {
            const res = await providerCast.getPublicKeyInfo(addr, true);
            if (res) { console.log(`✓ ${label} confirmed (attempt ${i+1})`); return res; }
        } catch (_) {}
        console.log(`  attempt ${i+1}/60 — waiting 20s...`);
        await new Promise(r => setTimeout(r, 20_000));
    }
    throw new Error(`${label} not indexed after 20 minutes`);
}

async function run() {
    const [vaultAddr, opwayAddr, usdopAddr, nftAddr, pvaultAddr] = await Promise.all([
        waitForContract(NEW_YIELD_VAULT, 'YieldVault'),
        providerCast.getPublicKeyInfo(OPWAY_ADDR, true),
        providerCast.getPublicKeyInfo(USDOP_ADDR, true),
        providerCast.getPublicKeyInfo(PROPERTY_NFT_ADDR, true),
        providerCast.getPublicKeyInfo(PROPERTY_VAULT, true),
    ]);

    const USDOP_ABI: BitcoinInterfaceAbi = [{
        name:'setMinter', type:BitcoinAbiTypes.Function, payable:false,
        inputs:[{name:'minter',type:ABIDataTypes.ADDRESS}], outputs:[{name:'success',type:ABIDataTypes.BOOL}],
    }];
    const YIELD_ABI: BitcoinInterfaceAbi = [{
        name:'setAddresses', type:BitcoinAbiTypes.Function, payable:false,
        inputs:[{name:'opway',type:ABIDataTypes.ADDRESS},{name:'usdop',type:ABIDataTypes.ADDRESS}],
        outputs:[{name:'success',type:ABIDataTypes.BOOL}],
    }];
    const PVAULT_ABI: BitcoinInterfaceAbi = [{
        name:'setPropertyNft', type:BitcoinAbiTypes.Function, payable:false,
        inputs:[{name:'addr',type:ABIDataTypes.ADDRESS}], outputs:[{name:'success',type:ABIDataTypes.BOOL}],
    }];

    console.log('\n[1/3] USDOP.setMinter(newYieldVault)...');
    const usdop = getContract<{setMinter(m: Address): Promise<{revert?: string; sendTransaction(o: object): Promise<{transactionId: string}>}>}>(USDOP_ADDR, USDOP_ABI, providerCast, NETWORK, senderAddr);
    const s1 = await usdop.setMinter(vaultAddr);
    if (s1.revert) throw new Error(s1.revert);
    const r1 = await s1.sendTransaction(TX_OPTS);
    console.log('✓ setMinter TX:', r1.transactionId);

    console.log('\n[2/3] YieldVault.setAddresses(OPWAY, USDOP)...');
    const vault = getContract<{setAddresses(a: Address, b: Address): Promise<{revert?: string; sendTransaction(o: object): Promise<{transactionId: string}>}>}>(NEW_YIELD_VAULT, YIELD_ABI, providerCast, NETWORK, senderAddr);
    const s2 = await vault.setAddresses(opwayAddr!, usdopAddr!);
    if (s2.revert) throw new Error(s2.revert);
    const r2 = await s2.sendTransaction(TX_OPTS);
    console.log('✓ setAddresses TX:', r2.transactionId);

    console.log('\n[3/3] PropertyVault.setPropertyNft(PropertyNFT)...');
    const pvault = getContract<{setPropertyNft(a: Address): Promise<{revert?: string; sendTransaction(o: object): Promise<{transactionId: string}>}>}>(PROPERTY_VAULT, PVAULT_ABI, providerCast, NETWORK, senderAddr);
    const s3 = await pvault.setPropertyNft(nftAddr!);
    if (s3.revert) throw new Error(s3.revert);
    const r3 = await s3.sendTransaction(TX_OPTS);
    console.log('✓ setPropertyNft TX:', r3.transactionId);

    console.log('\n✅ All configured! New YIELD_VAULT_ADDR:', NEW_YIELD_VAULT);
}

run().catch(err => { console.error('Failed:', err); process.exit(1); });
