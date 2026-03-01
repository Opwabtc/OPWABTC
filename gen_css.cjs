const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
// Remove previous s14 patch if exists
css = css.replace(/\/\* s14-patch-start \*\/[\s\S]*?\/\* s14-patch-end \*\//g, '').trimEnd();

const patch = `

/* s14-patch-start */

/* SLIDER - dot overlay posicionado via JS */
.sim-slider-wrap { position: relative; width: 100%; height: 36px; display: flex; align-items: center; }
.sim-slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px;
  background: rgba(255,255,255,.1); border-radius: 2px;
  outline: none; cursor: pointer; position: relative; z-index: 1;
}
.sim-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 0; height: 0; opacity: 0; }
.sim-slider::-moz-range-thumb { width: 0; height: 0; border: none; background: transparent; }
.sim-slider-track {
  position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  height: 4px; background: var(--accent); border-radius: 2px; pointer-events: none; z-index: 0;
}
.sim-slider-dot {
  position: absolute; top: 50%; transform: translate(-50%, -50%);
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--accent); border: 3px solid #fff;
  box-shadow: 0 0 0 4px rgba(249,115,22,.3), 0 2px 10px rgba(0,0,0,.5);
  pointer-events: none; z-index: 3;
}

/* HOW IT WORKS - numero branco no hover, sem sombra */
.step { transition: transform .22s, box-shadow .22s; }
.step:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(249,115,22,.14); }
.step-number {
  font-size: 3.5rem; font-weight: 900;
  color: rgba(255,255,255,.07); line-height: 1;
  text-shadow: none !important; transition: color .2s;
}
.step:hover .step-number { color: #ffffff !important; text-shadow: none !important; }
.step:hover .step-icon-wrap { border-color: var(--accent); background: rgba(249,115,22,.15); }

/* NAV - aba Dashboard */
.nav-link-dashboard {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(249,115,22,.1); border: 1px solid rgba(249,115,22,.28);
  border-radius: 6px; padding: 4px 10px;
  color: var(--accent) !important; font-size: .78rem; font-weight: 600;
  transition: background .18s, border-color .18s;
}
.nav-link-dashboard:hover, .nav-link-dashboard.active { background: rgba(249,115,22,.22); border-color: var(--accent); }

/* CARDS - profundidade 3D */
.ativo-card, .asset-card {
  background: linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.01));
  border: 1px solid rgba(255,255,255,.08); border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.06);
  backdrop-filter: blur(8px);
  transition: transform .25s, box-shadow .25s, border-color .25s;
}
.ativo-card:hover, .asset-card:hover {
  transform: translateY(-6px) scale(1.012);
  box-shadow: 0 20px 50px rgba(0,0,0,.42), 0 0 0 1px rgba(249,115,22,.18), inset 0 1px 0 rgba(255,255,255,.1);
  border-color: rgba(249,115,22,.22);
}

/* BOTOES - glass highlight */
.btn-primary, .nav-connect-btn {
  position: relative; overflow: hidden;
  box-shadow: 0 4px 18px rgba(249,115,22,.38), inset 0 1px 0 rgba(255,255,255,.22);
  transition: transform .15s, box-shadow .15s;
}
.btn-primary::before, .nav-connect-btn::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.16) 0%, transparent 55%);
  border-radius: inherit; pointer-events: none;
}
.btn-primary:hover, .nav-connect-btn:hover { box-shadow: 0 6px 26px rgba(249,115,22,.52), inset 0 1px 0 rgba(255,255,255,.22); transform: translateY(-1px); }
.btn-primary:active, .nav-connect-btn:active { transform: translateY(1px); }

/* DASHBOARD PAGE */
.dashboard-page { min-height: 100vh; padding: 104px 0 64px; }
.dashboard-container { max-width: 920px; margin: 0 auto; padding: 0 24px; }
.dashboard-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 36px; gap: 16px; flex-wrap: wrap; }
.dashboard-title { font-size: 2rem; font-weight: 800; color: #fff; margin: 0 0 4px; }
.dashboard-addr { font-size: .78rem; color: rgba(255,255,255,.38); font-family: monospace; }

.dashboard-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; margin-bottom: 28px; }
.dashboard-stat-card {
  background: linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.018));
  border: 1px solid rgba(255,255,255,.09); border-radius: 14px; padding: 22px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.05);
}
.dashboard-stat-label { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.38); margin-bottom: 10px; }
.dashboard-stat-value { font-size: 1.55rem; font-weight: 800; line-height: 1.1; margin-bottom: 5px; }
.dashboard-stat-unit { font-size: .8rem; opacity: .65; }
.dashboard-stat-sub { font-size: .72rem; color: rgba(255,255,255,.32); }

.dashboard-supply { background: rgba(255,255,255,.038); border: 1px solid rgba(255,255,255,.08); border-radius: 14px; padding: 20px; margin-bottom: 28px; }
.dashboard-supply-header { display: flex; justify-content: space-between; font-size: .82rem; color: rgba(255,255,255,.5); margin-bottom: 10px; }
.dashboard-supply-pct { color: var(--accent); font-weight: 700; }
.dashboard-supply-bar { height: 7px; background: rgba(255,255,255,.08); border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
.dashboard-supply-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--gold)); border-radius: 4px; transition: width .6s ease; }
.dashboard-supply-numbers { display: flex; justify-content: space-between; font-size: .7rem; color: rgba(255,255,255,.28); }

.dashboard-section { margin-bottom: 32px; }
.dashboard-section-title { font-size: .7rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.35); margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,.06); }

.dashboard-holdings { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }
.dashboard-holding-card {
  background: linear-gradient(135deg, rgba(249,115,22,.09), rgba(251,191,36,.04));
  border: 1px solid rgba(249,115,22,.22); border-radius: 14px; padding: 22px;
  transition: border-color .2s, box-shadow .2s;
}
.dashboard-holding-card:hover { border-color: rgba(249,115,22,.4); box-shadow: 0 8px 28px rgba(249,115,22,.12); }
.dashboard-holding-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.dashboard-holding-symbol { font-weight: 800; font-size: 1rem; color: var(--accent); }
.dashboard-holding-badge { font-size: .68rem; background: rgba(34,197,94,.18); color: #4ade80; border-radius: 20px; padding: 3px 9px; font-weight: 700; }
.dashboard-holding-val { font-size: 1.65rem; font-weight: 900; color: #fff; margin-bottom: 4px; }
.dashboard-holding-sub { font-size: .72rem; color: rgba(255,255,255,.38); margin-bottom: 10px; }
.dashboard-holding-apy { font-size: .8rem; color: #4ade80; font-weight: 700; }

.dashboard-empty { text-align: center; padding: 48px 24px; }
.dashboard-tx-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--accent); font-size: .88rem; font-weight: 600; text-decoration: none;
  border: 1px solid rgba(249,115,22,.28); border-radius: 9px; padding: 11px 18px;
  background: rgba(249,115,22,.07); transition: background .2s, border-color .2s;
}
.dashboard-tx-link:hover { background: rgba(249,115,22,.16); border-color: var(--accent); }

.dashboard-gate { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.dashboard-gate-card {
  text-align: center; max-width: 380px; padding: 52px 36px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09);
  border-radius: 20px; box-shadow: 0 8px 40px rgba(0,0,0,.3);
}
.btn-outline-sm {
  display: inline-flex; align-items: center; gap: 6px; background: transparent;
  border: 1px solid rgba(255,255,255,.2); color: rgba(255,255,255,.65);
  border-radius: 8px; padding: 8px 16px; font-size: .8rem; font-weight: 600;
  cursor: pointer; text-decoration: none; transition: border-color .18s, color .18s; white-space: nowrap;
}
.btn-outline-sm:hover { border-color: rgba(255,255,255,.5); color: #fff; }

/* s14-patch-end */
`;

fs.writeFileSync('src/index.css', css + patch, 'utf8');
console.log('OK index.css');
