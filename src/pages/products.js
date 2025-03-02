import ProductPage from './ProductPage';

export default function Products({ 
  searchQuery,
  setSearchQuery,
  onSearch,
  activeTab,
  setActiveTab,
  features,
  products,
  brands,
  onLogoClick,
  isSearchExpanded
}) {
  return (
    <ProductPage 
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onSearch={onSearch}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      features={features}
      products={products}
      brands={brands}
      onLogoClick={onLogoClick}
      expanded={isSearchExpanded}
    />
  );
} 