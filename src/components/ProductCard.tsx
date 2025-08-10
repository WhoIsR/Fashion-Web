import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden relative">
        <img
          className="h-80 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          src={product.image}
          alt={product.name}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
            <Heart size={16} className="text-gray-600" />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Eye size={16} className="text-gray-600" />
          </Link>
        </div>
        
        {/* Quick shop button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/product/${product.id}`}
            className="w-full bg-white text-black py-2 px-4 rounded-full text-sm font-medium text-center block hover:bg-gray-100 transition-colors duration-200"
          >
            Quick Shop
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          {product.category}
        </p>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          <Link to={`/product/${product.id}`} className="hover:text-gray-600 transition-colors duration-200">
            {product.name}
          </Link>
        </h3>
        <p className="text-xl font-semibold text-gray-900">
          ${product.price}
        </p>
        
        {/* Color dots */}
        <div className="flex space-x-2 mt-3">
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