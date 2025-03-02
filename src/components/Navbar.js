import React from 'react';
import Link from 'next/link';
// import { CartIcon } from '../components/CartIcon.js';
import { Logo } from './/Logo.js';

function Navbar() {
  return (
    <nav className="py-5 pb-10 mb-5">
      <div className="flex justify-center gap-32">
        <Link href="/tops" className="text-xl font-medium tracking-wide uppercase border-b-2 border-black pb-0.5">TREATMENTS</Link>
        <Link href="/bottoms" className="text-xl font-medium tracking-wide uppercase border-b-2 border-black pb-0.5">MOISTURIZERS</Link>
        <Link href="/shoes" className="text-xl font-medium tracking-wide uppercase border-b-2 border-black pb-0.5">CLEANSERS</Link>
      </div>
      {/* <CartIcon /> */}
      {/* <Logo /> */}
    </nav>
  );
}

export default Navbar; 