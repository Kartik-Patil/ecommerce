import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHome, FaBoxOpen, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-xl sticky top-0 z-50 border-b-4 border-indigo-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            {/* Logo with Gradient & Animation */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-3 rounded-xl transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <FaBoxOpen className="text-white text-2xl" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-10 items-center">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-all font-semibold relative group"
              >
                <FaHome className="text-lg" />
                <span>Home</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link 
                to="/products" 
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-all font-semibold relative group"
              >
                <FaBoxOpen className="text-lg" />
                <span>Products</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Animated Cart Icon */}
              <Link 
                to="/cart" 
                className="relative group"
              >
                <div className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-all font-semibold">
                  <div className="relative">
                    <FaShoppingCart className="text-3xl group-hover:scale-110 transition-transform duration-300" />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Auth Buttons */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2.5 rounded-full hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg font-semibold"
                >
                  <FaSignOutAlt /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg font-semibold"
                >
                  <FaUser /> Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 text-3xl hover:text-indigo-600 transition-colors"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-3/4 h-full shadow-2xl p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-indigo-600">
              <FaHome /> Home
            </Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-indigo-600">
              <FaBoxOpen /> Products
            </Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-indigo-600">
              <FaShoppingCart /> Cart {cart.length > 0 && `(${cart.length})`}
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center gap-3 text-lg font-semibold text-red-600">
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-semibold text-indigo-600">
                <FaUser /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
