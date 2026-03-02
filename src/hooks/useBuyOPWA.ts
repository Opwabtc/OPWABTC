import { useCallback, useEffect, useState } from 'react';
import { ABIDataTypes, Address } from '@btc-vision/transaction';
import {
  AbstractRpcProvider,
  BitcoinAbiTypes,
  BitcoinInterfaceAbi,
  CallResult,
  getContract,
  IOP20Contract,
  JSONRpcProvider,
  OP_20_ABI,
  InteractionTransactionReceipt,
  TransactionOutputFlags,
} from 'opnet';
import { Network } from '@btc-vision/bitcoin';
import { CONTRACTS, OPWA_SATS_PER_TOKEN, TREASURY_P2TR } from '@/contracts/config';
import { useOPNETWallet } from './useOPNETWallet';
import { useAppStore } from '@/store/useAppStore';

// ── ABI: OP-20 base + custom buy/getPrice/getTreasury ────────────────────────

const OPWACOIN_ABI: BitcoinInterfaceAbi = [
  ...(OP_20_ABI as unknown as BitcoinInterfaceAbi),
  {
    name: 'buy',
    type: BitcoinAbiTypes.Function,
    payable: true,
    inputs: [
      { name: 'to',     type: ABIDataTypes.ADDRESS },
      { name: 'amount', type: ABIDataTypes.UINT256 },
    ],
    outputs: [{ name: 'success', type: ABIDataTypes.BOOL }],
  },
  {
    name: 'getPrice',
    type: BitcoinAbiTypes.Function,
    payable: false,
    inputs: [],
    outputs: [{ name: 'price', type: ABIDataTypes.UINT256 }],
  },
  {
    name: 'getTreasury',
    type: BitcoinAbiTypes.Function,
    payable: false,
    inputs: [],
    outputs: [{ name: 'treasury', type: ABIDataTypes.ADDRESS }],
  },
];

interface IOPWACoinContract extends IOP20Contract {
  buy(to: Address, amount: bigint): Promise<CallResult<{ success: boolean }>>;
  getPrice(): Promise<CallResult<{ price: bigint }>>;
  getTreasury(): Promise<CallResult<{ treasury: Address }>>;
}

function getOPWACoinContract(
  provider: AbstractRpcProvider,
  network: Network,
  caller?: Address,
): IOPWACoinContract {
  return getContract<IOPWACoinContract>(
    CONTRACTS.opwaCoin,
    OPWACOIN_ABI,
    provider as unknown as JSONRpcProvider,
    network,
    caller,
  );
}

// ── State ────────────────────────────────────────────────────────────────────

interface TokenInfo {
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly totalSupply: bigint;
  readonly maxSupply: bigint;
  readonly pricePerToken: bigint; // sats per whole token, from contract
}

interface BuyState {
  readonly tokenInfo: TokenInfo | null;
  readonly walletBalance: bigint | null;
  readonly quantity: string;
  readonly buying: boolean;
  readonly txHash: string | null;
  readonly error: string | null;
  readonly contractReady: boolean;
}

const INITIAL: BuyState = {
  tokenInfo: null,
  walletBalance: null,
  quantity: '1000',
  buying: false,
  txHash: null,
  error: null,
  contractReady: false,
};

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useBuyOPWA() {
  const { walletAddress, address, provider, network } = useOPNETWallet();
  const btcPrice = useAppStore((s) => s.btcPrice);
  const [state, setState] = useState<BuyState>(INITIAL);

  // ── Fetch token info ────────────────────────────────────────────────────

  const fetchInfo = useCallback(async () => {
    if (!provider || !network) return;
    if (!CONTRACTS.opwaCoin) return; // contract not deployed yet

    try {
      const contract = getOPWACoinContract(provider, network, address ?? undefined);

      const [nameR, symbolR, decimalsR, supplyR, maxR, priceR] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
        contract.maximumSupply(),
        contract.getPrice(),
      ]);

      const info: TokenInfo = {
        name:         nameR.properties.name        as string,
        symbol:       symbolR.properties.symbol    as string,
        decimals:     decimalsR.properties.decimals as number,
        totalSupply:  supplyR.properties.totalSupply as bigint,
        maxSupply:    maxR.properties.maximumSupply  as bigint,
        pricePerToken: priceR.properties.price       as bigint,
      };

      let walletBalance: bigint | null = null;
      if (address) {
        const balR = await contract.balanceOf(address);
        walletBalance = balR.properties.balance as bigint;
      }

      setState((prev) => ({
        ...prev,
        tokenInfo: info,
        walletBalance,
        contractReady: true,
        error: null,
      }));
    } catch (err) {
      console.error('[useBuyOPWA] fetchInfo:', err);
      setState((prev) => ({
        ...prev,
        contractReady: false,
        error: CONTRACTS.opwaCoin ? 'Failed to load token info' : 'Contract not deployed yet',
      }));
    }
  }, [provider, network, address]);

  useEffect(() => { void fetchInfo(); }, [fetchInfo]);

  // ── Derived price values ────────────────────────────────────────────────

  const parsedQty = Math.max(0, parseInt(state.quantity, 10) || 0);

  // Use contract price if available, fall back to config constant
  const pricePerToken: bigint = state.tokenInfo?.pricePerToken ?? OPWA_SATS_PER_TOKEN;

  const totalSats: bigint  = pricePerToken * BigInt(parsedQty);
  const totalBTC:  number  = Number(totalSats) / 100_000_000;
  const totalUSD:  number | null = btcPrice !== null ? totalBTC * btcPrice : null;

  // ── Buy: call contract.buy() with BTC payment output ───────────────────

  const buy = useCallback(
    async (recipientAddress: Address) => {
      if (!walletAddress || !address || !provider || !network) {
        setState((prev) => ({ ...prev, error: 'Wallet not connected.' }));
        return;
      }
      if (!CONTRACTS.opwaCoin) {
        setState((prev) => ({ ...prev, error: 'Contract not deployed yet.' }));
        return;
      }
      if (!TREASURY_P2TR) {
        setState((prev) => ({ ...prev, error: 'Treasury address not configured.' }));
        return;
      }
      if (parsedQty <= 0) {
        setState((prev) => ({ ...prev, error: 'Enter a valid quantity.' }));
        return;
      }

      const decimals  = state.tokenInfo?.decimals ?? 8;
      const rawAmount = BigInt(parsedQty) * 10n ** BigInt(decimals);
      const satCost   = pricePerToken * BigInt(parsedQty);

      setState((prev) => ({ ...prev, buying: true, error: null, txHash: null }));

      try {
        const contract = getOPWACoinContract(provider, network, address);

        // STEP 1 — tell the contract what BTC output to expect during simulation
        contract.setTransactionDetails({
          inputs: [],
          outputs: [
            {
              to:    TREASURY_P2TR,
              value: satCost,
              index: 1,
              flags: TransactionOutputFlags.hasTo,
            },
          ],
        });

        // STEP 2 — simulate
        const simulation = await contract.buy(recipientAddress, rawAmount);
        if (simulation.revert) throw new Error(simulation.revert);

        // STEP 3 — send with matching extra output
        const receipt: InteractionTransactionReceipt = await simulation.sendTransaction({
          signer:      null,   // frontend — wallet handles signing
          mldsaSigner: null,
          refundTo:    walletAddress,
          network,
          maximumAllowedSatToSpend: satCost + 100_000n,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          extraOutputs: [{ address: TREASURY_P2TR, value: satCost as any }],
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
    [walletAddress, address, provider, network, parsedQty, state.tokenInfo, pricePerToken, fetchInfo],
  );

  return {
    ...state,
    parsedQty,
    totalSats,
    totalBTC,
    totalUSD,
    pricePerToken,
    contractAddress: CONTRACTS.opwaCoin,
    treasuryP2TR:    TREASURY_P2TR,
    setQuantity: (q: string) => setState((prev) => ({ ...prev, quantity: q, error: null })),
    buy,
    refresh: fetchInfo,
  };
}
