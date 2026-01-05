import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User, Heart, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore, useWishlistStore, useUIStore } from '../lib/store';
import { AnimatePresence, motion } from 'framer-motion';

const GlobalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Hydration safety
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const total = useCartStore(state => state.cartTotal());
  const cartCount = useCartStore(state => state.getCartCount());
  const openCart = useCartStore(state => state.openCart);
  
  const wishlistCount = useWishlistStore(state => state.wishlist.length);
  const openSearch = useUIStore(state => state.openSearch);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'МАГАЗИН', path: '/' },
    { name: 'ВЕЛОСИПЕДИ', path: '/shop' },
    { name: 'СЕРВИЗ', path: '/service' },
    { name: 'ПОД НАЕМ', path: '/rent' },
    { name: 'МЪРЧ', path: '/shop?category=Екипировка' },
    { name: 'ЦЕНИ', path: '/service' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800 shadow-xl' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col z-50 group">
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-brand-accent transition-colors">
              2GETHER<span className="text-neutral-500">BIKES</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-medium">
              ВЕЛОМАГАЗИН & СЕРВИЗ
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold tracking-wide transition-colors duration-200 ${
                  location.pathname === link.path ? 'text-brand-accent' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Utility Bar */}
          <div className="hidden md:flex items-center space-x-5">
            <button 
              onClick={openSearch}
              className="text-neutral-400 hover:text-white transition-colors hover:bg-neutral-800 p-2 rounded-full" 
              title="Търсене"
            >
              <Search size={20} />
            </button>
            
            <Link to="/wishlist" className="text-neutral-400 hover:text-white transition-colors relative group p-2 rounded-full hover:bg-neutral-800" title="Любими">
              <Heart size={20} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-neutral-950" />
              )}
            </Link>
            
            <button className="text-neutral-400 hover:text-white transition-colors p-2 rounded-full hover:bg-neutral-800" title="Профил">
              <User size={20} />
            </button>
            
            {/* Cart Widget */}
            <div className="flex items-center gap-3 pl-5 border-l border-neutral-800/50">
              <div className="text-right hidden lg:block leading-tight">
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Количка</div>
                <div className="text-sm font-bold text-white font-mono">
                  {mounted ? total.toFixed(2) : "0.00"} лв
                </div>
              </div>
              <button 
                onClick={openCart}
                className="relative p-2.5 bg-white text-black rounded-xl hover:bg-brand-accent transition-colors group shadow-lg shadow-white/5"
              >
                <ShoppingBag size={20} strokeWidth={2.5} />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-neutral-950">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden z-50 p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 p-6 xl:hidden shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-bold text-neutral-200 hover:text-brand-accent py-2 border-b border-neutral-800/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-neutral-400">Общо в количката:</span>
                <span className="text-xl font-bold text-white font-mono">{mounted ? total.toFixed(2) : "0.00"} лв</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default GlobalHeader;