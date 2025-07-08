const User = require('../models/user');
const InvalidDataError = require('../errors/invalid-data.err');

const getUser = (req, res, next) => {
    User.findById(req.params.userId)
    .orFail(() => {
        throw new InvalidDataError('Ты мне какую-то хуйню передала, ес чесна');
    })
    .then((user) => {
        res.status(200).send({
            user
        })
    })
    .catch(next);
}

module.exports = {
    getUser
}