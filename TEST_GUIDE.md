# iOS Uygulamasını Test Etme Rehberi

## 📱 Yöntem 1: Expo Go ile iPhone'da Test (En Kolay)

### Adımlar:

1. **iPhone'unuza Expo Go Uygulamasını İndirin**
   - App Store'dan "Expo Go" uygulamasını indirin
   - Ücretsizdir ve hesap gerektirmez

2. **Development Server'ı Başlatın**
   ```bash
   npm start
   ```

3. **QR Kodu Tarayın**
   - Terminalde görünen QR kodu iPhone kameranızla tarayın
   - Veya Expo Go uygulamasında "Scan QR Code" yapın

4. **Uygulamanız Açılacak**
   - Tüm değişiklikler otomatik yansıyacak (Hot Reload)
   - Canlı geliştirme yapabilirsiniz

### Avantajları:
- ✅ En hızlı ve kolay yöntem
- ✅ Gerçek cihazda test
- ✅ Hot reload aktif
- ✅ Xcode gerektirmez
- ✅ Apple Developer hesabı gerektirmez

### Sınırlamaları:
- ⚠️ Bazı native modüller çalışmayabilir
- ⚠️ Custom native code test edilemez
- ⚠️ Haptic feedback çalışmayabilir (Expo Go limitasyonu)

---

## 🏗️ Yöntem 2: Development Build (Önerilen - Full Features)

### Bu yöntem TÜM özellikleri test etmenizi sağlar:

1. **EAS Build İle Development Build Oluşturun**
   ```bash
   # EAS CLI yükleyin (henüz yoksa)
   npm install -g eas-cli
   
   # Giriş yapın
   eas login
   
   # Build yapılandırması oluşturun
   eas build:configure
   
   # Development build oluşturun
   eas build --profile development --platform ios
   ```

2. **Build Tamamlandığında**
   - Size bir URL verilecek
   - Bu URL'den .ipa dosyasını indirin
   - iPhone'unuza kurun (TestFlight gerekli değil)

3. **Development Server ile Bağlayın**
   ```bash
   npm start --dev-client
   ```

### Avantajları:
- ✅ TÜM native modüller çalışır
- ✅ Haptic feedback test edilebilir
- ✅ Clipboard, Linking, DateTimePicker tam çalışır
- ✅ Production'a en yakın test
- ✅ Hot reload aktif

### Gereksinimler:
- 📝 Expo hesabı (ücretsiz)
- ⏱️ Build süresi: ~15-20 dakika

---

## 💻 Yöntem 3: macOS ile Local Build

### Sadece macOS bilgisayarınız varsa:

1. **Xcode'u İndirin**
   - App Store'dan Xcode'u indirin (ücretsiz)
   - Command Line Tools'u yükleyin:
     ```bash
     xcode-select --install
     ```

2. **iOS Klasörünü Oluşturun**
   ```bash
   expo prebuild --platform ios
   ```

3. **Pods'u Yükleyin**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Simulator'da Çalıştırın**
   ```bash
   npm run ios
   ```

### Avantajları:
- ✅ Tam kontrol
- ✅ Xcode debugger kullanabilirsiniz
- ✅ TÜM özellikler test edilebilir
- ✅ En hızlı geliştirme döngüsü

### Gereksinimler:
- 🖥️ macOS bilgisayar (zorunlu)
- 💾 ~15 GB disk alanı (Xcode)
- ⏱️ İlk kurulum: ~30 dakika

---

## 🌐 Yöntem 4: Web'de Test (Sınırlı)

### Hızlı UI kontrolü için:

```bash
npm run web
```

### Avantajları:
- ✅ En hızlı başlatma
- ✅ UI/UX kontrolü
- ✅ Layout test

### Sınırlamaları:
- ❌ iOS-spesifik özellikler çalışmaz
- ❌ Native modüller çalışmaz
- ❌ Haptic feedback yok

---

## 🎯 HANGİ YÖNTEMI SEÇMELİSİNİZ?

### Hızlı Test İçin:
→ **Yöntem 1: Expo Go** (5 dakika)

### Tam Özellik Testi İçin:
→ **Yöntem 2: Development Build** (20 dakika)

### Günlük Geliştirme İçin (macOS):
→ **Yöntem 3: Local Build** (30 dakika ilk kurulum)

### Sadece UI Kontrolü İçin:
→ **Yöntem 4: Web** (1 dakika)

---

## 📋 Önerilen Test Sırası

1. **İlk Test**: Expo Go ile temel fonksiyonları test edin
2. **Tam Test**: Development Build ile tüm özellikleri test edin
3. **Production Test**: TestFlight ile beta test yapın

---

## 🐛 Sorun Giderme

### "Cannot connect to Metro"
```bash
# Cache'i temizle ve yeniden başlat
npm start -- --clear
```

### "Unable to resolve module"
```bash
# Node modules'u yeniden yükle
rm -rf node_modules
npm install
```

### "Expo Go'da native modül hatası"
→ Development Build kullanın (Yöntem 2)

### "iOS Simulator bulunamadı" (macOS)
```bash
# Xcode'u açın ve simulator indirin
open -a Simulator
```

---

## 🎉 Test Edilerek Özellikleri

### Expo Go ile Test Edilebilir:
- ✅ Tüm UI/UX
- ✅ Navigation
- ✅ State management
- ✅ Dark mode
- ✅ Temel fonksiyonlar

### Development Build ile Test Edilebilir (EK):
- ✅ Haptic feedback
- ✅ Clipboard
- ✅ WhatsApp linking
- ✅ Maps linking
- ✅ DateTimePicker
- ✅ iOS permissions

---

## 📞 Hızlı Başlangıç Komutları

```bash
# Expo Go için
npm start

# Development build için
eas build --profile development --platform ios

# macOS simulator için (sadece Mac)
npm run ios

# Web için
npm run web
```

---

## ✨ Sonraki Adımlar

1. iPhone'unuza Expo Go indirin
2. `npm start` çalıştırın
3. QR kodu tarayın
4. Uygulamayı test edin!

Sorun yaşarsanız:
- Terminalde hata mesajlarını kontrol edin
- Expo dokümantasyonuna bakın: https://docs.expo.dev
- Metro bundler'ın çalıştığından emin olun

Başarılar! 🚀
