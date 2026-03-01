Set-Location "C:\Users\peluc\Documents\OPWABTC"
$b = "C:\Users\peluc\Documents\OPWABTC"
$homePath = "$b\src\pages\Home.tsx"

# Adiciona import SimulatorDiffCard se nao existir
$h = [System.IO.File]::ReadAllText($homePath, [System.Text.Encoding]::UTF8)

if (-not $h.Contains("SimulatorDiffCard")) {
  $h = $h.Replace('import { useInvestment }', 'import SimulatorDiffCard from "../components/SimulatorDiffCard"
import { useInvestment }')
  [System.IO.File]::WriteAllText($homePath, $h, [System.Text.Encoding]::UTF8)
  Write-Host "OK import adicionado" -ForegroundColor Green
} else {
  Write-Host "import ja existe" -ForegroundColor Yellow
}

# Verificar TS
Write-Host "Rodando tsc..." -ForegroundColor Cyan
npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "TS OK" -ForegroundColor Green
} else {
  Write-Host "Ver erros acima" -ForegroundColor Red
}

# Commit
git add src/
git commit -m "fix: s18 - cursor pill, gas API, dashboard light/dark, encoding, diff card"
git push origin main
Write-Host "DONE" -ForegroundColor Green
