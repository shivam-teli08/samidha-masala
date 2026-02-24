const Product = require('../models/admin-add-product.model');

async function getAllProducts(req, res) {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (err) {
    console.log('Get products error:', err.message);
    return res.status(500).json({ message: 'Unable to fetch products' });
  }
}

async function getProductsByCategory(req, res) {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const products = await Product.find({
      category: { $regex: `^${category}$`, $options: 'i' },
    }).sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (err) {
    console.log('Get products by category error:', err.message);
    return res.status(500).json({ message: 'Unable to fetch products by category' });
  }
}

module.exports = {
  getAllProducts,
  getProductsByCategory,
};
