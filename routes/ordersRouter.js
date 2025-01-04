const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// Routes for managing orders
router.get('/orders', OrderController.allDishes);
router.get('/orders/:id', OrderController.allDishesById);
router.post('/orders', OrderController.createDish);
router.put('/orders/:id', OrderController.updateDish);
router.delete('/orders/:id', OrderController.deleteDish);
router.get('/orders/customer/:customerId', OrderController.ordersByCustomer); //


module.exports = router;
