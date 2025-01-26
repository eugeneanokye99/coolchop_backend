const Order = require('../models/Order');
const Dish = require('../models/Dish'); 
const { decrypt } = require('../utils/encryption');


exports.createOrder = async (req, res) => {
  const { user_id, items, note } = req.body;

  const userId = await decrypt(user_id);

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ message: 'userId and items are required' });
  }

  try {
    // Calculate total amount based on item prices
    let totalAmount = 0;
    for (const item of items) {
      const dish = await Dish.findByPk(item.id);
      if (!dish) {
        return res.status(400).json({ message: `Dish with ID ${item.id} not found` });
      }
      totalAmount += dish.price * item.quantity;
    }

    // Generate a unique order number
    const orderNumber = `ORD-${Date.now()}-${userId}`;

    // Save the order
    const order = await Order.create({
      orderNumber,
      userId,
      items: JSON.stringify(items),
      totalAmount,
      note,
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

exports.getAllOrders = async (req, res) => {
  const { user_id } = req.query;
  try {

    const userId = await decrypt(user_id);
    const orders = userId
      ? await Order.findAll({ where: { userId } })
      : await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};


exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { items, totalAmount, note, status } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.items = items ? JSON.stringify(items) : order.items;
    order.totalAmount = totalAmount || order.totalAmount;
    order.note = note || order.note;
    order.status = status || order.status;

    await order.save();
    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Error updating order' });
  }
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await Order.destroy({ where: { id: orderId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order' });
  }
};

