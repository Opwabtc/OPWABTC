import { useEffect, useCallback } from 'react';
import { useOPNETWallet } from './useOPNETWallet';
import { useAppStore } from '@/store/useAppStore';
import { provider as defaultProvider, network as testnet, getTokenBalance } from '@/lib/opnet';
import { JSONRpcProvider } from 'opnet';

// Replace with actual deployed contract addresses after deployment
const OPWA_TOKEN_ADDRESS = (import.meta.env.VITE_OPWA_TOKEN_ADDRESS as string) ?? '';

export function useSyncWallet() {
  const {
    provider: walletProvider,
    network: walletNetwork,
    walletBalance,
    isConnected,
    walletAddress,
  } = useOPNETWallet();

  const { setWallet } = useAppStore();

  const sync = useCallback(async () => {
    if (!isConnected || !walletAddress) {
      setWallet({ isConnected: false, balance: 0, network: 'testnet' });
      return;
    }

    // Prefer wallet's own provider; fall back to public RPC
    void ((walletProvider as JSONRpcProvider | undefined) ?? defaultProvider);
    void testnet;

    try {
      // BTC balance from SDK (already confirmed UTXO balance in satoshis)
      const btcSats = walletBalance?.total ?? 0;

      // Optional: fetch OPWA token balance if contract is deployed
      if (OPWA_TOKEN_ADDRESS) {
        try {
          void await getTokenBalance(OPWA_TOKEN_ADDRESS, walletAddress);
        } catch {
          // Contract not yet deployed — skip silently
        }
      }

      // WalletConnectNetwork extends Network; bech32 === 'bc' means mainnet
      const networkName: 'mainnet' | 'testnet' =
        walletNetwork?.bech32 === 'bc' ? 'mainnet' : 'testnet';

      setWallet({
        isConnected: true,
        address: walletAddress,
        balance: btcSats,
        network: networkName,
      });
    } catch (err) {
      console.error('[OPWA] Wallet sync failed:', err);
    }
  }, [isConnected, walletAddress, walletBalance, walletNetwork, walletProvider, setWallet]);

  // Sync on connect/disconnect and every 60 s
  useEffect(() => {
    sync();
    const interval = setInterval(sync, 60_000);
    return () => {
      clearInterval(interval);
    };
  }, [sync]);

  return { sync };
}
