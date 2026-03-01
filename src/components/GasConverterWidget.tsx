import { useState } from "react"
import { useAppStore } from "../store/useAppStore"

export function GasConverterWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const { gasPrice, btcPrice } = useAppStore()
  const gasSat = gasPrice || 1
  const txUsd = btcPrice ? ((gasSat * 250) / 1e8 * btcPrice).toFixed(4) : null

  const convert = () => {
    const val = parseFloat(input)
    if (!val || isNaN(val)) { setResult("Enter a valid BTC amount"); return }
    if (!btcPrice) { setResult("Price loading..."); return }
    setResult((val * btcPrice).toLocaleString("en-US", { style: "currency", currency: "USD" }))
  }

  return (
    <>
      <div className={"gas-converter-widget" + (open ? " open" : "")} id="gasWidget">
        <div className="gcw-header">
          <span className="gcw-title">Gas Converter</span>
          <div className="gcw-live">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
            Live
          </div>
        </div>
        <div className="gcw-rows">
          <div className="gcw-row">
            <span className="gcw-row-label">Gas (sat/vB)</span>
            <span className="gcw-row-val">{gasSat}</span>
          </div>
          <div className="gcw-row">
            <span className="gcw-row-label">BTC / USD</span>
            <span className="gcw-row-val accent">{btcPrice ? "$" + btcPrice.toLocaleString("en-US") : "Loading..."}</span>
          </div>
          <div className="gcw-row">
            <span className="gcw-row-label">Typical Tx (USD)</span>
            <span className="gcw-row-val gold">{txUsd ? "~$" + txUsd : "..."}</span>
          </div>
        </div>
        <div className="gcw-divider" />
        <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8 }}>Convert BTC value to USD</div>
        <div className="gcw-input-row">
          <input className="gcw-input" type="number" placeholder="BTC amount" value={input} onChange={e => setInput(e.target.value)} />
          <button className="gcw-convert-btn" onClick={convert}>USD</button>
        </div>
        {result && <div className="gcw-result">{result}</div>}
      </div>

      <button
        onClick={() => setOpen(v => !v)}
        title={open ? "Close Gas Converter" : "Gas Converter"}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 999,
          width: 46, height: 46, borderRadius: "50%",
          border: "2px solid #ae005b",
          background: open ? "#ae005b" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s, box-shadow 0.2s",
          boxShadow: open
            ? "0 0 0 4px rgba(174,0,91,0.25), 0 4px 20px rgba(174,0,91,0.4)"
            : "0 4px 16px rgba(174,0,91,0.3)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke={open ? "white" : "#ae005b"} strokeWidth="2.2">
          <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
        </svg>
      </button>
    </>
  )
}
