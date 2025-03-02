import React from 'react';

function Logo({ minimized, onClick }) {
  return (
    <div 
      className={`logo-section ${minimized ? 'minimized' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <h1 className="logo">SARAS</h1>
      <p className="tagline">Discover your true fashion</p>
    </div>
  );
}

export default Logo; 