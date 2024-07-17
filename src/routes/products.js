const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Получение всех продуктов
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
});

// Получение продукта по ID
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [productId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Продукт не найден' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
});

// Создание нового продукта (требует аутентификации)
router.post('/', authMiddleware, async (req, res) => {
    const { name, price } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
        res.json({ message: 'Продукт создан', productId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
});

// Обновление продукта по ID (требует аутентификации)
router.put('/:id', authMiddleware, async (req, res) => {
    const productId = req.params.id;
    const { name, price } = req.body;
    try {
        const [result] = await db.execute('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, productId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Продукт не найден' });
        }
        res.json({ message: 'Продукт обновлен', productId });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
});

// Удаление продукта по ID (требует аутентификации)
router.delete('/:id', authMiddleware, async (req, res) => {
    const productId = req.params.id;
    try {
        const [result] = await db.execute('DELETE FROM products WHERE id = ?', [productId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Продукт не найден' });
        }
        res.json({ message: 'Продукт удален', productId });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
});

module.exports = router;