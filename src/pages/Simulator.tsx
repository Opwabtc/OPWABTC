import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Info } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export const Simulator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('1000');
  const [period, setPeriod] = useState<string>('12');
  const [rate, setRate] = useState<string>('1.2');

  const initial = parseFloat(initialInvestment) || 0;
  const monthly = parseFloat(monthlyInvestment) || 0;
  const months = parseInt(period) || 12;
  const monthlyRate = parseFloat(rate) / 100;

  // Calculate compound interest with monthly contributions
  const calculateFutureValue = () => {
    let futureValue = initial * Math.pow(1 + monthlyRate, months);
    
    if (monthly > 0) {
      const contributionValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      futureValue += contributionValue;
    }
    
    return futureValue;
  };

  const futureValue = calculateFutureValue();
  const totalInvested = initial + (monthly * months);
  const totalReturns = futureValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 animate-fadeInUp">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Simulador de Investimentos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calcule o potencial de retorno dos seus investimentos imobiliários tokenizados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="card">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Parâmetros de Simulação
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investimento Inicial (R$)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
                    placeholder="10000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aporte Mensal (R$)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Período (meses)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
                  >
                    <option value="6">6 meses</option>
                    <option value="12">12 meses</option>
                    <option value="24">24 meses</option>
                    <option value="36">36 meses</option>
                    <option value="60">5 anos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rentabilidade Mensal (%)
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
                    placeholder="1.2"
                  />
                </div>
                <div className="mt-2 flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Rentabilidade média baseada em histórico de ativos imobiliários tokenizados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Main Result */}
          <div className="gradient-bitcoin rounded-2xl p-8 text-white text-center">
            <h3 className="text-lg font-medium mb-2 opacity-90">
              Valor na carteira após {months} meses
            </h3>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              R$ {formatNumber(futureValue)}
            </div>
            <div className="text-lg opacity-90">
              Total investido: R$ {formatNumber(totalInvested)}
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Detalhamento do Retorno
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Investimento Inicial</span>
                  <span className="font-mono font-semibold">R$ {formatNumber(initial)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Aportes Mensais</span>
                  <span className="font-mono font-semibold">R$ {formatNumber(monthly * months)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Investido</span>
                  <span className="font-mono font-semibold">R$ {formatNumber(totalInvested)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Ganhos</span>
                  <span className="font-mono font-semibold text-green-600 dark:text-green-400">
                    R$ {formatNumber(totalReturns)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-900 dark:text-white font-semibold">Retorno Percentual</span>
                  <span className="font-mono font-bold text-bitcoin-orange">
                    {returnPercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Comparação com Poupança
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Seu investimento</span>
                  <span className="font-mono font-semibold text-bitcoin-orange">
                    R$ {formatNumber(futureValue)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Poupança (0.5% ao ano)</span>
                  <span className="font-mono text-gray-500">
                    R$ {formatNumber(totalInvested * 1.0025)}
                  </span>
                </div>
                
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white font-semibold">Diferença</span>
                    <span className="font-mono font-bold text-green-600 dark:text-green-400">
                      R$ {formatNumber(futureValue - (totalInvested * 1.0025))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12">
        <div className="card text-center">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Pronto para começar a investir?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Abra sua conta e comece a aplicar esses retornos em nossos ativos imobiliários tokenizados
            </p>
            <button className="btn-primary text-lg px-8 py-3">
              Abrir Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
