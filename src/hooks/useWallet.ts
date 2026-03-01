import { useAppStore } from '../store/useAppStore'

function showToast(type: string, title: string, desc: string) {
  window.dispatchEvent(new CustomEvent('opwa-toast', { detail: { type, title, desc } }))
}

export function useWallet() {
  const { setWallet, disconnect: storeDisconnect } = useAppStore.getState()

  async function connect(name: string) {
    try {
      showToast('info', 'Connecting...', 'Waiting for ' + name + ' wallet approval.')
      let address: string | null = null, balanceSats = 0, publicKey: string | null = null

      if (name === 'OP_Wallet') {
        if (!window.opnet) { showToast('error', 'OP_Wallet Not Found', 'Install OP_Wallet from Chrome Web Store.'); return }
        const accs = await window.opnet.requestAccounts()
        address = accs?.[0] || null
        if (!address) { showToast('error', 'No Account', 'No account returned by OP_Wallet.'); return }
        try { publicKey = await window.opnet.getPublicKey() } catch(_) {}
        try { const b = await window.opnet.getBalance(); balanceSats = b?.total ?? b?.confirmed ?? 0 } catch(_) {}

      } else if (name === 'Unisat') {
        if (!window.unisat) { showToast('error', 'UniSat Not Found', 'Install UniSat wallet.'); return }
        const accs = await window.unisat.requestAccounts()
        address = accs?.[0] || null
        if (!address) { showToast('error', 'No Account', 'No account returned by UniSat.'); return }
        try { publicKey = await window.unisat.getPublicKey() } catch(_) {}
        try { const b = await window.unisat.getBalance(); balanceSats = b?.total ?? b?.confirmed ?? 0 } catch(_) {}

      } else if (name === 'Xverse') {
        const xverse = window.BitcoinProvider || window.XverseProviders?.BitcoinProvider
        if (!xverse) { showToast('error', 'Xverse Not Found', 'Install Xverse wallet.'); return }
        const res = await xverse.request('getAccounts', { purposes: ['payment', 'ordinals'] })
        const accts = res?.result?.addresses || []
        address = accts?.[0]?.address || null
        publicKey = accts?.[0]?.publicKey || null
        if (!address) { showToast('error', 'No Account', 'No account returned by Xverse.'); return }

      } else if (name === 'OKX') {
        if (!window.okxwallet?.bitcoin) { showToast('error', 'OKX Not Found', 'Install OKX Wallet.'); return }
        const res = await window.okxwallet.bitcoin.requestAccounts()
        address = res?.[0] || null
        if (!address) { showToast('error', 'No Account', 'No account returned by OKX.'); return }
        try { const b = await window.okxwallet.bitcoin.getBalance(); balanceSats = b?.total ?? 0 } catch(_) {}
      }

      if (!address) { showToast('error', 'Connection Failed', 'Could not get address from wallet.'); return }

      setWallet({ connected: true, wallet: name, walletAddr: address, walletSats: balanceSats, publicKey })
      const short = address.slice(0,8) + '...' + address.slice(-6)
      showToast('success', 'Wallet Connected', name + ' connected - ' + short)

      const provider = window.opnet || window.unisat || null
      if (provider?.on) {
        provider.on('accountsChanged', (accs: string[]) => {
          if (!accs?.length) { disconnect(); return }
          setWallet({ walletAddr: accs[0] })
          showToast('info', 'Account Changed', accs[0].slice(0,8) + '...' + accs[0].slice(-6))
        })
        provider.on('disconnect', () => disconnect())
      }
    } catch(err: any) {
      showToast('error', 'Connection Failed', err?.message || 'User rejected or wallet error.')
    }
  }

  function disconnect() {
    storeDisconnect()
    showToast('info', 'Wallet Disconnected', 'You have safely signed out.')
  }

  function requireWallet() {
    const { connected, wallet } = useAppStore.getState()
    if (!connected) { showToast('info', 'Wallet Required', 'Connect your wallet to invest.'); return false }
    showToast('success', 'Initiating Transaction...', 'Confirm in your ' + wallet + ' wallet.')
    return true
  }

  return { connect, disconnect, requireWallet }
}
