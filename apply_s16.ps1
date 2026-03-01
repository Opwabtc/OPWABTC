# apply_s16.ps1 — Escreve todos os arquivos do fix s16 diretamente
# Run: Set-ExecutionPolicy -Scope Process Bypass; .\apply_s16.ps1

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }

function Write-Source($rel, $content) {
    $abs = Join-Path $root $rel
    $dir = Split-Path $abs -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    [System.IO.File]::WriteAllText($abs, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "OK $rel" -ForegroundColor Green
}

# ── useToast.ts ──────────────────────────────────────────────────────
Write-Source "src/hooks/useToast.ts" @'
export function useToast() {
  function dispatch(type: 'success' | 'error' | 'info', title: string, desc: string) {
    window.dispatchEvent(new CustomEvent('opwa:toast', { detail: { type, title, desc, id: Date.now() } }))
  }
  return {
    success: (title: string, desc = '') => dispatch('success', title, desc),
    error:   (title: string, desc = '') => dispatch('error', title, desc),
    info:    (title: string, desc = '') => dispatch('info', title, desc),
  }
}
'@

# ── useWallet.ts ─────────────────────────────────────────────────────
Write-Source "src/hooks/useWallet.ts" @'
import { useAppStore } from '../store/useAppStore'
import { useToast } from './useToast'

declare global {
  interface Window {
    opnet?: {
      requestAccounts: () => Promise<string[]>
      getBalance?: () => Promise<{ confirmed: number; unconfirmed: number; total: number }>
      getPublicKey?: () => Promise<string>
      on?: (event: string, cb: (...args: unknown[]) => void) => void
    }
    unisat?: {
      requestAccounts: () => Promise<string[]>
      getBalance?: () => Promise<{ confirmed: number; unconfirmed: number; total: number }>
      getPublicKey?: () => Promise<string>
      on?: (event: string, cb: (...args: unknown[]) => void) => void
    }
    BitcoinProvider?: {
      request: (method: string, params?: unknown) => Promise<unknown>
    }
    okxwallet?: {
      bitcoin?: {
        requestAccounts: () => Promise<string[]>
        getBalance?: () => Promise<{ confirmed: number; unconfirmed: number; total: number }>
        on?: (event: string, cb: (...args: unknown[]) => void) => void
      }
    }
  }
}

export function detectInstalledWallets(): Record<string, boolean> {
  return {
    opnet:  typeof window !== 'undefined' && !!window.opnet,
    unisat: typeof window !== 'undefined' && !!window.unisat,
    xverse: typeof window !== 'undefined' && !!window.BitcoinProvider,
    okx:    typeof window !== 'undefined' && !!(window.okxwallet?.bitcoin),
  }
}

export function useWallet() {
  const store = useAppStore()
  const toast = useToast()

  async function connect(walletName: string) {
    try {
      let address = ''
      let sats = 0
      let pubKey = ''

      if (walletName === 'opnet' || walletName === 'OP_Wallet') {
        if (!window.opnet) {
          toast.error('OP_Wallet not found', 'Install the Chrome extension first')
          window.open('https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb', '_blank')
          return
        }
        const accounts = await window.opnet.requestAccounts()
        if (!accounts || accounts.length === 0) throw new Error('No accounts returned')
        address = accounts[0]
        if (window.opnet.getBalance) {
          const bal = await window.opnet.getBalance()
          sats = bal?.total ?? 0
        }
        if (window.opnet.getPublicKey) pubKey = (await window.opnet.getPublicKey()) ?? ''
        if (window.opnet.on) {
          window.opnet.on('accountsChanged', (accs: unknown) => {
            const a = accs as string[]
            if (!a || a.length === 0) store.disconnect()
            else store.setWallet({ walletAddr: a[0] })
          })
        }
      } else if (walletName === 'unisat' || walletName === 'Unisat') {
        if (!window.unisat) {
          toast.error('UniSat not found', 'Install UniSat Wallet extension first')
          window.open('https://unisat.io/', '_blank')
          return
        }
        const accounts = await window.unisat.requestAccounts()
        if (!accounts || accounts.length === 0) throw new Error('No accounts returned')
        address = accounts[0]
        if (window.unisat.getBalance) { const bal = await window.unisat.getBalance(); sats = bal?.total ?? 0 }
        if (window.unisat.getPublicKey) pubKey = (await window.unisat.getPublicKey()) ?? ''
        if (window.unisat.on) {
          window.unisat.on('accountsChanged', (accs: unknown) => {
            const a = accs as string[]
            if (!a || a.length === 0) store.disconnect()
            else store.setWallet({ walletAddr: a[0] })
          })
        }
      } else if (walletName === 'xverse' || walletName === 'Xverse') {
        if (!window.BitcoinProvider) {
          toast.error('Xverse not found', 'Install Xverse Wallet extension first')
          window.open('https://www.xverse.app/', '_blank')
          return
        }
        const res = await window.BitcoinProvider.request('getAccounts', { purposes: ['payment', 'ordinals'] }) as { address: string }[]
        if (!res || res.length === 0) throw new Error('No accounts returned')
        address = res[0].address
      } else if (walletName === 'okx' || walletName === 'OKX') {
        if (!window.okxwallet?.bitcoin) {
          toast.error('OKX Wallet not found', 'Install OKX Wallet extension first')
          window.open('https://www.okx.com/web3', '_blank')
          return
        }
        const accounts = await window.okxwallet.bitcoin.requestAccounts()
        if (!accounts || accounts.length === 0) throw new Error('No accounts returned')
        address = accounts[0]
        if (window.okxwallet.bitcoin.getBalance) { const bal = await window.okxwallet.bitcoin.getBalance(); sats = bal?.total ?? 0 }
      } else {
        if (window.opnet) return connect('opnet')
        if (window.unisat) return connect('unisat')
        toast.error('No wallet found', 'Install OP_Wallet, UniSat, Xverse or OKX')
        return
      }

      store.setWallet({ connected: true, wallet: walletName, walletAddr: address, walletSats: sats, publicKey: pubKey })
      toast.success('Wallet connected!', address.slice(0, 8) + '...' + address.slice(-6))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('User rejected') || msg.includes('cancelled') || msg.includes('denied')) {
        toast.info('Connection cancelled', 'User rejected the request')
      } else {
        toast.error('Connection failed', msg)
      }
    }
  }

  function disconnect() {
    store.disconnect()
    toast.info('Wallet disconnected', '')
  }

  function requireWallet(cb: () => void) {
    if (!store.connected) {
      toast.error('Wallet required', 'Please connect your wallet first')
      return
    }
    cb()
  }

  return { connect, disconnect, requireWallet }
}
'@

# ── WalletModal.tsx ───────────────────────────────────────────────────
Write-Source "src/components/WalletModal.tsx" @'
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
          <button onClick={onClose} style={{width:32,height:32,borderRadius:8,background:'#1e1e1e',border:'1px solid rgba(255,255,255,.08)',color:'#a3a3a3',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:16}}>✕</button>
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
                <div style={{fontSize:12,color:isConnecting?'#f97316':'#525252',flexShrink:0}}>{isConnecting?'⏳':isInstalled?'→':'↗'}</div>
              </button>
            )
          })}
        </div>

        <div style={{padding:'12px 14px',borderRadius:10,background:'rgba(249,115,22,.07)',border:'1px solid rgba(249,115,22,.2)',marginBottom:20,display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
          <span style={{fontSize:12,color:'#a3a3a3'}}>Don&apos;t have OP_Wallet?</span>
          <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noopener noreferrer" style={{fontSize:12,fontWeight:600,color:'#f97316',whiteSpace:'nowrap' as const}}>Install from Chrome Web Store ↗</a>
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
'@

# ── Layout.tsx ────────────────────────────────────────────────────────
Write-Source "src/components/Layout.tsx" @'
import React, { useState, useEffect } from 'react'
import Navigation from './Navigation'
import WalletModal from './WalletModal'
import { GasConverterWidget } from './GasConverterWidget'
import { ToastContainer } from './ToastContainer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [walletOpen, setWalletOpen] = useState(false)

  useEffect(() => {
    const handler = () => setWalletOpen(true)
    window.addEventListener('opwa:open-wallet-modal', handler)
    return () => window.removeEventListener('opwa:open-wallet-modal', handler)
  }, [])

  return (
    <>
      <Navigation onConnectClick={() => setWalletOpen(true)} />
      <main style={{ paddingTop: 'var(--navbar-h)' }}>{children}</main>
      <GasConverterWidget />
      <ToastContainer />
      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  )
}
'@

# ── Dashboard.tsx ─────────────────────────────────────────────────────
Write-Source "src/pages/Dashboard.tsx" @'
import React, { useEffect, useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'

const OPWAP_ADDRESS = import.meta.env.VITE_OPWAP_TOKEN_ADDRESS || 'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp'
const OPNET_RPC     = 'https://testnet.opnet.org'
const OPSCAN_BASE   = 'https://opscan.org'

function formatAmt(raw: string, dec: number): string {
  if (!raw || raw === '0') return '0'
  try {
    const n = BigInt(raw)
    const d = BigInt(10 ** dec)
    const whole = n / d
    const frac  = n % d
    if (frac === 0n) return whole.toLocaleString()
    return whole.toLocaleString() + '.' + frac.toString().padStart(dec, '0').replace(/0+$/, '').slice(0, 4)
  } catch { return '0' }
}

async function rpcCall(tokenAddr: string, data: string): Promise<string | null> {
  try {
    const res = await fetch(OPNET_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to: tokenAddr, data }, 'latest'] }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    const j = await res.json()
    return j.result ?? null
  } catch { return null }
}

export default function Dashboard() {
  const { connected, walletAddr, walletSats, btcPrice } = useAppStore()
  const [opwapBal, setOpwapBal] = useState('0')
  const [supply,   setSupply]   = useState('0')
  const [loading,  setLoading]  = useState(false)
  const [updated,  setUpdated]  = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    if (!walletAddr) return
    setLoading(true)
    try {
      const addr64 = walletAddr.replace('0x', '').padStart(64, '0')
      const [balHex, supHex] = await Promise.all([
        rpcCall(OPWAP_ADDRESS, '0x70a08231' + addr64),
        rpcCall(OPWAP_ADDRESS, '0x18160ddd'),
      ])
      if (balHex) setOpwapBal(BigInt(balHex).toString())
      if (supHex) setSupply(BigInt(supHex).toString())
      setUpdated(new Date())
    } finally { setLoading(false) }
  }, [walletAddr])

  useEffect(() => {
    fetchData()
    const t = setInterval(fetchData, 30_000)
    return () => clearInterval(t)
  }, [fetchData])

  if (!connected) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{textAlign:'center',maxWidth:380,padding:'52px 36px',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.09)',borderRadius:20}}>
        <div style={{fontSize:48,marginBottom:16}}>🔐</div>
        <div style={{fontFamily:'Syne,sans-serif',fontSize:22,fontWeight:800,marginBottom:12}}>Connect Your Wallet</div>
        <div style={{fontSize:14,color:'#a3a3a3',marginBottom:28,lineHeight:1.6}}>Connect your Bitcoin wallet to view your portfolio and token balances on OP_NET.</div>
        <a href="/" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 24px',background:'linear-gradient(135deg,#f97316,#ea580c)',borderRadius:10,color:'#fff',fontWeight:600,fontSize:14,textDecoration:'none'}}>← Go Home to Connect</a>
      </div>
    </div>
  )

  const btcBtc  = walletSats / 1e8
  const btcUsd  = btcBtc * (btcPrice || 0)
  const opwapN  = formatAmt(opwapBal, 8)
  const opwapBtc = Number(opwapBal) / 1e8 * 0.00001
  const opwapUsd = opwapBtc * (btcPrice || 0)
  const totalUsd = btcUsd + opwapUsd

  const SUPPLY_MAX = 18_000_000_000
  const supplyNum  = Number(BigInt(supply || '0')) / 1e8
  const supplyPct  = Math.min(100, (supplyNum / SUPPLY_MAX) * 100)
  const supplyFmt  = formatAmt(supply, 8)
  const short      = walletAddr ? walletAddr.slice(0,10) + '...' + walletAddr.slice(-4) : ''
  const opscanUrl  = `${OPSCAN_BASE}/accounts/${walletAddr}?network=op_testnet`

  return (
    <div style={{minHeight:'100vh',padding:'104px 0 64px'}}>
      <div style={{maxWidth:960,margin:'0 auto',padding:'0 24px'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:36,gap:16,flexWrap:'wrap'}}>
          <div>
            <h1 style={{fontSize:'2rem',fontWeight:800,fontFamily:'Syne,sans-serif',margin:'0 0 6px'}}>My Portfolio</h1>
            <div style={{fontSize:13,color:'rgba(255,255,255,.38)',fontFamily:'monospace',display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
              <span>{short}</span>
              <span style={{color:'rgba(255,255,255,.15)'}}>·</span>
              <span style={{color:'#f97316'}}>OP_NET Testnet</span>
              {updated && <><span style={{color:'rgba(255,255,255,.15)'}}>·</span><span style={{color:'rgba(255,255,255,.25)',fontSize:11}}>Updated {updated.toLocaleTimeString()}</span></>}
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
            {loading && <div style={{fontSize:11,color:'#f97316',display:'flex',alignItems:'center',gap:6}}><span style={{width:6,height:6,borderRadius:'50%',background:'#f97316',display:'inline-block'}}/>Syncing...</div>}
            <div style={{padding:'6px 14px',borderRadius:20,background:'rgba(16,185,129,.12)',border:'1px solid rgba(16,185,129,.25)',fontSize:12,fontWeight:600,color:'#10b981',display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#10b981',display:'inline-block'}}/>CONNECTED
            </div>
            <button onClick={fetchData} style={{padding:'6px 12px',borderRadius:8,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',color:'rgba(255,255,255,.6)',fontSize:12,cursor:'pointer'}}>↻ Refresh</button>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:24}}>
          {[
            { label:'BTC BALANCE',    value:'₿ ' + btcBtc.toFixed(5),        sub:'≈ $' + btcUsd.toFixed(2) + ' USD',      color:'#f5f5f5' },
            { label:'OPWAP TOKENS',   value:opwapN,                           sub:'▲ +12.4% this month',                    color:'#f97316' },
            { label:'PORTFOLIO USD',  value:'$' + totalUsd.toFixed(0),        sub:'Live price',                            color:'#fbbf24' },
          ].map(c => (
            <div key={c.label} style={{background:'linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.018))',border:'1px solid rgba(255,255,255,.09)',borderRadius:14,padding:'22px 20px'}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'rgba(255,255,255,.38)',marginBottom:10}}>{c.label}</div>
              <div style={{fontSize:26,fontWeight:800,fontFamily:'Syne,sans-serif',color:c.color,marginBottom:4}}>{c.value}</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.38)'}}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Supply Progress */}
        <div style={{background:'rgba(255,255,255,.038)',border:'1px solid rgba(255,255,255,.08)',borderRadius:14,padding:'20px 22px',marginBottom:24}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'rgba(255,255,255,.5)'}}>OPWAP SUPPLY PROGRESS</span>
            <span style={{color:'#f97316',fontWeight:700,fontSize:12}}>{supplyPct.toFixed(2)}%</span>
          </div>
          <div style={{height:7,background:'rgba(255,255,255,.08)',borderRadius:4,overflow:'hidden',marginBottom:8}}>
            <div style={{height:'100%',width:`${supplyPct}%`,background:'linear-gradient(90deg,#f97316,#fbbf24)',borderRadius:4,transition:'width .6s ease'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'rgba(255,255,255,.28)'}}>
            <span>{supplyFmt} minted</span><span>18B max</span>
          </div>
        </div>

        {/* Holdings */}
        <div style={{marginBottom:28}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase' as const,color:'rgba(255,255,255,.35)',marginBottom:14,paddingBottom:8,borderBottom:'1px solid rgba(255,255,255,.06)'}}>TOKEN HOLDINGS</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))',gap:16}}>
            <div style={{background:'linear-gradient(135deg,rgba(249,115,22,.09),rgba(251,191,36,.04))',border:'1px solid rgba(249,115,22,.22)',borderRadius:14,padding:22}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                <span style={{fontWeight:800,fontSize:16,color:'#f97316'}}>OPWAP</span>
                <span style={{fontSize:11,background:'rgba(34,197,94,.18)',color:'#4ade80',borderRadius:20,padding:'3px 9px',fontWeight:700}}>OP_20</span>
              </div>
              <div style={{fontSize:26,fontWeight:900,color:'#fff',marginBottom:4}}>{loading && opwapBal === '0' ? '...' : opwapN}</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,.38)',marginBottom:10}}>≈ {opwapBtc.toFixed(6)} BTC</div>
              <div style={{fontSize:12,color:'#4ade80',fontWeight:700,marginBottom:10}}>▲ 15% APY</div>
              <a href={`${OPSCAN_BASE}/token/${OPWAP_ADDRESS}?network=op_testnet`} target="_blank" rel="noopener noreferrer" style={{color:'#f97316',textDecoration:'none',fontSize:11,fontWeight:600}}>View on OPScan ↗</a>
            </div>
          </div>
        </div>

        {/* OPScan Link */}
        <a href={opscanUrl} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:8,color:'#f97316',fontSize:14,fontWeight:600,textDecoration:'none',border:'1px solid rgba(249,115,22,.28)',borderRadius:9,padding:'11px 18px',background:'rgba(249,115,22,.07)'}}>
          ↗ View all transactions on OPScan
        </a>
      </div>
    </div>
  )
}
'@

# ── Patch useAppStore — add setWallet + setNetwork if missing ─────────
$storePath = Join-Path $root "src/store/useAppStore.ts"
if (Test-Path $storePath) {
  $store = Get-Content $storePath -Raw
  if (-not $store.Contains("setWallet")) {
    $store = $store -replace "disconnect\s*:\s*\(\)", "setWallet: (data: Partial<{connected:boolean;wallet:string;walletAddr:string;walletSats:number;publicKey:string}>) => set(data),`n  disconnect: ()"
    [System.IO.File]::WriteAllText($storePath, $store, [System.Text.UTF8Encoding]::new($false))
    Write-Host "OK src/store/useAppStore.ts (patched setWallet)" -ForegroundColor Green
  } else {
    Write-Host "OK src/store/useAppStore.ts (already has setWallet)" -ForegroundColor Yellow
  }
  # Add setNetwork if missing
  $store = Get-Content $storePath -Raw
  if (-not $store.Contains("setNetwork")) {
    $store = $store -replace "setTheme\s*:", "setNetwork: (network: string) => set({ network }),`n  setTheme:"
    [System.IO.File]::WriteAllText($storePath, $store, [System.Text.UTF8Encoding]::new($false))
    Write-Host "OK src/store/useAppStore.ts (patched setNetwork)" -ForegroundColor Green
  }
}

# ── Patch Home.tsx — Connect Wallet button uses custom event ──────────
$homePath = Join-Path $root "src/pages/Home.tsx"
if (Test-Path $homePath) {
  $home = Get-Content $homePath -Raw
  $old = "onClick={() => !connected && connect('opnet')}>Connect Wallet"
  $new = "onClick={() => { if (!connected) window.dispatchEvent(new CustomEvent('opwa:open-wallet-modal')) }}>Connect Wallet"
  if ($home.Contains($old)) {
    $home = $home.Replace($old, $new)
    [System.IO.File]::WriteAllText($homePath, $home, [System.Text.UTF8Encoding]::new($false))
    Write-Host "OK src/pages/Home.tsx (patched CTA button)" -ForegroundColor Green
  } else {
    Write-Host "SKIP src/pages/Home.tsx (pattern not found, may already be patched)" -ForegroundColor Yellow
  }
}

# ── Patch App.tsx — add Dashboard route if missing ────────────────────
$appPath = Join-Path $root "src/App.tsx"
if (Test-Path $appPath) {
  $app = Get-Content $appPath -Raw
  if (-not $app.Contains("Dashboard")) {
    $app = $app -replace "import Home from", "import Dashboard from './pages/Dashboard'`nimport Home from"
    if (-not $app.Contains("/dashboard")) {
      $app = $app -replace '<Route path="/"', '<Route path="/dashboard" element={<Dashboard />} />' + "`n        " + '<Route path="/"'
    }
    [System.IO.File]::WriteAllText($appPath, $app, [System.Text.UTF8Encoding]::new($false))
    Write-Host "OK src/App.tsx (added Dashboard route)" -ForegroundColor Green
  } else {
    Write-Host "OK src/App.tsx (Dashboard already present)" -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  apply_s16 DONE! Now run:" -ForegroundColor Cyan
Write-Host "  npx tsc --noEmit" -ForegroundColor White
Write-Host "  git add src/" -ForegroundColor White
Write-Host "  git commit -m 'feat: s16 wallet+dashboard+badges'" -ForegroundColor White
Write-Host "  git push origin main" -ForegroundColor White
Write-Host "================================================" -ForegroundColor Cyan
