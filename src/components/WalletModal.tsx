import React, { useState } from 'react';
import { X, Wallet, Shield, Zap, Crown } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [selectedNetwork, setSelectedNetwork] = useState('OP_NET Testnet');

  const wallets = [
    {
      name: 'OPWallet',
      description: 'Official OP_NET Wallet · Native Bitcoin',
      icon: <Crown size={20} />,
      badge: 'Recommended',
      type: 'opwallet'
    },
    {
      name: 'Xverse',
      description: 'Bitcoin · Ordinals · OP_NET',
      icon: <Shield size={20} />,
      badge: 'Recommended',
      type: 'xverse'
    },
    {
      name: 'Unisat Wallet',
      description: 'Bitcoin native · OP_NET',
      icon: <Wallet size={20} />,
      badge: null,
      type: 'unisat'
    },
    {
      name: 'OKX Wallet',
      description: 'Multi-chain · Web3',
      icon: <Zap size={20} />,
      badge: null,
      type: 'okx'
    }
  ];

  const networks = [
    { name: 'Testnet', status: 'Active', id: 'OP_NET Testnet' },
    { name: 'Mainnet', status: 'Soon', id: 'OP_NET Mainnet' }
  ];

  const handleConnect = (walletType: string) => {
    onConnect(walletType);
    onClose();
  };

  const isOPWalletAvailable = () => {
    return typeof window !== 'undefined' && !!(window as any).opwallet;
  };

  const isXverseAvailable = () => {
    return typeof window !== 'undefined' && !!(window as any).xverse;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Connect Wallet</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={14} />
          </button>
        </div>
        <p className="modal-subtitle">Choose your wallet to connect to the platform.</p>

        <div className="wallet-options">
          {wallets.map((wallet) => (
            <button
              key={wallet.type}
              className={`wallet-option ${wallet.type === 'opwallet' && !isOPWalletAvailable() ? 'opacity-50 cursor-not-allowed' : ''} ${wallet.type === 'xverse' && !isXverseAvailable() ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (wallet.type === 'opwallet' && !isOPWalletAvailable()) return null;
                if (wallet.type === 'xverse' && !isXverseAvailable()) return null;
                return handleConnect(wallet.type);
              }}
              disabled={wallet.type === 'opwallet' && !isOPWalletAvailable() || wallet.type === 'xverse' && !isXverseAvailable()}
            >
              <div className="wallet-option-icon">
                {wallet.icon}
              </div>
              <div>
                <div className="wallet-option-name">{wallet.name}</div>
                <div className="wallet-option-desc">{wallet.description}</div>
                {wallet.type === 'opwallet' && !isOPWalletAvailable() && (
                  <div className="wallet-option-desc text-orange-500 text-xs mt-1">
                    OPWallet not detected — Install OPWallet
                  </div>
                )}
                {wallet.type === 'xverse' && !isXverseAvailable() && (
                  <div className="wallet-option-desc text-orange-500 text-xs mt-1">
                    Xverse not detected — Install Xverse
                  </div>
                )}
              </div>
              {wallet.badge && (
                <span className="wallet-option-badge">{wallet.badge}</span>
              )}
            </button>
          ))}
        </div>

        {!isOPWalletAvailable() && !isXverseAvailable() && (
          <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              <strong>Wallet Required:</strong> Install either OPWallet or Xverse to connect to the platform.
            </p>
            <div className="flex gap-4 mt-2">
              <a 
                href="https://opwallet.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
              >
                Install OPWallet
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <a 
                href="https://www.xverse.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Install Xverse
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        )}

        {!isOPWalletAvailable() && isXverseAvailable() && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Xverse Available:</strong> Xverse is ready to use! OPWallet is optional for enhanced features.
            </p>
          </div>
        )}

        {isOPWalletAvailable() && !isXverseAvailable() && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>OPWallet Ready:</strong> OPWallet is installed and ready to connect!
            </p>
          </div>
        )}

        <div className="network-selector">
          <div className="network-selector-label">Select Network</div>
          <div className="network-options">
            {networks.map((network) => (
              <div
                key={network.id}
                className={`network-option ${selectedNetwork === network.id ? 'active' : ''}`}
                onClick={() => setSelectedNetwork(network.id)}
              >
                <div className="network-option-name">{network.name}</div>
                <div className="network-option-status">
                  {network.status === 'Active' ? (
                    <>
                      <span className="dot"></span> {network.status}
                    </>
                  ) : (
                    <span style={{ color: 'var(--text-3)' }}>{network.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
