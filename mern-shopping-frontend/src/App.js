import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AddProduct from './components/admin/AddProduct';
import ManageProducts from './components/admin/ManageProducts';

// Customer Components
import Navbar from './components/customer/Navbar';
import Login from './components/customer/Login';
import Signup from './components/customer/Signup';
import Products from './components/customer/Products';
import Cart from './components/customer/Cart';
import OrderSuccess from './components/customer/OrderSuccess';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/manage-products" element={<ManageProducts />} />

          {/* Customer Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<><Navbar /><Products /></>} />
          <Route path="/products" element={<><Navbar /><Products /></>} />
          <Route path="/cart" element={<><Navbar /><Cart /></>} />
          <Route path="/order-success" element={<><Navbar /><OrderSuccess /></>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
