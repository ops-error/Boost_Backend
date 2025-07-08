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
    }),
});

module.exports = {
    validateSigninReq,
    validateSignupReq,
};