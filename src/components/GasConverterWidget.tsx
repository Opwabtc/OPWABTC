import React, { useState, useEffect } from 'react';
import { Zap, Bitcoin, DollarSign } from 'lucide-react';

interface GasConverterWidgetProps {
  gasPrice: number | null;
  btcPrice: number | null;
}

export const GasConverterWidget: React.FC<GasConverterWidgetProps> = ({ gasPrice, btcPrice }) => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update widget values when prices change
    if (gasPrice && btcPrice) {
      const txBytes = 250;
      const txBtc = (gasPrice * txBytes) / 1e8;
      const txUsd = (txBtc * btcPrice).toFixed(4);
      
      // Update DOM elements directly since we're using CSS classes
      const gasElement = document.getElementById('gcwGas');
      const btcElement = document.getElementById('gcwBtc');
      const txElement = document.getElementById('gcwTx');
      
      if (gasElement) gasElement.textContent = `${gasPrice} sat/vB`;
      if (btcElement) btcElement.textContent = `$${btcPrice.toLocaleString('en-US')}`;
      if (txElement) txElement.textContent = `~$${txUsd}`;
    } else {
      // Set default values when data is not available
      const gasElement = document.getElementById('gcwGas');
      const btcElement = document.getElementById('gcwBtc');
      const txElement = document.getElementById('gcwTx');
      
      if (gasElement) gasElement.textContent = '—';
      if (btcElement) btcElement.textContent = '—';
      if (txElement) txElement.textContent = '—';
    }
  }, [gasPrice, btcPrice]);

  const handleConvert = () => {
    const value = parseFloat(inputValue);
    if (!value || isNaN(value)) {
      setResult('Enter a valid value');
      return;
    }
    if (!btcPrice) {
      setResult('Price unavailable');
      return;
    }
    const usd = (value * btcPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    setResult(usd);
  };

  const handleRefreshGas = async () => {
    setLoading(true);
    try {
      // Refresh gas price from OP_NET mempool
      const response = await fetch('https://mempool.opnet.org/api/v1/fees/recommended');
      if (response.ok) {
        const data = await response.json();
        const standardFee = data?.halfHourFee || data?.hourFee || data?.economyFee || 10;
        
        // Update the gas price display immediately
        const gasElement = document.getElementById('gcwGas');
        if (gasElement) gasElement.textContent = `${standardFee} sat/vB`;
        
        // Update transaction cost if BTC price is available
        if (btcPrice) {
          const txBytes = 250;
          const txBtc = (standardFee * txBytes) / 1e8;
          const txUsd = (txBtc * btcPrice).toFixed(4);
          const txElement = document.getElementById('gcwTx');
          if (txElement) txElement.textContent = `~$${txUsd}`;
        }
      }
    } catch (error) {
      console.error('Failed to refresh gas price:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gas-converter-widget" id="gasWidget">
      <div className="gcw-header">
        <span className="gcw-title">Gas Converter</span>
        <div className="gcw-live">
          <div className="dot"></div>Live
          <button 
            className="gcw-refresh-btn" 
            onClick={handleRefreshGas}
            disabled={loading}
            title="Refresh gas price from mempool"
          >
            {loading ? '...' : '↻'}
          </button>
        </div>
      </div>
      <div className="gcw-rows">
        <div className="gcw-row">
          <div className="gcw-row-label">
            <div className="gcw-row-icon gas">
              <Zap size={10} />
            </div>
            Gas (sat/vB)
          </div>
          <span className="gcw-row-val" id="gcwGas">—</span>
        </div>
        <div className="gcw-row">
          <div className="gcw-row-label">
            <div className="gcw-row-icon btc">
              <Bitcoin size={10} />
            </div>
            BTC / USD
          </div>
          <span className="gcw-row-val accent" id="gcwBtc">—</span>
        </div>
        <div className="gcw-row">
          <div className="gcw-row-label">
            <div className="gcw-row-icon usd">
              <DollarSign size={10} />
            </div>
            Typical Tx (USD)
          </div>
          <span className="gcw-row-val gold" id="gcwTx">—</span>
        </div>
      </div>
      <div className="gcw-divider"></div>
      <div style={{ fontSize: '10px', color: 'var(--text-3)', marginBottom: '6px' }}>
        Convert BTC value → USD
      </div>
      <div className="gcw-input-row">
        <input
          className="gcw-input"
          id="gcwInput"
          type="number"
          placeholder="0.001 BTC"
          step="0.0001"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="gcw-convert-btn" onClick={handleConvert}>
          → USD
        </button>
      </div>
      <div className="gcw-result" id="gcwResult">{result}</div>
    </div>
  );
};
