import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../utils/api';
import { FaShieldAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await adminLogin(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', 'admin');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Glow Effect Behind Card */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-40 animate-glow"></div>

        {/* Premium Admin Login Card */}
        <div className="relative glass-panel backdrop-blur-2xl rounded-3xl shadow-premium-lg p-10 border-2 border-white/30">
          {/* Logo Section */}
          <div className="text-center mb-10">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-5 rounded-3xl shadow-glow">
                <FaShieldAlt className="text-white text-5xl" />
              </div>
            </div>
            
            <h2 className="text-5xl font-black text-white mt-6 mb-3 flex items-center justify-center gap-2">
              Admin Portal
              <HiSparkles className="text-yellow-300 text-3xl animate-pulse" />
            </h2>
            <p className="text-white/80 text-lg font-medium">Secure access to management dashboard</p>
          </div>

          {/* Security Badge */}
          <div className="glass-panel-dark backdrop-blur-xl rounded-2xl p-4 mb-6 text-center">
            <p className="text-white text-sm font-bold flex items-center justify-center gap-2">
              🔒 Secure Admin Authentication
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400 text-white px-5 py-4 rounded-2xl mb-6 animate-shake shadow-lg">
              <p className="font-bold flex items-center gap-2">
                ❌ {error}
              </p>
            </div>
          )}

          {/* Premium Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-md transition-opacity duration-300 ${
                focusedField === 'email' ? 'opacity-40' : 'opacity-0'
              }`}></div>
              
              <div className="relative">
                <label className="block text-white/90 text-sm font-bold mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-indigo-300" />
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-white/50 focus:border-white focus:bg-white text-gray-800 placeholder-gray-500 font-medium transition-all shadow-lg focus:shadow-glow outline-none"
                  placeholder="admin@shophub.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-md transition-opacity duration-300 ${
                focusedField === 'password' ? 'opacity-40' : 'opacity-0'
              }`}></div>
              
              <div className="relative">
                <label className="block text-white/90 text-sm font-bold mb-2 flex items-center gap-2">
                  <FaLock className="text-purple-300" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-white/50 focus:border-white focus:bg-white text-gray-800 placeholder-gray-500 font-medium transition-all shadow-lg focus:shadow-glow outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Premium Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full bg-white text-indigo-600 py-5 rounded-2xl font-black text-xl shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-premium overflow-hidden"
            >
              <span className="relative">
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaShieldAlt />
                    Sign In to Dashboard
                  </span>
                )}
              </span>
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 text-center">
            <p className="text-white/70 text-xs font-medium">
              Protected by enterprise-grade encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
