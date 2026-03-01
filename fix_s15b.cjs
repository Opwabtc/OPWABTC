// fix_s15b.cjs — corrige 2 erros TypeScript do commit anterior
const fs = require('fs');
const path = require('path');

function patch(rel, find, replace) {
  const abs = path.join(process.cwd(), rel);
  let src = fs.readFileSync(abs, 'utf8');
  if (!src.includes(find)) {
    console.warn('  WARN: pattern not found in', rel);
    return false;
  }
  fs.writeFileSync(abs, src.replace(find, replace), 'utf8');
  console.log('  patched', rel);
  return true;
}

// ── Fix 1: Layout.tsx usa named import { Navigation } mas agora é default export
// Mudar: import { Navigation } from "./Navigation"
// Para:  import Navigation from "./Navigation"
console.log('\n[1] Fixing Layout.tsx import...');
const layoutAbs = path.join(process.cwd(), 'src/components/Layout.tsx');
let layout = fs.readFileSync(layoutAbs, 'utf8');

// Cobre variações: import { Navigation }, import {Navigation}
layout = layout.replace(
  /import\s*\{\s*Navigation\s*\}\s*from\s*['"]\.\/Navigation['"]/,
  `import Navigation from './Navigation'`
);
fs.writeFileSync(layoutAbs, layout, 'utf8');
console.log('  saved Layout.tsx');

// ── Fix 2: Navigation.tsx — remover import unused de useWallet
console.log('\n[2] Fixing Navigation.tsx unused import...');
patch(
  'src/components/Navigation.tsx',
  `import { useWallet } from '../hooks/useWallet'\n`,
  ``
);

console.log(`
╔══════════════════════════════════════════════╗
║  fix_s15b DONE                              ║
║                                              ║
║  npx tsc --noEmit 2>&1 | head -20           ║
║  git add src/components/Layout.tsx \\       ║
║          src/components/Navigation.tsx      ║
║  git commit -m "fix: TS errors Layout      ║
║    named import + useWallet unused (s15b)"  ║
║  git push origin main                       ║
╚══════════════════════════════════════════════╝
`);
