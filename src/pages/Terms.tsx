export default function Terms() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 100px' }}>
      <div className="section-eyebrow">Legal</div>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: '8px 0 8px' }}>Terms of Service</h1>
      <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 40, fontFamily: 'DM Mono, monospace' }}>Last updated: January 2025 · OPWA Protocol</p>

      {[
        { title: '1. Acceptance of Terms', body: 'By accessing or using the OPWA platform ("Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform. OPWA is a decentralized real estate tokenization protocol built on the Bitcoin network via OP_NET smart contracts.' },
        { title: '2. Nature of the Platform', body: 'OPWA enables fractional ownership of real-world assets through blockchain tokenization. All transactions are executed on OP_NET Testnet for demonstration purposes. The Platform does not guarantee returns, liquidity, or the value of any tokens. OPWAP tokens represent a fractional interest in tokenized property assets and are subject to market risk.' },
        { title: '3. Eligibility', body: 'You must be at least 18 years old and legally permitted to participate in digital asset transactions in your jurisdiction. By using the Platform, you represent that you meet these requirements and that your use complies with all applicable laws and regulations.' },
        { title: '4. Wallet & Private Keys', body: 'OPWA does not custody your funds or private keys. You are solely responsible for the security of your Bitcoin wallet. Lost private keys cannot be recovered. All investment transactions are irreversible once confirmed on-chain. Use of testnet faucet funds carries no financial risk.' },
        { title: '5. Risks', body: 'Digital assets involve significant risk including price volatility, regulatory uncertainty, and smart contract bugs. Past performance is not indicative of future results. The Platform is currently operating on OP_NET Testnet — mainnet features are under development. Do not invest more than you can afford to lose.' },
        { title: '6. Prohibited Activities', body: 'You may not use the Platform to launder money, evade sanctions, or engage in any fraudulent activity. Automated scraping, reverse engineering of smart contracts for malicious purposes, or any action that compromises the integrity of the OP_NET protocol is strictly prohibited.' },
        { title: '7. Intellectual Property', body: 'All content, branding, and code on the OPWA Platform is the property of OPWA Protocol. The smart contracts are open-source and available on GitHub. You may fork and build upon the contracts subject to the applicable open-source license.' },
        { title: '8. Disclaimers', body: 'THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. OPWA PROTOCOL DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. WE ARE NOT RESPONSIBLE FOR ANY LOSSES RESULTING FROM USE OF THE PLATFORM.' },
        { title: '9. Governing Law', body: 'These Terms are governed by the laws of the applicable jurisdiction without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration.' },
        { title: '10. Contact', body: 'For questions regarding these Terms, contact us via GitHub at github.com/Opwabtc or through the official OPWA community channels.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{s.title}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>{s.body}</p>
        </div>
      ))}

      <div style={{ marginTop: 48, padding: '20px 24px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-3)' }}>
        By using OPWA, you acknowledge that you have read, understood, and agree to these Terms of Service.
        <div style={{ marginTop: 12 }}>
          <a href="/" style={{ color: 'var(--accent)', marginRight: 16 }}>← Back to Platform</a>
          <a href="/privacy" style={{ color: 'var(--text-3)' }}>Privacy Policy →</a>
        </div>
      </div>
    </div>
  )
}
