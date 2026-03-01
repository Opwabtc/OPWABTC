const fs = require('fs');
const content = `import { useState } from 'react';
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
    { id: 'opwallet', name: 'OP_Wallet', desc: 'Official OP_NET wallet', badge: 'Recommended', color: '#f97316' },
    { id: 'unisat',   name: 'Unisat',    desc: 'Bitcoin native · OP_NET compatible', badge: null, color: '#f59e0b' },
    { id: 'xverse',   name: 'Xverse',    desc: 'Bitcoin · Ordinals · OP_NET', badge: null, color: '#8b5cf6' },
    { id: 'okx',      name: 'OKX Wallet', desc: 'Multi-chain · Web3', badge: null, color: '#64748b' },
  ];

  const btcPriceStr = btcPrice ? '$' + btcPrice.toLocaleString() : '';

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
            {btcPrice && <span className="nav-gas-btc">{btcPriceStr}</span>}
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
                  {balUsd && <div className="nav-dropdown-bal">approx. {balUsd} USD</div>}
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
fs.writeFileSync('src/components/Navigation.tsx', content, 'utf8');
console.log('OK Navigation.tsx');
