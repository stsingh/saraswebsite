import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ searchQuery, setSearchQuery, onSearch, expanded }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(e);
    }
  };

  const handleIconClick = () => {
    if (searchQuery.trim()) {
      onSearch({ preventDefault: () => {} });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-section">
      <input 
        type="text" 
        placeholder="Type for New Product Or Add New Needs..." 
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FaSearch className="search-icon" onClick={handleIconClick} aria-label="Search" />
    </form>
  );
}

export default SearchBar; 