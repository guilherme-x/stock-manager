const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    cart_uid: {
        type: String,
        required: true,
        trim: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    total_price: {
        type: Number,
        required: true,
        min: 0,
    },
    active: {
        type: Boolean,
        default: true
    }
})
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;