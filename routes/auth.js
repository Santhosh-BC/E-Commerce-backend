// routes/auth.js
const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Operations related to user authentication
 */

// Authenticate


/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new account.
 *               password:
 *                 type: string
 *                 description: The password for the new account.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request if the input is invalid.
 */
router.post(
  '/signup',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }).isAlphanumeric(),
    // check('role').isIn(['Customer', 'admin']),
    // Additional validations can be added here.
  ],
  authController.signup
);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login a user
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the account.
 *               password:
 *                 type: string
 *                 description: The password of the account.
 *     responses:
 *       200:
 *         description: Successful login, returns a token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for authenticated sessions.
 *       401:
 *         description: Unauthorized if the credentials are incorrect.
 *       400:
 *         description: Bad request if the input is invalid.
 */
router.post('/login', authController.login);

module.exports = router;
