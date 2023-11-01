const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    total_amount: {
        type: Number,
        required: true,
        min: 0,
    },
    cart_uid: {
        type: String,
        required: true,
        trim: true,
    },
    discount: {
        type: Number,
        required: false,
        min: 0,
    },
    payment_method: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;