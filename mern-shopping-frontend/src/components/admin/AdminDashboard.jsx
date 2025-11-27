import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaBoxes, FaSignOutAlt, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '1s'}}></div>

      {/* Premium Header */}
      <header className="relative glass-panel backdrop-blur-xl shadow-premium-lg border-b-2 border-white/40 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-glow">
                <FaShieldAlt className="text-white text-3xl" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                  Admin Dashboard
                  <HiSparkles className="text-yellow-500 text-2xl" />
                </h1>
                <p className="text-gray-600 font-medium">Manage your store with ease</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="relative flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-glow transition-all transform hover:scale-105 btn-premium overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500"></div>
              <span className="relative flex items-center gap-2 text-white">
                <FaSignOutAlt />
                Logout
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel backdrop-blur-xl rounded-3xl p-8 border-2 border-white/40 shadow-premium hover:shadow-premium-lg transition-all animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl shadow-lg">
                <FaChartLine className="text-white text-3xl" />
              </div>
              <span className="text-5xl font-black gradient-text">1,234</span>
            </div>
            <h3 className="text-lg font-bold text-gray-700">Total Sales</h3>
            <p className="text-green-600 font-semibold text-sm mt-1">↗ +12.5% this month</p>
          </div>

          <div className="glass-panel backdrop-blur-xl rounded-3xl p-8 border-2 border-white/40 shadow-premium hover:shadow-premium-lg transition-all animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-4 rounded-2xl shadow-lg">
                <FaBoxes className="text-white text-3xl" />
              </div>
              <span className="text-5xl font-black gradient-text">58</span>
            </div>
            <h3 className="text-lg font-bold text-gray-700">Products</h3>
            <p className="text-blue-600 font-semibold text-sm mt-1">Across 5 categories</p>
          </div>

          <div className="glass-panel backdrop-blur-xl rounded-3xl p-8 border-2 border-white/40 shadow-premium hover:shadow-premium-lg transition-all animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-4 rounded-2xl shadow-lg">
                <FaUsers className="text-white text-3xl" />
              </div>
              <span className="text-5xl font-black gradient-text">892</span>
            </div>
            <h3 className="text-lg font-bold text-gray-700">Customers</h3>
            <p className="text-purple-600 font-semibold text-sm mt-1">↗ +8.2% new users</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/admin/add-product"
            className="group relative overflow-hidden rounded-3xl shadow-premium-lg hover:shadow-glow transition-all transform hover:scale-105 card-hover-lift animate-fade-in-up"
            style={{animationDelay: '0.3s'}}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600"></div>
            <div className="relative p-10 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <FaPlus className="text-6xl" />
                </div>
                <HiSparkles className="text-yellow-300 text-4xl animate-pulse" />
              </div>
              <h2 className="text-4xl font-black mb-3">Add New Product</h2>
              <p className="text-green-100 text-lg font-medium leading-relaxed">
                Create and upload new products to your store catalog
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-bold">
                Get Started →
              </div>
            </div>
          </Link>

          <Link
            to="/admin/manage-products"
            className="group relative overflow-hidden rounded-3xl shadow-premium-lg hover:shadow-glow transition-all transform hover:scale-105 card-hover-lift animate-fade-in-up"
            style={{animationDelay: '0.4s'}}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600"></div>
            <div className="relative p-10 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <FaBoxes className="text-6xl" />
                </div>
                <HiSparkles className="text-yellow-300 text-4xl animate-pulse" />
              </div>
              <h2 className="text-4xl font-black mb-3">Manage Products</h2>
              <p className="text-blue-100 text-lg font-medium leading-relaxed">
                View, edit, and delete existing products in your inventory
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-bold">
                View All →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
