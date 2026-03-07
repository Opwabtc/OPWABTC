/**
 * set-treasury-opwayield.ts — Configure OPWAYield treasury + price
 *
 * Usage:
 *   OPNET_MNEMONIC="..." OPWAYIELD_ADDR="opt1sq..." npx tsx scripts/set-treasury-opwayield.ts
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
const PRICE_SATS      = 1000n; // 1000 sats = 0.00001 BTC per OPWAY token

const mnemonic      = process.env.OPNET_MNEMONIC;
const opwayieldAddr = process.env.OPWAYIELD_ADDR;
if (!mnemonic)      { console.error('ERROR: set OPNET_MNEMONIC');    process.exit(1); }
if (!opwayieldAddr) { console.error('ERROR: set OPWAYIELD_ADDR');    process.exit(1); }

function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

const mnemonicObj = new Mnemonic(mnemonic!, '', NETWORK, MLDSASecurityLevel.LEVEL1);
const wallet      = mnemonicObj.deriveOPWallet(AddressTypes.P2TR, 0);

const provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK });

const senderAddr = Address.fromString(
    wallet.address.toString(),
    bytesToHex(wallet.keypair.publicKey as Uint8Array),
);

// Treasury bech32 P2TR — must be opt1p... format (OPNet testnet HRP)
const TREASURY_P2TR = 'opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t';

const ABI: BitcoinInterfaceAbi = [
    {
        name: 'setTreasury',
        type: BitcoinAbiTypes.Function,
        payable: false,
        inputs:  [
            { name: 'pubkey',   type: ABIDataTypes.ADDRESS },
            { name: 'bech32To', type: ABIDataTypes.STRING  },
        ],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
    },
    {
        name: 'setPrice',
        type: BitcoinAbiTypes.Function,
        payable: false,
        inputs:  [{ name: 'price', type: ABIDataTypes.UINT256 }],
        outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
    },
];

interface IOPWAYield {
    setTreasury(pubkey: Address, bech32To: string): Promise<import('opnet').CallResult<{ success: boolean }>>;
    setPrice(price: bigint):                        Promise<import('opnet').CallResult<{ success: boolean }>>;
}

async function run(): Promise<void> {
    const providerCast = provider as unknown as JSONRpcProvider;

    // Derive treasury Address from bech32
    const decoded    = btcAddress.fromBech32(TREASURY_P2TR);
    const tweakedHex = bytesToHex(decoded.data as Uint8Array);
    const treasuryAddr = Address.fromString(tweakedHex, '02' + tweakedHex);

    const contract = getContract<IOPWAYield>(
        opwayieldAddr!, ABI, providerCast, NETWORK, senderAddr,
    );

    // Step 1: setTreasury
    console.log('\nSimulating setTreasury…');
    const tSim = await contract.setTreasury(treasuryAddr, TREASURY_P2TR);
    if (tSim.revert) throw new Error('setTreasury simulation reverted: ' + tSim.revert);
    const tRx = await tSim.sendTransaction({
        signer: wallet.keypair, mldsaSigner: wallet.mldsaKeypair,
        refundTo: wallet.p2tr, network: NETWORK, maximumAllowedSatToSpend: 50_000n,
    });
    console.log('✓ setTreasury TX:', tRx.transactionId);

    // Step 2: setPrice
    console.log('\nSimulating setPrice(' + PRICE_SATS + ')…');
    const pSim = await contract.setPrice(PRICE_SATS);
    if (pSim.revert) throw new Error('setPrice simulation reverted: ' + pSim.revert);
    const pRx = await pSim.sendTransaction({
        signer: wallet.keypair, mldsaSigner: wallet.mldsaKeypair,
        refundTo: wallet.p2tr, network: NETWORK, maximumAllowedSatToSpend: 50_000n,
    });
    console.log('✓ setPrice TX:', pRx.transactionId);

    console.log('\n✅ OPWAYield v4 fully configured.');
    console.log('   Contract :', opwayieldAddr);
    console.log('   Treasury :', TREASURY_P2TR);
    console.log('   Price    :', PRICE_SATS.toString(), 'sats/token');
}

run().catch(err => { console.error('Failed:', err); process.exit(1); });
