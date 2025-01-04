const sequelize= require("sequelize")
const Order= require("../models/Order")

// find all dishes 
// Find all orders (dishes)
exports.allDishes = async (req, res) => {
    try {
      const { page = 1, limit = 15 } = req.query; 
      const offset = (page - 1) * limit;
  
      const allDishes = await Order.findAll({
        limit,
        offset,
      });
  
      if (allDishes.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json(allDishes);
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({ message: "Failed to get all orders" });
    }
  };

// Find a single dish by ID
exports.allDishesById = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const dish = await Order.findOne({
        where: { id },
      });
  
      if (!dish) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(dish);
    } catch (err) {
      console.error("Error fetching the order:", err);
      res.status(500).json({ message: "Something happened, we couldn't get the order" });
    }
  };
  


// Deleting an order (dish)
exports.deleteDish = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const deletedOrder = await Order.destroy({
        where: { id },
      });
  
      if (deletedOrder === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error occurred while deleting the order:", error);
      res.status(500).json({ message: "Failed to delete the order" });
    }
  };
  
  // Create a new order
exports.createDish = async (req, res) => {
    const { orderNumber, totalAmount, status, customerId, vendorId } = req.body;
  
    try {
      const newOrder = await Order.create({
        orderNumber,
        totalAmount,
        status,
        customerId,
        vendorId,
      });
  
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating the order:", error);
      res.status(500).json({ message: "Failed to create the order" });
    }
  };

  // Update an existing order
exports.updateDish = async (req, res) => {
    const { id } = req.params;
    const { orderNumber, totalAmount, status, customerId, vendorId } = req.body;
  
    try {
      const order = await Order.findOne({
        where: { id },
      });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      order.orderNumber = orderNumber || order.orderNumber;
      order.totalAmount = totalAmount || order.totalAmount;
      order.status = status || order.status;
      order.customerId = customerId || order.customerId;
      order.vendorId = vendorId || order.vendorId;
  
      await order.save();
  
      res.status(200).json(order);
    } catch (error) {
      console.error("Error updating the order:", error);
      res.status(500).json({ message: "Failed to update the order" });
    }
  };
  
  // Find all orders by Customer ID
exports.ordersByCustomer = async (req, res) => {
    const { customerId } = req.params;
  
    try {
      const orders = await Order.findAll({
        where: { customerId },
      });
  
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this customer" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders by customer:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  };
  