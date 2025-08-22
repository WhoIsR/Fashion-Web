import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  const onSubscribe: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // No backend in this demo – just a no-op to avoid page reload
  };

  return (
    <footer className="border-t border-gray-200 dark:border-dark-border bg-brand-bg-light dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & intro */}
          <div className="lg:col-span-2">
            <Link to="/" className="logo-container mb-4 inline-flex">
              <span className="logo-text">AR</span>
              <div className="logo-middle">
                <span className="logo-v-top">V</span>
                <div className="logo-dot" />
                <span className="logo-v-bottom">V</span>
              </div>
              <span className="logo-text">E</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Your personal fashion destination. Curated pieces, modern looks, and an AI consultant tailored to your taste.
            </p>

            {/* Newsletter */}
            <form onSubmit={onSubscribe} className="flex items-stretch w-full max-w-md rounded-full overflow-hidden border border-gray-300 dark:border-dark-border">
              <input
                type="email"
                required
                placeholder="Your email for style updates"
                className="flex-1 px-4 py-2 bg-white dark:bg-dark-card text-brand-text dark:text-dark-text placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
              />
              <button type="submit" className="px-5 py-2 bg-brand-pink text-brand-purple-dark font-medium hover:opacity-90 transition">
                Subscribe
              </button>
            </form>

            {/* Socials */}
            <div className="flex space-x-3 mt-6">
              <a aria-label="Instagram" href="https://www.instagram.com/satrioradja/?hl=en" target="_blank" rel="noreferrer" className="p-2 rounded-full border border-gray-300 dark:border-dark-border text-gray-600 dark:text-gray-300 hover:text-brand-purple-dark hover:border-brand-purple-dark dark:hover:text-dark-primary dark:hover:border-dark-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a aria-label="Facebook" href="#" className="p-2 rounded-full border border-gray-300 dark:border-dark-border text-gray-600 dark:text-gray-300 hover:text-brand-purple-dark hover:border-brand-purple-dark dark:hover:text-dark-primary dark:hover:border-dark-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a aria-label="Twitter" href="#" className="p-2 rounded-full border border-gray-300 dark:border-dark-border text-gray-600 dark:text-gray-300 hover:text-brand-purple-dark hover:border-brand-purple-dark dark:hover:text-dark-primary dark:hover:border-dark-primary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-base font-semibold text-brand-text dark:text-dark-text mb-4">Shop</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li><Link to="/" className="hover:text-brand-purple-dark dark:hover:text-dark-primary transition">Home</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-purple-dark dark:hover:text-dark-primary transition">Shop All</Link></li>
              <li><Link to="/quiz" className="hover:text-brand-purple-dark dark:hover:text-dark-primary transition">Style Quiz</Link></li>
              <li><Link to="/consultant" className="hover:text-brand-purple-dark dark:hover:text-dark-primary transition">AI Consultant</Link></li>
              <li><Link to="/cart" className="hover:text-brand-purple-dark dark:hover:text-dark-primary transition">Shopping Cart</Link></li>
              <li><Link to="/checkout" className="hover:text-brand-purple-dark dark:hover:text-dark-primary transition">Checkout</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold text-brand-text dark:text-dark-text mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-center"><Mail size={16} className="mr-3 text-brand-pink" /><span>hello@arve.style</span></li>
              <li className="flex items-center"><Phone size={16} className="mr-3 text-brand-pink" /><span>+62 812 3456 7890</span></li>
              <li className="flex items-center"><MapPin size={16} className="mr-3 text-brand-pink" /><span>Jakarta, Indonesia</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">© {year} ARVE. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-purple-dark dark:hover:text-dark-primary transition">Privacy Policy</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-purple-dark dark:hover:text-dark-primary transition">Terms</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-purple-dark dark:hover:text-dark-primary transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;