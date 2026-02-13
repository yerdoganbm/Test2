import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserPlus, Share2, Copy, MessageCircle, QrCode } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';

const InviteScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const groupCode = 'HALISAHA2024';
  const inviteLink = `https://halisaha.app/join/${groupCode}`;
  const inviteMessage = `🏆 Halı Saha Grubuna Davet!\n\nMerhaba! Seni halı saha grubumuza davet ediyorum.\n\n📱 Grup Kodu: ${groupCode}\n🔗 Link: ${inviteLink}\n\nUygulamayı indir ve grup kodunu gir!`;
  
  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(groupCode);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Kopyalandı', 'Grup kodu kopyalandı');
  };
  
  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(inviteLink);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Kopyalandı', 'Davet linki kopyalandı');
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: inviteMessage,
        title: 'Halı Saha Grubuna Davet',
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      Alert.alert('Hata', 'Paylaşım başarısız');
    }
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={localStyles.container}>
        {/* Header */}
        <View style={localStyles.header}>
          <View style={[localStyles.iconContainer, { backgroundColor: colors.primary }]}>
            <UserPlus size={48} color="#FFFFFF" />
          </View>
          <Text style={[styles.heading1, { textAlign: 'center', marginTop: Spacing.lg }]}>
            Gruba Davet Et
          </Text>
          <Text style={[styles.bodySecondary, { textAlign: 'center', marginTop: Spacing.sm }]}>
            Arkadaşlarını gruba ekle
          </Text>
        </View>
        
        {/* Group Code Card */}
        <View style={[localStyles.codeCard, { backgroundColor: colors.card, ...Shadows.large }]}>
          <Text style={[styles.caption, { textAlign: 'center', marginBottom: Spacing.sm }]}>
            GRUP KODU
          </Text>
          <Text style={[localStyles.codeText, { color: colors.primary }]}>
            {groupCode}
          </Text>
          <TouchableOpacity
            style={[localStyles.copyButton, { backgroundColor: colors.accentLight }]}
            onPress={handleCopyCode}
            activeOpacity={0.7}
          >
            <Copy size={18} color={colors.primary} />
            <Text style={[localStyles.copyButtonText, { color: colors.primary }]}>
              Kodu Kopyala
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Invite Methods */}
        <View style={localStyles.methods}>
          <TouchableOpacity
            style={[localStyles.methodButton, { backgroundColor: colors.card, ...Shadows.medium }]}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <View style={[localStyles.methodIcon, { backgroundColor: colors.infoLight }]}>
              <Share2 size={24} color={colors.info} />
            </View>
            <Text style={[styles.body, { fontWeight: '600' }]}>Paylaş</Text>
            <Text style={[styles.caption]}>Tüm uygulamalar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[localStyles.methodButton, { backgroundColor: colors.card, ...Shadows.medium }]}
            onPress={handleCopyLink}
            activeOpacity={0.8}
          >
            <View style={[localStyles.methodIcon, { backgroundColor: colors.purpleLight }]}>
              <Copy size={24} color={colors.purple} />
            </View>
            <Text style={[styles.body, { fontWeight: '600' }]}>Link Kopyala</Text>
            <Text style={[styles.caption]}>Direkt link</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[localStyles.methodButton, { backgroundColor: colors.card, ...Shadows.medium }]}
            activeOpacity={0.8}
          >
            <View style={[localStyles.methodIcon, { backgroundColor: '#DCFCE7' }]}>
              <MessageCircle size={24} color="#25D366" />
            </View>
            <Text style={[styles.body, { fontWeight: '600' }]}>WhatsApp</Text>
            <Text style={[styles.caption]}>Toplu gönder</Text>
          </TouchableOpacity>
        </View>
        
        {/* Info Card */}
        <View style={[localStyles.infoCard, { backgroundColor: colors.infoLight }]}>
          <Text style={[styles.body, { color: colors.info, fontWeight: '600' }]}>
            💡 Nasıl Çalışır?
          </Text>
          <Text style={[styles.caption, { color: colors.info, marginTop: Spacing.xs }]}>
            Arkadaşın uygulamayı indirip grup kodunu girdiğinde, sen onaylarsan gruba katılacak.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.large,
  },
  codeCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  codeText: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: Spacing.base,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  methods: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  methodButton: {
    flex: 1,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
  },
  methodIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  infoCard: {
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
  },
});

export default InviteScreen;
