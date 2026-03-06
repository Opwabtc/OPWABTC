import { useState } from 'react';
import { Address } from '@btc-vision/transaction';
import { useBuyOPWA } from '@/hooks/useBuyOPWA';
import { useOPNETWallet } from '@/hooks/useOPNETWallet';

const OPSCAN = 'https://testnet.opscan.io/tx/';
const QUICK_AMOUNTS = [1_000, 5_000, 10_000, 50_000, 100_000];

function _hexToBytes(hex: string): Uint8Array {
  const clean = (hex || '').replace(/^0x/, '');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export default function BuyToken() {
  // FIX SF-04: hashedMLDSAKey exists in useOPNETWallet (confirmed from hook source)
  // tweakedPubkey does NOT exist — use publicKey (compressed 33-byte) instead
  const { isConnected, walletAddress, hashedMLDSAKey, publicKey } = useOPNETWallet();
  const {
    tokenInfo, walletBalance, quantity, setQuantity, parsedQty,
    totalSats, totalBTC, totalUSD, pricePerToken,
    buying, txHash, error, contractAddress, treasuryP2TR, contractReady,
    buy, refresh,
  } = useBuyOPWA();

  const [recipientInput, setRecipientInput] = useState('');
  const [useOwnWallet, setUseOwnWallet] = useState(true);

  const decimals = tokenInfo?.decimals ?? 8;
  const balanceDisplay = walletBalance !== null
    ? (Number(walletBalance) / 10 ** decimals).toLocaleString('en-US')
    : '--';
  const supplyDisplay = tokenInfo
    ? `${(Number(tokenInfo.totalSupply) / 10 ** decimals).toLocaleString('en-US')} / ${(Number(tokenInfo.maxSupply) / 10 ** decimals).toLocaleString('en-US')}`
    : '--';

  const handleBuy = async () => {
    if (!isConnected || !walletAddress || !hashedMLDSAKey || !publicKey) return;
    const dest = useOwnWallet ? walletAddress : recipientInput.trim();
    if (!dest) return;
    try {
      // FIX SF-04: Address(mldsaHash32bytes, pubkeyBytes)
      // hashedMLDSAKey = 32-byte SHA-256 hash of raw ML-DSA key (from useOPNETWallet)
      // publicKey      = 33-byte compressed secp256k1 pubkey
      const addr = new Address(_hexToBytes(hashedMLDSAKey), _hexToBytes(publicKey));
      await buy(addr);
    } catch (e) {
      console.error('BuyToken: address construction failed', e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Buy {tokenInfo?.symbol ?? 'OPWA'} Tokens
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-mono break-all">
            {contractAddress}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Token"        value={tokenInfo?.name ?? '--'} />
          <StatCard label="Symbol"       value={tokenInfo?.symbol ?? '--'} />
          <StatCard label="Supply"       value={supplyDisplay} />
          <StatCard label="Your balance" value={`${balanceDisplay} ${tokenInfo?.symbol ?? ''}`} />
        </div>

        <div className="bg-bitcoin-orange/10 border border-bitcoin-orange/30 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Price per token</p>
            <p className="text-2xl font-bold text-bitcoin-orange">{Number(pricePerToken).toLocaleString()} sats</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">= {(Number(pricePerToken) / 100_000_000).toFixed(8)} BTC per token</p>
            {treasuryP2TR && (
              <p className="text-xs text-gray-400 mt-1 font-mono truncate max-w-xs">Treasury: {treasuryP2TR.slice(0, 20)}…</p>
            )}
          </div>
          <button onClick={refresh} className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" title="Refresh">↻</button>
        </div>

        <div className="card p-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity (tokens)</label>
          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((a) => (
              <button key={a} onClick={() => setQuantity(String(a))}
                className={['px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors',
                  parsedQty === a ? 'bg-bitcoin-orange text-white border-bitcoin-orange'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-bitcoin-orange'].join(' ')}>
                {a.toLocaleString()}
              </button>
            ))}
          </div>
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-mono focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
            placeholder="Enter quantity" />
          <input type="range" min="1000" max="100000" step="1000" value={Math.min(parsedQty, 100_000)}
            onChange={(e) => setQuantity(e.target.value)} className="w-full accent-bitcoin-orange" />
          <div className="flex justify-between text-xs text-gray-400"><span>1,000</span><span>100,000</span></div>
        </div>

        <div className="card p-6 space-y-3">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Order Summary</h2>
          <SummaryRow label="Tokens" value={parsedQty.toLocaleString()} />
          <SummaryRow label="Price per token" value={`${Number(pricePerToken).toLocaleString()} sats`} />
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
            <SummaryRow label="Total (sats)" value={Number(totalSats).toLocaleString()} bold />
            <SummaryRow label="Total (BTC)"  value={`BTC ${totalBTC.toFixed(8)}`} bold />
            {totalUSD !== null && (
              <SummaryRow label="Total (USD ~)" value={`$${totalUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })}`} bold />
            )}
          </div>
        </div>

        {isConnected && (
          <div className="card p-6 space-y-3">
            <h2 className="font-semibold text-gray-900 dark:text-white">Recipient</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={useOwnWallet} onChange={(e) => setUseOwnWallet(e.target.checked)} className="accent-bitcoin-orange" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Send to my connected wallet</span>
            </label>
            {!useOwnWallet && (
              <input type="text" placeholder="opt1p... recipient address" value={recipientInput}
                onChange={(e) => setRecipientInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent" />
            )}
          </div>
        )}

        {!contractAddress && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm text-yellow-700 dark:text-yellow-400">
            Contract not deployed yet. Deploy OPWACoin and update config.ts.
          </div>
        )}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-400">{error}</div>
        )}
        {txHash && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-700 dark:text-green-400">
            Transaction sent!{' '}
            <a href={`${OPSCAN}${txHash}`} target="_blank" rel="noopener noreferrer" className="underline font-mono">{txHash.slice(0, 16)}...</a>
          </div>
        )}

        {isConnected ? (
          <button onClick={handleBuy} disabled={buying || parsedQty <= 0 || !contractReady}
            className="w-full bg-bitcoin-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors shadow-lg">
            {buying ? 'Processing…' : !contractReady ? 'Loading contract…'
              : `Invest ${parsedQty.toLocaleString()} ${tokenInfo?.symbol ?? 'OPWA'} — Pay BTC ${totalBTC.toFixed(8)}`}
          </button>
        ) : (
          <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-500 dark:text-gray-400">
            Connect your wallet to buy tokens
          </div>
        )}

        <p className="text-xs text-gray-400 text-center">
          OPNet testnet — {contractAddress ? contractAddress.slice(0, 12) + '...' : 'not deployed'}
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${bold ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
      <span className={`font-mono text-sm ${bold ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{value}</span>
    </div>
  );
}
