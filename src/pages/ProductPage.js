import React from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import SearchBar from '../components/SearchBar';

function ProductPage({ products = [] }) {
  const router = useRouter();
  const { query } = router;

  const handleSearch = (e) => {
    e.preventDefault();
    // Maintain existing search functionality
    router.push({
      pathname: '/products',
      query: { search: query.search }
    });
  };

  return (
    <div className="product-page">
      <div className="product-page-header">
        <div className="logo minimized">REVSHOP</div>
        <div className="product-filters">
          <button className="filter-button">Products</button>
          <button className="filter-button active">Brands</button>
        </div>
      </div>

      <SearchBar 
        searchQuery={query.search || ''}
        setSearchQuery={(value) => {
          router.replace({
            pathname: router.pathname,
            query: { ...router.query, search: value }
          }, undefined, { shallow: true });
        }}
        onSearch={handleSearch}
        expanded={true}
      />

      <div className="product-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="product-card">
            <div className="placeholder-image"></div>
            <div className="product-info">
              <h3 className="product-title">Men's Tangerine Fleece</h3>
              <div className="product-features">
                <span>- Inexpensive</span>
                <span>- Loose Fitting</span>
                <span>- Brown</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage; 