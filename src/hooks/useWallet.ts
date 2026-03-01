import { useAppStore } from '../store/useAppStore'
import { useToast } from './useToast'

declare global {
  interface Window {
    opnet?: {
      requestAccounts: () => Promise<string[]>
      getBalance?: () => Promise<{ confirmed: number; unconfirmed: number; total: number }>
      getPublicKey?: () => Promise<string>
      on?: (event: string, cb: (...args: unknown[]) => void) => void
    }
    unisat?: {
      requestAccounts: () => Promise<string[]>
      getBalance?: () => Promise<{ confirmed: number; unconfirmed: number; total: number }>
      getPublicKey?: () => Promise<string>
      on?: (event: string, cb: (...args: unknown[]) => void) => void
    }
    BitcoinProvider?: {
      request: (method: string, params?: unknown) => Promise<unknown>
    }
    okxwallet?: {
      bitcoin?: {
        requestAccounts: () => Promise<string[]>
        getBalance?: () => Promise<{ confirmed: number; unconfirmed: number; total: number }>
        on?: (event: string, cb: (...args: unknown[]) => void) => void
      }
    }
  }
}

export function detectInstalledWallets(): Record<string, boolean> {
  return {
    opnet:  typeof window !== 'undefined' && !!window.opnet,
    unisat: typeof window !== 'undefined' && !!window.unisat,
    xverse: typeof window !== 'undefined' && !!window.BitcoinProvider,
    okx:    typeof window !== 'undefined' && !!(window.okxwallet?.bitcoin),
  }
}

export function useWallet() {
  const store = useAppStore()
  const toast = useToast()

  async function connect(walletName: string) {
    try {
      let address = ''
      let sats = 0
      let pubKey = ''

      if (walletName === 'opnet' || walletName === 'OP_Wallet') {
        if (!window.opnet) {
          toast.error('OP_Wallet not found', 'Install the Chrome extension first')
          window.open('https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb', '_blank')
          return
        }
        const accounts = await window.opnet.requestAccounts()
        if (!accounts || accounts.length === 0) throw new Error('No accounts returned')
        address = accounts[0]
        if (window.opnet.getBalance) {
          const bal = await window.opnet.getBalance()
          sats = bal?.total ?? 0
        }
        if (window.opnet.getPublicKey) pubKey = (await window.opnet.getPublicKey()) ?? ''
        if (window.opnet.on) {
          window.opnet.on('accountsChanged', (accs: unknown) => {
            const a = accs as string[]
            if (!a || a.length === 0) store.disconnect()
            else store.setWallet({ walletAddr: a[0] })
          })
        }
      } else if (walletName === 'unisat' || walletName === 'Unisat') {
        if (!window.unisat) {
          toast.error('UniSat not found', 'Install UniSat Wallet extension first')
          window.open('https://unisat.io/', '_blank')
          return
        }
        const accounts = await window.unisat.requestAccounts()
        if (!accounts || accounts.length === 0) throw new Error('No accounts returned')
        address = accounts[0]
        if (window.unisat.getBalance) { const bal = await window.unisat.getBalance(); sats = bal?.total ?? 0 }
        if (window.unisat.getPublicKey) pubKey = (await window.unisat.getPublicKey()) ?? ''
        if (window.unisat.on) {
          window.unisat.on('accountsChanged', (accs: unknown) => {
            const a = accs as string[]
            if (!a || a.length === 0) store.disconnect()
            else store.setWallet({ walletAddr: a[0] })
          })
        }
      } else if (walletName === 'xverse' || walletName === 'Xverse') {
        if (!window.BitcoinProvider) {
          toast.error('Xverse not found', 'Install Xverse Wallet extension first')
          window.open('https://www.xverse.app/', '_blank')
          return
        }
        const res = await window.BitcoinProvider.request('getAccounts', { purposes: ['payment', 'ordinals'] }) as { address: string }[]
        if (!res || res.length === 0) throw new Error('No accounts returned')
        address = res[0].address
      } else if (walletName === 'okx' || walletName === 'OKX') {
        if (!window.okxwallet?.bitcoin) {
          toast.error('OKX Wallet not found', 'Install OKX Wallet extension first')
          window.open('https://www.okx.com/web3', '_blank')
          return
        }
        const accounts = await window.okxwallet.bitcoin.requestAccounts()
        if (!accounts || accounts.length === 0) throw new Error('No accounts returned')
        address = accounts[0]
        if (window.okxwallet.bitcoin.getBalance) { const bal = await window.okxwallet.bitcoin.getBalance(); sats = bal?.total ?? 0 }
      } else {
        if (window.opnet) return connect('opnet')
        if (window.unisat) return connect('unisat')
        toast.error('No wallet found', 'Install OP_Wallet, UniSat, Xverse or OKX')
        return
      }

      store.setWallet({ connected: true, wallet: walletName, walletAddr: address, walletSats: sats, publicKey: pubKey })
      toast.success('Wallet connected!', address.slice(0, 8) + '...' + address.slice(-6))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('User rejected') || msg.includes('cancelled') || msg.includes('denied')) {
        toast.info('Connection cancelled', 'User rejected the request')
      } else {
        toast.error('Connection failed', msg)
      }
    }
  }

  function disconnect() {
    store.disconnect()
    toast.info('Wallet disconnected', '')
  }

  function requireWallet(cb: () => void) {
    if (!store.connected) {
      toast.error('Wallet required', 'Please connect your wallet first')
      return
    }
    cb()
  }

  return { connect, disconnect, requireWallet }
}