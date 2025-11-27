import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg transform hover:scale-105 transition-transform duration-300">
        <div className="mb-8">
          <div className="inline-block bg-green-100 p-6 rounded-full mb-4 animate-bounce">
            <FaCheckCircle className="text-green-500 text-8xl" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Thank you for your purchase! 🎉<br />
            Your order will be delivered soon.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
          <p className="text-gray-700 font-semibold mb-2">Order confirmation sent to your email</p>
          <p className="text-sm text-gray-600">Track your order from your dashboard</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/products')}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <FaShoppingBag /> Continue Shopping
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Back to Home
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          Need help? Contact our support team 24/7
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
