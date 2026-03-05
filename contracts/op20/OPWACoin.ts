/**
 * Contract Name:  OPWACoin
 * Standard:       OP-20 (Bitcoin L1 Fungible Token)
 * Network:        testnet → mainnet (Q2 2026)
 * Version:        0.2.0
 * WASM SHA256:    [TO BE FILLED AFTER COMPILATION]
 * Deploy TXID:    [TO BE FILLED AFTER DEPLOYMENT]
 * Block Number:   [TO BE FILLED AFTER DEPLOYMENT]
 * Deploy Address: opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t
 * Author:         OPWA Team
 * License:        MIT
 *
 * Description:
 *   OPWACoin is the platform utility and governance token for the OPWA
 *   real estate tokenization protocol on Bitcoin Layer 1 via OP_NET.
 *
 *   Max supply: 1,000,000,000 OPWA (1 billion).
 *   8 decimal places for satoshi-level precision.
 *   Mintable by contract owner only.
 *
 * Token Parameters:
 *   Name:       OPWA Coin
 *   Symbol:     OPWA
 *   Decimals:   8
 *   Max Supply: 1,000,000,000 OPWA = 100,000,000,000,000,000 base units
 *
 * Functions (via OP-20 standard):
 *   name(), symbol(), decimals(), totalSupply(), balanceOf(address)
 *   transfer(to, amount), approve(spender, amount), transferFrom(from, to, amount)
 *   mint(to, amount) — owner only
 *   burn(amount) — any holder
 *
 * Dependencies:
 *   @btc-vision/btc-runtime (AssemblyScript Bitcoin runtime)
 *   opnet SDK (frontend interaction)
 *
 * References:
 *   OP-20 Standard: https://github.com/btc-vision/btc-runtime
 *   OP_NET Docs:    https://docs.opnet.org
 */

import {
  OP20,
  OP20InitParameters,
} from '@btc-vision/btc-runtime/runtime/contracts/OP20';
import { u256 } from 'as-bignum/assembly';

/**
 * OPWACoin — OPWA Platform Token
 *
 * Inherits the full OP-20 standard from btc-runtime.
 * All transfer, approve, allowance, mint, and burn logic
 * is implemented in the parent OP20 class.
 *
 * Mint is owner-only (enforced by parent OP20.onlyOwner modifier).
 */
@final
export class OPWACoin extends OP20 {
  // Maximum supply: 1,000,000,000 OPWA
  // With 8 decimals: 1,000,000,000 × 10^8 = 100,000,000,000,000,000 base units
  private readonly MAX_SUPPLY: u256 = u256.fromString('100000000000000000');

  constructor() {
    super();
  }

  /**
   * Called once on contract deployment.
   * Initializes the token with name, symbol, decimals, and max supply.
   * Initial circulating supply is zero — tokens are minted by the owner post-deploy.
   */
  public override onDeployment(_calldata: Calldata): void {
    const maxSupply: u256 = this.MAX_SUPPLY;
    const decimals: u8 = 8;

    this.instantiate(
      new OP20InitParameters(
        u256.Zero,      // Initial supply — zero; owner mints after deploy
        maxSupply,      // Hard cap: 1,000,000,000 OPWA
        decimals,       // 8 decimal places
        'OPWA Coin',    // Token name
        'OPWA',         // Token symbol
      ),
    );
  }

  /**
   * Execute — routes incoming contract calls to the correct handler.
   * Parent OP20 handles: name, symbol, decimals, totalSupply, balanceOf,
   *   transfer, approve, transferFrom, mint (owner only), burn.
   */
  public override execute(method: Selector, calldata: Calldata): BytesWriter {
    return super.execute(method, calldata);
  }
}
