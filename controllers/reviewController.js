const Review = require('../models/reviews');

// Add a new review for a restaurant
exports.addReview = async (req, res) => {
  try {
    const { userId, restaurantId, content } = req.body;

    if (!userId || !restaurantId || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newReview = await Review.create({
      userId,
      restaurantId,
      content,
    });

    res.status(201).json({
      message: 'Review added successfully',
      data: newReview,
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all reviews for a restaurant
exports.getReviewsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    const reviews = await Review.findAll({ where: { restaurantId } });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new review for a dish
exports.addDishReview = async (req, res) => {
  try {
    const { userId, dishId, content } = req.body;

    if (!userId || !dishId || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newReview = await Review.create({
      userId,
      dishId,
      content,
    });

    res.status(201).json({
      message: 'Dish review added successfully',
      data: newReview,
    });
  } catch (error) {
    console.error('Error adding dish review:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all reviews for a dish
exports.getReviewsByDish = async (req, res) => {
  try {
    const { dishId } = req.params;

    if (!dishId) {
      return res.status(400).json({ error: 'Dish ID is required' });
    }

    const reviews = await Review.findAll({ where: { dishId } });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching dish reviews:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

