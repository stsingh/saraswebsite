import React from 'react';
import Link from 'next/link';
// import { CartIcon } from '../components/CartIcon.js';
import { Logo } from './/Logo.js';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link href="/tops" className="nav-link">TOPS</Link>
        <Link href="/bottoms" className="nav-link">BOTTOMS</Link>
        <Link href="/shoes" className="nav-link">SHOES</Link>
      </div>
      {/* <CartIcon /> */}
      {/* <Logo /> */}
      <style jsx>{`
        .navbar {
          padding: 20px 0 40px;
          margin-bottom: 20px;
        }
        
        .nav-links {
          display: flex;
          justify-content: center;
          gap: 120px;
        }
        
        .nav-link {
          text-decoration: none;
          color: #000;
          font-weight: 500;
          font-size: 1.2rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-bottom: 2px solid #000;
          padding-bottom: 2px;
        }
      `}</style>
    </nav>
  );
}

export default Navbar; 