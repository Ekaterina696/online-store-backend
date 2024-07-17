const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Создание нового заказа
router.post('/', authMiddleware, async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;
    try {
        const [result] = await db.execute('INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity]);
        res.json({ message: 'Заказ создан', orderId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
});

// Получение всех заказов пользователя
router.get('/', authMiddleware, async (req, res) => {
    const user_id = req.user.id;
    try {
        const [rows] = await db.execute('SELECT * FROM orders WHERE user_id = ?', [user_id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
});

module.exports = router;