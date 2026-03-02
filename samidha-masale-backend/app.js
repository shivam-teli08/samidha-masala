const cors = require('cors');
const express = require('express');
const app = express();

const adminRoutes = require('./src/routes/admin.Routes');
const userRoutes = require('./src/routes/user.Routes');
const orderRoutes = require('./src/routes/order.routes');
const paymentRoutes = require('./src/routes/payment.routes');

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// IMPORTANT: webhook raw body must be before express.json
app.use('/payments/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);

module.exports = app;
