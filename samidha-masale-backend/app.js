const express = require("express");
const app = express();

const adminRoutes = require("./src/routes/admin.Routes");
const userRoutes = require("./src/routes/user.Routes");
const orderRoutes = require("./src/routes/order.routes");
const paymentRoutes = require("./src/routes/payment.routes");

// IMPORTANT: webhook raw body must be before express.json
app.use("/payments/webhook", express.raw({ type: "application/json" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);

module.exports = app;
