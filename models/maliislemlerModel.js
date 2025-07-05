const pool = require('../db');

async function getBakiyeByFirmaVeTarih(firmaAdi, baslangicTarihi, bitisTarihi) {
    let query = `
      SELECT 
        firma_adi,
        SUM(toplam_tutar) AS toplam_tutar,
        SUM(tahsilat) AS tahsilat,
        SUM(toplam_tutar) - SUM(tahsilat) AS bakiye
      FROM 
        maliislemler
      WHERE 
        firma_adi = $1
    `;
  
    const params = [firmaAdi];
  
    if (baslangicTarihi && bitisTarihi) {
      query += ` AND islem_tarihi BETWEEN $2 AND $3 `;
      params.push(baslangicTarihi, bitisTarihi);
    }
  
    query += ` GROUP BY firma_adi;`;
  
    const { rows } = await pool.query(query, params);
    return rows[0];
  }
  
  module.exports = { getBakiyeByFirmaVeTarih };
