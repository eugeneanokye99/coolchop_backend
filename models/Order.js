const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User= require("./User")

const Order=sequelize.define("Order",{
        
        orderNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          status: {
            type: DataTypes.ENUM('pending', 'preparing', 'on_delivery', 'delivered'),
            defaultValue: 'pending',
          },
          
    })

Order.belongsTo(User, {
    foreignKey: 'customerId',
    as: 'customer',
  });
  Order.belongsTo(User, {
    foreignKey: 'vendorId',
    as: 'vendor',
  });
module.exports =Order