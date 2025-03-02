import React from 'react';

function SearchResults({ activeTab, setActiveTab, features, products, brands }) {
  return (
    <div className="search-results-content">
      <div className="header-tabs">
        <button 
          className={activeTab === 'products' ? 'active' : ''} 
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={activeTab === 'brands' ? 'active' : ''} 
          onClick={() => setActiveTab('brands')}
        >
          Brands
        </button>
      </div>

      <div className="results-container">
        <aside className="features-sidebar">
          <h2>Your Features</h2>
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </aside>

        <main className="search-results">
          {activeTab === 'products' ? (
            <div className="results-grid">
              {products.map((product) => (
                <div key={product.id} className="result-card">
                  <div className="result-image">
                    <div className="placeholder-image"></div>
                    <div className="features-overlay">
                      {product.features.map((feature, i) => (
                        <p key={i}>- {feature}</p>
                      ))}
                    </div>
                  </div>
                  <p className="result-title">{product.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="brands-container">
              <h2>Brands</h2>
              <div className="brands-grid">
                {brands.map((brand) => (
                  <div key={brand.id} className="brand-card">
                    <div className="brand-image">
                      <div className="placeholder-image"></div>
                    </div>
                    <p className="brand-name">{brand.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SearchResults; 