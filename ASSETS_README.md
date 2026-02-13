# iOS Asset'leri Oluşturma Rehberi

## 📱 Gerekli Asset'ler

iOS uygulamanız için aşağıdaki görsellere ihtiyacınız var:

### 1. App Icon (Uygulama İkonu)
- **Boyut**: 1024x1024 px (PNG, şeffaf olmayan arka plan)
- **Dosya**: `assets/icon.png`
- **Renkler**: Emerald green (#10B981) temalı futbol sahası ikonu önerilir

### 2. Splash Screen (Açılış Ekranı)
- **Boyut**: 1242x2436 px (iPhone Pro Max çözünürlüğü)
- **Dosya**: `assets/splash.png`
- **Tasarım**: Emerald green arka plan (#10B981) üzerinde beyaz logo/metin

### 3. Adaptive Icon (Android için)
- **Boyut**: 1024x1024 px
- **Dosya**: `assets/adaptive-icon.png`
- **Not**: Android için gerekli, iOS için opsiyonel

### 4. Favicon (Web için)
- **Boyut**: 48x48 px veya 16x16 px
- **Dosya**: `assets/favicon.png`

## 🎨 Tasarım Önerileri

### App Icon İçin:
```
- Yeşil futbol sahası görseli
- Ortada beyaz futbol topu
- Minimalist ve modern tasarım
- "HS" (Halı Saha) harfleri alternatif olabilir
```

### Splash Screen İçin:
```
- Tam ekran emerald green (#10B981) arka plan
- Ortada beyaz uygulama logosu
- "Halı Saha Otomasyonu" yazısı (beyaz)
- Alt kısımda küçük futbol topu ikonu
```

## 🛠 Hızlı Oluşturma Yöntemleri

### Yöntem 1: Expo Icon Generator (Önerilen)
```bash
# Asset'lerinizi otomatik optimize et
npx expo-asset-utils generate-icons
```

### Yöntem 2: Online Araçlar
1. **Figma/Canva**: Ücretsiz tasarım araçları
2. **App Icon Generator**: https://appicon.co
3. **Splash Screen Generator**: https://apetools.webprofusion.com

### Yöntem 3: Manuel Oluşturma
1. Photoshop/GIMP ile 1024x1024 px canvas oluşturun
2. Emerald green (#10B981) arka plan uygulayın
3. Futbol sahası/top görseli ekleyin
4. PNG olarak kaydedin ve `assets/icon.png` olarak yerleştirin

## 📋 Asset Checklist

Aşağıdaki dosyaların mevcut ve doğru boyutlarda olduğundan emin olun:

- [ ] `assets/icon.png` (1024x1024 px)
- [ ] `assets/splash.png` (1242x2436 px)
- [ ] `assets/adaptive-icon.png` (1024x1024 px)
- [ ] `assets/favicon.png` (48x48 px)

## 🎯 Renk Paleti

Uygulamanın renk teması:

- **Primary**: #10B981 (Emerald Green)
- **Background**: #FFFFFF (White)
- **Text**: #111827 (Dark Gray)
- **Accent**: #34D399 (Light Green)

## 🔧 iOS Build İçin Notlar

### Xcode ile Build Alırken:
1. Xcode'da projenizi açın
2. `Images.xcassets` > `AppIcon` klasörüne gidin
3. Gerekli tüm boyutları Xcode otomatik oluşturacak
4. Orijinal 1024x1024 px icon'unuzu sağlayın

### Expo ile Build Alırken:
```bash
# iOS build
eas build --platform ios

# Veya local build
expo prebuild
cd ios
pod install
```

## 📱 Test Etme

Asset'lerin doğru çalıştığını test edin:

```bash
# iOS simulator'da test
npm run ios

# Gerçek cihazda test (Expo Go)
npm start
# QR kodu iPhone ile tarayın
```

## ⚠️ Önemli Notlar

1. **Şeffaflık**: App icon'da şeffaflık kullanmayın (iOS red eder)
2. **Çözünürlük**: Retina display için yüksek çözünürlük kullanın
3. **Dosya Boyutu**: PNG dosyaları 1MB'dan küçük olmalı
4. **İçerik**: Telif hakkı olan görseller kullanmayın

## 🎨 Örnek Icon Konsepti

```
┌─────────────────────┐
│                     │
│                     │
│    ┌─────────┐     │
│    │ ╔═══╗   │     │
│    │ ║ ⚽ ║   │     │  <- Futbol topu
│    │ ╚═══╝   │     │     ortada
│    └─────────┘     │
│                     │
│   Halı Saha        │
│                     │
└─────────────────────┘
   Emerald Green BG
```

## 🚀 Asset'leri Değiştirdikten Sonra

```bash
# Cache'i temizle
expo start -c

# Build'i yeniden oluştur
expo prebuild --clean
```

## 📞 Yardım

Asset oluşturma konusunda sorun yaşarsanız:
- Expo dokümantasyonu: https://docs.expo.dev/guides/app-icons/
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/app-icons
