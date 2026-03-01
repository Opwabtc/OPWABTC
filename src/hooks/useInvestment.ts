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
import { useAppStore } from '../store/useAppStore';

// FIX 1: nome correto do env var (era VITE_OPWAP_ com P a mais)
const CONTRACT_ADDRESS = import.meta.env.VITE_OPWA_TOKEN_ADDRESS as string;
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

// FIX 2: constrói Address manualmente via window.opnet (sem useWalletConnect)
// window.opnet.getMLDSAPublicKey() → raw key → SHA-256 → hashedMLDSAKey
// Para wallets sem MLDSA (Unisat/Xverse/OKX), usa SHA-256 do publicKey como fallback
function _hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/, '');
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
function _bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}
async function buildSenderAddress(publicKey: string): Promise<Address> {
  let sourceBytes: Uint8Array;
  // Cast to any: @btc-vision/transaction declara window.opnet como OPWallet
  // (sem getMLDSAPublicKey), mas a extensão OP_Wallet expõe esse método em runtime
  const opnet = window.opnet as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (opnet && typeof opnet.getMLDSAPublicKey === 'function') {
    const raw: string = await opnet.getMLDSAPublicKey();
    sourceBytes = _hexToBytes(raw);
  } else {
    // wallets não-MLDSA (Unisat/Xverse/OKX): usa SHA-256 do publicKey como fallback
    sourceBytes = _hexToBytes(publicKey);
  }
  // sourceBytes.buffer é sempre ArrayBuffer aqui (criado em _hexToBytes via new Uint8Array)
  const hashBuf = await crypto.subtle.digest('SHA-256', sourceBytes.buffer as ArrayBuffer);
  const hashedMLDSAKey = '0x' + _bytesToHex(new Uint8Array(hashBuf));
  return Address.fromString(hashedMLDSAKey, publicKey);
}

// FIX 3: NAO extende IOP20Contract — usa BaseContractProperties direto
interface IMintableToken extends BaseContractProperties {
  balanceOf(owner: Address): Promise<CallResult<{ balance: bigint }, []>>;
  mint(to: Address): Promise<CallResult<{ tokensMinted: bigint }, []>>;
}

export interface InvestmentResult {
  txHash: string;
  opscanUrl: string;
}

export function useInvestment() {
  // FIX 4: lê publicKey do Zustand store (salvo por useWallet.ts no connect)
  // em vez de useWalletConnect() que retorna null quando não inicializado
  const { walletAddr, publicKey } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const invest = useCallback(async (btcAmount: number) => {
    setError(null);
    setResult(null);

    if (!walletAddr) {
      setError('Connect your wallet first.');
      return;
    }

    // publicKey pode ser null no store se getPublicKey() falhou no connect
    // tenta obtê-lo on-demand via window.opnet como fallback
    let effectivePublicKey = publicKey;
    if (!effectivePublicKey && window.opnet) {
      try {
        effectivePublicKey = await (window.opnet as any).getPublicKey(); // eslint-disable-line @typescript-eslint/no-explicit-any
        console.log('[OPWA] publicKey obtido on-demand:', effectivePublicKey);
      } catch (_) {}
    }
    if (!effectivePublicKey) {
      setError('Could not retrieve public key from wallet. Reconnect and try again.');
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
      console.log('[OPWA] 1. building sender address...');
      const senderAddress = await buildSenderAddress(effectivePublicKey);
      console.log('[OPWA] 2. senderAddress:', senderAddress);

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
            value: satsAmount,
            index: 1,
            flags: TransactionOutputFlags.hasTo,
          },
        ],
      });

      console.log('[OPWA] 3. simulating mint...');
      const sim = await contract.mint(senderAddress);
      console.log('[OPWA] 4. sim result:', sim);

      if (!sim || 'error' in sim || (sim as any).revert || (sim as any).ok === false) {
        throw new Error('Simulation failed: ' + JSON.stringify(sim));
      }

      console.log('[OPWA] 5. sending transaction...');
      const receipt = await sim.sendTransaction({
        signer: null,
        mldsaSigner: null,
        refundTo: walletAddr,
        maximumAllowedSatToSpend: satsAmount + 50_000n,
        network: NETWORK,
        extraOutputs: [
          {
            address: CONTRACT_ADDRESS,
            value: Number(satsAmount) as unknown as Satoshi,
          },
        ],
      });
      console.log('[OPWA] 6. receipt:', receipt);

      if (!receipt) throw new Error('Transaction rejected or timed out.');

      // FIX 4: campo correto e transactionId, NAO receipt.hash
      const txHash: string = receipt.transactionId ?? '';
      const opscanUrl = 'https://opscan.org/transactions/' + txHash + '?network=testnet';
      setResult({ txHash, opscanUrl });

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed.';
      console.error('OPWA MINT ERROR:', err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [walletAddr, publicKey]); // effectivePublicKey é derivado de publicKey dentro do callback

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
