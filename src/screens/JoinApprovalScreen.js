import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCheck, X, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Avatar } from '../components/StitchComponents';

const JoinApprovalScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const pendingUsers = [
    { id: 'p1', nickname: 'Yeni Oyuncu 1', phone: '+905551234590', requestedAt: new Date() },
    { id: 'p2', nickname: 'Yeni Oyuncu 2', phone: '+905551234591', requestedAt: new Date() },
  ];
  
  const handleApprove = (user) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Onaylandı', `${user.nickname} gruba katıldı`);
  };
  
  const handleReject = (user) => {
    Alert.alert('Reddet', `${user.nickname} kullanıcısını reddetmek istediğinize emin misiniz?`, [
      { text: 'İptal', style: 'cancel' },
      { text: 'Reddet', style: 'destructive', onPress: () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }},
    ]);
  };
  
  const renderUser = ({ item: user }) => (
    <View style={[localStyles.userCard, { backgroundColor: colors.card, ...Shadows.medium }]}>
      <Avatar name={user.nickname} size={56} color={colors.primary} bgColor={colors.accentLight} />
      <View style={localStyles.userInfo}>
        <Text style={[styles.body, { fontWeight: '600' }]}>{user.nickname}</Text>
        <Text style={styles.caption}>{user.phone}</Text>
        <Text style={[styles.caption, { marginTop: 2 }]}>
          {new Date(user.requestedAt).toLocaleDateString('tr-TR')}
        </Text>
      </View>
      <View style={localStyles.actions}>
        <TouchableOpacity
          style={[localStyles.actionButton, { backgroundColor: colors.error }]}
          onPress={() => handleReject(user)}
          activeOpacity={0.7}
        >
          <X size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[localStyles.actionButton, { backgroundColor: colors.success }]}
          onPress={() => handleApprove(user)}
          activeOpacity={0.7}
        >
          <Check size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={localStyles.header}>
        <UserCheck size={28} color={colors.primary} />
        <Text style={[styles.heading2, { marginLeft: Spacing.md }]}>
          Katılım Onayı
        </Text>
        <View style={[localStyles.badge, { backgroundColor: colors.errorLight }]}>
          <Text style={[localStyles.badgeText, { color: colors.error }]}>
            {pendingUsers.length}
          </Text>
        </View>
      </View>
      
      <FlatList
        data={pendingUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={localStyles.list}
        ListEmptyComponent={
          <View style={localStyles.empty}>
            <UserCheck size={64} color={colors.textSecondary} />
            <Text style={[styles.bodySecondary, { marginTop: Spacing.base }]}>
              Bekleyen katılım yok
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
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  badge: {
    marginLeft: 'auto',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    padding: Spacing.base,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing['5xl'],
  },
});

export default JoinApprovalScreen;
