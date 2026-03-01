// fix_s15_nav_slider_currency.js
// Roda com: node fix_s15_nav_slider_currency.js
// Requer: estar em ~/Documents/OPWABTC

const fs = require('fs');
const path = require('path');

// ─── helpers ────────────────────────────────────────────────────────────────
function write(rel, content) {
  const abs = path.join(process.cwd(), rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, 'utf8');
  console.log('  wrote', rel);
}

function patch(rel, find, replace) {
  const abs = path.join(process.cwd(), rel);
  let src = fs.readFileSync(abs, 'utf8');
  if (!src.includes(find)) {
    console.warn('  WARN: pattern not found in', rel, '— skipping patch');
    return;
  }
  fs.writeFileSync(abs, src.replace(find, replace), 'utf8');
  console.log('  patched', rel);
}

// ════════════════════════════════════════════════════════════════════════════
// 1. Navigation.tsx — fix navbar layout (logo + links horizontais + right side)
// ════════════════════════════════════════════════════════════════════════════
console.log('\n[1] Writing Navigation.tsx...');
write('src/components/Navigation.tsx', `import { useState } from 'react'
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
                className={\`nav-link \${location.pathname === '/dashboard' ? 'active' : ''}\`}
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
              <span className="wallet-balance">\${balUsd.toFixed(2)}</span>
              <span className="wallet-addr">{shortAddr}</span>
              <span className="wallet-chevron">{dropdownOpen ? '▲' : '▼'}</span>
              {dropdownOpen && (
                <div className="wallet-dropdown" onClick={e => e.stopPropagation()}>
                  <Link to="/dashboard" className="wd-item" onClick={() => setDropdownOpen(false)}>
                    <GridIcon /> Dashboard
                  </Link>
                  <a
                    href={\`https://opscan.org/accounts/\${walletAddr}?network=op_testnet\`}
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
`);

// ════════════════════════════════════════════════════════════════════════════
// 2. Patch index.css — slider simétrico + pill diagonal + navbar fix
// ════════════════════════════════════════════════════════════════════════════
console.log('\n[2] Patching index.css...');

const cssAbs = path.join(process.cwd(), 'src/index.css');
let css = fs.readFileSync(cssAbs, 'utf8');

// ── 2a. Hero badge / pill diagonal ─────────────────────────────────────────
// Procura .hero-badge ou .badge-pill e adiciona rotate(-2deg)
// Se não existir, injeta antes do .hero-title ou no final do hero block
const PILL_FIND = '.hero-badge {';
const PILL_REPLACE = `.hero-badge {
  transform: rotate(-3deg);
  display: inline-flex;
`;

if (css.includes(PILL_FIND)) {
  css = css.replace(PILL_FIND, PILL_REPLACE);
  console.log('  patched .hero-badge rotate');
} else {
  // Inject fallback CSS at end
  css += `
/* s15 — pill diagonal */
.hero-badge, .badge-pill {
  transform: rotate(-3deg) !important;
}
`;
  console.log('  injected .hero-badge rotate (fallback)');
}

// ── 2b. Slider container — padding simétrico ────────────────────────────────
// Garante padding-inline no wrapper e labels bem posicionadas
if (!css.includes('/* s15-slider */')) {
  css += `
/* s15-slider — thumb symmetric + labels aligned */
.sim-slider-wrap {
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
}
.sim-slider-wrap input[type="range"] {
  width: 100%;
  margin: 0;
  display: block;
}
/* Hide native thumb, show custom dot via JS var --pct */
.sim-slider-wrap input[type="range"]::-webkit-slider-thumb {
  opacity: 0;
  width: 20px;
  height: 20px;
}
.sim-slider-wrap input[type="range"]::-moz-range-thumb {
  opacity: 0;
  width: 20px;
  height: 20px;
}
.sim-slider-dot {
  position: absolute;
  top: 50%;
  left: calc(var(--pct, 50%) * (100% - 20px) / 100% + 10px);
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent, #f97316);
  border: 3px solid #1a1a1a;
  box-shadow: 0 0 0 2px var(--accent, #f97316);
  pointer-events: none;
  transition: left 0.05s linear;
}
.sim-slider-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 6px;
}
.sim-slider-labels span:first-child { text-align: left; }
.sim-slider-labels span:nth-child(2) { text-align: center; }
.sim-slider-labels span:last-child  { text-align: right; }

/* s15 — navbar always horizontal */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 32px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-mark {
  width: 36px;
  height: 36px;
  background: var(--accent, #f97316);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 13px;
  color: #fff;
  letter-spacing: 0.5px;
}
.logo-text { display: flex; flex-direction: column; line-height: 1; }
.logo-name { font-weight: 800; font-size: 15px; color: #fff; }
.logo-tagline { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px; text-transform: uppercase; }

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color .2s, background .2s;
  white-space: nowrap;
}
.nav-link:hover, .nav-link.active {
  color: #fff;
  background: rgba(255,255,255,0.07);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.gas-ticker {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  white-space: nowrap;
}
.gas-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
}
.theme-toggle {
  background: none;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: color .2s, border-color .2s;
}
.theme-toggle:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

.btn-connect {
  padding: 8px 16px;
  background: var(--accent, #f97316);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity .2s, transform .1s;
  white-space: nowrap;
}
.btn-connect:hover { opacity: .88; }
.btn-connect:active { transform: scale(.97); }

.wallet-connected {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  user-select: none;
}
.wallet-dot { width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 6px #10b981; }
.wallet-balance { color: #fff; font-weight: 600; }
.wallet-addr { color: rgba(255,255,255,0.45); font-family: monospace; font-size: 12px; }
.wallet-chevron { color: rgba(255,255,255,0.3); font-size: 10px; }
.wallet-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: #1a1a1a;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 6px;
  z-index: 200;
  box-shadow: 0 12px 40px rgba(0,0,0,.5);
}
.wd-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background .15s, color .15s;
}
.wd-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
.wd-disconnect { color: #ef4444; }
.wd-disconnect:hover { background: rgba(239,68,68,.1); color: #ef4444; }

.btn-menu {
  display: none;
  background: none;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  width: 36px; height: 36px;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .btn-menu { display: flex; }
  .gas-ticker { display: none; }
}
.mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 12px 16px 16px;
  background: rgba(10,10,10,0.97);
  border-top: 1px solid rgba(255,255,255,0.06);
}
.mobile-nav-link {
  padding: 12px 8px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 15px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
  text-align: left;
}
.mobile-nav-link:last-child { border-bottom: none; }
`;
  console.log('  injected s15 slider + navbar CSS');
}

fs.writeFileSync(cssAbs, css, 'utf8');
console.log('  saved index.css');

// ════════════════════════════════════════════════════════════════════════════
// 3. Patch Home.tsx — slider dot sync + BTC↔USD conversion fix
// ════════════════════════════════════════════════════════════════════════════
console.log('\n[3] Patching Home.tsx for slider dot + currency conversion...');

const homeAbs = path.join(process.cwd(), 'src/pages/Home.tsx');
let home = fs.readFileSync(homeAbs, 'utf8');

// ── 3a. Slider: add --pct var update on input ───────────────────────────────
// Find the range input and ensure it updates a --pct CSS variable
// We'll look for the existing onChange on the duration slider
const SLIDER_OLD = `onChange={e => setDuration(Number(e.target.value))}`;
const SLIDER_NEW = `onChange={e => {
                const v = Number(e.target.value)
                setDuration(v)
                const min = 1, max = 10
                const pct = ((v - min) / (max - min)) * 100
                e.target.style.setProperty('--pct', pct.toFixed(1) + '%')
                const dot = e.target.parentElement?.querySelector('.sim-slider-dot') as HTMLElement | null
                if (dot) dot.style.left = 'calc(' + pct.toFixed(1) + '% * (100% - 20px) / 100% + 10px)'
              }}`;

if (home.includes(SLIDER_OLD)) {
  home = home.replace(SLIDER_OLD, SLIDER_NEW);
  console.log('  patched slider onChange');
} else {
  console.warn('  WARN: slider onChange not found — slider dot may not sync');
}

// ── 3b. Currency toggle fix — convert values when switching ─────────────────
// Find the currency toggle handler. Common patterns:
// setMode('btc') / setMode('usd')  or  setCurrency(...)
// We need to wrap the mode change with value conversion

// Pattern 1: simple setMode toggle button
const TOGGLE_OLD_1 = `onClick={() => setMode('btc')}`;
const TOGGLE_NEW_1 = `onClick={() => {
                  if (mode !== 'btc' && btcPrice) {
                    // USD → BTC
                    setInitial(prev => (parseFloat(prev) / btcPrice).toFixed(6))
                    setMonthly(prev => (parseFloat(prev) / btcPrice).toFixed(6))
                  }
                  setMode('btc')
                }}`;

const TOGGLE_OLD_2 = `onClick={() => setMode('usd')}`;
const TOGGLE_NEW_2 = `onClick={() => {
                  if (mode !== 'usd' && btcPrice) {
                    // BTC → USD
                    setInitial(prev => (parseFloat(prev) * btcPrice).toFixed(2))
                    setMonthly(prev => (parseFloat(prev) * btcPrice).toFixed(2))
                  }
                  setMode('usd')
                }}`;

let togglePatched = false;
if (home.includes(TOGGLE_OLD_1)) {
  home = home.replace(TOGGLE_OLD_1, TOGGLE_NEW_1);
  console.log('  patched BTC toggle button');
  togglePatched = true;
}
if (home.includes(TOGGLE_OLD_2)) {
  home = home.replace(TOGGLE_OLD_2, TOGGLE_NEW_2);
  console.log('  patched USD toggle button');
  togglePatched = true;
}

// Pattern 2: single toggle function setCurrency / toggleCurrency
if (!togglePatched) {
  // Try to find setMode with variable
  const TOGGLE_OLD_3 = `setMode(mode === 'btc' ? 'usd' : 'btc')`;
  const TOGGLE_NEW_3 = `(() => {
                  const next = mode === 'btc' ? 'usd' : 'btc'
                  if (btcPrice) {
                    if (next === 'usd') {
                      setInitial(prev => (parseFloat(prev) * btcPrice).toFixed(2))
                      setMonthly(prev => (parseFloat(prev) * btcPrice).toFixed(2))
                    } else {
                      setInitial(prev => (parseFloat(prev) / btcPrice).toFixed(6))
                      setMonthly(prev => (parseFloat(prev) / btcPrice).toFixed(6))
                    }
                  }
                  setMode(next)
                })()`;
  if (home.includes(TOGGLE_OLD_3)) {
    home = home.replace(TOGGLE_OLD_3, TOGGLE_NEW_3);
    console.log('  patched toggle shorthand');
    togglePatched = true;
  }
}

if (!togglePatched) {
  console.warn('  WARN: currency toggle pattern not found — manual fix needed');
  console.warn('  Look for the BTC/USD toggle button onClick and wrap setMode() with conversion logic');
}

// ── 3c. Ensure slider dot element exists in JSX ─────────────────────────────
// Find the range input for duration and wrap it if not already wrapped
if (!home.includes('sim-slider-dot')) {
  // Pattern: input type range for duration
  const RANGE_OLD = `<input type="range"`;
  const RANGE_CHECK = home.indexOf(RANGE_OLD);
  if (RANGE_CHECK !== -1) {
    // Find the closing > of this input
    const after = home.slice(RANGE_CHECK);
    const closeIdx = after.indexOf('/>');
    if (closeIdx !== -1) {
      const inputFull = after.slice(0, closeIdx + 2);
      const inputWrapped = `<div className="sim-slider-wrap">
              ${inputFull}
              <div className="sim-slider-dot" style={{left: 'calc(44.4% * (100% - 20px) / 100% + 10px)'}} />
            </div>`;
      home = home.slice(0, RANGE_CHECK) + inputWrapped + home.slice(RANGE_CHECK + closeIdx + 2);
      console.log('  wrapped range input with sim-slider-wrap + dot');
    }
  }
} else {
  console.log('  sim-slider-dot already exists');
}

fs.writeFileSync(homeAbs, home, 'utf8');
console.log('  saved Home.tsx');

// ════════════════════════════════════════════════════════════════════════════
// 4. Done
// ════════════════════════════════════════════════════════════════════════════
console.log(`
╔══════════════════════════════════════════════════════╗
║  fix_s15 DONE — run now:                            ║
║                                                      ║
║  npx tsc --noEmit 2>&1 | head -30                   ║
║  git add src/components/Navigation.tsx \\            ║
║          src/pages/Home.tsx \\                       ║
║          src/index.css                              ║
║  git commit -m "fix: navbar layout, slider dot,    ║
║    pill diagonal, BTC/USD conversion (s15)"         ║
║  git push origin main                               ║
╚══════════════════════════════════════════════════════╝
`);
