import {
  getContract,
  IOP20Contract,
  JSONRpcProvider,
  OP_20_ABI,
  TransactionParameters,
} from 'opnet';
import { Address } from '@btc-vision/transaction';
import { Network } from '@btc-vision/bitcoin';

// ── READ: get an OP-20 contract instance (read-only, no signer needed) ──────
export function getOP20Contract(
  contractAddress: string,
  provider: JSONRpcProvider,
  network: Network,
  callerAddress?: Address,
): IOP20Contract {
  return getContract<IOP20Contract>(
    contractAddress,
    OP_20_ABI,
    provider,
    network,
    callerAddress,
  );
}

// ── READ: fetch token metadata ───────────────────────────────────────────────
export async function fetchTokenMetadata(
  contractAddress: string,
  provider: JSONRpcProvider,
  network: Network,
) {
  const contract = getOP20Contract(contractAddress, provider, network);
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
  ]);
  return {
    name:        name.properties.name        as string,
    symbol:      symbol.properties.symbol    as string,
    decimals:    decimals.properties.decimals as number,
    totalSupply: totalSupply.properties.totalSupply as bigint,
  };
}

// ── READ: get a user's token balance ─────────────────────────────────────────
export async function fetchTokenBalance(
  contractAddress: string,
  userAddress: Address,
  provider: JSONRpcProvider,
  network: Network,
): Promise<bigint> {
  const contract = getOP20Contract(contractAddress, provider, network, userAddress);
  const result = await contract.balanceOf(userAddress);
  return result.properties.balance as bigint;
}

// ── WRITE: build a transfer simulation, ready to sign ────────────────────────
export async function buildTransferTx(
  contractAddress: string,
  toAddress: Address,
  amount: bigint,
  provider: JSONRpcProvider,
  network: Network,
  senderAddress: Address,
): Promise<TransactionParameters> {
  const contract = getOP20Contract(
    contractAddress, provider, network, senderAddress
  );
  // Returns a simulation — call .sendTransaction(params) to execute
  return contract.transfer(toAddress, amount) as unknown as TransactionParameters;
}
