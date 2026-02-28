import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => (
  <footer>
    <div className="footer-grid">
      <div className="footer-brand">
        <div style={{fontWeight:'800',fontSize:'1.1rem',letterSpacing:'-0.02em'}}>
          <span style={{color:'var(--accent)'}}>OP</span>WA
        </div>
        <p>Real estate tokenization on Bitcoin Layer 1 via OP_NET. Borderless, trustless, and transparent.</p>
        <div style={{marginTop:'16px'}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(16,185,129,0.1)',color:'#10b981',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#10b981',display:'inline-block'}}></span>
            Testnet Live
          </span>
        </div>
      </div>

      <div>
        <div className="footer-col-title">Platform</div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Assets</Link>
          <Link to="/simulator" className="footer-link">Simulator</Link>
          <Link to="/dashboard" className="footer-link">Portfolio</Link>
          <Link to="/marketplace" className="footer-link">Marketplace</Link>
        </div>
      </div>

      <div>
        <div className="footer-col-title">Developers</div>
        <div className="footer-links">
          <a href="https://github.com/Opwabtc/OPWABTC" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://ai.opnet.org" target="_blank" rel="noopener noreferrer" className="footer-link">Build on OP_NET</a>
          <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener noreferrer" className="footer-link">OPScan Explorer</a>
          <a href="https://mempool.opnet.org/pt/testnet4" target="_blank" rel="noopener noreferrer" className="footer-link">Mempool</a>
        </div>
      </div>

      <div>
        <div className="footer-col-title">Resources</div>
        <div className="footer-links">
          <a href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/whitepaper.md" target="_blank" rel="noopener noreferrer" className="footer-link">Whitepaper</a>
          <a href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/technical-architecture.md" target="_blank" rel="noopener noreferrer" className="footer-link">Architecture</a>
          <a href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/security-model.md" target="_blank" rel="noopener noreferrer" className="footer-link">Security Model</a>
          <a href="https://op-real-estate-platform.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-link">Live Platform</a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="footer-legal">
        © 2026 OPWA · Real Estate on Bitcoin · Built with OP_NET ·
        <Link to="/terms" style={{color:'var(--text-3)',marginLeft:'8px'}}>Terms</Link>
        <Link to="/privacy" style={{color:'var(--text-3)',marginLeft:'8px'}}>Privacy</Link>
        <a href="https://opscan.org/?network=op_testnet" target="_blank" rel="noopener noreferrer" style={{color:'var(--text-3)',marginLeft:'8px'}}>OPScan</a>
        <a href="https://mempool.opnet.org/pt/testnet4" target="_blank" rel="noopener noreferrer" style={{color:'var(--text-3)',marginLeft:'8px'}}>Mempool</a>
      </div>
      <div className="footer-copy">⚠️ Testnet only — no real assets at risk</div>
    </div>
  </footer>
);
