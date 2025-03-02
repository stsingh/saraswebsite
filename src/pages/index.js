import React, { useEffect, useState } from 'react';
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
      // If data contains products, update apiResults
      if (data && data.products) {
        setApiResults(data);
      } else if (typeof data === 'object' && !data.preventDefault) {
        // Handle non-event objects that might be API responses
        setApiResults(data);
      }
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
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, search: value }
      }, undefined, { shallow: true });
    }
  };

  // Format API product to match the structure expected by the UI
  const formatApiProduct = (product, index) => {
    return {
      id: index,
      title: product.name,
      image: (() => {
        try {
          const urlObj = new URL(product.url);
          const skuId = urlObj.searchParams.get("skuId");
          return skuId ? `https://sephora.com/productimages/sku/s${skuId}-main-zoom.jpg?imwidth=315` : null;
        } catch (e) {
          return null;
        }
      })(),
      url: product.url,
      features: product.features || [],
      confidence_score: product.confidence_score,
      review_count: product.review_count,
      sample_reviews: product.sample_reviews || []
    };
  };

  // Determine which products to display
  const displayProducts = apiResults && apiResults.products 
    ? apiResults.products.map(formatApiProduct) 
    : products;

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
      className="flex flex-col items-center text-center p-5 max-w-7xl mx-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <motion.div 
        className="mb-16 mx-auto text-center max-w-4xl"
      >
        <h1 className="text-8xl font-bold tracking-wider mb-3">SARAS</h1>
        <p className="text-xl text-gray-600 italic mt-4">Find the Best Skincare in Seconds — Backed by Real Reviews, Not Hype.</p>
      </motion.div>

      <div className="w-full flex flex-col mb-12">
        <div className="search-products-container relative mb-8">
          <SearchBar 
            searchQuery={currentSearchQuery}
            setSearchQuery={handleSearchChange}
            onSearch={handleSearch}
            expanded={true}
            isTransitioning={isTransitioning}
            placeholder="Type for New Products..."
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Features Sidebar */}
          {/* <motion.aside 
            className="w-full md:w-64 bg-gray-100 p-6 rounded-lg h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Your Features</h2>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </motion.aside> */}

          {/* Products Grid Container */}
          <motion.div 
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {apiResults ? (
              <div className="mb-4">
                <h2 className="text-xl font-medium mb-2">Results for: {apiResults.query}</h2>
                {apiResults.metadata && (
                  <p className="text-sm text-gray-600 mb-4">
                    Found {apiResults.metadata.total_matches} matches across {apiResults.metadata.filtered_products} products
                  </p>
                )}
              </div>
            ) : null}

            {/* Main Products Grid - Three products per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 results-container">
              {displayProducts.map((product, index) => (
                <motion.div 
                  key={product.id || index} 
                  className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col product-card relative"
                  variants={productVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute top-2 left-2 z-10 bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="aspect-square bg-gray-200 relative">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/300?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{product.title}</h3>
                    
                    {/* Product Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="mt-1 mb-3">
                        {product.features.map((feature, idx) => (
                          <p key={idx} className="text-sm text-gray-600">- {feature}</p>
                        ))}
                      </div>
                    )}
                    
                    {/* Product Stats */}
                    {product.confidence_score !== undefined && (
                      <div className="text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Confidence:</span>
                          <span>{(product.confidence_score * 100).toFixed(0)}%</span>
                        </div>
                        {product.review_count !== undefined && (
                          <div className="flex items-center mt-1">
                            <span className="font-medium mr-2">Reviews:</span>
                            <span>{product.review_count}</span>
                          </div>
                        )}
                        <div className="flex items-baseline mt-1 text-left justify-start w-full">
                          <span className="font-medium mr-2">Review:</span>
                          <span className="flex-1">
                            {product.sample_reviews[0].text.length > 100 
                              ? product.sample_reviews[0].text.slice(0, ) + '...'
                              : product.sample_reviews[0].text}
                          </span>
                        </div>
                      </div>
                      
                    )}

                    {/* Product Link */}
                    {product.url && (
                      <a 
                        href={product.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-auto block w-full px-4 py-2 bg-gray-900 text-white text-center rounded-md hover:bg-gray-800 transition-colors"
                      >
                        View Product
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductPage; 