// models/order.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// Order Model
class Order extends Model {}
Order.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, references: { model: 'Users', key: 'id' }, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'completed', 'canceled'), defaultValue: 'pending' },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, modelName: 'Order' }
);

module.exports = Order;
