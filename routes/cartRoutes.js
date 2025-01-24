const express = require('express');
const { addToCart, getCart, removeFromCart, updateCartQuantity } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addToCart);
router.get('/get', getCart);
router.delete('/remove', removeFromCart);
router.put('/update-quantity', updateCartQuantity); 

module.exports = router;
