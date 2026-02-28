import React from 'react';
export const Terms: React.FC = () => (
  <div style={{minHeight:'100vh',background:'var(--bg)',color:'var(--text-1)',padding:'80px 24px'}}>
    <div style={{maxWidth:'800px',margin:'0 auto'}}>
      <div style={{fontSize:'11px',fontWeight:'700',letterSpacing:'2px',color:'var(--accent)',textTransform:'uppercase',marginBottom:'12px'}}>Legal</div>
      <h1 style={{fontSize:'2.5rem',fontWeight:'800',marginBottom:'8px'}}>Terms of Service</h1>
      <p style={{color:'var(--text-3)',fontSize:'13px',marginBottom:'40px'}}>Last updated: February 2026 — Testnet Version</p>
      <div style={{background:'rgba(251,146,60,0.1)',border:'1px solid rgba(251,146,60,0.3)',borderRadius:'12px',padding:'16px 20px',marginBottom:'40px'}}>
        <strong style={{color:'#fb923c'}}>⚠️ Testnet Notice:</strong> <span style={{color:'var(--text-2)'}}>OPWA operates exclusively on Bitcoin Testnet via OP_NET. No real assets are at risk. All tokens have zero monetary value.</span>
      </div>
      {[
        ['1. Acceptance of Terms','By accessing or using the OPWA platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.'],
        ['2. Nature of the Platform','OPWA is an experimental real estate tokenization protocol built on Bitcoin Layer 1 via OP_NET. The platform is currently in testnet phase. All features, smart contracts, and interfaces are subject to change without notice.'],
        ['3. No Financial Advice','Nothing on this platform constitutes financial, investment, legal, or tax advice. All yield simulations and return projections are purely illustrative. Past performance does not guarantee future results.'],
        ['4. Self-Custody & Wallet Responsibility','OPWA is fully non-custodial. We never hold, access, or control your funds or private keys. You are solely responsible for the security of your wallet and seed phrase.'],
        ['5. Risk Disclosure','Cryptocurrency and tokenized asset investments carry significant risk, including the total loss of capital. Smart contracts may contain undiscovered vulnerabilities. Protocol parameters may change. Use the platform entirely at your own risk.'],
        ['6. Eligibility','You must be at least 18 years old to use this platform. By using OPWA you represent that you meet this requirement and that your use complies with applicable local laws.'],
        ['7. Prohibited Conduct','You agree not to misuse the platform, attempt to exploit smart contracts, impersonate others, or use OPWA for any unlawful purpose.'],
        ['8. Intellectual Property','OPWA is open source under the MIT License. All source code is available at github.com/Opwabtc/OPWABTC.'],
        ['9. Limitation of Liability','To the maximum extent permitted by law, OPWA and its contributors shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.'],
        ['10. Changes to Terms','We reserve the right to update these terms at any time. Continued use of the platform constitutes acceptance of the revised terms.'],
        ['11. Contact','For questions or concerns contact us via @opwabtc on Twitter or open an issue on GitHub.'],
      ].map(([title, body]) => (
        <React.Fragment key={title}>
          <h2 style={{fontSize:'1.1rem',fontWeight:'700',marginBottom:'10px',marginTop:'36px',color:'var(--text-1)'}}>{title}</h2>
          <p style={{color:'var(--text-2)',lineHeight:'1.9',marginBottom:'8px'}}>{body}</p>
        </React.Fragment>
      ))}
      <div style={{marginTop:'60px',paddingTop:'24px',borderTop:'1px solid var(--border)',display:'flex',gap:'24px'}}>
        <a href="/privacy" style={{color:'var(--accent)',textDecoration:'none',fontSize:'14px'}}>Privacy Policy →</a>
        <a href="/" style={{color:'var(--text-3)',textDecoration:'none',fontSize:'14px'}}>← Back to OPWA</a>
      </div>
    </div>
  </div>
);