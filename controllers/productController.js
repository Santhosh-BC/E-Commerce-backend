const Product = require('../models/product');
const Category = require('../models/category');
const cloudinary = require('../config/cloudinary');
const { Op } = require('sequelize');

// Create a new product with optional image upload
exports.createProduct = async (req, res, next) => {
  try {
    // Check if image url exists
    let imageUrl = req.body.imageUrl || null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products',
        resource_type: 'image',
      });
      imageUrl = result.secure_url;
    }
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock),
      imageUrl,
      categoryId: req.body.categoryId,
    });
    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// List products with filtering and pagination
exports.listProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
    const filters = {};

    if (search) filters.name = { [Op.iLike]: `%${search}%` };
    if (minPrice && maxPrice) {
      filters.price = { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] };
    }
    if (category) filters.categoryId = category;

    const products = await Product.findAndCountAll({
      where: filters,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    return res.json({
      total: products.count,
      pages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      products: products.rows,
    });
  } catch (err) {
    next(err);
  }
};

// Update an existing product with optional image replacement
exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    let product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // If a new image is provided, upload it and update the URL
    let imageUrl = product.imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products',
        resource_type: 'image',
      });
      imageUrl = result.secure_url;
    }

    const updatedProduct = await product.update({
      name: req.body.name || product.name,
      description: req.body.description || product.description,
      price: req.body.price ? parseFloat(req.body.price) : product.price,
      stock: req.body.stock ? parseInt(req.body.stock) : product.stock,
      imageUrl,
      CategoryId: req.body.categoryId || product.CategoryId,
    });

    return res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// Delete a product by its ID
exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    return res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};
