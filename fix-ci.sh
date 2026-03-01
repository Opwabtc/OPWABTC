#!/bin/bash
# ============================================================
# OPWA - CI Fix Script | Fase 2: Reset + Lockfile Regeneration
# ============================================================

set -e

echo "=========================================="
echo "  OPWA CI FIX - Lockfile Reset Script"
echo "=========================================="

echo ""
echo "[1/7] Verificando versões..."
node -v
npm -v

echo ""
echo "[2/7] Entrando na branch main..."
git checkout main
git pull origin main

echo ""
echo "[3/7] Removendo node_modules..."
rm -rf node_modules

echo ""
echo "[4/7] Removendo package-lock.json antigo..."
rm -f package-lock.json

echo ""
echo "[5/7] Limpando cache do npm..."
npm cache clean --force

echo ""
echo "[6/7] Instalando dependências..."
# Tenta instalação normal primeiro
if ! npm install; then
  echo ""
  echo "⚠️  npm install falhou. Tentando com --legacy-peer-deps..."
  npm install --legacy-peer-deps
fi

echo ""
echo "[7/7] Verificando build local..."
npm run build

echo ""
echo "=========================================="
echo "  ✅ Sucesso! Agora commite o lockfile:"
echo "=========================================="
echo ""
echo "  git add package-lock.json"
echo "  git commit -m \"fix(ci): deterministic lockfile regeneration\""
echo "  git push origin main"
echo ""
echo "  Depois monitore o GitHub Actions para confirmar."
echo "=========================================="
