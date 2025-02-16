const express = require('express');
const ratingsController = require('../controllers/ratingsController');
const router = express.Router();

router.post('/add', ratingsController.addRating);
router.get('/:restaurantId', ratingsController.getRatingsByRestaurant);
router.post('/add-dish', ratingsController.addDishRating);
router.get('/:dishId', ratingsController.getRatingsByDish);

module.exports = router;
