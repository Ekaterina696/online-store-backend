const express = require('express');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const { authenticateJWT } = require('./utils/auth');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', authenticateJWT, productRoutes);
app.use('/orders', authenticateJWT, orderRoutes);

module.exports = app;