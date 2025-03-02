import React from 'react';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import Recommendations from '../components/Recommendations';
import SideText from '../components/SideText';
import CartIcon from '../components/CartIcon';

function HomePage({ onSearch, searchQuery, setSearchQuery, onLogoClick }) {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Logo onClick={onLogoClick} />
        <div className="search-container">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={onSearch}
          />
        </div>
        {/* <Recommendations /> */}
      </div>
      <SideText />
      {/* <CartIcon /> */}
    </>
  );
}

export default HomePage; 