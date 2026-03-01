import { useEffect, useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { getContract, OP_20_ABI, JSONRpcProvider } from 'opnet'
import { Address } from '@btc-vision/transaction'
import { networks } from '@btc-vision/bitcoin'

const CONTRACT_ADDRESS = (import.meta.env.VITE_OPWAP_TOKEN_ADDRESS as string) || 'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp'
const NETWORK = networks.opnetTestnet
const BTC_TO_SATS = 100_000_000
const TOKEN_DECIMALS = 1e8

function _hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/, '')
  const out = new Uint8Array(clean.length / 2)
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  return out
}

interface PortfolioPoint { month: string; value: number }

function MiniChart({ data, color = '#f97316' }: { data: PortfolioPoint[]; color?: string }) {
  if (data.length < 2) return null
  const vals = data.map(d => d.value)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const range = max - min || 1
  const W = 300, H = 80
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((d.value - min) / range) * (H - 10) - 5
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 80 }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <polygon points={`0,${H} ${pts} ${W},${H}`} fill="url(#chartGrad)"/>
    </svg>
  )
}

export default function Dashboard() {
  const { connected, walletAddr, walletSats, btcPrice, publicKey } = useAppStore()
  const { connect } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [txHistory] = useState<{ hash: string; amount: number; date: string }[]>([])

  // Gera dados de crescimento simulados baseados no saldo atual
  const chartData: PortfolioPoint[] = balance !== null ? Array.from({ length: 7 }, (_, i) => {
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    const growth = 1 + (i / 6) * 0.15
    return { month: months[i], value: +(balance * growth * 0.00001 * (btcPrice || 65000)).toFixed(2) }
  }) : []

  const fetchBalance = useCallback(async () => {
    if (!walletAddr || !publicKey) return
    setLoading(true)
    try {
      const pubkeyBytes = _hexToBytes(publicKey)
      const senderAddress = new Address(new Uint8Array(32), pubkeyBytes)
      const provider = new JSONRpcProvider({ url: 'https://testnet.opnet.org', network: NETWORK })
      const contract = getContract<any>(CONTRACT_ADDRESS, OP_20_ABI, provider, NETWORK, senderAddress)
      const result = await contract.balanceOf(senderAddress)
      if (result && result.balance !== undefined) {
        setBalance(Number(result.balance) / TOKEN_DECIMALS)
      }
    } catch (e) {
      console.error('[OPWA Dashboard] balanceOf error:', e)
    } finally {
      setLoading(false)
    }
  }, [walletAddr, publicKey])

  useEffect(() => { if (connected) fetchBalance() }, [connected, fetchBalance])

  const btcBalance = walletSats ? walletSats / BTC_TO_SATS : 0
  const btcUsd = btcBalance * (btcPrice || 0)
  const opwapUsd = (balance || 0) * 0.00001 * (btcPrice || 0)
  const totalUsd = btcUsd + opwapUsd

  if (!connected) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-dim)', border: '2px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2"/><circle cx="16" cy="14" r="1" fill="currentColor"/>
          </svg>
        </div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--text-1)' }}>Connect to view Dashboard</div>
        <div style={{ fontSize: 14, color: 'var(--text-3)', textAlign: 'center', maxWidth: 340 }}>Your portfolio, OPWAP balance and investment history will appear here after connecting your wallet.</div>
        <button className="btn-primary-lg" style={{ marginTop: 8 }} onClick={() => connect('opnet')}>Connect Wallet →</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div className="section-eyebrow">My Account</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--text-1)', margin: '4px 0 6px' }}>Portfolio Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-3)', fontFamily: 'DM Mono, monospace' }}>
          <span className="dot" style={{ background: 'var(--success)' }}/>
          {walletAddr ? walletAddr.slice(0, 12) + '…' + walletAddr.slice(-6) : '—'}
          <span style={{ marginLeft: 4, padding: '2px 8px', borderRadius: 10, background: 'var(--accent-dim)', color: 'var(--accent)', fontSize: 11 }}>OP_NET Testnet</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Portfolio (USD)', value: '$' + totalUsd.toLocaleString('en-US', { maximumFractionDigits: 2 }), sub: 'BTC + OPWAP', color: 'var(--accent)' },
          { label: 'BTC Balance', value: btcBalance.toFixed(6) + ' BTC', sub: '$' + btcUsd.toLocaleString('en-US', { maximumFractionDigits: 2 }), color: '#f7931a' },
          { label: 'OPWAP Tokens', value: loading ? '...' : (balance !== null ? balance.toLocaleString() : '—'), sub: '≈ $' + opwapUsd.toFixed(2), color: 'var(--gold)' },
          { label: 'BTC Price', value: btcPrice ? '$' + btcPrice.toLocaleString('en-US') : '—', sub: 'Live · CoinGecko', color: '#22c55e' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      {chartData.length > 1 && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Portfolio Growth</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--text-1)', marginTop: 2 }}>
                ${chartData[chartData.length - 1]?.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(34,197,94,.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,.2)', fontWeight: 700 }}>+15% APY</span>
          </div>
          <MiniChart data={chartData} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {chartData.map(d => <span key={d.month} style={{ fontSize: 10, color: 'var(--text-3)' }}>{d.month}</span>)}
          </div>
        </div>
      )}

      {/* Assets owned */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px', marginBottom: 24 }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-1)' }}>My Assets</div>
        {(balance || 0) > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { name: 'Asset Alpha', type: 'Residential', tokens: Math.floor((balance || 0) * 0.5), apy: '15%', color: 'var(--accent)' },
              { name: 'Asset Beta', type: 'Commercial', tokens: Math.floor((balance || 0) * 0.3), apy: '12%', color: 'var(--gold)' },
              { name: 'Asset Gamma', type: 'Industrial', tokens: Math.floor((balance || 0) * 0.2), apy: '~18%', color: '#22c55e' },
            ].filter(a => a.tokens > 0).map(a => (
              <div key={a.name} style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{a.type}</div>
                <div style={{ fontWeight: 700, color: 'var(--text-1)', marginBottom: 6 }}>{a.name}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, color: a.color }}>{a.tokens.toLocaleString()} OPWAP</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>APY: <span style={{ color: a.color }}>{a.apy}</span></div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-3)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 10, opacity: .4 }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
            <div style={{ fontSize: 14 }}>No assets yet. <a href="/#assets" style={{ color: 'var(--accent)' }}>Invest now →</a></div>
          </div>
        )}
      </div>

      {/* Tx history */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text-1)' }}>Transaction History</div>
          <a href={`https://opscan.org/accounts/${walletAddr}?network=op_testnet`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--accent)' }}>View on OPScan ↗</a>
        </div>
        {txHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-3)', fontSize: 13 }}>
            No transactions yet. Your mint history will appear here.
          </div>
        ) : txHistory.map(tx => (
          <div key={tx.hash} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
            <div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'var(--text-3)' }}>{tx.hash.slice(0, 16)}…</div>
              <div style={{ color: 'var(--text-2)', marginTop: 2 }}>{tx.date}</div>
            </div>
            <div style={{ color: 'var(--accent)', fontWeight: 700 }}>+{tx.amount} OPWAP</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button onClick={fetchBalance} style={{ fontSize: 12, color: 'var(--text-3)', background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 16px', cursor: 'pointer' }}>
          {loading ? 'Refreshing...' : '↻ Refresh Balance'}
        </button>
      </div>
    </div>
  )
}
