const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createUser = (req, res, next) => {
    const {
        username, password, name
    } = req.body;
    bcrypt.hash(password, 10)
    .then((hash) => User.create({
        username, name, password: hash,
    }))
    .then((user) => res.send({
        username: user.username,
        name: user.name,
        _id: user._id,
    }))
    .catch((err) => res.send(err))
    .catch(next);
}

const loginUser = (req, res, next) => {
    const {
        username, password
    } = req.body;
    User.findOne({ username }).select('+password')
    .then((user) => {
        return Promise.all([ user, bcrypt.compare(password, user.password) ]);
    })
    .then(([user, matches]) => {
        // const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key', { expiresIn: '7d' });
        // res.status(200).send({ data: token });
        res.send('Пошел нахуй')
    })
    .catch(next);
}

const patchName = (req, res, next) => {
    const {
        name
    } = req.body;
    User.findByIdAndUpdate(req.user._id, {name}, { returnDocument: 'after' })
    .orFail()
    .then((user) => {
        res.send({user})
    })
    .catch(err => next(err));
}

module.exports = {
    createUser,
    loginUser,
    patchName
};