import { JSONRpcProvider } from 'opnet';
import { networks } from '@btc-vision/bitcoin';
import { fetchTokenMetadata, fetchTokenBalance } from '@/utils/opnetContracts';
import { Address } from '@btc-vision/transaction';

const TESTNET_RPC = (import.meta.env.VITE_OP_NET_TESTNET_RPC as string) ?? 'https://testnet.opnet.org';

export const network = networks.opnetTestnet;

export const provider = new JSONRpcProvider({
  url: TESTNET_RPC,
  network,
});

/** Returns the current Bitcoin block height on OP_NET Testnet. */
export async function getBlockHeight(): Promise<number> {
  const result = await provider.getBlockNumber();
  return Number(result);
}

/**
 * Returns the BTC balance (in satoshis) for a Bitcoin address.
 * The SDK returns the confirmed UTXO balance as a bigint.
 */
export async function getBalance(address: string): Promise<bigint> {
  return provider.getBalance(address);
}

/** Returns metadata (name, symbol, decimals, totalSupply) for an OP-20 token. */
export async function getTokenInfo(contractAddress: string) {
  return fetchTokenMetadata(contractAddress, provider, network);
}

/** Returns the OP-20 token balance for a user address in base units. */
export async function getTokenBalance(
  contractAddress: string,
  userAddress: string,
): Promise<bigint> {
  const addr = Address.fromString(userAddress);
  return fetchTokenBalance(contractAddress, addr, provider, network);
}
