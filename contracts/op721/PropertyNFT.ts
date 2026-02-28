/**
 * Contract Name:  PropertyNFT
 * Standard:       OP-721 (Bitcoin L1 Non-Fungible Token)
 * Network:        testnet → mainnet (Q2 2026)
 * Version:        0.1.0
 * WASM SHA256:    [TO BE FILLED AFTER COMPILATION]
 * Deploy TXID:    [TO BE FILLED AFTER DEPLOYMENT]
 * Block Number:   [TO BE FILLED AFTER DEPLOYMENT]
 * Author:         OPWA Team
 * License:        MIT
 *
 * Description:
 *   PropertyNFT represents unique real estate asset ownership on Bitcoin L1.
 *   Each tokenId maps to a single real-world property.
 *   The NFT's tokenURI points to IPFS/Arweave property legal documents.
 *
 *   When fractionalized:
 *   - NFT is locked in this contract
 *   - A FractionalToken (OP-20) contract is deployed for the property
 *   - NFT is unlocked only when 100% of fractional shares are redeemed
 *
 * State Machine:
 *   WHOLE → (fractionalize) → FRACTIONALIZED → (redeem all) → WHOLE
 *
 * Dependencies:
 *   @btc-vision/btc-runtime (AssemblyScript Bitcoin runtime)
 *
 * References:
 *   OP-721 Standard: https://github.com/btc-vision/btc-runtime
 *   OP_NET Docs:     https://docs.opnet.org
 */

import {
  OP721,
} from '@btc-vision/btc-runtime/runtime/contracts/OP721';
import { Address, Blockchain, BytesWriter, Calldata, Selector } from '@btc-vision/btc-runtime/runtime';
import { u256 } from 'as-bignum/assembly';
import { StoredU256 } from '@btc-vision/btc-runtime/runtime/storage/StoredU256';
import { StoredBoolean } from '@btc-vision/btc-runtime/runtime/storage/StoredBoolean';

// Storage pointers — unique u16 IDs for each state variable
const POINTER_TOKEN_ID_COUNTER: u16 = 100;
const POINTER_FRACTIONALIZED_MAP: u16 = 101;  // tokenId → bool
const POINTER_FRACTIONAL_CONTRACT_MAP: u16 = 102;  // tokenId → Address

// Method selectors
const MINT_SELECTOR: u32 = Selector.for('mint(string)');
const FRACTIONALIZE_SELECTOR: u32 = Selector.for('fractionalize(uint256,uint256)');
const UNLOCK_SELECTOR: u32 = Selector.for('unlockOnRedemption(uint256)');

/**
 * PropertyNFT — OPWA Real Estate Property Token
 *
 * Inherits OP-721 base functionality.
 * Adds property-specific minting, fractionalization, and redemption logic.
 */
@final
export class PropertyNFT extends OP721 {
  // Auto-incrementing token ID counter
  private tokenIdCounter: StoredU256 = new StoredU256(POINTER_TOKEN_ID_COUNTER, u256.Zero);

  constructor() {
    super('OPWA Property', 'OPWA-PROP');
  }

  public override onDeployment(_calldata: Calldata): void {
    // No additional initialization required beyond OP721 parent
  }

  public override execute(method: Selector, calldata: Calldata): BytesWriter {
    switch (method) {
      case MINT_SELECTOR:
        return this.mintProperty(calldata);

      case FRACTIONALIZE_SELECTOR:
        return this.fractionalizeProperty(calldata);

      case UNLOCK_SELECTOR:
        return this.unlockOnRedemption(calldata);

      default:
        // Delegate to OP721 for standard NFT methods
        // (ownerOf, transferFrom, approve, tokenURI, etc.)
        return super.execute(method, calldata);
    }
  }

  /**
   * mint(metadataURI: string) → tokenId: u256
   *
   * Mints a new PropertyNFT to the caller.
   * metadataURI should point to IPFS/Arweave property legal documents.
   * Only callable by authorized property validators (onlyAuthorized).
   */
  private mintProperty(calldata: Calldata): BytesWriter {
    this.onlyOwner(Blockchain.tx.origin);  // Restrict to authorized minter

    const metadataURI: string = calldata.readStringWithLength();

    // Increment counter and assign new tokenId
    const newTokenId: u256 = u256.add(this.tokenIdCounter.value, u256.One);
    this.tokenIdCounter.value = newTokenId;

    // Mint NFT to caller
    this._mint(Blockchain.tx.origin, newTokenId);

    // Store metadata URI
    this._setTokenURI(newTokenId, metadataURI);

    const result = new BytesWriter(32);
    result.writeU256(newTokenId);
    return result;
  }

  /**
   * fractionalize(tokenId: u256, totalShares: u256) → void
   *
   * Locks the PropertyNFT and records it as fractionalized.
   * Called by the FractionalToken contract deployment flow.
   * Only callable by the NFT owner.
   */
  private fractionalizeProperty(calldata: Calldata): BytesWriter {
    const tokenId: u256 = calldata.readU256();
    const fractionalContractAddress: Address = calldata.readAddress();

    // Verify caller is the NFT owner
    const owner: Address = this._ownerOf(tokenId);
    if (owner !== Blockchain.tx.origin) {
      throw new Error('PropertyNFT: caller is not token owner');
    }

    // Mark as fractionalized
    const fractionalizedKey = new StoredBoolean(POINTER_FRACTIONALIZED_MAP, tokenId);
    fractionalizedKey.value = true;

    // Record fractional contract address
    const contractKey = new StoredU256(POINTER_FRACTIONAL_CONTRACT_MAP, tokenId);
    // Store address as u256 (OP_NET address encoding)
    contractKey.value = u256.fromBytes(fractionalContractAddress, true);

    return new BytesWriter(0);
  }

  /**
   * unlockOnRedemption(tokenId: u256) → void
   *
   * Called by FractionalToken contract when totalSupply reaches zero
   * (all shares redeemed). Unlocks the NFT, returning it to WHOLE state.
   * Only callable by the registered FractionalToken contract for this tokenId.
   */
  private unlockOnRedemption(calldata: Calldata): BytesWriter {
    const tokenId: u256 = calldata.readU256();

    // Verify caller is the registered fractional contract for this tokenId
    const contractKey = new StoredU256(POINTER_FRACTIONAL_CONTRACT_MAP, tokenId);
    const registeredContract: Address = u256.toBytes(contractKey.value);

    if (Blockchain.tx.origin !== registeredContract) {
      throw new Error('PropertyNFT: only registered fractional contract can unlock');
    }

    // Remove fractionalized status
    const fractionalizedKey = new StoredBoolean(POINTER_FRACTIONALIZED_MAP, tokenId);
    fractionalizedKey.value = false;

    return new BytesWriter(0);
  }

  /**
   * Override transfer to block transfers of fractionalized tokens.
   * A fractionalized property NFT cannot change hands while shares exist.
   */
  public override _transfer(from: Address, to: Address, tokenId: u256): void {
    const fractionalizedKey = new StoredBoolean(POINTER_FRACTIONALIZED_MAP, tokenId);
    if (fractionalizedKey.value) {
      throw new Error('PropertyNFT: token is fractionalized — redeem all shares first');
    }
    super._transfer(from, to, tokenId);
  }
}
