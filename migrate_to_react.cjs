const fs = require('fs');
const path = require('path');

const root = process.cwd();

// ══════════════════════════════════════════════════════
// 1. vercel.json — React build
// ══════════════════════════════════════════════════════
fs.writeFileSync(path.join(root, 'vercel.json'), JSON.stringify({
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}, null, 2), 'utf8');
console.log('OK: vercel.json');

// ══════════════════════════════════════════════════════
// 2. index.html raiz — boilerplate Vite correto
// ══════════════════════════════════════════════════════
fs.writeFileSync(path.join(root, 'index.html'), `<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f97316" />
    <meta name="description" content="OPWA — Fractionalized real estate investment platform built natively on Bitcoin via OP_NET." />
    <title>OPWA — Real Estate on Bitcoin</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`, 'utf8');
console.log('OK: index.html');

console.log('');
console.log('NEXT STEPS:');
console.log('1. Copy index.css to src/index.css (from the downloaded file)');
console.log('2. git add -A && git commit -m "feat: migrate back to React build" && git push origin main');
