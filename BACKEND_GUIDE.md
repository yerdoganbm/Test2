# Backend ve Veritabanı Entegrasyon Rehberi

## 📌 Mevcut Durum

Uygulamanız **frontend-only** olarak geliştirildi:
- ✅ Tüm ekranlar hazır
- ✅ Mock data ile test edilebilir
- ❌ Backend API yok
- ❌ Veritabanı bağlantısı yok

---

## 🎯 Backend Entegrasyon Yöntemleri

### Seçenek 1: Supabase (EN KOLAY) ⭐ ÖNERİLEN

**Neden Supabase?**
- ✅ PostgreSQL database (tam SQL desteği)
- ✅ Hazır Authentication (telefon numarası ile giriş)
- ✅ Real-time subscriptions (canlı güncelleme)
- ✅ Storage (profil fotoğrafları)
- ✅ Ücretsiz plan (50,000 row)
- ✅ 5 dakikada kurulum

#### Kurulum Adımları:

**1. Supabase Hesabı Oluşturun**
```
https://supabase.com
- Ücretsiz hesap açın
- Yeni proje oluşturun
- Database şifrenizi kaydedin
```

**2. Tabloları Oluşturun**
```sql
-- Kullanıcı talimatlarda verilen SQL tablolarını çalıştırın
-- SQL Editor'de:
CREATE TABLE users (...);
CREATE TABLE fields (...);
CREATE TABLE matches (...);
CREATE TABLE attendance (...);
CREATE TABLE payments (...);
CREATE TABLE lineup_drafts (...);
```

**3. Supabase Client Kurun**
```bash
npm install @supabase/supabase-js
```

**4. API Config Dosyası Oluşturun**
```javascript
// src/config/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxxxx.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**5. Store'u Güncelleyin**
```javascript
// src/store/index.js
import { supabase } from '../config/supabase';

// Mock data yerine:
const fetchUsers = async () => {
  const { data } = await supabase.from('users').select('*');
  return data;
};
```

**Maliyet:** Ücretsiz (50K row'a kadar)  
**Kurulum Süresi:** 30 dakika  
**Zorluk:** Kolay

---

### Seçenek 2: Firebase (GOOGLE)

**Neden Firebase?**
- ✅ Google'ın servisi
- ✅ NoSQL database (Firestore)
- ✅ Real-time
- ✅ Authentication dahil
- ✅ Push notifications
- ✅ Analytics

#### Kurulum Adımları:

**1. Firebase Projesi**
```
https://console.firebase.google.com
- Proje oluştur
- iOS app ekle (Bundle ID: com.halisaha.otomasyon)
- google-services.json indir
```

**2. Firebase Kurun**
```bash
npm install firebase
npm install @react-native-firebase/app
npm install @react-native-firebase/firestore
```

**3. Config**
```javascript
// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "...",
  projectId: "...",
  // ...
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

**4. Kullanım**
```javascript
import { collection, getDocs } from 'firebase/firestore';

const users = await getDocs(collection(db, 'users'));
```

**Maliyet:** Ücretsiz (Spark plan)  
**Kurulum Süresi:** 45 dakika  
**Zorluk:** Orta

---

### Seçenek 3: Kendi Backend'iniz (Node.js + PostgreSQL)

**Neden Kendi Backend?**
- ✅ Tam kontrol
- ✅ Custom business logic
- ✅ Karmaşık sorgular
- ✅ Veri privacy

#### Stack:
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (veya MySQL)
- **ORM:** Prisma (veya TypeORM)
- **Auth:** JWT
- **Hosting:** Railway, Render, Heroku

#### Kurulum Adımları:

**1. Backend Projesi Oluşturun**
```bash
mkdir halisaha-backend
cd halisaha-backend
npm init -y
npm install express pg prisma @prisma/client
npm install bcrypt jsonwebtoken cors
```

**2. Prisma Schema**
```prisma
// prisma/schema.prisma
model User {
  id                String   @id @default(uuid())
  phone             String   @unique
  nickname          String
  role              String   @default("PLAYER")
  reliabilityScore  Int      @default(100)
  skillRating       Float    @default(5.0)
  createdAt         DateTime @default(now())
}

model Match {
  id            String   @id @default(uuid())
  fieldId       String
  startsAt      DateTime
  status        String   @default("OPEN")
  costTotal     Float
  costPerPerson Float
  createdAt     DateTime @default(now())
}
```

**3. API Endpoints**
```javascript
// server.js
const express = require('express');
const app = express();

// Users
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = await prisma.user.create({ data: req.body });
  res.json(user);
});

// Matches
app.get('/api/matches', async (req, res) => {
  const matches = await prisma.match.findMany();
  res.json(matches);
});

app.listen(3000);
```

**4. Frontend'de API Client**
```javascript
// src/services/api.js
const API_URL = 'https://your-backend.com/api';

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

export const createMatch = async (matchData) => {
  const response = await fetch(`${API_URL}/matches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(matchData),
  });
  return response.json();
};
```

**5. Store Entegrasyonu**
```javascript
// src/store/index.js
import { fetchUsers, createMatch } from '../services/api';

export const useStore = create((set) => ({
  users: [],
  
  loadUsers: async () => {
    const users = await fetchUsers();
    set({ users });
  },
  
  createMatch: async (matchData) => {
    const match = await createMatch(matchData);
    set((state) => ({ matches: [...state.matches, match] }));
  },
}));
```

**Maliyet:** $5-10/ay (hosting)  
**Kurulum Süresi:** 3-4 saat  
**Zorluk:** İleri

---

### Seçenek 4: Hybrid (AsyncStorage + Backend)

**Offline-first yaklaşım:**
- ✅ Veriler cihazda saklanır (AsyncStorage)
- ✅ İnternet olduğunda sync edilir
- ✅ Offline çalışır

```bash
npm install @react-native-async-storage/async-storage
```

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Kaydet
await AsyncStorage.setItem('users', JSON.stringify(users));

// Oku
const users = JSON.parse(await AsyncStorage.getItem('users'));
```

---

## 🔧 Hızlı Başlangıç: Supabase ile (30 Dakika)

### 1. Supabase Kurulumu

```bash
npm install @supabase/supabase-js
```

### 2. Config Dosyası
```bash
# .env dosyası oluşturun
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJ...
```

### 3. Supabase Client
```javascript
// src/config/supabase.js
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig.extra.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig.extra.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 4. API Service
```javascript
// src/services/api.js
import { supabase } from '../config/supabase';

export const api = {
  // Users
  getUsers: async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  },
  
  createUser: async (user) => {
    const { data, error } = await supabase.from('users').insert([user]);
    if (error) throw error;
    return data[0];
  },
  
  // Matches
  getMatches: async () => {
    const { data, error } = await supabase
      .from('matches')
      .select('*, fields(*)')
      .order('starts_at', { ascending: true });
    if (error) throw error;
    return data;
  },
  
  createMatch: async (match) => {
    const { data, error } = await supabase.from('matches').insert([match]);
    if (error) throw error;
    return data[0];
  },
  
  // Attendance
  updateAttendance: async (matchId, userId, status) => {
    const { data, error } = await supabase
      .from('attendance')
      .upsert({ match_id: matchId, user_id: userId, status });
    if (error) throw error;
    return data;
  },
  
  // Payments
  getPayments: async (matchId) => {
    const { data, error } = await supabase
      .from('payments')
      .select('*, users(*)')
      .eq('match_id', matchId);
    if (error) throw error;
    return data;
  },
  
  updatePayment: async (paymentId, status) => {
    const { data, error } = await supabase
      .from('payments')
      .update({ status, paid_at: new Date() })
      .eq('id', paymentId);
    if (error) throw error;
    return data;
  },
};
```

### 5. Store Güncelleme
```javascript
// src/store/index.js
import { create } from 'zustand';
import { api } from '../services/api';

export const useStore = create((set, get) => ({
  users: [],
  matches: [],
  loading: false,
  error: null,
  
  // Load data
  loadUsers: async () => {
    set({ loading: true });
    try {
      const users = await api.getUsers();
      set({ users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  loadMatches: async () => {
    set({ loading: true });
    try {
      const matches = await api.getMatches();
      set({ matches, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Create
  createMatch: async (matchData) => {
    try {
      const match = await api.createMatch(matchData);
      set((state) => ({ matches: [...state.matches, match] }));
      return match;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  // Update attendance
  updateAttendance: async (matchId, userId, status) => {
    try {
      await api.updateAttendance(matchId, userId, status);
      // Reload attendance
      await get().loadMatches();
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
```

### 6. Ekranlarda Kullanım
```javascript
// src/screens/HomeScreen.js
import { useEffect } from 'react';
import { useStore } from '../store';

const HomeScreen = () => {
  const loadUsers = useStore((state) => state.loadUsers);
  const loadMatches = useStore((state) => state.loadMatches);
  
  useEffect(() => {
    loadUsers();
    loadMatches();
  }, []);
  
  // Rest of component...
};
```

---

## 📊 Karşılaştırma Tablosu

| Özellik | Supabase | Firebase | Kendi Backend | AsyncStorage |
|---------|----------|----------|---------------|--------------|
| Kurulum | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Maliyet | Ücretsiz | Ücretsiz | $5-10/ay | Ücretsiz |
| Real-time | ✅ | ✅ | Manuel | ❌ |
| Offline | ❌ | ✅ | ❌ | ✅ |
| SQL | ✅ | ❌ | ✅ | ❌ |
| Authentication | ✅ | ✅ | Manuel | ❌ |
| Ölçeklenebilirlik | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

---

## 🎯 ÖNERİM

**Başlangıç için:** Supabase (30 dakika)  
**Uzun vadede:** Kendi Backend (tam kontrol)  
**Offline gerekirse:** AsyncStorage + Backend sync

---

## 📝 Sonraki Adımlar

1. **Supabase Hesabı Açın** (5 dk)
2. **Tabloları Oluşturun** (10 dk)
3. **API Config Ekleyin** (5 dk)
4. **Store'u Güncelleyin** (10 dk)
5. **Test Edin** (5 dk)

**Toplam: 35 dakika → Canlı backend!**

---

## 🆘 Yardım

Hangi yöntemi seçerseniz seçin, size adım adım yardımcı olabilirim:
- Supabase kurulum
- Firebase entegrasyon
- Backend geliştirme
- API endpoint'ler
- Authentication
- Real-time features

Hangisini yapmak istersiniz? 🚀
