import React, { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { useInvestment } from '../hooks/useInvestment'

const SATS_PER_TOKEN = 1000
const BTC_TO_SATS = 100_000_000
const BTC_PER_TOKEN = SATS_PER_TOKEN / BTC_TO_SATS // 0.00001

function normalizeBtcInput(raw: string): number {
  const normalized = raw.replace(',', '.')
  const val = parseFloat(normalized)
  return isNaN(val) ? 0 : val
}
function calcTokensFromBtc(btc: number): number {
  return Math.floor(Math.round(btc * BTC_TO_SATS) / SATS_PER_TOKEN)
}
function calcBtcFromTokens(tokens: number): string {
  return (tokens * BTC_PER_TOKEN).toFixed(8).replace(/\.?0+$/, '')
}

interface AssetCardProps {
  id: string
  title: string
  desc: string
  apy: string
  apyClass: string
  change: string
  available: number
  total: number
  type: string
  imgStyle?: React.CSSProperties
  badgeClass: string
  badgeLabel: string
  delay: string
}

function AssetCard({ id, title, desc, apy, apyClass, change, available, total, type, imgStyle, badgeClass, badgeLabel, delay }: AssetCardProps) {
  const { connected } = useAppStore()
  const { connect } = useWallet()
  const { invest, loading, error, result, reset } = useInvestment()

  const [open, setOpen] = useState(false)
  const [btcRaw, setBtcRaw] = useState('')
  const [tokensRaw, setTokensRaw] = useState('')

  const handleBtcChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setBtcRaw(raw)
    const btc = normalizeBtcInput(raw)
    setTokensRaw(btc > 0 ? String(calcTokensFromBtc(btc)) : '')
  }, [])

  const handleTokensChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setTokensRaw(raw)
    const tokens = parseInt(raw, 10)
    setBtcRaw(!isNaN(tokens) && tokens > 0 ? calcBtcFromTokens(tokens) : '')
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!connected) { connect('opnet'); return }
    const btc = normalizeBtcInput(btcRaw)
    if (btc <= 0) return
    await invest(btc)
  }, [connected, connect, btcRaw, invest])

  const handleOpen = useCallback(() => {
    reset(); setBtcRaw(''); setTokensRaw(''); setOpen(true)
  }, [reset])

  const progressPct = Math.min(100, Math.round(((total - available) / total) * 100))
  const btcValue = normalizeBtcInput(btcRaw)
  const tokenCount = calcTokensFromBtc(btcValue)
  const isValidAmount = btcValue >= BTC_PER_TOKEN

  return (
    <div className={`ativo-card fade-in-up ${delay}`} data-type={type} data-name={title}>
      <div className="ativo-img" style={imgStyle}>
        <div className="ativo-img-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <div className="ativo-img-overlay" />
        <div className="ativo-badges">
          <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
          <span className="badge badge-ok">Active</span>
        </div>
      </div>

      <div className="ativo-body">
        <div className="ativo-id">{id} · OP_NET/OPWA</div>
        <div className="ativo-name">{title}</div>
        <div className="ativo-desc">{desc}</div>

        <div className="value-toggle-row">
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Display in:</span>
          <button className="value-toggle-btn active">BTC</button>
          <button className="value-toggle-btn">USD</button>
        </div>

        <div className="ativo-stats">
          <div className="ativo-stat">
            <div className="ativo-stat-label">Price</div>
            <div className="ativo-stat-value">—</div>
          </div>
          <div className="ativo-stat">
            <div className="ativo-stat-label">APY</div>
            <div className={`ativo-stat-value ${apyClass}`}>{apy}</div>
          </div>
          <div className="ativo-stat">
            <div className="ativo-stat-label">24h</div>
            <div className="ativo-stat-value pos">{change}</div>
          </div>
        </div>

        <div className="tx-details">
          <div className="tx-detail-row">
            <span>Est. Gas</span>
            <span className="tx-detail-val acc">—</span>
          </div>
          <div className="tx-detail-row">
            <span>Slippage</span>
            <span className="tx-detail-val">0.5%</span>
          </div>
          <div className="tx-detail-row">
            <span>Contract</span>
            <span className="tx-detail-val" style={{ fontSize: 10 }}>OP_NET</span>
          </div>
        </div>

        <div className="progress-wrap">
          <div className="progress-label">
            <span>Availability</span>
            <span style={{ color: 'var(--text-3)' }}>{available} / {total} tokens</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <button className="btn-card" onClick={open ? () => { setOpen(false); reset() } : handleOpen}>
          {open ? 'Close ✕' : 'Invest Now'}
        </button>
      </div>

      {/* Expand panel */}
      <div className={`ativo-expand-panel${open ? ' open' : ''}`}>
        <div className="ativo-expand-inner">
          <div className="ativo-expand-title">Investment Details</div>

          <div className="expand-field">
            <label>Amount (BTC)</label>
            <input
              className="expand-input"
              type="text"
              inputMode="decimal"
              placeholder="0.00001"
              value={btcRaw}
              onChange={handleBtcChange}
            />
            {btcRaw && !isValidAmount && (
              <div style={{ fontSize: 11, color: 'var(--danger)', marginTop: 4 }}>
                Minimum: 0.00001 BTC (1 token)
              </div>
            )}
          </div>

          <div className="expand-field">
            <label>Number of tokens</label>
            <input
              className="expand-input"
              type="text"
              inputMode="numeric"
              placeholder="1"
              value={tokensRaw}
              onChange={handleTokensChange}
            />
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
              1 token = 0.00001 BTC (1,000 sats)
            </div>
          </div>

          {isValidAmount && tokenCount > 0 && (
            <div style={{ padding: '10px 12px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 10, marginBottom: 12, fontSize: 13, textAlign: 'center' }}>
              <div style={{ color: 'var(--text-2)', marginBottom: 4 }}>You will receive</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: 'var(--accent)' }}>
                {tokenCount.toLocaleString()} OPWAP
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'DM Mono, monospace', marginTop: 2 }}>
                ≈ {btcValue.toFixed(8)} BTC
              </div>
            </div>
          )}

          {error && (
            <div style={{ fontSize: 12, color: 'var(--danger)', marginBottom: 10, padding: '8px 12px', background: 'rgba(239,68,68,.08)', borderRadius: 8, border: '1px solid rgba(239,68,68,.2)' }}>
              {error}
            </div>
          )}

          {result && (
            <div style={{ fontSize: 12, color: 'var(--success)', marginBottom: 10, padding: '8px 12px', background: 'rgba(16,185,129,.08)', borderRadius: 8, border: '1px solid rgba(16,185,129,.2)' }}>
              ✅ Mint successful!{' '}
              <a href={result.opscanUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                View on OPScan ↗
              </a>
            </div>
          )}

          <button
            className="btn-invest"
            onClick={handleConfirm}
            disabled={loading || (connected && !isValidAmount)}
          >
            {loading ? 'Processing...' : !connected ? 'Connect Wallet' : 'Confirm Investment'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { btcPrice } = useAppStore()
  const { connect } = useWallet()
  const { connected } = useAppStore()

  const assets = [
    {
      id: 'ID-001', title: 'Asset Alpha', type: 'residential', badgeClass: 'badge-a', badgeLabel: 'Residential',
      desc: 'Tokenized residential property. Fractional ownership settled on Bitcoin via OP_NET smart contract.',
      apy: '15%', apyClass: 'pos', change: '+1.2%', available: 450, total: 1000, delay: 'd1',
    },
    {
      id: 'ID-002', title: 'Asset Beta', type: 'commercial', badgeClass: 'badge-b', badgeLabel: 'Commercial',
      desc: 'Commercial office space tokenized on OP_NET. Dividends distributed in satoshis monthly.',
      apy: '12%', apyClass: 'gold', change: '+0.8%', available: 700, total: 1000, delay: 'd2',
      imgStyle: { background: 'linear-gradient(135deg,#1a1a2e,#252540)' },
    },
    {
      id: 'ID-003', title: 'Asset Gamma', type: 'industrial', badgeClass: 'badge-warn', badgeLabel: 'Industrial',
      desc: 'Industrial logistics hub. Tokenization pending final regulatory clearance. Join the waitlist.',
      apy: '~18%', apyClass: 'gold', change: '—', available: 300, total: 1000, delay: 'd3',
      imgStyle: { background: 'linear-gradient(135deg,#1a2e1a,#1a2520)' },
    },
  ]

  return (
    <>
      {/* ── HERO ── */}
      <div className="hero-section" id="home">
        <div className="hero-content fade-in-up">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Real Estate Investment Platform
          </div>
          <h1 className="hero-title">
            <span className="hero-title-white">Invest in Tokenized</span>
            <span className="hero-title-accent">Real Estate with</span>
            <span className="hero-title-accent">Bitcoin</span>
          </h1>
          <p className="hero-subtitle">
            Diversify your portfolio with real estate assets that outperform savings accounts.
            Invest as little as 0.001 BTC in premium properties.
          </p>
          <div className="hero-cta">
            <button className="btn-primary-lg" onClick={() => !connected && connect('opnet')}>
              Connect Wallet →
            </button>
            <a href="#simulator" className="btn-outline-lg">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              View Simulator
            </a>
          </div>
        </div>

        {/* Stats band — 6 items, 3 cols × 2 rows */}
        <div className="hero-stats fade-in">
          <div className="hero-stat">
            <div className="hero-stat-val">&#x20BF; Layer</div>
            <span className="hero-stat-label">Native Bitcoin Settlement</span>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-val">OP_NET</div>
            <span className="hero-stat-label">Smart Contract Protocol</span>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-val">
              {(btcPrice ?? 0) > 0
                ? '$' + (btcPrice ?? 0).toLocaleString('en-US', { maximumFractionDigits: 0 })
                : '15% p.a.'}
            </div>
            <span className="hero-stat-label">
              {(btcPrice ?? 0) > 0 ? 'BTC Price (Live)' : 'Projected Annual Yield'}
            </span>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-val">0.5%</div>
            <span className="hero-stat-label">Max Slippage</span>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-val">500+</div>
            <span className="hero-stat-label">Early Investors</span>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-val">$2M+</div>
            <span className="hero-stat-label">Total Volume Target</span>
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* ── ASSETS ── */}
      <section id="assets">
        <div className="ativos-header">
          <div>
            <div className="section-eyebrow">Portfolio</div>
            <h2 className="section-title">Available Assets</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Fractionalized real estate backed by Bitcoin smart contracts on OP_NET.
            </p>
          </div>
          <a href="https://github.com/Opwabtc/" target="_blank" rel="noopener noreferrer" className="btn-link">
            View all on GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>
        </div>

        <div className="filter-row">
          <div className="filter-tabs" id="filterTabs">
            <button className="filter-tab active">All</button>
            <button className="filter-tab">Residential</button>
            <button className="filter-tab">Commercial</button>
            <button className="filter-tab">Industrial</button>
          </div>
          <div className="filter-right">
            <select className="filter-select">
              <option value="apy">Sort: APY</option>
              <option value="price">Sort: Price</option>
              <option value="volume">Sort: Volume</option>
            </select>
            <div className="filter-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search asset..." />
            </div>
          </div>
        </div>

        <div className="ativos-grid" id="ativosGrid">
          {assets.map(asset => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SIMULATOR (placeholder) ── */}
      <div className="simulador-section" id="simulator">
        <div className="simulador-inner">
          <div className="section-eyebrow">Tool</div>
          <h2 className="section-title">Investment Simulator</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Model your returns and compare the platform against traditional alternatives.
          </p>
        </div>
      </div>

      <div className="section-divider" />

      {/* ── PARTNERS ── */}
      <div className="partners-section" id="partners">
        <div className="partners-label">Companies That Trust the Platform</div>
        <div className="partners-wrapper">
          <div className="partners-track">
            {['OP_NET Protocol', 'Partner B', 'Partner C', 'Partner D', 'Partner E', 'Partner F', 'Partner G',
              'OP_NET Protocol', 'Partner B', 'Partner C', 'Partner D', 'Partner E', 'Partner F', 'Partner G'].map((p, i) => (
              <div className="partner-slot" key={i}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-eyebrow" style={{ display: 'inline-block', border: 'none', padding: 0 }}>Process</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Four steps from Bitcoin wallet to tokenized real estate investment — fully on-chain.
          </p>
        </div>
        <div className="steps-grid">
          {[
            { n: '01', label: 'Connect', title: 'Link Your Wallet', desc: 'Connect OP_Wallet, UniSat, Xverse or OKX via Bitcoin browser extension to get started.' },
            { n: '02', label: 'Select', title: 'Choose an Asset', desc: 'Browse tokenized properties. Each asset has real data: APY, availability, and contract info.' },
            { n: '03', label: 'Invest', title: 'Send BTC', desc: '1,000 sats per token. Transaction is simulated then signed and sent to the OP_NET L1 contract.' },
            { n: '04', label: 'Earn', title: 'Receive Yield', desc: 'Hold OPWAP tokens and receive stablecoin yield distributed directly on-chain.' },
          ].map(s => (
            <div className="step" key={s.n}>
              <div className="step-number">{s.n}</div>
              <div className="step-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <div className="step-label">{s.label}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── STATUS BAR ── */}
      <div className="status-bar">
        <div className="status-item">
          <span className="dot" />
          <span>OP_NET Testnet</span>
        </div>
        <div className="status-item">
          <span>Rate:</span>
          <strong style={{ color: 'var(--accent)', marginLeft: 4 }}>1 OPWAP = 0.00001 BTC</strong>
        </div>
        <div className="status-item">
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11 }}>opt1sqq047…g6xnp</span>
        </div>
        <div className="status-item" style={{ marginLeft: 'auto' }}>
          <span style={{ color: 'var(--text-3)' }}>OP_20</span>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-mark">OP</div>
                <div className="footer-logo-name">OPWA</div>
              </div>
              <p className="footer-desc">
                OPWA is a fractionalized real estate investment platform built natively on Bitcoin,
                powered by the OP_NET smart contract protocol. Borderless, trustless, and transparent.
              </p>
              <div className="footer-socials">
                <a href="https://x.com/opwabtc" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter / X">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4l16 16M4 20L20 4"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Platform</div>
              <div className="footer-links">
                {[
                  { href: '#assets', label: 'Assets' },
                  { href: '#simulator', label: 'Simulator' },
                  { href: '#how-it-works', label: 'How It Works' },
                  { href: '#partners', label: 'Partners' },
                ].map(l => (
                  <a key={l.href} href={l.href} className="footer-link">{l.label}</a>
                ))}
              </div>
            </div>

            <div>
              <div className="footer-col-title">Developers</div>
              <div className="footer-links">
                <a href="https://github.com/Opwabtc/" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext">GitHub</a>
                <a href="https://dev.opnet.org/" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext">Build on OP_NET</a>
                <a href="https://faucet.opnet.org/" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext">Testnet Faucet</a>
                <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext">Get OP_Wallet</a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Resources</div>
              <div className="footer-links">
                <a href="opwa_strategic_document" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext" style={{ color: 'var(--gold)' }}>Whitepaper</a>
                <a href="https://defibible.org/" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext">DeFi Bible</a>
                <a href="https://op-real-estate-platform.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext">Live Platform</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2025 OPWA Protocol. All rights reserved.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', fontSize: 11, fontWeight: 600, color: 'var(--accent)' }}>
              <span className="dot" style={{ width: 6, height: 6 }} />
              OP_NET Testnet
            </div>
            <div className="footer-bottom-links">
              <a href="/terms" className="footer-bottom-link">Terms</a>
              <a href="/privacy" className="footer-bottom-link">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
