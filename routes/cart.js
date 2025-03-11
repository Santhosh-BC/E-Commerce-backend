// routes/cart.js
const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Operations related to the shopping cart
 */

// Add product to cart

/**
 * @swagger
 * /cart/add:
 *   post:
 *     tags: [Cart]
 *     summary: Add an item to the cart
 *     description: Adds a specified item to the user's cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: The ID of the item to add.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the item to add.
 *     responses:
 *       200:
 *         description: Item added successfully.
 *       400:
 *         description: Bad request if the input is invalid.
 */
router.post('/add', authenticate, cartController.addToCart);

// View user's cart
/**
 * @swagger
 * /cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get the user's cart
 *     description: Retrieves the current items in the user's cart.
 *     responses:
 *       200:
 *         description: Successful retrieval of cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   itemId:
 *                     type: string
 *                     description: The ID of the item.
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the item in the cart.
 */
router.get('/', authenticate, cartController.viewCart);

// Remove item from cart
/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove an item from the cart
 *     description: Removes a specified item from the user's cart.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the item to remove.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed successfully.
 *       404:
 *         description: Item not found in the cart.
 */
router.delete('/:id', authenticate, cartController.removeFromCart);

module.exports = router;



