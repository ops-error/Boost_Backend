const router = require('express').Router();
const {
    createDevice,
    getDevice
} = require('../controllers/devices');

router.post('/', createDevice);
router.get('/', getDevice);

module.exports = router;