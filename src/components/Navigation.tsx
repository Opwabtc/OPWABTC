import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { ThemeToggle } from './ThemeToggle'
import { WalletModal } from './WalletModal'

export function Navigation() {
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)
  const { connected, walletAddr, walletSats, btcPrice, gasPrice } = useAppStore()
  const { disconnect } = useWallet()

  const shortAddr = walletAddr ? walletAddr.slice(0, 8) + '…' + walletAddr.slice(-6) : ''
  const btcBal = (walletSats / 1e8).toFixed(6)
  const gasSat = gasPrice || 1
  const txUsd = btcPrice ? ((gasSat * 250) / 1e8 * btcPrice).toFixed(4) : null

  const copyAddress = () => {
    if (walletAddr) navigator.clipboard?.writeText(walletAddr).catch(() => {})
    window.dispatchEvent(new CustomEvent('opwa-toast', { detail: { type: 'success', title: 'Copied!', desc: 'Address copied to clipboard.' } }))
    setDdOpen(false)
  }

  const links = [
    { href: '#home', label: 'Home', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
    { href: '#assets', label: 'Assets', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg> },
    { href: '#simulator', label: 'Simulator', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg> },
    { href: '#how-it-works', label: 'How It Works', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  ]

  return (
    <>
      <nav className="navbar fade-in">
        {/* Logo */}
        <a href="#home" className="logo">
          <div className="logo-mark">OP</div>
          <div>
            <div className="logo-name">OPWA</div>
            <div className="logo-tagline">Platform</div>
          </div>
        </a>

        {/* Nav links */}
        <div className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.icon}
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="navbar-right">
          {/* Gas ticker */}
          <div className="gas-ticker" title="OP_NET estimated gas fee">
            <svg className="gas-ticker-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
            </svg>
            <span>Gas</span>
            <span className="gas-ticker-val">{gasSat} sat/vB</span>
            {txUsd && <span className="gas-ticker-usd">(${txUsd})</span>}
          </div>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Wallet */}
          {!connected ? (
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 3h-3a2 2 0 00-2 2v2h7V5a2 2 0 00-2-2z"/>
              </svg>
              Connect Wallet
            </button>
          ) : (
            <div style={{ position: 'relative' }}>
              <div className="wallet-connected" onClick={() => setDdOpen(v => !v)}>
                <div className="wallet-balance">
                  <svg className="wallet-balance-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/><path d="M9 8h5a2 2 0 010 4H9zm0 0v8m0-8V4"/>
                  </svg>
                  <span>{btcBal}</span>
                </div>
                <button className="wallet-addr">
                  <span className="wallet-dot" />
                  <span>{shortAddr}</span>
                </button>
                <button className="wallet-chevron">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>

              {ddOpen && (
                <div className="wallet-dropdown open">
                  <div className="wd-address">{walletAddr}</div>
                  <div className="wd-balance">&#x20BF; {btcBal}</div>
                  {btcPrice && (
                    <div className="wd-balance-usd">
                      ≈ ${((walletSats / 1e8) * btcPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  )}
                  <div className="wd-divider" />
                  <div className="wd-actions">
                    <button className="wd-action" onClick={copyAddress}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                      </svg>
                      Copy Address
                    </button>
                    <button className="wd-action danger" onClick={() => { disconnect(); setDdOpen(false) }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button className="btn-menu" onClick={() => setMenuOpen(v => !v)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu open">
          {links.map(l => (
            <a key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
            {!connected && (
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => { setModalOpen(true); setMenuOpen(false) }}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}

      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
