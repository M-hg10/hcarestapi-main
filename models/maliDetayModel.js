const pool = require('../db');
async function getDetayliBakiyeListesi(firmaAdi) {
    const query = `
      SELECT 
        id,
        firma_adi,
        islem_tarihi,
        toplam_tutar,
        tahsilat,
        (toplam_tutar - tahsilat) AS bakiye
      FROM 
        maliislemler
      WHERE 
        firma_adi = $1
      ORDER BY
        islem_tarihi ASC, id ASC;
    `;
    const { rows } = await pool.query(query, [firmaAdi]);
    return rows; // Array olarak tüm satırlar döner
  }
  
  module.exports = {
    getDetayliBakiyeListesi,
  };
  