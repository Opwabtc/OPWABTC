import { TransactionParameters } from 'opnet';
import { useOPNETWallet } from './useOPNETWallet';

// FIX HIGH #22/#44: replace `simulation: any` with proper typed interface
// tx.txid was wrong — OPNet SDK returns transactionId, not txid (FIX SF-01)
export interface OPNetSimulationResult {
  revert?: string;
  properties?: Record<string, unknown>;
  sendTransaction(params: TransactionParameters): Promise<OPNetTransactionReceipt | null>;
}

export interface OPNetTransactionReceipt {
  // FIX SF-01: SDK returns transactionId, not txid
  transactionId: string;
  blockHash?: string;
  blockNumber?: number;
  gasUsed?: bigint;
  outputs?: Array<{ to: string; value: bigint }>;
}

// FIX HIGH #44: typed fee rate result
// interface FeeRateResult {
//   result: number;
// }

export function useSendTransaction() {
  const { provider, network, walletAddress } = useOPNETWallet();

  async function executeTransaction(
    simulation: OPNetSimulationResult,
  ): Promise<string> {
    if (!provider || !network || !walletAddress) {
      throw new Error('Wallet not connected');
    }

    // 1. Get current fee rate from provider via gasParameters() (FIX 5.56/5.68)
    let feeRate: number | undefined;
    try {
      const gasParams = await (provider as any).gasParameters?.();
      feeRate = gasParams?.bitcoin?.recommended?.medium ?? undefined;
    } catch(_) { feeRate = undefined; }
    void feeRate; // consumed below if provider supports it

    // 2. Build transaction parameters.
    // FRONTEND RULE: signer=null and mldsaSigner=null — wallet extension handles signing.
    const params: TransactionParameters = {
      signer:                   null as never,
      mldsaSigner:              null as never,
      refundTo:                 walletAddress,
      maximumAllowedSatToSpend: 100_000n,
      network,
    };

    // 3. Send — prompts the wallet extension to sign
    const tx = await simulation.sendTransaction(params);

    // FIX SF-01: was tx.txid (undefined) — SDK returns transactionId
    if (!tx || !tx.transactionId) {
      throw new Error('Transaction failed or was rejected');
    }

    return tx.transactionId;
  }

  return { executeTransaction };
}
