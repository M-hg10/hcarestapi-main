
# 🏭 Üretim Kayıt API Dokümantasyonu

Bu RESTful API, üretim sürecindeki verileri PostgreSQL veritabanına kaydetmek, görüntülemek ve güncellemek için kullanılır.

---

## 🌐 Base URL

```
https://api.hggrup.com/uretim/
```

Tüm endpointler bu URL üzerinden çağrılır.

---

## 📌 Endpointler ve Açıklamaları

### 🔹 GET `/`

#### ✅ Amaç:
Tüm üretim kayıtlarını listeler.

#### 📥 Örnek İstek:
```http
GET https://api.hggrup.com/uretim/
```

#### 📤 Örnek Yanıt:
```json
[
  {
    "id": 1,
    "firma": "HG Grup",
    "urunler": "şeker, çubuk, ambalaj",
    "kisi": "Halil",
    "teklif_fiyat": "2500",
    "klise_durumu": "Ödendi",
    "klise_tutari": "500",
    "ambalaj_kg": "250",
    "ambalaj_odeme": "Ödendi",
    "ambalaj_tutari": "1000",
    "uretim_miktari": "12000",
    "created_at": "2025-07-04T18:52:00.000Z"
  }
]
```

---

### 🔹 POST `/`

#### ✅ Amaç:
Yeni bir üretim kaydı oluşturur.

#### 📥 Örnek İstek:
```http
POST https://api.hggrup.com/uretim/
Content-Type: application/json
```

#### 📦 Request Body:
```json
{
  "firma": "HG Grup",
  "urunler": "şeker, çubuk, ambalaj",
  "kisi": "Halil",
  "teklif_fiyat": "2500",
  "klise_durumu": "Ödendi",
  "klise_tutari": "500",
  "ambalaj_kg": "250",
  "ambalaj_odeme": "Ödendi",
  "ambalaj_tutari": "1000",
  "uretim_miktari": "12000"
}
```

#### 📤 Örnek Yanıt:
```json
{
  "id": 2,
  "firma": "HG Grup",
  "urunler": "şeker, çubuk, ambalaj",
  "kisi": "Halil",
  "teklif_fiyat": "2500",
  "klise_durumu": "Ödendi",
  "klise_tutari": "500",
  "ambalaj_kg": "250",
  "ambalaj_odeme": "Ödendi",
  "ambalaj_tutari": "1000",
  "uretim_miktari": "12000",
  "created_at": "2025-07-04T18:52:00.000Z"
}
```

---

### 🔹 PUT `/:id`

#### ✅ Amaç:
Belirtilen `id` değerine sahip üretim kaydını **tamamen günceller**.

#### 📥 Örnek İstek:
```http
PUT https://api.hggrup.com/uretim/2
Content-Type: application/json
```

#### 📦 Request Body:
```json
{
  "firma": "Lavinya Güncel",
  "urunler": "ambalaj",
  "kisi": "Gökhan",
  "teklif_fiyat": "1900",
  "klise_durumu": "Ödenmedi",
  "klise_tutari": "0",
  "ambalaj_kg": "150",
  "ambalaj_odeme": "Beklemede",
  "ambalaj_tutari": "700",
  "uretim_miktari": "8000"
}
```

#### 📤 Örnek Yanıt:
```json
{
  "id": 2,
  "firma": "Lavinya Güncel",
  "urunler": "ambalaj"
}
```

---

### 🔹 PATCH `/:id`

#### ✅ Amaç:
Belirtilen `id`’ye sahip üretim kaydının sadece gönderilen alanlarını **parça parça günceller**.

#### 📥 Örnek İstek:
```http
PATCH https://api.hggrup.com/uretim/2
Content-Type: application/json
```

#### 📦 Request Body:
```json
{
  "klise_durumu": "Ödendi",
  "ambalaj_tutari": "950"
}
```

#### 📤 Örnek Yanıt:
```json
{
  "id": 2,
  "firma": "Lavinya Güncel",
  "klise_durumu": "Ödendi",
  "ambalaj_tutari": "950"
}
```

---

## 🧱 PostgreSQL Tablo Yapısı

```sql
CREATE TABLE uretimkayit (
  id SERIAL PRIMARY KEY,
  firma TEXT NOT NULL,
  urunler TEXT,
  kisi TEXT,
  teklif_fiyat TEXT,
  klise_durumu TEXT,
  klise_tutari TEXT,
  ambalaj_kg TEXT,
  ambalaj_odeme TEXT,
  ambalaj_tutari TEXT,
  uretim_miktari TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Test Komutları

### 🔸 curl ile PATCH Örneği:
```bash
curl -X PATCH https://api.hggrup.com/uretim/2   -H "Content-Type: application/json"   -d '{"klise_durumu": "Ödendi", "ambalaj_tutari": "950"}'
```

---

## 🗂 Alan Açıklamaları

| Alan              | Açıklama                       |
|-------------------|--------------------------------|
| `firma`           | Üretim yapılan firma adı       |
| `urunler`         | Ürün listesi (text olarak)     |
| `kisi`            | Formu dolduran kişi            |
| `teklif_fiyat`    | Toplam teklif fiyatı (TL)      |
| `klise_durumu`    | Klişe ödeme durumu             |
| `klise_tutari`    | Klişe tutarı (TL)              |
| `ambalaj_kg`      | Ambalaj miktarı (kg)           |
| `ambalaj_odeme`   | Ambalaj ödeme durumu           |
| `ambalaj_tutari`  | Ambalaj maliyeti (TL)          |
| `uretim_miktari`  | Üretim miktarı (adet/kg)       |
| `created_at`      | Kayıt zamanı (otomatik atanır) |

---

## 📬 Destek

Herhangi bir sorun ya da öneri için: [destek@hggrup.com](mailto:destek@hggrup.com)
