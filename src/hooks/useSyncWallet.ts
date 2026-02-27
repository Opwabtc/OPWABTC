import { useEffect, useCallback } from 'react';
import { useOPNETWallet } from './useOPNETWallet';
import { fetchTokenBalance, fetchTokenMetadata } from '../utils/opnetContracts';
import { JSONRpcProvider } from 'opnet';

// List every OPWA property contract address here.
// Replace with your actual deployed contract addresses.
const OPWA_CONTRACTS: string[] = [
  // 'bc1p...contract1',
  // 'bc1p...contract2',
];

export function useSyncWallet() {
  const {
    provider, network,
    address, walletBalance, isConnected,
  } = useOPNETWallet();

  const sync = useCallback(async () => {
    if (!isConnected || !provider || !network || !address) return;

    const opnetProvider = provider as JSONRpcProvider;
    const net = network as any;

    try {
      // 1. BTC balance — already in walletBalance from hook
      if (walletBalance) {
        // TODO: Add these setters to store
        // store.setBtcBalance(walletBalance.total);
        // store.setUsdBalance(walletBalance.usd_value);
      }

      // 2. OP-20 token balances for each OPWA contract
      await Promise.all(
        OPWA_CONTRACTS.map(async (contractAddr) => {
          const [meta, balance] = await Promise.all([
            fetchTokenMetadata(contractAddr, opnetProvider, net),
            fetchTokenBalance(contractAddr, address, opnetProvider, net),
          ]);
          return { contractAddr, ...meta, balance };
        })
      );
      // TODO: Add this setter to store
      // store.setTokenHoldings(holdings);

      // 3. Network name
      // TODO: Add this setter to store
      // store.setNetwork(network.network);

    } catch (err) {
      console.error('[OPWA] Wallet sync failed:', err);
    }
  }, [isConnected, provider, network, address, walletBalance]);

  // Run on connect + every 60 seconds
  useEffect(() => {
    sync();
    const interval = setInterval(sync, 60_000);
    return () => clearInterval(interval);
  }, [sync]);

  // Expose so pages can trigger manual refresh after a TX
  return { sync };
}
