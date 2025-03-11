// models/product.js
const { DataTypes,Model } = require('sequelize');
const sequelize = require('../config/db');

// const Product = sequelize.define('Product', {
//     name: { type: DataTypes.STRING, allowNull: false },
//     description: { type: DataTypes.TEXT },
//     price: { type: DataTypes.FLOAT, allowNull: false },
//     stock: { type: DataTypes.INTEGER, allowNull: false },
//     imageUrl: { type: DataTypes.STRING },
// //     CategoryId: {
// //     type: DataTypes.INTEGER,
// //     references: {
// //       model: 'Category',
// //       key: 'id'
// //     }
// //   },
// });

// Product Model
class Product extends Model {}
Product.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    imageUrl: { type: DataTypes.STRING },
    categoryId: { type: DataTypes.UUID, references: { model: 'Categories', key: 'id' }, allowNull: false },
  },
  { sequelize, modelName: 'Product' }
);

module.exports = Product;
