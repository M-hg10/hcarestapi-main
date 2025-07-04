const express = require('express');
const router = express.Router();
const firmaController = require('../controllers/firmaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Sadece giriş yapmış kullanıcılar görebilsin
router.get('/firmalar', firmaController.getFirmalar);

// Sadece admin görebilsin örneğin
router.get('/firmalar/:id', authMiddleware(['admin']), firmaController.getFirmaById);

module.exports = router;


