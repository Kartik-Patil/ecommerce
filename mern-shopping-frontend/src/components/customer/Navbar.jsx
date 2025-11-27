import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHome, FaBoxOpen, FaBars, FaTimes } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-panel shadow-premium' 
          : 'bg-white/95 backdrop-blur-xl'
      } border-b-2 border-transparent bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Premium Logo with Sparkle Animation */}
            <Link to="/" className="flex items-center gap-3 group relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-3 rounded-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-glow">
                  <FaBoxOpen className="text-white text-2xl" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  ShopHub
                </span>
                <span className="text-xs text-gray-500 font-medium -mt-1 flex items-center gap-1">
                  <HiSparkles className="text-yellow-500 text-xs" />
                  Premium Shopping
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              <Link 
                to="/" 
                className={`flex items-center gap-2 font-semibold relative group transition-all ${
                  isActive('/') || isActive('/products')
                    ? 'text-indigo-600' 
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <FaHome className="text-lg" />
                <span>Home</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ${
                  isActive('/') || isActive('/products') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              <Link 
                to="/products" 
                className={`flex items-center gap-2 font-semibold relative group transition-all ${
                  isActive('/products')
                    ? 'text-indigo-600' 
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <FaBoxOpen className="text-lg" />
                <span>Products</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ${
                  isActive('/products') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>

              {/* Premium Animated Cart Icon */}
              <Link 
                to="/cart" 
                className="relative group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-lg group-hover:bg-indigo-500/40 transition-all duration-300"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-all">
                    <FaShoppingCart className="text-2xl text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse-glow shadow-lg">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Premium Auth Buttons */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="relative flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden group btn-premium font-semibold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500"></div>
                  <div className="relative flex items-center gap-2 text-white">
                    <FaSignOutAlt />
                    Logout
                  </div>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="relative flex items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden group btn-premium font-semibold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  <div className="relative flex items-center gap-2 text-white">
                    <FaUser />
                    Login
                  </div>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 text-3xl hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-xl"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Cart Badge (Fixed) */}
        {cart.length > 0 && (
          <Link 
            to="/cart" 
            className="md:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-16 h-16 rounded-full shadow-premium-lg flex items-center justify-center animate-float"
          >
            <FaShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
              {cart.length}
            </span>
          </Link>
        )}
      </nav>

      {/* Premium Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-md animate-fade-in" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="bg-white w-3/4 max-w-sm h-full shadow-premium-lg p-8 space-y-6 animate-slide-in" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center pb-6 border-b border-gray-200">
              <div className="inline-block bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl mb-3">
                <FaBoxOpen className="text-white text-3xl" />
              </div>
              <h2 className="text-2xl font-black gradient-text">ShopHub</h2>
            </div>

            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center gap-4 text-lg font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 p-3 rounded-xl transition-all"
            >
              <FaHome className="text-xl" /> Home
            </Link>
            <Link 
              to="/products" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center gap-4 text-lg font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 p-3 rounded-xl transition-all"
            >
              <FaBoxOpen className="text-xl" /> Products
            </Link>
            <Link 
              to="/cart" 
              onClick={() => setMobileMenuOpen(false)} 
              className="flex items-center gap-4 text-lg font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 p-3 rounded-xl transition-all"
            >
              <FaShoppingCart className="text-xl" /> Cart {cart.length > 0 && `(${cart.length})`}
            </Link>
            
            {isLoggedIn ? (
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-4 text-lg font-semibold text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all w-full"
              >
                <FaSignOutAlt className="text-xl" /> Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center gap-4 text-lg font-semibold text-indigo-600 hover:bg-indigo-50 p-3 rounded-xl transition-all"
              >
                <FaUser className="text-xl" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
