import React from 'react';
import { Wallet, LogOut, RefreshCw } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { formatSatsToBTC } from '@/lib/utils';

export const WalletButton: React.FC = () => {
  const { 
    wallet, 
    connect, 
    disconnect, 
    isWalletAvailable, 
    isLoading 
  } = useWallet();

  if (!isWalletAvailable) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
        No wallet detected. Please install OP_NET wallet.
      </div>
    );
  }

  if (!wallet.isConnected) {
    return (
      <button
        onClick={() => connect()}
        disabled={isLoading}
        className="flex items-center gap-2 bg-bitcoin-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="w-4 h-4" />
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 dark:text-gray-400">Balance</span>
        <span className="font-mono text-sm font-medium">
          {formatSatsToBTC(wallet.balance)} BTC
        </span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 dark:text-gray-400">Address</span>
        <span className="font-mono text-xs">
          {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
        </span>
      </div>

      <div className="flex items-center gap-1 ml-2">
        <button
          onClick={connect}
          disabled={isLoading}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
          title="Connect"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        
        <button
          onClick={disconnect}
          disabled={isLoading}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
          title="Disconnect"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
