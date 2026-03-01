const fs = require('fs');
const content = `import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useLivePrices } from '../hooks/useLivePrices';

const OPWAP_ADDR = (import.meta as any).env?.VITE_OPWAP_TOKEN_ADDRESS || 'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp';

export default function Dashboard() {
  const { connected, walletAddr, walletSats } = useAppStore();
  const { btcPrice } = useLivePrices();
  const [opwapBal, setOpwapBal] = useState<number | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const btcVal = walletSats != null ? walletSats / 1e8 : 0;
  const usdVal = btcPrice ? btcVal * btcPrice : 0;

  useEffect(() => {
    if (!connected || !walletAddr) { setLoading(false); return; }
    let cancelled = false;
    async function load() {
      try {
        const mod = await import('@btc-vision/transaction');
        const { JSONRpcProvider, getContract, networks } = mod;
        const NET = (networks as any).opnetTestnet;
        const provider = new JSONRpcProvider({ url: 'https://testnet.opnet.org', network: NET });
        const ABI: any[] = [
          { name: 'balanceOf', type: 'function', inputs: [{ name: 'address', type: 'address' }], outputs: [{ name: 'balance', type: 'uint256' }] },
          { name: 'totalSupply', type: 'function', inputs: [], outputs: [{ name: 'supply', type: 'uint256' }] },
        ];
        const c = getContract<any>(OPWAP_ADDR, ABI, provider, NET);
        const [b, s] = await Promise.allSettled([c.balanceOf(walletAddr), c.totalSupply()]);
        if (cancelled) return;
        if (b.status === 'fulfilled') {
          const raw = (b.value as any)?.properties?.balance ?? (b.value as any)?.result?.balance ?? (b.value as any)?.balance;
          if (raw != null) setOpwapBal(Number(raw));
        }
        if (s.status === 'fulfilled') {
          const raw = (s.value as any)?.properties?.supply ?? (s.value as any)?.result?.supply ?? (s.value as any)?.supply;
          if (raw != null) setTotalSupply(Number(raw));
        }
      } catch(e) { console.warn('[Dashboard]', e); }
      finally { if (!cancelled) setLoading(false); }
    }
    load();
    const iv = setInterval(load, 30000);
    return () => { cancelled = true; clearInterval(iv); };
  }, [connected, walletAddr]);

  if (!connected) return (
    <div className="dashboard-gate">
      <div className="dashboard-gate-card">
        <div style={{fontSize:'3rem',marginBottom:'16px'}}>lock</div>
        <h2 style={{marginBottom:'8px'}}>Connect Your Wallet</h2>
        <p style={{color:'rgba(255,255,255,.45)',marginBottom:'24px'}}>Connect to view your portfolio dashboard.</p>
        <Link to="/" className="btn-primary" style={{display:'inline-block',textDecoration:'none',padding:'12px 28px'}}>Go to Home</Link>
      </div>
    </div>
  );

  const short = walletAddr ? walletAddr.slice(0,8) + '...' + walletAddr.slice(-6) : '';
  const supplyPct = totalSupply != null ? Math.min((totalSupply / 1e8 / 1e9) * 100, 100) : 0;
  const opwapDisplay = loading ? '...' : (opwapBal != null ? (opwapBal / 1e8).toFixed(4) : '0.0000');
  const opwapUsd = opwapBal != null && btcPrice ? ((opwapBal / 1e8) * 0.001 * btcPrice).toFixed(2) : '0.00';

  const stats = [
    { label: 'BTC Balance', value: btcVal.toFixed(6), unit: 'BTC', color: '#f97316', sub: 'approx USD ' + usdVal.toFixed(2) },
    { label: 'OPWAP Tokens', value: opwapDisplay, unit: 'OPWAP', color: '#fbbf24', sub: 'approx USD ' + opwapUsd },
    { label: 'Est. Annual Yield', value: '15%', unit: 'APY', color: '#22c55e', sub: 'Platform target rate' },
    { label: 'Network', value: 'Testnet4', unit: '', color: '#60a5fa', sub: 'OP_NET Signet fork' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Portfolio Dashboard</h1>
            <p className="dashboard-addr">{short}</p>
          </div>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="btn-outline-sm">
            View on OPScan
          </a>
        </div>

        <div className="dashboard-stats">
          {stats.map(s => (
            <div key={s.label} className="dashboard-stat-card">
              <div className="dashboard-stat-label">{s.label}</div>
              <div className="dashboard-stat-value" style={{color: s.color}}>
                {s.value}{s.unit && <span className="dashboard-stat-unit"> {s.unit}</span>}
              </div>
              <div className="dashboard-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {totalSupply != null && (
          <div className="dashboard-supply">
            <div className="dashboard-supply-header">
              <span>OPWAP Supply Minted</span>
              <span className="dashboard-supply-pct">{supplyPct.toFixed(4)}%</span>
            </div>
            <div className="dashboard-supply-bar">
              <div className="dashboard-supply-fill" style={{width: Math.max(supplyPct, 0.1) + '%'}} />
            </div>
            <div className="dashboard-supply-numbers">
              <span>{(totalSupply / 1e8).toLocaleString()} OPWAP minted</span>
              <span>1,000,000,000 max supply</span>
            </div>
          </div>
        )}

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Your Holdings</h2>
          {opwapBal != null && opwapBal > 0 ? (
            <div className="dashboard-holdings">
              <div className="dashboard-holding-card">
                <div className="dashboard-holding-header">
                  <span className="dashboard-holding-symbol">OPWAP</span>
                  <span className="dashboard-holding-badge">Active</span>
                </div>
                <div className="dashboard-holding-val">{(opwapBal / 1e8).toFixed(4)}</div>
                <div className="dashboard-holding-sub">OPWAProperty Token - Asset Alpha</div>
                <div className="dashboard-holding-apy">15% APY</div>
              </div>
            </div>
          ) : (
            <div className="dashboard-empty">
              <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>empty</div>
              <p style={{color:'rgba(255,255,255,.35)'}}>No holdings yet. <Link to="/#assets" style={{color:'var(--accent)'}}>Invest in an asset</Link> to start.</p>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Transaction History</h2>
          <a href={'https://opscan.org/accounts/' + walletAddr + '?network=op_testnet'} target="_blank" rel="noreferrer" className="dashboard-tx-link">
            View all transactions on OPScan Explorer
          </a>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/Dashboard.tsx', content, 'utf8');
console.log('OK Dashboard.tsx');
