const { celebrate, Joi } = require('celebrate');
// Joi.object = require('joi-objectid')(Joi);

// авторизация
const validateSigninReq = celebrate({
    body: Joi.object().keys({
        username: Joi.string().required().min(3).max(20),
        password: Joi.string().required().min(5).max(20),
        firebaseId: Joi.string().required(),
        model: Joi.string().required(),
    }),
});

// создание пользователя
const validateSignupReq = celebrate({
    body: Joi.object().keys({
        username: Joi.string().required().min(3).max(20),
        password: Joi.string().required().min(5).max(20),
        name: Joi.string().min(1).max(15).default('user'),
        role: Joi.string().valid('admin', 'homies', 'guest').default('guest'),
        firebaseId: Joi.string().required(),
    }),
});

module.exports = {
    validateSigninReq,
    validateSignupReq,
};