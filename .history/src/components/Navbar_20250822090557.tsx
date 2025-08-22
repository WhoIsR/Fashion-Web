import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ThemeSwitcher from './ThemeSwitcher';

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
        ? 'bg-white/75 dark:bg-dark-background/75 shadow-lg' 
        : 'bg-white/95 dark:bg-dark-background/95'} 
      border-b border-gray-100/50 dark:border-dark-border/50 z-[1000]
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
                    ? 'text-brand-purple-dark dark:text-dark-primary'
                    : 'text-brand-text dark:text-dark-text hover:text-brand-purple-dark dark:hover:text-dark-primary'}
                  group
                `}
              >
                {item.name}
                <span className={`
                  absolute bottom-0 left-0 w-full h-0.5
                  bg-brand-purple-dark/50 dark:bg-dark-primary/50 transform origin-left
                  transition-transform duration-300 ease-out
                  ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                `}/>
              </Link>
            ))}
          </div>
          
          {/* Right Side Icons with animations */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <Link to="/cart" className="relative p-2 group">
              <ShoppingBag 
                size={20} 
                className={`
                  transform transition-all duration-200
                  text-brand-text dark:text-dark-text group-hover:text-brand-purple-dark dark:hover:text-dark-primary
                  group-hover:scale-110
                `}
              />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-purple-dark dark:bg-dark-primary
                  text-white dark:text-dark-background text-xs rounded-full h-5 w-5 
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
                className={`
                  transform transition-all duration-200
                  text-brand-text dark:text-dark-text group-hover:text-brand-purple-dark dark:hover:text-dark-primary
                  group-hover:scale-110
                `}
              />
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-brand-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden" id="mobile-menu">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${isOpen ? 'block' : 'hidden'}`}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  transition-all duration-200
                  ${isActive(item.href)
                    ? 'bg-brand-purple-light/20 text-brand-purple-dark dark:bg-dark-primary/20 dark:text-dark-primary'
                    : 'text-brand-text dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-card hover:text-brand-purple-dark dark:hover:text-dark-primary'}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;