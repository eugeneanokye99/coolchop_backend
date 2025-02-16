const Cart = require('../models/Cart');
const { encrypt, decrypt } = require("../utils/encryption");


exports.addToCart = async (req, res) => {
  const { user_id, dishId, quantity } = req.body;

  const userId = await decrypt(user_id.toString());


  if (!userId || !dishId) {
    return res.status(400).json({ message: 'userId and dishId are required' });
  }

  try {
    // Check if the item already exists in the cart
    const existingItem = await Cart.findOne({ where: { userId, dishId } });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.status(200).json({ message: 'Item quantity updated in cart' });
    }

    // Add new item to the cart
    await Cart.create({ userId, dishId, quantity: quantity || 1 });
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

exports.getCart = async (req, res) => {
  const { user_id } = req.query;

  const userId = await decrypt(user_id.toString());

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const cartItems = await Cart.findAll({ where: { userId } });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { user_id, dishId } = req.body;

  const userId = await decrypt(user_id.toString());


  if (!userId || !dishId) {
    return res.status(400).json({ message: 'userId and dishId are required' });
  }

  try {
    await Cart.destroy({ where: { userId, dishId } });
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing from cart' });
  }
};



exports.updateCartQuantity = async (req, res) => {
  const { user_id, dishId, quantity } = req.body;

  const userId = await decrypt(user_id.toString());

  if (!userId || !dishId || quantity === undefined) {
    return res.status(400).json({ message: 'userId, dishId, and quantity are required' });
  }

  try {
    // Find the existing item in the cart
    const cartItem = await Cart.findOne({ where: { userId, dishId } });

    if (!cartItem) {
      return res.status(404).json({ message: 'Dish not found in cart' });
    }

    // Update the quantity of the item
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: 'Cart item quantity updated', cartItem });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    res.status(500).json({ message: 'Error updating cart quantity' });
  }
};