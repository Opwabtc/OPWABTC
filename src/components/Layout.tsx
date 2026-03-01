import React, { useState, useEffect } from 'react'
import Navigation from './Navigation'
import WalletModal from './WalletModal'
import { GasConverterWidget } from './GasConverterWidget'
import { ToastContainer } from './ToastContainer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [walletOpen, setWalletOpen] = useState(false)

  useEffect(() => {
    const handler = () => setWalletOpen(true)
    window.addEventListener('opwa:open-wallet-modal', handler)
    return () => window.removeEventListener('opwa:open-wallet-modal', handler)
  }, [])

  return (
    <>
      <Navigation onConnectClick={() => setWalletOpen(true)} />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>{children}</main>
      <GasConverterWidget />
      <ToastContainer />
      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  )
}