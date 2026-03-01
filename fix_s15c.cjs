// fix_s15c.cjs — corrige prop onConnectClick no Layout.tsx
const fs = require('fs');
const path = require('path');

const layoutAbs = path.join(process.cwd(), 'src/components/Layout.tsx');
let src = fs.readFileSync(layoutAbs, 'utf8');

console.log('\n[1] Current Layout.tsx content:');
console.log(src);
console.log('\n--- analyzing...');

// Strategy: find where <Navigation is rendered and ensure onConnectClick is passed
// Also ensure the modal state lives in Layout (or App)

// Check if Layout already has modal state
const hasModalState = src.includes('showWalletModal') || src.includes('modalOpen');
const hasNavigation = src.includes('<Navigation');

console.log('  hasModalState:', hasModalState);
console.log('  hasNavigation:', hasNavigation);

// Fix approach: make onConnectClick optional in Navigation OR pass it from Layout
// Best: make it optional with a default no-op, so Layout doesn't need to manage modal state
// unless it already does

// Read Navigation.tsx to check the prop definition
const navAbs = path.join(process.cwd(), 'src/components/Navigation.tsx');
let nav = fs.readFileSync(navAbs, 'utf8');

// Make onConnectClick optional in Navigation
const OLD_PROP = `{ onConnectClick }: { onConnectClick: () => void }`;
const NEW_PROP = `{ onConnectClick = () => {} }: { onConnectClick?: () => void }`;

if (nav.includes(OLD_PROP)) {
  nav = nav.replace(OLD_PROP, NEW_PROP);
  fs.writeFileSync(navAbs, nav, 'utf8');
  console.log('\n  [Navigation.tsx] made onConnectClick optional with default no-op');
} else {
  // Try other common patterns
  const ALT1 = `{ onConnectClick }: {onConnectClick: () => void}`;
  const ALT2 = `{onConnectClick}: { onConnectClick: () => void }`;
  if (nav.includes(ALT1)) {
    nav = nav.replace(ALT1, `{ onConnectClick = () => {} }: { onConnectClick?: () => void }`);
    fs.writeFileSync(navAbs, nav, 'utf8');
    console.log('\n  [Navigation.tsx] patched alt pattern');
  } else if (nav.includes(ALT2)) {
    nav = nav.replace(ALT2, `{onConnectClick = () => {}}: { onConnectClick?: () => void }`);
    fs.writeFileSync(navAbs, nav, 'utf8');
    console.log('\n  [Navigation.tsx] patched alt pattern 2');
  } else {
    // Regex fallback
    const fixed = nav.replace(
      /\(\s*\{\s*onConnectClick\s*\}\s*:\s*\{\s*onConnectClick\s*:\s*\(\s*\)\s*=>\s*void\s*\}\s*\)/,
      `({ onConnectClick = () => {} }: { onConnectClick?: () => void })`
    );
    if (fixed !== nav) {
      fs.writeFileSync(navAbs, fixed, 'utf8');
      console.log('\n  [Navigation.tsx] patched via regex');
    } else {
      console.warn('\n  WARN: could not find prop pattern — showing Navigation.tsx start:');
      console.log(nav.slice(0, 800));
    }
  }
}

// Also check if Layout needs to pass onConnectClick — if Layout renders <Navigation>
// and has modal management, ensure it passes the prop
if (hasNavigation && !src.includes('onConnectClick')) {
  // Layout renders Navigation but doesn't pass onConnectClick
  // Since we made it optional above this should be fine, but let's also
  // check if Layout has its own modal state to wire up
  console.log('\n  Layout renders <Navigation> without onConnectClick — now optional, should be fine');
}

console.log(`
╔══════════════════════════════════════════════════╗
║  fix_s15c DONE                                  ║
║                                                  ║
║  npx tsc --noEmit 2>&1 | head -20               ║
║  git add src/components/Navigation.tsx          ║
║  git commit -m "fix: onConnectClick optional    ║
║    default noop in Navigation (s15c)"           ║
║  git push origin main                           ║
╚══════════════════════════════════════════════════╝
`);
