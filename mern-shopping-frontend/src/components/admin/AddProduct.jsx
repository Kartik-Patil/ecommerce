import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../utils/api';
import { FaArrowLeft, FaImage, FaCloudUploadAlt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct(formData);
      navigate('/admin/manage-products');
    } catch (error) {
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '1s'}}></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 glass-panel backdrop-blur-xl px-6 py-3 rounded-2xl text-indigo-600 hover:text-indigo-800 font-bold shadow-lg hover:shadow-glow transition-all mb-8 animate-fade-in-up"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        {/* Premium Form Card */}
        <div className="glass-panel backdrop-blur-2xl rounded-3xl shadow-premium-lg p-10 border-2 border-white/40 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-10 pb-8 border-b-2 border-white/40">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-glow">
              <FaCloudUploadAlt className="text-white text-4xl" />
            </div>
            <div>
              <h2 className="text-4xl font-black gradient-text flex items-center gap-2">
                Add New Product
                <HiSparkles className="text-yellow-500 text-2xl animate-pulse" />
              </h2>
              <p className="text-gray-600 font-medium mt-1">Fill in the details to create a new product</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Name & Price */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-md transition-opacity duration-300 ${
                  focusedField === 'name' ? 'opacity-30' : 'opacity-0'
                }`}></div>
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:bg-white text-gray-800 placeholder-gray-500 font-medium transition-all shadow-lg focus:shadow-glow outline-none"
                    placeholder="iPhone 14 Pro"
                  />
                </div>
              </div>

              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-md transition-opacity duration-300 ${
                  focusedField === 'price' ? 'opacity-30' : 'opacity-0'
                }`}></div>
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    onFocus={() => setFocusedField('price')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:bg-white text-gray-800 placeholder-gray-500 font-medium transition-all shadow-lg focus:shadow-glow outline-none"
                    placeholder="999"
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-md transition-opacity duration-300 ${
                focusedField === 'category' ? 'opacity-30' : 'opacity-0'
              }`}></div>
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  onFocus={() => setFocusedField('category')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:bg-white text-gray-800 font-medium transition-all shadow-lg focus:shadow-glow outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home & Kitchen</option>
                  <option value="Books">Books</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-md transition-opacity duration-300 ${
                focusedField === 'description' ? 'opacity-30' : 'opacity-0'
              }`}></div>
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  rows="5"
                  className="w-full px-5 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:bg-white text-gray-800 placeholder-gray-500 font-medium transition-all shadow-lg focus:shadow-glow outline-none resize-none"
                  placeholder="Enter detailed product description..."
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">Product Image</label>
              <div className="flex flex-col gap-6">
                <label className="group cursor-pointer">
                  <div className="glass-panel backdrop-blur-xl rounded-2xl p-8 border-2 border-dashed border-indigo-300 hover:border-indigo-500 transition-all text-center">
                    <div className="inline-block bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-2xl shadow-lg group-hover:scale-110 transition-transform mb-4">
                      <FaImage className="text-white text-5xl" />
                    </div>
                    <p className="text-gray-700 font-bold text-lg mb-2">Click to upload image</p>
                    <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                
                {/* Image Preview */}
                {preview && (
                  <div className="relative group animate-fade-in-up">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative glass-panel backdrop-blur-xl rounded-2xl p-4 border-2 border-white/40">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-80 object-cover rounded-xl shadow-premium" 
                      />
                      <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                        ✓ Image Uploaded
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-black text-xl shadow-premium-lg hover:shadow-glow transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-premium overflow-hidden"
            >
              <span className="relative">
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Product...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaCloudUploadAlt className="text-2xl" />
                    Add Product
                  </span>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
