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

// FIX: crypto.subtle.digest requires ArrayBuffer, not Uint8Array<ArrayBufferLike>
// Copy into a plain ArrayBuffer first to satisfy the strict type check.
async function sha256(data: Uint8Array): Promise<Uint8Array> {
  const buf: ArrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return new Uint8Array(hash);
}

async function buildSenderAddress(publicKey: string): Promise<Address> {
  const pubkeyBytes = _hexToBytes(publicKey);
  const opnet = window.opnet as { getMLDSAPublicKey?: () => Promise<string> } | undefined;
  if (opnet && typeof opnet.getMLDSAPublicKey === 'function') {
    try {
      const rawKey = _hexToBytes(await opnet.getMLDSAPublicKey());
      const mldsaHash = await sha256(rawKey);
      return new Address(mldsaHash, pubkeyBytes);
    } catch (_) {}
  }
  return new Address(new Uint8Array(32), pubkeyBytes);
}

function expandToDecimals(wholeTokens: number, decimals: number): bigint {
  return BigInt(wholeTokens) * (10n ** BigInt(decimals));
}

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

  const invest = useCallback(async (tokenCount: number) => {
    setError(null);
    setResult(null);

    if (!walletAddr) { setError('Connect your wallet first.'); return; }

    let effectivePublicKey = publicKey;
    if (!effectivePublicKey && window.opnet) {
      try {
        effectivePublicKey = await (window.opnet as { getPublicKey: () => Promise<string> }).getPublicKey();
      } catch (_) {}
    }
    if (!effectivePublicKey) { setError('Could not retrieve public key. Reconnect and try again.'); return; }
    if (!CONTRACTS.opwaCoin)  { setError('Contract address not configured.'); return; }
    if (!TREASURY_P2TR)       { setError('Treasury address not configured.'); return; }
    if (tokenCount <= 0 || !Number.isInteger(tokenCount)) { setError('Enter a valid number of tokens.'); return; }

    const satsAmount  = BigInt(tokenCount) * BigInt(SATS_PER_TOKEN);
    const tokenAmount = expandToDecimals(tokenCount, 8);

    setLoading(true);
    try {
      const senderAddress = await buildSenderAddress(effectivePublicKey);

      const provider = new JSONRpcProvider({ url: 'https://testnet.opnet.org', network: NETWORK });

      const contract = getContract<IBuyableToken>(
        CONTRACTS.opwaCoin, OPWAP_ABI, provider, NETWORK, senderAddress,
      );

      contract.setTransactionDetails({
        inputs: [],
        outputs: [{ to: TREASURY_P2TR, value: satsAmount, index: 1, flags: TransactionOutputFlags.hasTo }],
      });

      const sim = await contract.buy(senderAddress, tokenAmount);
      if (sim.revert) throw new Error('Simulation reverted: ' + sim.revert);

      const receipt = await sim.sendTransaction({
        signer:      null as never,
        mldsaSigner: null as never,
        refundTo:    walletAddr,
        maximumAllowedSatToSpend: satsAmount + 50_000n,
        network: NETWORK,
        extraOutputs: [{ address: TREASURY_P2TR, value: satsAmount as never }],
      });

      if (!receipt) throw new Error('Transaction rejected or timed out.');
      const txHash: string = receipt.transactionId ?? '';
      setResult({ txHash, opscanUrl: 'https://testnet.opscan.io/transactions/' + txHash });

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Transaction failed.');
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
