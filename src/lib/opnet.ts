import { JSONRpcProvider } from 'opnet';
import { networks } from '@btc-vision/bitcoin';
import { fetchTokenMetadata, fetchTokenBalance } from '@/utils/opnetContracts';
import { Address } from '@btc-vision/transaction';

const TESTNET_RPC = (import.meta.env.VITE_OP_NET_TESTNET_RPC as string) ?? 'https://testnet.opnet.org';

// FIX SF-02: was networks.testnet (wrong prefix)
export const network = networks.opnetTestnet;

export const provider = new JSONRpcProvider({ url: TESTNET_RPC, network });

export async function getBlockHeight(): Promise<number> {
  return Number(await provider.getBlockNumber());
}

export async function getBalance(address: string): Promise<bigint> {
  return provider.getBalance(address);
}

export async function getTokenInfo(contractAddress: string) {
  return fetchTokenMetadata(contractAddress, provider, network);
}

export async function getTokenBalance(contractAddress: string, userAddress: string): Promise<bigint> {
  // FIX: Address.fromString takes (string, string) — use the address string directly
  // FIX 5.21: pass userAddress string directly — fetchTokenBalance handles Address construction
  return fetchTokenBalance(contractAddress, userAddress as unknown as Address, provider, network);
}
