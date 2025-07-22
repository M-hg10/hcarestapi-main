
# 📦 Ürün Yönetim API'si

Node.js (Express.js) ile geliştirilmiş, PostgreSQL veritabanı kullanan bir ürün yönetim API'sidir.  
Ürünler tablosundaki verileri **listeleme, ekleme, güncelleme, silme** işlemleri yapılabilir.

---

## 🚀 Kurulum

```bash
git clone <repo-url>
cd urunler-api
npm install
```

`.env` dosyası oluşturun ve veritabanı bilgilerinizi girin:

```
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=urunlerdb
DB_PASSWORD=***
DB_PORT=5432
```

---

## 🧠 Veritabanı Yapısı (`urunler` tablosu)

```sql
CREATE TABLE urunler (
  urun_id SERIAL PRIMARY KEY,
  barkod TEXT,
  urun_adi TEXT,
  kategori TEXT,
  marka TEXT,
  tedarikci TEXT,
  birim TEXT,
  birim_fiyat NUMERIC(10,2),
  alis_fiyati NUMERIC(10,2),
  kdv_orani NUMERIC(4,2),
  stok_miktari INTEGER,
  kritik_stok_miktari INTEGER,
  aktif BOOLEAN,
  olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  guncelleme_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  aciklama TEXT,
  toptan_fiyat NUMERIC(10,2),
  perakende_fiyat NUMERIC(10,2),
  kisa_aciklama TEXT
);
```

---

## 🔗 API Uç Noktaları

### 📥 GET `/urunler`

Tüm ürünleri listeler.

**Yanıt:**
```json
[
  {
    "urun_id": 1,
    "barkod": "123456789",
    "urun_adi": "Stick Şeker",
    "kategori": "Gıda",
    ...
  }
]
```

---

### 📥 GET `/urunler/:id`

Belirli bir ürünü ID ile getirir.

**Yanıt:**
```json
{
  "urun_id": 2,
  "urun_adi": "Kare Baharat",
  "kategori": "Baharat",
  ...
}
```

---

### ➕ POST `/urunler`

Yeni ürün ekler.

**Gönderilecek JSON:**
```json
{
  "barkod": "987654321",
  "urun_adi": "Yeni Ürün",
  "kategori": "Kategori Adı",
  "marka": "Marka",
  "tedarikci": "Tedarikçi",
  "birim": "Adet",
  "birim_fiyat": 9.99,
  "alis_fiyati": 6.99,
  "kdv_orani": 18,
  "stok_miktari": 100,
  "kritik_stok_miktari": 10,
  "aktif": true,
  "aciklama": "Açıklama metni",
  "toptan_fiyat": 8.00,
  "perakende_fiyat": 10.50,
  "kisa_aciklama": "Kısa bilgi"
}
```

---

### ✏️ PUT `/urunler/:id`

Mevcut ürünü günceller.

**Gönderilecek JSON:**  
POST ile aynı formatı kullanır.

---

### 🗑 DELETE `/urunler/:id`

Belirtilen ID'ye sahip ürünü siler.

---

## 🧪 Test

```bash
npm run dev
```

Test için Postman, Thunder Client veya cURL kullanılabilir.

---

## 🧰 Kullanılan Teknolojiler

- Node.js + Express
- PostgreSQL
- `pg` paketi ile veritabanı bağlantısı
- REST API yapısı

---

## 📌 Notlar

- `olusturma_tarihi` ve `guncelleme_tarihi` sistem tarafından otomatik atanır.
- `aktif` alanı ile ürün yayında mı kontrol edilebilir.
- `kritik_stok_miktari` ile azalan stoklara uyarı sistemi kurulabilir.

---

## 📞 İletişim

> 👨‍💻 Geliştirici: **Halil Bey**  
> 📧 İletişim: `your@email.com`

---
