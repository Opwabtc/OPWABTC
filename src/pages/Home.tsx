import React, { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { useInvestment } from '../hooks/useInvestment'

// Taxa: 1 token = 0.00001 BTC = 1000 sats
const SATS_PER_TOKEN = 1000
const BTC_TO_SATS = 100_000_000
const BTC_PER_TOKEN = SATS_PER_TOKEN / BTC_TO_SATS // 0.00001

function normalizeBtcInput(raw: string): number {
  // Aceita vírgula ou ponto como separador decimal
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
  // Mostra até 8 casas decimais, remove zeros desnecessários
  return btc.toFixed(8).replace(/\.?0+$/, '')
}

interface AssetCardProps {
  title: string
  location: string
  apy: string
  available: number
  total: number
}

function AssetCard({ title, location, apy, available, total }: AssetCardProps) {
  const { connected } = useAppStore()
  const { connect } = useWallet()
  const { invest, loading, error, result, reset } = useInvestment()

  const [open, setOpen] = useState(false)
  const [btcRaw, setBtcRaw] = useState('')
  const [tokensRaw, setTokensRaw] = useState('')

  // Quando BTC muda → atualiza tokens
  const handleBtcChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setBtcRaw(raw)
    const btc = normalizeBtcInput(raw)
    if (btc > 0) {
      setTokensRaw(String(calcTokensFromBtc(btc)))
    } else {
      setTokensRaw('')
    }
  }, [])

  // Quando tokens muda → atualiza BTC
  const handleTokensChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '') // só inteiros
    setTokensRaw(raw)
    const tokens = parseInt(raw, 10)
    if (!isNaN(tokens) && tokens > 0) {
      setBtcRaw(calcBtcFromTokens(tokens))
    } else {
      setBtcRaw('')
    }
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!connected) {
      connect('opnet')
      return
    }
    const btc = normalizeBtcInput(btcRaw)
    if (btc <= 0) return
    await invest(btc)
  }, [connected, connect, btcRaw, invest])

  const handleOpen = useCallback(() => {
    reset()
    setBtcRaw('')
    setTokensRaw('')
    setOpen(true)
  }, [reset])

  const progressPct = Math.min(100, Math.round(((total - available) / total) * 100))
  const btcValue = normalizeBtcInput(btcRaw)
  const tokenCount = calcTokensFromBtc(btcValue)
  const isValidAmount = btcValue >= BTC_PER_TOKEN

  return (
    <div className="asset-card">
      <div className="asset-header">
        <h3>{title}</h3>
        <span className="asset-location">{location}</span>
      </div>

      <div className="asset-stats">
        <div className="stat">
          <span className="stat-label">APY</span>
          <span className="stat-value accent">{apy}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Network</span>
          <span className="stat-value">OP_NET</span>
        </div>
      </div>

      <div className="availability-bar">
        <div className="availability-label">
          <span>Availability</span>
          <span>{available.toLocaleString()} / {total.toLocaleString()} tokens</span>
        </div>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {!open ? (
        <button className="btn-invest" onClick={handleOpen}>
          Invest Now →
        </button>
      ) : (
        <div className="invest-form">
          <button className="btn-close" onClick={() => { setOpen(false); reset() }}>
            Close ✕
          </button>

          <div className="form-section-title">INVESTMENT DETAILS</div>

          {/* BTC input */}
          <div className="input-group">
            <label htmlFor={`btc-${title}`}>Amount (BTC)</label>
            <input
              id={`btc-${title}`}
              type="text"
              inputMode="decimal"
              placeholder="0.00001"
              value={btcRaw}
              onChange={handleBtcChange}
            />
            {btcRaw && !isValidAmount && (
              <span className="input-hint error">Minimum: 0.00001 BTC (1 token)</span>
            )}
          </div>

          {/* Tokens input */}
          <div className="input-group">
            <label htmlFor={`tokens-${title}`}>Number of tokens</label>
            <input
              id={`tokens-${title}`}
              type="text"
              inputMode="numeric"
              placeholder="1"
              value={tokensRaw}
              onChange={handleTokensChange}
            />
            <span className="input-hint">1 token = 0.00001 BTC (1,000 sats)</span>
          </div>

          {/* Preview */}
          {isValidAmount && tokenCount > 0 && (
            <div className="preview-box">
              <span>You will receive</span>
              <strong>{tokenCount.toLocaleString()} OPWAP</strong>
              <span className="preview-sub">≈ {btcValue.toFixed(8)} BTC</span>
            </div>
          )}

          {/* Errors */}
          {error && (
            <div className="error-msg">{error}</div>
          )}

          {/* Success */}
          {result && (
            <div className="success-msg">
              ✅ Mint successful!{' '}
              <a href={result.opscanUrl} target="_blank" rel="noopener noreferrer">
                View on OPScan ↗
              </a>
            </div>
          )}

          {/* Confirm button */}
          <button
            className="btn-confirm"
            onClick={handleConfirm}
            disabled={loading || (!connected ? false : !isValidAmount)}
          >
            {loading
              ? 'Processing...'
              : !connected
              ? 'Connect Wallet'
              : `Confirm Investment`}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const { btcPrice } = useAppStore()

  const assets = [
    {
      title: 'Asset Alpha — São Paulo Office',
      location: 'São Paulo, BR',
      apy: '12.4%',
      available: 550,
      total: 1000,
    },
    {
      title: 'Asset Beta — Rio Residential',
      location: 'Rio de Janeiro, BR',
      apy: '9.8%',
      available: 750,
      total: 1000,
    },
  ]

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <h1>Onchain Proof of World Asset</h1>
        <p>
          Real estate tokenization on Bitcoin Layer 1 via OP_NET.
          Acquire fractionalized property exposure — capital deployed in BTC,
          yield in stablecoins.
        </p>
        {(btcPrice ?? 0) > 0 && (
          <div className="btc-ticker">
            BTC: <strong>${(btcPrice ?? 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
          </div>
        )}
      </section>

      {/* Assets */}
      <section className="assets">
        <h2>Featured Properties</h2>
        <div className="assets-grid">
          {assets.map(asset => (
            <AssetCard key={asset.title} {...asset} />
          ))}
        </div>
      </section>

      {/* Info */}
      <section className="info-bar">
        <div className="info-item">
          <span>Rate</span>
          <strong>1 OPWAP = 0.00001 BTC</strong>
        </div>
        <div className="info-item">
          <span>Network</span>
          <strong>OP_NET Testnet</strong>
        </div>
        <div className="info-item">
          <span>Contract</span>
          <strong>opt1sqq047...g6xnp</strong>
        </div>
        <div className="info-item">
          <span>Standard</span>
          <strong>OP_20</strong>
        </div>
      </section>
    </main>
  )
}
