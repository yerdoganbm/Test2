import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { ProgressBar } from '../components/StitchComponents';

const TreasuryReportsScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const payments = useStore((state) => state.payments);
  const matches = useStore((state) => state.matches);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const totalCollected = payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0);
  const totalExpected = matches.reduce((sum, m) => sum + (m.costTotal || 0), 0);
  const collectionRate = totalExpected > 0 ? (totalCollected / totalExpected) * 100 : 0;
  
  const monthlyData = [
    { month: 'Ocak', collected: 3200, expected: 4000 },
    { month: 'Şubat', collected: 2800, expected: 3200 },
  ];
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={localStyles.container}>
        <View style={[localStyles.header, { backgroundColor: colors.primary, ...Shadows.large }]}>
          <Wallet size={32} color="#FFFFFF" />
          <View style={{ flex: 1, marginLeft: Spacing.md }}>
            <Text style={[styles.heading1, { color: '#FFFFFF' }]}>Grup Kasası</Text>
            <Text style={[styles.caption, { color: '#FFFFFF', opacity: 0.9 }]}>
              Finansal raporlar
            </Text>
          </View>
        </View>
        
        <View style={localStyles.statsRow}>
          <View style={[localStyles.statCard, { backgroundColor: colors.card, ...Shadows.medium }]}>
            <TrendingUp size={32} color={colors.success} />
            <Text style={[styles.heading2, { color: colors.success, marginTop: Spacing.xs }]}>
              ₺{totalCollected.toFixed(0)}
            </Text>
            <Text style={styles.caption}>Toplanan</Text>
          </View>
          <View style={[localStyles.statCard, { backgroundColor: colors.card, ...Shadows.medium }]}>
            <TrendingDown size={32} color={colors.info} />
            <Text style={[styles.heading2, { color: colors.info, marginTop: Spacing.xs }]}>
              ₺{totalExpected.toFixed(0)}
            </Text>
            <Text style={styles.caption}>Beklenen</Text>
          </View>
        </View>
        
        <View style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.medium }]}>
          <Text style={[styles.heading3, { marginBottom: Spacing.base }]}>Tahsilat Oranı</Text>
          <ProgressBar progress={collectionRate} color={colors.success} bgColor={colors.borderLight} />
          <Text style={[styles.caption, { textAlign: 'center', marginTop: Spacing.sm }]}>
            %{collectionRate.toFixed(1)}
          </Text>
        </View>
        
        <Text style={[styles.heading3, { marginBottom: Spacing.base }]}>Aylık Özet</Text>
        {monthlyData.map((data, index) => (
          <View key={index} style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.small }]}>
            <View style={localStyles.monthHeader}>
              <Calendar size={20} color={colors.primary} />
              <Text style={[styles.body, { fontWeight: '600', marginLeft: Spacing.sm }]}>
                {data.month} 2026
              </Text>
            </View>
            <View style={localStyles.monthStats}>
              <View style={localStyles.monthStat}>
                <Text style={styles.caption}>Toplanan</Text>
                <Text style={[styles.heading3, { color: colors.success }]}>₺{data.collected}</Text>
              </View>
              <View style={localStyles.monthStat}>
                <Text style={styles.caption}>Beklenen</Text>
                <Text style={[styles.heading3, { color: colors.info }]}>₺{data.expected}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.base,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
  },
  card: {
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  monthStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  monthStat: {
    alignItems: 'center',
  },
});

export default TreasuryReportsScreen;
