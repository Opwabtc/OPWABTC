import { useCallback, useEffect, useState } from 'react';
import { Address } from '@btc-vision/transaction';
import {
  AbstractRpcProvider,
  getContract,
  IOP20Contract,
  JSONRpcProvider,
  OP_20_ABI,
  InteractionTransactionReceipt,
} from 'opnet';
import { Network } from '@btc-vision/bitcoin';
import { CONTRACTS, OPWA_SATS_PER_TOKEN } from '@/contracts/config';
import { useOPNETWallet } from './useOPNETWallet';
import { useAppStore } from '@/store/useAppStore';

function getOPWAContract(
  provider: AbstractRpcProvider,
  network: Network,
  caller?: Address,
): IOP20Contract {
  return getContract<IOP20Contract>(
    CONTRACTS.opwaCoin,
    OP_20_ABI,
    provider as unknown as JSONRpcProvider,
    network,
    caller,
  );
}

// ── State ─────────────────────────────────────────────────────────────────────

interface TokenInfo {
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly totalSupply: bigint;
  readonly maxSupply: bigint;
}

interface BuyState {
  readonly tokenInfo: TokenInfo | null;
  readonly walletBalance: bigint | null;
  readonly quantity: string;
  readonly buying: boolean;
  readonly txHash: string | null;
  readonly error: string | null;
}

const INITIAL: BuyState = {
  tokenInfo: null,
  walletBalance: null,
  quantity: '1000',
  buying: false,
  txHash: null,
  error: null,
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useBuyOPWA() {
  const { walletAddress, address, provider, network } = useOPNETWallet();
  const btcPrice = useAppStore((s) => s.btcPrice);
  const [state, setState] = useState<BuyState>(INITIAL);

  // ── Read token info ────────────────────────────────────────────────────────

  const fetchInfo = useCallback(async () => {
    if (!provider || !network) return;
    try {
      const contract = getOPWAContract(provider, network, address ?? undefined);
      const tasks: [
        ReturnType<IOP20Contract['name']>,
        ReturnType<IOP20Contract['symbol']>,
        ReturnType<IOP20Contract['decimals']>,
        ReturnType<IOP20Contract['totalSupply']>,
        ReturnType<IOP20Contract['maximumSupply']>,
      ] = [
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
        contract.maximumSupply(),
      ];

      const [nameR, symbolR, decimalsR, supplyR, maxR] = await Promise.all(tasks);

      const info: TokenInfo = {
        name:        nameR.properties.name as string,
        symbol:      symbolR.properties.symbol as string,
        decimals:    decimalsR.properties.decimals as number,
        totalSupply: supplyR.properties.totalSupply as bigint,
        maxSupply:   maxR.properties.maximumSupply as bigint,
      };

      let walletBalance: bigint | null = null;
      if (address) {
        const balR = await contract.balanceOf(address);
        walletBalance = balR.properties.balance as bigint;
      }

      setState((prev) => ({ ...prev, tokenInfo: info, walletBalance }));
    } catch (err) {
      console.error('[useBuyOPWA] fetchInfo:', err);
    }
  }, [provider, network, address]);

  useEffect(() => { void fetchInfo(); }, [fetchInfo]);

  // ── Price helpers ──────────────────────────────────────────────────────────

  const parsedQty = Math.max(0, parseInt(state.quantity, 10) || 0);

  /** Total satoshis for the current quantity */
  const totalSats: bigint = OPWA_SATS_PER_TOKEN * BigInt(parsedQty);

  /** Total BTC (number, for display) */
  const totalBTC: number = parsedQty * 0.00001;

  /** Total USD using live BTC price */
  const totalUSD: number | null =
    btcPrice !== null ? totalBTC * btcPrice : null;

  // ── Raw token amount (accounting for decimals) ─────────────────────────────

  function toRaw(qty: number, decimals: number): bigint {
    return BigInt(qty) * 10n ** BigInt(decimals);
  }

  // ── Transfer (owner sends tokens to a buyer address) ──────────────────────

  const transferTo = useCallback(
    async (recipientAddress: Address) => {
      if (!walletAddress || !address || !provider || !network) {
        setState((prev) => ({ ...prev, error: 'Wallet not connected.' }));
        return;
      }

      const qty = parsedQty;
      if (qty <= 0) {
        setState((prev) => ({ ...prev, error: 'Enter a valid quantity.' }));
        return;
      }

      const decimals = state.tokenInfo?.decimals ?? 8;
      const rawAmount = toRaw(qty, decimals);

      setState((prev) => ({ ...prev, buying: true, error: null, txHash: null }));

      try {
        const contract = getOPWAContract(provider, network, address);
        const simulation = await contract.transfer(recipientAddress, rawAmount);

        if (simulation.revert) throw new Error(simulation.revert);

        const receipt: InteractionTransactionReceipt = await simulation.sendTransaction({
          signer: null,
          mldsaSigner: null,
          refundTo: walletAddress,
          network,
          maximumAllowedSatToSpend: 100_000n,
        });

        setState((prev) => ({ ...prev, txHash: receipt.transactionId }));
        void fetchInfo();
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : String(err),
        }));
      } finally {
        setState((prev) => ({ ...prev, buying: false }));
      }
    },
    [walletAddress, address, provider, network, parsedQty, state.tokenInfo, fetchInfo],
  );

  return {
    ...state,
    parsedQty,
    totalSats,
    totalBTC,
    totalUSD,
    contractAddress: CONTRACTS.opwaCoin,
    setQuantity: (q: string) => setState((prev) => ({ ...prev, quantity: q, error: null })),
    transferTo,
    refresh: fetchInfo,
  };
}
