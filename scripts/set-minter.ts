/**
 * set-minter.ts — Call USDOP.setMinter(YieldVault)
 *
 * Usage:
 *   OPNET_MNEMONIC="REDACTED_MNEMONIC"
 *   npx tsx scripts/set-minter.ts
 */
import { networks } from '@btc-vision/bitcoin';
import {
    ABIDataTypes,
    Mnemonic,
    MLDSASecurityLevel,
    AddressTypes,
    Address,
} from '@btc-vision/transaction';
import {
    BitcoinAbiTypes,
    BitcoinInterfaceAbi,
    getContract,
    JSONRpcProvider,
} from 'opnet';

const TESTNET_RPC      = 'https://testnet.opnet.org';
const NETWORK          = networks.opnetTestnet;

const USDOP_ADDR       = 'opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu';
const YIELD_VAULT_ADDR = 'opt1sqzjaxfszmf6dltnjhx2txz08ezzqxvakzcuz7msw';

const mnemonic = process.env.OPNET_MNEMONIC;
if (!mnemonic) { console.error('ERROR: set OPNET_MNEMONIC'); process.exit(1); }

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Deployer P2TR :', wallet.p2tr);
console.log('USDOP         :', USDOP_ADDR);
console.log('YieldVault    :', YIELD_VAULT_ADDR);

const provider   = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });
const senderAddr = Address.fromString(
    wallet.address.toString(),
    Buffer.from(wallet.keypair.publicKey).toString('hex'),
);

const USDOP_ABI: BitcoinInterfaceAbi = [{
    name:    'setMinter',
    type:    BitcoinAbiTypes.Function,
    payable: false,
    inputs:  [{ name: 'minter', type: ABIDataTypes.ADDRESS }],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
}];

interface IUSDOP {
    setMinter(minter: Address): Promise<import('opnet').CallResult<{ success: boolean }>>;
}

async function run(): Promise<void> {
    const providerCast = provider as unknown as import('opnet').JSONRpcProvider;

    console.log('\nResolving YieldVault address…');
    const vaultAddress = await providerCast.getPublicKeyInfo(YIELD_VAULT_ADDR, true);
    if (!vaultAddress) throw new Error('Could not resolve YieldVault address');
    console.log('✓ YieldVault resolved');

    console.log('\nCalling USDOP.setMinter(YieldVault)…');
    const usdop = getContract<IUSDOP>(USDOP_ADDR, USDOP_ABI, providerCast, NETWORK, senderAddr);

    const sim = await usdop.setMinter(vaultAddress);
    if (sim.revert) throw new Error('Simulate reverted: ' + sim.revert);

    const receipt = await sim.sendTransaction({
        signer:                   wallet.keypair,
        mldsaSigner:              wallet.mldsaKeypair,
        refundTo:                 wallet.p2tr,
        network:                  NETWORK,
        maximumAllowedSatToSpend: 50_000n,
    });

    console.log('\n✅ setMinter TX:', receipt.transactionId);
    console.log('   https://opscan.org/transactions/' + receipt.transactionId + '?network=op_testnet');
    console.log('\nUSDOP minter is now set to YieldVault. claimRewards() should work.');
}

run().catch((err) => {
    console.error('Failed:', err);
    process.exit(1);
});
