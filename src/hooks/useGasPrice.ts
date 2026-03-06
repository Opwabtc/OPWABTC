import { useState, useEffect, useCallback } from 'react';

// FIX MEDI #65: refactoring — fetch logic was duplicated between useEffect and refetch().
// Now a single fetchGasPrice function is used by both.

const GAS_API = 'https://mempool.opnet.org/api/v1/fees/recommended';
const DEFAULT_FEE = 10; // sat/vbyte fallback

interface GasFees {
  fastestFee?: number;
  halfHourFee?: number;
  hourFee?: number;
  economyFee?: number;
}

async function _fetchFeeRate(): Promise<number> {
  const response = await fetch(GAS_API, { signal: AbortSignal.timeout(6000) });
  if (!response.ok) throw new Error('Failed to fetch gas price');
  const data: GasFees = await response.json();
  return data.halfHourFee ?? data.hourFee ?? data.economyFee ?? DEFAULT_FEE;
}

export const useGasPrice = () => {
  const [gasPrice, setGasPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // FIX MEDI #65: single fetch function used by both initial load and refetch
  const fetchGasPrice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fee = await _fetchFeeRate();
      setGasPrice(fee);
    } catch (err) {
      console.error('Error fetching gas price:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch gas price');
      setGasPrice(DEFAULT_FEE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 30_000);
    return () => clearInterval(interval);
  }, [fetchGasPrice]);

  const getTxUsd = (): string | null => {
    if (!gasPrice) return null;
    const txBytes = 250;
    const txBtc = (gasPrice * txBytes) / 1e8;
    return (txBtc * 1).toFixed(4);
  };

  return {
    gasPrice,
    loading,
    error,
    txUsd: getTxUsd(),
    refetch: fetchGasPrice,
  };
};
