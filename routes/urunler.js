const express = require('express');
const router = express.Router();
const {
  urunleriGetir,
  urunGetir,
  urunEkle,
  urunGuncelle,
  urunSil
} = require('../controllers/urunlerController');

// 🟢 Tüm ürünleri getir
router.get('/', urunleriGetir);

// 🟢 Belirli bir ürünü getir
router.get('/:id', urunGetir);

// 🟡 Yeni ürün ekle
router.post('/', urunEkle);

// 🟠 Ürün güncelle
router.put('/:id', urunGuncelle);

// 🔴 Ürün sil
router.delete('/:id', urunSil);

module.exports = router;
