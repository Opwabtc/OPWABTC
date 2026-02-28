/**
 * Contract Name:  OPWACoin
 * Standard:       OP-20 (Bitcoin L1 Fungible Token)
 * Network:        testnet → mainnet (Q2 2026)
 * Version:        0.1.0
 * WASM SHA256:    [TO BE FILLED AFTER COMPILATION]
 * Deploy TXID:    [TO BE FILLED AFTER DEPLOYMENT]
 * Block Number:   [TO BE FILLED AFTER DEPLOYMENT]
 * Author:         OPWA Team
 * License:        MIT
 *
 * Description:
 *   OPWACoin is the platform utility and governance token for the OPWA
 *   real estate tokenization protocol on Bitcoin Layer 1 via OP_NET.
 *
 *   Max supply mirrors Bitcoin: 21,000,000 OPWA.
 *   8 decimal places for satoshi-level precision.
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
 */
@final
export class OPWACoin extends OP20 {
  // Maximum supply: 21,000,000 OPWA (with 8 decimals = 2,100,000,000,000,000 base units)
  private readonly MAX_SUPPLY: u256 = u256.fromString('2100000000000000');

  constructor() {
    super();
  }

  /**
   * Called once on contract deployment.
   * Initializes the token with name, symbol, decimals, and max supply.
   */
  public override onDeployment(_calldata: Calldata): void {
    const maxSupply: u256 = this.MAX_SUPPLY;
    const decimals: u8 = 8;

    this.instantiate(
      new OP20InitParameters(
        u256.Zero,    // Initial supply — zero; minted via governance
        maxSupply,    // Hard cap: 21,000,000 OPWA
        decimals,     // 8 decimal places
        'OPWACoin',   // Token name
        'OPWA',       // Token symbol
      ),
    );
  }

  /**
   * Execute — routes incoming contract calls to the correct handler.
   * Parent OP20 handles: transfer, approve, transferFrom, burn.
   * Mint is restricted to contract owner via parent onlyOwner modifier.
   */
  public override execute(method: Selector, calldata: Calldata): BytesWriter {
    return super.execute(method, calldata);
  }
}
