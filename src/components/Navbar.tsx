import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { state } = useCart();
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/catalog' },
    { name: 'Style Quiz', href: '/quiz' },
    { name: 'Consultant', href: '/consultant' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      fixed w-full transition-all duration-300 backdrop-blur-sm
      ${isScrolled 
        ? 'bg-white/75 shadow-lg' 
        : 'bg-white/95'} 
      border-b border-gray-100/50 z-[1000]
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with hover animation */}
          <Link to="/" className="logo-container group">
            <div className="flex items-center space-x-1 transition-transform duration-300 group-hover:scale-105">
              <span className="logo-text">AR</span>
              <div className="logo-middle relative">
                <span className="logo-v-top">V</span>
                <div className="logo-dot"></div>
                <span className="logo-v-bottom">V</span>
              </div>
              <span className="logo-text">E</span>
            </div>
          </Link>
          
          {/* Desktop Navigation with hover effects */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative text-sm font-medium transition-all duration-200 py-1
                  ${isActive(item.href)
                    ? 'text-brand-purple-dark'
                    : 'text-brand-text hover:text-brand-purple-dark'}
                  group
                `}
              >
                {item.name}
                <span className={`
                  absolute bottom-0 left-0 w-full h-0.5
                  bg-brand-purple-dark/20 transform origin-left
                  transition-transform duration-300 ease-out
                  ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                `}/>
              </Link>
            ))}
          </div>
          
          {/* Right Side Icons with animations */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 group">
              <ShoppingBag 
                size={20} 
                className={`
                  transform transition-all duration-200
                  text-brand-text group-hover:text-brand-purple-dark
                  group-hover:scale-110
                `}
              />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-purple-dark 
                  text-white text-xs rounded-full h-5 w-5 
                  flex items-center justify-center
                  transform transition-transform duration-200
                  group-hover:scale-110 animate-pulse">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
            
            <button className="p-2 group">
              <User 
                size={20} 
                className="transform transition-all duration-200 
                  text-brand-text group-hover:text-brand-purple-dark
                  group-hover:scale-110"
              />
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 group"
            >
              <div className="transform transition-all duration-200 
                text-brand-text group-hover:text-brand-purple-dark">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation with slide animation */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-brand-bg-light 
          border-t border-gray-100 shadow-lg animate-fadeDown">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  block text-lg font-medium transition-all duration-200
                  ${isActive(item.href)
                    ? 'text-brand-purple-dark pl-4 border-l-2 border-brand-purple-dark'
                    : 'text-brand-text hover:text-brand-purple-dark hover:pl-4'}
                `}
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