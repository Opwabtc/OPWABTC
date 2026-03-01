const fs = require('fs');

// ── Navigation.tsx fix ────────────────────────────────────────────────────
// Problema: useLivePrices() retorna void (popula store internamente)
// Solução: ler do store com any cast, sem importar o hook
const nav = `import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useWallet } from '../hooks/useWallet';

export function Navigation() {
  const { connected, walletAddr, walletSats, theme, setTheme } = useAppStore();
  const { connect, disconnect } = useWallet();
  // useLivePrices stores values in zustand — read with any cast
  const st = useAppStore() as any;
  const btcPrice: number | null = st.btcPrice ?? null;
  const gasPrice: number | null = st.gasPrice ?? null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const short = walletAddr ? walletAddr.slice(0, 6) + '...' + walletAddr.slice(-4) : '';
  const balBtc = walletSats != null ? (walletSats / 1e8).toFixed(6) : null;
  const btcPriceStr = btcPrice ? '$' + btcPrice.toLocaleString() : null;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Assets', href: '/#assets' },
    { label: 'Simulator', href: '/#simulator' },
    { label: 'How It Works', href: '/#how-it-works' },
  ];

  const wallets = [
    { id: 'opwallet', name: 'OP_Wallet', desc: 'Official OP_NET wallet', badge: 'Recommended', color: '#f97316' },
    { id: 'unisat',   name: 'Unisat',    desc: 'Bitcoin native · OP_NET compatible', badge: null, color: '#f59e0b' },
    { id: 'xverse',   name: 'Xverse',    desc: 'Bitcoin · Ordinals · OP_NET', badge: null, color: '#8b5cf6' },
    { id: 'okx',      name: 'OKX Wallet', desc: 'Multi-chain · Web3', badge: null, color: '#64748b' },
  ];

  return (
    <>
      <nav className="nav-bar" role="navigation">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-op">OP</span>
            <span className="nav-logo-opwa">OPWA</span>
            <span className="nav-logo-platform">Platform</span>
          </Link>

          <div className="nav-links-desktop">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            {connected && (
              <Link
                to="/dashboard"
                className={'nav-link nav-link-dashboard' + (location.pathname === '/dashboard' ? ' active' : '')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                </svg>
                Dashboard
              </Link>
            )}
          </div>

          <div className="nav-gas">
            <span className="nav-gas-dot" />
            <span className="nav-gas-label">Gas</span>
            <span className="nav-gas-value">{gasPrice != null ? gasPrice + ' sat/vB' : '—'}</span>
            {btcPriceStr && <span className="nav-gas-btc">{btcPriceStr}</span>}
          </div>

          <button className="nav-theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {!connected ? (
            <button className="nav-connect-btn" onClick={() => setWalletModal(true)}>Connect Wallet</button>
          ) : (
            <div className="nav-wallet-wrap">
              <button className="nav-wallet-btn" onClick={() => setDropdownOpen(o => !o)}>
                <span className="nav-wallet-dot" />
                <span>{short}</span>
                {balBtc && <span className="nav-wallet-bal">&#x20BF; {balBtc}</span>}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-addr">{walletAddr}</div>
                  <hr className="nav-dropdown-sep"/>
                  <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="nav-dropdown-link">View on OPScan</a>
                  <button className="nav-dropdown-disc" onClick={() => { disconnect(); setDropdownOpen(false); }}>Disconnect</button>
                </div>
              )}
            </div>
          )}

          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="nav-mobile-menu">
            {navLinks.map(l => <a key={l.href} href={l.href} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>{l.label}</a>)}
            {connected && <Link to="/dashboard" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
            {!connected
              ? <button className="nav-connect-btn" style={{margin:'12px 16px'}} onClick={() => { setWalletModal(true); setMenuOpen(false); }}>Connect Wallet</button>
              : <button className="nav-dropdown-disc" style={{margin:'12px 16px'}} onClick={() => { disconnect(); setMenuOpen(false); }}>Disconnect</button>
            }
          </div>
        )}
      </nav>

      {walletModal && (
        <div className="modal-overlay" onClick={() => setWalletModal(false)}>
          <div className="wallet-modal" onClick={e => e.stopPropagation()}>
            <div className="wallet-modal-header">
              <h2>Connect Wallet</h2>
              <button className="wallet-modal-close" onClick={() => setWalletModal(false)}>x</button>
            </div>
            <p className="wallet-modal-sub">Choose your Bitcoin wallet to connect to the OP_NET platform.</p>
            {wallets.map(w => (
              <button key={w.id} className="wallet-option" onClick={() => { connect(w.id); setWalletModal(false); }}>
                <span className="wallet-option-icon" style={{background: w.color + '22', border: '1.5px solid ' + w.color + '55'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={w.color}><circle cx="12" cy="12" r="9"/></svg>
                </span>
                <span className="wallet-option-info">
                  <span className="wallet-option-name">{w.name}</span>
                  <span className="wallet-option-desc">{w.desc}</span>
                </span>
                {w.badge && <span className="wallet-option-badge">{w.badge}</span>}
              </button>
            ))}
            <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noreferrer" className="wallet-get-banner">
              No OP_Wallet? Install from Chrome Web Store
            </a>
          </div>
        </div>
      )}
    </>
  );
}
`;
fs.writeFileSync('src/components/Navigation.tsx', nav, 'utf8');
console.log('OK Navigation.tsx');

// ── Dashboard.tsx fix ─────────────────────────────────────────────────────
// Problema: @btc-vision/transaction nao exporta JSONRpcProvider/getContract/networks
// Solução: usar 'opnet' (como o Bob usa) + any cast no store
const dash = `import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const OPWAP_ADDR = (import.meta as any).env?.VITE_OPWAP_TOKEN_ADDRESS || 'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp';

export default function Dashboard() {
  const { connected, walletAddr, walletSats } = useAppStore();
  const st = useAppStore() as any;
  const btcPrice: number | null = st.btcPrice ?? null;
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
        const opnet = await import('opnet');
        const { JSONRpcProvider, getContract, OP_20_ABI } = opnet as any;
        const provider = new JSONRpcProvider({ url: 'https://testnet.opnet.org' });
        const c = getContract(OPWAP_ADDR, OP_20_ABI, provider);
        const [b, s] = await Promise.allSettled([
          c.balanceOf(walletAddr),
          c.totalSupply(),
        ]);
        if (cancelled) return;
        if (b.status === 'fulfilled') {
          const raw = (b.value as any)?.balance ?? (b.value as any)?.result?.balance;
          if (raw != null) setOpwapBal(Number(raw));
        }
        if (s.status === 'fulfilled') {
          const raw = (s.value as any)?.totalSupply ?? (s.value as any)?.result?.totalSupply;
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
    <div className="dashboard-gate">
      <div className="dashboard-gate-card">
        <div style={{fontSize:'3rem',marginBottom:'16px'}}>🔒</div>
        <h2 style={{marginBottom:'8px'}}>Connect Your Wallet</h2>
        <p style={{color:'rgba(255,255,255,.45)',marginBottom:'24px'}}>Connect to view your portfolio.</p>
        <Link to="/" className="btn-primary" style={{display:'inline-block',textDecoration:'none',padding:'12px 28px'}}>Go to Home</Link>
      </div>
    </div>
  );

  const short = walletAddr ? walletAddr.slice(0,8) + '...' + walletAddr.slice(-6) : '';
  const supplyPct = totalSupply != null ? Math.min((totalSupply / 1e9) * 100, 100) : 0;
  const opwapDisplay = loading ? '...' : (opwapBal != null ? (opwapBal / 1e8).toFixed(4) : '0.0000');

  const stats = [
    { label: 'BTC Balance', value: btcVal.toFixed(6), unit: 'BTC', color: '#f97316', sub: 'approx $' + usdVal.toFixed(2) + ' USD' },
    { label: 'OPWAP Tokens', value: opwapDisplay, unit: 'OPWAP', color: '#fbbf24', sub: 'Asset Alpha · 15% APY' },
    { label: 'Est. Annual Yield', value: '15%', unit: 'APY', color: '#22c55e', sub: 'Platform target rate' },
    { label: 'Network', value: 'Testnet4', unit: '', color: '#60a5fa', sub: 'OP_NET Signet fork' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Portfolio Dashboard</h1>
            <p className="dashboard-addr">{short}</p>
          </div>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="btn-outline-sm">
            View on OPScan
          </a>
        </div>

        <div className="dashboard-stats">
          {stats.map(s => (
            <div key={s.label} className="dashboard-stat-card">
              <div className="dashboard-stat-label">{s.label}</div>
              <div className="dashboard-stat-value" style={{color: s.color}}>
                {s.value}{s.unit && <span className="dashboard-stat-unit"> {s.unit}</span>}
              </div>
              <div className="dashboard-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {totalSupply != null && (
          <div className="dashboard-supply">
            <div className="dashboard-supply-header">
              <span>OPWAP Supply Minted</span>
              <span className="dashboard-supply-pct">{supplyPct.toFixed(4)}%</span>
            </div>
            <div className="dashboard-supply-bar">
              <div className="dashboard-supply-fill" style={{width: Math.max(supplyPct, 0.1) + '%'}} />
            </div>
            <div className="dashboard-supply-numbers">
              <span>{(totalSupply / 1e8).toLocaleString()} OPWAP minted</span>
              <span>1,000,000,000 max supply</span>
            </div>
          </div>
        )}

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Your Holdings</h2>
          {opwapBal != null && opwapBal > 0 ? (
            <div className="dashboard-holdings">
              <div className="dashboard-holding-card">
                <div className="dashboard-holding-header">
                  <span className="dashboard-holding-symbol">OPWAP</span>
                  <span className="dashboard-holding-badge">Active</span>
                </div>
                <div className="dashboard-holding-val">{(opwapBal / 1e8).toFixed(4)}</div>
                <div className="dashboard-holding-sub">OPWAProperty · Asset Alpha</div>
                <div className="dashboard-holding-apy">15% APY</div>
              </div>
            </div>
          ) : (
            <div className="dashboard-empty">
              <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>📦</div>
              <p style={{color:'rgba(255,255,255,.35)'}}>No holdings yet. <Link to="/#assets" style={{color:'var(--accent)'}}>Invest in an asset</Link> to start.</p>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Transaction History</h2>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="dashboard-tx-link">
            View all transactions on OPScan Explorer
          </a>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/Dashboard.tsx', dash, 'utf8');
console.log('OK Dashboard.tsx');
