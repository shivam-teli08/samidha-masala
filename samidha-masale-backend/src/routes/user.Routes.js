const express = require('express');
const router = express.Router();
const userProductController = require('../controllers/user-product-controller');
const userAuthController = require('../controllers/user-auth.controller')
router.post('/auth/sign-up',userAuthController.registerUser)
router.post('/auth/sign-in',userAuthController.signInUser)
router.get('/products', userProductController.getAllProducts);
router.get('/products/category/:category', userProductController.getProductsByCategory);

module.exports = router;
