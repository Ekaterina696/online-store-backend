const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM users');
    res.json(rows);
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.json({ id: result.insertId, username });
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, hashedPassword, id]);
    res.json({ id, username });
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
});

module.exports = router;