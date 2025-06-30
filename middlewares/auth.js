const jwt = require('jsonwebtoken');
const {NODE_ENV, JWT_TOKEN} = process.env;

module.exports = (req, res, next) =>{
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        console.log(authorization);
        throw new Error('Иди нахуй это мидлвара авторизации 1');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
        payload = jwt.verify(token, JWT_TOKEN);
        console.log(payload);
    } catch(err) {
        throw new Error('Иди нахуй это мидлвара авторизации 2');
    }

    req.user = payload;
    return next();
}