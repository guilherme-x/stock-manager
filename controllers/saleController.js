const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Sale = require('../models/saleModel');

exports.createSale = async (req, res) => {
    try {
        const params = req.body
    
        
        
        const { cart_uid, discount, payment_method } = req.body;
        const saleExists = await Sale.exists({ cart_uid })
        if (saleExists) {
            return res.status(400).json({ message: 'Sale already exists' });
        }
        const cart = await Cart.find({ cart_uid })
        const totalAmount = cart.reduce((acc, curr) => acc + curr.total_price, 0);
        const sale = new Sale({
            cart_uid,
            discount,
            payment_method,
            total_amount: totalAmount
        });
        await sale.save();
        res.status(201).json(sale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getAllSales = async (req, res) => {
    try {
        const params = req.body
        const sales = await Sale.paginate(params);
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};