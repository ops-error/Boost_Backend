const jwt = require('jsonwebtoken');
const {NODE_ENV, JWT_TOKEN} = process.env;
const UnathorizesError = require('../errors/unauthorized.err');
const UnauthorizedError = require('../errors/unauthorized.err');

module.exports = (req, res, next) =>{
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedError('Уходи отсюда, тебе сюда нельзя');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = jwt.verify(token, JWT_TOKEN);
    } catch(err) {
        if (err.name === 'TokenExpiredError') {
      // Ошибка "токен истек" — клиент должен обновить его
            // return res.status(401).json({ 
            //     error: "Token expired",
            //     action: "refresh_token"
            // });
            throw new UnathorizesError('Приходи позднее', 'refresh_token');
        }
    }

    req.user = payload;
    return next();
}