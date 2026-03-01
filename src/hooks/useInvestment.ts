import {
  getContract,
  OP_20_ABI,
  JSONRpcProvider,
  TransactionOutputFlags,
  ABIDataTypes,
  BitcoinAbiTypes,
  BitcoinInterfaceAbi,
  CallResult,
  BaseContractProperties,
} from 'opnet';
import { Address } from '@btc-vision/transaction';
import { networks, Satoshi } from '@btc-vision/bitcoin';
import { useState, useCallback } from 'react';
import { useWalletConnect } from '@btc-vision/walletconnect';
import { useAppStore } from '../store/useAppStore';

const CONTRACT_ADDRESS = import.meta.env.VITE_OPWAP_TOKEN_ADDRESS as string;
const NETWORK = networks.opnetTestnet;
export const SATS_PER_TOKEN = 1000;
export const BTC_TO_SATS = 100_000_000;

const MINT_ABI: BitcoinInterfaceAbi = [
  ...OP_20_ABI,
  {
    name: 'mint',
    type: BitcoinAbiTypes.Function,
    constant: false,
    inputs: [
      { name: 'to', type: ABIDataTypes.ADDRESS },
    ],
    outputs: [
      { name: 'tokensMinted', type: ABIDataTypes.UINT256 },
    ],
  },
];

// FIX 1: NAO extende IOP20Contract — usa BaseContractProperties direto
interface IMintableToken extends BaseContractProperties {
  balanceOf(owner: Address): Promise<CallResult<{ balance: bigint }, []>>;
  mint(to: Address): Promise<CallResult<{ tokensMinted: bigint }, []>>;
}

export interface InvestmentResult {
  txHash: string;
  opscanUrl: string;
}

export function useInvestment() {
  const { walletAddr } = useAppStore();
  // address is pre-built by the SDK: Address.fromString(hashedMLDSAKey, publicKey)
  // window.opnet does NOT expose hashedMLDSAKey — only useWalletConnect() does
  const { address: senderAddress } = useWalletConnect();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const invest = useCallback(async (btcAmount: number) => {
    setError(null);
    setResult(null);

    if (!walletAddr || !senderAddress) {
      setError('Connect your wallet first.');
      return;
    }
    if (!CONTRACT_ADDRESS) {
      setError('Contract address not configured.');
      return;
    }
    if (btcAmount <= 0) {
      setError('Enter a valid BTC amount.');
      return;
    }

    const satsAmount = BigInt(Math.round(btcAmount * BTC_TO_SATS));
    if (satsAmount < BigInt(SATS_PER_TOKEN)) {
      setError('Minimum: 1000 sats (0.00001 BTC).');
      return;
    }

    setLoading(true);
    try {
      const provider = new JSONRpcProvider({
        url: 'https://testnet.opnet.org',
        network: NETWORK,
      });

      const contract = getContract<IMintableToken>(
        CONTRACT_ADDRESS,
        MINT_ABI,
        provider,
        NETWORK,
        senderAddress,
      );

      contract.setTransactionDetails({
        inputs: [],
        outputs: [
          {
            to: CONTRACT_ADDRESS,
            value: satsAmount,  // bigint — setTransactionDetails expects bigint, not Satoshi
            index: 1,
            flags: TransactionOutputFlags.hasTo,
          },
        ],
      });

      const sim = await contract.mint(senderAddress);
      if ('error' in sim) {
        throw new Error('Simulation reverted: ' + (sim as any).error);
      }

      const receipt = await sim.sendTransaction({
        signer: null,
        mldsaSigner: null,
        refundTo: walletAddr,           // bech32 string - ok aqui
        maximumAllowedSatToSpend: satsAmount + 50_000n,
        network: NETWORK,
        extraOutputs: [
          {
            address: CONTRACT_ADDRESS,
            value: Number(satsAmount) as unknown as Satoshi,  // Satoshi = branded number, not bigint
          },
        ],
      });

      if (!receipt) throw new Error('Transaction rejected or timed out.');

      // FIX 4: campo correto e transactionId, NAO receipt.hash
      const txHash: string = receipt.transactionId ?? '';
      const opscanUrl = 'https://opscan.org/transactions/' + txHash + '?network=testnet';
      setResult({ txHash, opscanUrl });

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [walletAddr, senderAddress]);

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
  }, []);

  return { invest, loading, error, result, reset };
}

export function calcTokens(btcAmount: number): number {
  const sats = Math.round(btcAmount * BTC_TO_SATS);
  return Math.floor(sats / SATS_PER_TOKEN);
}
