// controllers/ApikullaniciController.js
const ApikullaniciModel = require('../models/ApikullaniciModel');

const ApikullaniciController = {
  async kayit(req, res) {
    try {
      const yeniKullanici = await ApikullaniciModel.createUser(req.body);
      res.status(201).json({
        message: 'Kayıt başarılı',
        api_key: yeniKullanici.api_anahtari,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Kayıt sırasında hata oluştu' });
    }
  },

  async veriAl(req, res) {
    const { key } = req.query;
    try {
      const kullanici = await ApikullaniciModel.findByApiKey(key);
      if (!kullanici) {
        return res.status(403).json({ error: 'Geçersiz veya pasif API anahtarı' });
      }

      await ApikullaniciModel.incrementUsage(key);

      res.status(200).json({
        message: 'Başarılı',
        kullanici,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Veri alınırken hata oluştu' });
    }
  },
};

module.exports = ApikullaniciController;
