import React, { useState } from 'react';
import { X, TrendingDown, AlertTriangle } from 'lucide-react';
import type { PropertyToken } from '@/types';
import { formatSatsToBTC, formatNumber } from '@/lib/utils';

interface SellTokenModalProps {
  token: PropertyToken | null;
  isOpen: boolean;
  onClose: () => void;
  onSell: (amount: number, totalPrice: number) => Promise<void>;
}

export const SellTokenModal: React.FC<SellTokenModalProps> = ({ 
  token, 
  isOpen, 
  onClose, 
  onSell 
}) => {
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !token) return null;

  const amountNum = parseFloat(amount) || 0;
  const currentPrice = token.pricePerToken; // In a real app, this would be current market price
  const totalPrice = amountNum * currentPrice;

  const handleSell = async () => {
    if (amountNum <= 0 || amountNum > token.balance) {
      alert('Invalid amount');
      return;
    }

    setIsLoading(true);
    try {
      await onSell(amountNum, totalPrice);
      onClose();
      setAmount('');
    } catch (error) {
      console.error('Sale failed:', error);
      alert('Sale failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Sell Property Tokens
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Token Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              {token.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Symbol: {token.symbol}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
              <p className="font-mono font-semibold text-gray-900 dark:text-white">
                {formatSatsToBTC(currentPrice)} BTC
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Balance</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(token.balance)} tokens
              </p>
            </div>
          </div>
        </div>

        {/* Sale Form */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount to Sell
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="1"
                max={token.balance}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                tokens
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Min: 1 token</span>
              <span>Max: {formatNumber(token.balance)} tokens</span>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Token Price</span>
                <span className="text-sm font-mono">{formatSatsToBTC(currentPrice)} BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                <span className="text-sm font-mono">{amountNum.toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-600">
                <span>You'll Receive</span>
                <span className="font-mono text-bitcoin-orange">
                  {formatSatsToBTC(totalPrice)} BTC
                </span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                  Important Notice
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                  Selling tokens will reduce your ownership percentage and future rental income. 
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSell}
              disabled={isLoading || amountNum <= 0 || amountNum > token.balance}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4" />
                  Sell Tokens
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
