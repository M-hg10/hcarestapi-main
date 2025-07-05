const express = require('express');
const router = express.Router();
const { bakiyeGetir } = require('../controllers/maliislemlerController');
const {detayliBakiyeGetir} = require('../controllers/maliDetayController');

router.get('/bakiye', bakiyeGetir);
router.get('/bakiye/detay', detayliBakiyeGetir);


module.exports = router;
