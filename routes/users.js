const router = require('express').Router();
const {
    // patchName
    getUser
} = require('../controllers/users.controller');

// router.patch('/name', patchName);
router.get('/:userId', getUser);

module.exports = router;