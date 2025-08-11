import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Truck, RefreshCw, Shield, Plus, Minus } from 'lucide-react';
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
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-black transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
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
                  className={`aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImageIndex === index ? 'border-black' : 'border-transparent hover:border-gray-300'
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
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900">
                ${product.price}
              </p>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            
            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Size</h3>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-lg w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
              
              <button className="w-full flex items-center justify-center py-3 px-8 border border-gray-300 rounded-full font-medium hover:border-black transition-colors">
                <Heart size={18} className="mr-2" />
                Add to Wishlist
              </button>
            </div>
            
            {/* Product Features */}
            <div className="border-t border-gray-200 pt-8 space-y-6">
              <div className="flex items-center">
                <Truck size={20} className="text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $200</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <RefreshCw size={20} className="text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Shield size={20} className="text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Quality Guarantee</p>
                  <p className="text-sm text-gray-600">Premium materials only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">
              You Might Also Like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;