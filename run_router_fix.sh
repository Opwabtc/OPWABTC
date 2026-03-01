#!/bin/bash
set -e
echo "=== OPWA router fix ==="
node fix_router_s14.cjs
echo ""
echo "=== tsc ==="
npx tsc --noEmit 2>&1 | head -20
echo ""
echo "=== git ==="
git add src/App.tsx src/components/Navigation.tsx src/pages/Dashboard.tsx
git commit -m "fix: remove BrowserRouter duplo do App.tsx — tela preta resolvida (s14)"
git push origin main
echo "=== DONE ==="
