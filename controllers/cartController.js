// controllers/cartController.js
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const cartItem = await Cart.create({
      userId: req.user.userId,
      productId: productId,
      quantity: parseInt(quantity),
      priceAtAddition: product.price,
    });
    res.status(201).json(cartItem);
  } catch (err) {
    next(err);
  }
};

exports.viewCart = async (req, res, next) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId: req.user.userId } });
    res.json(cartItems);
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    next(err);
  }
};
