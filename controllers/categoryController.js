// controllers/categoryController.js
const Category = require('../models/category');

// Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

// Update an existing category
exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const updatedCategory = await category.update({
      name: req.body.name || category.name,
      description: req.body.description || category.description,
    });
    res.json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

// Delete a category
exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// List all categories
exports.listCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};
