import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogIn, UserPlus, Phone, User } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, getColor, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { GradientCard, StatusChip } from '../components/StitchComponents';

const AuthScreen = ({ navigation }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const [mode, setMode] = useState('login'); // 'login' or 'join'
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [groupCode, setGroupCode] = useState('');
  
  const styles = getStyles(isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  const handleLogin = () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Hata', 'Geçerli bir telefon numarası girin');
      return;
    }
    
    Alert.alert('Başarılı', 'Giriş yapıldı!', [
      { text: 'Tamam', onPress: () => navigation.navigate('Ana Sayfa') },
    ]);
  };
  
  const handleJoin = () => {
    if (!phone || !nickname || !groupCode) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    
    Alert.alert('Başarılı', `${nickname}, gruba katıldın!`, [
      { text: 'Tamam', onPress: () => navigation.navigate('Ana Sayfa') },
    ]);
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={localStyles.container}>
          {/* Header */}
          <View style={localStyles.header}>
            <Text style={[styles.heading1, { textAlign: 'center' }]}>
              Halı Saha
            </Text>
            <Text style={[styles.heading1, { textAlign: 'center', color: colors.primary }]}>
              Otomasyonu
            </Text>
            <Text style={[styles.bodySecondary, { textAlign: 'center', marginTop: Spacing.md }]}>
              Grup maç yönetimi artık çok kolay
            </Text>
          </View>
          
          {/* Mode Selector */}
          <View style={localStyles.modeSelector}>
            <TouchableOpacity
              style={[
                localStyles.modeButton,
                mode === 'login' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setMode('login')}
              activeOpacity={0.8}
            >
              <LogIn size={20} color={mode === 'login' ? '#FFFFFF' : colors.textSecondary} />
              <Text
                style={[
                  localStyles.modeText,
                  { color: mode === 'login' ? '#FFFFFF' : colors.textSecondary },
                ]}
              >
                Giriş Yap
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                localStyles.modeButton,
                mode === 'join' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setMode('join')}
              activeOpacity={0.8}
            >
              <UserPlus size={20} color={mode === 'join' ? '#FFFFFF' : colors.textSecondary} />
              <Text
                style={[
                  localStyles.modeText,
                  { color: mode === 'join' ? '#FFFFFF' : colors.textSecondary },
                ]}
              >
                Gruba Katıl
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Form */}
          <View style={localStyles.form}>
            {/* Phone Input */}
            <View style={localStyles.inputGroup}>
              <Phone size={20} color={colors.textSecondary} />
              <TextInput
                style={[localStyles.input, { color: colors.text }]}
                placeholder="Telefon numaranız (5XX XXX XX XX)"
                placeholderTextColor={colors.textSecondary}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={13}
              />
            </View>
            
            {mode === 'join' && (
              <>
                {/* Nickname Input */}
                <View style={localStyles.inputGroup}>
                  <User size={20} color={colors.textSecondary} />
                  <TextInput
                    style={[localStyles.input, { color: colors.text }]}
                    placeholder="Takma adın (örn: Ahmet K.)"
                    placeholderTextColor={colors.textSecondary}
                    value={nickname}
                    onChangeText={setNickname}
                    maxLength={50}
                  />
                </View>
                
                {/* Group Code Input */}
                <View style={localStyles.inputGroup}>
                  <Text style={{ fontSize: 20, color: colors.textSecondary }}>#</Text>
                  <TextInput
                    style={[localStyles.input, { color: colors.text }]}
                    placeholder="Grup kodu (admin'den alın)"
                    placeholderTextColor={colors.textSecondary}
                    value={groupCode}
                    onChangeText={setGroupCode}
                    autoCapitalize="characters"
                    maxLength={8}
                  />
                </View>
              </>
            )}
            
            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.button, { marginTop: Spacing.xl }]}
              onPress={mode === 'login' ? handleLogin : handleJoin}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {mode === 'login' ? 'Giriş Yap' : 'Gruba Katıl'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Footer */}
          <View style={localStyles.footer}>
            <Text style={[styles.caption, { textAlign: 'center' }]}>
              {mode === 'login' 
                ? 'Grubunuz yok mu? Yukarıdan "Gruba Katıl"a tıklayın' 
                : 'Zaten üye misiniz? "Giriş Yap"a tıklayın'}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing['4xl'],
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    gap: Spacing.base,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Spacing.md,
  },
  footer: {
    marginTop: Spacing['2xl'],
  },
});

export default AuthScreen;
