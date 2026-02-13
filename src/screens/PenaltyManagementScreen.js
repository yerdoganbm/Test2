import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, XCircle, Clock } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Avatar } from '../components/StitchComponents';

const PenaltyManagementScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const users = useStore((state) => state.users);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const penalties = [
    { id: 'pen1', userId: '6', type: 'late_cancel', date: new Date('2026-02-10'), fine: 30 },
    { id: 'pen2', userId: '13', type: 'no_show', date: new Date('2026-02-08'), fine: 50 },
  ];
  
  const getPenaltyName = (type) => {
    return type === 'late_cancel' ? 'Geç İptal' : type === 'no_show' ? 'Gelmedi' : 'Diğer';
  };
  
  const renderPenalty = ({ item: penalty }) => {
    const user = users.find(u => u.id === penalty.userId);
    if (!user) return null;
    
    return (
      <View style={[localStyles.penaltyCard, { backgroundColor: colors.card, ...Shadows.small }]}>
        <View style={[localStyles.penaltyIcon, { backgroundColor: colors.errorLight }]}>
          <XCircle size={24} color={colors.error} />
        </View>
        <View style={localStyles.penaltyInfo}>
          <Text style={[styles.body, { fontWeight: '600' }]}>{user.nickname}</Text>
          <Text style={[styles.caption, { color: colors.error }]}>
            {getPenaltyName(penalty.type)}
          </Text>
          <Text style={styles.caption}>
            {penalty.date.toLocaleDateString('tr-TR')}
          </Text>
        </View>
        <View style={localStyles.penaltyAmount}>
          <Text style={[styles.heading3, { color: colors.error }]}>₺{penalty.fine}</Text>
          <Text style={styles.caption}>Ceza</Text>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[localStyles.header, { backgroundColor: colors.errorLight }]}>
        <AlertTriangle size={28} color={colors.error} />
        <Text style={[styles.heading2, { color: colors.error, marginLeft: Spacing.md }]}>
          Ceza Yönetimi
        </Text>
      </View>
      
      <View style={[localStyles.summaryCard, { backgroundColor: colors.card, ...Shadows.medium }]}>
        <Text style={[styles.caption, { textAlign: 'center' }]}>Toplam Ceza Miktarı</Text>
        <Text style={[styles.heading1, { color: colors.error, marginTop: Spacing.xs }]}>
          ₺{penalties.reduce((sum, p) => sum + p.fine, 0)}
        </Text>
      </View>
      
      <FlatList
        data={penalties}
        renderItem={renderPenalty}
        keyExtractor={(item) => item.id}
        contentContainerStyle={localStyles.list}
        ListEmptyComponent={
          <View style={localStyles.empty}>
            <AlertTriangle size={64} color={colors.textSecondary} />
            <Text style={[styles.bodySecondary, { marginTop: Spacing.base }]}>
              Ceza kaydı yok
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  summaryCard: {
    padding: Spacing.lg,
    margin: Spacing.base,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
  },
  list: {
    padding: Spacing.base,
  },
  penaltyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  penaltyIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  penaltyInfo: {
    flex: 1,
  },
  penaltyAmount: {
    alignItems: 'flex-end',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing['5xl'],
  },
});

export default PenaltyManagementScreen;
