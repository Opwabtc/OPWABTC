Set-Location "C:\Users\peluc\Documents\OPWABTC"
$b = "C:\Users\peluc\Documents\OPWABTC"
$homePath = "$b\src\pages\Home.tsx"
$h = [System.IO.File]::ReadAllText($homePath, [System.Text.Encoding]::UTF8)

# Encontra o fim do bloco de comparacoes e injeta o DiffCard
# O bloco termina com: </div> fechando o sim-compare, depois </div> fechando o bloco right, depois </div> fechando sim-layout
# Vamos localizar o padrao: fim do .map dos comparisons

$oldPattern = '              <div className={`sim-compare-val ${c.main ? ' + "'main' : 'sec'" + '`}>{fmt(c.data.returns)}</div>'
$newPattern = '              <div className={`sim-compare-val ${c.main ? ' + "'main' : 'sec'" + '`}>{fmt(c.data.returns)}</div>'

# Abordagem mais segura: inserir depois do fechamento do mapa de comparacoes
# Procura: )})} seguido de fechamento de divs do bloco comparison
$searchStr = '            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FL'

$replaceStr = '            </div>
          </div>
          {(() => {
            const opwaData = comparisons.find(c => c.main)
            const refAData = comparisons.find(c => !c.main)
            if (!opwaData || !refAData) return null
            const diff = Math.abs(opwaData.data.total - refAData.data.total)
            const totalMonths = years * 12
            return <SimulatorDiffCard diff={diff} months={totalMonths} label="Reference A" />
          })()}
        </div>
      </div>
    </div>
  )
}

function FL'

if ($h.Contains($searchStr)) {
  $h = $h.Replace($searchStr, $replaceStr)
  [System.IO.File]::WriteAllText($homePath, $h, [System.Text.Encoding]::UTF8)
  Write-Host "OK SimulatorDiffCard integrado no JSX" -ForegroundColor Green
} else {
  Write-Host "Padrao nao encontrado - tentando alternativa..." -ForegroundColor Yellow
  # Alternativa: procura o fechamento do Simulator de forma diferente
  $alt = '          </div>
        </div>
      </div>
    </div>
  )
}

function FL'
  $altReplace = '          </div>
        </div>
        {(() => {
          const opwaData = comparisons.find(c => c.main)
          const refAData = comparisons.find(c => !c.main)
          if (!opwaData || !refAData) return null
          const diff = Math.abs(opwaData.data.total - refAData.data.total)
          return <SimulatorDiffCard diff={diff} months={years * 12} label="Reference A" />
        })()}
      </div>
    </div>
  )
}

function FL'
  if ($h.Contains($alt)) {
    $h = $h.Replace($alt, $altReplace)
    [System.IO.File]::WriteAllText($homePath, $h, [System.Text.Encoding]::UTF8)
    Write-Host "OK SimulatorDiffCard integrado (alternativa)" -ForegroundColor Green
  } else {
    Write-Host "FALHOU - cole o trecho manualmente (ver instrucoes abaixo)" -ForegroundColor Red
  }
}

# Verifica TS
Write-Host "Rodando tsc..." -ForegroundColor Cyan
npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "TS OK - zero erros" -ForegroundColor Green
  git add src/pages/Home.tsx
  git commit -m "fix: integrate SimulatorDiffCard into Simulator JSX"
  git push origin main
  Write-Host "DONE" -ForegroundColor Green
} else {
  Write-Host "Erros acima - nao commitado" -ForegroundColor Red
}
