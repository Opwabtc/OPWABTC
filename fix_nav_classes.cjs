const fs = require('fs');

// Navigation.tsx com EXATAMENTE as classes CSS do original
// Classes: navbar, logo, logo-mark, logo-name, logo-tagline,
//          nav-links, nav-link, navbar-right, gas-ticker, gas-ticker-icon,
//          gas-ticker-val, gas-ticker-usd, theme-toggle, theme-toggle-track,
//          theme-toggle-icon, theme-toggle-thumb, btn-primary, wallet-connected,
//          wallet-balance, wallet-balance-icon, wallet-addr, wallet-dot,
//          wallet-chevron, btn-menu, wallet-dropdown, wd-address, wd-balance,
//          wd-balance-usd, wd-divider, wd-actions, wd-action, danger,
//          mobile-menu, mobile-nav-link, modal-backdrop, modal, modal-header,
//          modal-title, modal-close, modal-subtitle, wallet-option,
//          wallet-option-primary
const nav = `import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { ThemeToggle } from './ThemeToggle'
import { WalletModal } from './WalletModal'

export function Navigation() {
  const { connected, walletAddr, walletSats, btcPrice, gasPrice } = useAppStore()
  const { disconnect } = useWallet()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)

  const navigate = (href: string) => { window.location.href = href }

  const short = walletAddr ? walletAddr.slice(0, 8) + '...' + walletAddr.slice(-6) : ''
  const balBtc = walletSats != null ? (walletSats / 1e8).toFixed(6) : '0.000000'
  const gasVal = gasPrice ?? 10
  const txUsd = btcPrice ? (gasVal * 250 / 1e8 * btcPrice).toFixed(4) : null

  const copyAddr = () => {
    if (walletAddr) navigator.clipboard?.writeText(walletAddr).catch(() => {})
    window.dispatchEvent(new CustomEvent('opwa-toast', { detail: { type: 'success', title: 'Copied!', desc: 'Address copied.' } }))
    setDdOpen(false)
  }

  const navLinks = [
    { label: 'Home', href: '#home', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
    { label: 'Assets', href: '#assets', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg> },
    { label: 'Simulator', href: '#simulator', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg> },
    { label: 'How It Works', href: '#how-it-works', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  ]

  return (
    <>
      <nav className="navbar fade-in">
        <Link to="/" className="logo">
          <div className="logo-mark">OP</div>
          <div>
            <div className="logo-name">OPWA</div>
            <div className="logo-tagline">Platform</div>
          </div>
        </Link>

        <div className="nav-links">
          {navLinks.map(l => (
            <a key={l.href} className="nav-link" href={l.href}>
              {l.icon}{l.label}
            </a>
          ))}
          {connected && (
            <Link
              to="/dashboard"
              className={'nav-link' + (location.pathname === '/dashboard' ? ' active' : '')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
              </svg>
              Dashboard
            </Link>
          )}
        </div>

        <div className="navbar-right">
          {/* Gas ticker */}
          <div className="gas-ticker" title="OP_NET estimated gas fee">
            <svg className="gas-ticker-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
            </svg>
            <span>Gas</span>
            <span className="gas-ticker-val">{gasVal} sat/vB</span>
            {txUsd && <span className="gas-ticker-usd">(${txUsd})</span>}
          </div>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Wallet */}
          {connected ? (
            <div style={{ position: 'relative' }}>
              <div className="wallet-connected" onClick={() => setDdOpen(o => !o)}>
                <div className="wallet-balance">
                  <svg className="wallet-balance-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span>{balBtc}</span>
                </div>
                <div className="wallet-addr">
                  <span className="wallet-dot" />
                  <span>{short}</span>
                </div>
                <button className="wallet-chevron">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>

              {ddOpen && (
                <div className="wallet-dropdown open" style={{ display: 'block' }}>
                  <div className="wd-address">{walletAddr}</div>
                  <div className="wd-balance">&#x20BF; {balBtc}</div>
                  {btcPrice && (
                    <div className="wd-balance-usd">
                      ≈ ${(walletSats! / 1e8 * btcPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  )}
                  <div className="wd-divider" />
                  <div className="wd-actions">
                    {connected && (
                      <button className="wd-action" onClick={() => { navigate('/dashboard'); setDdOpen(false) }} style={{ color: 'var(--accent)', fontWeight: 700 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                          <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
                        </svg>
                        My Dashboard
                      </button>
                    )}
                    <div className="wd-divider" />
                    <div className="wd-actions">
                      <button className="wd-action" onClick={copyAddr}>
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
                </div>
              )}
            </div>
          ) : (
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <circle cx="16" cy="14" r="1" fill="currentColor"/>
              </svg>
              Connect Wallet
            </button>
          )}

          {/* Hamburger */}
          <button className="btn-menu" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu open">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          {connected && (
            <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMenuOpen(false)}
              style={{ color: 'var(--accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
              </svg>
              My Dashboard
            </Link>
          )}
          {!connected && (
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => { setModalOpen(true); setMenuOpen(false) }}>
              Connect Wallet
            </button>
          )}
        </div>
      )}

      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
`;

fs.writeFileSync('src/components/Navigation.tsx', nav, 'utf8');
console.log('OK Navigation.tsx — classes originais restauradas');
