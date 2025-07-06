const router = require('express').Router();
const {
    getDevice
} = require('../controllers/devices');

router.get('/', getDevice);

module.exports = router;