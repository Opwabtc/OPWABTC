import { useEffect, useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { useAppStore } from '../store/useAppStore'
interface Props { open: boolean; onClose: () => void }
export function WalletModal({ open, onClose }: Props) {
  const { connect } = useWallet()
  const network = useAppStore(s => s.network)
  const setWallet = useAppStore(s => s.setWallet)
  const [opInstalled, setOpInstalled] = useState(true)
  useEffect(() => { if (open) setOpInstalled(!!(window as any).opnet) }, [open])
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])
  const handleConnect = async (name: string) => { await connect(name); onClose() }
  return (
    <div className={`modal-backdrop ${open ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Connect Wallet</span>
          <button className="modal-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <p className="modal-subtitle">Connect your Bitcoin wallet to invest in tokenized real estate.</p>
        <div className="wallet-options">
          <button className="wallet-option wallet-option-primary" onClick={() => handleConnect('OP_Wallet')}>
            <div className="wallet-option-icon wallet-option-icon-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/><circle cx="16" cy="14" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <div className="wallet-option-name">OP_Wallet</div>
              <div className="wallet-option-desc">Official OP_NET wallet — recommended</div>
            </div>
            <span className="wallet-option-badge">Official</span>
          </button>
          {!opInstalled && (
            <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 14px',borderRadius:'10px',background:'rgba(249,115,22,0.06)',border:'1px solid rgba(249,115,22,0.2)',fontSize:'12px',color:'var(--text-2)'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>
              OP_Wallet not detected.{' '}
              <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noopener" style={{color:'var(--accent)',fontWeight:600}}>Install here</a>
            </div>
          )}
          {[{name:'Unisat',desc:'Popular Bitcoin wallet'},{name:'Xverse',desc:'Bitcoin & Ordinals wallet'},{name:'OKX',desc:'OKX multi-chain wallet'}].map(w => (
            <button key={w.name} className="wallet-option" onClick={() => handleConnect(w.name)}>
              <div className="wallet-option-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><circle cx="16" cy="14" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div><div className="wallet-option-name">{w.name}</div><div className="wallet-option-desc">{w.desc}</div></div>
            </button>
          ))}
        </div>
        <div style={{marginTop:'20px'}}>
          <div className="network-selector-label">Network</div>
          <div className="network-options">
            {['OP_NET Testnet','Mainnet'].map(n => (
              <button key={n} className={`network-option ${network === n ? 'active' : ''}`} onClick={() => setWallet({ network: n })}>
                <div className="network-option-name">{n}</div>
                <div className="network-option-status">
                  <span className="dot" style={{background: n==='OP_NET Testnet' ? 'var(--success)' : 'var(--text-3)'}}/>
                  {n==='OP_NET Testnet' ? 'Live' : 'Soon'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
