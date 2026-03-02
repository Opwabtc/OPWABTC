/**
 * set-treasury.ts — Configure the treasury P2TR address on OPWACoin
 * Run AFTER the deployment confirms (1 block).
 *
 * Usage:
 *   OPNET_MNEMONIC="..." OPWACOIN_ADDRESS="opt1s..." npx tsx set-treasury.ts
 */
import { networks, address as btcAddress } from '@btc-vision/bitcoin';
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

// ── Config ──────────────────────────────────────────────────────────────────
const TESTNET_RPC      = 'https://testnet.opnet.org';
const NETWORK          = networks.opnetTestnet;

const mnemonic         = process.env.OPNET_MNEMONIC;
const contractAddress  = process.env.OPWACOIN_ADDRESS;

if (!mnemonic)        { console.error('ERROR: set OPNET_MNEMONIC');       process.exit(1); }
if (!contractAddress) { console.error('ERROR: set OPWACOIN_ADDRESS');     process.exit(1); }

// ── Wallet ──────────────────────────────────────────────────────────────────
const mnemonicObj = new Mnemonic(mnemonic, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

console.log('Owner P2TR  :', wallet.p2tr);
console.log('Contract    :', contractAddress);

// Decode treasury tweaked pubkey from P2TR address
const decoded         = btcAddress.fromBech32(wallet.p2tr);
const tweakedBytes    = decoded.data;                                  // Uint8Array 32 bytes
const tweakedHex      = Buffer.from(tweakedBytes).toString('hex');    // 64 hex chars
console.log('Treasury key:', tweakedHex);

// Build treasury Address: set the 32-byte identifier = tweaked pubkey
// Address.fromString(hashedMLDSAKey, tweakedPubKey)
// We use tweakedHex as hashedMLDSAKey so the contract stores those 32 bytes
const tweakedHexCompressed = '02' + tweakedHex; // fake 33-byte compressed for SDK compat
const treasuryAddr = Address.fromString(tweakedHex, tweakedHexCompressed);

// ── Minimal ABI for setTreasury ──────────────────────────────────────────────
const ABI: BitcoinInterfaceAbi = [
    {
        name: 'setTreasury',
        type: BitcoinAbiTypes.Function,
        payable: false,
        inputs:  [{ name: 'pubkey',  type: ABIDataTypes.ADDRESS }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL    }],
    },
];

interface IOPWACoin {
    setTreasury(pubkey: Address): Promise<import('opnet').CallResult<{ success: boolean }>>;
}

// ── Call ─────────────────────────────────────────────────────────────────────
async function run(): Promise<void> {
    const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });

    const senderAddr = Address.fromString(
        wallet.address.toString(),
        Buffer.from(wallet.keypair.publicKey).toString('hex'),
    );

    const contract = getContract<IOPWACoin>(
        contractAddress!,
        ABI,
        provider as unknown as import('opnet').JSONRpcProvider,
        NETWORK,
        senderAddr,
    );

    console.log('\nSimulating setTreasury…');
    const sim = await contract.setTreasury(treasuryAddr);
    if ('error' in sim) throw new Error(String((sim as Record<string, unknown>).error));
    if (sim.revert) throw new Error(sim.revert);

    console.log('Sending setTreasury transaction…');
    const receipt = await sim.sendTransaction({
        signer:      wallet.keypair,
        mldsaSigner: wallet.mldsaKeypair,
        refundTo:    wallet.p2tr,
        network:     NETWORK,
        maximumAllowedSatToSpend: 50_000n,
    });

    console.log('\n✓ Treasury configured!');
    console.log('  TX:', receipt.transactionId);
    console.log('\n  Copy to src/contracts/config.ts:');
    console.log('    treasuryP2TR: "' + wallet.p2tr + '",');
}

run().catch((err) => {
    console.error('Failed:', err);
    process.exit(1);
});
