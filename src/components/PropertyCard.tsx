import React from 'react';
import { MapPin, Home, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import type { Property } from '@/types';
import { formatSatsToBTC, formatNumber, formatDate } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  onBuyClick?: (property: Property) => void;
  onDetailsClick?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onBuyClick, 
  onDetailsClick 
}) => {
  const availablePercentage = ((property.availableTokens / property.totalSupply) * 100).toFixed(1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800';
          }}
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            property.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : property.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
            {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
          </span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {property.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-1" />
            {property.city}, {property.country}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm">
            <Home className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {property.squareMeters}m²
              {property.bedrooms && ` • ${property.bedrooms} bed`}
              {property.bathrooms && ` • ${property.bathrooms} bath`}
            </span>
          </div>
          
          {property.apy && (
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                {property.apy}% APY
              </span>
            </div>
          )}
        </div>

        {/* Token Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Token Price</span>
            <span className="font-mono font-medium">
              {formatSatsToBTC(property.pricePerToken)} BTC
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
            <span className="text-sm">
              {formatNumber(property.availableTokens)} / {formatNumber(property.totalSupply)} 
              <span className="text-gray-500 ml-1">({availablePercentage}%)</span>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
            <span className="font-mono font-medium">
              {formatSatsToBTC(property.totalValue)} BTC
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Funding Progress</span>
            <span>{availablePercentage}% Available</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${100 - parseFloat(availablePercentage)}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onBuyClick?.(property)}
            disabled={property.availableTokens === 0}
            className="flex-1 bg-bitcoin-orange hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Buy Tokens
          </button>
          
          <button
            onClick={() => onDetailsClick?.(property)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            View Details
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Listed {formatDate(property.createdAt)}
            </div>
            {property.monthlyRent && (
              <div>
                Monthly Rent: {formatSatsToBTC(property.monthlyRent)} BTC
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
