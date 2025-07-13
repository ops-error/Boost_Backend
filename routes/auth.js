const router = require('express').Router();
const {
    validateSigninReq,
    validateSignupReq
} = require('../middlewares/validate');
const checkTokens  = require('../middlewares/token.middleware');

const {
    createUser,
    loginUser,
    logoutUser,
} = require('../controllers/auth.controller');

router.post('/signin', validateSigninReq, loginUser);
router.post('/signup', validateSignupReq, createUser);
router.post('/signout', checkTokens, logoutUser);

module.exports = router;