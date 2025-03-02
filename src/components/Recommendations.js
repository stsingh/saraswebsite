import React from 'react';

function Recommendations() {
  return (
    <div className="recommendations-section">
      <div className="recommendations-header">
        <h2>Recommendations</h2>
      </div>
      
      <div className="product-grid">
        {[1, 2, 3].map((item) => (
          <div key={item} className="product-card">
            <div className="product-image">
              <div className="placeholder-image"></div>
            </div>
            <p className="product-title">Men's Tangerine Fleece</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations; 