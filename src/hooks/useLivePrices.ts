import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

async function fetchPrices(setPrices: (b: number|null, g: number) => void) {
  try {
    const [priceRes, gasRes] = await Promise.allSettled([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
      fetch('https://mempool.opnet.org/testnet4/api/v1/fees/recommended')
    ])
    let btc = null, gas = 10
    if (priceRes.status === 'fulfilled' && priceRes.value.ok) {
      const d = await priceRes.value.json(); btc = d?.bitcoin?.usd || null
    }
    if (gasRes.status === 'fulfilled' && gasRes.value.ok) {
      const g = await gasRes.value.json(); gas = g?.fastestFee ?? g?.halfHourFee ?? 10
    } else {
      try {
        const fb = await fetch('https://mempool.opnet.org/api/v1/fees/recommended')
        if (fb.ok) { const g = await fb.json(); gas = g?.fastestFee ?? 10 }
      } catch(_) {}
    }
    setPrices(btc, gas)
  } catch(_) {}
}

export function useLivePrices() {
  const setPrices = useAppStore(s => s.setPrices)
  useEffect(() => {
    fetchPrices(setPrices)
    const id = setInterval(() => fetchPrices(setPrices), 30_000)
    return () => clearInterval(id)
  }, [setPrices])
}
