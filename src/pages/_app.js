import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { AnimationProvider } from '../context/AnimationContext';
import { searchToProductTransition } from '../utils/animations';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const searchBarRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSearch = (e) => {
    if (searchQuery.trim()) {
      setIsSearchExpanded(true);
      setIsSearchActive(true);
      setIsTransitioning(true);
      
      // Create a more continuous transition where the search bar grows
      // instead of disappearing and reappearing
      const searchBarElement = document.querySelector('.search-products-container form input');
      const recommendationsElement = document.querySelector('.recommendations-section');
      
      // Fade out recommendations if they exist
      if (recommendationsElement) {
        recommendationsElement.style.transition = 'opacity 0.3s ease';
        recommendationsElement.style.opacity = '0';
      }
      
      // Delay the navigation to allow for the search bar expansion animation
      setTimeout(() => {
        router.push({
          pathname: '/ProductPage',
          query: { search: searchQuery }
        });
      }, 500); // Increased delay to allow for the animation
    }
  };

  const handleLogoClick = () => {
    setIsSearchActive(false);
    setIsSearchExpanded(false);
    setSearchQuery('');
    setActiveTab('products');
    router.push('/');
  };

  // Sample data from App.js
  const features = [
    '- Inexpensive',
    '- Wool',
    '- Loose Fitting'
  ];

  const products = [
    {
      id: 1,
      title: "Men's Tangerine Fleece",
      features: ['Inexpensive', 'Loose Fitting', 'Wool']
    },
    {
      id: 2,
      title: "Men's Striped Sweater",
      features: ['Wool', 'Loose Fitting']
    },
    {
      id: 3,
      title: "Men's Cable Knit",
      features: ['Premium', 'Loose Fitting', 'Cream']
    },
    {
      id: 4,
      title: "Men's Textured Sweater",
      features: ['Casual', 'Loose Fitting', 'Rose']
    },
    {
      id: 5,
      title: "Men's Graphic Sweater",
      features: ['Inexpensive', 'Regular Fit', 'Black']
    },
    {
      id: 6,
      title: "Men's V-Neck Sweater",
      features: ['Classic', 'Slim Fit', 'Orange']
    }
  ];

  const brands = [
    { id: 1, name: 'SEPHORA' },
    { id: 2, name: 'CeraVe' },
    { id: 3, name: 'ULTA BEAUTY' },
    { id: 4, name: 'The Ordinary' },
    { id: 5, name: 'LA ROCHE-POSAY' }
  ];

  // Reset transition state when route changes
  useEffect(() => {
    setIsTransitioning(false);
  }, [router.pathname]);

  const enhancedPageProps = {
    ...pageProps,
    searchQuery,
    setSearchQuery,
    onSearch: handleSearch,
    activeTab,
    setActiveTab,
    features,
    products,
    brands,
    onLogoClick: handleLogoClick,
    isSearchActive,
    isSearchExpanded,
    searchBarRef,
    isTransitioning,
  };

  const isProductPage = router.pathname === '/ProductPage';
  const appClasses = `min-h-screen relative transition-all duration-300 ${isSearchExpanded ? 'bg-gray-50' : 'bg-white'}`;
  const containerClasses = `mx-auto transition-all duration-300 ${isProductPage ? 'max-w-6xl p-5' : isSearchExpanded ? 'max-w-none p-0' : 'max-w-7xl p-5'}`;

  return (
    <AnimationProvider>
      <div className={appClasses}>
        <div className={containerClasses}>
          <Navbar />
          <AnimatePresence mode="wait">
            <Component {...enhancedPageProps} key={router.pathname} />
          </AnimatePresence>
        </div>
      </div>
    </AnimationProvider>
  );
} 