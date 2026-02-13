# Halı Saha Otomasyonu

Premium seviyede bir halı saha yönetim mobil uygulaması. React Native (Expo) ile geliştirilmiştir.

## 🎯 Özellikler

### 📱 5 Ana Ekran

1. **Ana Sayfa (Home)**
   - Geri sayım ile maç günü kartı
   - İnteraktif katılım butonları (Evet/Belki/Hayır)
   - Hızlı işlemler
   - Durum özeti

2. **Maçlar (Matches)**
   - Haftalık takvim görünümü
   - Gelecek ve geçmiş maçlar
   - Maç detayları ve skorlar
   - Maç raporları

3. **Kadro (Lineup)**
   - Taktik saha görünümü
   - Takım taslakları yönetimi
   - Oyuncu pozisyonları
   - Dengeli kadro kurma
   - Taslak oylama sistemi

4. **Ödemeler (Payments)**
   - Grubun kasası
   - Ödeme takibi
   - IBAN bilgileri
   - WhatsApp hatırlatma
   - Admin ödeme onayı

5. **Admin Paneli**
   - Yeni maç oluşturma
   - Üye yönetimi
   - Güven skoru düzenleme
   - WhatsApp şablonları
   - Karanlık mod ayarı

## 🎨 Tasarım Sistemi

### Renkler
- **Ana Renk**: #10B981 (Emerald Green)
- **Arka Plan**: #FFFFFF (Light) / #111827 (Dark)
- **Kartlar**: #F9FAFB (Light) / #1F2937 (Dark)
- **Metin**: #111827 (Light) / #F9FAFB (Dark)
- **Hata**: #EF4444
- **Başarı**: #10B981
- **Uyarı**: #F59E0B

### Stil Özellikleri
- 20px border-radius
- Glassmorphism efektleri
- Yumuşak gölgeler
- Apple/Fintech estetiği
- Dark mode desteği

## 🛠 Teknolojiler

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **Icons**: Lucide React Native
- **Language**: JavaScript

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npm start

# iOS'ta çalıştır
npm run ios

# Android'de çalıştır
npm run android

# Web'de çalıştır
npm run web
```

## 📂 Proje Yapısı

```
hali-saha-otomasyon/
├── src/
│   ├── constants/
│   │   └── theme.js           # Tema ve stil sistemi
│   ├── store/
│   │   └── index.js           # Zustand store ve mock data
│   ├── navigation/
│   │   └── AppNavigator.js    # Bottom tab navigation
│   └── screens/
│       ├── HomeScreen.js       # Ana sayfa
│       ├── MatchesScreen.js    # Maçlar
│       ├── LineupScreen.js     # Kadro
│       ├── PaymentsScreen.js   # Ödemeler
│       └── AdminScreen.js      # Admin paneli
├── assets/                     # Görseller ve iconlar
├── App.js                      # Ana giriş noktası
├── app.json                    # Expo konfigürasyonu
├── package.json               # Bağımlılıklar
└── babel.config.js            # Babel konfigürasyonu
```

## 👤 Kullanıcı Rolleri

### Admin
- Maç oluşturma
- Kadro düzenleme
- Ödeme onaylama
- Üye yönetimi
- Güven skoru düzenleme

### Oyuncu (Player)
- Katılım durumu bildirme
- Kadroları görüntüleme
- Ödeme yapma
- Anketlere katılma
- Kendi bilgilerini görüntüleme

## 💾 Veri Yapısı

### Kullanıcılar (Users)
- ID, telefon, nickname, avatar
- Rol (Admin/Player)
- Güven skoru (0-100)
- Tercih edilen pozisyonlar
- Yetenek seviyesi (0-10)

### Maçlar (Matches)
- Saha, tarih, saat
- Durum (Açık/Kilitli/Tamamlandı)
- Toplam ücret
- Kişi başı ücret

### Katılım (Attendance)
- Kullanıcı ve maç ilişkisi
- Durum (Evet/Belki/Hayır)
- Geç iptal kontrolü
- Gelmeme kontrolü

### Ödemeler (Payments)
- Kullanıcı ve maç ilişkisi
- Tutar
- Durum (Ödendi/Kısmi/Ödenmedi)
- Admin onayı

### Kadro Taslakları (Lineup Drafts)
- Takım dizilişleri
- Oyuncu pozisyonları
- Kilitleme durumu
- Oy sayısı

## 🎯 Özellikler Detayı

### Ana Sayfa
- **Geri Sayım**: Bir sonraki maça kalan gün, saat, dakika
- **Maç Bilgileri**: Tarih, saat, saha adı ve adresi
- **Harita Entegrasyonu**: Sahaya yol tarifi
- **Katılım Butonları**: Anında durum güncelleme
- **Hızlı İşlemler**: Kadroya bakma, ödeme yapma, anketlere katılma
- **Durum Özeti**: Toplam oyuncu sayısı ve bekleyen ödemeler

### Maçlar
- **Haftalık Takvim**: Yatay kaydırmalı hafta görünümü
- **Geçmiş/Gelecek Sekmeler**: Kolay filtreleme
- **Maç Kartları**: Detaylı bilgi ve istatistikler
- **Skorlar**: Tamamlanan maçlar için sonuçlar
- **Maç Raporu**: Geçmiş maçların detaylı analizi

### Kadro
- **Taktik Saha**: Gerçekçi futbol sahası görünümü
- **Oyuncu Pozisyonları**: Görsel pozisyon gösterimi
- **Taslak Seçimi**: Farklı kadro alternatifleri
- **Oylama Sistemi**: Oyuncular taslak seçimi yapabilir
- **Takım İstatistikleri**: Ortalama seviye hesaplama
- **Admin Kontrolleri**: Kadro kilitleme ve otomatik dengeleme

### Ödemeler
- **Grubun Kasası**: Toplanan ve beklenen tutarlar
- **Ödeme Listesi**: Tüm oyuncuların ödeme durumu
- **IBAN Kartı**: Kopyalanabilir hesap bilgileri
- **WhatsApp Hatırlatma**: Tek tıkla ödeme hatırlatması
- **Admin Onayı**: Ödemeleri onaylama sistemi
- **İstatistikler**: Ödenen/Bekleyen sayıları

### Admin Paneli
- **Maç Oluşturma**: Saha, tarih, saat ve ücret belirleme
- **Üye Yönetimi**: Oyuncu listesi ve düzenleme
- **Güven Skoru**: 60-100 arası skorlama
- **Pozisyon Yönetimi**: Oyuncuların pozisyonlarını belirleme
- **WhatsApp Şablonları**: Otomatik mesaj hazırlama
- **Tema Ayarları**: Dark mode açma/kapama

## 🌙 Dark Mode

Uygulama tam dark mode desteği ile gelir:
- Otomatik renk uyarlaması
- Tüm ekranlarda tutarlı görünüm
- Göz dostu renkler
- Admin panelinden açılıp kapatılabilir

## 📱 Uygulama Ekran Görüntüleri

Uygulama modern ve kullanıcı dostu bir arayüze sahiptir:
- Glassmorphism kartlar
- Yumuşak animasyonlar
- Tutarlı spacing sistemi (8pt grid)
- Temiz ikonografi
- Anlaşılır tipografi

## 🔐 Güvenlik

- Kullanıcı rolleri (Admin/Player)
- Admin işlevlerinde yetki kontrolü
- Ödeme onay sistemi
- Güven skoru takibi

## 📞 İletişim Entegrasyonları

### WhatsApp
- Ödeme hatırlatmaları
- Maç duyuruları
- Özelleştirilebilir şablonlar

### Harita
- iOS Maps entegrasyonu
- Android Maps entegrasyonu
- Saha konumu gösterimi

## 🚀 Geliştirme

Mock data ile çalışan tam fonksiyonel bir uygulama:
- 14 örnek kullanıcı
- 3 saha
- 4 maç (geçmiş ve gelecek)
- Katılım kayıtları
- Ödeme kayıtları
- Kadro taslakları

Backend entegrasyonu için Zustand store actions'ları API çağrılarına dönüştürülebilir.

## 📝 Lisans

Bu proje özel bir proje olup, ticari kullanım için izin gereklidir.

## 👨‍💻 Geliştirici

Halı Saha Otomasyonu - Premium Mobile Application
