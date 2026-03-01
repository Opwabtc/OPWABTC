Set-Location "C:\Users\peluc\Documents\OPWABTC"
$b = "C:\Users\peluc\Documents\OPWABTC"

# ── 1. main.tsx — remove div cursor (cursor e 100% CSS)
[System.IO.File]::WriteAllText("$b\src\main.tsx",
'import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>
)
', [System.Text.Encoding]::UTF8)
Write-Host "OK main.tsx" -ForegroundColor Green

# ── 2. useLivePrices.ts — URL corrigida + fallback
[System.IO.File]::WriteAllText("$b\src\hooks\useLivePrices.ts",
'import { useEffect } from "react"
import { useAppStore } from "../store/useAppStore"

async function fetchPrices(cb: (btc: number, gas: number) => void) {
  try {
    const btcRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
    let btc = 0
    if (btcRes.ok) {
      const d = await btcRes.json()
      btc = d?.bitcoin?.usd ?? 0
    }

    let gas = 1
    try {
      const gasRes = await fetch("https://mempool.opnet.org/testnet4/api/v1/fees/recommended")
      if (gasRes.ok) {
        const d = await gasRes.json()
        gas = d?.fastestFee ?? d?.halfHourFee ?? 1
      }
    } catch {
      try {
        const fb = await fetch("https://mempool.space/api/v1/fees/recommended")
        if (fb.ok) { const d = await fb.json(); gas = d?.fastestFee ?? 1 }
      } catch { /* silent */ }
    }

    cb(btc, gas)
  } catch { /* silent */ }
}

export function useLivePrices() {
  const setPrices = useAppStore((s) => s.setPrices)
  useEffect(() => {
    fetchPrices(setPrices)
    const id = setInterval(() => fetchPrices(setPrices), 30_000)
    return () => clearInterval(id)
  }, [setPrices])
}
', [System.Text.Encoding]::UTF8)
Write-Host "OK useLivePrices.ts" -ForegroundColor Green

# ── 3. GasConverterWidget.tsx — encoding limpo
[System.IO.File]::WriteAllText("$b\src\components\GasConverterWidget.tsx",
'import { useState } from "react"
import { useAppStore } from "../store/useAppStore"

export function GasConverterWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const { gasPrice, btcPrice } = useAppStore()
  const gasSat = gasPrice || 1
  const txUsd = btcPrice ? ((gasSat * 250) / 1e8 * btcPrice).toFixed(4) : null

  const convert = () => {
    const val = parseFloat(input)
    if (!val || isNaN(val)) { setResult("Enter a valid BTC amount"); return }
    if (!btcPrice) { setResult("Price loading..."); return }
    setResult((val * btcPrice).toLocaleString("en-US", { style: "currency", currency: "USD" }))
  }

  return (
    <>
      <div className={"gas-converter-widget" + (open ? " open" : "")} id="gasWidget">
        <div className="gcw-header">
          <span className="gcw-title">Gas Converter</span>
          <div className="gcw-live">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
            Live
          </div>
        </div>
        <div className="gcw-rows">
          <div className="gcw-row">
            <span className="gcw-row-label">Gas (sat/vB)</span>
            <span className="gcw-row-val">{gasSat}</span>
          </div>
          <div className="gcw-row">
            <span className="gcw-row-label">BTC / USD</span>
            <span className="gcw-row-val accent">{btcPrice ? "$" + btcPrice.toLocaleString("en-US") : "Loading..."}</span>
          </div>
          <div className="gcw-row">
            <span className="gcw-row-label">Typical Tx (USD)</span>
            <span className="gcw-row-val gold">{txUsd ? "~$" + txUsd : "..."}</span>
          </div>
        </div>
        <div className="gcw-divider" />
        <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8 }}>Convert BTC value to USD</div>
        <div className="gcw-input-row">
          <input className="gcw-input" type="number" placeholder="BTC amount" value={input} onChange={e => setInput(e.target.value)} />
          <button className="gcw-convert-btn" onClick={convert}>USD</button>
        </div>
        {result && <div className="gcw-result">{result}</div>}
      </div>

      <button
        onClick={() => setOpen(v => !v)}
        title={open ? "Close Gas Converter" : "Gas Converter"}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 999,
          width: 46, height: 46, borderRadius: "50%",
          border: "2px solid #ae005b",
          background: open ? "#ae005b" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s, box-shadow 0.2s",
          boxShadow: open
            ? "0 0 0 4px rgba(174,0,91,0.25), 0 4px 20px rgba(174,0,91,0.4)"
            : "0 4px 16px rgba(174,0,91,0.3)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke={open ? "white" : "#ae005b"} strokeWidth="2.2">
          <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
        </svg>
      </button>
    </>
  )
}
', [System.Text.Encoding]::UTF8)
Write-Host "OK GasConverterWidget.tsx" -ForegroundColor Green

# ── 4. Navigation.tsx — encoding limpo + chevrons corretos
[System.IO.File]::WriteAllText("$b\src\components\Navigation.tsx",
'import { useState } from "react"
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
', [System.Text.Encoding]::UTF8)
Write-Host "OK Navigation.tsx" -ForegroundColor Green

# ── 5. SimulatorDiffCard.tsx — classes CSS
[System.IO.File]::WriteAllText("$b\src\components\SimulatorDiffCard.tsx",
'interface Props { diff: number; months: number; label?: string }
export default function SimulatorDiffCard({ diff, months, label = "Reference A" }: Props) {
  if (diff <= 0) return null
  const f = (n: number) => Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return (
    <div className="sim-diff-card">
      <span className="sim-diff-amount">${f(diff)}</span>
      <span className="sim-diff-label">more than {label} after {months} {months === 1 ? "month" : "months"}.</span>
      <span className="sim-diff-note">* Simulation is illustrative only.</span>
    </div>
  )
}
', [System.Text.Encoding]::UTF8)
Write-Host "OK SimulatorDiffCard.tsx" -ForegroundColor Green

Write-Host ""
Write-Host "Parte 1 OK. Rode agora: .\fix_s18_p2.ps1" -ForegroundColor Cyan
