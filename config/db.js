const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './coolchop.sqlite'
});
module.exports = sequelize;
