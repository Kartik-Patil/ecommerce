const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: 0
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['Electronics', 'Fashion', 'Home', 'Books', 'Sports']
  },
  image: {
    type: String,
    required: [true, 'Please provide product image']
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  stock: {
    type: Number,
    default: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
