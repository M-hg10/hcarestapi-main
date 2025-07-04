const express = require('express');
const router = express.Router();
const krediController = require('../controllers/krediController.js'); // veya krediController

router.get('/:telefon', krediController.getBakiyeByTelefon);

module.exports = router;
