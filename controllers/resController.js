const Restaurant = require('../models/Restaurant');
const Dish = require('../models/Dish');
const bcrypt = require('bcryptjs');
const { encrypt, decrypt } = require('../utils/encryption');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to generate a unique restaurant ID
const generateRestaurantId = (restaurantName) => {
  // Split the restaurant name into words
  const nameParts = restaurantName.split(' ');
  
  const nameInitials = nameParts.map(word => word.charAt(0).toUpperCase()).join('');

  const randomNumber = Math.floor(1000 + Math.random() * 9000).toString();

  return nameInitials + randomNumber;
};
  
  
  
// Function to send verification email
const sendEmail = async (email, restaurantId) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Restaurant Id',
      text: `Your Restaurant Id is: ${restaurantId}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
  
    } catch (error) {
      console.error('Error sending  email:', error);
    }
};
  


// Login function
exports.login = async (req, res) => {
  try {
    const { restaurantId, longitude, latitude } = req.body;

    // Check if user exists
    const restaurant = await Restaurant.findOne({ where: { restaurantId } });

    if (!restaurant) {
      return res.status(400).json({ error: 'Invalid id ' });
    }



    await restaurant.update({
      longitude,
      latitude 
    });


  
    //encrypt restaurant id
    const res_id = await encrypt(restaurant.id.toString());

    // If login is successful, return restaurant data
    res.status(200).json({
      message: 'Login successful',
      restaurant: {
        id: res_id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};




// Signup function
exports.addRestaurant = async (req, res) => {
  try {
    const { restaurantName, email, phone, address, description, profileImage } = req.body;

    if (!restaurantName || !email || !phone || !address || !profileImage ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email is already registered
    const existingUser = await Restaurant.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }


    const restaurantId = generateRestaurantId(restaurantName);

    // Send restaurant id via email
    await sendEmail(email, restaurantId);

    const restaurant = await Restaurant.create({
      restaurantId,
      restaurantName,
      email,
      phone,
      address,
      description,
      profileImage,
    });



    res.status(201).json({
      message: 'Restaurant registered successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};


exports.createDishes = async (req, res) => {
  const { dishes } = req.body;

  if (!dishes || !Array.isArray(dishes)) {
    return res.status(400).json({ message: 'Invalid input, dishes must be an array' });
  }

  try {

    const updatedDishes = await Promise.all(
      dishes.map(async (dish) => {
      if (!dish.restaurantId) {
        throw new Error('Missing restaurantId in dish');
      }
      const decryptedRestaurantId = await decrypt(dish.restaurantId.toString());
      return { ...dish, restaurantId: decryptedRestaurantId };
    })
    );



    // Save all dishes
    const createdDishes = await Dish.bulkCreate(updatedDishes);

    res.status(201).json({
      message: 'Dishes saved successfully',
    });
  } catch (error) {
    console.error('Error saving dishes:', error);
    res.status(500).json({ message: 'Error saving dishes', error });
  }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving restaurants', error });
  }
};

// Get a restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.headers.authorization.split(' ')[1]; 

    //const restaurantId = await decrypt(id.toString());

    const restaurant = await Restaurant.findOne({ where: { id: restaurantId } });
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error retrieving restaurant:', error);
    res.status(500).json({ message: 'Error retrieving restaurant', error });
  }
};

// Get dishes by restaurant ID
exports.getDishesByRestaurantId = async (req, res) => {
  try {
    // Extract and decrypt restaurant ID from headers
    const restaurantId = req.headers.authorization.split(' ')[1]; 
    //const restaurantId = await decrypt(id.toString());

    // Fetch all dishes associated with the restaurant ID
    const dishes = await Dish.findAll({ where: { restaurantId } });

    if (dishes && dishes.length > 0) {
      res.status(200).json(dishes);
    } else {
      res.status(404).json({ message: 'No dishes found for this restaurant' });
    }
  } catch (error) {
    console.error('Error retrieving dishes:', error);
    res.status(500).json({ message: 'Error retrieving dishes', error });
  }
};



// Get all dishes
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.findAll();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dishes', error });
  }
};

// Get a dish by ID
exports.getDishById = async (req, res) => {
  try {
    const dish_id = req.headers.authorization.split(' ')[1]; 

   // const dishId = await decrypt(dish_id.toString());

    const dishes = await Dish.findOne({ where: { id: dish_id } });
    if (dishes) {
      res.status(200).json(dishes);
    } else {
      res.status(404).json({ message: 'Dish not found' });
    }
  } catch (error) {
    console.error('Error retrieving dish:', error);
    res.status(500).json({ message: 'Error retrieving dish', error });
  }
};


exports.verifyResId = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    // Decrypt the token to get the user ID
    const userId = await decrypt(token);

    // Check if the user exists in the database
    const userExists = await Restaurant.findOne({ where: { id: userId } });

    if (userExists) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Error verifying token', error });
  }
};