import { create } from 'zustand'

interface AppState {
  connected: boolean; wallet: string | null; walletAddr: string | null
  walletSats: number; publicKey: string | null; network: string
  btcPrice: number | null; gasPrice: number; theme: 'dark' | 'light'
  setWallet: (d: Partial<AppState>) => void
  disconnect: () => void
  setPrices: (btc: number | null, gas: number) => void
  setNetwork: (network: string) => void
  setTheme: (t: 'dark' | 'light') => void
}

export const useAppStore = create<AppState>((set) => ({
  connected: false, wallet: null, walletAddr: null,
  walletSats: 0, publicKey: null, network: 'OP_NET Testnet',
  btcPrice: null, gasPrice: 10,
  theme: (typeof localStorage !== 'undefined'
    ? (localStorage.getItem('opwa-theme') as 'dark' | 'light') : null) || 'dark',
  setWallet: (d) => set(d),
  disconnect: () => set({ connected: false, wallet: null, walletAddr: null, walletSats: 0, publicKey: null }),
  setPrices: (btcPrice, gasPrice) => set({ btcPrice, gasPrice }),
  setNetwork: (network) => set({ network }),
  setTheme: (theme) => { localStorage.setItem('opwa-theme', theme); set({ theme }) },
}))