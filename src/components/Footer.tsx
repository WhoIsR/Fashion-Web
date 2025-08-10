import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Footer = () => {
  return (
    // Menggunakan warna ungu tua dari brand sebagai background
    <footer className="bg-brand-text text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Logo ARVE */} 
          <div className="lg:col-span-2">
            {/* Logo ARVE Ditempatkan di sini */}
            <Link to="/" className="logo-container mb-6">
              <span className="logo-text">AR</span>
              <div className="logo-middle">
                <span className="logo-v-top">V</span>
                <div className="logo-dot"></div>
                <span className="logo-v-bottom">V</span>
              </div>
              <span className="logo-text">E</span>
            </Link>

            <p className="text-white/80 mb-6 max-w-md">
              Your personal style destination. Discover curated fashion pieces and get personalized styling advice from our AI fashion consultant.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-brand-pink transition-colors p-2">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-brand-pink transition-colors p-2">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-brand-pink transition-colors p-2">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={16} className="mr-3 text-brand-pink" />
                <span className="text-white/80">hello@arve.style</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 text-brand-pink" />
                <span className="text-white/80">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-3 text-brand-pink" />
                <span className="text-white/80">Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2025 ARVE. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;