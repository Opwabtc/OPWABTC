#!/bin/bash
set -e
echo "=== Fix TS errors s14 ==="
node fix_ts_s14.cjs
echo ""
echo "=== tsc check ==="
npx tsc --noEmit 2>&1 | head -20
echo ""
echo "=== git ==="
git add src/components/Navigation.tsx src/pages/Dashboard.tsx
git commit -m "fix: TS errors Navigation+Dashboard — any cast store, opnet import (s14)"
git push origin main
echo "=== DONE ==="
