import React from 'react';
export const Terms: React.FC = () => (
  <div style={{maxWidth:'800px',margin:'0 auto',padding:'60px 24px',color:'var(--text-1)'}}>
    <div className="section-eyebrow">Legal</div>
    <h1 style={{fontSize:'2rem',fontWeight:'700',marginBottom:'8px'}}>Terms of Service</h1>
    <p style={{color:'var(--text-3)',fontSize:'13px',marginBottom:'40px'}}>Last updated: February 2026 — Testnet Version</p>
    <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'12px',padding:'20px 24px',marginBottom:'32px',borderLeft:'4px solid var(--accent)'}}>
      <strong>⚠️ Testnet Notice:</strong> OPWA operates exclusively on Bitcoin Testnet via OP_NET. No real assets are at risk. All tokens have zero monetary value.
    </div>
    {[['1. Acceptance of Terms','By accessing or using the OPWA platform, you agree to be bound by these Terms of Service.'],
      ['2. Nature of the Platform','OPWA is an experimental real estate tokenization protocol on Bitcoin Layer 1 via OP_NET. The platform is in testnet phase. Features and contracts are subject to change without notice.'],
      ['3. No Financial Advice','Nothing on this platform constitutes financial, investment, or legal advice. All simulations are illustrative only. Past performance does not guarantee future results.'],
      ['4. Self-Custody & Wallet Responsibility','OPWA is non-custodial. We never hold or access your funds or private keys. You are solely responsible for your wallet security.'],
      ['5. Risk Disclosure','Cryptocurrency investments carry significant risk including total loss of capital. Smart contracts may contain bugs. Use at your own risk.'],
      ['6. Intellectual Property','OPWA is open source under MIT License. See our GitHub repository for full source code.'],
      ['7. Contact','For questions contact us via @opwabtc on Twitter.']
    ].map(([title, body]) => (
      <React.Fragment key={title}>
        <h2 style={{fontSize:'1.1rem',fontWeight:'700',marginBottom:'12px',marginTop:'32px'}}>{title}</h2>
        <p style={{color:'var(--text-2)',lineHeight:'1.8',marginBottom:'16px'}}>{body}</p>
      </React.Fragment>
    ))}
  </div>
);
