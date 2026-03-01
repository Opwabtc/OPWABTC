#!/bin/bash
# OPWA s14 — usa .cjs para compatibilidade com package.json "type":"module"
set -e
echo "=== OPWA s14 ==="

node gen_nav.cjs
node gen_dashboard.cjs
node gen_app.cjs
node gen_css.cjs

echo ""
echo "=== tsc check ==="
npx tsc --noEmit 2>&1 | head -30

echo ""
echo "=== git ==="
git add src/components/Navigation.tsx src/pages/Dashboard.tsx src/App.tsx src/index.css
git commit -m "feat: dashboard + nav tab + slider dot fix + step hover white + 3D card polish (s14)"
git push origin main

echo "=== DONE ==="
