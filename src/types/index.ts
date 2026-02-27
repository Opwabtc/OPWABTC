export interface Property {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  totalSupply: number;
  availableTokens: number;
  pricePerToken: number; // in BTC satoshis
  totalValue: number; // in BTC satoshis
  images: string[];
  documents: string[];
  propertyType: 'residential' | 'commercial' | 'mixed';
  squareMeters: number;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  status: 'active' | 'pending' | 'sold_out';
  apy?: number; // Annual percentage yield from rent
  monthlyRent?: number; // in BTC satoshis
  createdAt: string;
  updatedAt: string;
}

export interface PropertyToken {
  propertyId: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: number;
  totalSupply: number;
  pricePerToken: number;
  valueInBTC: number;
}

export interface WalletState {
  isConnected: boolean;
  address?: string;
  balance: number; // in satoshis
  network: 'mainnet' | 'testnet';
}

export interface Portfolio {
  totalValueBTC: number;
  totalValueUSD: number;
  properties: PropertyToken[];
  monthlyIncome: number;
  totalIncome: number;
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'rent_claim' | 'token_transfer';
  propertyId: string;
  propertyName: string;
  amount: number;
  price: number;
  totalValue: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

export interface PriceHistory {
  date: string;
  price: number;
  volume: number;
  marketCap: number;
}

export interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  activeProperties: number;
  totalInvestors: number;
  averageAPY: number;
}

export interface User {
  address: string;
  reputation: number;
  joinedAt: string;
  totalInvested: number;
  totalEarned: number;
  propertiesOwned: string[];
}

export interface Listing {
  id: string;
  propertyId: string;
  seller: string;
  tokenAmount: number;
  pricePerToken: number;
  totalPrice: number;
  type: 'fixed_price' | 'auction';
  status: 'active' | 'cancelled' | 'sold';
  createdAt: string;
  expiresAt?: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
