import { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchExpanded(true);
      setIsSearchActive(true);
      router.push({
        pathname: '/products',
        query: { search: searchQuery }
      });
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
    isSearchExpanded
  };

  return (
    <div className={`app ${isSearchExpanded ? 'search-expanded' : ''}`}>
      <div className="app-container">
        <Navbar />
        <Component {...enhancedPageProps} />
      </div>
      <style jsx global>{`
        .app {
          min-height: 100vh;
          position: relative;
          transition: all 0.3s ease;
        }

        .app-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }

        .app.search-expanded {
          background-color: #f8f8f8;
        }

        .app.search-expanded .app-container {
          max-width: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
} 