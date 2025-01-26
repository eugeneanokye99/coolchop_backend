const sequelize = require('./config/db'); // Ensure this points to your Sequelize instance
const Restaurant = require('./models/Restaurant'); // Ensure this points to your Restaurant model
const Dish = require('./models/Dish'); 
const Order = require('./models/Order'); 

const seedRestaurants = async () => {
  try {
    // Sync the database
    await sequelize.sync({ force: false }); // Warning: This will drop existing tables if they exist
    console.log("Database synced.");

    // Array of sample restaurant data
    const restaurantData = [
      {
        restaurantId: "R001",
        restaurantName: "Gourmet Delight",
        description: "Great and fancy cuisine",
        email: "gourmet@example.com",
        phone: "1234567890",
        address: "123 Main Street",
        profileImage: "kaizen.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: true,
        ratings: 2.0,
        reviews: 5,
        verificationStatus: "Verified"
      },
    ];

    // Insert restaurant data into the database
    await Restaurant.bulkCreate(restaurantData);
    console.log("Restaurants have been added successfully.");
  } catch (error) {
    console.error("Error seeding restaurants:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};


const seedDishes = async () => {
  try {
    // Sync the database
    await sequelize.sync({ force: false }); // Warning: This will drop existing tables if they exist
    console.log("Database synced.");

    // Array of sample dish data
    const dishData = [
      {
        profileImage: "spaghetti.jpg",
        dishName: "Spaghetti Carbonara",
        price: 12.99,
        category: "Starter",
        ingredients: "Spaghetti, Egg, Parmesan Cheese, Pancetta, Black Pepper",
        description: "A classic Italian pasta dish made with creamy egg sauce and crispy pancetta.",
        restaurantId: "1"
      },
      {
        profileImage: "pizza.jpeg",
        dishName: "Margherita Pizza",
        price: 9.99,
        category: "Main Course",
        ingredients: "Tomato Sauce, Mozzarella Cheese, Basil",
        description: "Traditional Neapolitan pizza with fresh basil and mozzarella cheese.",
        restaurantId: "2"
      },
      {
        profileImage: "salad.jpg",
        dishName: "Caesar Salad",
        price: 7.99,
        category: "Dessert",
        ingredients: "Romaine Lettuce, Croutons, Parmesan Cheese, Caesar Dressing",
        description: "Crisp romaine lettuce tossed in a creamy Caesar dressing with crunchy croutons.",
        restaurantId: "3"
      },
      {
        profileImage: "ribs.jpeg",
        dishName: "BBQ Ribs",
        price: 15.99,
        category: "Starter",
        ingredients: "Pork Ribs, BBQ Sauce, Spices",
        description: "Tender pork ribs slathered in a smoky, tangy barbecue sauce.",
        restaurantId: "4"
      },
      {
        profileImage: "stir.webp",
        dishName: "Vegetable Stir-fry",
        price: 8.99,
        category: "Main Course",
        ingredients: "Broccoli, Bell Peppers, Carrots, Soy Sauce, Garlic",
        description: "A colorful medley of fresh vegetables stir-fried in a savory soy sauce.",
        restaurantId: "1"
      },
      {
        profileImage: "salmon.jpg",
        dishName: "Grilled Salmon",
        price: 18.99,
        category: "Starter",
        ingredients: "Salmon, Lemon, Olive Oil, Dill",
        description: "Perfectly grilled salmon fillet with a hint of lemon and dill.",
        restaurantId: "2"
      },
      {
        profileImage: "burger.jpg",
        dishName: "Beef Burger",
        price: 10.99,
        category: "Fast Food",
        ingredients: "Beef Patty, Lettuce, Tomato, Cheese, Bun",
        description: "Juicy beef patty served with fresh lettuce, tomato, and melted cheese.",
        restaurantId: "3"
      },
      {
        profileImage: "tacos.jpg",
        dishName: "Chicken Tacos",
        price: 11.49,
        category: "Main Course",
        ingredients: "Chicken, Tortilla, Salsa, Lettuce, Cheese",
        description: "Soft tortillas filled with seasoned chicken and fresh salsa.",
        restaurantId: "4"
      },
      {
        profileImage: "lobster.jpeg",
        dishName: "Lobster Bisque",
        price: 16.99,
        category: "Dessert",
        ingredients: "Lobster, Cream, Onion, Garlic, Sherry",
        description: "Rich and creamy soup infused with the delicate flavor of lobster.",
        restaurantId: "1"
      },
      {
        profileImage: "bowl.jpg",
        dishName: "Vegan Buddha Bowl",
        price: 12.49,
        category: "Dessert",
        ingredients: "Quinoa, Sweet Potato, Chickpeas, Avocado, Tahini Sauce",
        description: "A nourishing bowl filled with wholesome, plant-based ingredients.",
        restaurantId: "2"
      }
    ];

    // Insert dish data into the database
    await Dish.bulkCreate(dishData);
    console.log("Dishes have been added successfully.");
  } catch (error) {
    console.error("Error seeding dishes:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

seedDishes();

seedRestaurants();
