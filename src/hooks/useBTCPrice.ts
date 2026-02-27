import { useState, useEffect } from 'react';

export function useBTCPrice() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const r = await globalThis.fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
      );
      const d = await r.json();
      setPrice(d?.bitcoin?.usd ?? null);
    };
    fetch();
    const i = setInterval(fetch, 60_000);
    return () => clearInterval(i);
  }, []);

  return price;
}
