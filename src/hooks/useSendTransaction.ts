import { TransactionParameters } from 'opnet';
import { useOPNETWallet } from './useOPNETWallet';

export function useSendTransaction() {
  const { provider, network, walletAddress } = useOPNETWallet();

  async function executeTransaction(simulation: any) {
    if (!provider || !network || !walletAddress) {
      throw new Error('Wallet not connected');
    }

    // 1. Get current fee rate from provider
    const feeRateResult = await (provider as any).getFeeRate?.() || { result: 10 };
    const feeRate = feeRateResult?.result ?? 10; // fallback 10 sat/vB

    // 2. Build transaction parameters.
    // FRONTEND RULE: signer=null and mldsaSigner=null — the wallet extension handles signing.
    const params: TransactionParameters = {
      signer:                   null as any,
      mldsaSigner:              null as any,
      refundTo:                 walletAddress,
      maximumAllowedSatToSpend: 100_000n,
      feeRate:                  feeRate,
      network:                  network,
    };

    // 3. Send — this prompts the wallet extension to sign
    const tx = await simulation.sendTransaction(params);

    if (!tx || !tx.txid) {
      throw new Error('Transaction failed or was rejected');
    }

    return tx.txid as string;
  }

  return { executeTransaction };
}
