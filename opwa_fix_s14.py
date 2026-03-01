#!/usr/bin/env python3
"""
OPWA s14 — Frontend Polish + Dashboard + Slider Fix + How It Works Fix
Gera os arquivos TSX/CSS e commita via subprocess.
Execute: python3 opwa_fix_s14.py
"""

import os, sys

# ─── NAVIGATION.TSX ─────────────────────────────────────────────────────────
navigation = r"""
import { useState, useEffect } from 'react';
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

  const short = walletAddr ? walletAddr.slice(0, 6) + '…' + walletAddr.slice(-4) : '';
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
    { id: 'unisat',   name: 'Unisat',   desc: 'Bitcoin native · OP_NET compatible',        badge: null,          color: '#f59e0b' },
    { id: 'xverse',   name: 'Xverse',   desc: 'Bitcoin · Ordinals · OP_NET',               badge: null,          color: '#8b5cf6' },
    { id: 'okx',      name: 'OKX Wallet', desc: 'Multi-chain · Web3',                      badge: null,          color: '#64748b' },
  ];

  return (
    <>
      <nav className="nav-bar" role="navigation">
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="nav-logo-op">OP</span>
            <span className="nav-logo-opwa">OPWA</span>
            <span className="nav-logo-platform">Platform</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links-desktop">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            {connected && (
              <Link to="/dashboard" className={`nav-link nav-link-dashboard${location.pathname === '/dashboard' ? ' active' : ''}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                Dashboard
              </Link>
            )}
          </div>

          {/* Gas ticker */}
          <div className="nav-gas">
            <span className="nav-gas-dot" />
            <span className="nav-gas-label">Gas</span>
            <span className="nav-gas-value">{gasPrice != null ? `${gasPrice} sat/vB` : '—'}</span>
            {btcPrice && <span className="nav-gas-btc">· ${btcPrice.toLocaleString()}</span>}
          </div>

          {/* Theme toggle */}
          <button className="nav-theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Wallet */}
          {!connected ? (
            <button className="nav-connect-btn" onClick={() => setWalletModal(true)}>Connect Wallet</button>
          ) : (
            <div className="nav-wallet-wrap">
              <button className="nav-wallet-btn" onClick={() => setDropdownOpen(o => !o)}>
                <span className="nav-wallet-dot" />
                <span>{short}</span>
                {balBtc && <span className="nav-wallet-bal">₿ {balBtc}</span>}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-addr">{walletAddr}</div>
                  {balUsd && <div className="nav-dropdown-bal">≈ ${balUsd} USD · ₿ {balBtc}</div>}
                  <hr className="nav-dropdown-sep"/>
                  <a href={`https://opscan.org/accounts/${walletAddr}?network=op_testnet`} target="_blank" rel="noreferrer" className="nav-dropdown-link">View on OPScan ↗</a>
                  <button className="nav-dropdown-disc" onClick={() => { disconnect(); setDropdownOpen(false); }}>Disconnect</button>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
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

      {/* Wallet Modal */}
      {walletModal && (
        <div className="modal-overlay" onClick={() => setWalletModal(false)}>
          <div className="wallet-modal" onClick={e => e.stopPropagation()}>
            <div className="wallet-modal-header">
              <h2>Connect Wallet</h2>
              <button className="wallet-modal-close" onClick={() => setWalletModal(false)}>✕</button>
            </div>
            <p className="wallet-modal-sub">Choose your Bitcoin wallet to connect to the OP_NET platform.</p>
            {wallets.map(w => (
              <button key={w.id} className="wallet-option" onClick={() => { connect(w.id); setWalletModal(false); }}>
                <span className="wallet-option-icon" style={{background: w.color + '22', border: `1.5px solid ${w.color}44`}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={w.color}><circle cx="12" cy="12" r="10"/></svg>
                </span>
                <span className="wallet-option-info">
                  <span className="wallet-option-name">{w.name}</span>
                  <span className="wallet-option-desc">{w.desc}</span>
                </span>
                {w.badge && <span className="wallet-option-badge">{w.badge}</span>}
              </button>
            ))}
            <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noreferrer" className="wallet-get-banner">
              Don't have OP_Wallet? Install from Chrome Web Store ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
""".strip()

# ─── DASHBOARD.TSX ──────────────────────────────────────────────────────────
dashboard = r"""
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useLivePrices } from '../hooks/useLivePrices';

const OPWAP_ADDR = import.meta.env.VITE_OPWAP_TOKEN_ADDRESS || 'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp';
const PROVIDER_URL = 'https://testnet.opnet.org';

export default function Dashboard() {
  const { connected, walletAddr, walletSats } = useAppStore();
  const { btcPrice } = useLivePrices();
  const [opwapBal, setOpwapBal] = useState<number | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const btcVal = walletSats != null ? walletSats / 1e8 : 0;
  const usdVal = btcPrice ? btcVal * btcPrice : 0;
  const opwapUsd = opwapBal != null && btcPrice ? (opwapBal / 1e3) * btcPrice * 0.15 : 0;

  useEffect(() => {
    if (!connected || !walletAddr) { setLoading(false); return; }
    let cancelled = false;

    async function fetchOnchain() {
      try {
        const { JSONRpcProvider, getContract, networks } = await import('@btc-vision/transaction');
        const NETWORK = networks.opnetTestnet;
        const provider = new JSONRpcProvider({ url: PROVIDER_URL, network: NETWORK });
        const OP_20_ABI = [
          { name: 'balanceOf', type: 'function', inputs: [{ name: 'address', type: 'address' }], outputs: [{ name: 'balance', type: 'uint256' }] },
          { name: 'totalSupply', type: 'function', inputs: [], outputs: [{ name: 'supply', type: 'uint256' }] },
        ];
        const contract = getContract<any>(OPWAP_ADDR, OP_20_ABI as any, provider, NETWORK);
        const [balRes, supRes] = await Promise.allSettled([
          contract.balanceOf(walletAddr),
          contract.totalSupply(),
        ]);
        if (cancelled) return;
        if (balRes.status === 'fulfilled') {
          const raw = balRes.value?.properties?.balance ?? balRes.value?.result?.balance;
          if (raw != null) setOpwapBal(Number(raw));
        }
        if (supRes.status === 'fulfilled') {
          const raw = supRes.value?.properties?.supply ?? supRes.value?.result?.supply;
          if (raw != null) setTotalSupply(Number(raw));
        }
      } catch (e) {
        console.warn('[Dashboard] onchain error', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchOnchain();
    const iv = setInterval(fetchOnchain, 30000);
    return () => { cancelled = true; clearInterval(iv); };
  }, [connected, walletAddr]);

  if (!connected) {
    return (
      <div className="dashboard-gate">
        <div className="dashboard-gate-card">
          <div className="dashboard-gate-icon">🔒</div>
          <h2>Connect Your Wallet</h2>
          <p>Connect your Bitcoin wallet to access your dashboard and portfolio.</p>
          <Link to="/" className="btn-primary">Go to Home</Link>
        </div>
      </div>
    );
  }

  const shortAddr = walletAddr ? walletAddr.slice(0, 8) + '…' + walletAddr.slice(-6) : '';
  const supplyPct = totalSupply != null ? Math.min((totalSupply / 1e8 / 1e9) * 100, 100) : 0;

  const stats = [
    { label: 'BTC Balance', value: btcVal.toFixed(6), unit: '₿', color: '#f97316', sub: `≈ $${usdVal.toFixed(2)}` },
    { label: 'OPWAP Tokens', value: opwapBal != null ? (opwapBal / 1e8).toFixed(4) : '—', unit: 'OPWAP', color: '#fbbf24', sub: opwapBal != null ? `≈ $${opwapUsd.toFixed(2)}` : 'loading…' },
    { label: 'Est. Annual Yield', value: '15%', unit: 'APY', color: '#22c55e', sub: 'Platform target rate' },
    { label: 'Network', value: 'Testnet4', unit: '', color: '#60a5fa', sub: 'OP_NET Signet' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Portfolio Dashboard</h1>
            <p className="dashboard-addr">{shortAddr}</p>
          </div>
          <a
            href={`https://opscan.org/accounts/${walletAddr}?network=op_testnet`}
            target="_blank" rel="noreferrer"
            className="btn-outline-sm"
          >View on OPScan ↗</a>
        </div>

        {/* Stats grid */}
        <div className="dashboard-stats">
          {stats.map(s => (
            <div key={s.label} className="dashboard-stat-card">
              <div className="dashboard-stat-label">{s.label}</div>
              <div className="dashboard-stat-value" style={{ color: s.color }}>
                {loading && s.label === 'OPWAP Tokens' ? <span className="dash-loading">…</span> : s.value}
                {s.unit && <span className="dashboard-stat-unit"> {s.unit}</span>}
              </div>
              <div className="dashboard-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Supply progress */}
        {totalSupply != null && (
          <div className="dashboard-supply">
            <div className="dashboard-supply-header">
              <span>OPWAP Total Supply Minted</span>
              <span className="dashboard-supply-pct">{supplyPct.toFixed(3)}%</span>
            </div>
            <div className="dashboard-supply-bar">
              <div className="dashboard-supply-fill" style={{ width: `${supplyPct}%` }} />
            </div>
            <div className="dashboard-supply-numbers">
              <span>{(totalSupply / 1e8).toLocaleString()} OPWAP minted</span>
              <span>1,000,000,000 max supply</span>
            </div>
          </div>
        )}

        {/* Assets section */}
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Your Holdings</h2>
          <div className="dashboard-holdings">
            {opwapBal != null && opwapBal > 0 ? (
              <div className="dashboard-holding-card">
                <div className="dashboard-holding-header">
                  <span className="dashboard-holding-symbol">OPWAP</span>
                  <span className="dashboard-holding-badge">Active</span>
                </div>
                <div className="dashboard-holding-val">{(opwapBal / 1e8).toFixed(4)}</div>
                <div className="dashboard-holding-sub">OPWAProperty Token · Asset Alpha</div>
                <div className="dashboard-holding-apy">15% APY</div>
              </div>
            ) : (
              <div className="dashboard-empty">
                <div className="dashboard-empty-icon">📦</div>
                <p>No holdings yet. <Link to="/#assets">Invest in an asset</Link> to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* TX history link */}
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Transaction History</h2>
          <a
            href={`https://opscan.org/accounts/${walletAddr}?network=op_testnet`}
            target="_blank" rel="noreferrer"
            className="dashboard-tx-link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            View all transactions on OPScan Explorer
          </a>
        </div>
      </div>
    </div>
  );
}
""".strip()

# ─── CSS PATCH (append to src/index.css) ────────────────────────────────────
css_patch = r"""

/* ═══════════════════════════════════════════════════════════════════════════
   s14 POLISH — Slider, How It Works, Dashboard, Nav, Cards
═══════════════════════════════════════════════════════════════════════════ */

/* --- SLIDER FIX: Remove thumb & use overlay dot ---- */
.sim-slider-wrap { position: relative; width: 100%; height: 32px; display: flex; align-items: center; }
.sim-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, var(--accent) var(--pct, 40%), rgba(255,255,255,.12) var(--pct, 40%));
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.sim-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 0; height: 0; }
.sim-slider::-moz-range-thumb { width: 0; height: 0; border: none; background: transparent; }
.sim-slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid #fff;
  box-shadow: 0 0 0 3px rgba(249,115,22,.35), 0 2px 8px rgba(0,0,0,.4);
  pointer-events: none;
  transition: box-shadow .15s;
  z-index: 2;
}
.sim-slider:focus ~ .sim-slider-thumb,
.sim-slider:active ~ .sim-slider-thumb {
  box-shadow: 0 0 0 6px rgba(249,115,22,.25), 0 2px 8px rgba(0,0,0,.4);
}

/* --- HOW IT WORKS steps --- */
.step { transition: transform .2s, box-shadow .2s; cursor: default; }
.step:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(249,115,22,.15); }
.step-number {
  font-size: 3.5rem;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
  color: rgba(255,255,255,.07);
  line-height: 1;
  transition: color .2s;
  text-shadow: none !important;
}
.step:hover .step-number { color: var(--accent) !important; text-shadow: none !important; }

/* --- NAV DASHBOARD link --- */
.nav-link-dashboard {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(249,115,22,.12);
  border: 1px solid rgba(249,115,22,.3);
  border-radius: 6px;
  padding: 4px 10px;
  color: var(--accent) !important;
  font-size: .8rem;
  font-weight: 600;
  letter-spacing: .04em;
  transition: background .2s, border-color .2s;
}
.nav-link-dashboard:hover, .nav-link-dashboard.active { background: rgba(249,115,22,.25); border-color: var(--accent); }

/* --- CARD 3D polish --- */
.ativo-card, .asset-card {
  background: linear-gradient(135deg, rgba(255,255,255,.04) 0%, rgba(255,255,255,.01) 100%);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.06);
  transition: transform .25s, box-shadow .25s, border-color .25s;
  backdrop-filter: blur(8px);
}
.ativo-card:hover, .asset-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 20px 48px rgba(0,0,0,.45), 0 0 0 1px rgba(249,115,22,.2), inset 0 1px 0 rgba(255,255,255,.1);
  border-color: rgba(249,115,22,.25);
}

/* --- BUTTONS 3D polish --- */
.btn-primary, .btn-card, .nav-connect-btn {
  position: relative;
  overflow: hidden;
}
.btn-primary::before, .btn-card::before, .nav-connect-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 60%);
  border-radius: inherit;
  pointer-events: none;
}
.btn-primary { box-shadow: 0 4px 16px rgba(249,115,22,.4), inset 0 1px 0 rgba(255,255,255,.2); }
.btn-primary:hover { box-shadow: 0 6px 24px rgba(249,115,22,.55), inset 0 1px 0 rgba(255,255,255,.2); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(1px); box-shadow: 0 2px 8px rgba(249,115,22,.3); }

/* --- STAT CARDS in hero --- */
.stat-card, .hero-stat {
  background: linear-gradient(135deg, rgba(255,255,255,.05) 0%, rgba(255,255,255,.02) 100%);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06);
  transition: border-color .2s, box-shadow .2s;
}
.stat-card:hover, .hero-stat:hover { border-color: rgba(249,115,22,.2); box-shadow: 0 4px 20px rgba(0,0,0,.35); }

/* --- DASHBOARD PAGE --- */
.dashboard-page { min-height: 100vh; padding: 100px 0 60px; }
.dashboard-container { max-width: 900px; margin: 0 auto; padding: 0 24px; }
.dashboard-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 32px; gap: 16px; flex-wrap: wrap; }
.dashboard-title { font-size: 2rem; font-weight: 800; color: #fff; margin: 0 0 4px; }
.dashboard-addr { font-size: .8rem; color: rgba(255,255,255,.4); font-family: monospace; }

.dashboard-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 32px; }
.dashboard-stat-card {
  background: linear-gradient(135deg, rgba(255,255,255,.05) 0%, rgba(255,255,255,.02) 100%);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.05);
}
.dashboard-stat-label { font-size: .75rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 8px; }
.dashboard-stat-value { font-size: 1.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 4px; }
.dashboard-stat-unit { font-size: .85rem; font-weight: 400; opacity: .7; }
.dashboard-stat-sub { font-size: .75rem; color: rgba(255,255,255,.35); }
.dash-loading { animation: pulse 1s infinite; }

.dashboard-supply { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 14px; padding: 20px; margin-bottom: 32px; }
.dashboard-supply-header { display: flex; justify-content: space-between; font-size: .85rem; color: rgba(255,255,255,.6); margin-bottom: 10px; }
.dashboard-supply-pct { color: var(--accent); font-weight: 700; }
.dashboard-supply-bar { height: 8px; background: rgba(255,255,255,.08); border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
.dashboard-supply-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--gold)); border-radius: 4px; transition: width .5s ease; }
.dashboard-supply-numbers { display: flex; justify-content: space-between; font-size: .72rem; color: rgba(255,255,255,.3); }

.dashboard-section { margin-bottom: 32px; }
.dashboard-section-title { font-size: 1rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: rgba(255,255,255,.5); margin-bottom: 16px; }
.dashboard-holdings { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
.dashboard-holding-card {
  background: linear-gradient(135deg, rgba(249,115,22,.08) 0%, rgba(251,191,36,.04) 100%);
  border: 1px solid rgba(249,115,22,.2);
  border-radius: 14px;
  padding: 20px;
}
.dashboard-holding-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.dashboard-holding-symbol { font-weight: 800; font-size: 1rem; color: var(--accent); }
.dashboard-holding-badge { font-size: .7rem; background: rgba(34,197,94,.2); color: #4ade80; border-radius: 20px; padding: 2px 8px; font-weight: 600; }
.dashboard-holding-val { font-size: 1.6rem; font-weight: 900; color: #fff; margin-bottom: 4px; }
.dashboard-holding-sub { font-size: .75rem; color: rgba(255,255,255,.4); margin-bottom: 8px; }
.dashboard-holding-apy { font-size: .8rem; color: #4ade80; font-weight: 600; }

.dashboard-empty { text-align: center; padding: 40px; color: rgba(255,255,255,.3); }
.dashboard-empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
.dashboard-empty a { color: var(--accent); }

.dashboard-tx-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--accent); font-size: .9rem; font-weight: 600;
  text-decoration: none; border: 1px solid rgba(249,115,22,.3);
  border-radius: 8px; padding: 10px 16px;
  background: rgba(249,115,22,.08);
  transition: background .2s, border-color .2s;
}
.dashboard-tx-link:hover { background: rgba(249,115,22,.18); border-color: var(--accent); }

.dashboard-gate { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.dashboard-gate-card { text-align: center; max-width: 380px; padding: 48px 32px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09); border-radius: 20px; }
.dashboard-gate-icon { font-size: 3rem; margin-bottom: 20px; }

.btn-outline-sm {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent; border: 1px solid rgba(255,255,255,.2);
  color: rgba(255,255,255,.7); border-radius: 8px; padding: 8px 14px;
  font-size: .8rem; font-weight: 600; cursor: pointer; text-decoration: none;
  transition: border-color .2s, color .2s;
}
.btn-outline-sm:hover { border-color: rgba(255,255,255,.5); color: #fff; }

@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

/* --- GAS CONVERTER keep toggle color --- */
.gas-toggle-btn {
  background: transparent !important;
  border: 2px solid #ae005b !important;
  color: #ae005b !important;
}
.gas-toggle-btn.open {
  background: #ae005b !important;
  color: #fff !important;
}

""".strip()

# ─── APP.TSX patch note: add Dashboard route ─────────────────────────────────
app_tsx_patch = r"""
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
const Dashboard = lazy(() => import('./pages/Dashboard'));

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'60vh',color:'rgba(255,255,255,.4)'}}>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
""".strip()

files = {
    'src/components/Navigation.tsx': navigation,
    'src/pages/Dashboard.tsx': dashboard,
    'src/App.tsx': app_tsx_patch,
}

print("=== OPWA s14 File Writer ===")
for path, content in files.items():
    os.makedirs(os.path.dirname(path) if os.path.dirname(path) else '.', exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✓ Written: {path}")

# Append CSS patch
with open('src/index.css', 'a', encoding='utf-8') as f:
    f.write('\n' + css_patch + '\n')
print("  ✓ Appended: src/index.css")

print("\n=== All files written. Now run: ===")
print("npx tsc --noEmit 2>&1 | head -20")
print("git add src/components/Navigation.tsx src/pages/Dashboard.tsx src/App.tsx src/index.css")
print("git commit -m \"feat: dashboard page, nav tab, slider fix, step hover color, card 3D polish (s14)\"")
print("git push origin main")
