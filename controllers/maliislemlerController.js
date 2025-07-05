const { getBakiyeByFirmaVeTarih } = require('../models/maliislemlerModel');

async function bakiyeGetir(req, res) {
  const { firmaAdi, baslangicTarihi, bitisTarihi } = req.query;

  if (!firmaAdi) {
    return res.status(400).json({ error: 'firmaAdi parametresi gerekli' });
  }

  // İsterseniz tarih formatlarını doğrulayabilirsiniz (isteğe bağlı)

  try {
    const bakiye = await getBakiyeByFirmaVeTarih(firmaAdi, baslangicTarihi, bitisTarihi);
    if (!bakiye) {
      return res.status(404).json({ message: 'Firma bulunamadı veya tarih aralığında veri yok' });
    }
    res.json(bakiye);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}

module.exports = { bakiyeGetir };

