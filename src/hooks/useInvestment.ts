import {
  getContract,
  JSONRpcProvider,
  TransactionOutputFlags,
  CallResult,
  BaseContractProperties,
  BitcoinInterfaceAbi,
  BitcoinAbiTypes,
  ABIDataTypes,
} from 'opnet';
import { Address } from '@btc-vision/transaction';
import { networks, Satoshi } from '@btc-vision/bitcoin';
import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

const CONTRACT_ADDRESS: string =
  (import.meta.env.VITE_OPWAP_TOKEN_ADDRESS as string) ||
  'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp';

const NETWORK = networks.opnetTestnet;
export const SATS_PER_TOKEN = 1000;
export const BTC_TO_SATS = 100_000_000;

function _hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/, '');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function buildSenderAddress(publicKey: string): Promise<Address> {
  const pubkeyBytes = _hexToBytes(publicKey);
  const opnet = window.opnet as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (opnet && typeof opnet.getMLDSAPublicKey === 'function') {
    try {
      const raw: string = await opnet.getMLDSAPublicKey();
      return new Address(_hexToBytes(raw), pubkeyBytes);
    } catch (_) {}
  }
  return new Address(new Uint8Array(32), pubkeyBytes);
}

// ABI com OP_20 padrão
const OPWAP_ABI: BitcoinInterfaceAbi = [
  {
    name: 'mint',
    type: BitcoinAbiTypes.Function,
    constant: false,
    payable: true,
    inputs: [
      { name: 'to', type: ABIDataTypes.ADDRESS },
      { name: 'amount', type: ABIDataTypes.UINT256 },
    ],
    outputs: [],
  },
  {
    name: 'balanceOf',
    type: BitcoinAbiTypes.Function,
    constant: true,
    payable: false,
    inputs: [{ name: 'account', type: ABIDataTypes.ADDRESS }],
    outputs: [{ name: 'balance', type: ABIDataTypes.UINT256 }],
  },
];

interface IMintableToken extends BaseContractProperties {
  balanceOf(owner: Address): Promise<CallResult<{ balance: bigint }, []>>;
  mint(to: Address, amount: bigint): Promise<CallResult<Record<string, never>, []>>;
}

export interface InvestmentResult {
  txHash: string;
  opscanUrl: string;
}

// Patch: intercepta getSelector para mint retornar string que o SDK hasheia para 0x40c10f19
// Descoberta: 0x40c10f19 = 1086394137 é keccak256, não SHA256
// Solução: patch no writeSelector do writer dentro de encodeFunctionData
function applyMintSelectorPatch(contract: unknown): (() => void) {
  const c = contract as Record<string, unknown>;
  const proto = Object.getPrototypeOf(c) as Record<string, unknown>;

  // Patch no getSelector — retorna string que SHA256 → 0x40c10f19
  // Como não há tal string, interceptamos writeSelector via patch temporário no proto
  const origGetSelector = proto['getSelector'] as ((el: unknown) => string) | undefined;
  if (!origGetSelector) return () => {};

  proto['getSelector'] = function(element: Record<string, unknown>): string {
    const result = origGetSelector.call(this, element);
    if (element['name'] === 'mint') {
      // Retornar a assinatura que o bitcoinAbiCoder.encodeSelector() converterá para 0x40c10f19
      // Descoberta necessária: qual string o encodeSelector transforma em 40c10f19?
      // Por enquanto usar a string original e fazer patch no nível do BinaryWriter
      console.log('[OPWA] getSelector for mint:', result);
    }
    return result;
  };

  // Mais direto: patch no encodeFunctionData para modificar o writer ANTES de retornar
  const origEncode = proto['encodeFunctionData'] as ((el: unknown, args: unknown[]) => unknown) | undefined;
  if (!origEncode) return () => { proto['getSelector'] = origGetSelector; };

  proto['encodeFunctionData'] = function(element: Record<string, unknown>, args: unknown[]) {
    const writer = origEncode.call(this, element, args) as Record<string, unknown>;
    if (element['name'] === 'mint') {
      // Tentar todos os campos possíveis do BinaryWriter
      const possibleBufs = ['_buffer', 'buffer', 'bytes', 'data', '_bytes', '_data'];
      let patched = false;
      for (const field of possibleBufs) {
        const buf = writer[field];
        if (buf instanceof Uint8Array && buf.length >= 4) {
          buf[0] = 0x40; buf[1] = 0xc1; buf[2] = 0x0f; buf[3] = 0x19;
          console.log(`[OPWA] selector patched via writer.${field} → 0x40C10F19`);
          patched = true;
          break;
        }
      }
      if (!patched) {
        // Inspecionar o writer para debug
        console.log('[OPWA] writer keys:', Object.keys(writer));
        const proto2 = Object.getPrototypeOf(writer);
        if (proto2) console.log('[OPWA] writer proto keys:', Object.getOwnPropertyNames(proto2).slice(0, 20));
      }
    }
    return writer;
  };

  return () => {
    proto['getSelector'] = origGetSelector;
    proto['encodeFunctionData'] = origEncode;
  };
}

export function useInvestment() {
  const { walletAddr, publicKey } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const invest = useCallback(async (btcAmount: number) => {
    setError(null);
    setResult(null);

    if (!walletAddr) { setError('Connect your wallet first.'); return; }

    let effectivePublicKey = publicKey;
    if (!effectivePublicKey && window.opnet) {
      try {
        effectivePublicKey = await (window.opnet as any).getPublicKey(); // eslint-disable-line @typescript-eslint/no-explicit-any
      } catch (_) {}
    }
    if (!effectivePublicKey) { setError('Could not retrieve public key. Reconnect and try again.'); return; }
    if (!CONTRACT_ADDRESS) { setError('Contract address not configured.'); return; }
    if (btcAmount <= 0) { setError('Enter a valid BTC amount.'); return; }

    const satsAmount = BigInt(Math.round(btcAmount * BTC_TO_SATS));
    if (satsAmount < BigInt(SATS_PER_TOKEN)) { setError('Minimum: 1000 sats (0.00001 BTC).'); return; }

    setLoading(true);
    let removePatch: (() => void) | undefined;

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
        OPWAP_ABI,
        provider,
        NETWORK,
        senderAddress,
      );

      // Aplicar patch para inspecionar o BinaryWriter e tentar corrigir selector
      removePatch = applyMintSelectorPatch(contract);

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

      const tokenAmount = (satsAmount * BigInt(10 ** 8)) / BigInt(SATS_PER_TOKEN);

      console.log('[OPWA] 3. simulating mint...', { satsAmount: satsAmount.toString(), tokenAmount: tokenAmount.toString() });
      const sim = await contract.mint(senderAddress, tokenAmount);
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

      const txHash: string = receipt.transactionId ?? '';
      const opscanUrl = 'https://opscan.org/transactions/' + txHash + '?network=testnet';
      setResult({ txHash, opscanUrl });

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed.';
      console.error('OPWA MINT ERROR:', err);
      setError(msg);
    } finally {
      if (removePatch) removePatch();
      setLoading(false);
    }
  }, [walletAddr, publicKey]);

  const reset = useCallback(() => { setError(null); setResult(null); }, []);
  return { invest, loading, error, result, reset };
}

export function calcTokens(btcAmount: number): number {
  return Math.floor(Math.round(btcAmount * BTC_TO_SATS) / SATS_PER_TOKEN);
}
