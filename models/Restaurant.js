const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  restaurantId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  restaurantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  confirm_location: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ratings: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  verificationStatus:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue :"Not Verified"
  }
}, {});

module.exports = Restaurant;
