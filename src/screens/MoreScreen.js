import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings,
  User,
  Users,
  Moon,
  Sun,
  MessageSquare,
  MessageCircle,
  Calendar,
  Wallet,
  Shield,
  LogOut,
  ChevronRight,
  MapPin,
  UserPlus,
  UserCheck,
  FileText,
  TrendingUp,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, getColor, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Avatar } from '../components/StitchComponents';

const MoreScreen = ({ navigation }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const currentUser = useStore((state) => state.currentUser);
  
  const styles = getStyles(isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  const isAdmin = currentUser.role === 'ADMIN';
  
  const menuItems = [
    { id: 'lineup', title: 'Kadro & Takımlar', icon: Users, color: colors.primary, screen: 'Lineup' },
    { id: 'payments', title: 'Ödemeler', icon: Wallet, color: colors.info, screen: 'Payments' },
    { id: 'fields', title: 'Saha Rehberi', icon: MapPin, color: colors.fieldGreen, screen: 'FieldsGuide' },
    { id: 'rules', title: 'Grup Kuralları', icon: Users, color: colors.purple, screen: 'Rules' },
  ];
  
  const adminMenuItems = [
    { id: 'admin', title: 'Yönetim Paneli', icon: Shield, color: colors.error, screen: 'Admin' },
    { id: 'invite', title: 'Gruba Davet Et', icon: UserPlus, color: colors.success, screen: 'Invite' },
    { id: 'approval', title: 'Katılım Onayı', icon: UserCheck, color: colors.warning, screen: 'JoinApproval' },
    { id: 'whatsapp', title: 'WhatsApp Hub', icon: MessageCircle, color: '#25D366', screen: 'WhatsAppIntegration' },
    { id: 'templates', title: 'Mesaj Şablonları', icon: FileText, color: colors.info, screen: 'MessageTemplate' },
    { id: 'treasury', title: 'Kasa Raporları', icon: TrendingUp, color: colors.success, screen: 'TreasuryReports' },
    { id: 'debt', title: 'Borç Takibi', icon: AlertCircle, color: colors.error, screen: 'DebtTracking' },
    { id: 'penalties', title: 'Ceza Yönetimi', icon: AlertTriangle, color: colors.warning, screen: 'PenaltyManagement' },
    { id: 'fieldMgmt', title: 'Saha Yönetimi', icon: MapPin, color: colors.fieldGreen, screen: 'FieldManagement' },
    { id: 'matchTemplates', title: 'Maç Şablonları', icon: Calendar, color: colors.purple, screen: 'MatchTemplates' },
  ];
  
  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        localStyles.menuItem,
        {
          backgroundColor: colors.card,
          ...Shadows.small,
        },
      ]}
      onPress={() => navigation.navigate(item.screen)}
      activeOpacity={0.7}
    >
      <View style={[localStyles.menuIcon, { backgroundColor: `${item.color}20` }]}>
        <item.icon size={24} color={item.color} />
      </View>
      <Text style={[styles.body, { flex: 1, fontWeight: '600' }]}>
        {item.title}
      </Text>
      <ChevronRight size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
  
  const renderAdminMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        localStyles.menuItem,
        {
          backgroundColor: colors.card,
          ...Shadows.small,
        },
      ]}
      onPress={() => navigation.navigate(item.screen)}
      activeOpacity={0.7}
    >
      <View style={[localStyles.menuIcon, { backgroundColor: `${item.color}20` }]}>
        <item.icon size={24} color={item.color} />
      </View>
      <Text style={[styles.body, { flex: 1, fontWeight: '600' }]}>
        {item.title}
      </Text>
      <ChevronRight size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={localStyles.container}
        contentContainerStyle={localStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View
          style={[
            localStyles.profileCard,
            {
              backgroundColor: colors.primary,
              ...Shadows.large,
            },
          ]}
        >
          <Avatar
            name={currentUser.nickname}
            size={64}
            color="#FFFFFF"
            bgColor="rgba(255, 255, 255, 0.2)"
          />
          <View style={localStyles.profileInfo}>
            <Text style={localStyles.profileName}>{currentUser.nickname}</Text>
            <Text style={localStyles.profilePhone}>{currentUser.phone}</Text>
            {isAdmin && (
              <View style={localStyles.adminBadge}>
                <Shield size={14} color="#FFFFFF" />
                <Text style={localStyles.adminBadgeText}>Admin</Text>
              </View>
            )}
          </View>
        </View>
        
        {/* Stats Cards */}
        <View style={localStyles.statsRow}>
          <View
            style={[
              localStyles.statCard,
              { backgroundColor: colors.card, ...Shadows.small },
            ]}
          >
            <Calendar size={24} color={colors.primary} />
            <Text style={[styles.heading2, { marginTop: Spacing.xs }]}>24</Text>
            <Text style={styles.caption}>Maç</Text>
          </View>
          
          <View
            style={[
              localStyles.statCard,
              { backgroundColor: colors.card, ...Shadows.small },
            ]}
          >
            <Shield size={24} color={colors.success} />
            <Text style={[styles.heading2, { marginTop: Spacing.xs }]}>
              {currentUser.reliabilityScore}
            </Text>
            <Text style={styles.caption}>Güven</Text>
          </View>
          
          <View
            style={[
              localStyles.statCard,
              { backgroundColor: colors.card, ...Shadows.small },
            ]}
          >
            <User size={24} color={colors.info} />
            <Text style={[styles.heading2, { marginTop: Spacing.xs }]}>
              {currentUser.skillRating.toFixed(1)}
            </Text>
            <Text style={styles.caption}>Seviye</Text>
          </View>
        </View>
        
        {/* Menu Section */}
        <Text style={[styles.heading3, { marginBottom: Spacing.base, marginTop: Spacing.base }]}>
          Menü
        </Text>
        <View style={localStyles.menuList}>
          {menuItems.map(renderMenuItem)}
        </View>
        
        {/* Admin Section */}
        {isAdmin && (
          <>
            <Text style={[styles.heading3, { marginBottom: Spacing.base, marginTop: Spacing.xl }]}>
              Admin İşlemleri
            </Text>
            <View style={localStyles.menuList}>
              {adminMenuItems.map(renderAdminMenuItem)}
            </View>
          </>
        )}
        
        {/* Settings Section */}
        <Text style={[styles.heading3, { marginBottom: Spacing.base, marginTop: Spacing.xl }]}>
          Ayarlar
        </Text>
        
        {/* Dark Mode Toggle */}
        <View
          style={[
            localStyles.settingItem,
            {
              backgroundColor: colors.card,
              ...Shadows.small,
            },
          ]}
        >
          <View style={[localStyles.menuIcon, { backgroundColor: colors.accentLight }]}>
            {isDarkMode ? (
              <Moon size={24} color={colors.primary} />
            ) : (
              <Sun size={24} color={colors.primary} />
            )}
          </View>
          <Text style={[styles.body, { flex: 1, fontWeight: '600' }]}>
            Karanlık Mod
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity
          style={[
            localStyles.logoutButton,
            { backgroundColor: colors.errorLight, borderColor: colors.error },
          ]}
          activeOpacity={0.7}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={[styles.body, { color: colors.error, fontWeight: '600' }]}>
            Çıkış Yap
          </Text>
        </TouchableOpacity>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.base,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profilePhone: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.xs,
    gap: 4,
  },
  adminBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
  },
  menuList: {
    gap: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xl,
    borderWidth: 1,
    gap: Spacing.sm,
  },
});

export default MoreScreen;
