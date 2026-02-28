import React from 'react';
import { Home as HomeIcon, Building2, TrendingUp, Calculator, ArrowRight } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useAppStore } from '@/store/useAppStore';
import { formatSatsToBTC } from '@/lib/utils';

export const Home: React.FC = () => {
  const { wallet, connect, disconnect } = useWallet();
  const { properties } = useAppStore();

  const handleConnect = async () => {
    if (wallet.isConnected) {
      await disconnect();
    } else {
      await connect();
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-eyebrow fade-in d1">
          <span className="dot" style={{background:"#10b981"}}></span>
          Real Estate Investment Platform
        </div>

        <h1 className="hero-title fade-in-up d2">
          Invest in Tokenized<br />
          <span>Real Estate with Bitcoin</span>
        </h1>

        <p className="hero-subtitle fade-in-up d3">
          Diversify your portfolio with real estate assets that outperform savings accounts. 
          Invest as little as 0.001 BTC in premium properties.
        </p>

        <div className="hero-cta-row fade-in-up d4">
          <button className="btn-primary-lg" onClick={handleConnect}>
            {wallet.isConnected ? 'View Portfolio' : 'Connect Wallet'}
            <ArrowRight width={16} height={16} />
          </button>
          <button className="btn-outline-lg" onClick={() => scrollToSection('simulator')}>
            View Simulator
            <Calculator width={16} height={16} />
          </button>
        </div>

        <div className="hero-stats fade-in d5">
          <div className="hero-stat">
            <span className="hero-stat-value text-accent">15%+</span>
            <span className="hero-stat-label">Annual Return</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-value">$2M+</span>
            <span className="hero-stat-label">Total Volume</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-value text-gold">500+</span>
            <span className="hero-stat-label">Investors</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-value">24/7</span>
            <span className="hero-stat-label">Support</span>
          </div>
        </div>
      </section>

      {/* Assets Section */}
      <section id="assets">
        <div className="ativos-header">
          <div>
            <div className="section-eyebrow">Catalog</div>
            <h2 className="section-title">Available Assets</h2>
            <p className="section-subtitle" style={{marginBottom: 0}}>
              Explore our selection of tokenized properties with high return potential.
            </p>
          </div>
          <button className="btn-link" onClick={() => scrollToSection('assets')}>
            View all
            <ArrowRight width={14} height={14} />
          </button>
        </div>

        <div className="filter-tabs">
          <button className="filter-tab active">All</button>
          <button className="filter-tab">Residential</button>
          <button className="filter-tab">Commercial</button>
          <button className="filter-tab">Mixed</button>
        </div>

        <div className="ativos-grid">
          {properties.map((property, index) => (
            <div key={property.id} className={`ativo-card fade-in-up d${index + 1}`}>
              <div className="ativo-img">
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={property.images[0]} 
                    alt={property.name}
                    className="ativo-img-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`ativo-img-placeholder ${property.images && property.images.length > 0 ? 'hidden' : ''}`}>
                  {property.propertyType === 'residential' ? <HomeIcon width={24} height={24} /> : <Building2 width={24} height={24} />}
                </div>
                <div className="ativo-img-overlay"></div>
                <div className="ativo-badges">
                  <span className={`badge badge-type-${property.propertyType === 'residential' ? 'a' : 'b'}`}>
                    {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                  </span>
                  <span className="badge badge-active">Active</span>
                </div>
              </div>
              <div className="ativo-body">
                <div className="ativo-id">{property.id.toUpperCase()}</div>
                <div className="ativo-name">{property.name}</div>
                <div className="ativo-desc">
                  {property.description}
                </div>
                <div className="ativo-location">
                  📍 {property.address}, {property.city}
                </div>
                <div className="ativo-stats">
                  <div className="ativo-stat">
                    <div className="ativo-stat-label">Price</div>
                    <div className="ativo-stat-value">{formatSatsToBTC(property.pricePerToken)}</div>
                  </div>
                  <div className="ativo-stat">
                    <div className="ativo-stat-label">APY</div>
                    <div className="ativo-stat-value positive">{property.apy}%</div>
                  </div>
                  <div className="ativo-stat">
                    <div className="ativo-stat-label">Tokens</div>
                    <div className="ativo-stat-value">{(property.availableTokens / 1000).toFixed(0)}K</div>
                  </div>
                </div>
                <div className="progress-wrap">
                  <div className="progress-label">
                    <span>Availability</span>
                    <span className="text-3">{(property.availableTokens / 1000).toFixed(0)}K / {(property.totalSupply / 1000).toFixed(0)}K tokens</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${(property.availableTokens / property.totalSupply) * 100}%`}}></div>
                  </div>
                </div>
                <button className="btn-card">Invest now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulator">
        <div className="simulador-inner">
          <div style={{marginBottom: '40px'}}>
            <div className="section-eyebrow">Tool</div>
            <h2 className="section-title">Simulator</h2>
            <p className="section-subtitle" style={{marginBottom: 0}}>Simulate returns and compare with other market options.</p>
          </div>
          <div className="simulador-grid">
            <div className="sim-panel">
              <div className="sim-field">
                <label>Initial Investment</label>
                <div className="sim-stepper">
                  <button className="sim-stepper-btn">−</button>
                  <span className="sim-stepper-value">$ —</span>
                  <button className="sim-stepper-btn">+</button>
                </div>
              </div>
              <div className="sim-field">
                <label>Monthly Investment</label>
                <div className="sim-stepper">
                  <button className="sim-stepper-btn">−</button>
                  <span className="sim-stepper-value">$ —</span>
                  <button className="sim-stepper-btn">+</button>
                </div>
              </div>
              <div className="sim-field">
                <label>Reinvestment Period</label>
                <input type="range" className="sim-slider" min="1" max="36" value="12" id="periodSlider" />
                <div className="sim-slider-labels"><span>1 mo</span><span>12 mo</span><span>36 mo</span></div>
              </div>
              <div className="sim-result">
                <div className="sim-result-label">Estimated value after period</div>
                <div className="sim-result-value">$ 0.00</div>
                <div className="sim-result-btc">≈ ₿ —</div>
              </div>
              <button className="btn-sim">View Full Comparison</button>
              <p style={{fontSize: '11px', color: 'var(--text-3)', textAlign: 'center', lineHeight: '1.6'}}> * Simulation is illustrative only. Does not constitute a guarantee of returns.</p>
            </div>
            <div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px'}}>
                <span style={{fontSize: '13px', fontWeight: '600', color: 'var(--text-2)'}}>Return Forecast</span>
                <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-2)'}}>
                    <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)'}}></div>Platform
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-2)'}}>
                    <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--info)'}}></div>Reference A
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-2)'}}>
                    <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-3)'}}></div>Reference B
                  </div>
                </div>
              </div>
              <div className="sim-compare">
                <div className="sim-compare-card highlighted">
                  <div>
                    <div className="sim-compare-name">Platform</div>
                    <div className="sim-compare-rate">—% per month</div>
                  </div>
                  <div className="sim-compare-val main">$ —</div>
                </div>
                <div className="sim-compare-card">
                  <div>
                    <div className="sim-compare-name">Reference A</div>
                    <div className="sim-compare-rate">—% per month</div>
                  </div>
                  <div className="sim-compare-val sec">$ —</div>
                </div>
                <div className="sim-compare-card">
                  <div>
                    <div className="sim-compare-name">Reference B</div>
                    <div className="sim-compare-rate">—% per month</div>
                  </div>
                  <div className="sim-compare-val sec">$ —</div>
                </div>
              </div>
              <p style={{fontSize: '11px', color: 'var(--text-3)', lineHeight: '1.6', marginTop: '16px'}}> * Simulation is illustrative only and does not constitute a guarantee by the platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="features-header">
          <div className="section-eyebrow">Features</div>
          <h2 className="section-title">Why Choose OPWA</h2>
          <p className="section-subtitle">
            Experience the future of real estate investment with blockchain technology.
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp width={24} height={24} />
            </div>
            <h3>High Returns</h3>
            <p>Earn up to 15% APY from premium real estate properties with monthly rental income.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Building2 width={24} height={24} />
            </div>
            <h3>Tokenized Assets</h3>
            <p>Invest in fractional ownership of premium properties without large capital requirements.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Calculator width={24} height={24} />
            </div>
            <h3>Smart Calculations</h3>
            <p>Advanced investment simulator with compound interest calculations and ROI projections.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to start <span>investing</span>?</h2>
          <p className="cta-subtitle">
            Join hundreds of investors who have already diversified their portfolios with tokenized real estate.
          </p>
          <div className="cta-btns">
            <button className="btn-primary-lg" onClick={handleConnect}>
              {wallet.isConnected ? 'View Portfolio' : 'Connect Wallet'}
              <ArrowRight width={16} height={16} />
            </button>
            <button className="btn-outline-lg" onClick={() => scrollToSection('assets')}>View assets</button>
          </div>
        </div>
      </div>
    </div>
  );
};
