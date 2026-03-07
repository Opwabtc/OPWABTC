/**
 * YieldDistributor — Rental Income Distribution
 *
 * FIXES APPLIED:
 *   CF-02 CRITICAL: Full rewrite — was a stub with all logic as TODO comments.
 *                   Now implements the Synthetix "reward per token" checkpoint model.
 *
 * Architecture:
 *   - Property managers deposit BTC yield for a specific FractionalToken (OP-20)
 *   - Yield is tracked as yieldPerToken (accumulated yield per 1 token unit)
 *   - Each holder's claimable = balance × (yieldPerToken - userYieldPerTokenPaid[user])
 *   - O(1) claim — no loops over holders
 *
 * Storage layout:
 *   POINTER_YIELD_PT  + hash(propertyContract)         → yieldPerTokenStored (u256, scaled ×10^18)
 *   POINTER_USER_PAID + hash(user ++ propertyContract) → userYieldPerTokenPaid
 *   POINTER_TOTAL_DEP + hash(propertyContract)         → totalYieldDeposited (for analytics)
 *   POINTER_MANAGERS  + hash(manager ++ property)      → authorized (u256, 1 = yes)
 *   POINTER_VAULT_ADDR                                  → vault address (only vault can depositYield)
 */
import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    ReentrancyGuard,
    Blockchain,
    Address,
    TransferHelper, // V2-C-02: was missing — used in claimYield but not imported
    Calldata,
    BytesWriter,
    Revert,
    SafeMath,
    StoredAddress,
    StoredMapU256,
    encodeSelector,
    NetEvent,
} from '@btc-vision/btc-runtime/runtime';
import {
    SELECTOR_BYTE_LENGTH,
    ADDRESS_BYTE_LENGTH,
    U256_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

// Scaling factor for fixed-point arithmetic (10^18)
// yieldPerToken is stored scaled by SCALE to preserve precision for small amounts
const SCALE: u256 = u256.fromString('1000000000000000000');

// Storage pointers — R-005: start at 500+ to avoid collision with OP_NET/OP20 base class slots (0-199)
const POINTER_YIELD_PT:   u16 = 500;  // propertyContract → yieldPerTokenStored (scaled)
const POINTER_USER_PAID:  u16 = 501;  // hash(user, property) → userYieldPerTokenPaid (scaled)
const POINTER_TOTAL_DEP:  u16 = 502;  // propertyContract → totalYieldDeposited
const POINTER_MANAGERS:   u16 = 503;  // hash(manager, property) → 1 if authorized
const POINTER_VAULT:      u16 = 504;  // vault address allowed to call depositYield
const POINTER_YIELD_TOKEN: u16 = 505; // yield token address for transfers

// NetEvents — FIX CF-12

@final
class YieldDepositedEvent extends NetEvent {
    constructor(property: Address, amount: u256, newYPT: u256) {
        const data = new BytesWriter(96); // 32 + 32 + 32
        data.writeAddress(property);
        data.writeU256(amount);
        data.writeU256(newYPT);
        super('YieldDeposited', data);
    }
}

@final
class YieldClaimedEvent extends NetEvent {
    constructor(user: Address, property: Address, amount: u256) {
        const data = new BytesWriter(96); // 32 + 32 + 32
        data.writeAddress(user);
        data.writeAddress(property);
        data.writeU256(amount);
        super('YieldClaimed', data);
    }
}

@final
class ManagerSetEvent extends NetEvent {
    constructor(manager: Address, property: Address, allowed: boolean) {
        const data = new BytesWriter(65); // 32 + 32 + 1
        data.writeAddress(manager);
        data.writeAddress(property);
        data.writeBoolean(allowed);
        super('ManagerSet', data);
    }
}

@final
class VaultSetEvent extends NetEvent {
    constructor(vault: Address) {
        const data = new BytesWriter(32);
        data.writeAddress(vault);
        super('VaultSet', data);
    }
}

@final
export class YieldDistributor extends ReentrancyGuard {
    // Maps: propertyContract → yieldPerTokenStored (scaled ×10^18)
    private _yieldPerToken:    StoredMapU256 = new StoredMapU256(POINTER_YIELD_PT);
    // Maps: hash(user, property) → userYieldPerTokenPaid (scaled)
    private _userPaid:         StoredMapU256 = new StoredMapU256(POINTER_USER_PAID);
    // Maps: propertyContract → totalYieldDeposited
    private _totalDeposited:   StoredMapU256 = new StoredMapU256(POINTER_TOTAL_DEP);
    // Maps: hash(manager, property) → 1 if authorized
    private _managers:         StoredMapU256 = new StoredMapU256(POINTER_MANAGERS);
    // Vault address: only this address may call depositYield
    private _vault:      StoredAddress = new StoredAddress(POINTER_VAULT);
    private _yieldToken: StoredAddress = new StoredAddress(POINTER_YIELD_TOKEN);

    public constructor() {
        super();
    }

    public onDeployment(_calldata: Calldata): void {}

    public onUpdate(_calldata: Calldata): void {}
    @method({ name: "token", type: ABIDataTypes.ADDRESS })
    @returns({ name: "success", type: ABIDataTypes.BOOL })
    public setYieldToken(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        this._yieldToken.value = calldata.readAddress();
        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── Config ────────────────────────────────────────────────────────────────

    @method({ name: 'vault', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setVault(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        const vault = calldata.readAddress();
        this._vault.value = vault;
        Blockchain.emit(new VaultSetEvent(vault));
        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    @method(
        { name: 'manager',  type: ABIDataTypes.ADDRESS },
        { name: 'property', type: ABIDataTypes.ADDRESS },
        { name: 'allowed',  type: ABIDataTypes.BOOL    },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public setManager(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);
        const manager  = calldata.readAddress();
        const property = calldata.readAddress();
        const allowed  = calldata.readBoolean();

        const key = this._managerKey(manager, property);
        this._managers.set(key, allowed ? u256.One : u256.Zero);
        Blockchain.emit(new ManagerSetEvent(manager, property, allowed));

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── depositYield ──────────────────────────────────────────────────────────
    // Called by authorized property manager or vault to distribute rental income.
    // Updates the global yieldPerToken checkpoint for this property.
    //
    // Formula: yieldPerToken += (amount × SCALE) / totalSupply

    @method(
        { name: 'propertyContract', type: ABIDataTypes.ADDRESS },
        { name: 'amount',           type: ABIDataTypes.UINT256 },
    )
    @returns({ name: 'success', type: ABIDataTypes.BOOL })
    public depositYield(calldata: Calldata): BytesWriter {
        const propertyContract = calldata.readAddress();
        const amount           = calldata.readU256();
        if (amount.isZero()) throw new Revert('YieldDistributor: amount must be > 0');

        // Access control: only vault or authorized manager
        const sender = Blockchain.tx.sender;
        const vault  = this._vault.value;
        if (!sender.equals(vault)) {
            const managerKey = this._managerKey(sender, propertyContract);
            if (this._managers.get(managerKey).isZero()) {
                throw new Revert('YieldDistributor: not authorized');
            }
        }

        // Get total supply of FractionalToken via cross-contract call
        const totalSupply = this._getTotalSupply(propertyContract);
        if (totalSupply.isZero()) throw new Revert('YieldDistributor: no token supply');

        // yieldPerToken += (amount × SCALE) / totalSupply
        const propKey      = u256.fromUint8ArrayBE(propertyContract);
        const currentYPT   = this._yieldPerToken.get(propKey);
        const increment    = SafeMath.div(SafeMath.mul(amount, SCALE), totalSupply);
        const newYPT       = SafeMath.add(currentYPT, increment);
        this._yieldPerToken.set(propKey, newYPT);

        // Track total deposited for analytics
        const totalDep = this._totalDeposited.get(propKey);
        this._totalDeposited.set(propKey, SafeMath.add(totalDep, amount));

        Blockchain.emit(new YieldDepositedEvent(propertyContract, amount, newYPT));

        const result = new BytesWriter(1);
        result.writeBoolean(true);
        return result;
    }

    // ── claimYield ────────────────────────────────────────────────────────────
    // Called by a FractionalToken holder to claim accumulated yield.
    //
    // Formula:
    //   claimable = (balance × (yieldPerToken - userPaid)) / SCALE
    //   userPaid[caller][property] = yieldPerToken   ← checkpoint updated first (CEI)

    @method({ name: 'propertyContract', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'claimed', type: ABIDataTypes.UINT256 })
    public claimYield(calldata: Calldata): BytesWriter {
        const propertyContract = calldata.readAddress();
        const caller           = Blockchain.tx.sender;

        const claimable = this._earned(caller, propertyContract);

        // CEI: update checkpoint BEFORE external transfer
        const propKey   = u256.fromUint8ArrayBE(propertyContract);
        const userKey   = this._userKey(caller, propertyContract);
        const currentYPT = this._yieldPerToken.get(propKey);
        this._userPaid.set(userKey, currentYPT);

        if (!claimable.isZero()) {
            // Transfer BTC to caller via Blockchain.transfer
            // In OP_NET, yield is distributed as OPWAY/USDOP — transfer via token call
            // For now: emit event and record — actual transfer depends on yield token config
            const yieldTok = this._yieldToken.value;
            if (yieldTok.equals(Address.zero())) throw new Revert("YieldDistributor: yield token not configured");
            TransferHelper.transfer(yieldTok, caller, claimable);
            Blockchain.emit(new YieldClaimedEvent(caller, propertyContract, claimable));
        }

        const result = new BytesWriter(32);
        result.writeU256(claimable);
        return result;
    }

    // ── earned (view) ─────────────────────────────────────────────────────────
    // Returns how much yield a user can currently claim.

    @method(
        { name: 'user',             type: ABIDataTypes.ADDRESS },
        { name: 'propertyContract', type: ABIDataTypes.ADDRESS },
    )
    @returns({ name: 'claimable', type: ABIDataTypes.UINT256 })
    public earnedView(calldata: Calldata): BytesWriter {
        const user             = calldata.readAddress();
        const propertyContract = calldata.readAddress();
        const claimable        = this._earned(user, propertyContract);
        const result           = new BytesWriter(32);
        result.writeU256(claimable);
        return result;
    }

    // ── getYieldPerToken (view) ───────────────────────────────────────────────

    @method({ name: 'propertyContract', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'yieldPerToken', type: ABIDataTypes.UINT256 })
    public getYieldPerToken(calldata: Calldata): BytesWriter {
        const propertyContract = calldata.readAddress();
        const propKey          = u256.fromUint8ArrayBE(propertyContract);
        const result           = new BytesWriter(32);
        result.writeU256(this._yieldPerToken.get(propKey));
        return result;
    }

    // ── getTotalDeposited (view) ──────────────────────────────────────────────

    @method({ name: 'propertyContract', type: ABIDataTypes.ADDRESS })
    @returns({ name: 'total', type: ABIDataTypes.UINT256 })
    public getTotalDeposited(calldata: Calldata): BytesWriter {
        const propertyContract = calldata.readAddress();
        const propKey          = u256.fromUint8ArrayBE(propertyContract);
        const result           = new BytesWriter(32);
        result.writeU256(this._totalDeposited.get(propKey));
        return result;
    }

    // ── Internal helpers ──────────────────────────────────────────────────────

    private _earned(user: Address, propertyContract: Address): u256 {
        const propKey    = u256.fromUint8ArrayBE(propertyContract);
        const userKey    = this._userKey(user, propertyContract);
        const yieldPT    = this._yieldPerToken.get(propKey);
        const userPaid   = this._userPaid.get(userKey);
        const delta      = SafeMath.sub(yieldPT, userPaid);
        if (delta.isZero()) return u256.Zero;

        const balance    = this._getBalance(propertyContract, user);
        // claimable = (balance × delta) / SCALE
        return SafeMath.div(SafeMath.mul(balance, delta), SCALE);
    }

    // Cross-contract call: FractionalToken.totalSupply()
    private _getTotalSupply(tokenContract: Address): u256 {
        const selector = encodeSelector('totalSupply()');
        const cd       = new BytesWriter(SELECTOR_BYTE_LENGTH);
        cd.writeSelector(selector);
        const callResult = Blockchain.call(tokenContract, cd, false);
        if (!callResult.success) return u256.Zero;
        return callResult.data.readU256();
    }

    // Cross-contract call: FractionalToken.balanceOf(user)
    private _getBalance(tokenContract: Address, user: Address): u256 {
        const selector = encodeSelector('balanceOf(address)');
        const cd       = new BytesWriter(SELECTOR_BYTE_LENGTH + ADDRESS_BYTE_LENGTH);
        cd.writeSelector(selector);
        cd.writeAddress(user);
        const callResult = Blockchain.call(tokenContract, cd, false);
        if (!callResult.success) return u256.Zero;
        return callResult.data.readU256();
    }

    // Composite key: sha256(user ++ propertyContract)
    // R-006: was u256.fromUint8ArrayBE(combined) — 64-byte input truncated to first 32, causing key collisions.
    // Fix: hash with Blockchain.sha256 first, then convert the 32-byte digest.
    private _userKey(user: Address, propertyContract: Address): u256 {
        const userBytes = user as Uint8Array;
        const propBytes = propertyContract as Uint8Array;
        const combined  = new Uint8Array(userBytes.length + propBytes.length);
        combined.set(userBytes, 0);
        combined.set(propBytes, userBytes.length);
        const hash = Blockchain.sha256(combined);
        return u256.fromUint8ArrayBE(hash);
    }

    // Composite key: hash(manager ++ propertyContract)
    private _managerKey(manager: Address, propertyContract: Address): u256 {
        return this._userKey(manager, propertyContract);
    }
}
