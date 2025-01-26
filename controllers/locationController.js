const User = require('../models/User');
const { decrypt } = require('../utils/encryption');


// Update user location
exports.updateUserLocation = async (req, res) => {
  try {
    const { userId } = req.body
    // Extract token from the Authorization header
    const token = userId;
    if (!token) {
      return res.status(401).json({ error: "Authentication token missing" });
    }

    // Decrypt token to get user ID
    const decoded = await decrypt(token);
    const user = await User.findOne({ where: { id: decoded } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract coordinates and confirmLocation from request body
    const { latitude, longitude, confirmLocation } = req.body;
    if (latitude === undefined || longitude === undefined || confirmLocation === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update user location and confirmLocation
    user.latitude = latitude;
    user.longitude = longitude;
    user.confirm_location = confirmLocation;

    // Save changes to the database
    await user.save();

    res.status(200).json({
      message: "User location updated successfully",
    });
  } catch (error) {
    console.error("Error updating user location:", error);
    res.status(500).json({ error: "Server error" });
  }
};

  
// Function to get confirmLocation by user ID
exports.getConfirmLocationById = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ error: 'Authentication token missing' });
    }

    // Verify the token
    const decoded = await decrypt(token);
    
    const user = await User.findOne({ where: { id: decoded } });
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

    res.json({ confirmLocation: user.confirm_location });
  } catch (error) {
    console.error('Error fetching confirmLocation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

