import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <rect x="2" y="4" width="16" height="2" rx="1"/>
    <rect x="2" y="9" width="16" height="2" rx="1"/>
    <rect x="2" y="14" width="16" height="2" rx="1"/>
  </svg>
)

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <rect x="0" y="0" width="6" height="6" rx="1"/>
    <rect x="8" y="0" width="6" height="6" rx="1"/>
    <rect x="0" y="8" width="6" height="6" rx="1"/>
    <rect x="8" y="8" width="6" height="6" rx="1"/>
  </svg>
)

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function Navigation({ onConnectClick }: { onConnectClick: () => void }) {
  const { connected, walletAddr, walletSats, btcPrice, gasPrice, theme, setTheme, disconnect } = useAppStore()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const balUsd = btcPrice && walletSats ? (walletSats / 1e8 * btcPrice) : 0
  const shortAddr = walletAddr ? walletAddr.slice(0, 6) + '…' + walletAddr.slice(-4) : ''

  const navLinks = [
    { href: '/#assets', label: 'Assets' },
    { href: '/#simulator', label: 'Simulator' },
    { href: '/#how-it-works', label: 'How It Works' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-mark">OP</div>
          <div className="logo-text">
            <span className="logo-name">OPWA</span>
            <span className="logo-tagline">Platform</span>
          </div>
        </Link>

        {/* Nav links — desktop */}
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
          {connected && (
            <li>
              <Link
                to="/dashboard"
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                <GridIcon /> Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Right side */}
        <div className="navbar-right">
          {/* Gas pill */}
          <div className="gas-ticker">
            <span className="gas-dot" />
            <span>{gasPrice} sat/vB</span>
          </div>

          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Wallet */}
          {connected ? (
            <div className="wallet-connected" onClick={() => setDropdownOpen(o => !o)}>
              <span className="wallet-dot" />
              <span className="wallet-balance">${balUsd.toFixed(2)}</span>
              <span className="wallet-addr">{shortAddr}</span>
              <span className="wallet-chevron">{dropdownOpen ? '▲' : '▼'}</span>
              {dropdownOpen && (
                <div className="wallet-dropdown" onClick={e => e.stopPropagation()}>
                  <Link to="/dashboard" className="wd-item" onClick={() => setDropdownOpen(false)}>
                    <GridIcon /> Dashboard
                  </Link>
                  <a
                    href={`https://opscan.org/accounts/${walletAddr}?network=op_testnet`}
                    target="_blank"
                    rel="noreferrer"
                    className="wd-item"
                  >
                    ↗ OPScan
                  </a>
                  <button className="wd-item wd-disconnect" onClick={() => { disconnect(); setDropdownOpen(false) }}>
                    ✕ Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn-connect" onClick={onConnectClick}>
              Connect Wallet
            </button>
          )}

          {/* Hamburger */}
          <button className="btn-menu" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {connected && (
            <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              Dashboard
            </Link>
          )}
          {!connected && (
            <button className="mobile-nav-link btn-connect" onClick={() => { onConnectClick(); setMobileOpen(false) }}>
              Connect Wallet
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
