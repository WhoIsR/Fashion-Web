import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, Users, Award, Heart, Eye } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/products';

// === KARTU KUTIPAN (QUOTE CARD) DENGAN WARNA BARU ===
const QuoteCard = ({ text, author }: { text: string; author: string }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-brand-bg-light p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
    <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 to-brand-purple-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10 h-full flex flex-col justify-center">
      <Sparkles size={24} className="text-brand-pink mb-4 group-hover:scale-105 transition-transform duration-300" />
      <blockquote className="text-lg md:text-xl font-serif font-medium text-brand-text mb-3 leading-relaxed">
        "{text}"
      </blockquote>
      <cite className="text-sm text-brand-purple-dark font-medium">— {author}</cite>
    </div>
  </div>
);

// === KARTU MODEL (MODEL CARD) ===
const ModelCard = ({ image, title }: { image: string; title: string }) => (
  <div className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex space-x-3">
        <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
          Get The Look
        </button>
        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
          <Heart size={16} />
        </button>
      </div>
    </div>
  </div>
);

// === KARTU PRODUK UNTUK GRID (PRODUCT MASONRY CARD) ===
const ProductMasonryCard = ({ product }: { product: any }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="relative overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
          <Heart size={16} className="text-gray-700" />
        </button>
        <Link to={`/product/${product.id}`} className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
          <Eye size={16} className="text-gray-700" />
        </Link>
      </div>
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link to={`/product/${product.id}`} className="w-full bg-white/90 backdrop-blur-sm text-black py-2 px-4 rounded-full text-sm font-medium text-center block hover:bg-white transition-colors">
          Try It On
        </Link>
      </div>
    </div>
    <div className="p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{product.category}</p>
      <h3 className="text-sm font-medium text-brand-text mb-1 line-clamp-2">{product.name}</h3>
      <p className="text-lg font-semibold text-brand-purple-dark">${product.price}</p>
    </div>
  </div>
);


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const masonryContent = [
    { type: 'quote', id: 'quote-1', text: "Style isn't just what you wear — it's who you are.", author: "Fashion Philosophy" },
    { type: 'product', id: 'product-1', product: mockProducts[0] },
    { type: 'model', id: 'model-1', image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Street Style Inspiration'},
    { type: 'model', id: 'model-2', image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Elegant Evening Look'},
    { type: 'product', id: 'product-3', product: mockProducts[2] },
    { type: 'quote', id: 'quote-2', text: "Fashion fades, but style is eternal.", author: "Yves Saint Laurent"},
    { type: 'product', id: 'product-5', product: mockProducts[4] },
    { type: 'model', id: 'model-3', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Casual Chic'},
    { type: 'product', id: 'product-4', product: mockProducts[5] },
    { type: 'model', id: 'model-4', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Business Elegance'},
    { type: 'quote', id: 'quote-3', text: "Dress like you're already famous.", author: "Fashion Mantra"},
    { type: 'product', id: 'product-2', product: mockProducts[1] },
  ];
  
  return (
    // Menggunakan warna background brand
    <div className="min-h-screen bg-brand-bg-light">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-bg-light to-white overflow-hidden">
        {/* ... (Background pattern bisa dibiarkan) ... */}
        <div className="absolute inset-0 opacity-5">...</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-text mb-6 leading-tight">
              ARVE Style
              <span className="block text-gradient">Heritage & Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Discover curated fashion pieces and get personalized styling advice from our AI fashion consultant
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/catalog" className="btn-primary inline-flex items-center">
                Shop Collection
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/quiz" className="btn-secondary inline-flex items-center">
                <Sparkles size={18} className="mr-2" />
                Take Style Quiz
              </Link>
            </div>
          </div>
          
          {/* Floating Elements dengan warna baru */}
          <div className="absolute top-20 left-10 animate-bounce-gentle">
            <Star size={24} className="text-brand-pink" />
          </div>
          <div className="absolute bottom-32 right-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
            <Sparkles size={28} className="text-brand-purple-light" />
          </div>
        </div>
      </section>
      
      {/* Creative Masonry Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-brand-text mb-4">
              Style Inspiration
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover your next favorite piece through our curated collection of fashion moments
            </p>
          </div>
          
          {/* MASONRY GRID BARU YANG LEBIH BAIK */}
          <div className="masonry-container">
            {masonryContent.map((item, index) => (
              <div
                key={item.id}
                className="masonry-item animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {item.type === 'quote' && (
                  <QuoteCard text={item.text} author={item.author} />
                )}
                {item.type === 'model' && (
                  <ModelCard image={item.image} title={item.title} />
                )}
                {item.type === 'product' && (
                  <ProductMasonryCard product={item.product} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Collections */}
      <section className="py-20 bg-brand-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-brand-text mb-2">
                        Best Sellers
                    </h2>
                    <p className="text-gray-600">
                        Our most loved pieces this season
                    </p>
                </div>
                <Link to="/catalog" className="btn-secondary hidden md:inline-flex items-center">
                    View All
                    <ArrowRight size={18} className="ml-2" />
                </Link>
            </div>
          
          <div className="hidden md:grid grid-cols-4 gap-8">
            {mockProducts.slice(0, 4).map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex space-x-4" style={{ width: 'max-content' }}>
                  {mockProducts.slice(0, 6).map((product, index) => (
                      <div key={product.id} className="w-56 flex-shrink-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                          <ProductCard product={product} />
                      </div>
                  ))}
              </div>
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Link to="/catalog" className="btn-secondary inline-flex items-center">
              View All Products
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-brand-text mb-4">
              Why Choose ARVE?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience fashion like never before with our personalized approach to style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Ganti warna ikon dari amber ke warna brand */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-purple-light/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-purple-light/40 transition-colors">
                <Sparkles size={28} className="text-brand-purple-dark" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-brand-text mb-4">AI Style Consultant</h3>
              <p className="text-gray-600 leading-relaxed">Get personalized outfit recommendations and styling advice from our advanced AI.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-purple-light/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-purple-light/40 transition-colors">
                <Users size={28} className="text-brand-purple-dark" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-brand-text mb-4">Curated Collections</h3>
              <p className="text-gray-600 leading-relaxed">Carefully selected pieces from top designers and emerging brands.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-purple-light/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-purple-light/40 transition-colors">
                <Award size={28} className="text-brand-purple-dark" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-brand-text mb-4">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">Every piece meets the highest standards of quality, comfort, and craftsmanship.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-brand-text text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Transform Your Style?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Take our style quiz and let our AI consultant create a personalized fashion journey just for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Tombol dengan warna brand */}
            <Link to="/quiz" className="btn-accent inline-flex items-center">
              <Sparkles size={18} className="mr-2" />
              Start Style Quiz
            </Link>
            <Link to="/consultant" className="btn-secondary border-white text-white hover:bg-white hover:text-black inline-flex items-center">
              Chat with AI Consultant
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;