import React from 'react';
import { Link } from 'react-router-dom';
export const Footer: React.FC = () => (
  <footer style={{borderTop:'1px solid var(--border)',background:'var(--card)',padding:'48px 24px 32px',marginTop:'80px'}}>
    <div style={{maxWidth:'1200px',margin:'0 auto'}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'40px',marginBottom:'40px'}}>
        <div>
          <div style={{fontWeight:'800',fontSize:'1.1rem',letterSpacing:'-0.02em',marginBottom:'8px'}}>
            <span style={{color:'var(--accent)'}}>OP</span>WA
          </div>
          <p style={{color:'var(--text-3)',fontSize:'13px',lineHeight:'1.7',marginBottom:'12px'}}>Real estate tokenization on Bitcoin Layer 1 via OP_NET.</p>
          <span style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(16,185,129,0.1)',color:'#10b981',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#10b981',display:'inline-block'}}></span>Testnet Live
          </span>
        </div>
        <div>
          <div style={{fontWeight:'700',fontSize:'12px',color:'var(--text-1)',marginBottom:'16px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Resources</div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {[
              ['📄 Whitepaper','https://github.com/Opwabtc/OPWABTC/blob/main/docs/whitepaper.md'],
              ['🏗️ Architecture','https://github.com/Opwabtc/OPWABTC/blob/main/docs/technical-architecture.md'],
              ['🐙 GitHub','https://github.com/Opwabtc/OPWABTC']
            ].map(([label,href])=>(
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                style={{color:'var(--text-2)',fontSize:'14px',textDecoration:'none'}}
                onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                onMouseLeave={e=>e.currentTarget.style.color='var(--text-2)'}>{label}</a>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontWeight:'700',fontSize:'12px',color:'var(--text-1)',marginBottom:'16px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Blockchain</div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {[
              ['🔍 OPScan Explorer','https://opscan.org/?network=op_testnet'],
              ['⛓️ Mempool','https://mempool.opnet.org/pt/testnet4'],
              ['⚡ OP_NET','https://opnet.org']
            ].map(([label,href])=>(
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                style={{color:'var(--text-2)',fontSize:'14px',textDecoration:'none'}}
                onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                onMouseLeave={e=>e.currentTarget.style.color='var(--text-2)'}>{label}</a>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontWeight:'700',fontSize:'12px',color:'var(--text-1)',marginBottom:'16px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Legal</div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <Link to="/terms" style={{color:'var(--text-2)',fontSize:'14px',textDecoration:'none'}}
              onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--text-2)'}>Terms of Service</Link>
            <Link to="/privacy" style={{color:'var(--text-2)',fontSize:'14px',textDecoration:'none'}}
              onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--text-2)'}>Privacy Policy</Link>
            <a href="https://github.com/Opwabtc/OPWABTC/blob/main/docs/security-model.md" target="_blank" rel="noopener noreferrer"
              style={{color:'var(--text-2)',fontSize:'14px',textDecoration:'none'}}
              onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--text-2)'}>Security Model</a>
          </div>
        </div>
      </div>
      <div style={{borderTop:'1px solid var(--border)',paddingTop:'24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
        <span style={{color:'var(--text-3)',fontSize:'12px'}}>© 2026 OPWA — MIT License — ⚠️ Testnet only, no real assets at risk.</span>
        <span style={{color:'var(--text-3)',fontSize:'12px'}}>Built on <span style={{color:'var(--accent)',fontWeight:'600'}}>Bitcoin L1</span> via OP_NET</span>
      </div>
    </div>
  </footer>
);
