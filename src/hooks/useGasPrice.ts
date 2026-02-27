import { useState, useEffect } from 'react';

export const useGasPrice = () => {
  const [gasPrice, setGasPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch real-time gas data from OP_NET mempool
        const response = await fetch('https://mempool.opnet.org/api/v1/fees/recommended');
        
        if (!response.ok) {
          throw new Error('Failed to fetch gas price');
        }
        
        const data = await response.json();
        
        // Use the half hour fee rate (standard priority)
        const standardFee = data?.halfHourFee || data?.hourFee || data?.economyFee || 10;
        
        setGasPrice(standardFee);
      } catch (err) {
        console.error('Error fetching gas price:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch gas price');
        // Fallback to default value
        setGasPrice(10);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchGasPrice();

    // Update every 30 seconds
    const interval = setInterval(fetchGasPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  const getTxUsd = () => {
    if (!gasPrice) return null;
    
    const txBytes = 250;
    const txBtc = (gasPrice * txBytes) / 1e8;
    return (txBtc * 1).toFixed(4);
  };

  return { 
    gasPrice, 
    loading, 
    error,
    txUsd: getTxUsd(),
    refetch: () => {
      const fetchGasPrice = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await fetch('https://mempool.opnet.org/api/v1/fees/recommended');
          
          if (!response.ok) {
            throw new Error('Failed to fetch gas price');
          }
          
          const data = await response.json();
          const standardFee = data?.halfHourFee || data?.hourFee || data?.economyFee || 10;
          
          setGasPrice(standardFee);
        } catch (err) {
          console.error('Error fetching gas price:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch gas price');
          setGasPrice(10);
        } finally {
          setLoading(false);
        }
      };
      
      fetchGasPrice();
    }
  };
};
