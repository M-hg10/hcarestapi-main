const pool = require('../db');

// 🔍 GET /urunler
exports.urunleriGetir = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM urunler ORDER BY urun_id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Veri çekme hatası:', err);
    res.status(500).json({ mesaj: 'Veritabanı hatası' });
  }
};

// 🔍 GET /urunler/:id
exports.urunGetir = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM urunler WHERE urun_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Ürün bulunamadı' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Veri çekme hatası:', err);
    res.status(500).json({ mesaj: 'Hata oluştu' });
  }
};

// ➕ POST /urunler
exports.urunEkle = async (req, res) => {
  const {
    barkod, urun_adi, kategori, marka, tedarikci, birim,
    birim_fiyat, alis_fiyati, kdv_orani, stok_miktari,
    kritik_stok_miktari, aktif, aciklama, toptan_fiyat,
    perakende_fiyat, kisa_aciklama
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO urunler (
        barkod, urun_adi, kategori, marka, tedarikci, birim,
        birim_fiyat, alis_fiyati, kdv_orani, stok_miktari,
        kritik_stok_miktari, aktif, olusturma_tarihi, guncelleme_tarihi,
        aciklama, toptan_fiyat, perakende_fiyat, kisa_aciklama
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10,
        $11, $12, NOW(), NOW(),
        $13, $14, $15, $16
      ) RETURNING *`,
      [
        barkod, urun_adi, kategori, marka, tedarikci, birim,
        birim_fiyat, alis_fiyati, kdv_orani, stok_miktari,
        kritik_stok_miktari, aktif, aciklama, toptan_fiyat,
        perakende_fiyat, kisa_aciklama
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Ekleme hatası:', err);
    res.status(500).json({ mesaj: 'Ürün eklenemedi' });
  }
};

// ✏️ PUT /urunler/:id
exports.urunGuncelle = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    barkod, urun_adi, kategori, marka, tedarikci, birim,
    birim_fiyat, alis_fiyati, kdv_orani, stok_miktari,
    kritik_stok_miktari, aktif, aciklama, toptan_fiyat,
    perakende_fiyat, kisa_aciklama
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE urunler SET
        barkod = $1,
        urun_adi = $2,
        kategori = $3,
        marka = $4,
        tedarikci = $5,
        birim = $6,
        birim_fiyat = $7,
        alis_fiyati = $8,
        kdv_orani = $9,
        stok_miktari = $10,
        kritik_stok_miktari = $11,
        aktif = $12,
        guncelleme_tarihi = NOW(),
        aciklama = $13,
        toptan_fiyat = $14,
        perakende_fiyat = $15,
        kisa_aciklama = $16
      WHERE urun_id = $17
      RETURNING *`,
      [
        barkod, urun_adi, kategori, marka, tedarikci, birim,
        birim_fiyat, alis_fiyati, kdv_orani, stok_miktari,
        kritik_stok_miktari, aktif, aciklama, toptan_fiyat,
        perakende_fiyat, kisa_aciklama, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Ürün bulunamadı' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Güncelleme hatası:', err);
    res.status(500).json({ mesaj: 'Güncelleme başarısız' });
  }
};

// 🗑️ DELETE /urunler/:id
exports.urunSil = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM urunler WHERE urun_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Silinecek ürün bulunamadı' });
    }
    res.json({ mesaj: 'Ürün silindi', urun: result.rows[0] });
  } catch (err) {
    console.error('Silme hatası:', err);
    res.status(500).json({ mesaj: 'Silme başarısız' });
  }
};
