import { createContext, useContext, useState } from 'react';

const AnimationContext = createContext({
  isSearchExpanded: false,
  setIsSearchExpanded: () => {},
  isSearchAnimating: false,
  setIsSearchAnimating: () => {},
  searchBarDimensions: { width: 0, height: 0, x: 0, y: 0 },
  setSearchBarDimensions: () => {},
});

export const AnimationProvider = ({ children }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSearchAnimating, setIsSearchAnimating] = useState(false);
  const [searchBarDimensions, setSearchBarDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 });

  return (
    <AnimationContext.Provider
      value={{
        isSearchExpanded,
        setIsSearchExpanded,
        isSearchAnimating,
        setIsSearchAnimating,
        searchBarDimensions,
        setSearchBarDimensions,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => useContext(AnimationContext);

export default AnimationContext; 