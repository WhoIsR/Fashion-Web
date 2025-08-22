import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  clickable?: boolean; // when true, the whole card is clickable (used on Shop page)
}

const ProductCard: React.FC<ProductCardProps> = ({ product, clickable = false }) => {
  const navigate = useNavigate();

  const handleCardClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!clickable) return;
    const target = e.target as Element;
    // Avoid intercepting clicks on interactive elements
    if (target.closest('a, button, input, textarea, svg')) return;
    navigate(`/product/${product.id}`);
  };

  return (
  <div
      className={`group relative bg-white dark:bg-dark-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${clickable ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
      role={clickable ? 'button' : undefined}
      aria-label={clickable ? `${product.name}` : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden relative">
        <img
      className="h-40 sm:h-64 md:h-80 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          src={product.image}
          alt={product.name}
        />
        
        {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to="/profile" className="p-2 bg-white dark:bg-dark-card rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors duration-200" aria-label="Wishlist">
            <Heart size={16} className="text-gray-600 dark:text-dark-text" />
          </Link>
          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-white dark:bg-dark-card rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors duration-200"
          >
            <Eye size={16} className="text-gray-600 dark:text-dark-text" />
          </Link>
        </div>
        
        {/* Quick shop button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/product/${product.id}`}
            className="w-full bg-white dark:bg-dark-card text-black dark:text-dark-text py-2 px-4 rounded-full text-sm font-medium text-center block hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-200"
          >
            Quick Shop
          </Link>
        </div>
      </div>
      
      <div className="p-3 sm:p-4 md:p-6">
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
          {product.category}
        </p>
        <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 dark:text-dark-text mb-1 sm:mb-2 line-clamp-2">
          {clickable ? (
            <span className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">{product.name}</span>
          ) : (
            <Link to={`/product/${product.id}`} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
              {product.name}
            </Link>
          )}
        </h3>
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-dark-text">
          ${product.price}
        </p>
        
        {/* Color dots */}
  <div className="flex space-x-2 mt-2 sm:mt-3">
          {product.colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full border border-gray-300 ${
                color.toLowerCase() === 'black' ? 'bg-black' :
                color.toLowerCase() === 'white' ? 'bg-white' :
                color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                color.toLowerCase() === 'gray' ? 'bg-gray-500' :
                color.toLowerCase() === 'beige' ? 'bg-yellow-100' :
                color.toLowerCase() === 'burgundy' ? 'bg-red-900' :
                color.toLowerCase() === 'emerald' ? 'bg-green-600' :
                color.toLowerCase() === 'camel' ? 'bg-yellow-600' :
                color.toLowerCase() === 'cream' ? 'bg-yellow-50' :
                color.toLowerCase() === 'brown' ? 'bg-yellow-800' :
                color.toLowerCase() === 'tan' ? 'bg-yellow-600' :
                'bg-gray-300'
              }`}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;