const express = require("express");
const router = express.Router();
const orderController = require("../controllers/ordercontroller");
const protect = require("../middlewares/user-exists");

router.post("/place-order", protect, orderController.createOrder);
router.post("/verify-payment", protect, orderController.verifyPayment);

module.exports = router;
