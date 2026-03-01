const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Remove OPScan e Mempool de dentro do <a> Live Platform e fecha o <a> corretamente
c = c.replace(
  `            Live Platform
            <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener noreferrer" class="footer-link-item">OPScan Explorer</a>
            <a href="https://mempool.opnet.org/pt/testnet4" target="_blank" rel="noopener noreferrer" class="footer-link-item">Mempool</a>
          </a>`,
  `            Live Platform
          </a>
          <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener" class="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            OPScan Explorer
          </a>
          <a href="https://mempool.opnet.org/pt/testnet4" target="_blank" rel="noopener" class="footer-link footer-link-ext">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Mempool
          </a>`
);

fs.writeFileSync('index.html', c, 'utf8');
console.log('Feito!');
