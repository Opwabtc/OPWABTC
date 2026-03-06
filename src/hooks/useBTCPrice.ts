import { useState, useEffect } from 'react';
export function useBTCPrice() {
  const [price, setPrice] = useState<number | null>(null);
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const r = await globalThis.fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const d = await r.json();
        setPrice(d?.bitcoin?.usd ?? null);
      } catch (_) {
        // API unavailable — keep last known price, do not fallback to static value
      }
    };
    fetchPrice();
    const i = setInterval(fetchPrice, 60_000);
    return () => clearInterval(i);
  }, []);
  return price;
}
