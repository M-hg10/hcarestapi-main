const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../users'); // az önceki dosya

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Kullanıcı bulunamadı' });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Şifre hatalı' });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
});

module.exports = router;
// Bu kod, kullanıcı giriş işlemini gerçekleştiren bir Express.js route tanımıdır.
// Kullanıcı adı ve şifre kontrolü yapar, eğer doğruysa JWT token oluşturur ve döner.