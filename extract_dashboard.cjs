const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Lista de commits para tentar extrair o Dashboard
const commits = ['b1debe19', 'c47b05d3', '6650a1e1', 'fa58f029'];
const targets = ['src/pages/Dashboard.tsx', 'src/components/Dashboard.tsx', 'src/pages/dashboard.tsx'];

let dashContent = null;
let foundAt = '';

for (const commit of commits) {
  for (const target of targets) {
    try {
      const out = execSync(`git show ${commit}:${target} 2>/dev/null`, { encoding: 'utf8' });
      if (out && out.length > 100) {
        dashContent = out;
        foundAt = `${commit}:${target}`;
        break;
      }
    } catch(_) {}
  }
  if (dashContent) break;
}

if (dashContent) {
  fs.writeFileSync(path.join(process.cwd(), '_dash_extracted.txt'), dashContent, 'utf8');
  console.log('FOUND:', foundAt);
  console.log('Lines:', dashContent.split('\n').length);
  console.log('Saved to _dash_extracted.txt');
} else {
  console.log('NOT FOUND in those commits. Trying broader search...');
  // Lista todos os arquivos de um commit
  for (const commit of commits) {
    try {
      const tree = execSync(`git ls-tree -r --name-only ${commit} 2>/dev/null`, { encoding: 'utf8' });
      const files = tree.split('\n').filter(f => f.includes('Dashboard') || f.includes('dashboard') || f.includes('wallet') || f.includes('Wallet'));
      if (files.length) {
        console.log(`Files in ${commit}:`, files);
      }
    } catch(_) {}
  }
}

// Também listar todos os arquivos src/ do commit mais promissor
try {
  const tree = execSync('git ls-tree -r --name-only b1debe19 2>/dev/null', { encoding: 'utf8' });
  const src = tree.split('\n').filter(f => f.startsWith('src/'));
  console.log('\nAll src/ files in b1debe19:');
  src.forEach(f => console.log(' ', f));
} catch(_) {}
