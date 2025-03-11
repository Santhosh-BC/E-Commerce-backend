// models/category.js
const { DataTypes,Model } = require('sequelize');
const sequelize = require('../config/db');

// Category Model
class Category extends Model {}
Category.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
  },
  { sequelize, modelName: 'Category' }
);

module.exports = Category;
