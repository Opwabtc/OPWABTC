import React, { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { useInvestment } from '../hooks/useInvestment'

const SATS_PER_TOKEN = 1000
const BTC_TO_SATS = 100_000_000
const BTC_PER_TOKEN = SATS_PER_TOKEN / BTC_TO_SATS

function normalizeBtcInput(raw: string): number {
  const val = parseFloat(raw.replace(',', '.'))
  return isNaN(val) ? 0 : val
}
function calcTokensFromBtc(btc: number): number {
  return Math.floor(Math.round(btc * BTC_TO_SATS) / SATS_PER_TOKEN)
}
function calcBtcFromTokens(tokens: number): string {
  return (tokens * BTC_PER_TOKEN).toFixed(8).replace(/\.?0+$/, '')
}

interface AssetCardProps {
  id: string; title: string; desc: string; apy: string; apyClass: string
  change: string; available: number; total: number; type: string
  imgStyle?: React.CSSProperties; badgeClass: string; badgeLabel: string; delay: string
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
    const t = parseInt(raw, 10)
    setBtcRaw(!isNaN(t) && t > 0 ? calcBtcFromTokens(t) : '')
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!connected) { connect('opnet'); return }
    const btc = normalizeBtcInput(btcRaw)
    if (btc <= 0) return
    await invest(btc)
  }, [connected, connect, btcRaw, invest])

  const handleOpen = useCallback(() => { reset(); setBtcRaw(''); setTokensRaw(''); setOpen(true) }, [reset])

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
          <div className="ativo-stat"><div className="ativo-stat-label">Price</div><div className="ativo-stat-value">—</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">APY</div><div className={`ativo-stat-value ${apyClass}`}>{apy}</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">24h</div><div className="ativo-stat-value pos">{change}</div></div>
        </div>
        <div className="tx-details">
          <div className="tx-detail-row"><span>Est. Gas</span><span className="tx-detail-val acc">—</span></div>
          <div className="tx-detail-row"><span>Slippage</span><span className="tx-detail-val">0.5%</span></div>
          <div className="tx-detail-row"><span>Contract</span><span className="tx-detail-val" style={{ fontSize: 10 }}>OP_NET</span></div>
        </div>
        <div className="progress-wrap">
          <div className="progress-label">
            <span>Availability</span>
            <span style={{ color: 'var(--text-3)' }}>{available} / {total} tokens</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progressPct}%` }} /></div>
        </div>
        <button className="btn-card" onClick={open ? () => { setOpen(false); reset() } : handleOpen}>
          {open ? 'Close ✕' : 'Invest Now'}
        </button>
      </div>

      <div className={`ativo-expand-panel${open ? ' open' : ''}`}>
        <div className="ativo-expand-inner">
          <div className="ativo-expand-title">Investment Details</div>
          <div className="expand-field">
            <label>Amount (BTC)</label>
            <input className="expand-input" type="text" inputMode="decimal" placeholder="0.00001" value={btcRaw} onChange={handleBtcChange} />
            {btcRaw && !isValidAmount && <div style={{ fontSize: 11, color: 'var(--danger)', marginTop: 4 }}>Minimum: 0.00001 BTC (1 token)</div>}
          </div>
          <div className="expand-field">
            <label>Number of tokens</label>
            <input className="expand-input" type="text" inputMode="numeric" placeholder="1" value={tokensRaw} onChange={handleTokensChange} />
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>1 token = 0.00001 BTC (1,000 sats)</div>
          </div>
          {isValidAmount && tokenCount > 0 && (
            <div style={{ padding: 12, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 10, marginBottom: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 4 }}>You will receive</div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--accent)' }}>{tokenCount.toLocaleString()} OPWAP</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'DM Mono,monospace', marginTop: 2 }}>≈ {btcValue.toFixed(8)} BTC</div>
            </div>
          )}
          {error && <div style={{ fontSize: 12, color: 'var(--danger)', marginBottom: 10, padding: '8px 12px', background: 'rgba(239,68,68,.08)', borderRadius: 8, border: '1px solid rgba(239,68,68,.2)' }}>{error}</div>}
          {result && (
            <div style={{ fontSize: 12, color: 'var(--success)', marginBottom: 10, padding: '8px 12px', background: 'rgba(16,185,129,.08)', borderRadius: 8, border: '1px solid rgba(16,185,129,.2)' }}>
              ✅ Mint successful!{' '}<a href={result.opscanUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>View on OPScan ↗</a>
            </div>
          )}
          <button className="btn-invest" onClick={handleConfirm} disabled={loading || (connected && !isValidAmount)}>
            {loading ? 'Processing...' : !connected ? 'Connect Wallet' : 'Confirm Investment'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Gato laranja SVG para o thumb do slider
function CatThumb() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* círculo laranja base */}
      <circle cx="11" cy="13" r="8" fill="#f97316"/>
      {/* orelha esquerda */}
      <polygon points="5,9 3,3 8,7" fill="#f97316"/>
      {/* orelha direita */}
      <polygon points="17,9 19,3 14,7" fill="#f97316"/>
      {/* brilho orelha esquerda */}
      <polygon points="5.5,7.5 4,4 7.5,6.5" fill="#fb923c"/>
      {/* brilho orelha direita */}
      <polygon points="16.5,7.5 18,4 14.5,6.5" fill="#fb923c"/>
      {/* olhos */}
      <ellipse cx="8" cy="12" rx="1.3" ry="1.5" fill="#1a1a1a"/>
      <ellipse cx="14" cy="12" rx="1.3" ry="1.5" fill="#1a1a1a"/>
      {/* brilho olhos */}
      <circle cx="8.5" cy="11.3" r="0.4" fill="white"/>
      <circle cx="14.5" cy="11.3" r="0.4" fill="white"/>
      {/* nariz */}
      <polygon points="11,14 10,15.2 12,15.2" fill="#c2410c"/>
      {/* bigodes esquerda */}
      <line x1="4" y1="14.5" x2="9" y2="14" stroke="#c2410c" strokeWidth="0.5"/>
      <line x1="4" y1="15.5" x2="9" y2="15" stroke="#c2410c" strokeWidth="0.5"/>
      {/* bigodes direita */}
      <line x1="18" y1="14.5" x2="13" y2="14" stroke="#c2410c" strokeWidth="0.5"/>
      <line x1="18" y1="15.5" x2="13" y2="15" stroke="#c2410c" strokeWidth="0.5"/>
    </svg>
  )
}

function Simulator() {
  const { btcPrice } = useAppStore()
  const price = btcPrice || 65000

  const [currency, setCurrency] = useState<'btc' | 'usd'>('btc')
  // strings para permitir apagar tudo
  const [initialRaw, setInitialRaw] = useState('0.005')
  const [monthlyRaw, setMonthlyRaw] = useState('0')
  const [years, setYears] = useState(1)

  // parse seguro — retorna 0 se vazio/inválido
  const parseRaw = (s: string) => { const v = parseFloat(s.replace(',', '.')); return isNaN(v) ? 0 : Math.max(0, v) }

  const initialBtc = currency === 'btc' ? parseRaw(initialRaw) : parseRaw(initialRaw) / price
  const monthlyBtc = currency === 'btc' ? parseRaw(monthlyRaw) : parseRaw(monthlyRaw) / price

  const initialUsd = initialBtc * price
  const monthlyUsd = monthlyBtc * price

  const prefix = currency === 'btc' ? '₿ ' : '$ '
  const fmtBtc = (v: number) => '₿ ' + v.toFixed(5)
  const fmtUsd = (v: number) => '$ ' + v.toLocaleString('en-US', { maximumFractionDigits: 0 })
  const fmt = (btc: number) => currency === 'btc' ? fmtBtc(btc) : fmtUsd(btc * price)

  const OPWA_APY = 15
  const ALT_APY_A = 6.9
  const ALT_APY_B = 4.2

  function calcTotal(apy: number) {
    const r = apy / 100 / 12
    const n = years * 12
    const fv = initialBtc * Math.pow(1 + r, n) +
      (r > 0 ? monthlyBtc * (Math.pow(1 + r, n) - 1) / r : monthlyBtc * n)
    return { total: fv, returns: fv - initialBtc - monthlyBtc * n }
  }

  const opwa = calcTotal(OPWA_APY)
  const altA = calcTotal(ALT_APY_A)
  const altB = calcTotal(ALT_APY_B)

  const stepInitial = currency === 'btc' ? 0.001 : 100
  const stepMonthly = currency === 'btc' ? 0.0001 : 10

  const bumpInitial = (dir: number) => {
    const cur = parseRaw(initialRaw)
    const next = Math.max(0, cur + dir * stepInitial)
    setInitialRaw(currency === 'btc' ? next.toFixed(5) : next.toFixed(2))
  }
  const bumpMonthly = (dir: number) => {
    const cur = parseRaw(monthlyRaw)
    const next = Math.max(0, cur + dir * stepMonthly)
    setMonthlyRaw(currency === 'btc' ? next.toFixed(5) : next.toFixed(2))
  }

  const comparisons = [
    { name: 'OPWA Platform', apy: OPWA_APY, data: opwa, main: true, apyColor: '#22c55e' },
    { name: 'Fixed Income', apy: ALT_APY_A, data: altA, main: false, apyColor: '#eab308' },
    { name: 'Savings Account', apy: ALT_APY_B, data: altB, main: false, apyColor: '#ef4444' },
  ]

  return (
    <div className="simulador-section" id="simulator">
      <div className="simulador-inner">
        <div className="section-eyebrow">Tool</div>
        <h2 className="section-title">Investment Simulator</h2>
        <p className="section-subtitle" style={{ marginBottom: 32 }}>
          Model your returns and compare the platform against traditional alternatives.
        </p>
        <div className="simulador-grid">
          <div className="sim-panel">

            {/* Toggle BTC/USD */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <button
                onClick={() => setCurrency('btc')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                  border: '1.5px solid',
                  borderColor: currency === 'btc' ? 'var(--accent)' : 'var(--border)',
                  background: currency === 'btc' ? 'var(--accent-dim)' : 'transparent',
                  color: currency === 'btc' ? 'var(--accent)' : '#444',
                  cursor: 'pointer', transition: 'all .15s',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                BTC
              </button>
              <button
                onClick={() => setCurrency('usd')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                  border: '1.5px solid',
                  borderColor: currency === 'usd' ? '#22c55e' : 'var(--border)',
                  background: currency === 'usd' ? 'rgba(34,197,94,.1)' : 'transparent',
                  color: currency === 'usd' ? '#22c55e' : '#444',
                  cursor: 'pointer', transition: 'all .15s',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
                USD
              </button>
            </div>

            {/* Initial Investment */}
            <div className="sim-field">
              <label>Initial Investment
                <span style={{ color: 'var(--text-3)', marginLeft: 8, fontWeight: 400 }}>
                  ≈ {currency === 'btc' ? fmtUsd(initialUsd) : fmtBtc(initialBtc)}
                </span>
              </label>
              <div className="sim-stepper">
                <button className="sim-stepper-btn" onClick={() => bumpInitial(-1)}>−</button>
                <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: 10, fontSize: 13, color: currency === 'btc' ? 'var(--accent)' : '#22c55e', fontWeight: 700, pointerEvents: 'none' }}>{prefix}</span>
                  <input
                    className="sim-stepper-input"
                    type="text"
                    inputMode="decimal"
                    value={initialRaw}
                    onChange={e => setInitialRaw(e.target.value)}
                    onBlur={e => {
                      const v = parseRaw(e.target.value)
                      setInitialRaw(currency === 'btc' ? v.toFixed(5) : v.toFixed(2))
                    }}
                    style={{ textAlign: 'center', fontFamily: 'DM Mono, monospace', fontSize: 15, paddingLeft: 22 }}
                  />
                </div>
                <button className="sim-stepper-btn" onClick={() => bumpInitial(1)}>+</button>
              </div>
            </div>

            {/* Monthly Investment */}
            <div className="sim-field">
              <label>Monthly Investment
                <span style={{ color: 'var(--text-3)', marginLeft: 8, fontWeight: 400 }}>
                  ≈ {currency === 'btc' ? fmtUsd(monthlyUsd) : fmtBtc(monthlyBtc)}
                </span>
              </label>
              <div className="sim-stepper">
                <button className="sim-stepper-btn" onClick={() => bumpMonthly(-1)}>−</button>
                <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: 10, fontSize: 13, color: currency === 'btc' ? 'var(--accent)' : '#22c55e', fontWeight: 700, pointerEvents: 'none' }}>{prefix}</span>
                  <input
                    className="sim-stepper-input"
                    type="text"
                    inputMode="decimal"
                    value={monthlyRaw}
                    onChange={e => setMonthlyRaw(e.target.value)}
                    onBlur={e => {
                      const v = parseRaw(e.target.value)
                      setMonthlyRaw(currency === 'btc' ? v.toFixed(5) : v.toFixed(2))
                    }}
                    style={{ textAlign: 'center', fontFamily: 'DM Mono, monospace', fontSize: 15, paddingLeft: 22 }}
                  />
                </div>
                <button className="sim-stepper-btn" onClick={() => bumpMonthly(1)}>+</button>
              </div>
            </div>

            {/* Slider anos com thumb gato laranja */}
            <div className="sim-field">
              <label>Duration: <span style={{ color: 'var(--accent)' }}>{years} year{years > 1 ? 's' : ''}</span></label>
              <div style={{ position: 'relative', padding: '12px 0 4px' }}>
                <input
                  type="range"
                  className="sim-slider sim-slider-cat"
                  min={1} max={10} step={1}
                  value={years}
                  onChange={e => setYears(+e.target.value)}
                  style={{ position: 'relative', zIndex: 1 }}
                />
                {/* Gato centralizado sobre o thumb — offset 11px (metade de 22px) */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: `calc(${((years - 1) / 9) * 100}% * (1 - 22px / 100%) + 11px - 11px)`,
                  transform: 'translate(-50%, -110%)',
                  pointerEvents: 'none',
                  lineHeight: 0,
                  zIndex: 2,
                }}>
                  <CatThumb />
                </div>
              </div>
              <div className="sim-slider-labels"><span>1y</span><span>5y</span><span>10y</span></div>
            </div>

            {/* Result OPWA */}
            <div className="sim-result">
              <div className="sim-result-label">OPWA Return ({OPWA_APY}% APY · {years}y)</div>
              <div className="sim-result-value">{fmt(opwa.returns)}</div>
              <div className="sim-result-btc">Total accumulated: {fmt(opwa.total)}</div>
            </div>
          </div>

          {/* Comparison */}
          <div>
            <div className="sim-forecast-header"><div className="sim-forecast-title">Comparison</div></div>
            <div className="sim-compare">
              {comparisons.map(c => (
                <div key={c.name} className={`sim-compare-card${c.main ? ' highlighted' : ''}`}>
                  <div>
                    <div className="sim-compare-name">
                      {c.name}
                      <span style={{
                        marginLeft: 8, padding: '2px 8px', borderRadius: 20,
                        fontSize: 11, fontWeight: 700,
                        background: c.apyColor + '18',
                        color: c.apyColor,
                        border: `1px solid ${c.apyColor}40`,
                      }}>{c.apy}% APY</span>
                    </div>
                    <div className="sim-compare-rate">
                      {years}y · {fmt(initialBtc)} inicial
                      {monthlyBtc > 0 ? ` + ${fmt(monthlyBtc)}/mês` : ''}
                    </div>
                  </div>
                  <div className={`sim-compare-val ${c.main ? 'main' : 'sec'}`}>{fmt(c.data.returns)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FL({ href, label, ext, icon, color }: { href: string; label: string; ext?: boolean; icon: React.ReactNode; color?: string }) {
  return (
    <a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
      className={`footer-link${ext ? ' footer-link-ext' : ''}`} style={color ? { color } : undefined}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">{icon}</svg>
      {label}
    </a>
  )
}

export default function Home() {
  const { btcPrice } = useAppStore()
  const { connect } = useWallet()
  const { connected } = useAppStore()
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  const assets = [
    { id: 'ID-001', title: 'Asset Alpha', type: 'residential', badgeClass: 'badge-a', badgeLabel: 'Residential', desc: 'Tokenized residential property. Fractional ownership settled on Bitcoin via OP_NET smart contract.', apy: '15%', apyClass: 'pos', change: '+1.2%', available: 450, total: 1000, delay: 'd1' },
    { id: 'ID-002', title: 'Asset Beta', type: 'commercial', badgeClass: 'badge-b', badgeLabel: 'Commercial', desc: 'Commercial office space tokenized on OP_NET. Dividends distributed in satoshis monthly.', apy: '12%', apyClass: 'gold', change: '+0.8%', available: 700, total: 1000, delay: 'd2', imgStyle: { background: 'linear-gradient(135deg,#1a1a2e,#252540)' } as React.CSSProperties },
    { id: 'ID-003', title: 'Asset Gamma', type: 'industrial', badgeClass: 'badge-warn', badgeLabel: 'Industrial', desc: 'Industrial logistics hub. Tokenization pending final regulatory clearance. Join the waitlist.', apy: '~18%', apyClass: 'gold', change: '—', available: 300, total: 1000, delay: 'd3', imgStyle: { background: 'linear-gradient(135deg,#1a2e1a,#1a2520)' } as React.CSSProperties },
  ]

  const filteredAssets = assets.filter(a => {
    const matchType = activeFilter === 'all' || a.type === activeFilter
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <>
      {/* HERO */}
      <div className="hero-section" id="home">
        <div className="hero-content fade-in-up">
          <div className="hero-badge"><span className="hero-badge-dot" />Real Estate Investment Platform</div>
          <h1 className="hero-title">
            <span className="hero-title-white">Invest in Tokenized</span>
            <span className="hero-title-accent">Real Estate with</span>
            <span className="hero-title-accent">Bitcoin</span>
          </h1>
          <p className="hero-subtitle">Diversify your portfolio with real estate assets that outperform savings accounts. Invest as little as 0.001 BTC in premium properties.</p>
          <div className="hero-cta">
            <button className="btn-primary-lg" onClick={() => !connected && connect('opnet')}>Connect Wallet →</button>
            <a href="#simulator" className="btn-outline-lg">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              View Simulator
            </a>
          </div>
        </div>
        <div className="hero-stats fade-in">
          <div className="hero-stat"><div className="hero-stat-val">&#x20BF; Layer</div><span className="hero-stat-label">Native Bitcoin Settlement</span></div>
          <div className="hero-stat"><div className="hero-stat-val">OP_NET</div><span className="hero-stat-label">Smart Contract Protocol</span></div>
          <div className="hero-stat">
            <div className="hero-stat-val">{(btcPrice ?? 0) > 0 ? '$' + (btcPrice ?? 0).toLocaleString('en-US', { maximumFractionDigits: 0 }) : '15% p.a.'}</div>
            <span className="hero-stat-label">{(btcPrice ?? 0) > 0 ? 'BTC Price (Live)' : 'Projected Annual Yield'}</span>
          </div>
          <div className="hero-stat"><div className="hero-stat-val">0.5%</div><span className="hero-stat-label">Max Slippage</span></div>
          <div className="hero-stat"><div className="hero-stat-val">500+</div><span className="hero-stat-label">Early Investors</span></div>
          <div className="hero-stat"><div className="hero-stat-val">$2M+</div><span className="hero-stat-label">Total Volume Target</span></div>
        </div>
      </div>

      <div className="section-divider" />

      {/* ASSETS */}
      <section id="assets">
        <div className="ativos-header">
          <div>
            <div className="section-eyebrow">Portfolio</div>
            <h2 className="section-title">Available Assets</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>Fractionalized real estate backed by Bitcoin smart contracts on OP_NET.</p>
          </div>
          <a href="https://github.com/Opwabtc/" target="_blank" rel="noopener noreferrer" className="btn-link">
            View all on GitHub <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
        <div className="filter-row">
          <div className="filter-tabs">
            {["all","residential","commercial","industrial"].map(f => (<button key={f} className={`filter-tab${activeFilter===f ? " active" : ""}`} onClick={() => setActiveFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>))}
          </div>
          <div className="filter-right">
            <select className="filter-select"><option>Sort: APY</option><option>Sort: Price</option><option>Sort: Volume</option></select>
            <div className="filter-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="Search asset..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="ativos-grid">{filteredAssets.map(a => <AssetCard key={a.id} {...a} />)}</div>
      </section>

      <div className="section-divider" />

      {/* SIMULATOR */}
      <Simulator />

      <div className="section-divider" />

      {/* PARTNERS */}
      <div className="partners-section" id="partners">
        <div className="partners-label">Companies That Trust the Platform</div>
        <div className="partners-wrapper">
          <div className="partners-track">
            {['OP_NET Protocol','Bitcoin L1','OPScan','Vibecode','Mempool','OP_Wallet','DeFi Bible',
              'OP_NET Protocol','Bitcoin L1','OPScan','Vibecode','Mempool','OP_Wallet','DeFi Bible'].map((p, i) => (
              <div className="partner-slot" key={i}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* HOW IT WORKS */}
      <section id="how-it-works">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-eyebrow" style={{ display: 'inline-block', border: 'none', padding: 0 }}>Process</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>Four steps from Bitcoin wallet to tokenized real estate — fully on-chain.</p>
        </div>
        <div className="steps-grid">
          {[
            { n: '01', label: 'Connect', title: 'Link Your Wallet', desc: 'Connect OP_Wallet, UniSat, Xverse or OKX via Bitcoin browser extension to get started.',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><circle cx="16" cy="14" r="1" fill="currentColor"/><path d="M22 7V5a2 2 0 00-2-2H4a2 2 0 00-2 2v2"/></svg> },
            { n: '02', label: 'Select', title: 'Choose an Asset', desc: 'Browse tokenized properties. Each asset has real data: APY, availability, and contract info.',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
            { n: '03', label: 'Invest', title: 'Send BTC', desc: '1,000 sats per token. Transaction is simulated then signed and sent to the OP_NET L1 contract.',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
            { n: '04', label: 'Earn', title: 'Receive Yield', desc: 'Hold OPWAP tokens and receive stablecoin yield distributed directly on-chain.',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
          ].map(s => (
            <div className="step" key={s.n}>
              <div className="step-number">{s.n}</div>
              <div className="step-icon-wrap">{s.icon}</div>
              <div className="step-label">{s.label}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* STATUS BAR */}
      <div className="status-bar">
        <div className="status-item"><span className="dot" /><span>OP_NET Testnet</span></div>
        <div className="status-item"><span>Rate:</span><strong style={{ color: 'var(--accent)', marginLeft: 4 }}>1 OPWAP = 0.00001 BTC</strong></div>
        <div className="status-item"><span style={{ fontFamily: 'DM Mono,monospace', fontSize: 11 }}>opt1sqq047…g6xnp</span></div>
        <div className="status-item" style={{ marginLeft: 'auto' }}><span style={{ color: 'var(--text-3)' }}>OP_20</span></div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-mark">OP</div>
                <div className="footer-logo-name">OPWA</div>
              </div>
              <p className="footer-desc">OPWA is a fractionalized real estate investment platform built natively on Bitcoin, powered by the OP_NET smart contract protocol. Borderless, trustless, and transparent.</p>
              <div className="footer-socials">
                <a href="https://x.com/opwabtc" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter / X">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Platform</div>
              <div className="footer-links">
                <FL href="#assets" label="Assets" icon={<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>} />
                <FL href="#simulator" label="Simulator" icon={<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>} />
                <FL href="#how-it-works" label="How It Works" icon={<><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>} />
                <FL href="#partners" label="Partners" icon={<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></>} />
              </div>
            </div>

            <div>
              <div className="footer-col-title">Developers</div>
              <div className="footer-links">
                <FL href="https://github.com/Opwabtc/" label="GitHub" ext icon={<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>} />
                <FL href="https://dev.opnet.org/" label="Build on OP_NET" ext icon={<><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>} />
                <FL href="https://faucet.opnet.org/" label="Testnet Faucet" ext icon={<path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>} />
                <FL href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" label="Get OP_Wallet" ext icon={<><rect x="2" y="7" width="20" height="14" rx="2"/><circle cx="16" cy="14" r="1" fill="currentColor"/></>} />
                <FL href="https://opscan.org/?network=op_testnet" label="OPScan Explorer" ext icon={<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>} />
                <FL href="https://mempool.opnet.org/pt/testnet4" label="Mempool Testnet" ext icon={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>} />
              </div>
            </div>

            <div>
              <div className="footer-col-title">Resources</div>
              <div className="footer-links">
                <FL href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/CONTRACTS.md" label="Whitepaper" ext color="var(--gold)"
                  icon={<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>} />
                <FL href="https://defibible.org/" label="DeFi Bible" ext icon={<><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>} />
                <FL href="https://vibecode.finance/ecosystem" label="Vibecode Ecosystem" ext icon={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>} />
                <FL href="https://opscan.org/accounts/opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t?network=op_testnet" label="My OPScan Profile" ext icon={<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2025 OPWA Protocol. All rights reserved.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', fontSize: 11, fontWeight: 600, color: 'var(--accent)' }}>
              <span className="dot" style={{ width: 6, height: 6 }} />OP_NET Testnet
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
