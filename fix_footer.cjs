const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
const lines = c.split('\n');

// Fix Whitepaper link (linha ~1919)
lines[1918] = lines[1918].replace('href="#"', 'href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/whitepaper.md" target="_blank" rel="noopener noreferrer"');

// Fix Terms link (linha ~1947)
lines[1946] = lines[1946].replace('href="#"', 'href="/terms"');

// Fix Privacy link (linha ~1948)
lines[1947] = lines[1947].replace('href="#"', 'href="/privacy"');

// Add OPScan and Mempool after Live Platform (linha ~1929)
lines[1928] = lines[1928] + '\n            <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener noreferrer" class="footer-link-item">OPScan Explorer</a>\n            <a href="https://mempool.opnet.org/pt/testnet4" target="_blank" rel="noopener noreferrer" class="footer-link-item">Mempool</a>';

fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
console.log('Feito!');
