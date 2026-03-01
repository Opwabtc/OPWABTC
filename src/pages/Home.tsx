import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useWallet } from '../hooks/useWallet'
import { useInvestment, calcTokens } from '../hooks/useInvestment'

function filterAssets(type: string, el: EventTarget | null) {
  document.querySelectorAll('#filterTabs .filter-tab').forEach(t => t.classList.remove('active'));
  if (el) (el as Element).classList.add('active');
  document.querySelectorAll('#ativosGrid .ativo-card').forEach((card: any) => {
    card.classList.toggle('hidden', type !== 'all' && card.dataset.type !== type);
  });
}

function toggleExpand(e: any) {
  const btn = e.target || e;
  const card = btn.closest('.ativo-card');
  const panel = card?.querySelector('.ativo-expand-panel');
  if (!panel) return;
  const isOpen = panel.classList.contains('open');
  document.querySelectorAll('.ativo-expand-panel.open').forEach((p: any) => p.classList.remove('open'));
  document.querySelectorAll('.btn-card').forEach((b: any) => { if (b.textContent && !b.textContent.includes('Waitlist')) b.textContent = 'Invest Now'; });
  if (!isOpen) { panel.classList.add('open'); btn.textContent = 'Close ×'; card.scrollIntoView({ behavior:'smooth', block:'nearest' }); }
  else if (btn.textContent && !btn.textContent.includes('Waitlist')) { btn.textContent = 'Invest Now'; }
}

const RATES = { platform: 15/100/12, refA: 8/100/12, refB: 6/100/12 };
function calcFV(p: number, m: number, n: number, r: number) {
  if (r === 0) return p + m * n;
  const f = Math.pow(1 + r, n);
  return p * f + m * ((f - 1) / r);
}
function fmt(n: number) { return n.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}); }


function searchAssets(query: string) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('#ativosGrid .ativo-card').forEach((card: any) => {
    card.classList.toggle('hidden', q !== '' && !(card.dataset.name || '').toLowerCase().includes(q));
  });
}

function sortAssets(val: string) {
  const grid = document.getElementById('ativosGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.ativo-card')) as HTMLElement[];
  cards.sort((a, b) => {
    if (val === 'apy') return parseFloat(b.dataset.apy||'0') - parseFloat(a.dataset.apy||'0');
    if (val === 'price') return parseFloat(b.dataset.price||'0') - parseFloat(a.dataset.price||'0');
    return (a.dataset.name||'').localeCompare(b.dataset.name||'');
  });
  cards.forEach(c => grid.appendChild(c));
}

function toggleValue(e: any, id: string) {
  const btn = e.target || e;
  const card = btn.closest('.ativo-card');
  if (!card) return;
  const isBtc = id.startsWith('btc');
  card.querySelectorAll('.value-toggle-btn').forEach((b: any) => b.classList.remove('active'));
  btn.classList.add('active');
  const btcEl = card.querySelector('.price-btc');
  const usdEl = card.querySelector('.price-usd');
  if (btcEl) (btcEl as HTMLElement).style.display = isBtc ? '' : 'none';
  if (usdEl) (usdEl as HTMLElement).style.display = isBtc ? 'none' : '';
}

export default function Home() {
  const { btcPrice } = useAppStore()
  const { requireWallet, connect, disconnect } = useWallet()
  const inv1 = useInvestment()
  const inv2 = useInvestment()
  const btc1 = '0.0001'
  const btc2 = '0.0001'

  function calcSimulator() {
    const initial = parseFloat((document.getElementById('simInitial') as HTMLInputElement)?.value) || 0;
    const monthly = parseFloat((document.getElementById('simMonthly') as HTMLInputElement)?.value) || 0;
    const months  = parseInt((document.getElementById('periodSlider') as HTMLInputElement)?.value)  || 12;
    const fvP = calcFV(initial, monthly, months, RATES.platform);
    const fvA = calcFV(initial, monthly, months, RATES.refA);
    const fvB = calcFV(initial, monthly, months, RATES.refB);
    const set = (id: string, v: string) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('simResultMain',  fmt(fvP));
    set('simResultBtc',   (btcPrice && fvP > 0) ? '≈ ₿ ' + (fvP / btcPrice).toFixed(6) : '≈ ₿ —');
    set('simValPlatform', (initial + monthly > 0) ? fmt(fvP) : '$ —');
    set('simValA',        (initial + monthly > 0) ? fmt(fvA) : '$ —');
    set('simValB',        (initial + monthly > 0) ? fmt(fvB) : '$ —');
    const dEl = document.getElementById('simDelta');
    if (dEl && initial + monthly > 0 && fvP > fvA) {
      dEl.style.display = 'block';
      dEl.innerHTML = '<span style="fontWeight:700;color:var(--accent)">' + fmt(fvP - fvA) + '</span> more than Reference A after ' + months + ' month' + (months !== 1 ? 's' : '') + '.';
    } else if (dEl) dEl.style.display = 'none';
  }

  function onSliderChange(sl: HTMLInputElement) {
    const pct = ((+sl.value - +sl.min) / (+sl.max - +sl.min)) * 100;
    sl.style.background = 'linear-gradient(90deg, var(--accent) ' + pct + '%, var(--bg-elevated) ' + pct + '%)';
    const label = document.getElementById('sliderLabel'); if (label) label.textContent = sl.value + (+sl.value === 1 ? ' month' : ' months');
    calcSimulator();
  }

  useEffect(() => {
    calcSimulator();
    const sl = document.getElementById('periodSlider') as HTMLInputElement;
    if (sl) { const pct = ((+sl.value - +sl.min)/(+sl.max - +sl.min))*100; sl.style.background = 'linear-gradient(90deg, var(--accent) ' + pct + '%, var(--bg-elevated) ' + pct + '%)'; }
    const openWallet = () => window.dispatchEvent(new CustomEvent('opwa-open-wallet'));
    window.addEventListener('opwa-open-wallet-cta', openWallet);
    return () => window.removeEventListener('opwa-open-wallet-cta', openWallet);
  }, [btcPrice]);

  return (
    <div>

<div className="modal-backdrop" id="walletModal">
  <div className="modal" style={{"maxWidth":"440px"}}>
    <div className="modal-header">
      <span className="modal-title">Connect Wallet</span>
      <button className="modal-close" id="closeModal" aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <p className="modal-subtitle">Choose your Bitcoin wallet to connect to the OP_NET platform.</p>

    
    <div style={{"marginBottom":"12px"}}>
      <div style={{"fontSize":"10px","fontWeight":"700","color":"var(--accent)","textTransform":"uppercase","letterSpacing":".1em","marginBottom":"8px"}}>Recommended</div>
      <button className="wallet-option wallet-option-primary" onClick={() => { connect('OP_Wallet') }}>
        <div className="wallet-option-icon wallet-option-icon-primary">
          
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#f97316"/>
            <text x="16" y="22" text-anchor="middle" font-family="'Syne',sans-serif" font-weight="800" font-size="14" fill="#fff">OP</text>
          </svg>
        </div>
        <div style={{"flex":"1"}}>
          <div className="wallet-option-name">OP_Wallet</div>
          <div className="wallet-option-desc">Official OP_NET wallet · Chrome Extension</div>
        </div>
        <span className="wallet-option-badge">Official</span>
      </button>
      <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb"
         target="_blank" rel="noopener"
         style={{"display":"flex","alignItems":"center","justifyContent":"center","gap":"6px","marginTop":"6px","padding":"8px","borderRadius":"8px","background":"var(--bg-elevated)","border":"1px solid var(--border)","fontSize":"11px","color":"var(--text-3)","transition":"color .15s"}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Don't have OP_Wallet? Install from Chrome Web Store ↗
      </a>
    </div>

    
    <div style={{"fontSize":"10px","fontWeight":"700","color":"var(--text-3)","textTransform":"uppercase","letterSpacing":".1em","marginBottom":"8px"}}>Other Options</div>
    <div className="wallet-options">
      <button className="wallet-option" onClick={() => { connect('Unisat') }}>
        <div className="wallet-option-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3h-3a2 2 0 00-2 2v2h7V5a2 2 0 00-2-2z"/><circle cx="16" cy="14" r="1" fill="currentColor"/></svg>
        </div>
        <div>
          <div className="wallet-option-name">Unisat</div>
          <div className="wallet-option-desc">Bitcoin native · OP_NET compatible</div>
        </div>
      </button>
      <button className="wallet-option" onClick={() => { connect('Xverse') }}>
        <div className="wallet-option-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/></svg>
        </div>
        <div>
          <div className="wallet-option-name">Xverse</div>
          <div className="wallet-option-desc">Bitcoin · Ordinals · OP_NET</div>
        </div>
      </button>
      <button className="wallet-option" onClick={() => { connect('OKX') }}>
        <div className="wallet-option-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
        </div>
        <div>
          <div className="wallet-option-name">OKX Wallet</div>
          <div className="wallet-option-desc">Multi-chain · Web3</div>
        </div>
      </button>
    </div>

    <div className="network-selector">
      <div className="network-selector-label">Select Network</div>
      <div className="network-options">
        <div className="network-option active" onClick={() => { useAppStore.getState().setWallet({network:'OP_NET Testnet'}) }}>
          <div className="network-option-name">Testnet</div>
          <div className="network-option-status"><span className="dot"></span> Active</div>
        </div>
        <div className="network-option" onClick={() => { useAppStore.getState().setWallet({network:'OP_NET Mainnet'}) }}>
          <div className="network-option-name">Mainnet</div>
          <div className="network-option-status" style={{"color":"var(--text-3)"}}>Soon</div>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="wallet-dropdown" id="walletDropdown">
  <div className="wd-address" id="wd-address">bc1q...0000</div>
  <div className="wd-balance" id="wd-balance">₿ —</div>
  <div className="wd-balance-usd" id="wd-balance-usd">≈ $ —</div>
  <div className="wd-divider"></div>
  <div className="wd-actions">
    <button className="wd-action" onClick={() => { navigator.clipboard?.writeText(useAppStore.getState().walletAddr||''); window.dispatchEvent(new CustomEvent('opwa-toast',{detail:{type:'success',title:'Copied!',desc:'Address copied.'}})) }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      Copy Address
    </button>
    <button className="wd-action">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      View on Explorer
    </button>
    <div className="wd-divider"></div>
    <button className="wd-action danger" onClick={() => { disconnect() }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Disconnect
    </button>
  </div>
</div>





<div className="mobile-menu" id="mobileMenu">
  <a className="mobile-nav-link active" href="#">Home</a>
  <a className="mobile-nav-link" href="#assets">Assets</a>
  <a className="mobile-nav-link" href="#simulator">Simulator</a>
  <a className="mobile-nav-link" href="#how-it-works">How It Works</a>
  <div style={{"padding":"12px 14px","borderTop":"1px solid var(--border)","marginTop":"8px"}}>
    <button className="btn-primary" style={{"width":"100%","justifyContent":"center"}} onClick={() => { window.dispatchEvent(new CustomEvent('opwa-open-wallet')) }}>
      Connect Wallet
    </button>
  </div>
</div>


<div className="hero-section" id="home">
  <div className="hero-content fade-in-up">
    <div className="hero-badge">
      <span className="hero-badge-dot"></span>
      Real Estate Investment Platform
    </div>
    <h1 className="hero-title">
      <span className="hero-title-white">Invest in Tokenized</span>
      <span className="hero-title-accent">Real Estate with</span>
      <span className="hero-title-accent">Bitcoin</span>
    </h1>
    <p className="hero-subtitle">
      Diversify your portfolio with real estate assets that outperform savings accounts. Invest as little as 0.001 BTC in premium properties.
    </p>
    <div className="hero-cta">
      <button className="btn-primary-lg" onClick={() => window.dispatchEvent(new CustomEvent("opwa-open-wallet"))}>
        Connect Wallet →
      </button>
      <a href="#simulator" className="btn-outline-lg">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        View Simulator
      </a>
    </div>
  </div>

  
  <div className="hero-stats fade-in">

    
    <div className="hero-stat">
      <div className="hero-stat-val">&#x20BF; Layer</div>
      <span className="hero-stat-label">Native Bitcoin Settlement</span>
    </div>

    <div className="hero-stat">
      <div className="hero-stat-val">OP_NET</div>
      <span className="hero-stat-label">Smart Contract Protocol</span>
    </div>

    <div className="hero-stat">
      <div className="hero-stat-val">15% p.a.</div>
      <span className="hero-stat-label">Projected Annual Yield</span>
    </div>

    
    <div className="hero-stat">
      <div className="hero-stat-val">0.5%</div>
      <span className="hero-stat-label">Max Slippage</span>
    </div>

    <div className="hero-stat">
      <div className="hero-stat-val">500+</div>
      <span className="hero-stat-label">Early Investors</span>
    </div>

    <div className="hero-stat">
      <div className="hero-stat-val">$2M+</div>
      <span className="hero-stat-label">Total Volume Target</span>
    </div>

  </div>
</div>

<div className="section-divider"></div>


<section id="assets">
  <div className="ativos-header">
    <div>
      <div className="section-eyebrow">Portfolio</div>
      <h2 className="section-title">Available Assets</h2>
      <p className="section-subtitle" style={{"marginBottom":"0"}}>Fractionalized real estate backed by Bitcoin smart contracts on OP_NET.</p>
    </div>
    <a href="https://github.com/Opwabtc/" target="_blank" rel="noopener" className="btn-link">
      View all on GitHub
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    </a>
  </div>

  
  <div className="filter-row">
    <div className="filter-tabs" id="filterTabs">
      <button className="filter-tab active" data-filter="all" onClick={(e) => { filterAssets('all', e.currentTarget) }}>All</button>
      <button className="filter-tab" data-filter="residential" onClick={(e) => { filterAssets('residential', e.currentTarget) }}>Residential</button>
      <button className="filter-tab" data-filter="commercial" onClick={(e) => { filterAssets('commercial', e.currentTarget) }}>Commercial</button>
      <button className="filter-tab" data-filter="industrial" onClick={(e) => { filterAssets('industrial', e.currentTarget) }}>Industrial</button>
    </div>
    <div className="filter-right">
      <select className="filter-select" onChange={(e) => { sortAssets((e.target as HTMLSelectElement).value) }}>
        <option value="apy">Sort: APY</option>
        <option value="price">Sort: Price</option>
        <option value="volume">Sort: Volume</option>
      </select>
      <div className="filter-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="assetSearch" placeholder="Search asset..." onInput={(e) => { searchAssets((e.target as HTMLInputElement).value) }}/>
      </div>
    </div>
  </div>

  <div className="ativos-grid" id="ativosGrid">

    
    <div className="ativo-card fade-in-up d1" data-type="residential" data-name="Asset Alpha Residential">
      <div className="ativo-img">
        <div className="ativo-img-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        </div>
        <div className="ativo-img-overlay"></div>
        <div className="ativo-badges">
          <span className="badge badge-a">Residential</span>
          <span className="badge badge-ok">Active</span>
        </div>
      </div>
      <div className="ativo-body">
        <div className="ativo-id">ID-001 · OP_NET/OPWA</div>
        <div className="ativo-name">Asset Alpha</div>
        <div className="ativo-desc">Tokenized residential property. Fractional ownership settled on Bitcoin via OP_NET smart contract.</div>
        <div className="value-toggle-row">
          <span style={{"fontSize":"11px","color":"var(--text-3)"}}>Display in:</span>
          <button className="value-toggle-btn active" onClick={() => { toggleValue(event,'btc-1') }}>BTC</button>
          <button className="value-toggle-btn" onClick={() => { toggleValue(event,'usd-1') }}>USD</button>
        </div>
        <div className="ativo-stats">
          <div className="ativo-stat"><div className="ativo-stat-label">Price</div><div className="ativo-stat-value" id="price-1">—</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">APY</div><div className="ativo-stat-value pos">15%</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">24h</div><div className="ativo-stat-value pos">+1.2%</div></div>
        </div>
        <div className="tx-details">
          <div className="tx-detail-row"><span>Est. Gas</span><span className="tx-detail-val acc" id="gasCard1">—</span></div>
          <div className="tx-detail-row"><span>Slippage</span><span className="tx-detail-val">0.5%</span></div>
          <div className="tx-detail-row"><span>Contract</span><span className="tx-detail-val" style={{"fontSize":"10px"}}>OP_NET</span></div>
        </div>
        <div className="progress-wrap">
          <div className="progress-label"><span>Availability</span><span style={{"color":"var(--text-3)"}}>450 / 1000 tokens</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{"width":"45%"}}></div></div>
        </div>
        <button className="btn-card" onClick={() => { toggleExpand(event) }}>Invest Now</button>
      </div>
      
      <div className="ativo-expand-panel">
        <div className="ativo-expand-inner">
          <div className="ativo-expand-title">Investment Details</div>
          <div className="expand-field">
            <label>Amount (BTC)</label>
            <input className="expand-input" type="number" placeholder="0.001" step="0.001" min="0.001"/>
          </div>
          <div className="expand-field">
            <label>Number of tokens</label>
            <input className="expand-input" type="number" placeholder="1" min="1"/>
          </div>
          <button className="btn-invest" onClick={() => inv1.invest(parseFloat(btc1))} disabled={inv1.loading}>{inv1.loading ? 'Processing...' : 'Confirm · ' + calcTokens(parseFloat(btc1)) + ' OPWAP'}</button>
        </div>
      </div>
    </div>

    
    <div className="ativo-card fade-in-up d2" data-type="commercial" data-name="Asset Beta Commercial">
      <div className="ativo-img" style={{"background":"linear-gradient(135deg,#1a1a2e,#252540)"}}>
        <div className="ativo-img-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3h-3a2 2 0 00-2 2v2h7V5a2 2 0 00-2-2z"/></svg>
        </div>
        <div className="ativo-img-overlay"></div>
        <div className="ativo-badges">
          <span className="badge badge-b">Commercial</span>
          <span className="badge badge-ok">Active</span>
        </div>
      </div>
      <div className="ativo-body">
        <div className="ativo-id">ID-002 · OP_NET/OPWA</div>
        <div className="ativo-name">Asset Beta</div>
        <div className="ativo-desc">Commercial office space tokenized on OP_NET. Dividends distributed in satoshis monthly.</div>
        <div className="value-toggle-row">
          <span style={{"fontSize":"11px","color":"var(--text-3)"}}>Display in:</span>
          <button className="value-toggle-btn active" onClick={() => { toggleValue(event,'btc-2') }}>BTC</button>
          <button className="value-toggle-btn" onClick={() => { toggleValue(event,'usd-2') }}>USD</button>
        </div>
        <div className="ativo-stats">
          <div className="ativo-stat"><div className="ativo-stat-label">Price</div><div className="ativo-stat-value" id="price-2">—</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">APY</div><div className="ativo-stat-value gold">12%</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">24h</div><div className="ativo-stat-value pos">+0.8%</div></div>
        </div>
        <div className="tx-details">
          <div className="tx-detail-row"><span>Est. Gas</span><span className="tx-detail-val acc" id="gasCard2">—</span></div>
          <div className="tx-detail-row"><span>Slippage</span><span className="tx-detail-val">0.5%</span></div>
          <div className="tx-detail-row"><span>Contract</span><span className="tx-detail-val" style={{"fontSize":"10px"}}>OP_NET</span></div>
        </div>
        <div className="progress-wrap">
          <div className="progress-label"><span>Availability</span><span style={{"color":"var(--text-3)"}}>700 / 1000 tokens</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{"width":"70%"}}></div></div>
        </div>
        <button className="btn-card" onClick={() => { toggleExpand(event) }}>Invest Now</button>
      </div>
      <div className="ativo-expand-panel">
        <div className="ativo-expand-inner">
          <div className="ativo-expand-title">Investment Details</div>
          <div className="expand-field">
            <label>Amount (BTC)</label>
            <input className="expand-input" type="number" placeholder="0.001" step="0.001" min="0.001"/>
          </div>
          <div className="expand-field">
            <label>Number of tokens</label>
            <input className="expand-input" type="number" placeholder="1" min="1"/>
          </div>
          <button className="btn-invest" onClick={() => inv2.invest(parseFloat(btc2))} disabled={inv2.loading}>{inv2.loading ? 'Processing...' : 'Confirm · ' + calcTokens(parseFloat(btc2)) + ' OPWAP'}</button>
        </div>
      </div>
    </div>

    
    <div className="ativo-card fade-in-up d3" data-type="industrial" data-name="Asset Gamma Industrial">
      <div className="ativo-img" style={{"background":"linear-gradient(135deg,#1a2e1a,#1a2520)"}}>
        <div className="ativo-img-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div className="ativo-img-overlay"></div>
        <div className="ativo-badges">
          <span className="badge badge-a">Industrial</span>
          <span className="badge badge-warn">Coming Soon</span>
        </div>
      </div>
      <div className="ativo-body">
        <div className="ativo-id">ID-003 · OP_NET/OPWA</div>
        <div className="ativo-name">Asset Gamma</div>
        <div className="ativo-desc">Industrial logistics hub. Tokenization pending final regulatory clearance. Join the waitlist.</div>
        <div className="value-toggle-row">
          <span style={{"fontSize":"11px","color":"var(--text-3)"}}>Display in:</span>
          <button className="value-toggle-btn active" onClick={() => { toggleValue(event,'btc-3') }}>BTC</button>
          <button className="value-toggle-btn" onClick={() => { toggleValue(event,'usd-3') }}>USD</button>
        </div>
        <div className="ativo-stats">
          <div className="ativo-stat"><div className="ativo-stat-label">Price</div><div className="ativo-stat-value">TBA</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">APY</div><div className="ativo-stat-value gold">~18%</div></div>
          <div className="ativo-stat"><div className="ativo-stat-label">24h</div><div className="ativo-stat-value">—</div></div>
        </div>
        <div className="tx-details">
          <div className="tx-detail-row"><span>Est. Gas</span><span className="tx-detail-val acc" id="gasCard3">—</span></div>
          <div className="tx-detail-row"><span>Slippage</span><span className="tx-detail-val">0.5%</span></div>
          <div className="tx-detail-row"><span>Status</span><span className="tx-detail-val" style={{"color":"var(--gold)"}}>Upcoming</span></div>
        </div>
        <div className="progress-wrap">
          <div className="progress-label"><span>Waitlist</span><span style={{"color":"var(--text-3)"}}>300 / 1000 signups</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{"width":"30%"}}></div></div>
        </div>
        <button className="btn-card" onClick={() => { toggleExpand(event) }}>Join Waitlist</button>
      </div>
      <div className="ativo-expand-panel">
        <div className="ativo-expand-inner">
          <div className="ativo-expand-title">Join Waitlist</div>
          <div className="expand-field">
            <label>Your Bitcoin Address</label>
            <input className="expand-input" type="text" placeholder="bc1q..."/>
          </div>
          <button className="btn-invest" onClick={() => { requireWallet() }}>Register Interest</button>
        </div>
      </div>
    </div>

  </div>
</section>

<div className="section-divider"></div>


<div className="simulador-section" id="simulator">
  <div className="simulador-inner">
    <div style={{"marginBottom":"40px"}}>
      <div className="section-eyebrow">Tool</div>
      <h2 className="section-title">Investment Simulator</h2>
      <p className="section-subtitle" style={{"marginBottom":"0"}}>Model your returns and compare the platform against traditional alternatives.</p>
    </div>
    <div className="simulador-grid">

      
      <div className="sim-panel">
        <div className="sim-field">
          <label>Initial Investment (USD)</label>
          <div className="sim-stepper">
            <button className="sim-stepper-btn" data-target="simInitial" data-step="100" data-dir="-1" type="button">−</button>
            <input className="sim-stepper-input" id="simInitial" type="number" min="0" step="100" value="1000" placeholder="$ amount" onInput={() => { calcSimulator() }}/>
            <button className="sim-stepper-btn" data-target="simInitial" data-step="100" data-dir="1" type="button">+</button>
          </div>
        </div>
        <div className="sim-field">
          <label>Monthly Contribution (USD)</label>
          <div className="sim-stepper">
            <button className="sim-stepper-btn" data-target="simMonthly" data-step="50" data-dir="-1" type="button">−</button>
            <input className="sim-stepper-input" id="simMonthly" type="number" min="0" step="50" value="200" placeholder="$ amount" onInput={() => { calcSimulator() }}/>
            <button className="sim-stepper-btn" data-target="simMonthly" data-step="50" data-dir="1" type="button">+</button>
          </div>
        </div>
        <div className="sim-field">
          <label>Period</label>
          <input type="range" className="sim-slider" id="periodSlider" min="1" max="36" value="12" onInput={(e) => { onSliderChange(e.target as HTMLInputElement) }}/>
          <div className="sim-slider-labels"><span>1 mo</span><span>12 mo</span><span>36 mo</span></div>
          <div className="sim-slider-current" id="sliderLabel">12 months</div>
        </div>
        <div className="sim-result">
          <div className="sim-result-label">Estimated Value</div>
          <div className="sim-result-value" id="simResultMain">$ 0.00</div>
          <div className="sim-result-btc" id="simResultBtc">≈ ₿ —</div>
        </div>
        <button className="btn-sim" onClick={() => { calcSimulator() }}>Recalculate</button>
        <p style={{"fontSize":"11px","color":"var(--text-3)","textAlign":"center","lineHeight":"1.6"}}>* Simulation is illustrative only and does not constitute a guarantee.</p>
      </div>

      
      <div>
        <div className="sim-forecast-header">
          <span className="sim-forecast-title">Return Forecast</span>
          <div className="sim-legend">
            <div className="sim-legend-item"><div className="sim-legend-dot" style={{"background":"var(--accent)"}}></div>Platform 15%</div>
            <div className="sim-legend-item"><div className="sim-legend-dot" style={{"background":"var(--info)"}}></div>Ref A 8%</div>
            <div className="sim-legend-item"><div className="sim-legend-dot" style={{"background":"var(--text-3)"}}></div>Ref B 6%</div>
          </div>
        </div>
        <div className="sim-compare">
          <div className="sim-compare-card highlighted">
            <div className="sim-compare-left">
              <div className="sim-compare-name">Platform <span className="sim-rate-badge platform">15% p.a.</span></div>
              <div className="sim-compare-rate">≈ 1.25% per month</div>
            </div>
            <div className="sim-compare-val main" id="simValPlatform">$ —</div>
          </div>
          <div className="sim-compare-card">
            <div className="sim-compare-left">
              <div className="sim-compare-name">Reference A <span className="sim-rate-badge ref-a">8% p.a.</span></div>
              <div className="sim-compare-rate">≈ 0.67% per month</div>
            </div>
            <div className="sim-compare-val sec" id="simValA">$ —</div>
          </div>
          <div className="sim-compare-card">
            <div className="sim-compare-left">
              <div className="sim-compare-name">Reference B <span className="sim-rate-badge ref-b">6% p.a.</span></div>
              <div className="sim-compare-rate">≈ 0.50% per month</div>
            </div>
            <div className="sim-compare-val sec" id="simValB">$ —</div>
          </div>
        </div>
        <div id="simDelta" style={{"marginTop":"16px","padding":"14px 18px","borderRadius":"10px","background":"var(--accent-dim)","border":"1px solid var(--accent-border)","fontSize":"13px","color":"var(--text-2)","display":"none"}}></div>
        <p style={{"fontSize":"11px","color":"var(--text-3)","lineHeight":"1.6","marginTop":"16px"}}>* Simulation is illustrative only.</p>
      </div>

    </div>
  </div>
</div>

<div className="section-divider"></div>


<div className="partners-section" id="partners">
  <div className="partners-label">Companies That Trust the Platform</div>
  <div className="partners-wrapper">
    <div className="partners-track" id="partnersTrack">
      
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
        OP_NET Protocol
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Partner B
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        Partner C
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Partner D
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Partner E
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Partner F
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
        Partner G
      </div>
      
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
        OP_NET Protocol
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Partner B
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        Partner C
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Partner D
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Partner E
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Partner F
      </div>
      <div className="partner-slot">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
        Partner G
      </div>
    </div>
  </div>
</div>

<div className="section-divider"></div>


<section id="how-it-works">
  <div style={{"textAlign":"center","marginBottom":"52px"}}>
    <div className="section-eyebrow" style={{"display":"inline-block","border":"none","padding":"0"}}>Process</div>
    <h2 className="section-title">How It Works</h2>
    <p className="section-subtitle" style={{"margin":"0 auto"}}>Four steps from Bitcoin wallet to tokenized real estate investment — fully on-chain.</p>
  </div>
  <div className="steps-grid">

    <div className="step fade-in-up d1">
      <div className="step-number">1</div>
      <div className="step-icon-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><circle cx="16" cy="14" r="1" fill="currentColor"/></svg>
      </div>
      <div className="step-label">Step 1</div>
      <div className="step-title">Connect Your Bitcoin Wallet</div>
      <div className="step-desc">Use OP_Wallet, Unisat, Xverse, or OKX wallet to connect to OPWA. Your keys stay in your control at all times — the platform never holds custody of your Bitcoin.</div>
      <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noopener" className="step-link">
        Get OP_Wallet ↗
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </a>
    </div>

    <div className="step fade-in-up d2">
      <div className="step-number">2</div>
      <div className="step-icon-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
      </div>
      <div className="step-label">Step 2</div>
      <div className="step-title">Choose a Tokenized Property</div>
      <div className="step-desc">Browse the available assets — each backed by real physical property. Review APY, availability, and on-chain details before investing any amount, from micro to large.</div>
      <a href="https://op-real-estate-platform.vercel.app/#assets" target="_blank" rel="noopener" className="step-link">
        View Assets
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </a>
    </div>

    <div className="step fade-in-up d3">
      <div className="step-number">3</div>
      <div className="step-icon-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
      </div>
      <div className="step-label">Step 3</div>
      <div className="step-title">Invest via OP_NET Smart Contract</div>
      <div className="step-desc">Transactions are executed through OP_NET smart contracts deployed on Bitcoin. No intermediaries, no custodians — the protocol handles settlement trustlessly and transparently.</div>
      <a href="https://dev.opnet.org/" target="_blank" rel="noopener" className="step-link">
        Build on OP_NET
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </a>
    </div>

    <div className="step fade-in-up d4">
      <div className="step-number">4</div>
      <div className="step-icon-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
      </div>
      <div className="step-label">Step 4</div>
      <div className="step-title">Earn Yield &amp; Govern</div>
      <div className="step-desc">Receive yield distributions directly in satoshis to your wallet. Token holders participate in platform governance decisions proportional to their holdings.</div>
      <a href="https://faucet.opnet.org/" target="_blank" rel="noopener" className="step-link">
        Get Testnet Tokens
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </a>
    </div>

  </div>
</section>

<div className="section-divider"></div>


<div className="status-bar">
  <div className="status-item"><div className="dot"></div> All systems operational</div>
  <div className="status-item" id="networkLabel">· Network: OP_NET Testnet</div>
  <div className="status-item">· v1.0.0</div>
  <div className="status-item" style={{"marginLeft":"auto"}}>
    <a href="https://faucet.opnet.org/" target="_blank" rel="noopener" style={{"color":"var(--accent)","fontSize":"11px","fontWeight":"600"}}>Get Testnet BTC →</a>
  </div>
</div>


<footer className="footer">
  <div className="footer-inner">
    <div className="footer-grid">

      
      <div className="footer-brand">
        <div className="footer-logo">
          <div className="footer-logo-mark">OP</div>
          <div className="footer-logo-name">OPWA</div>
        </div>
        <p className="footer-desc">
          OPWA is a fractionalized real estate investment platform built natively on Bitcoin, powered by the OP_NET smart contract protocol. Borderless, trustless, and transparent.
        </p>
        
        <div className="footer-socials">
          <a href="https://x.com/opwabtc" target="_blank" rel="noopener" className="social-btn" aria-label="Twitter / X">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l16 16M4 20L20 4"/></svg>
          </a>
        </div>
      </div>

      
      <div>
        <div className="footer-col-title">Platform</div>
        <div className="footer-links">
          <a href="#assets" className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            Assets
          </a>
          <a href="#simulator" className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>
            Simulator
          </a>
          <a href="#how-it-works" className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/></svg>
            How It Works
          </a>
          <a href="#partners" className="footer-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            Partners
          </a>
        </div>
      </div>

      
      <div>
        <div className="footer-col-title">Developers</div>
        <div className="footer-links">
          <a href="https://github.com/Opwabtc/" target="_blank" rel="noopener" className="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            GitHub
          </a>
          <a href="https://dev.opnet.org/" target="_blank" rel="noopener" className="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Build on OP_NET
          </a>
          <a href="https://faucet.opnet.org/" target="_blank" rel="noopener" className="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg>
            Testnet Faucet
          </a>
          <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" rel="noopener" className="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><circle cx="16" cy="14" r="1" fill="currentColor"/></svg>
            Get OP_Wallet
          </a>
        </div>
      </div>

      
      <div>
        <div className="footer-col-title">Resources</div>
        <div className="footer-links">
          
          <a href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/whitepaper.md" target="_blank" rel="noopener" className="footer-link footer-link-ext"
             style={{"color":"var(--gold)"}} title="OPWA Strategic Document — Whitepaper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Whitepaper
          </a>
          <a href="https://defibible.org/" target="_blank" rel="noopener" className="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
            DeFi Bible
          </a>
          <a href="https://op-real-estate-platform.vercel.app/" target="_blank" rel="noopener" className="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            Live Platform
          </a>
          <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener" className="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            OPScan Explorer
          </a>
          <a href="https://mempool.opnet.org/pt/testnet4" target="_blank" rel="noopener" className="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Mempool
          </a>
        </div>
      </div>

    </div>

    <div className="footer-bottom">
      <div>
        <span>© 2025 OPWA · Real Estate on Bitcoin · Built with </span>
        <span style={{"color":"var(--accent)"}}>OP_NET</span>
      </div>
      <div style={{"display":"flex","alignItems":"center","gap":"16px","flexWrap":"wrap"}}>
        <div className="footer-network-badge">
          <span className="dot"></span>
          OP_NET Testnet
        </div>
        <div className="footer-bottom-links">
          <a href="/terms" className="footer-bottom-link" onClick={(e) => { e.preventDefault(); window.history.pushState({},"","/terms"); window.dispatchEvent(new PopStateEvent("popstate")) }}>Terms</a>
          <a href="/privacy" className="footer-bottom-link" onClick={(e) => { e.preventDefault(); window.history.pushState({},"","/privacy"); window.dispatchEvent(new PopStateEvent("popstate")) }}>Privacy</a>
          
        </div>
      </div>
    </div>
  </div>
</footer>


    </div>
  )
}
