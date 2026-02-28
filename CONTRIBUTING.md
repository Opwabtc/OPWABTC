# Contributing to OPWA Platform

Thank you for your interest in contributing!

## Getting Started
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/OPWABTC.git`
3. Install dependencies: `npm install --legacy-peer-deps`
4. Start dev server: `npm run dev`

## Branch Naming
- `feature/` - new features
- `fix/` - bug fixes
- `docs/` - documentation only

## Commit Convention
We use conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `ci:` CI/CD changes

## Pull Request Process
1. Create a branch from `main`
2. Make your changes
3. Run `npm run build` locally before pushing
4. Open a Pull Request targeting `main`
5. Wait for CI to pass before requesting review

## Smart Contracts
Contract changes in `contracts/` must include:
- Full test coverage
- Security review notes
- OP_NET testnet validation

## Questions?
Open an issue or reach out on Twitter [@opwabtc](https://twitter.com/opwabtc)
