import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {cart.map(item => (
            <div key={item._id} className="flex items-center gap-6 py-6 border-b last:border-b-0">
              <img
                src={item.image || 'https://via.placeholder.com/150'}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-all"
                >
                  <FaMinus />
                </button>
                <span className="text-xl font-bold w-12 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-all"
                >
                  <FaPlus />
                </button>
              </div>

              <p className="text-2xl font-bold text-indigo-600 w-32 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-800">Total:</span>
              <span className="text-4xl font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
