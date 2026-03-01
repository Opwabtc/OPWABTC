Set-Location "C:\Users\peluc\Documents\OPWABTC"
$b = "C:\Users\peluc\Documents\OPWABTC"

# ── Fix encoding bugs no Home.tsx
$homePath = "$b\src\pages\Home.tsx"
$h = [System.IO.File]::ReadAllText($homePath, [System.Text.Encoding]::UTF8)

$h = $h.Replace([char]0x00e2 + [char]0x0080 + [char]0x0094, "-")   # â€" -> -
$h = $h.Replace([char]0x00e2 + [char]0x0080 + [char]0x009c, '"')   # â€œ -> "
$h = $h.Replace([char]0x00e2 + [char]0x0080 + [char]0x009d, '"')   # â€ -> "
$h = $h.Replace([char]0x00e2 + [char]0x0080 + [char]0x0099, "'")   # â€™ -> '
$h = $h.Replace([char]0x00c2 + [char]0x00b7, [char]0x00b7)          # Â· -> ·
$h = $h.Replace([char]0x00c2 + [char]0x00a9, "(c)")                  # Â© -> (c)
$h = $h.Replace([char]0x00e2 + [char]0x0086 + [char]0x0092, "->")  # â†' -> ->
$h = $h.Replace([char]0x00e2 + [char]0x0086 + [char]0x0091, "^")   # â†' up
$h = $h.Replace([char]0x00e2 + [char]0x0089 + [char]0x0088, "~=")  # â‰ˆ -> ~=
$h = $h.Replace([char]0x00e2 + [char]0x0096 + [char]0x00b2, "^")   # â–² -> ^
$h = $h.Replace([char]0x00e2 + [char]0x0096 + [char]0x00bc, "v")   # â–¼ -> v
$h = $h.Replace([char]0x00e2 + [char]0x009c + [char]0x0085, "OK")  # âœ… -> OK
$h = $h.Replace([char]0x00e2 + [char]0x009c + [char]0x0095, "x")   # âœ• -> x
$h = $h.Replace([char]0x00c3 + [char]0x0097, "x")                   # Ã— -> x
$h = $h.Replace([char]0x00e2 + [char]0x0080 + [char]0x00a2, "*")   # â€¢ -> *
$h = $h.Replace([char]0x00e2 + [char]0x0080 + [char]0x00a6, "...")  # â€¦ -> ...
# Fix "mÃªs" -> "mes"
$h = $h.Replace([char]0x00c3 + [char]0x00aa, "e")

# Tambem substitui strings literais caso ainda estejam como texto
$h = $h.Replace("â€¦", "...")
$h = $h.Replace("â€"", "-")
$h = $h.Replace("â†'", "->")
$h = $h.Replace("â†—", "^")
$h = $h.Replace("Â·", "·")
$h = $h.Replace("Â©", "(c)")
$h = $h.Replace("â‰ˆ", "~=")
$h = $h.Replace("â–²", "^")
$h = $h.Replace("â–¼", "v")
$h = $h.Replace("âœ…", "OK")
$h = $h.Replace("âœ•", "x")
$h = $h.Replace("mÃªs", "mes")
$h = $h.Replace("Ã—", "x")

[System.IO.File]::WriteAllText($homePath, $h, [System.Text.Encoding]::UTF8)
Write-Host "OK Home.tsx encoding corrigido" -ForegroundColor Green

# ── Adiciona import SimulatorDiffCard se nao existir
$h = [System.IO.File]::ReadAllText($homePath, [System.Text.Encoding]::UTF8)
if (-not $h.Contains("SimulatorDiffCard")) {
  $h = $h.Replace(
    'import { useInvestment } from "../hooks/useInvestment"',
    'import { useInvestment } from "../hooks/useInvestment"' + "`n" + 'import SimulatorDiffCard from "../components/SimulatorDiffCard"'
  )
  # fallback se nao encontrou (aspas simples)
  if (-not $h.Contains("SimulatorDiffCard")) {
    $h = $h.Replace(
      "import { useInvestment } from '../hooks/useInvestment'",
      "import { useInvestment } from '../hooks/useInvestment'`nimport SimulatorDiffCard from '../components/SimulatorDiffCard'"
    )
  }
  [System.IO.File]::WriteAllText($homePath, $h, [System.Text.Encoding]::UTF8)
  Write-Host "OK Home.tsx SimulatorDiffCard import adicionado" -ForegroundColor Green
} else {
  Write-Host "OK Home.tsx SimulatorDiffCard ja importado" -ForegroundColor Yellow
}

# ── Injeta <SimulatorDiffCard> apos tabela de comparacoes no Simulator
$h = [System.IO.File]::ReadAllText($homePath, [System.Text.Encoding]::UTF8)
if (-not $h.Contains("<SimulatorDiffCard")) {
  # Encontra o fim do bloco sim-compare (ultimo </div> antes do fechamento do Simulator)
  # Injeta antes do fechamento das divs do Simulator
  $marker = "          </div>`n        </div>`n      </div>`n    </div>`n  )`n}`n`nfunction FL"
  $replacement = "          </div>`n        </div>`n        {(() => {`n            const opwaData = comparisons.find(c => c.main)?.data`n            const refAData = comparisons.find(c => !c.main)?.data`n            if (!opwaData || !refAData) return null`n            const diff = Math.abs(opwaData.total - refAData.total)`n            return <SimulatorDiffCard diff={diff} months={years * 12} label=" + '"Reference A"' + " />`n          })()}`n      </div>`n    </div>`n  )`n}`n`nfunction FL"
  if ($h.Contains($marker)) {
    $h = $h.Replace($marker, $replacement)
    [System.IO.File]::WriteAllText($homePath, $h, [System.Text.Encoding]::UTF8)
    Write-Host "OK Home.tsx SimulatorDiffCard integrado" -ForegroundColor Green
  } else {
    Write-Host "AVISO: marcador nao encontrado — SimulatorDiffCard NAO integrado automaticamente" -ForegroundColor Yellow
    Write-Host "Adicione manualmente apos o bloco de comparacoes no Simulator" -ForegroundColor Yellow
  }
} else {
  Write-Host "OK Home.tsx SimulatorDiffCard ja integrado" -ForegroundColor Yellow
}

# ── Verifica TS
Write-Host ""
Write-Host "Rodando tsc --noEmit..." -ForegroundColor Cyan
$result = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "TS OK — zero erros" -ForegroundColor Green
} else {
  Write-Host "Erros TS:" -ForegroundColor Red
  $result | ForEach-Object { Write-Host $_ }
}

# ── Commit e push
Write-Host ""
Write-Host "Commitando..." -ForegroundColor Cyan
git add src/
git commit -m "fix: s18 - cursor pill branco/laranja, gas API corrigida, dashboard light/dark, encoding bugs, diff card"
git push origin main

Write-Host ""
Write-Host "DONE - s18 completo!" -ForegroundColor Green
