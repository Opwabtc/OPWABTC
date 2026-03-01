#!/bin/bash
# OPWA s14 — usa node para escrever arquivos (funciona no Git Bash Windows)
# Execute: bash opwa_s14_node_writer.sh

set -e
echo "=== OPWA s14 — Node File Writer ==="

# ── Navigation.tsx ────────────────────────────────────────────────────────
node -e "
const fs = require('fs');
const content = \`import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useWallet } from '../hooks/useWallet';
import { useLivePrices } from '../hooks/useLivePrices';

export function Navigation() {
  const { connected, walletAddr, walletSats, theme, setTheme } = useAppStore();
  const { connect, disconnect } = useWallet();
  const { btcPrice, gasPrice } = useLivePrices();
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const short = walletAddr ? walletAddr.slice(0, 6) + '...' + walletAddr.slice(-4) : '';
  const balBtc = walletSats != null ? (walletSats / 1e8).toFixed(6) : null;
  const balUsd = btcPrice && walletSats != null ? ((walletSats / 1e8) * btcPrice).toFixed(2) : null;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Assets', href: '/#assets' },
    { label: 'Simulator', href: '/#simulator' },
    { label: 'How It Works', href: '/#how-it-works' },
  ];

  const wallets = [
    { id: 'opwallet', name: 'OP_Wallet', desc: 'Official OP_NET wallet · Chrome Extension', badge: 'Recommended', color: '#f97316' },
    { id: 'unisat',   name: 'Unisat',   desc: 'Bitcoin native · OP_NET compatible', badge: null, color: '#f59e0b' },
    { id: 'xverse',   name: 'Xverse',   desc: 'Bitcoin · Ordinals · OP_NET', badge: null, color: '#8b5cf6' },
    { id: 'okx',      name: 'OKX Wallet', desc: 'Multi-chain · Web3', badge: null, color: '#64748b' },
  ];

  return (
    <>
      <nav className=\"nav-bar\" role=\"navigation\">
        <div className=\"nav-inner\">
          <Link to=\"/\" className=\"nav-logo\">
            <span className=\"nav-logo-op\">OP</span>
            <span className=\"nav-logo-opwa\">OPWA</span>
            <span className=\"nav-logo-platform\">Platform</span>
          </Link>

          <div className=\"nav-links-desktop\">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className=\"nav-link\">{l.label}</a>
            ))}
            {connected && (
              <Link
                to=\"/dashboard\"
                className={'nav-link nav-link-dashboard' + (location.pathname === '/dashboard' ? ' active' : '')}
              >
                <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2.5\">
                  <rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/>
                  <rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/>
                  <rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/>
                  <rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/>
                </svg>
                Dashboard
              </Link>
            )}
          </div>

          <div className=\"nav-gas\">
            <span className=\"nav-gas-dot\" />
            <span className=\"nav-gas-label\">Gas</span>
            <span className=\"nav-gas-value\">{gasPrice != null ? gasPrice + ' sat/vB' : '—'}</span>
            {btcPrice && <span className=\"nav-gas-btc\">\${btcPrice.toLocaleString()}</span>}
          </div>

          <button className=\"nav-theme-btn\" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label=\"Toggle theme\">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {!connected ? (
            <button className=\"nav-connect-btn\" onClick={() => setWalletModal(true)}>Connect Wallet</button>
          ) : (
            <div className=\"nav-wallet-wrap\">
              <button className=\"nav-wallet-btn\" onClick={() => setDropdownOpen(o => !o)}>
                <span className=\"nav-wallet-dot\" />
                <span>{short}</span>
                {balBtc && <span className=\"nav-wallet-bal\">₿ {balBtc}</span>}
                <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M6 9l6 6 6-6\"/></svg>
              </button>
              {dropdownOpen && (
                <div className=\"nav-dropdown\">
                  <div className=\"nav-dropdown-addr\">{walletAddr}</div>
                  {balUsd && <div className=\"nav-dropdown-bal\">≈ \${balUsd} USD · ₿ {balBtc}</div>}
                  <hr className=\"nav-dropdown-sep\"/>
                  <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target=\"_blank\" rel=\"noreferrer\" className=\"nav-dropdown-link\">View on OPScan ↗</a>
                  <button className=\"nav-dropdown-disc\" onClick={() => { disconnect(); setDropdownOpen(false); }}>Disconnect</button>
                </div>
              )}
            </div>
          )}

          <button className=\"nav-hamburger\" onClick={() => setMenuOpen(o => !o)} aria-label=\"Menu\">
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className=\"nav-mobile-menu\">
            {navLinks.map(l => <a key={l.href} href={l.href} className=\"nav-mobile-link\" onClick={() => setMenuOpen(false)}>{l.label}</a>)}
            {connected && <Link to=\"/dashboard\" className=\"nav-mobile-link\" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
            {!connected
              ? <button className=\"nav-connect-btn\" style={{margin:'12px 16px'}} onClick={() => { setWalletModal(true); setMenuOpen(false); }}>Connect Wallet</button>
              : <button className=\"nav-dropdown-disc\" style={{margin:'12px 16px'}} onClick={() => { disconnect(); setMenuOpen(false); }}>Disconnect</button>
            }
          </div>
        )}
      </nav>

      {walletModal && (
        <div className=\"modal-overlay\" onClick={() => setWalletModal(false)}>
          <div className=\"wallet-modal\" onClick={e => e.stopPropagation()}>
            <div className=\"wallet-modal-header\">
              <h2>Connect Wallet</h2>
              <button className=\"wallet-modal-close\" onClick={() => setWalletModal(false)}>✕</button>
            </div>
            <p className=\"wallet-modal-sub\">Choose your Bitcoin wallet to connect to the OP_NET platform.</p>
            {wallets.map(w => (
              <button key={w.id} className=\"wallet-option\" onClick={() => { connect(w.id); setWalletModal(false); }}>
                <span className=\"wallet-option-icon\" style={{background: w.color + '22', border: '1.5px solid ' + w.color + '55'}}>
                  <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill={w.color}><circle cx=\"12\" cy=\"12\" r=\"9\"/></svg>
                </span>
                <span className=\"wallet-option-info\">
                  <span className=\"wallet-option-name\">{w.name}</span>
                  <span className=\"wallet-option-desc\">{w.desc}</span>
                </span>
                {w.badge && <span className=\"wallet-option-badge\">{w.badge}</span>}
              </button>
            ))}
            <a href=\"https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb\" target=\"_blank\" rel=\"noreferrer\" className=\"wallet-get-banner\">
              Don't have OP_Wallet? Install from Chrome Web Store ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
\`;
fs.writeFileSync('src/components/Navigation.tsx', content, 'utf8');
console.log('✓ Navigation.tsx');
"

# ── Dashboard.tsx ─────────────────────────────────────────────────────────
node -e "
const fs = require('fs');
const content = \`import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useLivePrices } from '../hooks/useLivePrices';

const OPWAP_ADDR = (import.meta as any).env?.VITE_OPWAP_TOKEN_ADDRESS || 'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp';

export default function Dashboard() {
  const { connected, walletAddr, walletSats } = useAppStore();
  const { btcPrice } = useLivePrices();
  const [opwapBal, setOpwapBal] = useState<number | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const btcVal = walletSats != null ? walletSats / 1e8 : 0;
  const usdVal = btcPrice ? btcVal * btcPrice : 0;

  useEffect(() => {
    if (!connected || !walletAddr) { setLoading(false); return; }
    let cancelled = false;
    async function load() {
      try {
        const mod = await import('@btc-vision/transaction');
        const { JSONRpcProvider, getContract, networks } = mod;
        const NET = networks.opnetTestnet;
        const provider = new JSONRpcProvider({ url: 'https://testnet.opnet.org', network: NET });
        const ABI: any[] = [
          { name: 'balanceOf', type: 'function', inputs: [{ name: 'address', type: 'address' }], outputs: [{ name: 'balance', type: 'uint256' }] },
          { name: 'totalSupply', type: 'function', inputs: [], outputs: [{ name: 'supply', type: 'uint256' }] },
        ];
        const c = getContract<any>(OPWAP_ADDR, ABI, provider, NET);
        const [b, s] = await Promise.allSettled([c.balanceOf(walletAddr), c.totalSupply()]);
        if (cancelled) return;
        if (b.status === 'fulfilled') {
          const raw = b.value?.properties?.balance ?? b.value?.result?.balance ?? b.value?.balance;
          if (raw != null) setOpwapBal(Number(raw));
        }
        if (s.status === 'fulfilled') {
          const raw = s.value?.properties?.supply ?? s.value?.result?.supply ?? s.value?.supply;
          if (raw != null) setTotalSupply(Number(raw));
        }
      } catch(e) { console.warn('[Dashboard]', e); }
      finally { if (!cancelled) setLoading(false); }
    }
    load();
    const iv = setInterval(load, 30000);
    return () => { cancelled = true; clearInterval(iv); };
  }, [connected, walletAddr]);

  if (!connected) return (
    <div className=\"dashboard-gate\">
      <div className=\"dashboard-gate-card\">
        <div style={{fontSize:'3rem',marginBottom:'16px'}}>🔒</div>
        <h2 style={{marginBottom:'8px'}}>Connect Your Wallet</h2>
        <p style={{color:'rgba(255,255,255,.45)',marginBottom:'24px'}}>Connect to view your portfolio dashboard.</p>
        <Link to=\"/\" className=\"btn-primary\" style={{display:'inline-block',textDecoration:'none'}}>Go to Home</Link>
      </div>
    </div>
  );

  const short = walletAddr ? walletAddr.slice(0,8) + '…' + walletAddr.slice(-6) : '';
  const supplyPct = totalSupply != null ? Math.min((totalSupply / 1e8 / 1e9) * 100, 100) : 0;
  const opwapDisplay = opwapBal != null ? (opwapBal / 1e8).toFixed(4) : '—';

  const stats = [
    { label: 'BTC Balance', value: btcVal.toFixed(6), unit: '₿', color: '#f97316', sub: '≈ \$' + usdVal.toFixed(2) + ' USD' },
    { label: 'OPWAP Tokens', value: loading ? '…' : opwapDisplay, unit: 'OPWAP', color: '#fbbf24', sub: 'Asset Alpha · 15% APY' },
    { label: 'Est. Annual Yield', value: '15%', unit: 'APY', color: '#22c55e', sub: 'Platform target' },
    { label: 'Network', value: 'Testnet4', unit: '', color: '#60a5fa', sub: 'OP_NET Signet' },
  ];

  return (
    <div className=\"dashboard-page\">
      <div className=\"dashboard-container\">
        <div className=\"dashboard-header\">
          <div>
            <h1 className=\"dashboard-title\">Portfolio Dashboard</h1>
            <p className=\"dashboard-addr\">{short}</p>
          </div>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target=\"_blank\" rel=\"noreferrer\" className=\"btn-outline-sm\">
            View on OPScan ↗
          </a>
        </div>

        <div className=\"dashboard-stats\">
          {stats.map(s => (
            <div key={s.label} className=\"dashboard-stat-card\">
              <div className=\"dashboard-stat-label\">{s.label}</div>
              <div className=\"dashboard-stat-value\" style={{color: s.color}}>
                {s.value}{s.unit && <span className=\"dashboard-stat-unit\"> {s.unit}</span>}
              </div>
              <div className=\"dashboard-stat-sub\">{s.sub}</div>
            </div>
          ))}
        </div>

        {totalSupply != null && (
          <div className=\"dashboard-supply\">
            <div className=\"dashboard-supply-header\">
              <span>OPWAP Supply Minted</span>
              <span className=\"dashboard-supply-pct\">{supplyPct.toFixed(4)}%</span>
            </div>
            <div className=\"dashboard-supply-bar\">
              <div className=\"dashboard-supply-fill\" style={{width: supplyPct + '%'}} />
            </div>
            <div className=\"dashboard-supply-numbers\">
              <span>{(totalSupply / 1e8).toLocaleString()} OPWAP</span>
              <span>1,000,000,000 max</span>
            </div>
          </div>
        )}

        <div className=\"dashboard-section\">
          <h2 className=\"dashboard-section-title\">Your Holdings</h2>
          {opwapBal != null && opwapBal > 0 ? (
            <div className=\"dashboard-holdings\">
              <div className=\"dashboard-holding-card\">
                <div className=\"dashboard-holding-header\">
                  <span className=\"dashboard-holding-symbol\">OPWAP</span>
                  <span className=\"dashboard-holding-badge\">Active</span>
                </div>
                <div className=\"dashboard-holding-val\">{(opwapBal / 1e8).toFixed(4)}</div>
                <div className=\"dashboard-holding-sub\">OPWAProperty · Asset Alpha</div>
                <div className=\"dashboard-holding-apy\">↑ 15% APY</div>
              </div>
            </div>
          ) : (
            <div className=\"dashboard-empty\">
              <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>📦</div>
              <p style={{color:'rgba(255,255,255,.35)'}}>No holdings yet. <Link to=\"/#assets\" style={{color:'var(--accent)'}}>Invest in an asset</Link> to start.</p>
            </div>
          )}
        </div>

        <div className=\"dashboard-section\">
          <h2 className=\"dashboard-section-title\">Transaction History</h2>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target=\"_blank\" rel=\"noreferrer\" className=\"dashboard-tx-link\">
            <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\"><path d=\"M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3\"/></svg>
            View all transactions on OPScan Explorer ↗
          </a>
        </div>
      </div>
    </div>
  );
}
\`;
fs.writeFileSync('src/pages/Dashboard.tsx', content, 'utf8');
console.log('✓ Dashboard.tsx');
"

# ── App.tsx ────────────────────────────────────────────────────────────────
node -e "
const fs = require('fs');
const content = \`import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

const Dashboard = lazy(() => import('./pages/Dashboard'));

const Spinner = () => (
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'60vh',color:'rgba(255,255,255,.3)',fontSize:'0.9rem',letterSpacing:'0.1em'}}>
    LOADING…
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path=\"/\" element={<Home />} />
            <Route path=\"/dashboard\" element={<Dashboard />} />
            <Route path=\"/terms\" element={<Terms />} />
            <Route path=\"/privacy\" element={<Privacy />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
\`;
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('✓ App.tsx');
"

# ── CSS PATCH — append to src/index.css ───────────────────────────────────
node -e "
const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Remove any previous s14 block to avoid duplicates
css = css.replace(/\/\* s14-patch-start \*\/[\s\S]*?\/\* s14-patch-end \*\//g, '');

const patch = \`
/* s14-patch-start */

/* SLIDER — dot posicionado via JS style.left */
.sim-slider-wrap { position: relative; width: 100%; height: 36px; display: flex; align-items: center; }
.sim-slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px;
  background: rgba(255,255,255,.1); border-radius: 2px;
  outline: none; cursor: pointer; z-index: 1; position: relative;
}
.sim-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 0; height: 0; opacity: 0; }
.sim-slider::-moz-range-thumb { width: 0; height: 0; border: none; background: transparent; opacity: 0; }
.sim-slider-track {
  position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  height: 4px; background: var(--accent); border-radius: 2px; pointer-events: none; z-index: 0;
}
.sim-slider-dot {
  position: absolute; top: 50%; transform: translate(-50%, -50%);
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--accent); border: 3px solid #fff;
  box-shadow: 0 0 0 4px rgba(249,115,22,.3), 0 2px 10px rgba(0,0,0,.5);
  pointer-events: none; z-index: 3; transition: box-shadow .15s;
}

/* HOW IT WORKS — hover: numero branco sem sombra */
.step { transition: transform .22s cubic-bezier(.4,0,.2,1), box-shadow .22s; cursor: default; }
.step:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(249,115,22,.14); }
.step-number {
  font-size: 3.5rem; font-weight: 900;
  color: rgba(255,255,255,.07); line-height: 1;
  text-shadow: none !important; transition: color .2s;
}
.step:hover .step-number { color: #ffffff !important; text-shadow: none !important; }

/* NAV DASHBOARD TAB */
.nav-link-dashboard {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(249,115,22,.1); border: 1px solid rgba(249,115,22,.28);
  border-radius: 6px; padding: 4px 10px;
  color: var(--accent) !important; font-size: .78rem; font-weight: 600; letter-spacing: .04em;
  transition: background .18s, border-color .18s;
}
.nav-link-dashboard:hover, .nav-link-dashboard.active {
  background: rgba(249,115,22,.22); border-color: var(--accent);
}

/* CARDS — depth e hover 3D */
.ativo-card, .asset-card {
  background: linear-gradient(145deg, rgba(255,255,255,.045) 0%, rgba(255,255,255,.01) 100%);
  border: 1px solid rgba(255,255,255,.08); border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.06);
  backdrop-filter: blur(8px); transition: transform .25s, box-shadow .25s, border-color .25s;
}
.ativo-card:hover, .asset-card:hover {
  transform: translateY(-6px) scale(1.012);
  box-shadow: 0 20px 50px rgba(0,0,0,.42), 0 0 0 1px rgba(249,115,22,.18), inset 0 1px 0 rgba(255,255,255,.1);
  border-color: rgba(249,115,22,.22);
}

/* BUTTONS — glass highlight */
.btn-primary, .nav-connect-btn {
  position: relative; overflow: hidden;
  box-shadow: 0 4px 18px rgba(249,115,22,.38), inset 0 1px 0 rgba(255,255,255,.22);
}
.btn-primary::before, .nav-connect-btn::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.16) 0%, transparent 55%);
  border-radius: inherit; pointer-events: none;
}
.btn-primary:hover, .nav-connect-btn:hover {
  box-shadow: 0 6px 26px rgba(249,115,22,.52), inset 0 1px 0 rgba(255,255,255,.22);
  transform: translateY(-1px);
}
.btn-primary:active, .nav-connect-btn:active { transform: translateY(1px); }

/* STAT cards hero */
.stat-card, .hero-stat {
  background: linear-gradient(135deg, rgba(255,255,255,.048) 0%, rgba(255,255,255,.018) 100%);
  border: 1px solid rgba(255,255,255,.09); border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.06);
  transition: border-color .2s, box-shadow .2s;
}
.stat-card:hover, .hero-stat:hover { border-color: rgba(249,115,22,.2); }

/* DASHBOARD PAGE */
.dashboard-page { min-height: 100vh; padding: 104px 0 64px; }
.dashboard-container { max-width: 920px; margin: 0 auto; padding: 0 24px; }
.dashboard-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 36px; gap: 16px; flex-wrap: wrap; }
.dashboard-title { font-size: 2rem; font-weight: 800; color: #fff; margin: 0 0 4px; }
.dashboard-addr { font-size: .78rem; color: rgba(255,255,255,.38); font-family: monospace; }

.dashboard-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; margin-bottom: 28px; }
.dashboard-stat-card {
  background: linear-gradient(145deg, rgba(255,255,255,.05) 0%, rgba(255,255,255,.018) 100%);
  border: 1px solid rgba(255,255,255,.09); border-radius: 14px; padding: 22px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.05);
}
.dashboard-stat-label { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.38); margin-bottom: 10px; }
.dashboard-stat-value { font-size: 1.55rem; font-weight: 800; line-height: 1.1; margin-bottom: 5px; }
.dashboard-stat-unit { font-size: .8rem; font-weight: 400; opacity: .65; }
.dashboard-stat-sub { font-size: .72rem; color: rgba(255,255,255,.32); }

.dashboard-supply { background: rgba(255,255,255,.038); border: 1px solid rgba(255,255,255,.08); border-radius: 14px; padding: 20px; margin-bottom: 28px; }
.dashboard-supply-header { display: flex; justify-content: space-between; font-size: .82rem; color: rgba(255,255,255,.5); margin-bottom: 10px; }
.dashboard-supply-pct { color: var(--accent); font-weight: 700; }
.dashboard-supply-bar { height: 7px; background: rgba(255,255,255,.08); border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
.dashboard-supply-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--gold)); border-radius: 4px; transition: width .6s ease; min-width: 2px; }
.dashboard-supply-numbers { display: flex; justify-content: space-between; font-size: .7rem; color: rgba(255,255,255,.28); }

.dashboard-section { margin-bottom: 32px; }
.dashboard-section-title { font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.38); margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,.06); padding-bottom: 8px; }

.dashboard-holdings { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }
.dashboard-holding-card {
  background: linear-gradient(135deg, rgba(249,115,22,.09) 0%, rgba(251,191,36,.04) 100%);
  border: 1px solid rgba(249,115,22,.22); border-radius: 14px; padding: 22px;
  transition: border-color .2s, box-shadow .2s;
}
.dashboard-holding-card:hover { border-color: rgba(249,115,22,.4); box-shadow: 0 8px 28px rgba(249,115,22,.12); }
.dashboard-holding-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.dashboard-holding-symbol { font-weight: 800; font-size: 1rem; color: var(--accent); }
.dashboard-holding-badge { font-size: .68rem; background: rgba(34,197,94,.18); color: #4ade80; border-radius: 20px; padding: 3px 9px; font-weight: 700; }
.dashboard-holding-val { font-size: 1.65rem; font-weight: 900; color: #fff; margin-bottom: 4px; }
.dashboard-holding-sub { font-size: .72rem; color: rgba(255,255,255,.38); margin-bottom: 10px; }
.dashboard-holding-apy { font-size: .8rem; color: #4ade80; font-weight: 700; }

.dashboard-empty { text-align: center; padding: 48px 24px; }
.dashboard-tx-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--accent); font-size: .88rem; font-weight: 600; text-decoration: none;
  border: 1px solid rgba(249,115,22,.28); border-radius: 9px; padding: 11px 18px;
  background: rgba(249,115,22,.07); transition: background .2s, border-color .2s;
}
.dashboard-tx-link:hover { background: rgba(249,115,22,.16); border-color: var(--accent); }

.dashboard-gate { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.dashboard-gate-card {
  text-align: center; max-width: 380px; padding: 52px 36px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09);
  border-radius: 20px; box-shadow: 0 8px 40px rgba(0,0,0,.3);
}
.btn-outline-sm {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent; border: 1px solid rgba(255,255,255,.2);
  color: rgba(255,255,255,.65); border-radius: 8px; padding: 8px 16px;
  font-size: .8rem; font-weight: 600; cursor: pointer; text-decoration: none;
  transition: border-color .18s, color .18s; white-space: nowrap;
}
.btn-outline-sm:hover { border-color: rgba(255,255,255,.5); color: #fff; }

/* s14-patch-end */
\`;

fs.writeFileSync('src/index.css', css + patch, 'utf8');
console.log('✓ index.css patched');
"

echo ""
echo "=== All files written! Running tsc check... ==="
npx tsc --noEmit 2>&1 | head -30

echo ""
echo "=== Committing... ==="
git add src/components/Navigation.tsx src/pages/Dashboard.tsx src/App.tsx src/index.css
git commit -m "feat: dashboard + nav tab + slider dot fix + step hover white + card 3D polish (s14)"
git push origin main

echo ""
echo "=== DONE — Vercel deploying in ~60s ==="
