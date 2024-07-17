const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Неверный токен' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;