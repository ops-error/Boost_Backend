const bcrypt = require('bcrypt');
const User = require('../models/user');
const createUserTokens = require('../services/user.service');
const InvalidAuthError = require ('../errors/invalid-auth.err');

const {NODE_ENV, JWT_TOKEN} = process.env;
// создание пользователя
// не путать с регистрацией
// тут я власть и я создаю пользователей
const createUser = (req, res, next) => {
    const {
        username, password, firebaseId
    } = req.body;
    bcrypt.hash(password, 10)
    .then((hash) => User.create({
        username, password: hash, firebaseId
    }))
    .then((user) => res.send({
        username: user.username,
        name: user.name,
        userId: user._id,
        firebaseId: user.firebaseId,
    }))
    .catch(next);
}

// авторизация
async function loginUser (req, res, next) {
    const {
        username, password, firebaseId, model
    } = req.body;
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
        throw new InvalidAuthError('Неверный логин или пароль');
    }
    const userPasswordCompare = await bcrypt.compare(password, user.password);
    if (userPasswordCompare) {
        const tokens = await createUserTokens({
            userId: user._id,
            firebaseId,
            model,
            role: user.role,
        });
        console.log(tokens);
        if (!tokens) {
            throw new Error('иди нахуй корочк');
        }
        res.status(200).setCookies(refreshToken).send({
            access: tokens.accessToken,
            // refresh: tokens.refreshToken,
            // expiresIn: 3600,
            username: user.username,
            userId: user._id,
        });
    }
}

// обновление ника
// вообще хз, пока этот контроллер не развиваю
// у меня там токены-хуёкины плохо работают,
// а тут эта хуня
// const patchName = (req, res, next) => {
//     const {
//         name
//     } = req.body;
//     findByIdAndUpdate(req.user._id, {name}, { returnDocument: 'after' })
//     .orFail()
//     .then((user) => {
//         res.send({user})
//     })
//     .catch(err => next(err));
// }

module.exports = {
    createUser,
    loginUser,
};