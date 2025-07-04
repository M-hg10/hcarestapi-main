// models/ApikullaniciModel.js
const pool = require('../db');

const ApikullaniciModel = {
  async createUser(data) {
    const { ad, soyad, email, firma, cinsiyet, telefon } = data;
    const result = await pool.query(
      `INSERT INTO Apikullanicilar (ad, soyad, email, firma, cinsiyet, telefon)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING api_anahtari`,
      [ad, soyad, email, firma, cinsiyet, telefon]
    );
    return result.rows[0];
  },

  async findByApiKey(apiKey) {
    const result = await pool.query(
      `SELECT * FROM Apikullanicilar WHERE api_anahtari = $1 AND api_aktif = true`,
      [apiKey]
    );
    return result.rows[0];
  },

  async incrementUsage(apiKey) {
    await pool.query(
      `UPDATE Apikullanicilar SET api_kullanim_sayaci = api_kullanim_sayaci + 1 WHERE api_anahtari = $1`,
      [apiKey]
    );
  },
};

module.exports = ApikullaniciModel;
