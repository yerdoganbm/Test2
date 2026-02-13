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
import { User, Phone, MapPin, Award, ArrowRight } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Avatar } from '../components/StitchComponents';

const ProfileSetupScreen = ({ navigation }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    nickname: '',
    phone: '',
    positions: [],
    skillLevel: 5,
  });
  
  const positions = ['Kaleci', 'Defans', 'Orta Saha', 'Kanat', 'Forvet'];
  
  const handleNext = () => {
    if (step === 1 && !profile.nickname) {
      Alert.alert('Hata', 'Lütfen takma adınızı girin');
      return;
    }
    if (step < 3) setStep(step + 1);
    else {
      Alert.alert('Tebrikler!', 'Profiliniz oluşturuldu', [
        { text: 'Başla', onPress: () => navigation.navigate('Ana Sayfa') },
      ]);
    }
  };
  
  const togglePosition = (pos) => {
    if (profile.positions.includes(pos)) {
      setProfile({ ...profile, positions: profile.positions.filter(p => p !== pos) });
    } else {
      setProfile({ ...profile, positions: [...profile.positions, pos] });
    }
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={localStyles.container}>
          {/* Progress Indicator */}
          <View style={localStyles.progressContainer}>
            {[1, 2, 3].map((s) => (
              <View
                key={s}
                style={[
                  localStyles.progressDot,
                  {
                    backgroundColor: s <= step ? colors.primary : colors.borderLight,
                    width: s === step ? 32 : 12,
                  },
                ]}
              />
            ))}
          </View>
          
          {/* Header */}
          <View style={localStyles.header}>
            <Text style={styles.heading1}>
              {step === 1 && 'Hoş Geldin!'}
              {step === 2 && 'Pozisyonun?'}
              {step === 3 && 'Seviye?'}
            </Text>
            <Text style={[styles.bodySecondary, { marginTop: Spacing.sm }]}>
              {step === 1 && 'Takma adınla tanışalım'}
              {step === 2 && 'Hangi pozisyonda oynuyorsun?'}
              {step === 3 && 'Kendini nasıl değerlendirirsin?'}
            </Text>
          </View>
          
          {/* Step Content */}
          {step === 1 && (
            <View style={localStyles.stepContent}>
              <Avatar name={profile.nickname || 'YN'} size={80} color={colors.primary} bgColor={colors.accentLight} />
              <TextInput
                style={[localStyles.inputLarge, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                placeholder="Takma adın (örn: Ahmet K.)"
                placeholderTextColor={colors.textSecondary}
                value={profile.nickname}
                onChangeText={(text) => setProfile({ ...profile, nickname: text })}
                autoFocus
                maxLength={50}
              />
            </View>
          )}
          
          {step === 2 && (
            <View style={localStyles.stepContent}>
              <View style={localStyles.positionsGrid}>
                {positions.map((pos) => (
                  <TouchableOpacity
                    key={pos}
                    style={[
                      localStyles.positionChip,
                      {
                        backgroundColor: profile.positions.includes(pos) ? colors.primary : colors.card,
                        borderColor: profile.positions.includes(pos) ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => togglePosition(pos)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        localStyles.positionText,
                        { color: profile.positions.includes(pos) ? '#FFFFFF' : colors.text },
                      ]}
                    >
                      {pos}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          
          {step === 3 && (
            <View style={localStyles.stepContent}>
              <View style={localStyles.skillDisplay}>
                <Award size={48} color={colors.primary} />
                <Text style={[styles.heading1, { color: colors.primary, marginTop: Spacing.base }]}>
                  {profile.skillLevel.toFixed(1)}
                </Text>
              </View>
              <View style={localStyles.skillSlider}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      localStyles.skillButton,
                      {
                        backgroundColor: level <= profile.skillLevel ? colors.primary : colors.card,
                        borderColor: level <= profile.skillLevel ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => setProfile({ ...profile, skillLevel: level })}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        localStyles.skillButtonText,
                        { color: level <= profile.skillLevel ? '#FFFFFF' : colors.textSecondary },
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={[styles.caption, { textAlign: 'center', marginTop: Spacing.base }]}>
                {profile.skillLevel <= 3 && '🌱 Başlangıç'}
                {profile.skillLevel > 3 && profile.skillLevel <= 6 && '⚽ Orta Seviye'}
                {profile.skillLevel > 6 && profile.skillLevel <= 8 && '🔥 İleri Seviye'}
                {profile.skillLevel > 8 && '⭐ Profesyonel'}
              </Text>
            </View>
          )}
          
          {/* Navigation */}
          <View style={localStyles.navigation}>
            {step > 1 && (
              <TouchableOpacity
                style={[styles.buttonOutline, { flex: 1 }]}
                onPress={() => setStep(step - 1)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonOutlineText}>Geri</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, { flex: 1 }]}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {step === 3 ? 'Tamamla' : 'İleri'}
              </Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </TouchableOpacity>
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
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing['3xl'],
  },
  progressDot: {
    height: 4,
    borderRadius: 2,
  },
  header: {
    marginBottom: Spacing['3xl'],
  },
  stepContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLarge: {
    width: '100%',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    marginTop: Spacing.xl,
  },
  positionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.md,
    width: '100%',
  },
  positionChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    minWidth: 120,
    alignItems: 'center',
  },
  positionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  skillDisplay: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  skillSlider: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.xl,
  },
  skillButton: {
    width: 32,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  navigation: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingTop: Spacing.xl,
  },
});

export default ProfileSetupScreen;
