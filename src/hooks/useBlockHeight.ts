import { useState, useEffect } from 'react';
import { getBlockHeight } from '@/lib/opnet';

/** Polls the OP_NET Testnet for the current block height every 30 seconds. */
export function useBlockHeight() {
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      try {
        const height = await getBlockHeight();
        if (!cancelled) {
          setBlockHeight(height);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError('RPC unavailable');
        }
      }
    };

    fetch();
    const interval = setInterval(fetch, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { blockHeight, error };
}
