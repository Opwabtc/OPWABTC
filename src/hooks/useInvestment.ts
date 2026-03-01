import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

const OPWAP_CONTRACT = import.meta.env.VITE_OPWAP_TOKEN_ADDRESS as string;
const MINT_SELECTOR = '0xa3cd6885';

export const SATS_PER_TOKEN = 1000;
export const BTC_TO_SATS = 100_000_000;

export interface InvestmentResult {
  txHash: string;
  opscanUrl: string;
}

export function useInvestment() {
  const { connected, walletAddr } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const invest = useCallback(async (btcAmount: number) => {
    setError(null);
    setResult(null);

    if (!connected || !walletAddr) {
      setError('Connect your wallet first.');
      return;
    }
    if (!OPWAP_CONTRACT) {
      setError('Contract address not configured.');
      return;
    }
    if (btcAmount <= 0) {
      setError('Enter a valid BTC amount.');
      return;
    }

    const satsAmount = Math.round(btcAmount * BTC_TO_SATS);

    if (satsAmount < SATS_PER_TOKEN) {
      setError('Minimum: 1000 sats (0.00001 BTC).');
      return;
    }

    setLoading(true);
    try {
      const opnet = (window as any).opnet;
      if (!opnet) throw new Error('OPWallet not found.');

      const txHash: string = await opnet.sendTransaction({
        to: OPWAP_CONTRACT,
        value: satsAmount,
        data: MINT_SELECTOR,
      });

      const opscanUrl = 'https://opscan.org/transactions/' + txHash + '?network=testnet';
      setResult({ txHash, opscanUrl });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [connected, walletAddr]);

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
  }, []);

  return { invest, loading, error, result, reset };
}

export function calcTokens(btcAmount: number): number {
  const sats = Math.round(btcAmount * BTC_TO_SATS);
  return Math.floor(sats / SATS_PER_TOKEN);
}