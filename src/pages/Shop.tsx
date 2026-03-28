import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Star, Filter, ChevronDown, Clock } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const { addToCart } = useCart();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - keep original order
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Title */}
        <div className="mb-8">
          <nav className="flex text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Shop</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900">All Sports Gear</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-between bg-white p-4 rounded-md shadow-sm border border-gray-200"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="font-bold flex items-center"><Filter size={20} className="mr-2" /> Filters</span>
            <ChevronDown size={20} className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full text-left flex justify-between items-center ${selectedCategory === 'All' ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    All Products
                    <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded-full">{products.length}</span>
                  </button>
                </li>
                {categories.map(category => {
                  const count = products.filter(p => p.category === category).length;
                  return (
                    <li key={category}>
                      <button 
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left flex justify-between items-center ${selectedCategory === category ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
                      >
                        {category}
                        <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded-full">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 mt-8">Sort By</h3>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> products</p>
              
              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try changing your category filter.</p>
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden group flex flex-col">
                    <Link to={`/product/${product.id}`} className="relative block h-48 sm:h-56 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.originalPrice > product.price && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                      {product.stock <= 5 && (
                        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                          <Clock size={12} className="mr-1" /> Only {product.stock} left
                        </div>
                      )}
                    </Link>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-center mb-1">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="text-xs text-gray-600 ml-1 font-medium">{product.rating} ({product.reviews})</span>
                      </div>
                      
                      <Link to={`/product/${product.id}`} className="block mb-2">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-extrabold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-gray-500 line-through ml-1 block sm:inline">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(product)}
                        className="mt-3 w-full bg-blue-900 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center"
                      >
                        <ShoppingBag size={16} className="mr-2" /> Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
