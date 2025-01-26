const express = require('express');
const reviewsController = require('../controllers/reviewController');
const router = express.Router();

router.post('/add', reviewsController.addReview);
router.get('/:restaurantId', reviewsController.getReviewsByRestaurant);
router.post('/add-dish', reviewsController.addDishReview);
router.get('/:dishId', reviewsController.getReviewsByDish);

module.exports = router;
