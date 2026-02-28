#!/bin/bash
echo "Running OPWA Sanity Check..."
npm ci || exit 1
npx tsc --noEmit || exit 1
npm run build || exit 1
echo "Sanity check passed."
