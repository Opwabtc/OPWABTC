import { useEffect, useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Link } from 'react-router-dom'
import { getContract, JSONRpcProvider, OP_20_ABI } from 'opnet'
import { networks } from '@btc-vision/bitcoin'
import { Address } from '@btc-vision/transaction'
import { CONTRACTS } from '../contracts/config'
import { useOPNETWallet } from '../hooks/useOPNETWallet'

// FIX SF-05: use SDK getContract() instead of raw eth_call with EVM selectors
// FIX SF-05: SUPPLY_MAX 18B → 1B (OPWA max supply)
// FIX: hashedMLDSAKey comes from useOPNETWallet, not useAppStore

const NETWORK     = networks.opnetTestnet
const TESTNET_RPC = 'https://testnet.opnet.org'
const OPSCAN_BASE = 'https://opscan.org'

const _provider = new JSONRpcProvider({ url: TESTNET_RPC, network: NETWORK })

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

function _hexToBytes(hex: string): Uint8Array {
  const clean = (hex || '').replace(/^0x/, '')
  const out = new Uint8Array(clean.length / 2)
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  return out
}

export default function Dashboard() {
  const { connected, walletAddr, walletSats, btcPrice } = useAppStore()
  // FIX: hashedMLDSAKey and publicKey come from useOPNETWallet, not useAppStore
  const { hashedMLDSAKey, publicKey, address: sdkAddress } = useOPNETWallet()

  const [opwapBal, setOpwapBal] = useState('0')
  const [supply,   setSupply]   = useState('0')
  const [loading,  setLoading]  = useState(false)
  const [updated,  setUpdated]  = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    if (!walletAddr || !CONTRACTS.opwaCoin) return
    setLoading(true)
    try {
      // Build Address from hashedMLDSAKey + publicKey if available, else use SDK address
      let callerAddr: Address | undefined = sdkAddress ?? undefined

      if (!callerAddr && hashedMLDSAKey && publicKey) {
        try {
          callerAddr = new Address(_hexToBytes(hashedMLDSAKey), _hexToBytes(publicKey))
        } catch (_) {}
      }

      const contract = getContract(
        CONTRACTS.opwaCoin,
        OP_20_ABI,
        _provider,
        NETWORK,
        callerAddr,
      ) as unknown as {
        balanceOf(addr: Address): Promise<{ properties: { balance: bigint }; revert?: string }>
        totalSupply(): Promise<{ properties: { totalSupply: bigint }; revert?: string }>
      }

      const userAddr = callerAddr ?? new Address(new Uint8Array(32), new Uint8Array(33))

      const [balRes, supRes] = await Promise.all([
        contract.balanceOf(userAddr).catch(() => null),
        contract.totalSupply().catch(() => null),
      ])

      if (balRes && !balRes.revert) setOpwapBal(String(balRes.properties.balance ?? 0n))
      if (supRes && !supRes.revert) setSupply(String(supRes.properties.totalSupply ?? 0n))
      setUpdated(new Date())
    } catch (e) {
      console.error('[Dashboard] fetchData error:', e)
    } finally {
      setLoading(false)
    }
  }, [walletAddr, publicKey, hashedMLDSAKey, sdkAddress])

  useEffect(() => {
    fetchData()
    const t = setInterval(fetchData, 30_000)
    return () => clearInterval(t)
  }, [fetchData])

  if (!connected) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{textAlign:'center',maxWidth:380,padding:'52px 36px',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.09)',borderRadius:20}}>
        <div style={{fontSize:48,marginBottom:16}}>🔒</div>
        <div style={{fontFamily:'Syne,sans-serif',fontSize:22,fontWeight:800,marginBottom:12,color:'var(--text-1)'}}>Connect Your Wallet</div>
        <div style={{fontSize:14,color:'var(--text-2)',marginBottom:28,lineHeight:1.6}}>Connect your Bitcoin wallet to view your portfolio and token balances on OP_NET.</div>
        <Link to="/" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 24px',background:'linear-gradient(135deg,#f97316,#ea580c)',borderRadius:10,color:'#fff',fontWeight:600,fontSize:14,textDecoration:'none'}}>→ Go Home to Connect</Link>
      </div>
    </div>
  )

  const btcBtc   = walletSats / 1e8
  const btcUsd   = btcBtc * (btcPrice || 0)
  const opwapN   = formatAmt(opwapBal, 8)
  const opwapBtc = Number(opwapBal) / 1e8 * 0.00001
  const opwapUsd = opwapBtc * (btcPrice || 0)
  const totalUsd = btcUsd + opwapUsd

  // FIX SF-05: was 18_000_000_000 — OPWA max supply is 1B
  const SUPPLY_MAX = 1_000_000_000
  const supplyNum  = Number(BigInt(supply || '0')) / 1e8
  const supplyPct  = Math.min(100, (supplyNum / SUPPLY_MAX) * 100)
  const supplyFmt  = formatAmt(supply, 8)
  const short      = walletAddr ? walletAddr.slice(0,10) + '...' + walletAddr.slice(-4) : ''
  const opscanUrl  = `${OPSCAN_BASE}/accounts/${walletAddr}?network=op_testnet`
  const tokenAddr  = CONTRACTS.opwaCoin || ''

  return (
    <div style={{minHeight:'100vh',padding:'104px 0 64px'}}>
      <div style={{maxWidth:960,margin:'0 auto',padding:'0 24px'}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:36,gap:16,flexWrap:'wrap'}}>
          <div>
            <h1 style={{fontSize:'2rem',fontWeight:800,fontFamily:'Syne,sans-serif',color:'var(--text-1)',margin:'0 0 6px'}}>My Portfolio</h1>
            <div style={{fontSize:13,color:'var(--text-3)',fontFamily:'DM Mono,monospace',display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
              <span>{short}</span>
              <span style={{color:'rgba(255,255,255,.15)'}}>·</span>
              <span style={{color:'#f97316'}}>OP_NET Testnet</span>
              {updated && <><span style={{color:'rgba(255,255,255,.15)'}}>·</span><span style={{color:'var(--text-3)',fontSize:11}}>Updated {updated.toLocaleTimeString()}</span></>}
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
            {loading && <div style={{fontSize:11,color:'#f97316',display:'flex',alignItems:'center',gap:6}}><span style={{width:6,height:6,borderRadius:'50%',background:'#f97316',display:'inline-block'}}/>Syncing...</div>}
            <div style={{padding:'6px 14px',borderRadius:20,background:'rgba(16,185,129,.12)',border:'1px solid rgba(16,185,129,.25)',fontSize:12,fontWeight:600,color:'#10b981',display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#10b981',display:'inline-block'}}/>CONNECTED
            </div>
            <button onClick={fetchData} style={{padding:'6px 12px',borderRadius:8,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',color:'var(--text-2)',fontSize:12,cursor:'pointer'}}>↻ Refresh</button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:24}}>
          {[
            {label:'BTC BALANCE',   value:'₿ ' + btcBtc.toFixed(5),  sub:'≈ $' + btcUsd.toFixed(2) + ' USD',  color:'var(--text-1)'},
            {label:'OPWAP TOKENS',  value:opwapN,                      sub:'Staking active',                    color:'#f97316'},
            {label:'PORTFOLIO USD', value:'$' + totalUsd.toFixed(0),   sub:'Live price',                        color:'#fbbf24'},
          ].map(c => (
            <div key={c.label} style={{background:'linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.018))',border:'1px solid rgba(255,255,255,.09)',borderRadius:14,padding:'22px 20px'}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'var(--text-3)',marginBottom:10}}>{c.label}</div>
              <div style={{fontSize:26,fontWeight:800,fontFamily:'Syne,sans-serif',color:c.color,marginBottom:4}}>{c.value}</div>
              <div style={{fontSize:13,color:'var(--text-2)'}}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{background:'rgba(255,255,255,.038)',border:'1px solid rgba(255,255,255,.08)',borderRadius:14,padding:'20px 22px',marginBottom:24}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'var(--text-2)'}}>OPWAP SUPPLY PROGRESS</span>
            <span style={{color:'#f97316',fontWeight:700,fontSize:12}}>{supplyPct.toFixed(2)}%</span>
          </div>
          <div style={{height:7,background:'rgba(255,255,255,.08)',borderRadius:4,overflow:'hidden',marginBottom:8}}>
            <div style={{height:'100%',width:`${supplyPct}%`,background:'linear-gradient(90deg,#f97316,#fbbf24)',borderRadius:4,transition:'width .6s ease'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--text-3)'}}>
            <span>{supplyFmt} minted</span><span>1B max</span>
          </div>
        </div>

        <div style={{marginBottom:28}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase' as const,color:'var(--text-3)',marginBottom:14,paddingBottom:8,borderBottom:'1px solid rgba(255,255,255,.06)'}}>TOKEN HOLDINGS</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))',gap:16}}>
            <div style={{background:'linear-gradient(135deg,rgba(249,115,22,.09),rgba(251,191,36,.04))',border:'1px solid rgba(249,115,22,.22)',borderRadius:14,padding:22}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                <span style={{fontWeight:800,fontSize:16,color:'#f97316'}}>OPWAP</span>
                <span style={{fontSize:11,background:'rgba(34,197,94,.18)',color:'#4ade80',borderRadius:20,padding:'3px 9px',fontWeight:700}}>OP_20</span>
              </div>
              <div style={{fontSize:26,fontWeight:900,color:'#fff',marginBottom:4}}>{loading && opwapBal === '0' ? '...' : opwapN}</div>
              <div style={{fontSize:12,color:'var(--text-2)',marginBottom:10}}>≈ {opwapBtc.toFixed(6)} BTC</div>
              <div style={{fontSize:12,color:'#4ade80',fontWeight:700,marginBottom:10}}>▲ 15% APY</div>
              {tokenAddr && (
                <a href={`${OPSCAN_BASE}/token/${tokenAddr}?network=op_testnet`} target="_blank" rel="noopener noreferrer" style={{color:'#f97316',textDecoration:'none',fontSize:11,fontWeight:600}}>View on OPScan ↗</a>
              )}
            </div>
          </div>
        </div>

        <a href={opscanUrl} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:8,color:'#f97316',fontSize:14,fontWeight:600,textDecoration:'none',border:'1px solid rgba(249,115,22,.28)',borderRadius:9,padding:'11px 18px',background:'rgba(249,115,22,.07)'}}>
          ↗ View all transactions on OPScan
        </a>
      </div>
    </div>
  )
}
