const User = require('../models/User');
const { decrypt } = require('../utils/encryption');

exports.confirmLocation = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        if (!token) {
          return res.status(401).json({ error: 'Authentication token missing' });
        }
    
        // Verify the token
        const decoded = await decrypt(token);
      const { longitude, latitude } = req.body;
  
      // Find the user by id
      const user = await User.findOne({ where: { id: decoded } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update longitude, latitude, and confirm_location
      await user.update({
        longitude,
        latitude,
        confirm_location: true 
      });
  
      res.status(200).json({
        message: 'Location confirmed',
        user:{
            confirmLocation: user.confirm_location
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
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

