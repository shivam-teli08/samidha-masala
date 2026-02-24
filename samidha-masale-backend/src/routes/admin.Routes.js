const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');
const addProductController = require('../controllers/add-product-controller');
const { streamAndUpload } = require('../services/image-upload-service');

router.post('/', adminAuthController.postAdminLogin);
router.post('/upload-image', streamAndUpload);
router.post('/add-product', addProductController.addProduct);
module.exports = router;
