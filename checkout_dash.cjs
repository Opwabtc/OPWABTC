const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe','pipe','pipe'] });
  } catch(e) { return ''; }
}

const files = [
  'src/pages/Dashboard.tsx',
  'src/components/WalletDropdown.tsx',
  'src/components/WalletButton.tsx',
];

const commit = 'b1debe19';

for (const f of files) {
  run(`git checkout ${commit} -- ${f}`);
  if (fs.existsSync(f)) {
    console.log('OK:', f, '(' + fs.readFileSync(f,'utf8').split('\n').length + ' lines)');
  } else {
    console.log('FAIL:', f);
  }
}
console.log('\nDone. Files checked out from', commit);
