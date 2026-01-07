import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GlobalHeader from './components/GlobalHeader';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal'; // New Import
import Home from './pages/Home';
import Shop from './pages/Shop';
import Service from './pages/Service';
import Rent from './pages/Rent';
import Offroad from './pages/Offroad'; // New Import
import Legal from './pages/Legal';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Merch from './pages/Merch';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-neutral-950 flex flex-col font-sans text-neutral-100 selection:bg-brand-accent selection:text-black relative">
        <GlobalHeader />
        <CartDrawer />
        <SearchOverlay />
        <AuthModal />
        <BookingModal /> {/* New Modal */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ProductDetail />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/service" element={<Service />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/offroad" element={<Offroad />} /> {/* New Route */}
            <Route path="/legal/:slug" element={<Legal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;