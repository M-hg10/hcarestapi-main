// controllers/firmaController.js
const db = require('../db');

exports.getFirmalar = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM firma_iletisimleri LIMIT 10');
    res.json(result.rows);
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    res.status(500).json({ error: 'Veritabanına bağlanırken hata oluştu' });
  }
};

exports.getFirmaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM firma_iletisimleri WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Firma bulunamadı' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    res.status(500).json({ error: 'Veritabanına bağlanırken hata oluştu' });
  }
}