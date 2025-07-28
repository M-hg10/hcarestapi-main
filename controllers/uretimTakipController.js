const pool = require('../db');

// 🔍 GET /uretim-takip
exports.takipleriGetir = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM uretim_takip ORDER BY tarih_saat DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Takip verileri alınamadı:', err);
    res.status(500).json({ mesaj: 'Veritabanı hatası' });
  }
};

// 🔍 GET /uretim-takip/:uretimkayit_id
exports.takipGetir = async (req, res) => {
  const uretimkayit_id = parseInt(req.params.uretimkayit_id);
  console.log('Gelen uretimkayit_id:', req.params.uretimkayit_id);

  try {
    const result = await pool.query(
      'SELECT * FROM uretim_takip WHERE uretimkayit_id = $1 ORDER BY tarih_saat DESC',
      [uretimkayit_id]
    );
    console.log('Gelen uretimkayit_id:', req.params.uretimkayit_id);

    if (result.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Takip verisi bulunamadı' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Veri alınamadı:', err);
    res.status(500).json({ mesaj: 'Sunucu hatası oluştu' });
  }
};

// ➕ POST /uretim-takip
exports.takipEkle = async (req, res) => {
  const { uretimkayit_id, durum, aciklama, kullanici } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO uretim_takip (
        uretimkayit_id, durum, aciklama, tarih_saat, kullanici
      ) VALUES ($1, $2, $3, NOW(), $4)
      RETURNING *`,
      [uretimkayit_id, durum, aciklama, kullanici]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Ekleme hatası:', err);
    res.status(500).json({ mesaj: 'Takip eklenemedi' });
  }
};

// ✏️ PUT /uretim-takip/:id
exports.takipGuncelle = async (req, res) => {
  const id = parseInt(req.params.id);
  const { durum, aciklama, kullanici } = req.body;

  try {
    const result = await pool.query(
      `UPDATE uretim_takip SET
        durum = $1,
        aciklama = $2,
        kullanici = $3,
        tarih_saat = NOW()
      WHERE id = $4
      RETURNING *`,
      [durum, aciklama, kullanici, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Takip kaydı bulunamadı' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Güncelleme hatası:', err);
    res.status(500).json({ mesaj: 'Güncelleme başarısız' });
  }
};

// 🗑️ DELETE /uretim-takip/:id
exports.takipSil = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM uretim_takip WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Silinecek takip bulunamadı' });
    }
    res.json({ mesaj: 'Takip kaydı silindi', takip: result.rows[0] });
  } catch (err) {
    console.error('Silme hatası:', err);
    res.status(500).json({ mesaj: 'Silme başarısız' });
  }
};
