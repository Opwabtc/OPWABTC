import {
  getContract,
  JSONRpcProvider,
  TransactionOutputFlags,
  CallResult,
  BaseContractProperties,
  BitcoinInterfaceAbi,
  BitcoinAbiTypes,
  ABIDataTypes,
} from 'opnet';
import { Address } from '@btc-vision/transaction';
import { networks } from '@btc-vision/bitcoin';
import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { CONTRACTS, TREASURY_P2TR } from '../contracts/config';

const NETWORK = networks.opnetTestnet;
export const SATS_PER_TOKEN = 1000;
export const BTC_TO_SATS = 100_000_000;

function _hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/, '');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function buildSenderAddress(publicKey: string): Promise<Address> {
  const pubkeyBytes = _hexToBytes(publicKey);
  const opnet = window.opnet as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (opnet && typeof opnet.getMLDSAPublicKey === 'function') {
    try {
      const raw: string = await opnet.getMLDSAPublicKey();
      return new Address(_hexToBytes(raw), pubkeyBytes);
    } catch (_) {}
  }
  return new Address(new Uint8Array(32), pubkeyBytes);
}

// ABI: buy(address, uint256) → bool
const OPWAP_ABI: BitcoinInterfaceAbi = [
  {
    name: 'buy',
    type: BitcoinAbiTypes.Function,
    constant: false,
    payable: true,
    inputs: [
      { name: 'to',     type: ABIDataTypes.ADDRESS },
      { name: 'amount', type: ABIDataTypes.UINT256 },
    ],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
  },
  {
    name: 'balanceOf',
    type: BitcoinAbiTypes.Function,
    constant: true,
    payable: false,
    inputs: [{ name: 'account', type: ABIDataTypes.ADDRESS }],
    outputs: [{ name: 'balance', type: ABIDataTypes.UINT256 }],
  },
];

interface IBuyableToken extends BaseContractProperties {
  balanceOf(owner: Address): Promise<CallResult<{ balance: bigint }, []>>;
  buy(to: Address, amount: bigint): Promise<CallResult<{ success: boolean }, []>>;
}

export interface InvestmentResult {
  txHash: string;
  opscanUrl: string;
}

export function useInvestment() {
  const { walletAddr, publicKey } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const invest = useCallback(async (btcAmount: number) => {
    setError(null);
    setResult(null);

    if (!walletAddr) { setError('Connect your wallet first.'); return; }

    let effectivePublicKey = publicKey;
    if (!effectivePublicKey && window.opnet) {
      try {
        effectivePublicKey = await (window.opnet as any).getPublicKey(); // eslint-disable-line @typescript-eslint/no-explicit-any
      } catch (_) {}
    }
    if (!effectivePublicKey) { setError('Could not retrieve public key. Reconnect and try again.'); return; }
    if (!CONTRACTS.opwaCoin)  { setError('Contract address not configured.'); return; }
    if (!TREASURY_P2TR)       { setError('Treasury address not configured.'); return; }
    if (btcAmount <= 0)       { setError('Enter a valid BTC amount.'); return; }

    const satsAmount = BigInt(Math.round(btcAmount * BTC_TO_SATS));
    if (satsAmount < BigInt(SATS_PER_TOKEN)) { setError('Minimum: 1000 sats (0.00001 BTC).'); return; }

    setLoading(true);

    try {
      console.log('[OPWA] 1. building sender address...');
      const senderAddress = await buildSenderAddress(effectivePublicKey);
      console.log('[OPWA] 2. senderAddress:', senderAddress);

      const provider = new JSONRpcProvider({
        url: 'https://testnet.opnet.org',
        network: NETWORK,
      });

      const contract = getContract<IBuyableToken>(
        CONTRACTS.opwaCoin,
        OPWAP_ABI,
        provider,
        NETWORK,
        senderAddress,
      );

      // Token amount with 8 decimals: sats / price_per_token * 10^8
      const tokenAmount = (satsAmount * BigInt(10 ** 8)) / BigInt(SATS_PER_TOKEN);

      // STEP 1 — register the BTC output to treasury so simulation can verify it
      contract.setTransactionDetails({
        inputs: [],
        outputs: [
          {
            to:    TREASURY_P2TR,
            value: satsAmount,
            index: 1,
            flags: TransactionOutputFlags.hasTo,
          },
        ],
      });

      console.log('[OPWA] 3. simulating buy...', { satsAmount: satsAmount.toString(), tokenAmount: tokenAmount.toString() });
      const sim = await contract.buy(senderAddress, tokenAmount);
      console.log('[OPWA] 4. sim result:', sim);

      if (sim.revert) throw new Error('Simulation reverted: ' + sim.revert);

      // STEP 2 — send with matching extra output to treasury
      console.log('[OPWA] 5. sending transaction...');
      const receipt = await sim.sendTransaction({
        signer:      null,   // frontend — wallet handles signing
        mldsaSigner: null,
        refundTo:    walletAddr,
        maximumAllowedSatToSpend: satsAmount + 50_000n,
        network: NETWORK,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        extraOutputs: [{ address: TREASURY_P2TR, value: satsAmount as any }],
      });
      console.log('[OPWA] 6. receipt:', receipt);

      if (!receipt) throw new Error('Transaction rejected or timed out.');

      const txHash: string = receipt.transactionId ?? '';
      const opscanUrl = 'https://testnet.opscan.io/transactions/' + txHash;
      setResult({ txHash, opscanUrl });

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed.';
      console.error('OPWA BUY ERROR:', err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [walletAddr, publicKey]);

  const reset = useCallback(() => { setError(null); setResult(null); }, []);
  return { invest, loading, error, result, reset };
}

export function calcTokens(btcAmount: number): number {
  return Math.floor(Math.round(btcAmount * BTC_TO_SATS) / SATS_PER_TOKEN);
}
