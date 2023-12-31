const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  barcode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
productSchema.plugin(mongoosePaginate)
     
const Product = mongoose.model('Product', productSchema);
Product.paginate().then({});

module.exports = Product;
