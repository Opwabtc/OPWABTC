import React, { useEffect } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { PortfolioChart, PortfolioStats } from '@/components/PortfolioChart';
import { useAppStore } from '@/store/useAppStore';
import { useWallet } from '@/hooks/useWallet';
import { generateMockProperties, generateMockPortfolio, generateMockPriceHistory } from '@/lib/utils';
import type { Property } from '@/types';

export const Dashboard: React.FC = () => {
  const { 
    properties, 
    setProperties, 
    portfolio, 
    setPortfolio, 
    isLoading 
  } = useAppStore();
  
  const { wallet } = useWallet();

  useEffect(() => {
    // Load mock properties
    const mockProperties = generateMockProperties();
    setProperties(mockProperties);
    
    // Load mock portfolio if wallet is connected
    if (wallet.isConnected) {
      const mockPortfolio = generateMockPortfolio();
      setPortfolio(mockPortfolio);
    }
  }, [wallet.isConnected, setProperties, setPortfolio]);

  const handleBuyClick = (property: Property) => {
    // TODO: Open buy modal
    console.log('Buy clicked for property:', property.name);
  };

  const handleDetailsClick = (property: Property) => {
    // TODO: Navigate to property details
    console.log('Details clicked for property:', property.name);
  };

  const priceHistory = generateMockPriceHistory(30, 50000);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Hero Section */}
      <section className="mb-12 animate-fadeInUp">
        <div className="gradient-bitcoin rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Os melhores investimentos imobiliários para você
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Diversifique sua carteira com ativos imobiliários tokenizados que rendem mais que a poupança.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-lg px-8 py-4">
                Conhecer Ativos
              </button>
              <button className="btn-ghost text-lg px-8 py-4 text-white hover:bg-white/20">
                Simulador
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="w-full h-full bg-gradient-to-l from-transparent to-white/20"></div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card card-hover text-center">
            <div className="p-8">
              <h3 className="text-3xl font-bold text-bitcoin-orange mb-2">
                15%+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Retorno anual médio
              </p>
            </div>
          </div>
          <div className="card card-hover text-center">
            <div className="p-8">
              <h3 className="text-3xl font-bold text-bitcoin-orange mb-2">
                R$ 2M+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Volume de investimentos
              </p>
            </div>
          </div>
          <div className="card card-hover text-center">
            <div className="p-8">
              <h3 className="text-3xl font-bold text-bitcoin-orange mb-2">
                500+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Investidores ativos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {wallet.isConnected && portfolio && (
        <section className="mb-12 animate-fadeInUp">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sua Carteira
            </h2>
            <button className="btn-ghost">
              Ver Detalhes
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Resumo da Carteira
                </h3>
                <PortfolioStats
                  totalValueBTC={portfolio.totalValueBTC}
                  totalValueUSD={portfolio.totalValueUSD}
                  performance={portfolio.performance}
                />
              </div>
            </div>
            
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Desempenho
                </h3>
                <PortfolioChart data={priceHistory} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Properties Section */}
      <section className="animate-fadeInUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ativos Disponíveis
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar ativos..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange">
              <option value="all">Todos os tipos</option>
              <option value="residential">Residencial</option>
              <option value="commercial">Comercial</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onBuyClick={handleBuyClick}
              onDetailsClick={handleDetailsClick}
            />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum ativo disponível no momento.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      {!wallet.isConnected && (
        <section className="mt-16 animate-fadeInUp">
          <div className="card text-center">
            <div className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Pronto para começar a investir?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Abra sua conta e comece a investir em imóveis tokenizados com Bitcoin
              </p>
              <button className="btn-primary text-lg px-8 py-4">
                Criar Conta
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
