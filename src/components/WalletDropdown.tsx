import React from 'react';
import { Copy, ExternalLink, LogOut } from 'lucide-react';

interface WalletDropdownProps {
  isOpen: boolean;
  address: string;
  balance: string;
  balanceUsd: string;
  onCopyAddress: () => void;
  onDisconnect: () => void;
  onViewExplorer: () => void;
}

export const WalletDropdown: React.FC<WalletDropdownProps> = ({
  isOpen,
  address,
  balance,
  balanceUsd,
  onCopyAddress,
  onDisconnect,
  onViewExplorer
}) => {
  if (!isOpen) return null;

  return (
    <div className="wallet-dropdown open">
      <div className="wd-address">{address}</div>
      <div className="wd-balance">₿ {balance}</div>
      <div className="wd-balance-usd">≈ ${balanceUsd}</div>
      <div className="wd-divider"></div>
      <div className="wd-actions">
        <button className="wd-action" onClick={onCopyAddress}>
          <Copy size={15} />
          Copy Address
        </button>
        <button className="wd-action" onClick={onViewExplorer}>
          <ExternalLink size={15} />
          View on Explorer
        </button>
        <div className="wd-divider"></div>
        <button className="wd-action danger" onClick={onDisconnect}>
          <LogOut size={15} />
          Disconnect
        </button>
      </div>
    </div>
  );
};
