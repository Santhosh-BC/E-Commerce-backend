// models/cart.js
const { DataTypes,Model } = require('sequelize');
const sequelize = require('../config/db');

// Cart Model
class Cart extends Model {}
Cart.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, references: { model: 'Users', key: 'id' }, allowNull: false },
    productId: { type: DataTypes.UUID, references: { model: 'Products', key: 'id' }, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    priceAtAddition: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, modelName: 'Cart' }
);

module.exports = Cart;
