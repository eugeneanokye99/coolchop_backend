const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// Routes for managing orders
router.get('/get', OrderController.getAllOrders); 
router.get('/orders/:orderId', OrderController.getOrderById); 
router.post('/save', OrderController.createOrder); 
router.put('/orders/:orderId', OrderController.updateOrder); 
router.delete('/orders/:orderId', OrderController.deleteOrder); 


module.exports = router;
