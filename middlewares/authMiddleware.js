const jwt = require('jsonwebtoken');

function authMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 1. Authorization header kontrolü
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Yetkilendirme başarısız: Token bulunamadı" });
    }

    const token = authHeader.split(" ")[1];

    try {
      // 2. Token doğrulama
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // 3. Role kontrolü (isteğe bağlı)
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: `Erişim reddedildi: Gerekli rol: [${allowedRoles.join(", ")}]` });
      }

      next(); // her şey yolundaysa devam et
    } catch (error) {
      return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token", error: error.message });
    }
  };
}

module.exports = authMiddleware;
