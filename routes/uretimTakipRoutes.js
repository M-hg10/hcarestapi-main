const express = require('express');
const router = express.Router();
const takipController = require('../controllers/uretimTakipController');

router.get('/', takipController.takipleriGetir);
router.get('/:id', takipController.takipGetir);
router.post('/', takipController.takipEkle);
router.put('/:id', takipController.takipGuncelle);
router.delete('/:id', takipController.takipSil);

module.exports = router;
