# 🏠 OP Real Estate Platform

A modern platform for investing in tokenized real estate properties using Bitcoin and OP_NET blockchain technology.

## 🌟 Features

- **🏠 Property Tokenization**: Invest in fractional ownership of premium real estate
- **💰 Bitcoin Integration**: Buy/sell property tokens using Bitcoin
- **📊 Portfolio Analytics**: Track your investments with detailed charts and performance metrics
- **👛 OP_NET Wallet**: Secure wallet integration for seamless transactions
- **📈 Real-time Data**: Live price updates and market information
- **🎨 Modern UI**: Beautiful, responsive interface built with React and TailwindCSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- OP_NET compatible wallet (OP_NET, UniSat, XVerse)

### Installation

```bash
# Clone the repository
git clone https://github.com/Opwabtc/opwa.btc.git
cd opwa.btc/op-real-estate-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# OP_NET Configuration
VITE_OP_NET_TESTNET_RPC=https://testnet.opnet.org/rpc
VITE_OP_NET_TESTNET_CHAIN_ID=1338

# API Configuration
VITE_API_BASE_URL=https://api.opwa.btc
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── PropertyCard.tsx
│   ├── PortfolioChart.tsx
│   └── WalletButton.tsx
├── hooks/              # Custom React hooks
│   └── useWallet.ts
├── lib/                # Utility libraries
│   ├── opnet.ts
│   └── utils.ts
├── pages/              # Page components
│   └── Dashboard.tsx
├── store/              # State management
│   └── useAppStore.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── styles/             # Global styles
    └── index.css
```

## 💻 Technology Stack

### Frontend
- **React 19.2.0** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing

### UI/UX
- **Lucide React** - Beautiful icons
- **Recharts** - Interactive charts and graphs
- **Responsive Design** - Mobile-first approach

### Blockchain
- **OP_NET Integration** - Bitcoin Layer 1 smart contracts
- **Multi-wallet Support** - OP_NET, UniSat, XVerse
- **Ethers.js** - Blockchain interaction library

## 🎯 Core Features

### 🏠 Property Marketplace
- Browse available tokenized properties
- Filter by location, price, property type
- View detailed property information and documents
- Real-time price updates

### 💼 Portfolio Management
- Track all your property token investments
- View performance charts and analytics
- Calculate rental income and appreciation
- Export portfolio data

### 👛 Wallet Integration
- Connect OP_NET compatible wallets
- Secure transaction signing
- Balance tracking and history
- Multi-wallet support

### 📊 Analytics & Charts
- Portfolio performance over time
- Property price history
- Market trends and statistics
- Interactive data visualization

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Building for Production

```bash
npm run build
```

The build will be output to the `dist/` directory.

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build and deploy to Netlify
npm run build
# Upload dist/ folder to Netlify
```

## 🔐 Security Considerations

- All wallet interactions are client-side and secure
- No private keys are stored on servers
- Transactions require explicit user approval
- Smart contract interactions are validated

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Documentation**: [docs.opwa.btc](https://docs.opwa.btc)
- **Discord**: [OPWA Community](https://discord.gg/opwa)
- **Twitter**: [@opwa_btc](https://twitter.com/opwa_btc)

## ⚠️ Disclaimer

This is a experimental platform for tokenized real estate investment. Cryptocurrency investments carry significant risk. Please do your own research before investing.

---

**Built with ❤️ for the Bitcoin ecosystem**
