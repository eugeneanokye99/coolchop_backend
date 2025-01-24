
const Restaurant = require('../models/Restaurant'); 
const Dish = require('../models/Dish'); 
const Rating = require('../models/Ratings'); 
const { decrypt } = require('../utils/encryption');

// Add a new rating or update an existing one
exports.addRating = async (req, res) => {
  try {
    const { userId, restaurantId, rating, userRating } = req.body;

    if (!userId || !restaurantId || rating === undefined || userRating === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Decrypt user ID
    const decryptedUserId = await decrypt(userId.toString());

    // Check if a rating already exists for this user and restaurant
    const existingRating = await Rating.findOne({
      where: { userId: decryptedUserId, restaurantId },
    });

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      existingRating.userRating = userRating;
      await existingRating.save();
    } else {
      // Create a new rating
      await Rating.create({
        userId: decryptedUserId,
        restaurantId,
        rating,
        userRating,
      });
    }

    // Fetch all ratings for this restaurant
    const allRatings = await Rating.findAll({
      where: { restaurantId },
    });

    // Calculate the new average rating
    const totalRatings = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRatings / allRatings.length;

    // Update the restaurant's average rating
    await Restaurant.update(
      {
        ratings: parseFloat(averageRating.toFixed(1)),
      },
      { where: { id: restaurantId } }
    );

    res.status(200).json({
      message: 'Rating added or updated successfully and restaurant updated',
    });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all ratings for a restaurant
exports.getRatingsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    const ratings = await Rating.findAll({ where: { restaurantId } });

    res.status(200).json({ ratings });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Add or update a rating for a dish
exports.addDishRating = async (req, res) => {
  try {
    const { userId, dishId, rating, userRating } = req.body;

    if (!userId || !dishId || rating === undefined || userRating === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Decrypt user ID
    const decryptedUserId = await decrypt(userId.toString());

    // Check if a rating already exists for this user and dish
    const existingRating = await Rating.findOne({
      where: { userId: decryptedUserId, dishId },
    });

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      existingRating.userRating = userRating;
      await existingRating.save();
    } else {
      // Create a new rating
      await Rating.create({
        userId: decryptedUserId,
        dishId,
        rating,
        userRating,
      });
    }

    // Fetch all ratings for this dish
    const allDishRatings = await Rating.findAll({
      where: { dishId },
    });

    // Calculate the new average rating for the dish
    const totalDishRatings = allDishRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageDishRating = totalDishRatings / allDishRatings.length;

    // Update the dish's average rating
    await Dish.update(
      {
        ratings: parseFloat(averageDishRating.toFixed(1)),
      },
      { where: { id: dishId } }
    );

    res.status(200).json({
      message: 'Dish rating added or updated successfully',
    });
  } catch (error) {
    console.error('Error adding dish rating:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all ratings for a dish
exports.getRatingsByDish = async (req, res) => {
  try {
    const { dishId } = req.params;

    if (!dishId) {
      return res.status(400).json({ error: 'Dish ID is required' });
    }

    const ratings = await Rating.findAll({ where: { dishId } });

    res.status(200).json({ ratings });
  } catch (error) {
    console.error('Error fetching dish ratings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};