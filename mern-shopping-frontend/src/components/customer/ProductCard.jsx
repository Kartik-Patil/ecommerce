import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaStar, FaCheckCircle, FaHeart } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-premium-lg transition-all duration-700 transform hover:-translate-y-4 border-2 border-transparent hover:border-gradient-to-r hover:from-indigo-500 hover:to-purple-500 card-hover-lift animate-fade-in-up">
      {/* Image Container with Premium Overlay */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-80">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-transform duration-1000 ease-out"
        />
        
        {/* Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Glassmorphic Category Badge */}
        <div className="absolute top-4 right-4 glass-panel px-4 py-2 rounded-full backdrop-blur-xl transform group-hover:scale-110 transition-all duration-500 shadow-glow">
          <span className="text-white text-xs font-bold flex items-center gap-1">
            <HiSparkles className="text-yellow-300" />
            {product.category}
          </span>
        </div>

        {/* Premium Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2 shadow-premium transform group-hover:scale-110 transition-all duration-500">
          <FaStar className="text-yellow-500 text-sm animate-pulse" />
          <span className="text-sm font-black text-gray-800">{product.rating || '4.8'}</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white shadow-premium"
        >
          <FaHeart className={`text-xl transition-all ${isFavorite ? 'text-red-500 scale-125' : 'text-gray-400'}`} />
        </button>

        {/* Stock Status */}
        {product.stock > 0 && product.stock < 20 && (
          <div className="absolute bottom-4 left-4 glass-panel-dark text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-pulse-glow backdrop-blur-xl">
            🔥 Only {product.stock} left!
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-premium">
              Out of Stock
            </span>
          </div>
        )}

        {/* Premium Quick Add Button (Shows on Hover) */}
        {product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-12 group-hover:translate-y-0 transition-all duration-700 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-premium-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white flex items-center gap-3 btn-premium"
          >
            <FaShoppingCart className={isAdding ? 'animate-bounce' : ''} />
            {isAdding ? 'Added!' : 'Quick Add'}
          </button>
        )}
      </div>

      {/* Content Section with Glassmorphic Background */}
      <div className="p-6 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 space-y-4">
        <h3 className="text-xl font-black text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Price</p>
            <span className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`relative flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all shadow-lg overflow-hidden group/btn ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:scale-110 hover:shadow-glow btn-premium'
            }`}
          >
            {product.stock === 0 ? (
              <>
                <FaShoppingCart /> Sold Out
              </>
            ) : (
              <>
                <FaShoppingCart className={isAdding ? 'animate-bounce' : ''} />
                {isAdding ? 'Added!' : 'Add'}
              </>
            )}
          </button>
        </div>

        {/* Stock Indicator with Animation */}
        {product.stock > 0 && (
          <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-4 py-2 rounded-xl animate-fade-in-up">
            <FaCheckCircle className="animate-pulse" />
            <span className="font-semibold">In Stock • {product.stock} available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
