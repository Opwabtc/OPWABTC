import { useEffect } from "react"
import { useAppStore } from "../store/useAppStore"

async function fetchPrices(cb: (btc: number, gas: number) => void) {
  try {
    const [btcRes, gasRes] = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"),
      fetch("https://mempool.opnet.org/testnet4/v1/fees/recommended"),
    ])
    const btcData = await btcRes.json()
    const gasData = await gasRes.json()
    const btc: number = btcData?.bitcoin?.usd ?? 0
    const gas: number = gasData?.fastestFee ?? 1
    cb(btc, gas)
  } catch {
    // silent
  }
}

export function useLivePrices() {
  const setPrices = useAppStore((s) => s.setPrices)

  useEffect(() => {
    fetchPrices(setPrices)
    const id = setInterval(() => fetchPrices(setPrices), 30_000)
    return () => clearInterval(id)
  }, [setPrices])
}