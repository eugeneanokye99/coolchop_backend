const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addToCart);
router.get('/get', getCart);
router.delete('/remove', removeFromCart);

module.exports = router;
