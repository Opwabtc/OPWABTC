import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { ThemeToggle } from './ThemeToggle'
import { WalletModal } from './WalletModal'
export function Navigation() {
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)
  const { connected, walletAddr, walletSats, btcPrice, gasPrice } = useAppStore()
  const { disconnect } = useWallet()
  const shortAddr = walletAddr ? walletAddr.slice(0,8) + '…' + walletAddr.slice(-6) : ''
  const btcBal = (walletSats / 1e8).toFixed(6)
  const gasSat = gasPrice || 10
  const txUsd = btcPrice ? ((gasSat * 250) / 1e8 * btcPrice).toFixed(4) : null
  const copyAddress = () => {
    if (walletAddr) navigator.clipboard?.writeText(walletAddr).catch(()=>{})
    window.dispatchEvent(new CustomEvent('opwa-toast', { detail: { type:'success', title:'Copied!', desc:'Address copied.' } }))
    setDdOpen(false)
  }
  const links = [{href:'#assets',label:'Assets'},{href:'#simulator',label:'Simulator'},{href:'#how-it-works',label:'How It Works'},{href:'#partners',label:'Partners'}]
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#home" className="navbar-logo"><span className="logo-op">OP</span><span className="logo-wa">WA</span></a>
          <div className="navbar-links">
            {links.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
          </div>
          <div className="navbar-right">
            <div className="gas-ticker">
              <svg className="gas-ticker-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
              </svg>
              <span>{gasSat} sat/vB</span>
              {txUsd && <span className="gas-ticker-usd">({'$' + txUsd})</span>}
            </div>
            <ThemeToggle />
            {!connected ? (
              <button className="btn-primary" onClick={() => setModalOpen(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><circle cx="16" cy="14" r="1" fill="currentColor"/>
                </svg>
                Connect Wallet
              </button>
            ) : (
              <div style={{position:'relative'}}>
                <div className="wallet-connected" onClick={() => setDdOpen(v => !v)}>
                  <div className="wallet-balance">
                    <svg className="wallet-balance-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span>{btcBal}</span>
                  </div>
                  <div className="wallet-addr"><span className="wallet-dot"/><span>{shortAddr}</span></div>
                  <button className="wallet-chevron">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                </div>
                {ddOpen && (
                  <div className="wallet-dropdown open" style={{display:'block'}}>
                    <div className="wd-address">{walletAddr}</div>
                    <div className="wd-balance">{'₿ ' + btcBal}</div>
                    {btcPrice && <div className="wd-balance-usd">{'≈ $' + ((walletSats/1e8)*btcPrice).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>}
                    <div className="wd-divider"/>
                    <div className="wd-actions">
                      <button className="wd-action" onClick={copyAddress}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                        Copy Address
                      </button>
                      <button className="wd-action danger" onClick={() => { disconnect(); setDdOpen(false) }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button className="btn-menu" onClick={() => setMenuOpen(v => !v)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu open">
            {links.map(l => <a key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{l.label}</a>)}
            {!connected && <button className="btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={() => { setModalOpen(true); setMenuOpen(false) }}>Connect Wallet</button>}
          </div>
        )}
      </nav>
      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
