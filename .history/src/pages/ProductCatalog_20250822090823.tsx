import { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/products';

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  const categories = ['all', 'tops', 'bottoms', 'dresses', 'outerwear', 'accessories'];
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL'];
  const colors = ['all', 'Black', 'White', 'Navy', 'Gray', 'Beige', 'Burgundy', 'Emerald', 'Camel', 'Brown'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100', label: 'Under $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200-300', label: '$200 - $300' },
    { value: '300+', label: '$300+' }
  ];
  
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];
  
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      // Size filter
      if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) {
        return false;
      }
      
      // Color filter
      if (selectedColor !== 'all' && !product.colors.includes(selectedColor)) {
        return false;
      }
      
      // Price filter
      if (priceRange !== 'all') {
        const [min, max] = priceRange === '300+' ? [300, Infinity] : priceRange.split('-').map(Number);
        if (product.price < min || (max !== Infinity && product.price > max)) {
          return false;
        }
      }
      
      return true;
    });
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for featured
        break;
    }
    
    return filtered;
  }, [searchTerm, selectedCategory, selectedSize, selectedColor, priceRange, sortBy]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setPriceRange('all');
    setSortBy('featured');
  };
  
  return (
    <div className="min-h-screen pt-24 pb-8 bg-brand-bg-light dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-dark-text mb-4">
            Shop Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium fashion pieces
          </p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-dark-primary focus:border-transparent bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text"
              />
            </div>
            
            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border text-gray-900 dark:text-dark-text"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
            
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-dark-background border border-gray-300 dark:border-dark-border rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-black dark:focus:ring-dark-primary focus:border-transparent text-gray-900 dark:text-dark-text"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
            </div>
          </div>
          
          {/* Desktop Filters */}
          <div className={`mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 dark:border-dark-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black dark:focus:ring-dark-primary focus:border-transparent bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-gray-300 dark:border-dark-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black dark:focus:ring-dark-primary focus:border-transparent bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>
                    {size === 'all' ? 'All Sizes' : size}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border border-gray-300 dark:border-dark-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black dark:focus:ring-dark-primary focus:border-transparent bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text"
              >
                {colors.map(color => (
                  <option key={color} value={color}>
                    {color === 'all' ? 'All Colors' : color}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full border border-gray-300 dark:border-dark-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black dark:focus:ring-dark-primary focus:border-transparent bg-white dark:bg-dark-background text-gray-900 dark:text-dark-text"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Clear Filters Button */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-end">
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-purple-dark hover:bg-opacity-90 dark:bg-dark-primary dark:text-dark-background dark:hover:bg-opacity-90"
              >
                <X size={16} className="mr-2" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} clickable />
          ))}
        </div>
        
        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-dark-text mb-2">No products found</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;