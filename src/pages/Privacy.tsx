import React from 'react';
export const Privacy: React.FC = () => (
  <div style={{maxWidth:'800px',margin:'0 auto',padding:'60px 24px',color:'var(--text-1)'}}>
    <div className="section-eyebrow">Legal</div>
    <h1 style={{fontSize:'2rem',fontWeight:'700',marginBottom:'8px'}}>Privacy Policy</h1>
    <p style={{color:'var(--text-3)',fontSize:'13px',marginBottom:'40px'}}>Last updated: February 2026 — Testnet Version</p>
    <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'12px',padding:'20px 24px',marginBottom:'32px',borderLeft:'4px solid var(--accent)'}}>
      <strong>TL;DR:</strong> OPWA is client-side and non-custodial. We do not collect, store, or sell personal data.
    </div>
    {[['1. Information We Do Not Collect','OPWA does not collect names, emails, passwords, or personal identifiers. There are no user accounts on our platform.'],
      ['2. Blockchain Data','All transactions are recorded on the Bitcoin blockchain and are publicly visible by nature. Your Bitcoin address and token balances are public on-chain data.'],
      ['3. Wallet Connections','When you connect a wallet we read your public Bitcoin address to display balances. We never request or store private keys or seed phrases.'],
      ['4. Analytics & Cookies','OPWA does not use tracking cookies or third-party analytics. Vercel may collect standard server logs as part of their infrastructure.'],
      ['5. Open Source','OPWA is fully open source. You can inspect every line of code at our GitHub repository.'],
      ['6. Contact','For privacy questions contact us via @opwabtc on Twitter.']
    ].map(([title, body]) => (
      <React.Fragment key={title}>
        <h2 style={{fontSize:'1.1rem',fontWeight:'700',marginBottom:'12px',marginTop:'32px'}}>{title}</h2>
        <p style={{color:'var(--text-2)',lineHeight:'1.8',marginBottom:'16px'}}>{body}</p>
      </React.Fragment>
    ))}
  </div>
);
