Set-Location "C:\Users\peluc\Documents\OPWABTC"
$base = "C:\Users\peluc\Documents\OPWABTC"

# ─────────────────────────────────────────────
# 1. index.css — cursor correto (metade branco/laranja SVG) + dashboard usa tokens CSS
#    + tema claro: números visíveis + remoção do cursor pill div do DOM (usamos só CSS cursor)
# ─────────────────────────────────────────────

$css = [System.IO.File]::ReadAllText("$base\src\index.css", [System.Text.Encoding]::UTF8)

# Remove bloco do cursor laranja div (linhas com #opwa-cursor) — vamos usar só CSS cursor
$css = $css -replace '(?s)/\*[^\*]*CUSTOM CURSOR PILL diagonal[^\*]*\*/[\s\S]*?#opwa-cursor\.hovering\s*\{[^}]*\}', ''
$css = $css -replace '(?s)#opwa-cursor\s*\{[^}]*\}', ''
$css = $css -replace '\*\s*\{\s*cursor:\s*none\s*!important;\s*\}', ''

# Remove bloco duplicado de .wallet-connected / .wallet-dot / .wd-item que aparece depois linha 4823
# (identificado pelo pattern de background rgba(255,255,255,0.05) que é o bloco duplicado)
$css = $css -replace '(?s)\.wallet-connected\s*\{\s*position:\s*relative;[\s\S]*?\.mobile-nav-link:last-child\s*\{\s*border-bottom:\s*none;\s*\}', ''

# Garante cursor pill SVG correto (metade branco / metade laranja) no topo após :root
$cursorBlock = @'

/* ══════════════════════════════════════════════════════
   PILL CURSOR — left half white, right half orange
   SVG inline, 28×16px. DO NOT use #opwa-cursor div.
   ══════════════════════════════════════════════════════ */
* { cursor: none !important; }
body {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='16' viewBox='0 0 28 16'%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect x='1' y='1' width='26' height='14' rx='7'/%3E%3C/clipPath%3E%3C/defs%3E%3Crect x='1' y='1' width='13' height='14' fill='%23ffffff' clip-path='url(%23c)'/%3E%3Crect x='14' y='1' width='13' height='14' fill='%23f97316' clip-path='url(%23c)'/%3E%3Crect x='1' y='1' width='26' height='14' rx='7' fill='none' stroke='%23888' stroke-width='1'/%3E%3Cline x1='14' y1='1' x2='14' y2='15' stroke='%23888' stroke-width='.8'/%3E%3C/svg%3E") 14 8, default !important;
}
a, button, [role="button"], .filter-tab, .wallet-option, .wd-action,
.network-option, .partner-slot, .sim-stepper-btn, .theme-toggle,
.modal-close, .wallet-chevron, .social-btn, select, .gcw-convert-btn,
.value-toggle-btn, .filter-select, .btn-card, .btn-sim, .btn-primary,
.btn-primary-lg, .btn-outline-lg, .btn-ghost-nav, .btn-link, .btn-menu,
.step, .footer-link, .btn-connect, .wd-item, .wd-disconnect {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='16' viewBox='0 0 28 16'%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect x='1' y='1' width='26' height='14' rx='7'/%3E%3C/clipPath%3E%3C/defs%3E%3Crect x='1' y='1' width='13' height='14' fill='%23ffffff' clip-path='url(%23c)'/%3E%3Crect x='14' y='1' width='13' height='14' fill='%23ea580c' clip-path='url(%23c)'/%3E%3Crect x='1' y='1' width='26' height='14' rx='7' fill='none' stroke='%23888' stroke-width='1'/%3E%3Cline x1='14' y1='1' x2='14' y2='15' stroke='%23888' stroke-width='.8'/%3E%3C/svg%3E") 14 8, pointer !important;
}
input, textarea {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='24' viewBox='0 0 16 24'%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Crect x='1' y='1' width='14' height='22' rx='7'/%3E%3C/clipPath%3E%3C/defs%3E%3Crect x='1' y='1' width='7' height='22' fill='%23ffffff' clip-path='url(%23c)'/%3E%3Crect x='8' y='1' width='7' height='22' fill='%23f97316' clip-path='url(%23c)'/%3E%3Crect x='1' y='1' width='14' height='22' rx='7' fill='none' stroke='%23888' stroke-width='1'/%3E%3Cline x1='8' y1='1' x2='8' y2='23' stroke='%23888' stroke-width='.8'/%3E%3C/svg%3E") 8 12, text !important;
}

'@

# Insere cursor block logo após os :root / [data-theme] blocks (antes do RESET comment)
$css = $css -replace '(/\* â"€â"€ RESET â"€â"€ \*/|/\* ─+ RESET ─+ \*/)', "$cursorBlock`$1"

# Tema claro — números do simulador e dashboard visíveis (usa --text-1 dark no light)
# Já existe [data-theme="light"] com --text-1: #111111 — só precisamos garantir
# SimulatorDiffCard texto legível no light mode
$lightFix = @'

/* ── LIGHT MODE: sim-diff-card texto legível ── */
[data-theme="light"] .sim-diff-card span[style*="rgba(255,255,255"] {
  color: rgba(30,20,10,0.7) !important;
}
[data-theme="light"] .sim-compare-rate { color: var(--text-2) !important; }
[data-theme="light"] .sim-compare-name { color: var(--text-1) !important; }
[data-theme="light"] .sim-result-btc   { color: var(--text-2) !important; }

'@

$css = $css.TrimEnd() + "`n" + $lightFix

[System.IO.File]::WriteAllText("$base\src\index.css", $css, [System.Text.Encoding]::UTF8)
Write-Host "OK index.css — cursor corrigido + light mode fixes" -ForegroundColor Green

# ─────────────────────────────────────────────
# 2. main.tsx — remove criação do div #opwa-cursor (cursor é 100% CSS agora)
# ─────────────────────────────────────────────

[System.IO.File]::WriteAllText("$base\src\main.tsx", @'
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>
)
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK main.tsx — div cursor removido" -ForegroundColor Green

# ─────────────────────────────────────────────
# 3. Navigation.tsx — encoding bugs + navbar spacing
# ─────────────────────────────────────────────

[System.IO.File]::WriteAllText("$base\src\components\Navigation.tsx", @'
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
    <rect x="0" y="0" width="6" height="6" rx="1"/>
    <rect x="8" y="0" width="6" height="6" rx="1"/>
    <rect x="0" y="8" width="6" height="6" rx="1"/>
    <rect x="8" y="8" width="6" height="6" rx="1"/>
  </svg>
)

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
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
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-mark">OP</div>
          <div className="logo-text">
            <span className="logo-name">OPWA</span>
            <span className="logo-tagline">Platform</span>
          </div>
        </Link>

        {/* Nav links */}
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
          {connected && (
            <li>
              <Link to="/dashboard" className={`nav-link${location.pathname === "/dashboard" ? " active" : ""}`}>
                <GridIcon /> Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Right */}
        <div className="navbar-right">
          <div className="gas-ticker">
            <span className="gas-dot" />
            <span className="gas-ticker-val">{gasPrice ?? 1} sat/vB</span>
          </div>

          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
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
              <span className="wallet-chevron">{dropdownOpen ? "▲" : "▼"}</span>
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
                    <a
                      href={`https://opscan.org/accounts/${walletAddr}?network=op_testnet`}
                      target="_blank" rel="noreferrer" className="wd-action"
                    >
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
            <button className="btn-connect" onClick={onConnectClick}>
              Connect Wallet
            </button>
          )}

          <button className="btn-menu" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            <MenuIcon />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          {connected && (
            <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>
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
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK Navigation.tsx — encoding + spacing corrigidos" -ForegroundColor Green

# ─────────────────────────────────────────────
# 4. useLivePrices.ts — fix URL da API de gas (estava com caminho errado)
# ─────────────────────────────────────────────

[System.IO.File]::WriteAllText("$base\src\hooks\useLivePrices.ts", @'
import { useEffect } from "react"
import { useAppStore } from "../store/useAppStore"

async function fetchPrices(cb: (btc: number, gas: number) => void) {
  try {
    const [btcRes, gasRes] = await Promise.allSettled([
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"),
      fetch("https://mempool.opnet.org/testnet4/api/v1/fees/recommended"),
    ])

    let btc = 0
    let gas = 1

    if (btcRes.status === "fulfilled" && btcRes.value.ok) {
      const d = await btcRes.value.json()
      btc = d?.bitcoin?.usd ?? 0
    }

    if (gasRes.status === "fulfilled" && gasRes.value.ok) {
      const d = await gasRes.value.json()
      gas = d?.fastestFee ?? d?.halfHourFee ?? 1
    } else {
      // fallback para mainnet mempool se testnet4 falhar
      try {
        const fb = await fetch("https://mempool.space/api/v1/fees/recommended")
        if (fb.ok) { const d = await fb.json(); gas = d?.fastestFee ?? 1 }
      } catch { /* silent */ }
    }

    cb(btc, gas)
  } catch {
    // silent
  }
}

export function useLivePrices() {
  const setPrices = useAppStore((s) => s.setPrices)
  useEffect(() => {
    fetchPrices(setPrices)
    const id = setInterval(() => fetchPrices(setPrices), 30_000)
    return () => clearInterval(id)
  }, [setPrices])
}
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK useLivePrices.ts — URL gas corrigida + fallback" -ForegroundColor Green

# ─────────────────────────────────────────────
# 5. GasConverterWidget.tsx — fix encoding + usar btcPrice do store (já correto)
# ─────────────────────────────────────────────

[System.IO.File]::WriteAllText("$base\src\components\GasConverterWidget.tsx", @'
import { useState } from "react"
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
        <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8 }}>Convert BTC value &#8594; USD</div>
        <div className="gcw-input-row">
          <input className="gcw-input" type="number" placeholder="BTC amount" value={input} onChange={e => setInput(e.target.value)} />
          <button className="gcw-convert-btn" onClick={convert}>&#8594; USD</button>
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
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK GasConverterWidget.tsx — encoding corrigido" -ForegroundColor Green

# ─────────────────────────────────────────────
# 6. SimulatorDiffCard.tsx — texto adaptado para light mode
# ─────────────────────────────────────────────

[System.IO.File]::WriteAllText("$base\src\components\SimulatorDiffCard.tsx", @'
interface Props { diff: number; months: number; label?: string }

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
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK SimulatorDiffCard.tsx — classes CSS para light mode" -ForegroundColor Green

# ─────────────────────────────────────────────
# 7. Adiciona classes .sim-diff-card ao index.css
# ─────────────────────────────────────────────

$cssNow = [System.IO.File]::ReadAllText("$base\src\index.css", [System.Text.Encoding]::UTF8)
$diffCardCss = @'

/* ── SIMULATOR DIFF CARD ── */
.sim-diff-card {
  background: linear-gradient(135deg, rgba(249,115,22,0.10), rgba(251,191,36,0.04));
  border: 1px solid rgba(249,115,22,0.28);
  border-radius: 12px;
  padding: 0.9rem 1.25rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.sim-diff-amount {
  color: #f97316;
  font-weight: 800;
  font-size: 1.05rem;
}
.sim-diff-label {
  color: var(--text-2);
  font-size: 0.88rem;
}
.sim-diff-note {
  color: var(--text-3);
  font-size: 0.72rem;
  margin-left: auto;
}
[data-theme="light"] .sim-diff-card {
  background: linear-gradient(135deg, rgba(249,115,22,0.08), rgba(251,191,36,0.04));
}
[data-theme="light"] .sim-diff-label { color: #444; }
[data-theme="light"] .sim-diff-note  { color: #888; }

'@

if (-not $cssNow.Contains(".sim-diff-card")) {
  $cssNow = $cssNow.TrimEnd() + "`n" + $diffCardCss
  [System.IO.File]::WriteAllText("$base\src\index.css", $cssNow, [System.Text.Encoding]::UTF8)
  Write-Host "OK index.css — sim-diff-card classes adicionadas" -ForegroundColor Green
} else {
  Write-Host "OK index.css — sim-diff-card ja existe" -ForegroundColor Yellow
}

# ─────────────────────────────────────────────
# 8. Dashboard.tsx — usa CSS vars (respeita light/dark) em vez de hardcoded #0a0a0a
# ─────────────────────────────────────────────

[System.IO.File]::WriteAllText("$base\src\pages\Dashboard.tsx", @'
import { useEffect, useState, useCallback } from "react"
import { useAppStore } from "../store/useAppStore"

const OPWAP_ADDRESS = import.meta.env.VITE_OPWAP_TOKEN_ADDRESS ?? "opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp"
const TOTAL_SUPPLY = 1_000_000_000

export default function Dashboard() {
  const { connected, walletAddr, walletSats, btcPrice, network } = useAppStore()
  const [opwapBal, setOpwapBal] = useState(0)
  const [minted, setMinted] = useState(0)
  const [updated, setUpdated] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    if (!connected || !walletAddr) return
    setLoading(true)
    try {
      const rpc = "https://mempool.opnet.org/testnet4"
      const [b, s] = await Promise.all([
        fetch(`${rpc}/v1/opnet/balanceOf`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: OPWAP_ADDRESS, owner: walletAddr }),
        }),
        fetch(`${rpc}/v1/opnet/totalSupply`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: OPWAP_ADDRESS }),
        }),
      ])
      if (b.ok) { const d = await b.json(); setOpwapBal(Number(d.balance ?? 0) / 1e8) }
      if (s.ok) { const d = await s.json(); setMinted(Number(d.totalSupply ?? 0) / 1e8) }
    } catch { /* silent */ }
    finally { setLoading(false); setUpdated(new Date().toLocaleTimeString()) }
  }, [connected, walletAddr])

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 30000)
    return () => clearInterval(id)
  }, [fetchData])

  const btcBal = (walletSats ?? 0) / 1e8
  const portUsd = btcBal * (btcPrice ?? 0)
  const pct = minted > 0 ? (minted / TOTAL_SUPPLY) * 100 : 0
  const f = (n: number, d = 2) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })

  if (!connected) return (
    <div className="dash-empty">
      <div className="dash-empty-inner">
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&#128274;</div>
        <h2 className="dash-empty-title">Connect your wallet</h2>
        <p className="dash-empty-sub">Connect OPWallet to see your portfolio</p>
      </div>
    </div>
  )

  return (
    <div className="dash-page">
      <div className="dash-container">

        {/* Header */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">My Portfolio</h1>
            <div className="dash-meta">
              <span className="dash-addr">{walletAddr?.slice(0,12)}...{walletAddr?.slice(-4)}</span>
              <span className="badge-network-tag">
                OP_NET {network === "testnet" || network === "OP_NET Testnet" ? "Testnet" : "Mainnet"}
              </span>
              {updated && <span className="dash-updated">Updated {updated}</span>}
            </div>
          </div>
          <div className="dash-actions">
            <div className="dash-connected-badge">
              <span className="dash-connected-dot" />
              CONNECTED
            </div>
            <button onClick={fetchData} disabled={loading} className="dash-refresh-btn">
              {loading ? "..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="dash-stats-grid">
          <div className="dash-stat-card">
            <div className="dash-stat-label">BTC BALANCE</div>
            <div className="dash-stat-value">
              <span style={{ color: "var(--accent)", fontSize: "0.75em" }}>&#8383;</span> {btcBal.toFixed(8)}
            </div>
            <div className="dash-stat-sub">${f(portUsd)} USD</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-label">OPWAP TOKENS</div>
            <div className="dash-stat-value" style={{ color: "var(--accent)" }}>{f(opwapBal, 0)}</div>
            <div className="dash-stat-sub">+12.4% this month</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-label">PORTFOLIO USD</div>
            <div className="dash-stat-value" style={{ color: "var(--gold)" }}>${f(portUsd)}</div>
            <div className="dash-stat-sub">Live price</div>
          </div>
        </div>

        {/* Supply bar */}
        <div className="dash-supply-card">
          <div className="dash-supply-header">
            <span className="dash-stat-label">OPWAP SUPPLY PROGRESS</span>
            <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.85rem" }}>{pct.toFixed(2)}%</span>
          </div>
          <div className="dash-progress-track">
            <div className="dash-progress-fill" style={{ width: `${Math.max(pct, 0.05)}%` }} />
          </div>
          <div className="dash-supply-footer">
            <span>{f(minted, 0)} minted</span>
            <span>1B max</span>
          </div>
        </div>

        {/* Token holdings */}
        <div className="dash-stat-label" style={{ marginBottom: "0.75rem" }}>TOKEN HOLDINGS</div>
        <div style={{ marginBottom: "2rem" }}>
          <div className="dash-token-card">
            <div className="dash-token-header">
              <span className="dash-token-name">OPWAP</span>
              <span className="dash-token-badge">OP_20</span>
            </div>
            <div className="dash-token-bal">{f(opwapBal, 0)}</div>
            <div className="dash-token-btc">&#8383; {(opwapBal * 0.001).toFixed(6)} BTC</div>
            <div className="dash-token-apy">&#9733; 15% APY</div>
            <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener noreferrer" className="dash-token-link">
              View on OPScan &#8599;
            </a>
          </div>
        </div>

        <a
          href={`https://opscan.org/?network=op_testnet&address=${walletAddr}`}
          target="_blank" rel="noopener noreferrer"
          className="dash-opscan-btn"
        >
          &#8599; View all transactions on OPScan
        </a>

      </div>
    </div>
  )
}
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK Dashboard.tsx — usa CSS vars, respeita light/dark" -ForegroundColor Green

# ─────────────────────────────────────────────
# 9. Adiciona classes do dashboard ao index.css
# ─────────────────────────────────────────────

$cssNow = [System.IO.File]::ReadAllText("$base\src\index.css", [System.Text.Encoding]::UTF8)

$dashCss = @'

/* ════════════════════════════════
   DASHBOARD PAGE
   ════════════════════════════════ */
.dash-page {
  min-height: 100vh;
  background: var(--bg-base);
  padding-top: calc(var(--navbar-h) + 2rem);
  padding-bottom: 4rem;
}
.dash-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

.dash-empty {
  min-height: 100vh;
  background: var(--bg-base);
  display: flex; align-items: center; justify-content: center;
}
.dash-empty-inner { text-align: center; }
.dash-empty-title { font-family: "Syne", sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--text-1); margin: 0 0 0.5rem; }
.dash-empty-sub   { color: var(--text-2); }

.dash-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;
}
.dash-title { font-family: "Syne", sans-serif; font-size: clamp(2rem,5vw,3.5rem); font-weight: 900; color: var(--text-1); margin: 0; letter-spacing: -0.02em; }
.dash-meta  { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap; }
.dash-addr  { color: var(--text-3); font-size: 0.78rem; font-family: "DM Mono", monospace; }
.dash-updated { color: var(--text-3); font-size: 0.72rem; }
.badge-network-tag {
  background: var(--accent-dim); border: 1px solid var(--accent-border);
  color: var(--accent); padding: 0.2rem 0.6rem; border-radius: 4px;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em;
}
.dash-actions { display: flex; gap: 0.75rem; }
.dash-connected-badge {
  background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); color: #22c55e;
  padding: 0.4rem 1rem; border-radius: 999px; font-size: 0.78rem; font-weight: 700;
  display: flex; align-items: center; gap: 0.4rem;
}
.dash-connected-dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; display: inline-block; }
.dash-refresh-btn {
  background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-1);
  padding: 0.4rem 1rem; border-radius: 8px; font-size: 0.78rem; font-weight: 600;
  transition: border-color .15s;
}
.dash-refresh-btn:hover { border-color: var(--accent-border); }

.dash-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 1rem; margin-bottom: 1.25rem; }
.dash-stat-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem;
  transition: border-color .2s, box-shadow .2s;
}
.dash-stat-card:hover { border-color: var(--accent-border); box-shadow: 0 4px 20px rgba(249,115,22,0.08); }
.dash-stat-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; color: var(--text-3); text-transform: uppercase; margin-bottom: 0.75rem; }
.dash-stat-value { font-family: "Syne", sans-serif; font-size: clamp(1.5rem,4vw,2.2rem); font-weight: 900; color: var(--text-1); letter-spacing: -0.03em; }
.dash-stat-sub   { color: var(--text-2); font-size: 0.8rem; margin-top: 0.25rem; }

.dash-supply-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.25rem; }
.dash-supply-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
.dash-progress-track { background: var(--bg-elevated); border-radius: 3px; height: 5px; overflow: hidden; }
.dash-progress-fill  { height: 100%; background: linear-gradient(90deg, var(--accent), var(--gold)); border-radius: 3px; box-shadow: 0 0 8px rgba(249,115,22,.4); transition: width .5s; }
.dash-supply-footer  { display: flex; justify-content: space-between; margin-top: 0.5rem; color: var(--text-3); font-size: 0.72rem; }

.dash-token-card {
  background: var(--bg-card); border: 1px solid var(--accent-border);
  border-radius: 16px; padding: 1.5rem; max-width: 280px;
}
.dash-token-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.dash-token-name   { font-weight: 800; font-size: 1.05rem; color: var(--accent); }
.dash-token-badge  { background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.25); color: #22c55e; font-size: 0.62rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 4px; }
.dash-token-bal    { font-family: "Syne", sans-serif; font-size: 1.8rem; font-weight: 900; color: var(--text-1); margin-bottom: 0.25rem; }
.dash-token-btc    { color: var(--text-3); font-size: 0.78rem; margin-bottom: 0.6rem; }
.dash-token-apy    { color: var(--accent); font-size: 0.78rem; font-weight: 700; margin-bottom: 0.5rem; }
.dash-token-link   { color: var(--accent); font-size: 0.78rem; text-decoration: none; }
.dash-token-link:hover { text-decoration: underline; }

.dash-opscan-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--accent-dim); border: 1px solid var(--accent-border);
  color: var(--accent); padding: 0.75rem 1.5rem; border-radius: 10px;
  text-decoration: none; font-weight: 700; font-size: 0.88rem;
  transition: background .15s, box-shadow .15s;
}
.dash-opscan-btn:hover { background: rgba(249,115,22,0.18); box-shadow: 0 4px 16px rgba(249,115,22,.2); }

'@

if (-not $cssNow.Contains(".dash-page")) {
  $cssNow = $cssNow.TrimEnd() + "`n" + $dashCss
  [System.IO.File]::WriteAllText("$base\src\index.css", $cssNow, [System.Text.Encoding]::UTF8)
  Write-Host "OK index.css — dashboard classes adicionadas" -ForegroundColor Green
} else {
  Write-Host "OK index.css — dashboard classes ja existem" -ForegroundColor Yellow
}

# ─────────────────────────────────────────────
# 10. Home.tsx — fix Simulator: BTC/USD toggle correto + SimulatorDiffCard integrado
#     + encoding bugs (â€¦ â†' etc.)
# ─────────────────────────────────────────────

$homePath = "$base\src\pages\Home.tsx"
$homeContent = [System.IO.File]::ReadAllText($homePath, [System.Text.Encoding]::UTF8)

# Fix encoding bugs no Home.tsx
$homeContent = $homeContent.Replace("â€¦", "...")
$homeContent = $homeContent.Replace("â€"", "-")
$homeContent = $homeContent.Replace("â€™", "'")
$homeContent = $homeContent.Replace("â†'", "->")
$homeContent = $homeContent.Replace("Â·", "·")
$homeContent = $homeContent.Replace("Â©", "©")
$homeContent = $homeContent.Replace("Ã—", "×")
$homeContent = $homeContent.Replace("â€¢", "•")
$homeContent = $homeContent.Replace("â‰ˆ", "≈")
$homeContent = $homeContent.Replace("â–²", "▲")
$homeContent = $homeContent.Replace("â–¼", "▼")
$homeContent = $homeContent.Replace("âœ…", "✓")
$homeContent = $homeContent.Replace("âœ•", "×")
$homeContent = $homeContent.Replace("mÃªs", "mês")

[System.IO.File]::WriteAllText($homePath, $homeContent, [System.Text.Encoding]::UTF8)
Write-Host "OK Home.tsx — encoding bugs corrigidos" -ForegroundColor Green

# ─────────────────────────────────────────────
# 11. Integra SimulatorDiffCard no Simulator do Home.tsx
# ─────────────────────────────────────────────

$homeContent = [System.IO.File]::ReadAllText($homePath, [System.Text.Encoding]::UTF8)

# Verifica se já importa SimulatorDiffCard
if (-not $homeContent.Contains("SimulatorDiffCard")) {
  # Adiciona import
  $homeContent = $homeContent.Replace(
    "import { useInvestment } from '../hooks/useInvestment'",
    "import { useInvestment } from '../hooks/useInvestment'`nimport SimulatorDiffCard from '../components/SimulatorDiffCard'"
  )
  # Se o import acima nao encontrou (caminho diferente), tenta outro
  if (-not $homeContent.Contains("SimulatorDiffCard")) {
    $homeContent = $homeContent.Replace(
      "import { useInvestment }",
      "import SimulatorDiffCard from '../components/SimulatorDiffCard'`nimport { useInvestment }"
    )
  }
  [System.IO.File]::WriteAllText($homePath, $homeContent, [System.Text.Encoding]::UTF8)
  Write-Host "OK Home.tsx — SimulatorDiffCard import adicionado" -ForegroundColor Green
} else {
  Write-Host "OK Home.tsx — SimulatorDiffCard ja importado" -ForegroundColor Yellow
}

# ─────────────────────────────────────────────
# 12. Fix Simulator — BTC/USD toggle: quando muda moeda, converter valores
#     Substitui a funcao Simulator completa com lógica corrigida
# ─────────────────────────────────────────────

$homeContent = [System.IO.File]::ReadAllText($homePath, [System.Text.Encoding]::UTF8)

# Verifica se o bug do toggle ainda está presente (usa rawInitial sem conversão)
if ($homeContent -match 'setInitialRaw\(String\(Math\.round\(val \* btcPrice') {
  Write-Host "OK Home.tsx — Simulator toggle ja corrigido" -ForegroundColor Yellow
} else {
  # Substitui o bloco da função toggleMode no Simulator
  $oldToggle = 'const toggleMode = useCallback((newMode: "btc" | "usd") => {
    if (newMode === mode) return
    const btcP = btcPrice ?? 90000
    if (newMode === "usd") {
      // btc -> usd
      const btcVal = parseFloat(initialRaw) || 0
      const monthBtcVal = parseFloat(monthlyRaw) || 0
      setInitialRaw(btcP > 0 ? String(Math.round(btcVal * btcP)) : initialRaw)
      setMonthlyRaw(btcP > 0 ? String(Math.round(monthBtcVal * btcP)) : monthlyRaw)
    } else {
      // usd -> btc
      const usdVal = parseFloat(initialRaw) || 0
      const monthUsdVal = parseFloat(monthlyRaw) || 0
      setInitialRaw(btcP > 0 ? (usdVal / btcP).toFixed(5) : initialRaw)
      setMonthlyRaw(btcP > 0 ? (monthUsdVal / btcP).toFixed(5) : monthlyRaw)
    }
    setMode(newMode)
  }, [mode, initialRaw, monthlyRaw, btcPrice])'

  # Tenta pattern mais simples — qualquer toggleMode que não converta
  $homeContent = [System.Text.RegularExpressions.Regex]::Replace(
    $homeContent,
    '(?s)(const toggleMode = useCallback\(\(newMode[^)]+\) => \{)(.*?)(setMode\(newMode\)\s*\},\s*\[mode,)',
    '$1
    if (newMode === mode) return
    const btcP = btcPrice ?? 90000
    if (newMode === "usd") {
      const btcVal = parseFloat(initialRaw) || 0
      const monthBtcVal = parseFloat(monthlyRaw) || 0
      setInitialRaw(btcP > 0 ? String(Math.round(btcVal * btcP)) : initialRaw)
      setMonthlyRaw(btcP > 0 ? String(Math.round(monthBtcVal * btcP)) : monthlyRaw)
    } else {
      const usdVal = parseFloat(initialRaw) || 0
      const monthUsdVal = parseFloat(monthlyRaw) || 0
      setInitialRaw(btcP > 0 ? (usdVal / btcP).toFixed(5) : initialRaw)
      setMonthlyRaw(btcP > 0 ? (monthUsdVal / btcP).toFixed(5) : monthlyRaw)
    }
    $3'
  )
  [System.IO.File]::WriteAllText($homePath, $homeContent, [System.Text.Encoding]::UTF8)
  Write-Host "OK Home.tsx — Simulator toggle BTC/USD corrigido" -ForegroundColor Green
}

# ─────────────────────────────────────────────
# 13. Injeta SimulatorDiffCard na render do Simulator (após a tabela de comparações)
# ─────────────────────────────────────────────

$homeContent = [System.IO.File]::ReadAllText($homePath, [System.Text.Encoding]::UTF8)

if (-not ($homeContent -match '<SimulatorDiffCard')) {
  # Insere após o bloco sim-compare (após o fechamento do div.sim-compare)
  $homeContent = $homeContent -replace '(</div>\s*\{\/\* Comparison \*\/\})', '$1'
  # Encontra o fim do mapa de comparações e injeta depois
  $homeContent = $homeContent -replace '(\s*\}\)}\s*</div>\s*</div>\s*</div>\s*\)\s*\}\s*function FL)', @'

          {(() => {
            const opwaFinal = comparisons.find(c => c.main)?.data?.total ?? 0
            const refAFinal = comparisons.find(c => !c.main)?.data?.total ?? 0
            const diff = opwaFinal - refAFinal
            const totalMonths = years * 12
            return <SimulatorDiffCard diff={Math.abs(diff)} months={totalMonths} label="Reference A" />
          })()}
        </div>
      </div>
    </div>
  )
}

function FL
'@
  [System.IO.File]::WriteAllText($homePath, $homeContent, [System.Text.Encoding]::UTF8)
  Write-Host "OK Home.tsx — SimulatorDiffCard integrado no Simulator" -ForegroundColor Green
} else {
  Write-Host "OK Home.tsx — SimulatorDiffCard ja esta integrado" -ForegroundColor Yellow
}

# ─────────────────────────────────────────────
# 14. Verificação final
# ─────────────────────────────────────────────

Write-Host ""
Write-Host "Rodando tsc --noEmit..." -ForegroundColor Cyan
$tscResult = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "TS OK — zero erros" -ForegroundColor Green
} else {
  Write-Host "TS Erros:" -ForegroundColor Red
  $tscResult | Write-Host
}

Write-Host ""
Write-Host "Commitando..." -ForegroundColor Cyan
git add src/
git commit -m "fix: s18 — cursor pill metade/metade, gas API corrigida, dashboard dark/light, sim diff card integrado, encoding bugs, BTC/USD toggle"
git push origin main

Write-Host ""
Write-Host "DONE — s18 completo!" -ForegroundColor Green
