const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = process.env;

// создание краткосрочного токена
module.exports = (params, time) => {
    return jwt.sign(params, JWT_TOKEN, { expiresIn: time });
}