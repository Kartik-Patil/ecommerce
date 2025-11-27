import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaBoxes, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/admin/add-product"
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 text-white hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            <FaPlus className="text-5xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">Add New Product</h2>
            <p className="text-green-100">Create and upload new products to the store</p>
          </Link>

          <Link
            to="/admin/manage-products"
            className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            <FaBoxes className="text-5xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">Manage Products</h2>
            <p className="text-blue-100">View, edit, and delete existing products</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
