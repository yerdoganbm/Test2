import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertCircle, TrendingDown, MessageCircle } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Avatar } from '../components/StitchComponents';

const DebtTrackingScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const payments = useStore((state) => state.payments);
  const getUserById = useStore((state) => state.getUserById);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const unpaidPayments = payments.filter(p => p.status === 'UNPAID');
  const totalDebt = unpaidPayments.reduce((sum, p) => sum + p.amount, 0);
  
  const renderDebt = ({ item: payment }) => {
    const user = getUserById(payment.userId);
    if (!user) return null;
    
    return (
      <View style={[localStyles.debtCard, { backgroundColor: colors.card, ...Shadows.small }]}>
        <Avatar name={user.nickname} size={48} color={colors.error} bgColor={colors.errorLight} />
        <View style={localStyles.debtInfo}>
          <Text style={[styles.body, { fontWeight: '600' }]}>{user.nickname}</Text>
          <Text style={[styles.caption, { color: colors.error }]}>
            {Math.floor((Date.now() - new Date(payment.paidAt || Date.now())) / (1000 * 60 * 60 * 24))} gün gecikme
          </Text>
        </View>
        <View style={localStyles.debtAmount}>
          <Text style={[styles.heading3, { color: colors.error }]}>₺{payment.amount.toFixed(2)}</Text>
          <TouchableOpacity
            style={[localStyles.reminderButton, { backgroundColor: '#DCFCE7' }]}
            activeOpacity={0.7}
          >
            <MessageCircle size={16} color="#25D366" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[localStyles.header, { backgroundColor: colors.errorLight }]}>
        <AlertCircle size={28} color={colors.error} />
        <View style={{ flex: 1, marginLeft: Spacing.md }}>
          <Text style={[styles.heading2, { color: colors.error }]}>Borç Takibi</Text>
          <Text style={[styles.caption, { color: colors.error }]}>
            Toplam: ₺{totalDebt.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <FlatList
        data={unpaidPayments}
        renderItem={renderDebt}
        keyExtractor={(item) => item.id}
        contentContainerStyle={localStyles.list}
        ListEmptyComponent={
          <View style={localStyles.empty}>
            <TrendingDown size={64} color={colors.textSecondary} />
            <Text style={[styles.bodySecondary, { marginTop: Spacing.base }]}>
              Harika! Borçlu kimse yok
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
  list: {
    padding: Spacing.base,
  },
  debtCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  debtInfo: {
    flex: 1,
  },
  debtAmount: {
    alignItems: 'flex-end',
  },
  reminderButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing['5xl'],
  },
});

export default DebtTrackingScreen;
