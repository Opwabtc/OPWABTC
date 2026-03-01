// dump_clip.cjs — extrai código e copia para clipboard
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function read(rel) {
  const abs = path.join(process.cwd(), rel);
  if (!fs.existsSync(abs)) return `\n=== MISSING: ${rel} ===\n`;
  return `\n${'='.repeat(60)}\nFILE: ${rel}\n${'='.repeat(60)}\n` + fs.readFileSync(abs, 'utf8');
}

const out = [
  read('src/pages/Home.tsx'),
  read('src/components/Navigation.tsx'),
  read('src/index.css'),
].join('\n');

fs.writeFileSync('code_dump.txt', out, 'utf8');
console.log('code_dump.txt written —', out.length, 'chars');

// Copy to clipboard (Windows)
try {
  execSync('clip < code_dump.txt', { shell: 'cmd.exe' });
  console.log('Copied to clipboard! Paste it to Claude.');
} catch(e) {
  console.log('Clip failed — open code_dump.txt manually and paste.');
}
