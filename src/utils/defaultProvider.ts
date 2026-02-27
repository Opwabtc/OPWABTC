import { JSONRpcProvider } from 'opnet';
import { networks } from '@btc-vision/bitcoin';

// Default provider for read-only calls before wallet connects
export const defaultProvider = new JSONRpcProvider({
  url: 'https://testnet.opnet.org',
  network: networks.testnet
});
