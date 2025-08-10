import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/catalog' },
    { name: 'Style Quiz', href: '/quiz' },
    { name: 'Consultant', href: '/consultant' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    // Menggunakan warna background brand yang sangat muda
    <nav className="bg-brand-bg-light/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo ARVE (sudah benar dari langkah sebelumnya) */}
          <Link to="/" className="logo-container">
            <span className="logo-text">AR</span>
            <div className="logo-middle">
              <span className="logo-v-top">V</span>
              <div className="logo-dot"></div>
              <span className="logo-v-bottom">V</span>
            </div>
            <span className="logo-text">E</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    // Link Aktif: Warna ungu tua
                    ? 'text-brand-purple-dark border-b-2 border-brand-purple-dark'
                    // Link Tidak Aktif: Warna teks brand, hover ungu tua
                    : 'text-brand-text hover:text-brand-purple-dark'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-brand-text hover:text-brand-purple-dark transition-colors">
              <ShoppingBag size={20} />
              {state.items.length > 0 && (
                // Badge notifikasi: Background ungu tua
                <span className="absolute -top-1 -right-1 bg-brand-purple-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
            
            <button className="p-2 text-brand-text hover:text-brand-purple-dark transition-colors">
              <User size={20} />
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-brand-text hover:text-brand-purple-dark transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-brand-bg-light border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-brand-purple-dark'
                    : 'text-brand-text hover:text-brand-purple-dark'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;