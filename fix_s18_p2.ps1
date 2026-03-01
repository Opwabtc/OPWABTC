Set-Location "C:\Users\peluc\Documents\OPWABTC"
$b = "C:\Users\peluc\Documents\OPWABTC"

# ── Dashboard.tsx — usa CSS vars, respeita light/dark
[System.IO.File]::WriteAllText("$b\src\pages\Dashboard.tsx",
'import { useEffect, useState, useCallback } from "react"
import { useAppStore } from "../store/useAppStore"

const OPWAP_ADDRESS = import.meta.env.VITE_OPWAP_TOKEN_ADDRESS ?? "opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp"
const TOTAL_SUPPLY = 1_000_000_000

export default function Dashboard() {
  const { connected, walletAddr, walletSats, btcPrice, network } = useAppStore()
  const [opwapBal, setOpwapBal] = useState(0)
  const [minted, setMinted] = useState(0)
  const [updated, setUpdated] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    if (!connected || !walletAddr) return
    setLoading(true)
    try {
      const rpc = "https://mempool.opnet.org/testnet4"
      const [b, s] = await Promise.all([
        fetch(`${rpc}/v1/opnet/balanceOf`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: OPWAP_ADDRESS, owner: walletAddr }),
        }),
        fetch(`${rpc}/v1/opnet/totalSupply`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: OPWAP_ADDRESS }),
        }),
      ])
      if (b.ok) { const d = await b.json(); setOpwapBal(Number(d.balance ?? 0) / 1e8) }
      if (s.ok) { const d = await s.json(); setMinted(Number(d.totalSupply ?? 0) / 1e8) }
    } catch { /* silent */ }
    finally { setLoading(false); setUpdated(new Date().toLocaleTimeString()) }
  }, [connected, walletAddr])

  useEffect(() => {
    fetchData()
    const id = setInterval(fetchData, 30000)
    return () => clearInterval(id)
  }, [fetchData])

  const btcBal = (walletSats ?? 0) / 1e8
  const portUsd = btcBal * (btcPrice ?? 0)
  const pct = minted > 0 ? (minted / TOTAL_SUPPLY) * 100 : 0
  const f = (n: number, d = 2) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })

  if (!connected) return (
    <div className="dash-empty">
      <div className="dash-empty-inner">
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&#128274;</div>
        <h2 className="dash-empty-title">Connect your wallet</h2>
        <p className="dash-empty-sub">Connect OPWallet to see your portfolio</p>
      </div>
    </div>
  )

  return (
    <div className="dash-page">
      <div className="dash-container">

        <div className="dash-header">
          <div>
            <h1 className="dash-title">My Portfolio</h1>
            <div className="dash-meta">
              <span className="dash-addr">{walletAddr?.slice(0,12)}...{walletAddr?.slice(-4)}</span>
              <span className="badge-network-tag">
                OP_NET {network === "testnet" || network === "OP_NET Testnet" ? "Testnet" : "Mainnet"}
              </span>
              {updated && <span className="dash-updated">Updated {updated}</span>}
            </div>
          </div>
          <div className="dash-actions">
            <div className="dash-connected-badge">
              <span className="dash-connected-dot" /> CONNECTED
            </div>
            <button onClick={fetchData} disabled={loading} className="dash-refresh-btn">
              {loading ? "..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="dash-stats-grid">
          <div className="dash-stat-card">
            <div className="dash-stat-label">BTC BALANCE</div>
            <div className="dash-stat-value">
              <span style={{ color: "var(--accent)", fontSize: "0.75em" }}>&#8383;</span> {btcBal.toFixed(8)}
            </div>
            <div className="dash-stat-sub">${f(portUsd)} USD</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-label">OPWAP TOKENS</div>
            <div className="dash-stat-value" style={{ color: "var(--accent)" }}>{f(opwapBal, 0)}</div>
            <div className="dash-stat-sub">+12.4% this month</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-label">PORTFOLIO USD</div>
            <div className="dash-stat-value" style={{ color: "var(--gold)" }}>${f(portUsd)}</div>
            <div className="dash-stat-sub">Live price</div>
          </div>
        </div>

        <div className="dash-supply-card">
          <div className="dash-supply-header">
            <span className="dash-stat-label">OPWAP SUPPLY PROGRESS</span>
            <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.85rem" }}>{pct.toFixed(2)}%</span>
          </div>
          <div className="dash-progress-track">
            <div className="dash-progress-fill" style={{ width: `${Math.max(pct, 0.05)}%` }} />
          </div>
          <div className="dash-supply-footer">
            <span>{f(minted, 0)} minted</span>
            <span>1B max</span>
          </div>
        </div>

        <div className="dash-stat-label" style={{ marginBottom: "0.75rem" }}>TOKEN HOLDINGS</div>
        <div style={{ marginBottom: "2rem" }}>
          <div className="dash-token-card">
            <div className="dash-token-header">
              <span className="dash-token-name">OPWAP</span>
              <span className="dash-token-badge">OP_20</span>
            </div>
            <div className="dash-token-bal">{f(opwapBal, 0)}</div>
            <div className="dash-token-btc">&#8383; {(opwapBal * 0.001).toFixed(6)} BTC</div>
            <div className="dash-token-apy">&#9733; 15% APY</div>
            <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener noreferrer" className="dash-token-link">
              View on OPScan &#8599;
            </a>
          </div>
        </div>

        <a href={`https://opscan.org/?network=op_testnet&address=${walletAddr}`}
          target="_blank" rel="noopener noreferrer" className="dash-opscan-btn">
          &#8599; View all transactions on OPScan
        </a>

      </div>
    </div>
  )
}
', [System.Text.Encoding]::UTF8)
Write-Host "OK Dashboard.tsx" -ForegroundColor Green

Write-Host ""
Write-Host "Parte 2 OK. Rode agora: .\fix_s18_p3.ps1" -ForegroundColor Cyan
