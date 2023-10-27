const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const deductFromStock = require('../helpers/deductFromStock')
// Create a new cart
exports.createCart = async (req, res) => {
    try {
        const { product_id, quantity, cart_uid } = req.body;
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }
        const cart = new Cart({
            product: product._id,
            quantity,
            cart_uid,
            total_price: product.price * quantity // calculate total price
        });
        await deductFromStock(product_id, quantity); // call the function to deduct from stock
        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all carts
exports.getCarts = async (req, res) => {
    try {
        const carts = await Cart.find({ cart_uid: req.params.cart_uid }).populate('product');
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a cart
exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a cart
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};