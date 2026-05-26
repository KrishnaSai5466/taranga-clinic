import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ cartCount, onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="glassmorphism sticky top-0 z-50 py-4 px-6 md:px-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 21a6 6 0 0 0 6-6V9a6 6 0 0 0-12 0v2" />
              <path d="M10 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              <path d="M19 5a10 10 0 0 1 0 14" />
              <path d="M16 8a6 6 0 0 1 0 8" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400">
            Taranga Clinic
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold tracking-wide text-slate-300">
          {isHomePage ? (
            <>
              <a href="#services" className="hover:text-blue-400 transition-colors duration-300">Services</a>
              <a href="#faqs" className="hover:text-blue-400 transition-colors duration-300">FAQs</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a>
            </>
          ) : (
            <Link to="/" className="hover:text-blue-400 transition-colors duration-300">Home</Link>
          )}
          <Link to="/shop" className={`hover:text-blue-400 transition-colors duration-300 ${location.pathname === '/shop' ? 'text-blue-400' : ''}`}>
            Store
          </Link>
          <Link to="/resources" className={`hover:text-blue-400 transition-colors duration-300 ${location.pathname === '/resources' ? 'text-blue-400' : ''}`}>
            Resources & Blog
          </Link>

          {/* Cart Icon */}
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-slate-300 hover:text-white transition-colors duration-300 flex items-center"
            aria-label="Shopping Cart"
          >
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-900 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Appointment Button */}
          <Link to="/booking" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 font-bold">
            Book Consultation
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center lg:hidden gap-4">
          {/* Cart Icon for Mobile */}
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-slate-300 hover:text-white transition-colors duration-300"
            aria-label="Shopping Cart"
          >
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-900">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden mt-4 border-t border-slate-800/80 pt-4 pb-2 space-y-3 px-2 animate-fade-in-up">
          {isHomePage ? (
            <>
              <a href="#services" onClick={() => setIsOpen(false)} className="block py-2 text-slate-400 hover:text-white transition-colors font-medium">Services</a>
              <a href="#faqs" onClick={() => setIsOpen(false)} className="block py-2 text-slate-400 hover:text-white transition-colors font-medium">FAQs</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="block py-2 text-slate-400 hover:text-white transition-colors font-medium">Contact</a>
            </>
          ) : (
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-slate-400 hover:text-white transition-colors font-medium">Home</Link>
          )}
          <Link to="/shop" onClick={() => setIsOpen(false)} className="block py-2 text-slate-400 hover:text-white transition-colors font-medium">Store</Link>
          <Link to="/resources" onClick={() => setIsOpen(false)} className="block py-2 text-slate-400 hover:text-white transition-colors font-medium">Resources & Blog</Link>

          <Link to="/booking" onClick={() => setIsOpen(false)} className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all shadow-md mt-4">
            Book Consultation
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
