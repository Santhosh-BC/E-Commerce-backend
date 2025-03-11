// controllers/orderController.js
const sequelize = require('../config/db');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.placeOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    // Retrieve cart items for the authenticated user
    const cartItems = await Cart.findAll({ where: { userId: req.user.userId } });
    if (!cartItems.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total price using persistent pricing
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.priceAtAddition * item.quantity;
    });

    // Create an order record
    const order = await Order.create({
      userId: req.user.userId,
      totalAmount,
      status: 'pending'
    }, { transaction });

    // Create order items and update product stock if needed
    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtAddition,
      }, { transaction });

      // Optionally update product stock
      const product = await Product.findByPk(item.ProductId);

      if (product) {
        await product.update({ stock: product.stock - item.quantity }, { transaction });
      }
    }

    // Clear the user's cart
    await Cart.destroy({ where: { userId: req.user.userId }, transaction });
    await transaction.commit();

    return res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    // Users view only their orders.
    const orders = await Order.findAll({
      where: { userId: req.user.userId },
      // include: [
      //   OrderItem, // requires association as defined above
      // ],
      order: [['createdAt', 'DESC']]
    });
    
    return res.json(orders);
  } catch (err) {
    next(err);
  }
};
