import { useEffect, useState, useCallback } from "react"
import { useAppStore } from "../store/useAppStore"

const OPWAP_ADDRESS = import.meta.env.VITE_OPWAP_TOKEN_ADDRESS ?? "opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp"
const TOTAL_SUPPLY = 1_000_000_000

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "16px",
  padding: "1.5rem",
}
const label: React.CSSProperties = {
  fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em",
  color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "0.75rem",
}
const sub: React.CSSProperties = { color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginTop: "0.25rem" }

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

  useEffect(() => { fetchData(); const id = setInterval(fetchData, 30000); return () => clearInterval(id) }, [fetchData])

  const btcBal = walletSats / 1e8
  const portUsd = btcBal * btcPrice
  const pct = minted > 0 ? (minted / TOTAL_SUPPLY) * 100 : 0
  const f = (n: number, d = 2) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })

  if (!connected) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0a0a,#0d0d0d,#110e08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}></div>
        <h2 style={{ color: "#f5f0e8", fontSize: "1.5rem", margin: "0 0 0.5rem" }}>Connect your wallet</h2>
        <p style={{ color: "#7a7a7a" }}>Connect OPWallet to see your portfolio</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#090909 0%,#0d0d0d 50%,#100e06 100%)", paddingTop: "calc(var(--navbar-h) + 2rem)", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, color: "#f5f0e8", margin: 0, letterSpacing: "-0.02em" }}>My Portfolio</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ color: "#555", fontSize: "0.78rem", fontFamily: "monospace" }}>{walletAddr.slice(0,12)}...{walletAddr.slice(-4)}</span>
              <span style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.35)", color: "#f97316", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                OP_NET {network === "testnet" ? "Testnet" : "Mainnet"}
              </span>
              {updated && <span style={{ color: "#555", fontSize: "0.72rem" }}>Updated {updated}</span>}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", padding: "0.4rem 1rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%", display: "inline-block" }} />
              CONNECTED
            </div>
            <button onClick={fetchData} disabled={loading} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#f5f0e8", padding: "0.4rem 1rem", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600 }}>
              {loading ? "..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
          <div style={card}>
            <div style={label}>BTC BALANCE</div>
            <div style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 900, color: "#f5f0e8", letterSpacing: "-0.03em" }}>
              <span style={{ color: "#f97316", fontSize: "0.7em" }}>&#8383;</span> {btcBal.toFixed(8)}
            </div>
            <div style={sub}> ${f(portUsd)} USD</div>
          </div>
          <div style={card}>
            <div style={label}>OPWAP TOKENS</div>
            <div style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 900, color: "#f97316", letterSpacing: "-0.03em" }}>{f(opwapBal, 0)}</div>
            <div style={sub}>+12.4% this month</div>
          </div>
          <div style={card}>
            <div style={label}>PORTFOLIO USD</div>
            <div style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 900, color: "#fbbf24", letterSpacing: "-0.03em" }}>${f(portUsd)}</div>
            <div style={sub}>Live price</div>
          </div>
        </div>

        {/* Supply */}
        <div style={{ ...card, marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <div style={label}>OPWAP SUPPLY PROGRESS</div>
            <span style={{ color: "#f97316", fontWeight: 800, fontSize: "0.85rem" }}>{pct.toFixed(2)}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "3px", height: "5px", overflow: "hidden" }}>
            <div style={{ width: `${Math.max(pct, 0.05)}%`, height: "100%", background: "linear-gradient(90deg,#f97316,#fbbf24)", borderRadius: "3px", boxShadow: "0 0 8px rgba(249,115,22,0.5)", transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
            <span style={{ color: "#555", fontSize: "0.72rem" }}>{f(minted, 0)} minted</span>
            <span style={{ color: "#555", fontSize: "0.72rem" }}>1B max</span>
          </div>
        </div>

        {/* Holdings */}
        <div style={label}>TOKEN HOLDINGS</div>
        <div style={{ marginTop: "0.75rem", marginBottom: "2rem" }}>
          <div style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.07),rgba(251,191,36,0.03))", border: "1px solid rgba(249,115,22,0.18)", borderRadius: "16px", padding: "1.5rem", maxWidth: "270px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "#f97316" }}>OPWAP</span>
              <span style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", fontSize: "0.62rem", fontWeight: 700, padding: "0.15rem 0.45rem", borderRadius: "4px" }}>OP_20</span>
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#f5f0e8", marginBottom: "0.25rem" }}>{f(opwapBal, 0)}</div>
            <div style={{ color: "#555", fontSize: "0.78rem", marginBottom: "0.6rem" }}> {(opwapBal * 0.001).toFixed(6)} BTC</div>
            <div style={{ color: "#f97316", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.5rem" }}>&#9733; 15% APY</div>
            <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener noreferrer" style={{ color: "#f97316", fontSize: "0.78rem", textDecoration: "none" }}>View on OPScan </a>
          </div>
        </div>

        {/* All txs */}
        <a href={`https://opscan.org/?network=op_testnet&address=${walletAddr}`} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.25)", color: "#f97316", padding: "0.75rem 1.5rem", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "0.88rem" }}>
           View all transactions on OPScan
        </a>

      </div>
    </div>
  )
}