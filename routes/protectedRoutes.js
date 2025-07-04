const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

router.get('/admin', auth(['admin']), (req, res) => {
  res.json({ message: `Merhaba admin ${req.user.username}` });
});

router.get('/user', auth(['user', 'admin']), (req, res) => {
  res.json({ message: `Merhaba kullanıcı ${req.user.username}` });
});

module.exports = router;
