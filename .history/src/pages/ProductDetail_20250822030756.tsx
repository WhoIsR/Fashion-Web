import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Truck, RefreshCw, Shield, Plus, Minus, ArrowLeft } from 'lucide-react';
import { mockProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  
  const product = mockProducts.find(p => p.id === id);
  const relatedProducts = mockProducts.filter(p => p.id !== id && p.category === product?.category).slice(0, 4);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/catalog" className="btn-primary">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    const cartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedColor
    };
    
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    toast.success('Added to cart!', {
      duration: 2000,
      style: {
        background: '#000',
        color: '#fff',
      },
    });
  };
  
  // Mock additional images for gallery
  const galleryImages = [
    product.image,
    'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1035685/pexels-photo-1035685.jpeg?auto=compress&cs=tinysrgb&w=800',
    
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];
  
  return (
    <div className="min-h-screen bg-white dark:bg-dark-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button and Breadcrumb */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pt-10">
          {/* Left side - Back button (mobile only) and Breadcrumb */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button 
              onClick={() => window.history.back()} 
              className="sm:hidden inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Shop</span>
            </button>

            <nav className="flex-1">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
                <span className="text-gray-400 dark:text-gray-600">/</span>
                <Link to="/catalog" className="hover:text-black dark:hover:text-white transition-colors">Shop</Link>
                <span className="text-gray-400 dark:text-gray-600">/</span>
                <span className="text-black dark:text-white truncate max-w-[200px]">{product.name}</span>
              </div>
            </nav>
          </div>

          {/* Right side - can be used for additional actions if needed */}
          <div className="hidden sm:block">
            {/* Optional content */}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 dark:bg-dark-card rounded-lg overflow-hidden">
              <img
                src={galleryImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-[600px] object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-w-1 aspect-h-1 bg-gray-100 dark:bg-dark-card rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImageIndex === index ? 'border-black dark:border-dark-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-dark-border'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-dark-text mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900 dark:text-dark-primary">
                ${product.price}
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>
            
            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Size</h3>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white dark:border-dark-primary dark:bg-dark-primary dark:text-dark-background'
                        : 'border-gray-300 dark:border-dark-border hover:border-black dark:hover:border-dark-primary text-gray-900 dark:text-dark-text'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-black bg-black text-white dark:border-dark-primary dark:bg-dark-primary dark:text-dark-background'
                        : 'border-gray-300 dark:border-dark-border hover:border-black dark:hover:border-dark-primary text-gray-900 dark:text-dark-text'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">Quantity</h3>
              <div className="flex items-center border border-gray-300 dark:border-dark-border rounded-lg w-32 text-gray-900 dark:text-dark-text">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart & Wishlist */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary"
              >
                Add to Cart
              </button>
              <button className="p-4 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors">
                <Heart size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            {/* Shipping Info */}
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Truck size={20} className="mr-3 text-brand-purple-dark dark:text-dark-primary" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <RefreshCw size={20} className="mr-3 text-brand-purple-dark dark:text-dark-primary" />
                <span>Easy 30-day returns</span>
              </div>
              <div className="flex items-center">
                <Shield size={20} className="mr-3 text-brand-purple-dark dark:text-dark-primary" />
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-dark-text mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;