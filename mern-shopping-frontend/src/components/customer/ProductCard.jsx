import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaStar, FaCheckCircle } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-indigo-500">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category Badge */}
        <span className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg transform group-hover:scale-110 transition-transform">
          {product.category}
        </span>

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="text-sm font-bold text-gray-800">{product.rating || '4.5'}</span>
        </div>

        {/* Stock Badge */}
        {product.stock > 0 && product.stock < 20 && (
          <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            Only {product.stock} left!
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Add Button (Shows on Hover) */}
        {product.stock > 0 && (
          <button
            onClick={() => addToCart(product)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-xl hover:bg-indigo-600 hover:text-white flex items-center gap-2"
          >
            <FaShoppingCart /> Quick Add
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 bg-gradient-to-br from-white to-gray-50">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1">Price</p>
            <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all shadow-lg ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:scale-110'
            }`}
          >
            <FaShoppingCart /> Add
          </button>
        </div>

        {/* Stock Indicator */}
        {product.stock > 0 && (
          <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
            <FaCheckCircle /> <span className="font-medium">In Stock ({product.stock} available)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
