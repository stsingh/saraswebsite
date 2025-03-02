import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import './App.css';

function App() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchExpanded(true);
      setIsSearchActive(true);
    }
  };

  const handleLogoClick = () => {
    setIsSearchActive(false);
    setIsSearchExpanded(false);
    setSearchQuery('');
    setActiveTab('products');
  };

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

  return (
    <div className={`app ${isSearchExpanded ? 'search-expanded' : ''}`}>
      {isSearchActive ? (
        <ProductPage 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          features={features}
          products={products}
          brands={brands}
          onLogoClick={handleLogoClick}
        />
      ) : (
        <HomePage 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onLogoClick={handleLogoClick}
        />
      )}
    </div>
  );
}

export default App;
