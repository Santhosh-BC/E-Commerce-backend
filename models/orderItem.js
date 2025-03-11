// models/orderItem.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// OrderItem Model
class OrderItem extends Model {}
OrderItem.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    orderId: { type: DataTypes.UUID, references: { model: 'Orders', key: 'id' }, allowNull: false },
    productId: { type: DataTypes.UUID, references: { model: 'Products', key: 'id' }, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    priceAtPurchase: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, modelName: 'OrderItem' }
);
module.exports = OrderItem;
