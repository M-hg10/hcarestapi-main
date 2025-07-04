const pool = require("../db"); // pg Pool

// Kayıt oluştur
exports.createUretim = async (req, res) => {
    const {
        firma,
        urunler,
        kisi,
        teklif_fiyat,
        klise_durumu,
        klise_tutari,
        ambalaj_kg,
        ambalaj_odeme,
        ambalaj_tutari,
        uretim_miktari
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO uretimkayit 
        (firma, urunler, kisi, teklif_fiyat, klise_durumu, klise_tutari, ambalaj_kg, ambalaj_odeme, ambalaj_tutari, uretim_miktari)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
            [
                firma,
                urunler,
                kisi,
                teklif_fiyat,
                klise_durumu,
                klise_tutari,
                ambalaj_kg,
                ambalaj_odeme,
                ambalaj_tutari,
                uretim_miktari
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("createUretim error:", err.message);
        res.status(500).json({ error: "Veri eklenirken hata oluştu." });
    }
};

// Kayıt güncelle
exports.updateUretim = async (req, res) => {
    const id = req.params.id;
    const {
        firma,
        urunler,
        kisi,
        teklif_fiyat,
        klise_durumu,
        klise_tutari,
        ambalaj_kg,
        ambalaj_odeme,
        ambalaj_tutari,
        uretim_miktari
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE uretimkayit SET
         firma = $1,
         urunler = $2,
         kisi = $3,
         teklif_fiyat = $4,
         klise_durumu = $5,
         klise_tutari = $6,
         ambalaj_kg = $7,
         ambalaj_odeme = $8,
         ambalaj_tutari = $9,
         uretim_miktari = $10
       WHERE id = $11
       RETURNING *`,
            [
                firma,
                urunler,
                kisi,
                teklif_fiyat,
                klise_durumu,
                klise_tutari,
                ambalaj_kg,
                ambalaj_odeme,
                ambalaj_tutari,
                uretim_miktari,
                id
            ]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Kayıt bulunamadı." });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("updateUretim error:", err.message);
        res.status(500).json({ error: "Veri güncellenirken hata oluştu." });
    }
};

// Tüm kayıtları getir
exports.getAllUretim = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM uretimkayit ORDER BY created_at DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error("getAllUretim error:", err.message);
        res.status(500).json({ error: "Veri alınırken hata oluştu." });
    }
};
