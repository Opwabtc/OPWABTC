const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// ══════════════════════════════════════════════════════
// CSS — Wallet Dropdown + Dashboard
// ══════════════════════════════════════════════════════
const newCSS = `
/* ── WALLET DROPDOWN ── */
.wallet-btn-wrap{position:relative}
.wallet-dropdown{
  position:absolute;top:calc(100% + 10px);right:0;
  width:260px;background:#1a1a1a;border:1px solid rgba(249,115,22,.25);
  border-radius:14px;padding:16px;z-index:9999;
  box-shadow:0 16px 48px rgba(0,0,0,.6);
  display:none;
}
.wallet-dropdown.open{display:block}
.wd-address{font-family:'DM Mono',monospace;font-size:11px;color:var(--text-3);
  word-break:break-all;margin-bottom:12px;padding-bottom:12px;
  border-bottom:1px solid rgba(255,255,255,.06)}
.wd-balance{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text-1);margin-bottom:2px}
.wd-balance-usd{font-size:12px;color:var(--text-2);margin-bottom:14px}
.wd-divider{height:1px;background:rgba(255,255,255,.06);margin:8px 0}
.wd-actions{display:flex;flex-direction:column;gap:2px}
.wd-action{display:flex;align-items:center;gap:9px;padding:9px 10px;border:none;
  background:transparent;border-radius:8px;color:var(--text-2);font-size:13px;
  cursor:pointer;width:100%;text-align:left;transition:background .15s,color .15s}
.wd-action:hover{background:rgba(255,255,255,.06);color:var(--text-1)}
.wd-action.danger{color:var(--danger)}
.wd-action.danger:hover{background:var(--danger-dim);color:var(--danger)}
.wd-action svg{flex-shrink:0}

/* ── DASHBOARD PAGE ── */
.dash-page{display:none;min-height:100vh;padding:calc(var(--navbar-h) + 44px) 24px 80px;background:var(--bg-base)}
.dash-page.active{display:block}
.dash-wrap{max-width:960px;margin:0 auto}
.dash-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:32px;gap:16px;flex-wrap:wrap}
.dash-h1{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:var(--text-1);margin:0 0 6px}
.dash-addr{font-family:'DM Mono',monospace;font-size:12px;color:var(--text-3);display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.dash-addr span.net{color:var(--accent)}
.dash-badge-connected{padding:5px 13px;border-radius:20px;background:var(--success-dim);border:1px solid var(--success-border);font-size:11px;font-weight:700;color:var(--success);display:flex;align-items:center;gap:6px}
.dash-badge-connected::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--success);display:inline-block}
.dash-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.dash-refresh{padding:6px 12px;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:var(--text-2);font-size:12px;cursor:pointer;transition:background .15s}
.dash-refresh:hover{background:rgba(255,255,255,.09)}
.dash-syncing{font-size:11px;color:var(--accent);display:flex;align-items:center;gap:6px}
.dash-syncing::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--accent);display:inline-block;animation:blink 1s infinite}

.dash-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px}
.dash-stat{background:linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:22px 20px}
.dash-stat-label{font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--text-3);margin-bottom:10px}
.dash-stat-val{font-family:'Syne',sans-serif;font-size:24px;font-weight:800;margin-bottom:4px}
.dash-stat-sub{font-size:12px;color:var(--text-2)}

.dash-supply{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:20px 22px;margin-bottom:20px}
.dash-supply-head{display:flex;justify-content:space-between;margin-bottom:12px}
.dash-supply-label{font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--text-2)}
.dash-supply-pct{color:var(--accent);font-weight:700;font-size:12px}
.dash-bar-track{height:7px;background:rgba(255,255,255,.08);border-radius:4px;overflow:hidden;margin-bottom:8px}
.dash-bar-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--gold));border-radius:4px;transition:width .6s ease}
.dash-bar-foot{display:flex;justify-content:space-between;font-size:11px;color:var(--text-3)}

.dash-holdings-title{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text-3);margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.dash-holdings-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px;margin-bottom:28px}
.dash-token-card{background:linear-gradient(135deg,rgba(249,115,22,.09),rgba(251,191,36,.04));border:1px solid rgba(249,115,22,.22);border-radius:14px;padding:22px}
.dash-token-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.dash-token-symbol{font-weight:800;font-size:16px;color:var(--accent)}
.dash-token-badge{font-size:10px;background:rgba(34,197,94,.18);color:#4ade80;border-radius:20px;padding:3px 9px;font-weight:700}
.dash-token-bal{font-family:'Syne',sans-serif;font-size:24px;font-weight:900;color:var(--text-1);margin-bottom:4px}
.dash-token-btc{font-size:12px;color:var(--text-2);margin-bottom:8px}
.dash-token-apy{font-size:12px;color:#4ade80;font-weight:700;margin-bottom:12px}
.dash-token-link{color:var(--accent);font-size:11px;font-weight:600;text-decoration:none}
.dash-token-link:hover{text-decoration:underline}

.dash-opscan-btn{display:inline-flex;align-items:center;gap:8px;color:var(--accent);font-size:14px;font-weight:600;text-decoration:none;border:1px solid var(--accent-border);border-radius:9px;padding:11px 18px;background:var(--accent-dim);transition:background .15s}
.dash-opscan-btn:hover{background:rgba(249,115,22,.2)}

.dash-noconn{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:24px}
.dash-noconn-box{text-align:center;max-width:380px;padding:52px 36px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:20px}
.dash-noconn-icon{font-size:48px;margin-bottom:16px}
.dash-noconn-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--text-1);margin-bottom:12px}
.dash-noconn-text{font-size:14px;color:var(--text-2);margin-bottom:28px;line-height:1.6}
.dash-noconn-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:linear-gradient(135deg,var(--accent),var(--accent-dark));border-radius:10px;color:#fff;font-weight:600;font-size:14px;text-decoration:none;border:none;cursor:pointer}
`;

// ══════════════════════════════════════════════════════
// HTML — Wallet Dropdown (inserir dentro do .wallet-btn-wrap no navbar)
// ══════════════════════════════════════════════════════

// Envolver o botão connect num wrapper e adicionar dropdown
html = html.replace(
  `<button class="btn-connect" onclick="openWalletModal()" id="connect-btn">Connect Wallet</button>`,
  `<div class="wallet-btn-wrap" id="wallet-btn-wrap">
      <button class="btn-connect" onclick="handleConnectClick()" id="connect-btn">Connect Wallet</button>
      <div class="wallet-dropdown" id="wallet-dropdown">
        <div class="wd-address" id="wd-address">—</div>
        <div class="wd-balance" id="wd-balance">&#x20BF; 0.00000</div>
        <div class="wd-balance-usd" id="wd-balance-usd">&#x2248; $0.00</div>
        <div class="wd-divider"></div>
        <div class="wd-actions">
          <button class="wd-action" onclick="wdCopy()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            Copy Address
          </button>
          <button class="wd-action" onclick="wdExplorer()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View on Explorer
          </button>
          <div class="wd-divider"></div>
          <button class="wd-action danger" onclick="wdDisconnect()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Disconnect
          </button>
        </div>
      </div>
    </div>`
);

// ══════════════════════════════════════════════════════
// HTML — Dashboard page (inserir antes do live ticker)
// ══════════════════════════════════════════════════════
const dashHTML = `
<!-- DASHBOARD PAGE -->
<div id="page-dashboard" class="dash-page">
  <div class="dash-wrap">

    <div id="dash-noconn" class="dash-noconn">
      <div class="dash-noconn-box">
        <div class="dash-noconn-icon">&#x1F512;</div>
        <div class="dash-noconn-title">Connect Your Wallet</div>
        <div class="dash-noconn-text">Connect your Bitcoin wallet to view your portfolio and token balances on OP_NET.</div>
        <button class="dash-noconn-btn" onclick="navigate('/');setTimeout(()=>openWalletModal(),300)">&#x2192; Go Home to Connect</button>
      </div>
    </div>

    <div id="dash-content" style="display:none">
      <div class="dash-header">
        <div>
          <h1 class="dash-h1">My Portfolio</h1>
          <div class="dash-addr">
            <span id="dash-addr-short">—</span>
            <span>&#xB7;</span>
            <span class="net">OP_NET Testnet</span>
            <span id="dash-updated" style="font-size:11px;color:var(--text-3)"></span>
          </div>
        </div>
        <div class="dash-actions">
          <span id="dash-syncing" class="dash-syncing" style="display:none">Syncing...</span>
          <span class="dash-badge-connected">CONNECTED</span>
          <button class="dash-refresh" onclick="dashFetch()">&#x21BB; Refresh</button>
        </div>
      </div>

      <div class="dash-stats">
        <div class="dash-stat">
          <div class="dash-stat-label">BTC Balance</div>
          <div class="dash-stat-val" id="dash-btc-val" style="color:var(--text-1)">&#x20BF; 0.00000</div>
          <div class="dash-stat-sub" id="dash-btc-usd">&#x2248; $0.00 USD</div>
        </div>
        <div class="dash-stat">
          <div class="dash-stat-label">OPWAP Tokens</div>
          <div class="dash-stat-val" id="dash-opwap-val" style="color:var(--accent)">0</div>
          <div class="dash-stat-sub">&#x25B2; +12.4% this month</div>
        </div>
        <div class="dash-stat">
          <div class="dash-stat-label">Portfolio USD</div>
          <div class="dash-stat-val" id="dash-total-usd" style="color:var(--gold)">$0</div>
          <div class="dash-stat-sub">Live price</div>
        </div>
      </div>

      <div class="dash-supply">
        <div class="dash-supply-head">
          <span class="dash-supply-label">OPWAP Supply Progress</span>
          <span class="dash-supply-pct" id="dash-supply-pct">0.00%</span>
        </div>
        <div class="dash-bar-track"><div class="dash-bar-fill" id="dash-bar-fill" style="width:0%"></div></div>
        <div class="dash-bar-foot">
          <span id="dash-supply-minted">0 minted</span>
          <span>18B max</span>
        </div>
      </div>

      <div class="dash-holdings-title">Token Holdings</div>
      <div class="dash-holdings-grid">
        <div class="dash-token-card">
          <div class="dash-token-head">
            <span class="dash-token-symbol">OPWAP</span>
            <span class="dash-token-badge">OP_20</span>
          </div>
          <div class="dash-token-bal" id="dash-opwap-bal">0</div>
          <div class="dash-token-btc" id="dash-opwap-btc">&#x2248; 0.000000 BTC</div>
          <div class="dash-token-apy">&#x25B2; 15% APY</div>
          <a id="dash-opscan-token" href="https://opscan.org/token/opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp?network=op_testnet" target="_blank" class="dash-token-link">View on OPScan &#x2197;</a>
        </div>
      </div>

      <a id="dash-opscan-link" href="https://opscan.org/?network=op_testnet" target="_blank" class="dash-opscan-btn">&#x2197; View all transactions on OPScan</a>
    </div>
  </div>
</div>
`;

html = html.replace(
  `\n<!-- ═══════════════════════════════════════\n     LIVE TICKER BAR (bottom)`,
  dashHTML + `\n<!-- ═══════════════════════════════════════\n     LIVE TICKER BAR (bottom)`
);

// ══════════════════════════════════════════════════════
// CSS — injetar no <style>
// ══════════════════════════════════════════════════════
html = html.replace('</style>', newCSS + '\n</style>');

// ══════════════════════════════════════════════════════
// JS — Wallet state global + dropdown + dashboard logic
// ══════════════════════════════════════════════════════
const newJS = `
/* ── WALLET STATE ── */
let walletState = { connected: false, addr: '', sats: 0, type: '' };

function handleConnectClick() {
  if (walletState.connected) {
    const dd = document.getElementById('wallet-dropdown');
    dd.classList.toggle('open');
  } else {
    openWalletModal();
  }
}

document.addEventListener('click', function(e) {
  const wrap = document.getElementById('wallet-btn-wrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('wallet-dropdown').classList.remove('open');
  }
});

function wdCopy() {
  if (walletState.addr) {
    navigator.clipboard.writeText(walletState.addr).then(() => showToast('Address copied!', 'success'));
  }
}
function wdExplorer() {
  if (walletState.addr) {
    window.open('https://opscan.org/accounts/' + walletState.addr + '?network=op_testnet', '_blank');
  }
}
function wdDisconnect() {
  walletState = { connected: false, addr: '', sats: 0, type: '' };
  const btn = document.getElementById('connect-btn');
  btn.textContent = 'Connect Wallet';
  btn.classList.remove('connected');
  document.getElementById('wallet-dropdown').classList.remove('open');
  document.getElementById('lb-wallet').textContent = 'not connected';
  showToast('Wallet disconnected', 'info');
  if (window.location.pathname === '/dashboard') { navigate('/'); }
  dashRender();
}

function walletConnected(addr, sats, type) {
  walletState = { connected: true, addr, sats, type };
  const short = addr.slice(0,8) + '\\u2026' + addr.slice(-6);
  const btn = document.getElementById('connect-btn');
  btn.textContent = short;
  btn.classList.add('connected');
  document.getElementById('wd-address').textContent = addr;
  const btcBal = (sats / 1e8).toFixed(5);
  const usdBal = ((sats / 1e8) * (btcPrice || 65000)).toFixed(2);
  document.getElementById('wd-balance').textContent = '\\u20BF ' + btcBal;
  document.getElementById('wd-balance-usd').textContent = '\\u2248 $' + usdBal;
  document.getElementById('lb-wallet').textContent = short;
  showToast('Connected: ' + short, 'success');
  closeWallet();
  dashRender();
  dashFetch();
}

/* ── DASHBOARD LOGIC ── */
const OPWAP_ADDR = 'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp';
const OPNET_RPC  = 'https://testnet.opnet.org';
let dashOpwapBal = '0';
let dashSupply   = '0';

async function dashRpcCall(data) {
  try {
    const r = await fetch(OPNET_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc:'2.0', id:1, method:'eth_call', params:[{ to: OPWAP_ADDR, data }, 'latest'] }),
      signal: AbortSignal.timeout(8000)
    });
    if (!r.ok) return null;
    const j = await r.json();
    return j.result ?? null;
  } catch { return null; }
}

function formatAmt(raw, dec) {
  if (!raw || raw === '0') return '0';
  try {
    const n = BigInt(raw);
    const d = BigInt(10 ** dec);
    const whole = n / d;
    const frac  = n % d;
    if (frac === 0n) return whole.toLocaleString();
    return whole.toLocaleString() + '.' + frac.toString().padStart(dec, '0').replace(/0+$/, '').slice(0, 4);
  } catch { return '0'; }
}

async function dashFetch() {
  if (!walletState.connected || !walletState.addr) return;
  document.getElementById('dash-syncing').style.display = 'flex';
  try {
    const addr64 = walletState.addr.replace('0x','').padStart(64,'0');
    const [balHex, supHex] = await Promise.all([
      dashRpcCall('0x70a08231' + addr64),
      dashRpcCall('0x18160ddd'),
    ]);
    if (balHex) dashOpwapBal = BigInt(balHex).toString();
    if (supHex) dashSupply   = BigInt(supHex).toString();
    dashRenderData();
    document.getElementById('dash-updated').textContent = '\\u00B7 Updated ' + new Date().toLocaleTimeString();
  } finally {
    document.getElementById('dash-syncing').style.display = 'none';
  }
}

function dashRenderData() {
  const bp = btcPrice || 65000;
  const btcBtc  = walletState.sats / 1e8;
  const btcUsd  = btcBtc * bp;
  const opwapN  = formatAmt(dashOpwapBal, 8);
  const opwapBtc = Number(dashOpwapBal) / 1e8 * 0.00001;
  const opwapUsd = opwapBtc * bp;
  const totalUsd = btcUsd + opwapUsd;
  const SUPPLY_MAX = 18_000_000_000;
  const supplyNum  = Number(BigInt(dashSupply || '0')) / 1e8;
  const supplyPct  = Math.min(100, (supplyNum / SUPPLY_MAX) * 100);

  document.getElementById('dash-btc-val').textContent  = '\\u20BF ' + btcBtc.toFixed(5);
  document.getElementById('dash-btc-usd').textContent  = '\\u2248 $' + btcUsd.toFixed(2) + ' USD';
  document.getElementById('dash-opwap-val').textContent = opwapN;
  document.getElementById('dash-total-usd').textContent = '$' + totalUsd.toFixed(0);
  document.getElementById('dash-opwap-bal').textContent = opwapN;
  document.getElementById('dash-opwap-btc').textContent = '\\u2248 ' + opwapBtc.toFixed(6) + ' BTC';
  document.getElementById('dash-supply-pct').textContent = supplyPct.toFixed(2) + '%';
  document.getElementById('dash-bar-fill').style.width  = supplyPct + '%';
  document.getElementById('dash-supply-minted').textContent = formatAmt(dashSupply, 8) + ' minted';
  const opscanUrl = 'https://opscan.org/accounts/' + walletState.addr + '?network=op_testnet';
  document.getElementById('dash-opscan-link').href = opscanUrl;
  document.getElementById('dash-addr-short').textContent = walletState.addr.slice(0,10) + '...' + walletState.addr.slice(-4);
}

function dashRender() {
  const noconn = document.getElementById('dash-noconn');
  const content = document.getElementById('dash-content');
  if (walletState.connected) {
    noconn.style.display  = 'none';
    content.style.display = 'block';
    dashRenderData();
  } else {
    noconn.style.display  = 'flex';
    content.style.display = 'none';
  }
}
`;

// Substituir connectWallet para usar walletConnected()
html = html.replace(
`async function connectWallet(type) {
  showToast('Connecting to ' + type + '\u2026', 'info');
  try {
    let accounts = [];
    if (type === 'OP_Wallet') {
      if (!window.opnet) { showToast('OP_Wallet not found. Install it first.', 'danger'); return; }
      accounts = await window.opnet.requestAccounts();
    } else if (type === 'Unisat') {
      if (!window.unisat) { showToast('Unisat not found. Install it first.', 'danger'); return; }
      accounts = await window.unisat.requestAccounts();
    } else if (type === 'Xverse') {
      if (!window.BitcoinProvider) { showToast('Xverse not found. Install it first.', 'danger'); return; }
      const res = await window.BitcoinProvider.request('getAccounts', { purposes: ['payment', 'ordinals'] });
      accounts = res.result ? res.result.map(a => a.address) : [];
    } else if (type === 'OKX') {
      if (!window.okxwallet) { showToast('OKX Wallet not found. Install it first.', 'danger'); return; }
      const res = await window.okxwallet.bitcoin.requestAccounts();
      accounts = res;
    }
    if (accounts && accounts.length > 0) {
      const addr = accounts[0];
      const short = addr.slice(0,8) + '\u2026' + addr.slice(-6);
      const btn = document.getElementById('connect-btn');
      if (btn) { btn.textContent = short; btn.classList.add('connected'); }
      showToast('Connected: ' + short, 'success');
      closeWallet();
    } else {
      showToast('No accounts returned.', 'danger');
    }
  } catch(e) {
    showToast('Connection failed: ' + (e.message || e), 'danger');
  }
}`,
`async function connectWallet(type) {
  showToast('Connecting to ' + type + '\u2026', 'info');
  try {
    let accounts = [];
    let sats = 0;
    if (type === 'OP_Wallet') {
      if (!window.opnet) { showToast('OP_Wallet not found. Install it first.', 'danger'); return; }
      accounts = await window.opnet.requestAccounts();
      try { const b = await window.opnet.getBalance(); sats = b.total || 0; } catch(_) {}
    } else if (type === 'Unisat') {
      if (!window.unisat) { showToast('Unisat not found. Install it first.', 'danger'); return; }
      accounts = await window.unisat.requestAccounts();
      try { sats = await window.unisat.getBalance().then(b => b.total); } catch(_) {}
    } else if (type === 'Xverse') {
      if (!window.BitcoinProvider) { showToast('Xverse not found. Install it first.', 'danger'); return; }
      const res = await window.BitcoinProvider.request('getAccounts', { purposes: ['payment', 'ordinals'] });
      accounts = res.result ? res.result.map(a => a.address) : [];
    } else if (type === 'OKX') {
      if (!window.okxwallet) { showToast('OKX Wallet not found. Install it first.', 'danger'); return; }
      accounts = await window.okxwallet.bitcoin.requestAccounts();
    }
    if (accounts && accounts.length > 0) {
      walletConnected(accounts[0], sats, type);
    } else {
      showToast('No accounts returned.', 'danger');
    }
  } catch(e) {
    showToast('Connection failed: ' + (e.message || e), 'danger');
  }
}`
);

// Adicionar link Dashboard no navbar
html = html.replace(
  `<a class="nav-link" href="#assets">Assets</a>`,
  `<a class="nav-link" href="#assets">Assets</a>
      <a class="nav-link" href="/dashboard" onclick="navigate('/dashboard');return false;" id="nav-dashboard" style="display:none">Dashboard</a>`
);

// Mostrar link Dashboard só quando conectado — injetar no walletConnected
// (já incluso na função walletConnected no newJS)

// Adicionar page-dashboard ao router
html = html.replace(
`function renderRoute() {
  const p = window.location.pathname;
  const main = document.getElementById('main-content');
  const terms = document.getElementById('page-terms');
  const privacy = document.getElementById('page-privacy');
  if (p === '/terms') {
    main.style.display = 'none';
    terms.classList.add('active');
    privacy.classList.remove('active');
    window.scrollTo(0,0);
  } else if (p === '/privacy') {
    main.style.display = 'none';
    privacy.classList.add('active');
    terms.classList.remove('active');
    window.scrollTo(0,0);
  } else {
    main.style.display = 'block';
    terms.classList.remove('active');
    privacy.classList.remove('active');
  }
}`,
`function renderRoute() {
  const p = window.location.pathname;
  const main    = document.getElementById('main-content');
  const terms   = document.getElementById('page-terms');
  const privacy = document.getElementById('page-privacy');
  const dash    = document.getElementById('page-dashboard');
  [terms, privacy, dash].forEach(el => el && el.classList.remove('active'));
  main.style.display = 'none';
  if (p === '/terms') {
    terms.classList.add('active');
  } else if (p === '/privacy') {
    privacy.classList.add('active');
  } else if (p === '/dashboard') {
    dash.classList.add('active');
    dashRender();
  } else {
    main.style.display = 'block';
  }
  window.scrollTo(0,0);
}`
);

// Injetar newJS antes do router
html = html.replace(
  '/* ── ROUTER ── */',
  newJS + '\n/* ── ROUTER ── */'
);

// Mostrar nav-dashboard quando conectado
html = html.replace(
  `document.getElementById('lb-wallet').textContent = short;
  showToast('Connected: ' + short, 'success');`,
  `document.getElementById('lb-wallet').textContent = short;
  const navDash = document.getElementById('nav-dashboard');
  if (navDash) navDash.style.display = 'inline-flex';
  showToast('Connected: ' + short, 'success');`
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('inject_dashboard: wallet dropdown + dashboard injected successfully');
