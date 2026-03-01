import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <rect x="2" y="4" width="16" height="2" rx="1"/>
    <rect x="2" y="9" width="16" height="2" rx="1"/>
    <rect x="2" y="14" width="16" height="2" rx="1"/>
  </svg>
)
const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <rect x="0" y="0" width="6" height="6" rx="1"/><rect x="8" y="0" width="6" height="6" rx="1"/>
    <rect x="0" y="8" width="6" height="6" rx="1"/><rect x="8" y="8" width="6" height="6" rx="1"/>
  </svg>
)
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function Navigation({ onConnectClick = () => {} }: { onConnectClick?: () => void }) {
  const { connected, walletAddr, walletSats, btcPrice, gasPrice, theme, setTheme, disconnect } = useAppStore()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const balUsd = btcPrice && walletSats ? (walletSats / 1e8 * btcPrice) : 0
  const shortAddr = walletAddr ? walletAddr.slice(0, 6) + "..." + walletAddr.slice(-4) : ""
  const navLinks = [
    { href: "/#assets", label: "Assets" },
    { href: "/#simulator", label: "Simulator" },
    { href: "/#how-it-works", label: "How It Works" },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <div className="logo-mark">OP</div>
          <div className="logo-text">
            <span className="logo-name">OPWA</span>
            <span className="logo-tagline">Platform</span>
          </div>
        </Link>

        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>
          ))}
          {connected && (
            <li>
              <Link to="/dashboard" className={`nav-link${location.pathname === "/dashboard" ? " active" : ""}`}>
                <GridIcon /> Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar-right">
          <div className="gas-ticker">
            <span className="gas-dot" />
            <span className="gas-ticker-val">{gasPrice ?? 1} sat/vB</span>
          </div>

          <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            <span className="theme-toggle-track">
              <span className={`theme-toggle-icon${theme === "light" ? " active" : ""}`}><SunIcon /></span>
              <span className={`theme-toggle-icon${theme === "dark" ? " active" : ""}`}><MoonIcon /></span>
            </span>
            <span className="theme-toggle-thumb" />
          </button>

          {connected ? (
            <div className="wallet-connected" onClick={() => setDropdownOpen(o => !o)}>
              <span className="wallet-dot" />
              <span className="wallet-balance">${balUsd.toFixed(2)}</span>
              <span className="wallet-addr">{shortAddr}</span>
              <span className="wallet-chevron">{dropdownOpen ? "\u25b2" : "\u25bc"}</span>
              {dropdownOpen && (
                <div className="wallet-dropdown open" onClick={e => e.stopPropagation()}>
                  <div className="wd-address">{walletAddr}</div>
                  <div className="wd-balance">${balUsd.toFixed(2)}</div>
                  <div className="wd-balance-usd">{walletSats ? (walletSats / 1e8).toFixed(8) : "0"} BTC</div>
                  <div className="wd-divider" />
                  <div className="wd-actions">
                    <Link to="/dashboard" className="wd-action" onClick={() => setDropdownOpen(false)}>
                      <GridIcon /> Dashboard
                    </Link>
                    <a href={`https://opscan.org/accounts/${walletAddr}?network=op_testnet`}
                      target="_blank" rel="noreferrer" className="wd-action">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      OPScan
                    </a>
                    <button className="wd-action danger" onClick={() => { disconnect(); setDropdownOpen(false) }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="btn-connect" onClick={onConnectClick}>Connect Wallet</button>
          )}

          <button className="btn-menu" onClick={() => setMobileOpen(o => !o)} aria-label="Menu"><MenuIcon /></button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
          {connected && <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>}
          {!connected && <button className="mobile-nav-link btn-connect" onClick={() => { onConnectClick(); setMobileOpen(false) }}>Connect Wallet</button>}
        </div>
      )}
    </nav>
  )
}
