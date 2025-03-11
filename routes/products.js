// routes/products.js
const express = require('express');
const multer = require('multer');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');
const path = require('path');

// Configure Multer storage and file filter to accept only images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operations related to products
 */

// admin routes for product management

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     description: Creates a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product.
 *               image:
 *                 type: string
 *                 description: The image of the product.
 *               categoryId:
 *                 type: string
 *                 description: The category id of the product.
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Bad request if the input is invalid.
 */
router.post('/', authenticate, authorize('admin'), upload.single('image'), productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update an existing product
 *     description: Updates an existing product.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product.
 *               image:
 *                 type: string
 *                 description: The image of the product.
 *               categoryId:
 *                 type: string
 *                 description: The category id of the product.
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Bad request if the input is invalid.
 *       404:
 *         description: Product not found.
 */
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), productController.updateProduct);

/**
 * @swagger
 * /products:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
 *     description: Deletes a product.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to delete.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 */
router.delete('/:id', authenticate, authorize('admin'), productController.deleteProduct);

// Public endpoint for listing and filtering products

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: List products
 *     description: Retrieves a list of all products.
 *     parameters:
 *       - in: query
 *         name: name
 *         description: The name of the product.
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoryId
 *         description: The category id of the product.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the product.
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   description:
 *                     type: string
 *                     description: The description of the product.
 *                   price:
 *                     type: number
 *                     description: The price of the product.
 *                   stock:
 *                     type: integer
 *                     description: The stock quantity of the product.
 *                   image:
 *                     type: string
 *                     description: The image of the product.
 *                   categoryId:
 *                     type: string
 *                     description: The category id of the product.
 *       400:
 *         description: Bad request if the input is invalid.
 */
router.get('/', productController.listProducts);

module.exports = router;
