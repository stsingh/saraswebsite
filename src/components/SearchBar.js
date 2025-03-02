import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useAnimation as useAnimationContext } from '../context/AnimationContext';
import { pulseSearchBar, expandSearchBar } from '../utils/animations';

function SearchBar({ searchQuery, setSearchQuery, onSearch, expanded, placeholder, isTransitioning }) {
  const router = useRouter();
  const searchBarRef = useRef(null);
  const searchInputRef = useRef(null);
  const controls = useAnimation();
  const [results, setResults] = useState(null);
  const { 
    setSearchBarDimensions, 
    isSearchExpanded,
    isSearchAnimating, 
    setIsSearchAnimating 
  } = useAnimationContext();
  
  const isProductPage = router.pathname === '/ProductPage';

  useEffect(() => {
    if (searchBarRef.current) {
      const rect = searchBarRef.current.getBoundingClientRect();
      setSearchBarDimensions({
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
      });
    }
  }, [router.pathname, setSearchBarDimensions]);

  useEffect(() => {
    // Initial animation when transitioning between pages
    if (isProductPage && searchInputRef.current) {
      expandSearchBar(searchInputRef.current, 'auto');
      
      controls.start({
        width: '100%',
        height: 'auto',
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        }
      });
    }
  }, [controls, isProductPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchAnimating(true);
      try {
        const response = await fetch('http://localhost:5001/api/products/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ query: searchQuery }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
  
        const data = await response.json();

        onSearch(data);

      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
      // Animate with GSAP
      if (searchInputRef.current) {
        pulseSearchBar(searchInputRef.current).then(() => {
          setTimeout(() => {
            setIsSearchAnimating(false);
          }, 500);
        });
      } else {
        setTimeout(() => {
          setIsSearchAnimating(false);
        }, 500);
      }
    }
  };

  const handleIconClick = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchAnimating(true);
      
      try {
        const response = await fetch('http://localhost:5001/api/products/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ query: searchQuery }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
  
        const data = await response.json();
        onSearch(data);

      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }

      // Animate with GSAP
      if (searchInputRef.current) {
        pulseSearchBar(searchInputRef.current).then(() => {
          setTimeout(() => {
            setIsSearchAnimating(false);
          }, 500);
        });
      } else {
        setTimeout(() => {
          setIsSearchAnimating(false);
        }, 500);
      }
    }
  };

  const searchBarVariants = {
    initial: {
      width: '100%',
      height: 'auto',
    },
    expanded: {
      width: '100%',
      height: isProductPage ? 'auto' : 'auto',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      }
    },
    transitioning: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      }
    }
  };

  return (
    <motion.form 
      ref={searchBarRef}
      onSubmit={handleSubmit} 
      className={`relative w-full max-w-4xl mx-auto ${isProductPage ? 'mb-0' : 'mb-20'} z-10`}
      initial="initial"
      animate={isTransitioning ? "transitioning" : isProductPage ? "expanded" : "initial"}
      variants={searchBarVariants}
      layout
    >
      <motion.div 
        className="relative w-full"
        animate={controls}
        ref={searchInputRef}
      >
        <input 
          type="text" 
          placeholder={placeholder || "Type for New Product Or Add New Needs..."} 
          className={`w-full py-6 px-8 text-2xl border-none rounded-xl bg-gray-800 text-gray-400 shadow-md transition-all duration-300 focus:outline-none focus:bg-gray-900 focus:text-white pr-12 ${
            isProductPage ? 'rounded-b-none' : ''
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch 
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer text-2xl" 
          onClick={handleIconClick} 
          aria-label="Search" 
        />
      </motion.div>
    </motion.form>
  );
}

export default SearchBar; 