import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../../utils/api';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signupUser(formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Email may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Glow Effect Behind Card */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur-2xl opacity-40 animate-glow"></div>

        {/* Premium Signup Card */}
        <div className="relative glass-panel backdrop-blur-2xl rounded-3xl shadow-premium-lg p-10 border-2 border-white/30">
          {/* Logo Section */}
          <div className="text-center mb-10">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-pink-600 to-purple-600 p-5 rounded-3xl shadow-glow">
                <FaUser className="text-white text-5xl" />
              </div>
            </div>
            
            <h2 className="text-5xl font-black text-white mt-6 mb-3 flex items-center justify-center gap-2">
              Create Account
              <HiSparkles className="text-yellow-300 text-3xl animate-pulse" />
            </h2>
            <p className="text-white/80 text-lg font-medium">Join our premium shopping community</p>
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
            {/* Name Field */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-md transition-opacity duration-300 ${
                focusedField === 'name' ? 'opacity-40' : 'opacity-0'
              }`}></div>
              
              <div className="relative">
                <label className="block text-white/90 text-sm font-bold mb-2 flex items-center gap-2">
                  <FaUser className="text-pink-300" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-white/50 focus:border-white focus:bg-white text-gray-800 placeholder-gray-500 font-medium transition-all shadow-lg focus:shadow-glow outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-md transition-opacity duration-300 ${
                focusedField === 'email' ? 'opacity-40' : 'opacity-0'
              }`}></div>
              
              <div className="relative">
                <label className="block text-white/90 text-sm font-bold mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-purple-300" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-white/50 focus:border-white focus:bg-white text-gray-800 placeholder-gray-500 font-medium transition-all shadow-lg focus:shadow-glow outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl blur-md transition-opacity duration-300 ${
                focusedField === 'password' ? 'opacity-40' : 'opacity-0'
              }`}></div>
              
              <div className="relative">
                <label className="block text-white/90 text-sm font-bold mb-2 flex items-center gap-2">
                  <FaLock className="text-indigo-300" />
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
              className="relative w-full bg-white text-pink-600 py-5 rounded-2xl font-black text-xl shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-premium overflow-hidden"
            >
              <span className="relative">
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </span>
                ) : (
                  'Sign Up'
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/80 font-semibold">or</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-white/90 text-lg font-medium">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-white font-black hover:text-yellow-300 transition-colors underline decoration-2 underline-offset-4 hover:scale-105 inline-block"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-white/70 hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-2 hover:gap-3"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
