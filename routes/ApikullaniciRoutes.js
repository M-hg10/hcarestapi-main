// routes/ApikullaniciRoutes.js
const express = require('express');
const router = express.Router();
const ApikullaniciController = require('../controllers/ApikullaniciController');

router.post('/kayit', ApikullaniciController.kayit);
router.get('/veri', ApikullaniciController.veriAl);

module.exports = router;
