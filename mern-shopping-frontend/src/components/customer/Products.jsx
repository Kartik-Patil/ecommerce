import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../utils/api';
import ProductCard from './ProductCard';
import { FaSearch, FaFilter, FaSpinner } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Books', 'Sports'];

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
      <div className="skeleton h-80 w-full"></div>
      <div className="p-6 space-y-4">
        <div className="skeleton h-6 w-3/4"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-2/3"></div>
        <div className="flex justify-between items-center pt-4">
          <div className="skeleton h-10 w-24"></div>
          <div className="skeleton h-12 w-32 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block">
              <FaSpinner className="text-6xl text-indigo-600 animate-spin mb-4" />
            </div>
            <h2 className="text-3xl font-black gradient-text mb-2">Loading Premium Products</h2>
            <p className="text-gray-600">Preparing amazing deals for you...</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="inline-block glass-panel backdrop-blur-xl px-12 py-16 rounded-3xl shadow-premium-lg">
            <div className="text-8xl mb-6">⚠️</div>
            <h3 className="text-4xl font-black gradient-text mb-4">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchProducts}
              className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all btn-premium overflow-hidden"
            >
              <span className="relative">Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Section with Glassmorphism */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass-panel px-6 py-3 rounded-full mb-6 backdrop-blur-xl shadow-premium">
            <HiSparkles className="text-yellow-500 text-xl animate-pulse" />
            <span className="text-sm font-bold text-gray-700">Premium Collection 2025</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
              Discover Amazing Products
            </span>
          </h1>
          
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Browse our curated collection of <span className="font-black text-indigo-600">{products.length}+</span> premium items across all categories
          </p>
        </div>

        {/* Premium Search Bar with Glassmorphism */}
        <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <div className="relative glass-panel backdrop-blur-2xl rounded-3xl shadow-premium-lg overflow-hidden">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400 text-2xl" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-transparent text-gray-800 placeholder-gray-500 text-lg focus:outline-none font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Premium Category Filter with Pills */}
        <div className="flex items-center justify-center gap-4 mb-12 flex-wrap animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full backdrop-blur-xl">
            <FaFilter className="text-indigo-600 text-lg" />
            <span className="font-bold text-gray-700 text-sm">Filter:</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 overflow-hidden group btn-premium ${
                  selectedCategory === cat
                    ? 'text-white shadow-glow scale-105'
                    : 'text-gray-700 hover:text-indigo-600 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg'
                }`}
              >
                {selectedCategory === cat && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                )}
                <span className="relative flex items-center gap-2">
                  {cat}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                    selectedCategory === cat
                      ? 'bg-white/30 text-white'
                      : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count with Premium Badge */}
        <div className="text-center mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="inline-flex items-center gap-3 glass-panel px-6 py-3 rounded-2xl backdrop-blur-xl shadow-premium">
            <span className="text-gray-700 font-semibold">Showing</span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-xl font-black text-lg shadow-lg">
              {filteredProducts.length}
            </span>
            <span className="text-gray-700 font-semibold">premium products</span>
          </div>
        </div>

        {/* Premium Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {filteredProducts.map((product, index) => (
            <div 
              key={product._id} 
              className="animate-fade-in-up"
              style={{animationDelay: `${0.4 + (index * 0.05)}s`}}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State with Premium Design */}
        {filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="inline-block glass-panel px-12 py-16 rounded-3xl backdrop-blur-xl shadow-premium-lg">
              <div className="text-8xl mb-6 animate-float">😕</div>
              <h3 className="text-4xl font-black gradient-text mb-4">No products found</h3>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all btn-premium overflow-hidden"
              >
                <span className="relative">Clear All Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* No Products in Database */}
        {products.length === 0 && !loading && !error && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="inline-block glass-panel px-12 py-16 rounded-3xl backdrop-blur-xl shadow-premium-lg">
              <div className="text-8xl mb-6 animate-float">📦</div>
              <h3 className="text-4xl font-black gradient-text mb-4">No Products Available</h3>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                The store is currently empty. Check back soon for amazing products!
              </p>
              <button
                onClick={fetchProducts}
                className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all btn-premium overflow-hidden"
              >
                <span className="relative">Refresh</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
