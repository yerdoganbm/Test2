import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, AlertCircle, DollarSign, Clock, UserX } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';

const RulesScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const rules = [
    {
      id: 1,
      icon: Clock,
      color: colors.warning,
      title: 'Maçtan 24 saat öncesine kadar iptal edilebilir',
      penalty: 'Geç iptal: 30 TL ceza',
    },
    {
      id: 2,
      icon: UserX,
      color: colors.error,
      title: 'Maça gelmemek',
      penalty: 'Gelmeme: 50 TL ceza + güven puanı -10',
    },
    {
      id: 3,
      icon: DollarSign,
      color: colors.success,
      title: 'Ödemeler maçtan önce yapılmalı',
      penalty: 'Geç ödeme: Güven puanı -5',
    },
    {
      id: 4,
      icon: AlertCircle,
      color: colors.info,
      title: '3 kez ceza alan üye gruptan çıkarılır',
      penalty: 'Otomatik çıkarılma',
    },
  ];
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={localStyles.container}>
        <View style={[localStyles.header, { backgroundColor: colors.info }]}>
          <BookOpen size={32} color="#FFFFFF" />
          <Text style={[styles.heading1, { color: '#FFFFFF', marginTop: Spacing.base }]}>
            Grup Kuralları
          </Text>
        </View>
        
        {rules.map((rule) => (
          <View key={rule.id} style={[localStyles.ruleCard, { backgroundColor: colors.card, ...Shadows.medium }]}>
            <View style={[localStyles.ruleIcon, { backgroundColor: `${rule.color}20` }]}>
              <rule.icon size={28} color={rule.color} />
            </View>
            <View style={localStyles.ruleContent}>
              <Text style={[styles.body, { fontWeight: '600' }]}>{rule.title}</Text>
              <View style={[localStyles.penaltyBadge, { backgroundColor: colors.errorLight }]}>
                <AlertCircle size={14} color={colors.error} />
                <Text style={[styles.caption, { color: colors.error, marginLeft: 4 }]}>
                  {rule.penalty}
                </Text>
              </View>
            </View>
          </View>
        ))}
        
        <View style={[localStyles.infoCard, { backgroundColor: colors.infoLight }]}>
          <Text style={[styles.body, { color: colors.info, fontWeight: '600' }]}>
            💡 Adil Oyun İlkesi
          </Text>
          <Text style={[styles.caption, { color: colors.info, marginTop: Spacing.xs }]}>
            Kurallara uygun davranarak herkesin keyifle oynamasını sağlayalım!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: Spacing.base,
  },
  header: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.large,
  },
  ruleCard: {
    flexDirection: 'row',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
    gap: Spacing.md,
  },
  ruleIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleContent: {
    flex: 1,
  },
  penaltyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.xs,
  },
  infoCard: {
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.base,
  },
});

export default RulesScreen;
