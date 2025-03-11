// routes/categories.js
const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Operations related to categories
 */

//Swagger

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     description: Creates a new category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *               description:
 *                 type: string
 *                 description: The description of the category.
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Bad request if the input is invalid.
 */
router.post('/', authenticate, authorize('admin'), categoryController.createCategory);


/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update an existing category
 *     description: Updates an existing category.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *               description:
 *                 type: string
 *                 description: The description of the category.
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       400:
 *         description: Bad request if the input is invalid.
 *       404:
 *         description: Category not found.
 */
router.put('/:id', authenticate, authorize('admin'), categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category
 *     description: Deletes a category.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to delete.
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 */
router.delete('/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     description: Retrieves a list of all categories.
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
 *                     description: The ID of the category.
 *                   name:
 *                     type: string
 *                     description: The name of the category.
 *                   description:
 *                     type: string
 *                     description: The description of the category.
 *       404:
 *         description: Categories not found.
 */
router.get('/', categoryController.listCategories);

module.exports = router;
