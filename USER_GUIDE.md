# 📱 Halı Saha Otomasyonu - Kullanıcı Rehberi

## 🎯 Uygulama Özeti

**Halı Saha Otomasyonu**, halı saha gruplarının tüm işleyişini yöneten kapsamlı bir mobil uygulamadır. Maç organizasyonu, kadro oluşturma, ödeme takibi, anketler ve çok daha fazlası tek uygulamada!

---

## 📲 İlk Kurulum

### 1. Uygulamayı İndirin
- App Store'dan "Halı Saha Otomasyonu"nu indirin
- Veya Expo Go ile test edin (geliştiriciler için)

### 2. Giriş Yapın
- **Mevcut Üye:** Telefon numaranızla giriş yapın
- **Yeni Üye:** "Gruba Katıl" ile grup kodunu girin
- Profil oluşturma adımlarını tamamlayın

### 3. Hazırsınız!
Ana sayfa açılacak ve bir sonraki maçı göreceksiniz.

---

## 🏠 Ana Sayfa

### Özellikler:
- **Maç Countdown**: Bir sonraki maça kalan süre
- **Katılım Durumu**: Evet/Belki/Hayır butonları
- **Hızlı İşlemler**: Kadroya bak, ödeme yap, anketlere katıl
- **Durum Özeti**: Kaç oyuncu katılıyor, kaç ödeme bekliyor

### Nasıl Kullanılır:
1. Maç kartındaki bilgileri okuyun (tarih, saha, ücret)
2. Katılım durumunuzu seçin (yeşil/sarı/kırmızı butonlar)
3. Hızlı işlemlerden istediğiniz bölüme gidin
4. Aşağı kaydırarak durum özetini görün

### İpuçları:
- 📍 Saha adresine tıklayarak harita açabilirsiniz
- 🔄 Aşağı çekerek yenileyin (pull-to-refresh)
- 🔔 Countdown sizi sürekli bilgilendirir

---

## 📅 Maçlar

### Özellikler:
- **Haftalık Takvim**: Yatay kaydırmalı 7 günlük görünüm
- **Gelecek Maçlar**: Planlanmış maçlar listesi
- **Geçmiş Maçlar**: Skorlar ve maç raporları

### Nasıl Kullanılır:
1. Üstteki takvimde hafta değiştirin (< > ok tuşları)
2. "Gelecek" veya "Geçmiş" sekmesini seçin
3. Maç kartına tıklayarak detaylara gidin
4. Geçmiş maçlarda "Maç Raporu"na tıklayın

### İpuçları:
- 📆 Takvimde yeşil nokta = O gün maç var
- 🏆 Geçmiş maçlarda skor gösterilir
- 📊 Maç raporunda MVP ve istatistikler var

---

## 🗳️ Anketler (YENİ)

### Özellikler:
- **Grup Oylamaları**: Saha seçimi, saat seçimi vb.
- **Progress Bar**: Oy dağılımını görsel olarak görün
- **Admin**: Yeni anket oluşturabilir

### Nasıl Kullanılır:
1. Aktif anketleri görün
2. İstediğiniz seçeneğe tıklayarak oy verin
3. Anlık sonuçları progress bar'da izleyin
4. (Admin) "Yeni" butonu ile anket oluşturun

### İpuçları:
- 📊 Yüzdeler otomatik hesaplanır
- ✅ Oy verdikten sonra sonuç görürsünüz
- 🔒 Kapanan anketlerde oy değiştirilemez

---

## 📊 İstatistik (YENİ)

### Özellikler:
- **Liderlik Tablosu**: Gol, asist, güven sıralaması
- **Madalyalar**: Top 3 oyuncuya özel görsel
- **Kategoriler**: 3 farklı sıralama

### Nasıl Kullanılır:
1. "Goller", "Asistler" veya "Güven" sekmesini seçin
2. Sıralamayı inceleyin
3. Oyuncu kartına tıklayarak detaylı istatistik görün

### İpuçları:
- 🥇🥈🥉 İlk 3'e madalya
- 👑 1. oyuncuya crown badge
- 📈 Tüm kategorilerde aynı oyuncular farklı sırada olabilir

---

## ⋯ Daha Fazla (YENİ HUB)

### Ana Menü:
- **Kadro & Takımlar**: Taktik saha ve kadro yönetimi
- **Ödemeler**: Ödeme listesi ve IBAN
- **Saha Rehberi**: Kayıtlı sahalar ve detayları
- **Grup Kuralları**: Kurallar ve ceza sistemi

### Admin Menüsü (Sadece Adminler):
- **Yönetim Paneli**: Ana admin kontrolleri
- **Gruba Davet Et**: Grup kodu paylaş
- **Katılım Onayı**: Bekleyen üyeleri onayla
- **WhatsApp Hub**: Toplu mesaj gönderimi
- **Mesaj Şablonları**: WhatsApp şablonlarını düzenle
- **Kasa Raporları**: Finansal analizler
- **Borç Takibi**: Ödeme yapmayan üyeler
- **Ceza Yönetimi**: Geç iptal/gelmeme cezaları
- **Saha Yönetimi**: Saha ekle/düzenle/sil
- **Maç Şablonları**: Haftalık otomatik maçlar

### Ayarlar:
- **Karanlık Mod**: Toggle ile açıp kapatın
- **Profil**: İstatistiklerinizi görün
- **Çıkış Yap**: Uygulamadan çıkış

---

## 🎯 Kullanım Senaryoları

### Senaryo 1: Yeni Maça Katılım
```
1. Ana Sayfa'yı açın
2. Maç bilgilerini okuyun
3. "Evet" butonuna tıklayın
4. ✅ Tamamlandı! Kadroda yeriniz var
```

### Senaryo 2: Ödeme Yapma
```
1. Ana Sayfa → "Ödeme Yap" veya "Ödemeler" tab
2. IBAN numarasını kopyalayın
3. Banka uygulamanızda ödemeyi yapın
4. Admin onaylayacak
```

### Senaryo 3: Kadroyu Kontrol Etme
```
1. Ana Sayfa → "Kadroya Bak"
2. Yeşil saha üzerinde takımları görün
3. Farklı taslaklar varsa değiştirin
4. Beğendiğiniz taslağa oy verin
```

### Senaryo 4: Ankete Katılma
```
1. "Anketler" tab'ına gidin
2. Aktif anketi açın
3. Seçeneğe tıklayarak oy verin
4. Sonuçları progress bar'da görün
```

### Senaryo 5: İstatistikleri Görme
```
1. "İstatistik" tab'ına gidin
2. Kategori seçin (Gol/Asist/Güven)
3. Sıralamanızı görün
4. Oyuncuya tıklayarak detay görün
```

---

## 👨‍💼 Admin İşlemleri

### Yeni Maç Oluşturma:
```
1. Daha Fazla → Yönetim Paneli
2. "Maç Oluştur" butonu
3. Saha, tarih, saat, ücret girin
4. Oluştur!
```

### Ödeme Onaylama:
```
1. Ödemeler ekranı
2. Ödenen kişinin yanında ✓ butonu
3. Onaylayın
4. Durum "Ödendi" olarak güncellenir
```

### Grup Davet Etme:
```
1. Daha Fazla → Gruba Davet Et
2. Grup kodunu kopyala
3. WhatsApp ile paylaş
4. Veya QR kod göster
```

### Katılım Onayı:
```
1. Daha Fazla → Katılım Onayı
2. Bekleyen üyeleri görün
3. ✓ Onayla veya ✗ Reddet
4. Onaylanan üye gruba katılır
```

### Anket Oluşturma:
```
1. Anketler → "Yeni" butonu
2. Başlık ve seçenekler girin
3. Oluştur
4. Grup üyeleri oy verebilir
```

---

## 🎨 Tema ve Görünüm

### Dark Mode:
```
Daha Fazla → Karanlık Mod (Toggle)
```

Tüm ekranlarda otomatik olarak uygulanır:
- Koyu arka plan
- Açık renkli metinler
- Göz dostu renkler
- Gece kullanımı için ideal

### Renkler:
- **Yeşil**: Ana renk, başarılı işlemler
- **Kırmızı**: Hata, borç, ceza
- **Sarı**: Uyarı, beklemede
- **Mavi**: Bilgi, linkler

---

## 🔔 Bildirimler ve Hatırlatmalar

### WhatsApp Entegrasyonu:
- Maç daveti mesajları
- Ödeme hatırlatmaları
- Anket bildirimleri
- Özelleştirilebilir şablonlar

### Nasıl Çalışır:
1. Admin WhatsApp Hub'dan mesaj gönderir
2. Şablon otomatik doldurulur (isim, tarih vb.)
3. Mesaj WhatsApp'ta açılır
4. Gönder butonuna basın

---

## 🎯 İpuçları ve Püf Noktaları

### Genel:
- ✅ **Aşağı Çekin**: Tüm ekranlarda pull-to-refresh var
- ✅ **Geri Dön**: iOS'ta sola kaydırarak geri gidebilirsiniz
- ✅ **Haptic**: Tüm önemli işlemlerde titreşim

### Maçlar:
- 📅 Takvimi kaydırarak ileri/geri haftalara gidin
- 🏆 Geçmiş maçlarda MVP oylamalarına katılın
- 📊 Maç raporlarında detaylı analiz görün

### Ödemeler:
- 💳 IBAN'ı tek tıkla kopyalayın
- 💬 WhatsApp ile hatırlatma gönderin
- ✅ Admin onayından sonra yeşile döner

### Kadro:
- 👥 Farklı taslakları karşılaştırın
- ⭐ Oyuncu seviyelerini görün
- 🗳️ En dengeli taslağa oy verin

---

## 🆘 Sorun Giderme

### "Uygulama Açılmıyor"
```
- İnternet bağlantınızı kontrol edin
- Uygulamayı tamamen kapatıp yeniden açın
- Cihazı yeniden başlatın
```

### "Katılım Durumu Güncellenmiyor"
```
- Aşağı çekerek yenileyin
- İnternet bağlantınızı kontrol edin
- Birkaç saniye bekleyip tekrar deneyin
```

### "WhatsApp Açılmıyor"
```
- WhatsApp yüklü mü kontrol edin
- Uygulama izinlerini kontrol edin
- Telefon numarası doğru mu?
```

### "Harita Açılmıyor"
```
- Konum izni verilmiş mi?
- Apple/Google Maps yüklü mü?
- İnternet bağlantınız var mı?
```

---

## 🔒 Gizlilik ve Güvenlik

### Veri Güvenliği:
- ✅ Tüm veriler şifreli
- ✅ Telefon numaraları gizli
- ✅ Sadece grup üyeleri görebilir
- ✅ Admin yetkisi gerekli işlemler korumalı

### İzinler:
- **Konum**: Saha konumunu göstermek için
- **Kamera**: Profil fotoğrafı için (opsiyonel)
- **Fotoğraflar**: Profil fotoğrafı için (opsiyonel)
- **Takvim**: Maçları takvime eklemek için (opsiyonel)

---

## 📊 Güven Puanı Sistemi

### Nasıl Çalışır:
- Başlangıç: **100 puan**
- Geç iptal: **-10 puan**
- Maça gelmeme: **-20 puan**
- Zamanında ödeme yapmama: **-5 puan**
- İyi davranış: Zamanla düzelir

### Puan Aralıkları:
- **90-100**: ⭐ Çok güvenilir (yeşil)
- **70-89**: ⚠️ Güvenilir (sarı)
- **0-69**: ❌ Dikkatli olunmalı (kırmızı)

### Önemi:
- Düşük puan = Kadro önceliği düşer
- 3 kez ceza = Otomatik gruptan çıkarılma
- Yüksek puan = Admin'in güvenini kazanırsınız

---

## 💰 Ödeme Sistemi

### Nasıl Ödeme Yapılır:
1. **Ödemeler** ekranına gidin
2. IBAN'ı kopyalayın (tek tıkla)
3. Banka uygulamanızda ödemeyi yapın
4. Admin onaylamasını bekleyin

### Ödeme Durumları:
- 🔴 **Ödenmedi**: Kırmızı, ödeme bekleniyor
- 🟢 **Ödendi**: Yeşil, admin onayladı

### Admin Onay Süreci:
- Ödeme yaptıktan sonra bilgilendirin
- Admin hesabı kontrol eder
- Onaylarsa durum yeşile döner
- IBAN'dan otomatik ödeme takibi

---

## 👥 Kadro Sistemi

### Taslak Seçimi:
- Admin birden fazla kadro taslağı oluşturur
- Oyuncular taslakları görür
- En dengeli/adil taslağa oy verilir
- En çok oyu alan taslak oynanır

### Pozisyonlar:
- ⚽ **Kaleci**: 1 kişi
- 🛡️ **Defans**: 2-3 kişi
- ⚙️ **Orta Saha**: 2-3 kişi
- 🎯 **Forvet**: 2-3 kişi

### Otomatik Dengeleme:
- Admin "Otomatik Dengele" butonuna basar
- Sistem skill rating'lere göre dengeli takım kurar
- Her takımın ortalama seviyesi eşitlenir

---

## 🏆 MVP ve Performans

### Maç Sonu Oylama:
1. Maç bittikten sonra "MVP Oylama" açılır
2. 3 kategori:
   - 🏆 **Maçın Adamı**: En değerli oyuncu
   - ⚽ **En Golcü**: En çok gol atan
   - 🛡️ **En İyi Savunma**: Savunmada öne çıkan
3. Her kategoride 1 oyuncu seçin
4. "Oyları Gönder" butonuna basın

### İstatistikler:
- Toplam gol/asist sayınız
- Katıldığınız maç sayısı
- MVP seçilme sayınız
- Kazanma oranınız
- Ortalama rating'iniz

---

## 🚨 Kurallar ve Cezalar

### Temel Kurallar:
1. **Maçtan 24 saat öncesine kadar iptal edilebilir**
   - Ceza: Yok

2. **24 saat içinde iptal**
   - Ceza: 30 TL + güven puanı -10

3. **Maça gelmemek**
   - Ceza: 50 TL + güven puanı -20

4. **Geç ödeme**
   - Ceza: Güven puanı -5

5. **3 kez ceza alanlar gruptan çıkarılır**

### Ceza Ödeme:
- Cezalar ödeme sistemine otomatik eklenir
- Bir sonraki maç ücretiyle birlikte ödenir
- Ödenmeyen cezalar birikerek devam eder

---

## 🔧 Ayarlar ve Kişiselleştirme

### Profil Düzenleme:
```
Daha Fazla → Profilim
- Takma adınızı değiştirin
- Pozisyonlarınızı güncelleyin
- Skill level'inizi ayarlayın
```

### Bildirim Tercihleri:
```
(İleride eklenecek)
- Maç hatırlatmaları
- Ödeme hatırlatmaları
- Anket bildirimleri
```

---

## 📱 Ekran Haritası

```
Ana Sayfa (Tab)
├── Kadroya Bak → Kadro ekranı
├── Ödeme Yap → Ödemeler ekranı
└── Anketlere Katıl → Anketler tab

Maçlar (Tab)
├── Maç Kartı → Maç Detayı
└── Maç Raporu → MVP Oylama

Anketler (Tab)
└── Yeni Anket (Admin)

İstatistik (Tab)
└── Oyuncu → Oyuncu Detay Kartı

Daha Fazla (Tab)
├── Kadro & Takımlar
├── Ödemeler
├── Saha Rehberi
│   └── Saha Kartı → Saha Detayı
├── Grup Kuralları
└── Admin Menü (10+ ekran)
```

---

## 🎓 Sık Sorulan Sorular

**S: Kaç oyuncu katılmalı?**
C: Minimum 10, ideal 14 oyuncu (7v7)

**S: Maç iptal olur mu?**
C: 10'dan az oyuncu katılırsa admin iptal edebilir

**S: Ödeme yapmadan maça gidebilir miyim?**
C: Hayır, ödeme zorunlu. Sahada sorun çıkmaması için.

**S: Güven puanım nasıl yükselir?**
C: Maçlara düzenli katılarak, zamanında ödeme yaparak

**S: Kadro nasıl belirleniyor?**
C: Admin taslak oluşturur, grup oylar, en çok oy alan taslak oynanır

**S: MVP nasıl seçiliyor?**
C: Maç sonunda tüm oyuncular oy kullanır, en çok oyu alan kazanır

**S: Hangi sahalarda oynuyoruz?**
C: Saha Rehberi'nde kayıtlı sahaları görebilirsiniz

**S: Anket sonuçları bağlayıcı mı?**
C: Evet, grup kararları ankete göre alınır

---

## 🚀 Gelişmiş Özellikler

### WhatsApp Şablonları:
Admin mesaj şablonlarını özelleştirebilir:
- Maç daveti formatı
- Ödeme hatırlatma metni
- Anket bilgilendirmesi

### Haftalık Şablonlar:
Admin tekrarlayan maçlar oluşturabilir:
- Her Pazartesi 19:00
- Her Çarşamba 20:00
- Otomatik oluşturulur

### Borç Takibi:
Admin borçlu üyeleri görür:
- Kaç gün gecikme var
- Toplam borç miktarı
- Tek tıkla WhatsApp hatırlatması

### Ceza Yönetimi:
Otomatik ceza sistemi:
- Geç iptal → 30 TL
- Gelmeme → 50 TL
- 3 ceza → Gruptan çıkarılma

---

## 📞 Destek

### Sorun mu Yaşıyorsunuz?
1. Uygulamayı yeniden başlatın
2. İnternet bağlantınızı kontrol edin
3. Grup admin'inize bildirin
4. Geliştirici desteği: [Buraya iletişim bilgisi]

### Özellik İsteği:
Yeni özellik önerileri için admin'e veya geliştirici ekibe ulaşın.

---

## 🎉 Artık Hazırsınız!

Uygulamanın tüm özelliklerini keşfettiniz. 

**İyi maçlar! ⚽🏆**

---

## 📋 Versiyon Geçmişi

### v1.0.0 (Şubat 2026)
- ✅ 29 ekran
- ✅ Stitch design
- ✅ iOS optimizasyonları
- ✅ Dark mode
- ✅ WhatsApp entegrasyonu
- ✅ Tam özellikli
