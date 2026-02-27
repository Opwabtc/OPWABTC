import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import type { PriceHistory } from '@/types';
import { formatSatsToBTC, formatNumber } from '@/lib/utils';

interface PortfolioChartProps {
  data: PriceHistory[];
  title?: string;
  type?: 'line' | 'area';
  height?: number;
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ 
  data, 
  title = 'Portfolio Performance', 
  type = 'area',
  height = 300 
}) => {
  const ChartComponent = type === 'line' ? LineChart : AreaChart;
  const DataComponent = type === 'line' ? Line : Area;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => formatSatsToBTC(value)}
          />
          <Tooltip 
            formatter={(value) => [formatSatsToBTC(Number(value || 0)), 'Price (BTC)']}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              });
            }}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#f3f4f6'
            }}
          />
          <DataComponent
            type="monotone"
            dataKey="price"
            stroke="#f7931a"
            fill="#f7931a"
            fillOpacity={type === 'area' ? 0.3 : 1}
            strokeWidth={2}
            dot={false}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

interface PortfolioStatsProps {
  totalValueBTC: number;
  totalValueUSD: number;
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export const PortfolioStats: React.FC<PortfolioStatsProps> = ({ 
  totalValueBTC, 
  totalValueUSD, 
  performance 
}) => {
  const stats = [
    {
      label: 'Total Value',
      valueBTC: formatSatsToBTC(totalValueBTC),
      valueUSD: `$${formatNumber(totalValueUSD)}`,
      change: performance.daily,
      period: '24h'
    },
    {
      label: 'Weekly Change',
      valueBTC: formatSatsToBTC(totalValueBTC * (performance.weekly / 100)),
      valueUSD: `$${formatNumber(totalValueUSD * (performance.weekly / 100))}`,
      change: performance.weekly,
      period: '7d'
    },
    {
      label: 'Monthly Change',
      valueBTC: formatSatsToBTC(totalValueBTC * (performance.monthly / 100)),
      valueUSD: `$${formatNumber(totalValueUSD * (performance.monthly / 100))}`,
      change: performance.monthly,
      period: '30d'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.valueBTC} BTC
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({stat.valueUSD})
                </span>
              </div>
            </div>
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              stat.change >= 0 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {stat.period} performance
          </p>
        </div>
      ))}
    </div>
  );
};
