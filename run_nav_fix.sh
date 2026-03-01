#!/bin/bash
set -e
echo "=== Fix Nav classes s14 ==="
node fix_nav_classes.cjs
echo ""
echo "=== tsc ==="
npx tsc --noEmit 2>&1 | head -20
echo ""
echo "=== git ==="
git add src/components/Navigation.tsx
git commit -m "fix: Navigation usa classes CSS originais (navbar, nav-links, navbar-right, etc) (s14)"
git push origin main
echo "=== DONE ==="
