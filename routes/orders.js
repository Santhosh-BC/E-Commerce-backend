// routes/orders.js
const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Operations related to orders
 */

// Place an order (checkout)

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Orders]
 *     summary: Place an order
 *     description: Places an order for the authenticated user.
 *     responses:
 *       200:
 *         description: Order placed successfully.
 *       400:
 *         description: Bad request if the input is invalid.
 */
router.post('/', authenticate, orderController.placeOrder);

// Retrieve order history for the authenticated user

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get order history
 *     description: Retrieves the order history for the authenticated user.
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the order.
 *                   status:
 *                     type: string
 *                     description: The status of the order.
 *                   items:
 *                     type: array
 *                     description: The items in the order.
 *                   total:
 *                     type: number
 *                     description: The total amount of the order.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the order was created.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the order was updated.
 *       401:
 *         description: Unauthorized if the user is not authenticated.
 */
router.get('/', authenticate, orderController.getOrderHistory);

module.exports = router;
