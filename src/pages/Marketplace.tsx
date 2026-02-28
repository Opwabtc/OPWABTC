import React, { useState } from 'react';
import { Filter, TrendingUp, ArrowUpDown } from 'lucide-react';
import { PropertyCard } from '@/components/PropertyCard';
import { BuyTokenModal } from '@/components/BuyTokenModal';
import { SellTokenModal } from '@/components/SellTokenModal';
import { useAppStore } from '@/store/useAppStore';
import { useWallet } from '@/hooks/useWallet';
import { formatSatsToBTC, formatNumber } from '@/lib/utils';
import type { Property, PropertyToken } from '@/types';

export const Marketplace: React.FC = () => {
  const { properties, portfolio } = useAppStore();
  const { wallet } = useWallet();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedToken, setSelectedToken] = useState<PropertyToken | null>(null);

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesCategory = selectedCategory === 'all' || property.propertyType === selectedCategory;
    return matchesCategory;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.pricePerToken - b.pricePerToken;
      case 'price-high':
        return b.pricePerToken - a.pricePerToken;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'apy-high':
        return (b.apy || 0) - (a.apy || 0);
      default:
        return 0;
    }
  });

  const handleBuyClick = (property: Property) => {
    if (!wallet.isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    setSelectedProperty(property);
    setBuyModalOpen(true);
  };

  const handleSellClick = (token: PropertyToken) => {
    if (!wallet.isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    setSelectedToken(token);
    setSellModalOpen(true);
  };

  const handleBuy = async (amount: number, totalPrice: number) => {
    if (!wallet.address) throw new Error('Wallet not connected');
    // TODO: call OPWAPropertyToken contract via signer once contracts are deployed
    console.log(`Buy intent: ${amount} tokens for ${formatSatsToBTC(totalPrice)} BTC`);
    throw new Error('Contract interaction coming after testnet deployment');
  };

  const handleSell = async (amount: number, totalPrice: number) => {
    if (!wallet.address) throw new Error('Wallet not connected');
    // TODO: call OPWAPropertyToken contract via signer once contracts are deployed
    console.log(`Sell intent: ${amount} tokens for ${formatSatsToBTC(totalPrice)} BTC`);
    throw new Error('Contract interaction coming after testnet deployment');
  };

  const marketStats = {
    totalProperties: properties.length,
    totalValue: properties.reduce((sum, p) => sum + p.totalValue, 0),
    averageAPY: properties.reduce((sum, p) => sum + (p.apy || 0), 0) / properties.length,
    activeListings: properties.filter(p => p.status === 'active').length
  };

  return (
    <div className="p-6">
      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card card-hover">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {marketStats.totalProperties}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatSatsToBTC(marketStats.totalValue)} BTC
                </p>
              </div>
              <div className="p-3 bg-bitcoin-orange bg-opacity-10 rounded-lg">
                <span className="text-bitcoin-orange text-xl font-bold">₿</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average APY</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {marketStats.averageAPY.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {marketStats.activeListings}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <ArrowUpDown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange"
            >
              <option value="all">All Properties</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
              <option value="apy-high">APY: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Your Portfolio (if connected) */}
      {wallet.isConnected && portfolio && portfolio.properties.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Your Portfolio - Sell Tokens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.properties.map((token, index) => (
              <div key={index} className="card card-hover">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {token.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {token.symbol}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                      Owned
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Balance</span>
                      <span className="font-mono">{formatNumber(token.balance)} tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Value</span>
                      <span className="font-mono">{formatSatsToBTC(token.valueInBTC)} BTC</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleSellClick(token)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Sell Tokens
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Available Properties */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Available Properties - Buy Tokens
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onBuyClick={handleBuyClick}
              onDetailsClick={() => console.log('View details:', property.name)}
            />
          ))}
        </div>

        {sortedProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No properties found matching your criteria.
            </p>
          </div>
        )}
      </section>

      {/* Modals */}
      <BuyTokenModal
        property={selectedProperty}
        isOpen={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        onBuy={handleBuy}
      />

      <SellTokenModal
        token={selectedToken}
        isOpen={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
        onSell={handleSell}
      />
    </div>
  );
};
