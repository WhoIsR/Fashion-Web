import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import StyleQuiz from './pages/StyleQuiz';
import AIConsultant from './pages/AIConsultant';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

// Komponen ini akan membungkus semua halaman dan mengatur layout
const AppLayout = () => {
  const location = useLocation();
  const showFooter = location.pathname !== '/consultant'; // Footer tidak akan muncul jika halaman adalah /consultant

  return (
    <div className="App min-h-screen bg-brand-bg-light dark:bg-dark-background text-brand-text dark:text-dark-text transition-colors">
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/quiz" element={<StyleQuiz />} />
        <Route path="/consultant" element={<AIConsultant />} />
        <Route path="/checkout" element={<Checkout />} />
  <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* Footer hanya akan dirender jika showFooter bernilai true */}
      {showFooter && <Footer />}
    </div>
  );
};

// Komponen ScrollToTop tetap sama
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
    </CartProvider>
  );
}

export default App;