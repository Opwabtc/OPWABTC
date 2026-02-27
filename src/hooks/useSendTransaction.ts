import { TransactionParameters } from 'opnet';
import { useOPNETWallet } from './useOPNETWallet';

export function useSendTransaction() {
  const { provider, signer, network, address, walletInstance, walletAddress, mldsaPublicKey } = useOPNETWallet();

  async function executeTransaction(simulation: any) {
    if (!provider || !signer || !network || !address) {
      throw new Error('Wallet not connected');
    }

    // 1. Get current fee rate from provider
    const feeRateResult = await (provider as any).getFeeRate?.() || { result: 10 };
    const feeRate = feeRateResult?.result ?? 10; // fallback 10 sat/vB

    // 2. Build transaction parameters
    const params: TransactionParameters = {
      signer:                   signer as any,                   // UnisatSigner from hook
      mldsaSigner:              mldsaPublicKey as any,          // MLDSA public key
      refundTo:                 (walletInstance as any)?.p2tr ?? walletAddress!, // refund change
      maximumAllowedSatToSpend: 100_000n,                 // adjust per action
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
