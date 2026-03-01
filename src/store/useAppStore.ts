import { create } from 'zustand'

interface AppState {
  connected: boolean
  wallet: string
  walletAddr: string
  walletSats: number
  publicKey: string
  network: string
  btcPrice: number
  gasPrice: number
  theme: 'dark' | 'light'
  setWallet: (wallet: string, addr: string, sats: number, pubKey: string) => void
  disconnect: () => void
  setPrices: (btcPrice: number, gasPrice: number) => void
  setNetwork: (network: string) => void
  setTheme: (theme: 'dark' | 'light') => void
}

export const useAppStore = create<AppState>((set) => ({
  connected: false,
  wallet: '',
  walletAddr: '',
  walletSats: 0,
  publicKey: '',
  network: 'testnet',
  btcPrice: 0,
  gasPrice: 1,
  theme: 'dark',
  setWallet: (wallet, walletAddr, walletSats, publicKey) =>
    set({ connected: true, wallet, walletAddr, walletSats, publicKey }),
  disconnect: () =>
    set({ connected: false, wallet: '', walletAddr: '', walletSats: 0, publicKey: '' }),
  setPrices: (btcPrice, gasPrice) => set({ btcPrice, gasPrice }),
  setNetwork: (network) => set({ network }),
  setTheme: (theme) => set({ theme }),
}))