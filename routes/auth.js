const router = require('express').Router();
const {
    validateSigninReq,
    validateSignupReq
} = require('../middlewares/validate');

const {
    createUser,
    loginUser,
} = require('../controllers/auth.controller');

router.post('/signin', validateSigninReq, loginUser);
router.post('/signup', validateSignupReq, createUser);

module.exports = router;