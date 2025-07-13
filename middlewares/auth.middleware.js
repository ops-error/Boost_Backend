const jwt = require('jsonwebtoken');
const {JWT_TOKEN} = process.env;
const InvalidAuthError = require('../errors/invalid-auth.err');

// после token middleware
// читает с headers access токен
module.exports = (req, res, next) => {
    try {
        const {authorization} = req.headers;
        const token = authorization.replace('Bearer ', '');
        // проверяет подпись и в случае успеха => next
        req.user = jwt.verify(token, JWT_TOKEN);
        next();
    } catch {
        throw new InvalidAuthError('Not Success Auth :(');
    }
    
}