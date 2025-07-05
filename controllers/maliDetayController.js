const { getDetayliBakiyeListesi } = require('../models/maliDetayModel');

async function detayliBakiyeGetir(req, res) {
  const firmaAdi = req.query.firmaAdi;

  if (!firmaAdi) {
    return res.status(400).json({ error: 'firmaAdi parametresi gerekli' });
  }

  try {
    const detaylar = await getDetayliBakiyeListesi(firmaAdi);
    if (!detaylar || detaylar.length === 0) {
      return res.status(404).json({ message: 'Firma bulunamadı veya kayıt yok' });
    }
    res.json(detaylar);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}

module.exports = { detayliBakiyeGetir };
