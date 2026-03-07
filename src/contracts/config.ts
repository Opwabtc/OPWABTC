/**
 * Contract addresses on OPNet testnet (Signet fork).
 *
 * HOW TO UPDATE AFTER DEPLOYMENT:
 *   1. Run: OPNET_MNEMONIC="..." npx tsx deploy-token.ts  (in /tmp/property-nft)
 *   2. Wait 1 block, then run set-treasury.ts
 *   3. Paste the printed addresses below and redeploy to Vercel.
 *
 * Network: OPNet Testnet  (NOT Bitcoin Testnet4 — different chain)
 * RPC URL: https://testnet.opnet.org
 */

// Platform-level contracts
export const CONTRACTS = {
  /** OPWACoin OP-20 — has built-in buy() function (redeployed 2026-03-07) */
  opwaCoin:    'opt1sqpz0m0uql87kz425y6h99p2k0lqut59vsgaxq8t2' as string,
  propertyNft: 'opt1sqzg3xs364026l3pz6kqllar4l7q73jr5cy0hqkwc' as string,  // redeployed 2026-03-07
} as const;

/**
 * Bitcoin P2TR address of the treasury wallet.
 * BTC payments from buy() go here directly.
 * Printed by deploy-token.ts / set-treasury.ts — paste after running those scripts.
 */
export const TREASURY_P2TR = 'opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t' as string;

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
