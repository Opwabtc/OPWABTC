import { useState, useEffect } from 'react'
import { useWallet, detectInstalledWallets } from '../hooks/useWallet'
import { useAppStore } from '../store/useAppStore'

interface Props { open: boolean; onClose: () => void }

const wallets = [
  {
    id: 'opnet', name: 'OP_Wallet', desc: 'Official Bitcoin L2 wallet for OP_NET',
    badge: 'OFFICIAL', primary: true,
    installUrl: 'https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb',
  },
  { id: 'unisat', name: 'UniSat',    desc: 'Popular Bitcoin & Ordinals wallet',  badge: '', primary: false, installUrl: 'https://unisat.io/' },
  { id: 'xverse', name: 'Xverse',    desc: 'Bitcoin wallet for the Web3 era',    badge: '', primary: false, installUrl: 'https://www.xverse.app/' },
  { id: 'okx',    name: 'OKX Wallet',desc: 'Multi-chain wallet by OKX Exchange', badge: '', primary: false, installUrl: 'https://www.okx.com/web3' },
]

const icons: Record<string, React.ReactNode> = {
  opnet: <div style={{width:40,height:40,borderRadius:10,background:'linear-gradient(135deg,#f97316,#ea580c)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:13,color:'#fff',boxShadow:'0 4px 14px rgba(249,115,22,.35)'}}>OP</div>,
  unisat:<div style={{width:40,height:40,borderRadius:10,background:'#1a1a2e',border:'1px solid rgba(255,255,255,.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'#818cf8'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg></div>,
  xverse:<div style={{width:40,height:40,borderRadius:10,background:'#1e1a2e',border:'1px solid rgba(255,255,255,.1)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="#a78bfa" strokeWidth="2" fill="rgba(139,92,246,.15)"/><text x="12" y="16" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="800" fontFamily="Syne,sans-serif">X</text></svg></div>,
  okx:   <div style={{width:40,height:40,borderRadius:10,background:'#0d0d0d',border:'1px solid rgba(255,255,255,.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'#e5e5e5'}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg></div>,
}

export default function WalletModal({ open, onClose }: Props) {
  const { connect } = useWallet()
  const { network, setNetwork } = useAppStore()
  const [installed, setInstalled] = useState<Record<string, boolean>>({})
  const [connecting, setConnecting] = useState<string | null>(null)

  useEffect(() => { if (open) setInstalled(detectInstalledWallets()) }, [open])

  async function handleConnect(id: string) {
    setConnecting(id)
    try { await connect(id); onClose() } finally { setConnecting(null) }
  }

  if (!open) return null

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(8px)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={onClose}>
      <div style={{background:'#131313',border:'1px solid rgba(255,255,255,.08)',borderRadius:20,padding:28,width:'100%',maxWidth:400,boxShadow:'0 24px 80px rgba(0,0,0,.75)'}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
          <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:18}}>Connect Wallet</div>
          <button onClick={onClose} style={{width:32,height:32,borderRadius:8,background:'#1e1e1e',border:'1px solid rgba(255,255,255,.08)',color:'#a3a3a3',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:16}}>âœ•</button>
        </div>
        <div style={{fontSize:13,color:'#a3a3a3',marginBottom:24}}>Choose your Bitcoin wallet to get started</div>

        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
          {wallets.map(w => {
            const isInstalled = installed[w.id]
            const isConnecting = connecting === w.id
            return (
              <button key={w.id} onClick={() => handleConnect(w.id)} disabled={!!isConnecting}
                style={{display:'flex',alignItems:'center',gap:14,padding:'14px 16px',borderRadius:12,width:'100%',textAlign:'left',background:w.primary?'linear-gradient(135deg,rgba(249,115,22,.14),rgba(234,88,12,.06))':'#1e1e1e',border:w.primary?'1px solid rgba(249,115,22,.35)':'1px solid rgba(255,255,255,.07)',cursor:isConnecting?'wait':'pointer',opacity:isConnecting?0.7:1,transition:'all .15s'}}>
                {icons[w.id]}
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <span style={{fontSize:14,fontWeight:600,color:'#f5f5f5'}}>{w.name}</span>
                    {w.badge && <span style={{padding:'2px 7px',borderRadius:4,fontSize:10,fontWeight:700,textTransform:'uppercase' as const,background:'rgba(249,115,22,.15)',border:'1px solid rgba(249,115,22,.3)',color:'#f97316'}}>{w.badge}</span>}
                    {isInstalled && <span style={{padding:'2px 7px',borderRadius:4,fontSize:10,fontWeight:700,background:'rgba(16,185,129,.12)',border:'1px solid rgba(16,185,129,.25)',color:'#10b981'}}>INSTALLED</span>}
                  </div>
                  <div style={{fontSize:12,color:'#525252',marginTop:2}}>{w.desc}</div>
                </div>
                <div style={{fontSize:12,color:isConnecting?'#f97316':'#525252',flexShrink:0}}>{isConnecting?'â³':isInstalled?'â†’':'â†—'}</div>
              </button>
            )
          })}
        </div>

        <div style={{padding:'12px 14px',borderRadius:10,background:'rgba(249,115,22,.07)',border:'1px solid rgba(249,115,22,.2)',marginBottom:20,display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
          <span style={{fontSize:12,color:'#a3a3a3'}}>Don&apos;t have OP_Wallet?</span>
          <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noopener noreferrer" style={{fontSize:12,fontWeight:600,color:'#f97316',whiteSpace:'nowrap' as const}}>Install from Chrome Web Store â†—</a>
        </div>

        <div>
          <div style={{fontSize:11,fontWeight:700,color:'#525252',textTransform:'uppercase' as const,letterSpacing:'.08em',marginBottom:10}}>SELECT NETWORK</div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={() => setNetwork('op_testnet')} style={{flex:1,padding:'10px 12px',borderRadius:10,textAlign:'center' as const,background:network==='op_testnet'?'rgba(249,115,22,.12)':'#1e1e1e',border:network==='op_testnet'?'1px solid rgba(249,115,22,.35)':'1px solid rgba(255,255,255,.07)',cursor:'pointer',transition:'all .15s'}}>
              <div style={{fontSize:12,fontWeight:600,color:network==='op_testnet'?'#f97316':'#f5f5f5'}}>Testnet</div>
              <div style={{fontSize:10,color:'#10b981',marginTop:2,display:'flex',alignItems:'center',justifyContent:'center',gap:4}}><span style={{width:5,height:5,borderRadius:'50%',background:'#10b981',display:'inline-block'}}/>Active</div>
            </button>
            <button disabled style={{flex:1,padding:'10px 12px',borderRadius:10,textAlign:'center' as const,background:'#1a1a1a',border:'1px solid rgba(255,255,255,.05)',cursor:'not-allowed',opacity:0.5}}>
              <div style={{fontSize:12,fontWeight:600,color:'#525252'}}>Mainnet</div>
              <div style={{fontSize:10,color:'#525252',marginTop:2}}>Soon</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}