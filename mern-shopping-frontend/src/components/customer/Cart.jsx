import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowRight, FaLock, FaTruck } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { createOrder } from '../../utils/api';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      await createOrder({ items: cart, total: totalPrice });
      clearCart();
      navigate('/order-success');
    } catch (error) {
      alert('Please login to place order');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>

        <div className="text-center relative z-10 animate-fade-in-up">
          <div className="inline-block glass-panel px-16 py-20 rounded-3xl backdrop-blur-xl shadow-premium-lg">
            <div className="text-9xl mb-8 animate-float">🛒</div>
            <h2 className="text-5xl font-black gradient-text mb-6">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-10 text-xl max-w-md mx-auto leading-relaxed">
              Start adding products to your cart and enjoy premium shopping!
            </p>
            <button
              onClick={() => navigate('/products')}
              className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all flex items-center gap-3 mx-auto btn-premium overflow-hidden"
            >
              <span className="relative flex items-center gap-3">
                <FaShoppingBag className="text-2xl" />
                Start Shopping
                <HiSparkles className="text-yellow-300" />
              </span>
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
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass-panel px-6 py-3 rounded-full mb-4 backdrop-blur-xl">
            <HiSparkles className="text-yellow-500 animate-pulse" />
            <span className="font-bold text-gray-700 text-sm">Secure Checkout</span>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Shopping Cart
          </h1>
          <p className="text-gray-700 text-lg font-medium">Review your items before checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items - Premium Cards */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div 
                key={item._id} 
                className="glass-panel backdrop-blur-xl rounded-3xl p-6 hover:shadow-premium-lg transition-all duration-500 border-2 border-white/40 hover:border-indigo-300 card-hover-lift animate-fade-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center gap-6">
                  {/* Product Image with Glow */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-40"></div>
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt={item.name}
                      className="relative w-32 h-32 object-cover rounded-2xl shadow-premium"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-800 mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-xl">
                      <span className="text-indigo-700 font-bold text-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Total</p>
                      <p className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Premium Quantity Selector */}
                    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-glow transform hover:scale-110"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-2xl font-black text-gray-800 w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-glow transform hover:scale-110"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-glow font-bold transform hover:scale-105"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Order Summary - Sticky Glassmorphic Panel */}
          <div className="lg:col-span-1">
            <div className="glass-panel backdrop-blur-2xl rounded-3xl p-8 sticky top-24 border-2 border-white/40 shadow-premium-lg animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              {/* Header with Icon */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-white/50">
                <h2 className="text-3xl font-black gradient-text">Order Summary</h2>
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <FaShoppingBag className="text-white text-xl" />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-5 mb-8">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">Items ({cart.length})</span>
                  <span className="font-black text-lg">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold flex items-center gap-2">
                    <FaTruck className="text-green-500" />
                    Shipping
                  </span>
                  <span className="font-black text-green-600 text-lg">FREE</span>
                </div>
                
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-semibold">Tax (estimated)</span>
                  <span className="font-black text-lg">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                
                {/* Total with Premium Styling */}
                <div className="glass-panel-dark backdrop-blur-xl rounded-2xl p-6 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">Grand Total</span>
                    <span className="text-5xl font-black text-white">
                      ${(totalPrice * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-2xl font-black text-xl shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all flex items-center justify-center gap-3 mb-6 btn-premium overflow-hidden"
              >
                <span className="relative flex items-center gap-3">
                  Place Order
                  <FaArrowRight className="text-2xl" />
                </span>
              </button>

              {/* Security Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <FaLock className="text-green-500" />
                  <span className="font-semibold">Secure checkout guaranteed</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <FaTruck className="text-blue-500" />
                  <span className="font-semibold">Free shipping on all orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
