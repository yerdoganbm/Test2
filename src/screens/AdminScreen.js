import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Plus,
  Users,
  MessageSquare,
  Award,
  Moon,
  Sun,
  X,
  Calendar,
  MapPin,
  DollarSign,
  Check,
} from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, getColor, Spacing, BorderRadius, Shadows } from '../constants/theme';

const AdminScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const currentUser = useStore((state) => state.currentUser);
  const users = useStore((state) => state.users);
  const fields = useStore((state) => state.fields);
  const createMatch = useStore((state) => state.createMatch);
  const updateUserReliability = useStore((state) => state.updateUserReliability);
  const updateUserPosition = useStore((state) => state.updateUserPosition);
  const appSettings = useStore((state) => state.appSettings);
  
  const styles = getStyles(isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  const [showCreateMatch, setShowCreateMatch] = useState(false);
  const [showMemberEdit, setShowMemberEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Create Match Form State
  const [matchForm, setMatchForm] = useState({
    fieldId: '',
    date: '',
    time: '',
    costTotal: '',
  });
  
  const isAdmin = currentUser.role === 'ADMIN';
  
  if (!isAdmin) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={localStyles.emptyContainer}>
          <Users size={64} color={colors.textSecondary} />
          <Text style={[styles.heading3, { marginTop: Spacing.base, color: colors.textSecondary }]}>
            Yetkisiz Erişim
          </Text>
          <Text style={[styles.caption, { marginTop: Spacing.sm, textAlign: 'center' }]}>
            Bu sayfaya erişim için admin yetkisi gereklidir
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const handleCreateMatch = () => {
    if (!matchForm.fieldId || !matchForm.date || !matchForm.time || !matchForm.costTotal) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    
    // Parse date and time strings
    const [year, month, day] = matchForm.date.split('-').map(Number);
    const [hours, minutes] = matchForm.time.split(':').map(Number);
    const startsAt = new Date(year, month - 1, day, hours, minutes);
    
    const match = createMatch({
      fieldId: matchForm.fieldId,
      startsAt,
      costTotal: parseFloat(matchForm.costTotal),
      costPerPerson: parseFloat(matchForm.costTotal) / 14, // Assuming 14 players
    });
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Başarılı', 'Yeni maç oluşturuldu');
    setShowCreateMatch(false);
    setMatchForm({ fieldId: '', date: '', time: '', costTotal: '' });
  };
  
  const handleEditMember = (user) => {
    setSelectedUser(user);
    setShowMemberEdit(true);
  };
  
  const handleUpdateReliability = (score) => {
    if (selectedUser) {
      updateUserReliability(selectedUser.id, score);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Başarılı', 'Güven skoru güncellendi');
      setShowMemberEdit(false);
    }
  };
  
  const renderUserCard = (user) => {
    const reliabilityColor =
      user.reliabilityScore >= 90
        ? colors.success
        : user.reliabilityScore >= 70
        ? colors.warning
        : colors.error;
    
    const reliabilityBg =
      user.reliabilityScore >= 90
        ? colors.successLight
        : user.reliabilityScore >= 70
        ? colors.warningLight
        : colors.errorLight;
    
    return (
      <TouchableOpacity
        key={user.id}
        style={[
          localStyles.userCard,
          {
            backgroundColor: colors.card,
            ...Shadows.small,
          },
        ]}
        onPress={() => handleEditMember(user)}
        activeOpacity={0.7}
      >
        <View style={localStyles.userCardLeft}>
          <View
            style={[
              localStyles.userAvatar,
              { 
                backgroundColor: colors.accentLight,
                borderWidth: 2,
                borderColor: colors.primary,
              },
            ]}
          >
            <Text style={[localStyles.userAvatarText, { color: colors.primary }]}>
              {user.nickname.substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={localStyles.userInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={[styles.body, { fontWeight: '600' }]}>
                {user.nickname}
              </Text>
              {user.role === 'ADMIN' && (
                <View style={[localStyles.adminBadge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[localStyles.adminBadgeText, { color: '#FFFFFF' }]}>
                    👑 Admin
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.caption, { marginTop: 2 }]}>
              {user.preferredPositions.join(' • ')}
            </Text>
            <View style={localStyles.userStats}>
              <View
                style={[
                  localStyles.userStatBadge,
                  { backgroundColor: colors.accentLight },
                ]}
              >
                <Award size={12} color={colors.primary} />
                <Text style={[localStyles.userStatText, { color: colors.primary }]}>
                  {user.skillRating.toFixed(1)}
                </Text>
              </View>
              <View
                style={[
                  localStyles.userStatBadge,
                  { backgroundColor: reliabilityBg },
                ]}
              >
                <Text style={[localStyles.userStatText, { color: reliabilityColor }]}>
                  {user.reliabilityScore}% Güven
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={localStyles.container}
        contentContainerStyle={localStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Toggle */}
        <View
          style={[
            localStyles.card,
            {
              backgroundColor: colors.card,
              ...Shadows.medium,
            },
          ]}
        >
          <View style={localStyles.cardHeader}>
            {isDarkMode ? (
              <Moon size={24} color={colors.primary} />
            ) : (
              <Sun size={24} color={colors.primary} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.heading3}>Karanlık Mod</Text>
              <Text style={styles.caption}>Tema ayarlarını değiştir</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        {/* Create Match */}
        <View
          style={[
            localStyles.card,
            {
              backgroundColor: colors.card,
              ...Shadows.medium,
            },
          ]}
        >
          <View style={localStyles.cardHeader}>
            <View
              style={[
                localStyles.cardIcon,
                { backgroundColor: colors.accentLight },
              ]}
            >
              <Plus size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.heading3}>Yeni Maç Oluştur</Text>
              <Text style={styles.caption}>Maç bilgilerini gir</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              { marginTop: Spacing.base },
            ]}
            onPress={() => setShowCreateMatch(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Maç Oluştur</Text>
          </TouchableOpacity>
        </View>
        
        {/* Member Management */}
        <View style={localStyles.section}>
          <View style={localStyles.sectionHeader}>
            <Text style={styles.heading3}>Üye Yönetimi</Text>
            <View
              style={[
                localStyles.sectionBadge,
                { backgroundColor: colors.accentLight },
              ]}
            >
              <Text style={[localStyles.sectionBadgeText, { color: colors.primary }]}>
                {users.length} Üye
              </Text>
            </View>
          </View>
          <View style={localStyles.usersList}>
            {users.map(renderUserCard)}
          </View>
        </View>
        
        {/* WhatsApp Templates */}
        <View
          style={[
            localStyles.card,
            {
              backgroundColor: colors.card,
              ...Shadows.medium,
            },
          ]}
        >
          <View style={localStyles.cardHeader}>
            <View
              style={[
                localStyles.cardIcon,
                { backgroundColor: '#DCFCE7' },
              ]}
            >
              <MessageSquare size={24} color="#25D366" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.heading3}>WhatsApp Şablonları</Text>
              <Text style={styles.caption}>Otomatik mesaj şablonları</Text>
            </View>
          </View>
          
          <View style={localStyles.templateContainer}>
            <Text style={[styles.caption, { marginBottom: Spacing.xs }]}>
              Maç Daveti
            </Text>
            <View
              style={[
                localStyles.templateBox,
                { backgroundColor: colors.backgroundSecondary, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.caption, { color: colors.text }]}>
                {appSettings.whatsappTemplates.matchInvite}
              </Text>
            </View>
            
            <Text style={[styles.caption, { marginBottom: Spacing.xs, marginTop: Spacing.base }]}>
              Ödeme Hatırlatması
            </Text>
            <View
              style={[
                localStyles.templateBox,
                { backgroundColor: colors.backgroundSecondary, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.caption, { color: colors.text }]}>
                {appSettings.whatsappTemplates.paymentReminder}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Create Match Modal */}
      <Modal
        visible={showCreateMatch}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateMatch(false)}
      >
        <View style={localStyles.modalOverlay}>
          <View
            style={[
              localStyles.modalContent,
              { backgroundColor: colors.card },
            ]}
          >
            <View style={localStyles.modalHeader}>
              <Text style={styles.heading2}>Yeni Maç Oluştur</Text>
              <TouchableOpacity onPress={() => setShowCreateMatch(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <ScrollView style={localStyles.modalBody}>
              {/* Field Selection */}
              <Text style={[styles.body, { marginBottom: Spacing.xs }]}>Saha</Text>
              {fields.map((field) => (
                <TouchableOpacity
                  key={field.id}
                  style={[
                    localStyles.fieldOption,
                    {
                      backgroundColor:
                        matchForm.fieldId === field.id
                          ? colors.accentLight
                          : colors.backgroundSecondary,
                      borderColor:
                        matchForm.fieldId === field.id ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => setMatchForm({ ...matchForm, fieldId: field.id })}
                  activeOpacity={0.7}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.body,
                        { fontWeight: '600', color: colors.text },
                      ]}
                    >
                      {field.name}
                    </Text>
                    <Text style={styles.caption}>₺{field.pricePerHour}/saat</Text>
                  </View>
                  {matchForm.fieldId === field.id && (
                    <Check size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
              
              {/* Date */}
              <Text style={[styles.body, { marginTop: Spacing.base, marginBottom: Spacing.xs }]}>
                Tarih (YYYY-MM-DD)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.backgroundSecondary },
                ]}
                placeholder="2026-02-20"
                placeholderTextColor={colors.textSecondary}
                value={matchForm.date}
                onChangeText={(text) => setMatchForm({ ...matchForm, date: text })}
              />
              
              {/* Time */}
              <Text style={[styles.body, { marginTop: Spacing.base, marginBottom: Spacing.xs }]}>
                Saat (HH:MM)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.backgroundSecondary },
                ]}
                placeholder="19:00"
                placeholderTextColor={colors.textSecondary}
                value={matchForm.time}
                onChangeText={(text) => setMatchForm({ ...matchForm, time: text })}
              />
              
              {/* Cost */}
              <Text style={[styles.body, { marginTop: Spacing.base, marginBottom: Spacing.xs }]}>
                Toplam Ücret (TL)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: colors.backgroundSecondary },
                ]}
                placeholder="800"
                placeholderTextColor={colors.textSecondary}
                value={matchForm.costTotal}
                onChangeText={(text) => setMatchForm({ ...matchForm, costTotal: text })}
                keyboardType="numeric"
              />
            </ScrollView>
            </KeyboardAvoidingView>
            
            <View style={localStyles.modalFooter}>
              <TouchableOpacity
                style={[
                  styles.buttonOutline,
                  { flex: 1 },
                ]}
                onPress={() => setShowCreateMatch(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonOutlineText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  { flex: 1 },
                ]}
                onPress={handleCreateMatch}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Oluştur</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Edit Member Modal */}
      <Modal
        visible={showMemberEdit}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMemberEdit(false)}
      >
        <View style={localStyles.modalOverlay}>
          <View
            style={[
              localStyles.modalContent,
              { backgroundColor: colors.card },
            ]}
          >
            <View style={localStyles.modalHeader}>
              <Text style={styles.heading2}>
                {selectedUser?.nickname} - Düzenle
              </Text>
              <TouchableOpacity onPress={() => setShowMemberEdit(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={localStyles.modalBody}>
              <Text style={[styles.body, { marginBottom: Spacing.base }]}>
                Güven Skoru
              </Text>
              <View style={localStyles.reliabilityButtons}>
                {[100, 95, 90, 85, 80, 75, 70, 65, 60].map((score) => (
                  <TouchableOpacity
                    key={score}
                    style={[
                      localStyles.reliabilityButton,
                      {
                        backgroundColor:
                          selectedUser?.reliabilityScore === score
                            ? colors.primary
                            : colors.backgroundSecondary,
                        borderColor:
                          selectedUser?.reliabilityScore === score
                            ? colors.primary
                            : colors.border,
                      },
                    ]}
                    onPress={() => handleUpdateReliability(score)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        localStyles.reliabilityButtonText,
                        {
                          color:
                            selectedUser?.reliabilityScore === score
                              ? '#FFFFFF'
                              : colors.text,
                        },
                      ]}
                    >
                      {score}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  card: {
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    marginBottom: Spacing.base,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
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
  usersList: {
    gap: Spacing.sm,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
  },
  userCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.md,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 16,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  adminBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  adminBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  userStats: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: 6,
  },
  userStatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  userStatText: {
    fontSize: 11,
    fontWeight: '600',
  },
  userCardRight: {
    alignItems: 'center',
  },
  reliabilityBadge: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reliabilityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  templateContainer: {
    marginTop: Spacing.base,
  },
  templateBox: {
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalBody: {
    padding: Spacing.base,
    maxHeight: 400,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  fieldOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    marginBottom: Spacing.sm,
  },
  reliabilityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  reliabilityButton: {
    width: 60,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reliabilityButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminScreen;
