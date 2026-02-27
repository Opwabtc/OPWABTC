import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Building2, 
  TrendingUp, 
  Calculator, 
  Menu, 
  X, 
  User, 
  Zap,
  ChevronDown 
} from 'lucide-react';
import { useOPNETWallet } from '@/hooks/useOPNETWallet';
import { useGasPrice } from '@/hooks/useGasPrice';
import { useBTCPrice } from '@/hooks/useBTCPrice';
import { ThemeToggle } from './ThemeToggle';
import { WalletDropdown } from './WalletDropdown';
import { GasConverterWidget } from './GasConverterWidget';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const { 
    openConnectModal, 
    isConnected, 
    shortAddress, 
    btcBalance,
    disconnect, 
    connecting,
    network
  } = useOPNETWallet();
  const { gasPrice, loading: gasLoading } = useGasPrice();
  const btcPrice = useBTCPrice();

  const isActive = (href: string) => location.pathname === href;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyAddress = () => {
    if (shortAddress) {
      navigator.clipboard.writeText(shortAddress);
    }
    setWalletDropdownOpen(false);
  };

  const handleViewExplorer = () => {
    if (shortAddress) {
      window.open(`https://explorer.opnet.org/address/${shortAddress}`, '_blank');
    }
    setWalletDropdownOpen(false);
  };

  return (
    <>
      {/* ═══════════════════════════════════════
           NAVBAR
      ══════════════════════════════════════ */}
      <nav className="navbar fade-in">
        <Link to="/" className="logo">
          <div className="logo-mark">OP</div>
          <div>
            <div className="logo-name">OPWA</div>
            <div className="logo-tagline">Platform</div>
          </div>
        </Link>

        <div className="nav-links">
          <button className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => scrollToSection('hero')}>
            <HomeIcon width={15} height={15} />
            Home
          </button>
          <button className={`nav-link ${isActive('/marketplace') ? 'active' : ''}`} onClick={() => scrollToSection('assets')}>
            <Building2 width={15} height={15} />
            Assets
          </button>
          <button className={`nav-link ${isActive('/simulator') ? 'active' : ''}`} onClick={() => scrollToSection('simulator')}>
            <Calculator width={15} height={15} />
            Simulator
          </button>
          <button className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => scrollToSection('features')}>
            <TrendingUp width={15} height={15} />
            Features
          </button>
        </div>

        <div className="navbar-right">
          {/* gas ticker */}
          <div className="gas-ticker" title="Estimated gas fee on OP_NET network">
            <Zap className="gas-ticker-icon" width={13} height={13} />
            <span>Gas</span>
            <span className="gas-ticker-val">
              {gasLoading ? '...' : gasPrice ? `${gasPrice} sat/vB` : '—'}
            </span>
            <span className="gas-ticker-usd">
              {gasPrice && btcPrice ? `($${((gasPrice * 250) / 1e8 * btcPrice).toFixed(4)})` : '($ —)'}
            </span>
          </div>

          {/* theme toggle */}
          <ThemeToggle />

          {/* estado desconectado */}
          {!isConnected && (
            <button 
              className="btn-primary" 
              onClick={openConnectModal}
              disabled={connecting}
            >
              <User width={14} height={14} />
              {connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}

          {/* estado conectado */}
          {isConnected && (
            <div className="wallet-connected">
              <div className="wallet-balance">
                <span className="wallet-balance-icon">₿</span>
                <span>{btcBalance || '—'}</span>
              </div>
              <div className="wallet-addr">
                <span className="wallet-dot"></span>
                <span>{shortAddress}</span>
              </div>
              <button 
                className="wallet-chevron" 
                onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                aria-label="Wallet menu"
              >
                <ChevronDown width={12} height={12} />
              </button>
            </div>
          )}

          {/* hamburger mobile */}
          <button 
            className="btn-menu" 
            aria-label="menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu width={18} height={18} />
          </button>
        </div>
      </nav>

      {/* Wallet Dropdown */}
      <WalletDropdown
        isOpen={walletDropdownOpen}
        address={shortAddress || ''}
        balance={btcBalance || '0'}
        balanceUsd={btcPrice ? (parseFloat(btcBalance || '0') * btcPrice).toFixed(2) : '0.00'}
        onCopyAddress={handleCopyAddress}
        onDisconnect={() => {
          disconnect();
          setWalletDropdownOpen(false);
        }}
        onViewExplorer={handleViewExplorer}
      />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="logo">
                  <div className="logo-mark">OP</div>
                  <div>
                    <div className="logo-name">OPWA</div>
                    <div className="logo-tagline">Platform</div>
                  </div>
                </div>
                <button 
                  className="p-2 text-gray-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X width={20} height={20} />
                </button>
              </div>

              <nav className="mobile-nav-links">
                <button 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('hero');
                    setMobileMenuOpen(false);
                  }}
                >
                  <HomeIcon width={15} height={15} />
                  Home
                </button>
                <button 
                  className={`nav-link ${isActive('/marketplace') ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('assets');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Building2 width={15} height={15} />
                  Assets
                </button>
                <button 
                  className={`nav-link ${isActive('/simulator') ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('simulator');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Calculator width={15} height={15} />
                  Simulator
                </button>
                <button 
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  onClick={() => {
                    scrollToSection('features');
                    setMobileMenuOpen(false);
                  }}
                >
                  <TrendingUp width={15} height={15} />
                  Features
                </button>
              </nav>

              <div className="mt-8 space-y-4">
                <button 
                  className="btn-ghost-nav w-full"
                  onClick={() => {
                    if (isConnected) {
                      disconnect();
                    } else {
                      openConnectModal();
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  {isConnected ? 'Disconnect' : 'Login'}
                </button>
                <button 
                  className="btn-primary w-full"
                  onClick={() => {
                    if (!isConnected) {
                      openConnectModal();
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  <User width={14} height={14} />
                  {isConnected ? 'My Account' : 'Connect Wallet'}
                </button>
              </div>

              {isConnected && (
                <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Wallet Connected</div>
                  <div className="text-xs text-gray-500 font-mono">
                    {shortAddress}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Balance: {btcBalance} BTC
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-item">
          <div className="dot"></div>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
        <div className="status-item">· Network: {network?.network || 'testnet'}</div>
        <div className="status-item">· Version: 1.0.0</div>
        <div 
          className="status-item" 
          style={{marginLeft: 'auto', cursor: 'pointer', color: 'var(--text-2)'}}
        >
          ? Help
        </div>
      </div>

      {/* Gas Converter Widget */}
      <GasConverterWidget gasPrice={gasPrice} btcPrice={btcPrice} />
    </>
  );
};
