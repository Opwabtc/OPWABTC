# OPWABTC — Claude Code Context

## Projeto
Real estate tokenization platform on Bitcoin L1 via OP_NET.
Repo: https://github.com/Opwabtc/OPWABTC.git
Site: https://opwabtc.vercel.app
Deadline: 13 março 2026 (hackathon) / 17 março 2026 (OP_NET mainnet)

---

## Contratos Ativos (testnet OP_NET)

```
opwaCoin:      opt1sqpz0m0uql87kz425y6h99p2k0lqut59vsgaxq8t2   (v3)
propertyNft:   opt1sqpvldyanfs6edn5vxxd8ven58tp8qcrxdyzd2pvl   (v6)
opwayYield:    opt1sqpp23havwmyn6fykg2x8pr4vkqzw848suq828lwz   (v4)
usdop:         opt1sqpy0t34k0s6fkn76art8uv6rg8uphvna5ydgd4mu   (v1)
yieldVault:    opt1sqqna5kthnryd4e44q0urp4veg6y6xp5k65jgj9mv   (v3)
propertyVault: opt1sqz5styqz7lcq92028p6pyjwlpnvzmjpmnufny8rs   (v3)
treasury:      opt1ptma69xdfhxqvve9zl2pwva288lj8rtm7w3ww5xavf6xfp8uegevqq58h3t
nftP2tr:       opt1py4wmts2h49eykwn8903mtwdl7ndcmffnaynx83eep9ahyrdmqc3sfsfkpk
```

---

## Stack

- **Contratos:** AssemblyScript + btc-runtime (@btc-vision/btc-runtime)
- **Frontend:** Vanilla JS/HTML single file (index.html) + React/TypeScript em src/
- **Deploy contratos:** npx tsx scripts/deploy-*.ts
- **Compilar WASM:** npx asc <contrato>.ts --outFile build/<Contrato>.wasm --optimize
- **Frontend deploy:** Vercel (push para main = auto-deploy)
- **RPC:** https://testnet.opnet.org/api/v1/json-rpc
- **Explorer:** https://opscan.org?network=op_testnet
- **Mempool:** https://mempool.opnet.org

---

## Regras Críticas do btc-runtime (NUNCA violar)

### AssemblyScript
- Sempre usar `Revert` para erros, NUNCA `Error` ou `throw new Error()`
- Sempre usar `u256.lt()`, `u256.gt()`, `u256.eq()`, `u256.gte()`, `u256.lte()` — NUNCA operadores JS `<`, `>`, `!=`, `==` em u256
- Sempre usar `SafeMath.add/sub/mul/div` para aritmética u256
- NUNCA usar `Blockchain.contractAddress` — usar `this.address`
- NUNCA usar `Blockchain.getStorageBool/getStorageU64/getStorageString` — usar `StoredBoolean/StoredU64/StoredAddress`
- Parâmetros de método sempre `Address` não `string`
- Sempre usar `@method` decorator + `Calldata` + `BytesWriter` pattern
- Pointers de storage: NUNCA `Blockchain.nextPointer` em field initializers de classe (ATK-01 constructor trap) — usar constantes fixas como `u16 = 100`
- Exceção: `Blockchain.nextPointer` é OK dentro de `constructor()` ou `onDeployment()`

### btc-runtime patches (CRÍTICO)
Dois patches aplicados em `contracts/node_modules/` que NUNCA devem ser perdidos:
1. `@btc-vision/btc-runtime/runtime/script/Networks.ts` — `hrp()` case Testnet: `'tb'` → `'opt'`
2. `@btc-vision/btc-runtime/runtime/global.ts` — `declare function verifySchnorrSignature` removida

**NUNCA rodar `npm install` limpo em contracts/ sem reaplicar esses patches.**
Verificação: `node -e "const b=require('fs').readFileSync('contracts/build/OPWACoin.wasm');console.log(!Buffer.from(b).toString('binary').includes('verifySchnorrSignature'));"` deve retornar `true`.

### JSONRpcProvider (frontend)
```javascript
// CORRETO — sempre object config
new JSONRpcProvider({ url: 'https://testnet.opnet.org', network: _OPNET_NET })
// ERRADO — args posicionais (já corrigido em todos os 14 lugares)
new JSONRpcProvider('https://testnet.opnet.org/api/v1/json-rpc', _OPNET_NET)
```

### Flows de transação
```javascript
// Buy OPWAY
setTransactionDetails(treasury, sats) → OPWAYield.mint(to, amount)
→ sendTransaction({ extraOutputs: [{ address: TREASURY, value: sats }] })

// Mint NFT
setTransactionDetails({ outputs: [{ to: NFT_P2TR, value: 10000 }] })
→ contract.mintNFT(sender, tokenId)
→ sendTransaction({ extraOutputs: [{ address: NFT_P2TR, value: 10000 }] })

// Stake
(1) check allowance on-chain
(2) se insuficiente: approve(YieldVault, amount)
(3) poll 8s/90s até confirmar (block widget)
(4) vaultExecuteStake()
```

---

## Funções que NUNCA devem ser tocadas

```
_OPNET_NET
_contractAddr()
_startBlockWidget()
_stopBlockWidget()
_startAllowancePoll()
_pendingApproval
_mempoolInterval
vaultDepositOPWAY()
pvaultRemove()
buildSenderAddress()
```

---

## Block Widget (aprovação de allowance)

O widget `#pending-block-wrap` está posicionado FORA de qualquer page div (antes de `</body>`) para que `position:fixed` funcione mesmo quando `#page-vault` tem `display:none`. Ele mostra o bloco OPNet atual vs `approvalBlock` — confirmado quando `opBlock > approvalBlock`. Poll a cada 8s.

---

## Pendências Prioritárias

1. **OPWAY balance = 0** no dashboard — bug de RPC format
2. **TX history = 0** — bug pendente
3. **Supply progress = 0%** — bug pendente
4. **WalletConnect modal CSS** — M-01 (position:fixed, z-index:99999)
5. Testes unitários YieldVault/YieldDistributor

---

## Deploy Workflow

```bash
# Compilar contrato
cd ~/OPWABTC/contracts
npx asc op20/OPWACoin.ts --outFile build/OPWACoin.wasm --optimize

# Deploy
cd ~/OPWABTC
OPNET_MNEMONIC='$OPNET_MNEMONIC' npx tsx scripts/deploy-token.ts

# Configurar
OPNET_MNEMONIC='...' npx tsx scripts/set-treasury.ts
OPNET_MNEMONIC='...' npx tsx scripts/set-price.ts

# Atualizar endereço no index.html e fazer push
git add index.html
git commit -m "fix: update contract address"
git push
```

---

## Mnemonic de Deploy

`[REDACTED — use .env local]`

---

## Regressões Conhecidas (aceitáveis para testnet)

- `USDOP.setMinter()`: lock CF-13 removido — deployer pode trocar minter
- `YieldVault.setAddresses()`: guard `_configured` removido — pode reconfigurar

---

## Audit Score

Audit v1: 107 findings — todos tratados
Audit v2: 15 findings — todos tratados no código (alguns requerem redeploy de contratos adicionais)
Findings restantes abertos: YieldDistributor (contrato novo, não deployado), testes unitários
