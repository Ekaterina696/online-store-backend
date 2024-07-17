const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Использование маршрутов для аутентификации
app.use('/auth', authRoutes);

// Использование маршрутов для продуктов
app.use('/products', productRoutes);

// Использование маршрутов для заказов
app.use('/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});