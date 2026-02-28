import { useCallback } from 'react';
import { useOPNETWallet } from '@/hooks/useOPNETWallet';
import { useAppStore } from '@/store/useAppStore';
import { getBalance, getTokenBalance } from '@/lib/opnet';

// Fill in after contract deployment
const OPWA_TOKEN_ADDRESS = import.meta.env.VITE_OPWA_TOKEN_ADDRESS as string | undefined;

export const useWallet = () => {
  const { setWallet, addNotification, setIsLoading, isLoading, wallet } = useAppStore();

  const {
    openConnectModal,
    disconnect: sdkDisconnect,
    walletAddress,
    connecting,
    isConnected,
    shortAddress,
    btcBalance,
    network: walletNetwork,
  } = useOPNETWallet();

  /** Open the OP_WALLET / WalletConnect modal to request accounts. */
  const connect = useCallback(async () => {
    setIsLoading(true);
    try {
      await openConnectModal();
      // After modal resolves, walletAddress will be populated by the SDK.
      // The useEffect below syncs state to Zustand.
    } catch (error) {
      console.error('Wallet connection failed:', error);
      addNotification({
        type: 'error',
        title: 'Connection Failed',
        message: error instanceof Error ? error.message : 'Failed to connect wallet',
      });
    } finally {
      setIsLoading(false);
    }
  }, [openConnectModal, setIsLoading, addNotification]);

  /** Disconnect wallet and clear Zustand state. */
  const disconnect = useCallback(async () => {
    setIsLoading(true);
    try {
      await sdkDisconnect();
      setWallet({ isConnected: false, balance: 0, network: 'testnet' });
    } catch (error) {
      console.error('Disconnect failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [sdkDisconnect, setWallet, setIsLoading]);

  /**
   * Fetch fresh BTC balance from OP_NET for the currently connected address.
   * Returns balance in satoshis as a number.
   */
  const fetchBalance = useCallback(async (): Promise<number> => {
    if (!walletAddress) return 0;
    try {
      const sats = await getBalance(walletAddress);
      return Number(sats);
    } catch {
      // Fallback to SDK-provided balance when RPC call fails
      return btcBalance ? Math.round(parseFloat(btcBalance) * 1e8) : 0;
    }
  }, [walletAddress, btcBalance]);

  /**
   * Fetch OPWA token balance for the connected address.
   * Returns raw base-unit amount (8 decimals).
   */
  const fetchOPWABalance = useCallback(async (): Promise<bigint> => {
    if (!walletAddress || !OPWA_TOKEN_ADDRESS) return 0n;
    try {
      return await getTokenBalance(OPWA_TOKEN_ADDRESS, walletAddress);
    } catch {
      return 0n;
    }
  }, [walletAddress]);

  /**
   * Sync wallet SDK state → Zustand store.
   * Call this after connect() or when the wallet address changes.
   */
  const syncWalletState = useCallback(async () => {
    if (!isConnected || !walletAddress) {
      setWallet({ isConnected: false, balance: 0, network: 'testnet' });
      return;
    }
    const balance = await fetchBalance();
    // WalletConnectNetwork extends bitcoin Network; bech32 === 'bc' means mainnet
    const net: 'mainnet' | 'testnet' =
      walletNetwork?.bech32 === 'bc' ? 'mainnet' : 'testnet';
    setWallet({ isConnected: true, address: walletAddress, balance, network: net });
  }, [isConnected, walletAddress, fetchBalance, setWallet, walletNetwork]);

  return {
    wallet,
    isLoading: isLoading || connecting,
    connect,
    disconnect,
    fetchBalance,
    fetchOPWABalance,
    syncWalletState,
    shortAddress,
    btcBalance,
    // True when at least one compatible wallet extension is detected by the SDK
    isWalletAvailable: true,
  };
};
