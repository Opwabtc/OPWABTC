/**
 * Motoswap integration helpers.
 *
 * Motoswap is the native AMM DEX on OP_NET that supports BTC/OP-20 pairs.
 * OPWA tokens will have a BTC/OPWA liquidity pool there post-mainnet.
 *
 * Docs: https://docs.motoswap.org
 */

const MOTOSWAP_BASE_URL = 'https://motoswap.org';

/** OP_NET Testnet contract address for the OPWA token (set after deployment). */
const OPWA_TOKEN_ADDRESS = (import.meta.env.VITE_OPWA_TOKEN_ADDRESS as string) ?? '';

/**
 * Returns the Motoswap swap URL for trading OPWA/BTC.
 * If the token address is not yet configured, returns the Motoswap homepage.
 */
export function getMotoswapTradeUrl(): string {
  if (!OPWA_TOKEN_ADDRESS) {
    return MOTOSWAP_BASE_URL;
  }
  return `${MOTOSWAP_BASE_URL}/swap?inputToken=BTC&outputToken=${OPWA_TOKEN_ADDRESS}`;
}

/**
 * Returns the Motoswap liquidity pool URL for OPWA/BTC.
 */
export function getMotoswapPoolUrl(): string {
  if (!OPWA_TOKEN_ADDRESS) {
    return `${MOTOSWAP_BASE_URL}/pools`;
  }
  return `${MOTOSWAP_BASE_URL}/pools/${OPWA_TOKEN_ADDRESS}`;
}

/**
 * Open the Motoswap trade page for OPWA in a new browser tab.
 */
export function openMotoswapTrade(): void {
  window.open(getMotoswapTradeUrl(), '_blank', 'noopener,noreferrer');
}
