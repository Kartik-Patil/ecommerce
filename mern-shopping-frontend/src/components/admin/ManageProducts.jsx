import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaSpinner, FaPlus } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from backend on component mount
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
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setDeletingId(id);
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
        
        // Show success message
        const successToast = document.createElement('div');
        successToast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
        successToast.textContent = '✓ Product deleted successfully';
        document.body.appendChild(successToast);
        setTimeout(() => successToast.remove(), 3000);
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete product. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
        <div className="text-center animate-fade-in-up">
          <div className="inline-block glass-panel backdrop-blur-xl px-12 py-16 rounded-3xl shadow-premium-lg">
            <FaSpinner className="text-6xl text-indigo-600 animate-spin mb-4 mx-auto" />
            <p className="text-2xl font-black gradient-text">Loading Products...</p>
            <p className="text-gray-600 mt-2">Please wait while we fetch your products</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 glass-panel backdrop-blur-xl px-6 py-3 rounded-2xl text-indigo-600 hover:text-indigo-800 font-bold shadow-lg hover:shadow-glow transition-all mb-8"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>

          <div className="flex items-center justify-center py-20">
            <div className="text-center animate-fade-in-up">
              <div className="inline-block glass-panel backdrop-blur-xl px-12 py-16 rounded-3xl shadow-premium-lg">
                <div className="text-8xl mb-6">⚠️</div>
                <h3 className="text-4xl font-black gradient-text mb-4">Error Loading Products</h3>
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header with Actions */}
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 glass-panel backdrop-blur-xl px-6 py-3 rounded-2xl text-indigo-600 hover:text-indigo-800 font-bold shadow-lg hover:shadow-glow transition-all"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>

          <button
            onClick={() => navigate('/admin/add-product')}
            className="relative flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-glow transition-all transform hover:scale-105 btn-premium overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600"></div>
            <span className="relative flex items-center gap-2 text-white">
              <FaPlus /> Add Product
            </span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="inline-flex items-center gap-2 glass-panel px-6 py-3 rounded-full mb-4 backdrop-blur-xl">
            <HiSparkles className="text-yellow-500 animate-pulse" />
            <span className="font-bold text-gray-700 text-sm">Product Management</span>
          </div>
          <h2 className="text-6xl font-black gradient-text mb-4">Manage Products</h2>
          <p className="text-gray-600 text-lg font-medium">
            Currently managing <span className="font-black text-indigo-600">{products.length}</span> product{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="glass-panel backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-premium-lg transition-all duration-500 border-2 border-white/40 hover:border-indigo-300 card-hover-lift animate-fade-in-up"
                style={{animationDelay: `${0.2 + (index * 0.05)}s`}}
              >
                {/* Image with Glow */}
                <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={product.image || 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400?text=No+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 glass-panel-dark backdrop-blur-xl px-4 py-2 rounded-full">
                    <span className="text-white text-xs font-bold">{product.category}</span>
                  </div>

                  {/* Rating Badge */}
                  {product.rating && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-black text-gray-800 line-clamp-1 hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Price & Actions */}
                  <div className="flex justify-between items-center pt-4 border-t-2 border-white/40">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Price</p>
                      <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className="relative flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-glow transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed btn-premium overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500"></div>
                      <span className="relative flex items-center gap-2 text-white">
                        {deletingId === product._id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <FaTrash />
                            Delete
                          </>
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Stock Info */}
                  {product.stock !== undefined && (
                    <div className={`text-center py-2 rounded-xl font-bold text-sm ${
                      product.stock > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </div>
                  )}

                  {/* Created Date */}
                  {product.createdAt && (
                    <div className="text-center text-xs text-gray-500 pt-2">
                      Added on {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && !loading && !error && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="inline-block glass-panel backdrop-blur-xl px-16 py-20 rounded-3xl shadow-premium-lg">
              <div className="text-8xl mb-6 animate-float">📦</div>
              <h3 className="text-4xl font-black gradient-text mb-4">No Products Available</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Your product inventory is empty. Start by adding your first product to the store!
              </p>
              <button
                onClick={() => navigate('/admin/add-product')}
                className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all btn-premium overflow-hidden"
              >
                <span className="relative flex items-center justify-center gap-2">
                  <FaPlus /> Add First Product
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
