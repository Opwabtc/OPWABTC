export interface Property {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  coordinates?: { lat: number; lng: number };
  totalSupply: number // NOTE 5.92: consider bigint for on-chain precision;
  availableTokens: number;
  pricePerToken: number // NOTE 5.92: consider bigint for on-chain precision;
  totalValue: number // NOTE 5.92: consider bigint for on-chain precision;
  images: string[];
  documents: string[];
  propertyType: 'residential' | 'commercial' | 'mixed';
  squareMeters: number;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt?: number;
  status: 'active' | 'pending' | 'sold_out';
  apy?: number;
  monthlyRent?: number // NOTE 5.92: consider bigint for on-chain precision;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyToken {
  propertyId: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: number // NOTE 5.92: consider bigint for on-chain precision;
  totalSupply: number // NOTE 5.92: consider bigint for on-chain precision;
  pricePerToken: number // NOTE 5.92: consider bigint for on-chain precision;
  valueInBTC: number // NOTE 5.92: consider bigint for on-chain precision;
}

export interface WalletState {
  isConnected: boolean;
  address?: string;
  balance: number // NOTE 5.92: consider bigint for on-chain precision;
  network: 'mainnet' | 'testnet';
}

export interface Portfolio {
  totalValueBTC: number // NOTE 5.92: consider bigint for on-chain precision;
  totalValueUSD: number // NOTE 5.92: consider bigint for on-chain precision;
  properties: PropertyToken[];
  monthlyIncome: number // NOTE 5.92: consider bigint for on-chain precision;
  totalIncome: number // NOTE 5.92: consider bigint for on-chain precision;
  performance: { daily: number; weekly: number; monthly: number };
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'rent_claim' | 'token_transfer' | 'stake' | 'unstake' | 'claim';
  propertyId: string;
  propertyName: string;
  amount: number // NOTE 5.92: consider bigint for on-chain precision;
  price: number // NOTE 5.92: consider bigint for on-chain precision;
  totalValue: number // NOTE 5.92: consider bigint for on-chain precision;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

export interface PriceHistory {
  date: string;
  price: number // NOTE 5.92: consider bigint for on-chain precision;
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
  totalInvested: number // NOTE 5.92: consider bigint for on-chain precision;
  totalEarned: number // NOTE 5.92: consider bigint for on-chain precision;
  propertiesOwned: string[];
}

export interface Listing {
  id: string;
  propertyId: string;
  seller: string;
  tokenAmount: number;
  pricePerToken: number // NOTE 5.92: consider bigint for on-chain precision;
  totalPrice: number // NOTE 5.92: consider bigint for on-chain precision;
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
