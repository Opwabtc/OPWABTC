import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
export function GasConverterWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const { gasPrice, btcPrice } = useAppStore()
  const gasSat = gasPrice || 10
  const txUsd = btcPrice ? ((gasSat * 250) / 1e8 * btcPrice).toFixed(4) : null
  const convert = () => {
    const val = parseFloat(input)
    if (!val || isNaN(val)) { setResult('Enter a valid BTC amount'); return }
    if (!btcPrice) { setResult('Price unavailable'); return }
    setResult((val * btcPrice).toLocaleString('en-US', { style:'currency', currency:'USD' }))
  }
  return (
    <div className={'gas-converter-widget' + (open ? ' open' : '')} id="gasWidget">
      <div className="gcw-header">
        <span className="gcw-title">Gas Converter</span>
        <button className="gcw-close" onClick={() => setOpen(false)}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div className="gcw-rows">
        <div className="gcw-row">
          <div className="gcw-row-icon gas"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg></div>
          <span className="gcw-row-label">Gas (sat/vB)</span>
          <span className="gcw-row-val">{gasSat + ' sat/vB'}</span>
        </div>
        <div className="gcw-row">
          <div className="gcw-row-icon btc"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
          <span className="gcw-row-label">BTC Price</span>
          <span className="gcw-row-val">{btcPrice ? '$' + btcPrice.toLocaleString('en-US') : '—'}</span>
        </div>
        <div className="gcw-row">
          <div className="gcw-row-icon usd"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
          <span className="gcw-row-label">Tx Cost</span>
          <span className="gcw-row-val">{txUsd ? '~$' + txUsd : '—'}</span>
        </div>
      </div>
      <div className="gcw-divider"/>
      <div className="gcw-converter">
        <input className="gcw-input" type="number" placeholder="Amount in BTC" value={input} onChange={e => setInput(e.target.value)} />
        <button className="gcw-convert-btn" onClick={convert}>Convert</button>
        {result && <div className="gcw-result">{result}</div>}
      </div>
      <button className={'gcw-toggle-btn' + (open ? ' widget-open' : '')} onClick={() => setOpen(v => !v)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
        </svg>
      </button>
    </div>
  )
}
