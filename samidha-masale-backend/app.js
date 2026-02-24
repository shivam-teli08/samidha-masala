const express = require('express');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const adminRoutes = require('./src/routes/admin.Routes')
const userRoutes = require('./src/routes/user.Routes')
const orderRoutes = require('./src/routes/order.routes')
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)
app.use('/orders', orderRoutes)
module.exports=app;
