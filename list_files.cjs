const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe','pipe','pipe'] });
  } catch(e) {
    return '';
  }
}

// Lista todos os arquivos de cada commit
const commits = ['b1debe19', 'c47b05d3', '6650a1e1', 'cc5c1997', 'fa58f029'];

let allFiles = new Set();
for (const c of commits) {
  const out = run(`git ls-tree -r --name-only ${c}`);
  if (out) out.split('\n').filter(Boolean).forEach(f => allFiles.add(f + ' [' + c + ']'));
}

const list = [...allFiles].sort();
fs.writeFileSync('_filelist.txt', list.join('\n'), 'utf8');
console.log('Total entries:', list.length);
console.log('Saved to _filelist.txt');
console.log('\nRelevant files:');
list.filter(f => /dashboard|Dashboard|wallet|Wallet|dropdown|modal/i.test(f)).forEach(f => console.log(' ', f));
