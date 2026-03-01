import { useEffect } from "react"
import { useAppStore } from "../store/useAppStore"

async function fetchPrices(cb: (btc: number, gas: number) => void) {
  try {
    const btcRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
    let btc = 0
    if (btcRes.ok) {
      const d = await btcRes.json()
      btc = d?.bitcoin?.usd ?? 0
    }

    let gas = 1
    try {
      const gasRes = await fetch("https://mempool.opnet.org/testnet4/api/v1/fees/recommended")
      if (gasRes.ok) {
        const d = await gasRes.json()
        gas = d?.fastestFee ?? d?.halfHourFee ?? 1
      }
    } catch {
      try {
        const fb = await fetch("https://mempool.space/api/v1/fees/recommended")
        if (fb.ok) { const d = await fb.json(); gas = d?.fastestFee ?? 1 }
      } catch { /* silent */ }
    }

    cb(btc, gas)
  } catch { /* silent */ }
}

export function useLivePrices() {
  const setPrices = useAppStore((s) => s.setPrices)
  useEffect(() => {
    fetchPrices(setPrices)
    const id = setInterval(() => fetchPrices(setPrices), 30_000)
    return () => clearInterval(id)
  }, [setPrices])
}
