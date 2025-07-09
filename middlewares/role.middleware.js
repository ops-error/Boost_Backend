const UnauthorizedError = require('../errors/unauthorized.err');

module.exports = (req, res, next) => {
    const userRole = req.user.role;
    if(userRole === 'admin') {
        next();
    } else {
        throw new UnauthorizedError('Тебе тут не место')
    }
}