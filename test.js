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
        email: "gourmet@example.com",
        phone: "1234567890",
        address: "123 Main Street",
        profileImage: "https://example.com/image1.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: true,
        verificationStatus: "Verified"
      },
      {
        restaurantId: "R002",
        restaurantName: "Urban Eatery",
        email: "urban@example.com",
        phone: "0987654321",
        address: "456 Elm Street",
        profileImage: "https://example.com/image2.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: false,
        verificationStatus: "Not Verified"
      },
      {
        restaurantId: "R003",
        restaurantName: "Seafood Paradise",
        email: "seafood@example.com",
        phone: "1122334455",
        address: "789 Ocean Avenue",
        profileImage: "https://example.com/image3.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: true,
        verificationStatus: "Verified"
      },
      {
        restaurantId: "R004",
        restaurantName: "Pizza Haven",
        email: "pizza@example.com",
        phone: "2233445566",
        address: "101 Pizza Lane",
        profileImage: "https://example.com/image4.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: false,
        verificationStatus: "Not Verified"
      },
      {
        restaurantId: "R005",
        restaurantName: "Burger Bliss",
        email: "burger@example.com",
        phone: "3344556677",
        address: "202 Burger Boulevard",
        profileImage: "https://example.com/image5.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: true,
        verificationStatus: "Verified"
      },
      {
        restaurantId: "R006",
        restaurantName: "Taco Fiesta",
        email: "taco@example.com",
        phone: "4455667788",
        address: "303 Taco Terrace",
        profileImage: "https://example.com/image6.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: false,
        verificationStatus: "Not Verified"
      },
      {
        restaurantId: "R007",
        restaurantName: "Sushi World",
        email: "sushi@example.com",
        phone: "5566778899",
        address: "404 Sushi Street",
        profileImage: "https://example.com/image7.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: true,
        verificationStatus: "Verified"
      },
      {
        restaurantId: "R008",
        restaurantName: "Vegan Bites",
        email: "vegan@example.com",
        phone: "6677889900",
        address: "505 Vegan Valley",
        profileImage: "https://example.com/image8.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: false,
        verificationStatus: "Not Verified"
      },
      {
        restaurantId: "R009",
        restaurantName: "Pasta Palace",
        email: "pasta@example.com",
        phone: "7788990011",
        address: "606 Pasta Place",
        profileImage: "https://example.com/image9.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: true,
        verificationStatus: "Verified"
      },
      {
        restaurantId: "R010",
        restaurantName: "BBQ Barn",
        email: "bbq@example.com",
        phone: "8899001122",
        address: "707 BBQ Boulevard",
        profileImage: "https://example.com/image10.jpg",
        longitude: -122.4194,
        latitude: 37.7749,
        confirm_location: false,
        verificationStatus: "Not Verified"
      }
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
          profileImage: "1735667226982.jpg",
          dishName: "Spaghetti Carbonara",
          price: 12.99,
          category: "Pasta",
          ingredients: "Spaghetti, Egg, Parmesan Cheese, Pancetta, Black Pepper",
          restaurantId: "1"
        },
        {
          profileImage: "1735667226982.jpg",
          dishName: "Margherita Pizza",
          price: 9.99,
          category: "Pizza",
          ingredients: "Tomato Sauce, Mozzarella Cheese, Basil",
          restaurantId: "1"
        },
        {
          profileImage: "1735667226982.jpg",
          dishName: "Caesar Salad",
          price: 7.99,
          category: "Salad",
          ingredients: "Romaine Lettuce, Croutons, Parmesan Cheese, Caesar Dressing",
          restaurantId: "1"
        },
        {
          profileImage: "1735667226982.jpg",
          dishName: "BBQ Ribs",
          price: 15.99,
          category: "BBQ",
          ingredients: "Pork Ribs, BBQ Sauce, Spices",
          restaurantId: "1"
        },
        {
          profileImage: "1735667226982.jpg",
          dishName: "Vegetable Stir-fry",
          price: 8.99,
          category: "Vegetarian",
          ingredients: "Broccoli, Bell Peppers, Carrots, Soy Sauce, Garlic",
          restaurantId: "1"
        },
        {
          profileImage: "1735667226982.jpg",
          dishName: "Grilled Salmon",
          price: 18.99,
          category: "Seafood",
          ingredients: "Salmon, Lemon, Olive Oil, Dill",
          restaurantId: "1"
        },
        {
          profileImage: "1735667226982.jpg",
          dishName: "Beef Burger",
          price: 10.99,
          category: "Fast Food",
          ingredients: "Beef Patty, Lettuce, Tomato, Cheese, Bun",
          restaurantId: "1"
        },
        {
          profileImage: "1735667226982.jpg",
          dishName: "Chicken Tacos",
          price: 11.49,
          category: "Mexican",
          ingredients: "Chicken, Tortilla, Salsa, Lettuce, Cheese",
          restaurantId: "1"
        },
        {
          profileImage: "1735667226982.jpg",
          dishName: "Lobster Bisque",
          price: 16.99,
          category: "Soup",
          ingredients: "Lobster, Cream, Onion, Garlic, Sherry",
          restaurantId: "1"
        },
        {
          profileImage: "1735667226982.jpg",
          dishName: "Vegan Buddha Bowl",
          price: 12.49,
          category: "Vegan",
          ingredients: "Quinoa, Sweet Potato, Chickpeas, Avocado, Tahini Sauce",
          restaurantId: "1"
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

//seedRestaurants();
