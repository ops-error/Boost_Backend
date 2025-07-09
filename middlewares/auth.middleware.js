const jwt = require('jsonwebtoken');
const {JWT_TOKEN} = process.env;

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    const token = authorization.replace('Bearer ', '');
    req.user = jwt.verify(token, JWT_TOKEN);
    next();
}