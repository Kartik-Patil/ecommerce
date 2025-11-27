import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaHome, FaTruck, FaBox } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderNumber] = useState(Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    // Multiple confetti bursts
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 w-full max-w-2xl animate-fade-in-up">
        {/* Glow Effect Behind Card */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl blur-3xl opacity-50 animate-glow"></div>

        {/* Premium Success Card */}
        <div className="relative glass-panel backdrop-blur-2xl rounded-3xl shadow-premium-lg p-12 border-2 border-white/30 text-center">
          {/* Success Icon with Animation */}
          <div className="inline-block relative mb-8">
            <div className="absolute inset-0 bg-green-400 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 p-8 rounded-full shadow-premium-lg animate-bounce">
              <FaCheckCircle className="text-white text-8xl" />
            </div>
          </div>

          {/* Success Title */}
          <h1 className="text-6xl font-black text-white mb-4 flex items-center justify-center gap-3">
            Order Placed!
            <HiSparkles className="text-yellow-300 text-5xl animate-pulse" />
          </h1>

          <p className="text-white/90 text-2xl font-semibold mb-8 leading-relaxed">
            🎉 Thank you for your purchase!<br />
            Your order will be delivered soon.
          </p>

          {/* Order Details Card */}
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 mb-8 border-2 border-white/30">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-white">
                <span className="font-semibold text-lg flex items-center gap-2">
                  <FaBox />
                  Order Number:
                </span>
                <span className="font-black text-2xl">#{orderNumber}</span>
              </div>
              
              <div className="border-t-2 border-white/30 pt-4">
                <div className="flex items-center justify-center gap-3 text-white/90">
                  <FaTruck className="text-2xl animate-bounce" />
                  <span className="text-lg font-semibold">
                    Estimated Delivery: 3-5 Business Days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="glass-panel-dark backdrop-blur-xl rounded-2xl p-6 mb-8">
            <p className="text-white font-bold text-lg mb-2">
              ✉️ Confirmation Email Sent
            </p>
            <p className="text-white/80 text-sm">
              Check your inbox for order details and tracking information
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/products')}
              className="relative w-full bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-xl shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all flex items-center justify-center gap-3 btn-premium overflow-hidden"
            >
              <span className="relative flex items-center gap-3">
                <FaShoppingBag className="text-2xl" />
                Continue Shopping
              </span>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full glass-panel backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all flex items-center justify-center gap-3"
            >
              <FaHome />
              Back to Home
            </button>
          </div>

          {/* Support Message */}
          <div className="mt-8 pt-6 border-t-2 border-white/30">
            <p className="text-white/80 text-sm font-medium">
              Need help? Contact our 24/7 support team
            </p>
            <p className="text-white font-bold mt-2">
              📧 support@shophub.com | 📞 1-800-SHOP-HUB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
