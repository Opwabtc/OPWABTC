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
  opwaCoin:    '' as string,   // OPWACoin OP-20 governance token
  propertyNft: '' as string,   // PropertyNFT OP-721
} as const;

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
