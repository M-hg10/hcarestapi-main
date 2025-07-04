const db = require('../db');
exports.getBakiyeByTelefon = async (req, res) => {
  const { telefon } = req.params;

  try {
    const result = await db.query(
      'SELECT bakiye FROM kargo_kredi_sorgulama WHERE telefon_no = $1',
      [telefon]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Telefon numarasına ait kayıt bulunamadı' });
    }

    res.json({ bakiye: result.rows[0].bakiye });
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    res.status(500).json({ error: 'Veritabanına bağlanırken hata oluştu' });
  }
};
