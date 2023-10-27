const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Create a new cart
router.post('/', cartController.createCart);

// Get all carts
router.get('/', cartController.getCarts);

// Get a single cart
router.get('/:cart_uid', cartController.getCarts);

// Update a cart
router.put('/:id', cartController.updateCart);

// Delete a cart
router.delete('/:id', cartController.deleteCart);

module.exports = router;