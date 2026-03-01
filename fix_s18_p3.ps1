Set-Location "C:\Users\peluc\Documents\OPWABTC"
$b = "C:\Users\peluc\Documents\OPWABTC"
$cssPath = "$b\src\index.css"

$css = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)

# ── A: Remove bloco antigo do cursor laranja div (#opwa-cursor)
# Bloco identificado pela linha "CUSTOM CURSOR PILL diagonal"
$css = [System.Text.RegularExpressions.Regex]::Replace($css,
  '/\*\s+CUSTOM CURSOR PILL diagonal\s+\*/[\s\S]{0,800}?#opwa-cursor\.hovering\s*\{[^}]*\}',
  '', [System.Text.RegularExpressions.RegexOptions]::Singleline)

# Remove tambem o "* { cursor: none !important; }" duplicado que veio depois
# (mantemos apenas o que esta no bloco PILL CURSOR correto)
$occurrences = ([regex]::Matches($css, '\*\s*\{\s*cursor:\s*none\s*!important;\s*\}')).Count
if ($occurrences -gt 1) {
  # Remove a segunda ocorrencia
  $idx = $css.LastIndexOf('* { cursor: none !important; }')
  if ($idx -gt 0) {
    $css = $css.Remove($idx, '* { cursor: none !important; }'.Length)
  }
}

# ── B: Remove bloco duplicado wallet-connected/wd-item (o segundo, hardcoded dark)
# Identificado por background: rgba(255,255,255,0.05) que e o bloco ruim
$css = [System.Text.RegularExpressions.Regex]::Replace($css,
  '\.wallet-connected\s*\{\s*position:\s*relative;[\s\S]{0,3000}?\.mobile-nav-link:last-child\s*\{[^}]*\}',
  '', [System.Text.RegularExpressions.RegexOptions]::Singleline)

# ── C: Adiciona CSS do dashboard (se nao existir)
if (-not $css.Contains(".dash-page")) {
  $dashCss = "
/* DASHBOARD */
.dash-page{min-height:100vh;background:var(--bg-base);padding-top:calc(var(--navbar-h) + 2rem);padding-bottom:4rem;}
.dash-container{max-width:1100px;margin:0 auto;padding:0 1.5rem;}
.dash-empty{min-height:100vh;background:var(--bg-base);display:flex;align-items:center;justify-content:center;}
.dash-empty-inner{text-align:center;}
.dash-empty-title{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:700;color:var(--text-1);margin:0 0 0.5rem;}
.dash-empty-sub{color:var(--text-2);}
.dash-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2rem;flex-wrap:wrap;gap:1rem;}
.dash-title{font-family:'Syne',sans-serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:900;color:var(--text-1);margin:0;letter-spacing:-0.02em;}
.dash-meta{display:flex;align-items:center;gap:0.75rem;margin-top:0.5rem;flex-wrap:wrap;}
.dash-addr{color:var(--text-3);font-size:0.78rem;font-family:'DM Mono',monospace;}
.dash-updated{color:var(--text-3);font-size:0.72rem;}
.badge-network-tag{background:var(--accent-dim);border:1px solid var(--accent-border);color:var(--accent);padding:0.2rem 0.6rem;border-radius:4px;font-size:0.68rem;font-weight:700;letter-spacing:0.1em;}
.dash-actions{display:flex;gap:0.75rem;}
.dash-connected-badge{background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);color:#22c55e;padding:0.4rem 1rem;border-radius:999px;font-size:0.78rem;font-weight:700;display:flex;align-items:center;gap:0.4rem;}
.dash-connected-dot{width:6px;height:6px;background:#22c55e;border-radius:50%;display:inline-block;}
.dash-refresh-btn{background:var(--bg-elevated);border:1px solid var(--border);color:var(--text-1);padding:0.4rem 1rem;border-radius:8px;font-size:0.78rem;font-weight:600;transition:border-color .15s;}
.dash-refresh-btn:hover{border-color:var(--accent-border);}
.dash-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-bottom:1.25rem;}
.dash-stat-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:1.5rem;transition:border-color .2s,box-shadow .2s;}
.dash-stat-card:hover{border-color:var(--accent-border);box-shadow:0 4px 20px rgba(249,115,22,0.08);}
.dash-stat-label{font-size:0.68rem;font-weight:700;letter-spacing:0.12em;color:var(--text-3);text-transform:uppercase;margin-bottom:0.75rem;}
.dash-stat-value{font-family:'Syne',sans-serif;font-size:clamp(1.5rem,4vw,2.2rem);font-weight:900;color:var(--text-1);letter-spacing:-0.03em;}
.dash-stat-sub{color:var(--text-2);font-size:0.8rem;margin-top:0.25rem;}
.dash-supply-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:1.5rem;margin-bottom:1.25rem;}
.dash-supply-header{display:flex;justify-content:space-between;margin-bottom:0.75rem;}
.dash-progress-track{background:var(--bg-elevated);border-radius:3px;height:5px;overflow:hidden;}
.dash-progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--gold));border-radius:3px;box-shadow:0 0 8px rgba(249,115,22,.4);transition:width .5s;}
.dash-supply-footer{display:flex;justify-content:space-between;margin-top:0.5rem;color:var(--text-3);font-size:0.72rem;}
.dash-token-card{background:var(--bg-card);border:1px solid var(--accent-border);border-radius:16px;padding:1.5rem;max-width:280px;}
.dash-token-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;}
.dash-token-name{font-weight:800;font-size:1.05rem;color:var(--accent);}
.dash-token-badge{background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.25);color:#22c55e;font-size:0.62rem;font-weight:700;padding:0.15rem 0.45rem;border-radius:4px;}
.dash-token-bal{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:900;color:var(--text-1);margin-bottom:0.25rem;}
.dash-token-btc{color:var(--text-3);font-size:0.78rem;margin-bottom:0.6rem;}
.dash-token-apy{color:var(--accent);font-size:0.78rem;font-weight:700;margin-bottom:0.5rem;}
.dash-token-link{color:var(--accent);font-size:0.78rem;text-decoration:none;}
.dash-token-link:hover{text-decoration:underline;}
.dash-opscan-btn{display:inline-flex;align-items:center;gap:0.5rem;background:var(--accent-dim);border:1px solid var(--accent-border);color:var(--accent);padding:0.75rem 1.5rem;border-radius:10px;text-decoration:none;font-weight:700;font-size:0.88rem;transition:background .15s;}
.dash-opscan-btn:hover{background:rgba(249,115,22,0.18);}
"
  $css = $css.TrimEnd() + "`n" + $dashCss
  Write-Host "OK CSS dashboard classes adicionadas" -ForegroundColor Green
}

# ── D: Adiciona CSS do diff card (se nao existir)
if (-not $css.Contains(".sim-diff-card")) {
  $diffCss = "
/* SIM DIFF CARD */
.sim-diff-card{background:linear-gradient(135deg,rgba(249,115,22,0.10),rgba(251,191,36,0.04));border:1px solid rgba(249,115,22,0.28);border-radius:12px;padding:0.9rem 1.25rem;margin-top:1rem;display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;}
.sim-diff-amount{color:#f97316;font-weight:800;font-size:1.05rem;}
.sim-diff-label{color:var(--text-2);font-size:0.88rem;}
.sim-diff-note{color:var(--text-3);font-size:0.72rem;margin-left:auto;}
"
  $css = $css.TrimEnd() + "`n" + $diffCss
  Write-Host "OK CSS sim-diff-card adicionado" -ForegroundColor Green
}

[System.IO.File]::WriteAllText($cssPath, $css, [System.Text.Encoding]::UTF8)
Write-Host "OK index.css salvo" -ForegroundColor Green

Write-Host ""
Write-Host "Parte 3 OK. Rode agora: .\fix_s18_p4.ps1" -ForegroundColor Cyan
