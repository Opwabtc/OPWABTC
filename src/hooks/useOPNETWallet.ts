// src/hooks/useOPNETWallet.ts
import { useWalletConnect } from '@btc-vision/walletconnect';

export const useOPNETWallet = () => {
  const {
    openConnectModal,
    connectToWallet,
    disconnect,
    walletAddress,
    publicKey,
    address,
    network,
    provider,
    signer,
    walletBalance,
    connecting,
    walletType,
    walletInstance,
    mldsaPublicKey,
    hashedMLDSAKey,
  } = useWalletConnect();

  // Helper: is the wallet connected?
  const isConnected = !!walletAddress;

  // Helper: formatted short address for display (e.g. "bc1q...4f8e")
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
    : null;

  // Helper: BTC balance in human-readable form
  const btcBalance = walletBalance
    ? (walletBalance.total / 1e8).toFixed(8)
    : null;

  // Helper: USD balance string already provided by SDK
  const usdBalance = walletBalance?.usd_value ?? null;

  return {
    // raw SDK values
    openConnectModal,
    connectToWallet,
    disconnect,
    walletAddress,
    publicKey,
    address,
    network,
    provider,
    signer,
    walletBalance,
    connecting,
    walletType,
    walletInstance,
    mldsaPublicKey,
    hashedMLDSAKey,
    // computed helpers
    isConnected,
    shortAddress,
    btcBalance,
    usdBalance,
  };
};
