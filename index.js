const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/ApikullaniciRoutes');
const firmaRoutes = require('./routes/firmaRoutes');
const authRoutes = require('./routes/authRoutes');
const krediRoutes = require('./routes/firmakrediRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Route'lar
app.use('/kredi', krediRoutes);
app.use('/firmalar', firmaRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.send(`
    Ana sayfaya hoş geldin!<br>
    API Dokümantasyonu için:<br>
    İçindekiler: /firmalar, /auth, /api, /kredi
  `);
});


// Başlat
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
