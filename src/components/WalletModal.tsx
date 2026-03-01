import { useEffect, useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { useAppStore } from '../store/useAppStore'

interface Props { open: boolean; onClose: () => void }

// Logos reais de cada wallet em SVG/PNG via CDN
function OPWalletLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#f97316"/>
      <text x="50" y="68" textAnchor="middle" fontSize="52" fontWeight="900" fontFamily="Arial" fill="white">OP</text>
    </svg>
  )
}
function UnisatLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#1a1a1a"/>
      <circle cx="50" cy="50" r="28" stroke="#f97316" strokeWidth="8"/>
      <circle cx="50" cy="50" r="12" fill="#f97316"/>
    </svg>
  )
}
function XverseLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#7B3FE4"/>
      <text x="50" y="68" textAnchor="middle" fontSize="52" fontWeight="900" fontFamily="Arial" fill="white">X</text>
    </svg>
  )
}
function OKXLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#000"/>
      <rect x="28" y="28" width="16" height="16" fill="white"/>
      <rect x="52" y="28" width="16" height="16" fill="white"/>
      <rect x="28" y="56" width="16" height="16" fill="white"/>
      <rect x="52" y="56" width="16" height="16" fill="white"/>
      <rect x="40" y="40" width="16" height="16" fill="white"/>
    </svg>
  )
}

const WALLETS = [
  { name: 'Unisat', desc: 'Popular Bitcoin wallet', Logo: UnisatLogo },
  { name: 'Xverse', desc: 'Bitcoin & Ordinals wallet', Logo: XverseLogo },
  { name: 'OKX', desc: 'OKX multi-chain wallet', Logo: OKXLogo },
]

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
          {/* OP_Wallet — primário */}
          <button className="wallet-option wallet-option-primary" onClick={() => handleConnect('OP_Wallet')}>
            <div className="wallet-option-icon wallet-option-icon-primary">
              <OPWalletLogo />
            </div>
            <div>
              <div className="wallet-option-name">OP_Wallet</div>
              <div className="wallet-option-desc">Official OP_NET wallet — recommended</div>
            </div>
            <span className="wallet-option-badge">Official</span>
          </button>

          {/* Aviso + download se não instalado */}
          {!opInstalled && (
            <a
              href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 16px', borderRadius: 12, textDecoration: 'none',
                background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.35)',
                fontSize: 12, color: 'var(--text-1)', transition: 'background .2s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: 1 }}>OP_Wallet not detected</div>
                <div style={{ color: 'var(--text-3)' }}>Click to install from Chrome Web Store →</div>
              </div>
            </a>
          )}

          {/* Outras wallets */}
          {WALLETS.map(({ name, desc, Logo }) => (
            <button key={name} className="wallet-option" onClick={() => handleConnect(name)}>
              <div className="wallet-option-icon">
                <Logo />
              </div>
              <div>
                <div className="wallet-option-name">{name}</div>
                <div className="wallet-option-desc">{desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Network selector */}
        <div style={{ marginTop: 20 }}>
          <div className="network-selector-label">Network</div>
          <div className="network-options">
            {['OP_NET Testnet', 'Mainnet'].map(n => (
              <button key={n} className={`network-option ${network === n ? 'active' : ''}`} onClick={() => setWallet({ network: n })}>
                <div className="network-option-name">{n}</div>
                <div className="network-option-status">
                  <span className="dot" style={{ background: n === 'OP_NET Testnet' ? 'var(--success)' : 'var(--text-3)' }}/>
                  {n === 'OP_NET Testnet' ? 'Live' : 'Soon'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
