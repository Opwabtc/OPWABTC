import { getContract, JSONRpcProvider, TransactionOutputFlags } from 'opnet';
import { networks } from '@btc-vision/bitcoin';
import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

const CONTRACT_ADDRESS = import.meta.env.VITE_OPWAP_TOKEN_ADDRESS as string;
const NETWORK = networks.opnetTestnet;

export const SATS_PER_TOKEN = 1000;
export const BTC_TO_SATS = 100_000_000;

export interface InvestmentResult {
  txHash: string;
  opscanUrl: string;
}

export function useInvestment() {
  const { walletAddr } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const invest = useCallback(async (btcAmount: number) => {
    setError(null);
    setResult(null);

    if (!walletAddr) {
      setError('Connect your wallet first.');
      return;
    }
    if (!CONTRACT_ADDRESS) {
      setError('Contract address not configured.');
      return;
    }
    if (btcAmount <= 0) {
      setError('Enter a valid BTC amount.');
      return;
    }

    const satsAmount = BigInt(Math.round(btcAmount * BTC_TO_SATS));

    if (satsAmount < BigInt(SATS_PER_TOKEN)) {
      setError('Minimum: 1000 sats (0.00001 BTC).');
      return;
    }

    setLoading(true);
    try {
      const provider = new JSONRpcProvider({ url: 'https://testnet.opnet.org', network: NETWORK });

      const contract = getContract(
        CONTRACT_ADDRESS,
        [] as any,
        provider,
        NETWORK,
        walletAddr as any,
      );

      contract.setTransactionDetails({
        inputs: [],
        outputs: [
          {
            to: CONTRACT_ADDRESS,
            value: satsAmount,
            index: 1,
            flags: TransactionOutputFlags.hasTo,
          },
        ],
      });

      const sim = await (contract as any).mint(walletAddr);
      if (sim && typeof sim === 'object' && 'error' in sim) {
        throw new Error('Simulation failed: ' + (sim as any).error);
      }

      const receipt = await sim.sendTransaction({
        signer: null,
        mldsaSigner: null,
        refundTo: walletAddr as any,
        maximumAllowedSatToSpend: satsAmount + 50000n,
        network: NETWORK,
        extraOutputs: [
          {
            address: CONTRACT_ADDRESS,
            value: Number(satsAmount),
          },
        ],
      });

      const txHash: string = receipt?.hash ?? '';
      const opscanUrl = 'https://opscan.org/transactions/' + txHash + '?network=testnet';
      setResult({ txHash, opscanUrl });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [walletAddr]);

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
