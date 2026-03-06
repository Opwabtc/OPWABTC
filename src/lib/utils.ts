import { format } from 'date-fns';

export const formatSatsToBTC = (sats: number): string => {
  return (sats / 100000000).toFixed(8);
};

export const formatBTCtoSats = (btc: number): number => {
  return Math.floor(btc * 100000000);
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number, decimals = 2): string => {
  if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K';
  return num.toFixed(decimals);
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy HH:mm');
};

export const truncateAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return '';
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

export const truncateTxHash = (hash: string, startChars = 10, endChars = 6): string => {
  if (!hash) return '';
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const calculateAPY = (monthlyRent: number, propertyValue: number): number => {
  if (propertyValue === 0) return 0;
  const annualRent = monthlyRent * 12;
  return (annualRent / propertyValue) * 100;
};

/** @demo TEST/DEMO ONLY — uses Math.random(), never call with real data */
export const generateMockPriceHistory = (days: number, basePrice: number) => {
  const history = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random walk with slight upward trend
    const change = (Math.random() - 0.48) * 0.02; // -0.96% to +1.04%
    currentPrice = currentPrice * (1 + change);
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(currentPrice),
      volume: Math.floor(Math.random() * 1000000) + 100000,
      marketCap: Math.round(currentPrice * 1000000), // Assuming 1M tokens
    });
  }
  
  return history;
};

/** @demo TEST/DEMO ONLY — returns hardcoded mock property data */
export const generateMockProperties = () => {
  return [
    {
      id: 'prop-001',
      name: 'Luxury Downtown Apartment',
      description: 'Modern 2-bedroom apartment in the heart of the financial district with stunning city views.',
      address: '123 Main St, Suite 45B',
      city: 'New York',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      totalSupply: 1000000,
      availableTokens: 750000,
      pricePerToken: 50000, // 0.0005 BTC
      totalValue: 50000000000, // 500 BTC
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      ],
      documents: ['QmPropertyDoc1', 'QmPropertyDoc2'],
      propertyType: 'residential' as const,
      squareMeters: 120,
      bedrooms: 2,
      bathrooms: 2,
      yearBuilt: 2020,
      status: 'active' as const,
      apy: 8.5,
      monthlyRent: 4166667, // 0.04166667 BTC
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-02-20T14:30:00Z',
    },
    {
      id: 'prop-002',
      name: 'Beachfront Villa Miami',
      description: 'Exclusive beachfront property with private beach access and panoramic ocean views.',
      address: '456 Ocean Drive',
      city: 'Miami',
      country: 'USA',
      coordinates: { lat: 25.7617, lng: -80.1918 },
      totalSupply: 2000000,
      availableTokens: 1800000,
      pricePerToken: 75000, // 0.00075 BTC
      totalValue: 150000000000, // 1500 BTC
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      ],
      documents: ['QmPropertyDoc3', 'QmPropertyDoc4'],
      propertyType: 'residential' as const,
      squareMeters: 350,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2018,
      status: 'active' as const,
      apy: 7.2,
      monthlyRent: 9000000, // 0.09 BTC
      createdAt: '2024-02-01T09:00:00Z',
      updatedAt: '2024-02-18T16:45:00Z',
    },
    {
      id: 'prop-003',
      name: 'Commercial Office Tower',
      description: 'Prime commercial space in central business district with high tenant demand.',
      address: '789 Business Ave',
      city: 'San Francisco',
      country: 'USA',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      totalSupply: 5000000,
      availableTokens: 3500000,
      pricePerToken: 25000, // 0.00025 BTC
      totalValue: 125000000000, // 1250 BTC
      images: [
        'https://images.unsplash.com/photo-1486406146921-c63de6c0e5a0?w=800',
        'https://images.unsplash.com/photo-1497366216548-375f70e41755?w=800',
      ],
      documents: ['QmPropertyDoc5', 'QmPropertyDoc6'],
      propertyType: 'commercial' as const,
      squareMeters: 2000,
      yearBuilt: 2015,
      status: 'active' as const,
      apy: 6.8,
      monthlyRent: 7083333, // 0.07083333 BTC
      createdAt: '2023-12-10T11:00:00Z',
      updatedAt: '2024-02-15T10:20:00Z',
    },
  ];
};

/** @demo TEST/DEMO ONLY — returns hardcoded mock portfolio data */
export const generateMockPortfolio = () => {
  return {
    totalValueBTC: 2.5 * 100000000, // 2.5 BTC in satoshis
    totalValueUSD: 125000, // Assuming $50,000 per BTC
    properties: [
      {
        propertyId: 'prop-001',
        symbol: 'LDA',
        name: 'Luxury Downtown Apartment',
        decimals: 8,
        balance: 250000,
        totalSupply: 1000000,
        pricePerToken: 50000,
        valueInBTC: 12500000000, // 0.125 BTC
      },
      {
        propertyId: 'prop-002',
        symbol: 'BFV',
        name: 'Beachfront Villa Miami',
        decimals: 8,
        balance: 200000,
        totalSupply: 2000000,
        pricePerToken: 75000,
        valueInBTC: 15000000000, // 0.15 BTC
      },
    ],
    monthlyIncome: 20833333, // 0.20833333 BTC
    totalIncome: 250000000, // 2.5 BTC
    performance: {
      daily: 2.5,
      weekly: 8.2,
      monthly: 15.7,
    },
  };
};

/** @demo TEST/DEMO ONLY — returns hardcoded mock transaction data */
export const generateMockTransactions = () => {
  return [
    {
      id: 'tx-001',
      type: 'buy' as const,
      propertyId: 'prop-001',
      propertyName: 'Luxury Downtown Apartment',
      amount: 250000,
      price: 50000,
      totalValue: 12500000000,
      timestamp: '2024-02-20T14:30:00Z',
      status: 'completed' as const,
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
    },
    {
      id: 'tx-002',
      type: 'rent_claim' as const,
      propertyId: 'prop-001',
      propertyName: 'Luxury Downtown Apartment',
      amount: 0,
      price: 0,
      totalValue: 2083333,
      timestamp: '2024-02-15T10:00:00Z',
      status: 'completed' as const,
      txHash: '0x2345678901bcdef12345678901bcdef12345678',
    },
    {
      id: 'tx-003',
      type: 'buy' as const,
      propertyId: 'prop-002',
      propertyName: 'Beachfront Villa Miami',
      amount: 200000,
      price: 75000,
      totalValue: 15000000000,
      timestamp: '2024-02-10T16:45:00Z',
      status: 'completed' as const,
      txHash: '0x3456789012cdef123456789012cdef12345678',
    },
  ];
};
