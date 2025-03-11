// // models/user.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// User Model
class User extends Model {}
User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    // Optional
    // name: { type: DataTypes.STRING, allowNull: false }, 
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'customer'), defaultValue: 'customer' },
  },
  { sequelize, modelName: 'User' }
);

module.exports = User;