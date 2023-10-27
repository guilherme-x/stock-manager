const Product = require('../models/productModel');

async function deductFromStock(productId, quantity) {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.quantity < quantity) {
      throw new Error('Insufficient stock');
    }
    product.quantity -= quantity;
    await product.save();
  } catch (err) {
    throw err;
  }
}

module.exports = deductFromStock;