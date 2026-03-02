import { useCallback, useEffect, useState } from 'react';
import { ABIDataTypes } from '@btc-vision/transaction';
import {
  AbstractRpcProvider,
  BitcoinAbiTypes,
  BitcoinInterfaceAbi,
  CallResult,
  getContract,
  InteractionTransactionReceipt,
  IOP721Contract,
  JSONRpcProvider,
  OP_721_ABI,
} from 'opnet';
import { Network } from '@btc-vision/bitcoin';
import { Address } from '@btc-vision/transaction';
import { CONTRACTS } from '@/contracts/config';
import { useOPNETWallet } from './useOPNETWallet';

// ── Custom ABI (base OP721 + PropertyNFT methods) ─────────────────────────────

const PROPERTY_NFT_ABI: BitcoinInterfaceAbi = [
  ...(OP_721_ABI as unknown as BitcoinInterfaceAbi),
  {
    name: 'mint',
    type: BitcoinAbiTypes.Function,
    payable: false,
    inputs: [],
    outputs: [{ name: 'tokenId', type: ABIDataTypes.UINT256 }],
  },
  {
    name: 'mintPrice',
    type: BitcoinAbiTypes.Function,
    payable: false,
    inputs: [],
    outputs: [{ name: 'price', type: ABIDataTypes.UINT256 }],
  },
  {
    name: 'mintingOpen',
    type: BitcoinAbiTypes.Function,
    payable: false,
    inputs: [],
    outputs: [{ name: 'open', type: ABIDataTypes.BOOL }],
  },
];

// ── Contract interface ────────────────────────────────────────────────────────

interface IPropertyNFTContract extends IOP721Contract {
  mint(): Promise<CallResult<{ tokenId: bigint }>>;
  mintPrice(): Promise<CallResult<{ price: bigint }>>;
  mintingOpen(): Promise<CallResult<{ open: boolean }>>;
}

function getNFTContract(
  provider: AbstractRpcProvider,
  network: Network,
  caller?: Address,
): IPropertyNFTContract {
  return getContract<IPropertyNFTContract>(
    CONTRACTS.propertyNft,
    PROPERTY_NFT_ABI,
    provider as unknown as JSONRpcProvider,
    network,
    caller,
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

interface MintNFTState {
  readonly mintPrice: bigint | null;
  readonly isOpen: boolean;
  readonly totalSupply: bigint | null;
  readonly maxSupply: bigint | null;
  readonly minting: boolean;
  readonly txHash: string | null;
  readonly error: string | null;
}

const INITIAL_STATE: MintNFTState = {
  mintPrice: null,
  isOpen: false,
  totalSupply: null,
  maxSupply: null,
  minting: false,
  txHash: null,
  error: null,
};

export function useMintNFT() {
  const { walletAddress, address, provider, network } = useOPNETWallet();
  const [state, setState] = useState<MintNFTState>(INITIAL_STATE);

  // ── Fetch collection info ──────────────────────────────────────────────────

  const fetchCollectionInfo = useCallback(async () => {
    if (!provider || !network) return;

    try {
      const contract = getNFTContract(provider, network);
      const [priceRes, openRes, supplyRes, maxRes] = await Promise.all([
        contract.mintPrice(),
        contract.mintingOpen(),
        contract.totalSupply(),
        contract.maxSupply(),
      ]);

      setState((prev) => ({
        ...prev,
        mintPrice: priceRes.properties.price,
        isOpen: openRes.properties.open,
        totalSupply: supplyRes.properties.totalSupply,
        maxSupply: maxRes.properties.maxSupply,
      }));
    } catch (err) {
      console.error('[useMintNFT] fetchCollectionInfo:', err);
    }
  }, [provider, network]);

  useEffect(() => {
    void fetchCollectionInfo();
  }, [fetchCollectionInfo]);

  // ── Mint ───────────────────────────────────────────────────────────────────

  const mint = useCallback(async () => {
    if (!walletAddress || !address || !provider || !network) {
      setState((prev) => ({ ...prev, error: 'Wallet not connected.' }));
      return;
    }
    if (!state.isOpen) {
      setState((prev) => ({ ...prev, error: 'Minting is currently closed.' }));
      return;
    }

    setState((prev) => ({ ...prev, minting: true, error: null, txHash: null }));

    try {
      const contract = getNFTContract(provider, network, address);
      const simulation = await contract.mint();

      if (simulation.revert) {
        throw new Error(simulation.revert);
      }

      const receipt: InteractionTransactionReceipt = await simulation.sendTransaction({
        signer: null,
        mldsaSigner: null,
        refundTo: walletAddress,
        network,
        maximumAllowedSatToSpend: 50_000n,
      });

      const txid = receipt.transactionId;
      setState((prev) => ({ ...prev, txHash: txid }));
      void fetchCollectionInfo();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setState((prev) => ({ ...prev, error: msg }));
    } finally {
      setState((prev) => ({ ...prev, minting: false }));
    }
  }, [walletAddress, address, provider, network, state.isOpen, fetchCollectionInfo]);

  return {
    ...state,
    contractAddress: CONTRACTS.propertyNft,
    refresh: fetchCollectionInfo,
    mint,
  };
}
