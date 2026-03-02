import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useMintNFT } from '@/hooks/useMintNFT';

const OPSCAN_BASE = 'https://testnet.opscan.io/tx/';

export const AdminMint: React.FC = () => {
  const { connected: isConnected } = useAppStore();
  const {
    mintPrice,
    isOpen,
    totalSupply,
    maxSupply,
    minting,
    txHash,
    error,
    contractAddress,
    mint,
    refresh,
  } = useMintNFT();

  if (!isConnected) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Connect your wallet to access the mint panel.
        </p>
      </div>
    );
  }

  const mintPriceSats = mintPrice !== null ? mintPrice.toString() : '—';
  const mintPriceBTC =
    mintPrice !== null ? (Number(mintPrice) / 1e8).toFixed(8) : '—';
  const supplyLabel =
    totalSupply !== null && maxSupply !== null
      ? `${totalSupply.toString()} / ${maxSupply.toString()}`
      : '—';

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Mint PropertyNFT
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all">
          Contract:{' '}
          <a
            href={`${OPSCAN_BASE}${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bitcoin-orange underline"
          >
            {contractAddress}
          </a>
        </p>
      </div>

      {/* Collection stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <StatCard label="Price" value={`${mintPriceSats} sats`} sub={`${mintPriceBTC} BTC`} />
        <StatCard label="Minted" value={supplyLabel} />
        <StatCard
          label="Status"
          value={isOpen ? 'Open' : 'Closed'}
          valueClass={isOpen ? 'text-green-500' : 'text-red-400'}
        />
      </div>

      {/* Feedback */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}
      {txHash && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-700 dark:text-green-400">
          Minted!{' '}
          <a
            href={`${OPSCAN_BASE}${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-mono"
          >
            {txHash.slice(0, 14)}…
          </a>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={mint}
          disabled={minting || !isOpen}
          className="flex-1 bg-bitcoin-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {minting ? 'Minting…' : 'Mint NFT'}
        </button>
        <button
          onClick={refresh}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          title="Refresh stats"
        >
          ↻
        </button>
      </div>

      {!isOpen && (
        <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center">
          Minting is currently closed by the contract owner.
        </p>
      )}
    </div>
  );
};

// ── Small helper component ────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}

function StatCard({ label, value, sub, valueClass = 'text-gray-900 dark:text-white' }: StatCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className={`font-semibold text-sm ${valueClass}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}
