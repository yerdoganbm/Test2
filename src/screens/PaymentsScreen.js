import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  MessageCircle,
  CreditCard,
} from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, getColor, Spacing, BorderRadius, Shadows } from '../constants/theme';

const PaymentsScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);
  const getNextMatch = useStore((state) => state.getNextMatch);
  const payments = useStore((state) => state.payments);
  const getUserById = useStore((state) => state.getUserById);
  const updatePaymentStatus = useStore((state) => state.updatePaymentStatus);
  const appSettings = useStore((state) => state.appSettings);
  
  const styles = getStyles(isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  const isAdmin = currentUser.role === 'ADMIN';
  const nextMatch = getNextMatch();
  const matchPayments = payments.filter((p) => p.matchId === nextMatch?.id);
  
  // Calculate totals
  const totalCollected = matchPayments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalExpected = matchPayments.reduce((sum, p) => sum + p.amount, 0);
  const unpaidCount = matchPayments.filter((p) => p.status === 'UNPAID').length;
  
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Kopyalandı', 'IBAN numarası kopyalandı');
  };
  
  const sendWhatsAppReminder = (payment) => {
    const user = getUserById(payment.userId);
    if (!user) return;
    
    const template = appSettings.whatsappTemplates.paymentReminder
      .replace('{name}', user.nickname)
      .replace('{amount}', payment.amount.toFixed(2))
      .replace('{date}', new Date(nextMatch?.startsAt).toLocaleDateString('tr-TR'))
      .replace('{iban}', appSettings.ibanNumber);
    
    const phone = user.phone.replace('+', '');
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(template)}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Hata', 'WhatsApp açılamadı');
    });
  };
  
  const handleMarkAsPaid = (paymentId) => {
    if (isAdmin) {
      Alert.alert(
        'Ödeme Onayı',
        'Bu ödemeyi onaylamak istediğinize emin misiniz?',
        [
          { text: 'İptal', style: 'cancel' },
          {
            text: 'Onayla',
            onPress: () => updatePaymentStatus(paymentId, 'PAID', true),
          },
        ]
      );
    }
  };
  
  const renderPaymentItem = (payment) => {
    const user = getUserById(payment.userId);
    if (!user) return null;
    
    const isPaid = payment.status === 'PAID';
    
    return (
      <View
        key={payment.id}
        style={[
          localStyles.paymentItem,
          {
            backgroundColor: colors.card,
            borderLeftColor: isPaid ? colors.success : colors.error,
            ...Shadows.small,
          },
        ]}
      >
        <View style={localStyles.paymentItemLeft}>
          <View
            style={[
              localStyles.paymentAvatar,
              { backgroundColor: isPaid ? colors.accentLight : '#FEE2E2' },
            ]}
          >
            <Text
              style={[
                localStyles.paymentAvatarText,
                { color: isPaid ? colors.primary : colors.error },
              ]}
            >
              {user.nickname.substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={localStyles.paymentInfo}>
            <Text style={[styles.body, { fontWeight: '600' }]}>{user.nickname}</Text>
            <Text style={styles.caption}>{user.phone}</Text>
            {isPaid && payment.paidAt && (
              <Text style={[styles.caption, { color: colors.success, marginTop: 2 }]}>
                ✓ {new Date(payment.paidAt).toLocaleDateString('tr-TR')}
              </Text>
            )}
          </View>
        </View>
        
        <View style={localStyles.paymentItemRight}>
          <Text
            style={[
              localStyles.paymentAmount,
              { color: isPaid ? colors.success : colors.error },
            ]}
          >
            ₺{payment.amount.toFixed(2)}
          </Text>
          <View style={localStyles.paymentActions}>
            {isPaid ? (
              <View
                style={[
                  localStyles.paymentBadge,
                  { backgroundColor: colors.accentLight },
                ]}
              >
                <CheckCircle2 size={16} color={colors.success} />
                <Text
                  style={[localStyles.paymentBadgeText, { color: colors.success }]}
                >
                  Ödendi
                </Text>
              </View>
            ) : (
              <>
                {isAdmin && (
                  <TouchableOpacity
                    style={[
                      localStyles.actionButton,
                      { backgroundColor: colors.success },
                    ]}
                    onPress={() => handleMarkAsPaid(payment.id)}
                    activeOpacity={0.7}
                  >
                    <CheckCircle2 size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    localStyles.actionButton,
                    { backgroundColor: '#25D366' },
                  ]}
                  onPress={() => sendWhatsAppReminder(payment)}
                  activeOpacity={0.7}
                >
                  <MessageCircle size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };
  
  if (!nextMatch) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={localStyles.emptyContainer}>
          <Wallet size={64} color={colors.textSecondary} />
          <Text style={[styles.heading3, { marginTop: Spacing.base, color: colors.textSecondary }]}>
            Ödeme Kaydı Yok
          </Text>
          <Text style={[styles.caption, { marginTop: Spacing.sm }]}>
            Yaklaşan maç olmadığı için ödeme kaydı bulunmuyor
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={localStyles.container}
        contentContainerStyle={localStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Treasury Card */}
        <View
          style={[
            localStyles.treasuryCard,
            {
              backgroundColor: colors.primary,
              ...Shadows.large,
            },
          ]}
        >
          <View style={localStyles.treasuryHeader}>
            <Wallet size={28} color="#FFFFFF" />
            <Text style={localStyles.treasuryTitle}>Grubun Kasası</Text>
          </View>
          
          <View style={localStyles.treasuryContent}>
            <View style={localStyles.treasuryItem}>
              <View style={localStyles.treasuryIconContainer}>
                <TrendingUp size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={localStyles.treasuryLabel}>Toplanan</Text>
                <Text style={localStyles.treasuryValue}>₺{totalCollected.toFixed(2)}</Text>
              </View>
            </View>
            
            <View style={localStyles.treasuryDivider} />
            
            <View style={localStyles.treasuryItem}>
              <View style={localStyles.treasuryIconContainer}>
                <TrendingDown size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={localStyles.treasuryLabel}>Beklenen</Text>
                <Text style={localStyles.treasuryValue}>₺{totalExpected.toFixed(2)}</Text>
              </View>
            </View>
          </View>
          
          <View style={localStyles.treasuryFooter}>
            <Clock size={16} color="#FFFFFF" />
            <Text style={localStyles.treasuryFooterText}>
              {unpaidCount} ödeme bekliyor
            </Text>
          </View>
        </View>
        
        {/* IBAN Card */}
        <View
          style={[
            localStyles.ibanCard,
            {
              backgroundColor: colors.card,
              ...Shadows.medium,
            },
          ]}
        >
          <View style={localStyles.ibanHeader}>
            <View style={[localStyles.ibanIcon, { backgroundColor: colors.accentLight }]}>
              <CreditCard size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.heading3, { fontSize: 16 }]}>
                Ödeme Bilgileri
              </Text>
              <Text style={[styles.caption, { marginTop: 2 }]}>
                Ödemenizi bu IBAN'a yapabilirsiniz
              </Text>
            </View>
          </View>
          
          <View style={[localStyles.ibanNumber, { backgroundColor: colors.backgroundSecondary }]}>
            <Text style={[localStyles.ibanNumberText, { color: colors.text }]}>
              {appSettings.ibanNumber}
            </Text>
            <TouchableOpacity
              style={[localStyles.copyButton, { backgroundColor: colors.primary }]}
              onPress={() => copyToClipboard(appSettings.ibanNumber)}
              activeOpacity={0.7}
            >
              <Copy size={18} color="#FFFFFF" />
              <Text style={localStyles.copyButtonText}>Kopyala</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Payments List */}
        <View style={localStyles.section}>
          <View style={localStyles.sectionHeader}>
            <Text style={styles.heading3}>Ödeme Durumu</Text>
            <View
              style={[
                localStyles.sectionBadge,
                { backgroundColor: colors.accentLight },
              ]}
            >
              <Text style={[localStyles.sectionBadgeText, { color: colors.primary }]}>
                {matchPayments.length} Kişi
              </Text>
            </View>
          </View>
          
          <View style={localStyles.paymentsList}>
            {matchPayments.map(renderPaymentItem)}
          </View>
        </View>
        
        {/* Summary Stats */}
        <View style={localStyles.statsContainer}>
          <View
            style={[
              localStyles.statCard,
              {
                backgroundColor: colors.card,
                ...Shadows.medium,
              },
            ]}
          >
            <View
              style={[
                localStyles.statIcon,
                { backgroundColor: colors.accentLight },
              ]}
            >
              <CheckCircle2 size={24} color={colors.success} />
            </View>
            <Text style={[styles.heading2, { color: colors.success }]}>
              {matchPayments.filter((p) => p.status === 'PAID').length}
            </Text>
            <Text style={styles.caption}>Ödeme Yapıldı</Text>
          </View>
          
          <View
            style={[
              localStyles.statCard,
              {
                backgroundColor: colors.card,
                ...Shadows.medium,
              },
            ]}
          >
            <View
              style={[
                localStyles.statIcon,
                { backgroundColor: '#FEE2E2' },
              ]}
            >
              <XCircle size={24} color={colors.error} />
            </View>
            <Text style={[styles.heading2, { color: colors.error }]}>
              {unpaidCount}
            </Text>
            <Text style={styles.caption}>Ödeme Bekliyor</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.base,
    paddingBottom: Spacing['4xl'],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
  treasuryCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
  },
  treasuryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  treasuryTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  treasuryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    marginBottom: Spacing.base,
  },
  treasuryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  treasuryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  treasuryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  treasuryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  treasuryDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: Spacing.base,
  },
  treasuryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  treasuryFooterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  ibanCard: {
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    marginBottom: Spacing.lg,
  },
  ibanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.base,
  },
  ibanIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ibanNumber: {
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
  },
  ibanNumberText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  sectionBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  paymentsList: {
    gap: Spacing.sm,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
  },
  paymentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.md,
  },
  paymentAvatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentAvatarText: {
    fontSize: 16,
    fontWeight: '700',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentItemRight: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  paymentActions: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  paymentBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
});

export default PaymentsScreen;
