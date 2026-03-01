export default function Privacy() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 100px' }}>
      <div className="section-eyebrow">Legal</div>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: '8px 0 8px' }}>Privacy Policy</h1>
      <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 40, fontFamily: 'DM Mono, monospace' }}>Last updated: January 2025 · OPWA Protocol</p>

      {[
        { title: '1. Overview', body: 'OPWA Protocol ("we", "us") is committed to transparency. This Privacy Policy explains what data we collect, how we use it, and your rights. Because OPWA operates on a public blockchain, certain information is inherently public and cannot be made private.' },
        { title: '2. Information We Collect', body: 'We do not collect personally identifiable information directly. When you interact with the Platform, your Bitcoin wallet address and all transaction data are recorded on the OP_NET blockchain and are publicly visible. We do not store your private keys, seed phrases, or passwords at any point.' },
        { title: '3. Blockchain Data', body: 'All transactions executed through OPWA smart contracts are permanently recorded on the Bitcoin blockchain via OP_NET. This includes wallet addresses, token amounts, timestamps, and transaction hashes. This data is public, immutable, and cannot be deleted.' },
        { title: '4. Analytics', body: 'The Platform may use privacy-respecting analytics tools to understand aggregate usage patterns (e.g., page views, session duration). We do not use cookies for advertising or share usage data with third-party advertisers.' },
        { title: '5. Third-Party Services', body: 'The Platform integrates with third-party services including: CoinGecko (BTC price data), Mempool.opnet.org (gas price data), and OPScan (blockchain explorer). Each of these services has its own privacy policy. We encourage you to review them.' },
        { title: '6. Wallet Extensions', body: 'When you connect a wallet (OP_Wallet, Unisat, Xverse, or OKX), the wallet extension may request your public key and Bitcoin address. OPWA only reads the public key — we never request your private key or seed phrase. Wallet extension data handling is governed by each wallet\'s own privacy policy.' },
        { title: '7. Data Retention', body: 'We do not maintain a database of user information. Blockchain transaction data is retained indefinitely by the OP_NET network by its nature. Any off-chain analytics data is retained for a maximum of 90 days.' },
        { title: '8. Your Rights', body: 'Because we collect minimal off-chain data, most privacy rights (access, deletion, correction) do not apply to on-chain transaction data. For any off-chain data inquiries, contact us via GitHub. We will respond within 30 days.' },
        { title: '9. Security', body: 'We take reasonable measures to secure any off-chain systems. However, no system is 100% secure. The decentralized nature of OP_NET means that smart contract interactions are secured by the Bitcoin network\'s consensus mechanism.' },
        { title: '10. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the Platform after changes constitutes acceptance of the new policy.' },
        { title: '11. Contact', body: 'For privacy inquiries, contact us via GitHub at github.com/Opwabtc or through official OPWA community channels.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{s.title}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>{s.body}</p>
        </div>
      ))}

      <div style={{ marginTop: 48, padding: '20px 24px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-3)' }}>
        We are committed to protecting your privacy and operating transparently on a public blockchain.
        <div style={{ marginTop: 12 }}>
          <a href="/" style={{ color: 'var(--accent)', marginRight: 16 }}>← Back to Platform</a>
          <a href="/terms" style={{ color: 'var(--text-3)' }}>Terms of Service →</a>
        </div>
      </div>
    </div>
  )
}
