import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import Recommendations from '../components/Recommendations';
import SideText from '../components/SideText';
import CartIcon from '../components/CartIcon';

export default function Home({ 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  onLogoClick,
  products,
}) {
  return (
    <div className="main-content">
      <div className="logo-section">
        <h1 className="logo">SARAS</h1>
        <p className="tagline">Find the Best Skincare in Seconds — Backed by Real Reviews, Not Hype.</p>
      </div>

      <div className="search-section">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={onSearch}
          placeholder="Tell us about your ideal product..."
        />
      </div>

      <div className="recommendations-section">
        <h2 className="recommendations-header">Recommendations</h2>
        <div className="product-grid">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="product-card">
              <div className="placeholder-image"></div>
              <p className="product-title">{product.title}</p>
            </div>
          ))}
        </div>
      </div>

      <SideText />
      <CartIcon />

      <style jsx>{`
        .main-content {
          text-align: center;
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo-section {
          margin-bottom: 60px;
        }

        .logo {
          font-size: 5rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .search-section {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto 80px;
          padding: 0;
        }

        .recommendations-section {
          width: 100%;
          margin-top: 80px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          text-align: center;
        }

        .placeholder-image {
          width: 100%;
          aspect-ratio: 1;
          background-color: #f0f0f0;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .product-title {
          font-size: 1rem;
          color: #333;
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
} 