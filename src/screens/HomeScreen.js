import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import * as Linking from 'expo-linking';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Eye,
  CreditCard,
  Vote,
  Navigation,
} from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, getColor, Spacing, BorderRadius, Shadows } from '../constants/theme';

const HomeScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);
  const getNextMatch = useStore((state) => state.getNextMatch);
  const getFieldById = useStore((state) => state.getFieldById);
  const getMatchAttendance = useStore((state) => state.getMatchAttendance);
  const updateAttendance = useStore((state) => state.updateAttendance);
  const attendance = useStore((state) => state.attendance);
  const payments = useStore((state) => state.payments);
  
  const styles = getStyles(isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  
  const nextMatch = getNextMatch();
  const field = nextMatch ? getFieldById(nextMatch.fieldId) : null;
  const matchAttendance = nextMatch ? getMatchAttendance(nextMatch.id) : [];
  
  const currentUserAttendance = matchAttendance.find(
    (a) => a.userId === currentUser.id
  );
  const currentStatus = currentUserAttendance?.status || 'NONE';
  
  // Calculate countdown
  useEffect(() => {
    if (!nextMatch) return;
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const matchTime = new Date(nextMatch.startsAt).getTime();
      const distance = matchTime - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [nextMatch]);
  
  // Calculate statistics
  const yesCount = matchAttendance.filter((a) => a.status === 'YES').length;
  const maybeCount = matchAttendance.filter((a) => a.status === 'MAYBE').length;
  const noCount = matchAttendance.filter((a) => a.status === 'NO').length;
  const totalResponses = yesCount + maybeCount + noCount;
  
  const unpaidPayments = payments.filter((p) => p.status === 'UNPAID').length;
  
  const handleAttendanceUpdate = (status) => {
    if (nextMatch) {
      updateAttendance(nextMatch.id, currentUser.id, status);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };
  
  const openMap = async () => {
    if (field) {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${field.latitude},${field.longitude}`;
      const label = field.name;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      
      try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          await Linking.openURL(url);
        } else {
          Alert.alert('Hata', 'Harita uygulaması açılamadı');
        }
      } catch (error) {
        Alert.alert('Hata', 'Harita uygulaması açılamadı');
      }
    }
  };
  
  const formatDate = (date) => {
    const d = new Date(date);
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const dayName = days[d.getDay()];
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${dayName}, ${day}.${month}.${year}`;
  };
  
  const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  if (!nextMatch || !field) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={localStyles.emptyContainer}>
          <Calendar size={64} color={colors.textSecondary} />
          <Text style={[styles.heading3, { marginTop: Spacing.base, color: colors.textSecondary }]}>
            Yaklaşan Maç Yok
          </Text>
          <Text style={[styles.caption, { marginTop: Spacing.sm, textAlign: 'center' }]}>
            Admin panelinden yeni bir maç oluşturabilirsiniz
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
        {/* Match Day Card */}
        <View style={[localStyles.matchCard, { backgroundColor: colors.primary, ...Shadows.large }]}>
          <View style={localStyles.matchCardHeader}>
            <Text style={localStyles.matchCardTitle}>Bir Sonraki Maç</Text>
            <View style={localStyles.countdownContainer}>
              <Clock size={20} color="#FFFFFF" />
              <Text style={localStyles.countdownText}>
                {countdown.days}g {countdown.hours}s {countdown.minutes}dk
              </Text>
            </View>
          </View>
          
          <View style={localStyles.matchInfo}>
            <View style={localStyles.matchInfoRow}>
              <Clock size={20} color="#FFFFFF" style={{ opacity: 0.9 }} />
              <View style={localStyles.matchInfoText}>
                <Text style={localStyles.matchInfoLabel}>Tarih & Saat</Text>
                <Text style={localStyles.matchInfoValue}>
                  {formatDate(nextMatch.startsAt)} - {formatTime(nextMatch.startsAt)}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={localStyles.matchInfoRow}
              onPress={openMap}
              activeOpacity={0.7}
            >
              <MapPin size={20} color="#FFFFFF" style={{ opacity: 0.9 }} />
              <View style={[localStyles.matchInfoText, { flex: 1 }]}>
                <Text style={localStyles.matchInfoLabel}>Saha</Text>
                <Text style={localStyles.matchInfoValue}>{field.name}</Text>
                <Text style={[localStyles.matchInfoLabel, { fontSize: 12 }]}>
                  {field.address}
                </Text>
              </View>
              <Navigation size={16} color="#FFFFFF" style={{ opacity: 0.8 }} />
            </TouchableOpacity>
            
            <View style={localStyles.matchInfoRow}>
              <CreditCard size={20} color="#FFFFFF" style={{ opacity: 0.9 }} />
              <View style={localStyles.matchInfoText}>
                <Text style={localStyles.matchInfoLabel}>Kişi Başı Ücret</Text>
                <Text style={localStyles.matchInfoValue}>
                  ₺{nextMatch.costPerPerson.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Attendance Buttons */}
        <View style={localStyles.section}>
          <Text style={[styles.heading3, { marginBottom: Spacing.base }]}>
            Katılım Durumu
          </Text>
          <View style={localStyles.attendanceButtons}>
            <TouchableOpacity
              style={[
                localStyles.attendanceButton,
                {
                  backgroundColor: currentStatus === 'YES' ? colors.success : colors.card,
                  borderColor: currentStatus === 'YES' ? colors.success : colors.border,
                  ...Shadows.small,
                },
              ]}
              onPress={() => handleAttendanceUpdate('YES')}
              activeOpacity={0.8}
            >
              <CheckCircle2
                size={28}
                color={currentStatus === 'YES' ? '#FFFFFF' : colors.success}
                strokeWidth={2.5}
              />
              <Text
                style={[
                  localStyles.attendanceButtonText,
                  { color: currentStatus === 'YES' ? '#FFFFFF' : colors.text },
                ]}
              >
                Evet
              </Text>
              <View
                style={[
                  localStyles.attendanceBadge,
                  { backgroundColor: currentStatus === 'YES' ? 'rgba(255,255,255,0.2)' : colors.accentLight },
                ]}
              >
                <Text
                  style={[
                    localStyles.attendanceBadgeText,
                    { color: currentStatus === 'YES' ? '#FFFFFF' : colors.success },
                  ]}
                >
                  {yesCount}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                localStyles.attendanceButton,
                {
                  backgroundColor: currentStatus === 'MAYBE' ? colors.warning : colors.card,
                  borderColor: currentStatus === 'MAYBE' ? colors.warning : colors.border,
                  ...Shadows.small,
                },
              ]}
              onPress={() => handleAttendanceUpdate('MAYBE')}
              activeOpacity={0.8}
            >
              <HelpCircle
                size={28}
                color={currentStatus === 'MAYBE' ? '#FFFFFF' : colors.warning}
                strokeWidth={2.5}
              />
              <Text
                style={[
                  localStyles.attendanceButtonText,
                  { color: currentStatus === 'MAYBE' ? '#FFFFFF' : colors.text },
                ]}
              >
                Belki
              </Text>
              <View
                style={[
                  localStyles.attendanceBadge,
                  { backgroundColor: currentStatus === 'MAYBE' ? 'rgba(255,255,255,0.2)' : '#FEF3C7' },
                ]}
              >
                <Text
                  style={[
                    localStyles.attendanceBadgeText,
                    { color: currentStatus === 'MAYBE' ? '#FFFFFF' : colors.warning },
                  ]}
                >
                  {maybeCount}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                localStyles.attendanceButton,
                {
                  backgroundColor: currentStatus === 'NO' ? colors.error : colors.card,
                  borderColor: currentStatus === 'NO' ? colors.error : colors.border,
                  ...Shadows.small,
                },
              ]}
              onPress={() => handleAttendanceUpdate('NO')}
              activeOpacity={0.8}
            >
              <XCircle
                size={28}
                color={currentStatus === 'NO' ? '#FFFFFF' : colors.error}
                strokeWidth={2.5}
              />
              <Text
                style={[
                  localStyles.attendanceButtonText,
                  { color: currentStatus === 'NO' ? '#FFFFFF' : colors.text },
                ]}
              >
                Hayır
              </Text>
              <View
                style={[
                  localStyles.attendanceBadge,
                  { backgroundColor: currentStatus === 'NO' ? 'rgba(255,255,255,0.2)' : '#FEE2E2' },
                ]}
              >
                <Text
                  style={[
                    localStyles.attendanceBadgeText,
                    { color: currentStatus === 'NO' ? '#FFFFFF' : colors.error },
                  ]}
                >
                  {noCount}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={localStyles.section}>
          <Text style={[styles.heading3, { marginBottom: Spacing.base }]}>
            Hızlı İşlemler
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={localStyles.quickActionsContainer}
          >
            <TouchableOpacity
              style={[localStyles.quickActionCard, { backgroundColor: colors.card, ...Shadows.medium }]}
              activeOpacity={0.8}
            >
              <View style={[localStyles.quickActionIcon, { backgroundColor: colors.accentLight }]}>
                <Eye size={24} color={colors.primary} />
              </View>
              <Text style={[localStyles.quickActionText, { color: colors.text }]}>
                Kadroya Bak
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[localStyles.quickActionCard, { backgroundColor: colors.card, ...Shadows.medium }]}
              activeOpacity={0.8}
            >
              <View style={[localStyles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
                <CreditCard size={24} color={colors.warning} />
              </View>
              <Text style={[localStyles.quickActionText, { color: colors.text }]}>
                Ödeme Yap
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[localStyles.quickActionCard, { backgroundColor: colors.card, ...Shadows.medium }]}
              activeOpacity={0.8}
            >
              <View style={[localStyles.quickActionIcon, { backgroundColor: '#DBEAFE' }]}>
                <Vote size={24} color={colors.info} />
              </View>
              <Text style={[localStyles.quickActionText, { color: colors.text }]}>
                Anketlere Katıl
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        {/* Status Summary */}
        <View style={localStyles.section}>
          <Text style={[styles.heading3, { marginBottom: Spacing.base }]}>
            Durum Özeti
          </Text>
          <View style={[localStyles.summaryCard, { backgroundColor: colors.card, ...Shadows.medium }]}>
            <View style={localStyles.summaryRow}>
              <View style={localStyles.summaryItem}>
                <Users size={24} color={colors.primary} />
                <Text style={[localStyles.summaryValue, { color: colors.text }]}>
                  {yesCount}/{totalResponses}
                </Text>
                <Text style={[localStyles.summaryLabel, { color: colors.textSecondary }]}>
                  Oyuncu
                </Text>
              </View>
              
              <View style={[localStyles.summaryDivider, { backgroundColor: colors.border }]} />
              
              <View style={localStyles.summaryItem}>
                <CreditCard size={24} color={colors.error} />
                <Text style={[localStyles.summaryValue, { color: colors.text }]}>
                  {unpaidPayments}
                </Text>
                <Text style={[localStyles.summaryLabel, { color: colors.textSecondary }]}>
                  Bekleyen Ödeme
                </Text>
              </View>
            </View>
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
  matchCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  matchCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  matchCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  countdownText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: Spacing.xs,
  },
  matchInfo: {
    gap: Spacing.base,
  },
  matchInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  matchInfoText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  matchInfoLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 2,
  },
  matchInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  attendanceButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  attendanceButton: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    borderWidth: 2,
  },
  attendanceButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  attendanceBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    minWidth: 28,
    alignItems: 'center',
  },
  attendanceBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  quickActionsContainer: {
    gap: Spacing.md,
  },
  quickActionCard: {
    width: 140,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  summaryCard: {
    borderRadius: BorderRadius.base,
    padding: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: Spacing.sm,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: Spacing.xs,
  },
  summaryDivider: {
    width: 1,
    height: 60,
  },
});

export default HomeScreen;
