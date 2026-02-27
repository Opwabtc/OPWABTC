import React, { useState } from 'react';
import { X, Bitcoin, TrendingUp } from 'lucide-react';
import type { Property } from '@/types';
import { formatSatsToBTC, formatNumber } from '@/lib/utils';

interface BuyTokenModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (amount: number, totalPrice: number) => Promise<void>;
}

export const BuyTokenModal: React.FC<BuyTokenModalProps> = ({ 
  property, 
  isOpen, 
  onClose, 
  onBuy 
}) => {
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !property) return null;

  const amountNum = parseFloat(amount) || 0;
  const totalPrice = amountNum * property.pricePerToken;

  const handleBuy = async () => {
    if (amountNum <= 0 || amountNum > property.availableTokens) {
      alert('Invalid amount');
      return;
    }

    setIsLoading(true);
    try {
      await onBuy(amountNum, totalPrice);
      onClose();
      setAmount('');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
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
            Buy Property Tokens
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Property Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {property.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {property.city}, {property.country}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Token Price</p>
              <p className="font-mono font-semibold text-gray-900 dark:text-white">
                {formatSatsToBTC(property.pricePerToken)} BTC
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(property.availableTokens)} tokens
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount of Tokens
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="1"
                max={property.availableTokens}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-bitcoin-orange focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                tokens
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Min: 1 token</span>
              <span>Max: {formatNumber(property.availableTokens)} tokens</span>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Token Price</span>
                <span className="text-sm font-mono">{formatSatsToBTC(property.pricePerToken)} BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                <span className="text-sm font-mono">{amountNum.toLocaleString()} tokens</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-600">
                <span>Total Cost</span>
                <span className="font-mono text-bitcoin-orange">
                  {formatSatsToBTC(totalPrice)} BTC
                </span>
              </div>
            </div>
          </div>

          {/* Investment Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Investment Information
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  You will receive {amountNum.toLocaleString()} tokens representing fractional ownership 
                  of this property. Expected APY: {property.apy}%.
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
              onClick={handleBuy}
              disabled={isLoading || amountNum <= 0 || amountNum > property.availableTokens}
              className="flex-1 bg-bitcoin-orange hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Bitcoin className="w-4 h-4" />
                  Buy Tokens
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
