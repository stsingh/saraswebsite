import React, { useEffect, useRe, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import { useAnimation } from '../context/AnimationContext';
import { fadeInProducts, searchToProductTransition } from '../utils/animations';

function ProductPage({ 
  searchQuery,
  setSearchQuery,
  onSearch,
  activeTab,
  setActiveTab,
  features,
  products = [],
  brands = [],
  onLogoClick,
  expanded,
  isTransitioning
}) {
  const router = useRouter();
  const { query } = router;
  const { isSearchAnimating } = useAnimation();

  const [apiResults, setApiResults] = useState(null);

  // Use the passed searchQuery or get it from the URL
  const currentSearchQuery = searchQuery !== undefined ? searchQuery : (query.search || '');

  // Use the provided onSearch function or fallback to local implementation
  const handleSearch = (data) => {
    if (onSearch) {
      setApiResults(data);
    } else {
      // Maintain existing search functionality
      router.push({
        pathname: '/ProductPage',
        query: { search: currentSearchQuery }
      });
    }
  };

  // Use the provided setSearchQuery or update the URL directly
  const handleSearchChange = (value) => {
    if (setSearchQuery) {
      setSearchQuery(value);
    } else {
      const newQuery = {...router.query};
      if (value === '') {
        // Explicitly delete the search param when empty
        delete newQuery.search;
      } else {
        newQuery.search = value;
      }
      
      router.replace({
        pathname: router.pathname,
        query: newQuery
      }, undefined, { shallow: true });
    }
  };

  // Split products into rows for staggered animation
  const firstRowProducts = products.slice(0, 3);
  const secondRowProducts = products.slice(3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const productVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut" 
      }
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="p-5 bg-gray-50"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="flex justify-between items-center mb-5">
        <div 
          className="text-4xl font-bold tracking-wide cursor-pointer" 
          onClick={onLogoClick}
        >
          SARAS
        </div>
        <div className="flex gap-5">
          <button 
            className={`px-5 py-2.5 ${activeTab === 'products' ? 'bg-gray-900' : 'bg-gray-800'} text-white border-none rounded-lg cursor-pointer`}
            onClick={() => setActiveTab && setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`px-5 py-2.5 ${activeTab === 'brands' ? 'bg-gray-900' : 'bg-gray-800'} text-white border-none rounded-lg cursor-pointer`}
            onClick={() => setActiveTab && setActiveTab('brands')}
          >
            Brands
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col">
        <div className="search-products-container relative">
          <SearchBar 
            searchQuery={currentSearchQuery}
            setSearchQuery={handleSearchChange}
            onSearch={handleSearch}
            expanded={true}
            isTransitioning={isTransitioning}
          />
          {apiResults && (
          <div className="results-container">
            <h2>Results for: {apiResults.query}</h2>
            <p className="results-meta">
              Found {apiResults.metadata.total_matches} matches across {apiResults.metadata.filtered_products} products
            </p>
            
            <div className="products-grid">
              {apiResults.products.map((product, index) => (
                <div key={index} className="product-card">
                  <h3>{product.name}</h3>
                  <img 
                    src={(() => {
                      const urlObj = new URL(product.url);
                      const skuId = urlObj.searchParams.get("skuId");
                      return skuId ? `https://sephora.com/productimages/sku/s${skuId}-main-zoom.jpg?imwidth=315` : product.url; 
                    })()}
                    alt={product.name} 
                    className="product-image" 
                  />
                  <div className="product-stats">
                    <span>Confidence: {product.confidence_score}</span>
                    <span>Reviews: {product.review_count}</span>
                  </div>
                  <a href={product.url} target="_blank" rel="noopener noreferrer" className="product-link">
                    View Product
                  </a>
                  <div className="reviews-section">
                    <h4>Sample Reviews:</h4>
                    {product.sample_reviews.map((review, reviewIndex) => (
                      <div key={reviewIndex} className="review-card">
                        <p>{review.text}</p>
                        <span className="review-score">
                          Match Score: {review.similarity_score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          
        </div>
      </div>
    </motion.div>
  );
}

export default ProductPage; 