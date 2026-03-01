// dump_code.cjs — extrai o código atual para análise
const fs = require('fs');
const path = require('path');

function dump(rel) {
  const abs = path.join(process.cwd(), rel);
  if (!fs.existsSync(abs)) { console.log(`\n=== MISSING: ${rel} ===\n`); return; }
  const src = fs.readFileSync(abs, 'utf8');
  console.log(`\n${'='.repeat(80)}`);
  console.log(`FILE: ${rel}  (${src.length} chars)`);
  console.log('='.repeat(80));
  console.log(src);
}

dump('src/pages/Home.tsx');
dump('src/components/Navigation.tsx');
