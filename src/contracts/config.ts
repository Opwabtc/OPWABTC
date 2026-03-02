/**
 * Contract addresses on OPNet testnet (Signet fork).
 *
 * HOW TO UPDATE AFTER DEPLOYMENT:
 *   1. Deploy OPWACoin    → paste TXID into CONTRACTS.opwaCoin
 *   2. Deploy PropertyNFT → paste TXID into CONTRACTS.propertyNft
 *   3. For each property, deploy a FractionalToken contract and paste
 *      its address into PROPERTY_CONTRACT_MAP[propertyId].
 *   4. Run `npm run build` and redeploy to Vercel.
 *
 * Network: OPNet Testnet  (NOT Bitcoin Testnet4 — different chain)
 * RPC URL: https://testnet.opnet.org
 */

// Platform-level contracts
export const CONTRACTS = {
  opwaCoin:    'opt1sqq047upsqxssrcn7qfeprv84dhv6aszfmu7g6xnp' as string,
  propertyNft: 'opt1sqr92tw6fg5d39llk80uddvktzgwa0g39hc0uyqa6' as string,
} as const;

/** Price: 1 OPWA token = 0.00001 BTC = 1 000 satoshis */
export const OPWA_SATS_PER_TOKEN = 1_000n;

/**
 * Maps each property ID (from the Zustand store / useAppStore) to the
 * address of its deployed FractionalToken OP-20 contract on OPNet testnet.
 *
 * Leave empty string ('') until the contract is deployed.
 * The UI will show a "Not yet deployed" message for empty entries.
 */
export const PROPERTY_CONTRACT_MAP: Record<string, string> = {
  'prop-001': '', // Manhattan Luxury Penthouse  — deploy FractionalToken and paste address here
  'prop-002': '', // Miami Beachfront Villa       — deploy FractionalToken and paste address here
  'prop-003': '', // Commercial Office Tower      — deploy FractionalToken and paste address here
};

/** Returns the contract address for a property, or null if not yet deployed. */
export function getPropertyContractAddress(propertyId: string): string | null {
  const addr = PROPERTY_CONTRACT_MAP[propertyId];
  return addr || null;
}
