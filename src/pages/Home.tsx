import React, { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { useInvestment } from '../hooks/useInvestment'

// Taxa: 1 token = 0.00001 BTC = 1000 sats
const SATS_PER_TOKEN = 1000
const BTC_TO_SATS = 100_000_000
const BTC_PER_TOKEN = SATS_PER_TOKEN / BTC_TO_SATS // 0.00001

function normalizeBtcInput(raw: string): number {
  const normalized = raw.replace(',', '.')
  const val = parseFloat(normalized)
  return isNaN(val) ? 0 : val
}

function calcTokensFromBtc(btc: number): number {
  const sats = Math.round(btc * BTC_TO_SATS)
  return Math.floor(sats / SATS_PER_TOKEN)
}

function calcBtcFromTokens(tokens: number): string {
  const btc = tokens * BTC_PER_TOKEN
  return btc.toFixed(8).replace(/\.?0+$/, '')
}

interface AssetCardProps {
  id: string
  title: string
  location: string
  apy: string
  available: number
  total: number
  type: string
}

function AssetCard({ id, title, location, apy, available, total, type }: AssetCardProps) {
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
    if (btc > 0) setTokensRaw(String(calcTokensFromBtc(btc)))
    else setTokensRaw('')
  }, [])

  const handleTokensChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setTokensRaw(raw)
    const tokens = parseInt(raw, 10)
    if (!isNaN(tokens) && tokens > 0) setBtcRaw(calcBtcFromTokens(tokens))
    else setBtcRaw('')
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
    <div className="ativo-card" data-type={type} data-name={title}>
      {/* Imagem placeholder */}
      <div className="ativo-img">
        <div className="ativo-img-overlay" />
        <div className="ativo-img-placeholder">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <div className="ativo-badges">
          <span className="badge badge-ok">Live</span>
          <span className={`badge ${type === 'commercial' ? 'badge-a' : 'badge-b'}`}>
            {type === 'commercial' ? 'Commercial' : 'Residential'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="ativo-body">
        <div className="ativo-id">{id}</div>
        <div className="ativo-name">{title}</div>
        <div className="ativo-desc">{location} · OP_NET Testnet · OP_20 Token</div>

        {/* Stats grid */}
        <div className="ativo-stats">
          <div className="ativo-stat">
            <div className="ativo-stat-label">APY</div>
            <div className="ativo-stat-value pos">{apy}</div>
          </div>
          <div className="ativo-stat">
            <div className="ativo-stat-label">Network</div>
            <div className="ativo-stat-value">OP_NET</div>
          </div>
          <div className="ativo-stat">
            <div className="ativo-stat-label">Standard</div>
            <div className="ativo-stat-value">OP_20</div>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-wrap">
          <div className="progress-label">
            <span>Availability</span>
            <span>{available.toLocaleString()} / {total.toLocaleString()} tokens</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Invest button */}
        {!open ? (
          <button className="btn-card" onClick={handleOpen}>
            Invest Now →
          </button>
        ) : (
          <button className="btn-card" style={{ marginBottom: 0 }} onClick={() => { setOpen(false); reset() }}>
            Close ✕
          </button>
        )}
      </div>

      {/* Expand panel — lógica de investimento */}
      <div className={`ativo-expand-panel${open ? ' open' : ''}`}>
        <div className="ativo-expand-inner">
          <div className="ativo-expand-title">Investment Details</div>

          {/* TX details box */}
          <div className="tx-details">
            <div className="tx-detail-row">
              <span>Rate</span>
              <span className="tx-detail-val acc">1 OPWAP = 0.00001 BTC</span>
            </div>
            <div className="tx-detail-row">
              <span>Min. Investment</span>
              <span className="tx-detail-val">1,000 sats</span>
            </div>
          </div>

          {/* BTC input */}
          <div className="expand-field">
            <label htmlFor={`btc-${id}`}>Amount (BTC)</label>
            <input
              id={`btc-${id}`}
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

          {/* Tokens input */}
          <div className="expand-field">
            <label htmlFor={`tokens-${id}`}>Number of tokens</label>
            <input
              id={`tokens-${id}`}
              className="expand-input"
              type="text"
              inputMode="numeric"
              placeholder="1"
              value={tokensRaw}
              onChange={handleTokensChange}
            />
          </div>

          {/* Preview */}
          {isValidAmount && tokenCount > 0 && (
            <div className="sim-result" style={{ marginBottom: 12 }}>
              <div className="sim-result-label">You will receive</div>
              <div className="sim-result-value">{tokenCount.toLocaleString()} OPWAP</div>
              <div className="sim-result-btc">≈ {btcValue.toFixed(8)} BTC</div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ fontSize: 12, color: 'var(--danger)', marginBottom: 10, padding: '8px 12px', background: 'rgba(239,68,68,.08)', borderRadius: 8, border: '1px solid rgba(239,68,68,.2)' }}>
              {error}
            </div>
          )}

          {/* Success */}
          {result && (
            <div style={{ fontSize: 12, color: 'var(--success)', marginBottom: 10, padding: '8px 12px', background: 'rgba(16,185,129,.08)', borderRadius: 8, border: '1px solid rgba(16,185,129,.2)' }}>
              ✅ Mint successful!{' '}
              <a href={result.opscanUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                View on OPScan ↗
              </a>
            </div>
          )}

          {/* Confirm */}
          <button
            className="btn-invest"
            onClick={handleConfirm}
            disabled={loading || (!connected ? false : !isValidAmount)}
          >
            {loading
              ? 'Processing...'
              : !connected
              ? 'Connect Wallet'
              : 'Confirm Investment'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { btcPrice } = useAppStore()

  const assets = [
    { id: 'OPWA-001', title: 'Asset Alpha — São Paulo Office', location: 'São Paulo, BR', apy: '12.4%', available: 550, total: 1000, type: 'commercial' },
    { id: 'OPWA-002', title: 'Asset Beta — Rio Residential',   location: 'Rio de Janeiro, BR', apy: '9.8%', available: 750, total: 1000, type: 'residential' },
  ]

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="hero-badge fade-in">
            <span className="hero-badge-dot" />
            Live on OP_NET Testnet
          </div>

          <h1 className="hero-title fade-in-up d1">
            <span className="hero-title-white">Onchain Proof of</span>
            <span className="hero-title-accent">World Asset</span>
          </h1>

          <p className="hero-subtitle fade-in-up d2">
            Real estate tokenization on Bitcoin Layer 1 via OP_NET.
            Acquire fractionalized property exposure — capital deployed in BTC,
            yield in stablecoins.
          </p>

          <div className="hero-cta fade-in-up d3">
            <a href="#assets" className="btn-primary-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Explore Assets
            </a>
            <a href="#simulator" className="btn-outline-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              Simulate Returns
            </a>
          </div>

          {/* Stats band — 6 items, 3 cols × 2 rows */}
          <div className="hero-stats fade-in-up d4">
            <div className="hero-stat">
              <div className="hero-stat-val">
                {(btcPrice ?? 0) > 0
                  ? '$' + (btcPrice ?? 0).toLocaleString('en-US', { maximumFractionDigits: 0 })
                  : '—'}
              </div>
              <div className="hero-stat-label">BTC Price</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">12.4%</div>
              <div className="hero-stat-label">Max APY</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">OP_20</div>
              <div className="hero-stat-label">Standard</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">1,000 sats</div>
              <div className="hero-stat-label">Min. Investment</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">2</div>
              <div className="hero-stat-label">Active Assets</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">BTC L1</div>
              <div className="hero-stat-label">Settlement</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── ASSETS ── */}
      <section id="assets">
        <div className="ativos-header">
          <div>
            <div className="section-eyebrow">Properties</div>
            <h2 className="section-title">Featured Assets</h2>
            <p className="section-subtitle">
              Tokenized real estate backed by Bitcoin. Each token represents fractional ownership with on-chain yield distribution.
            </p>
          </div>
          <a href="https://github.com/Opwabtc/OPWABTC" target="_blank" rel="noopener noreferrer" className="btn-link">
            View on GitHub ↗
          </a>
        </div>

        <div className="filter-row">
          <div className="filter-tabs">
            <button className="filter-tab active">All</button>
            <button className="filter-tab">Commercial</button>
            <button className="filter-tab">Residential</button>
          </div>
        </div>

        <div className="ativos-grid">
          {assets.map(asset => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works">
        <div className="section-eyebrow">Process</div>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Four steps from Bitcoin wallet to tokenized real estate on OP_NET.
        </p>
        <div className="steps-grid">
          {[
            { n:'01', label:'Connect', title:'Link your wallet', desc:'Connect OP_Wallet, UniSat, Xverse or OKX via Bitcoin browser extension.' },
            { n:'02', label:'Select', title:'Choose an asset', desc:'Browse tokenized properties and select how many OPWAP tokens to acquire.' },
            { n:'03', label:'Invest', title:'Send BTC', desc:'1,000 sats per token. Transaction is simulated then sent to OP_NET L1 contract.' },
            { n:'04', label:'Earn', title:'Receive yield', desc:'Hold OPWAP tokens and receive stablecoin yield distributed on-chain.' },
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

      {/* ── INFO BAR (contrato/network) ── */}
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
          <span>Contract:</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, marginLeft: 4 }}>opt1sqq047…g6xnp</span>
        </div>
        <div className="status-item" style={{ marginLeft: 'auto' }}>
          <span style={{ color: 'var(--text-3)' }}>Standard: OP_20</span>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-mark">OP</div>
                <div className="footer-logo-name">OPWA</div>
              </div>
              <p className="footer-desc">
                Onchain Proof of World Asset — real estate tokenization on Bitcoin Layer 1 via OP_NET protocol.
              </p>
              <div className="footer-socials">
                <a href="https://x.com/OpwaBTC" target="_blank" rel="noopener noreferrer" className="social-btn" title="X / Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://github.com/Opwabtc/OPWABTC" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <div className="footer-col-title">Platform</div>
              <div className="footer-links">
                <a href="#assets"       className="footer-link">Assets</a>
                <a href="#simulator"    className="footer-link">Simulator</a>
                <a href="#how-it-works" className="footer-link">How It Works</a>
              </div>
            </div>

            {/* Developers */}
            <div>
              <div className="footer-col-title">Developers</div>
              <div className="footer-links">
                <a href="https://github.com/Opwabtc/OPWABTC" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext">GitHub</a>
                <a href="https://opnet.org" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext">Build on OP_NET</a>
              </div>
            </div>

            {/* Resources */}
            <div>
              <div className="footer-col-title">Resources</div>
              <div className="footer-links">
                <a href="#" className="footer-link">Whitepaper</a>
                <a href="https://faucet.opnet.org" target="_blank" rel="noopener noreferrer" className="footer-link footer-link-ext">Testnet Faucet</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2025 OPWA Protocol. All rights reserved.</span>
            <div className="footer-network-badge">
              <span className="dot" style={{ width: 6, height: 6 }} />
              OP_NET Testnet
            </div>
            <div className="footer-bottom-links">
              <a href="/terms"   className="footer-bottom-link">Terms</a>
              <a href="/privacy" className="footer-bottom-link">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
