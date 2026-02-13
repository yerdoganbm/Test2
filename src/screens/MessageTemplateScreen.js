import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, Save } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';

const MessageTemplateScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const appSettings = useStore((state) => state.appSettings);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const [templates, setTemplates] = useState(appSettings.whatsappTemplates);
  
  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Kaydedildi', 'Mesaj şablonları güncellendi');
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={localStyles.container}>
        <View style={[localStyles.header, { backgroundColor: '#DCFCE7' }]}>
          <MessageSquare size={28} color="#25D366" />
          <Text style={[styles.heading2, { color: '#16A34A', marginLeft: Spacing.md }]}>
            WhatsApp Şablonları
          </Text>
        </View>
        
        <View style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.medium }]}>
          <Text style={[styles.heading3, { marginBottom: Spacing.xs }]}>Maç Daveti</Text>
          <Text style={[styles.caption, { marginBottom: Spacing.base }]}>
            Değişkenler: {'{date}'}, {'{time}'}, {'{field}'}, {'{cost}'}
          </Text>
          <TextInput
            style={[localStyles.textarea, { backgroundColor: colors.backgroundSecondary, color: colors.text, borderColor: colors.border }]}
            value={templates.matchInvite}
            onChangeText={(text) => setTemplates({ ...templates, matchInvite: text })}
            multiline
            numberOfLines={6}
          />
        </View>
        
        <View style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.medium }]}>
          <Text style={[styles.heading3, { marginBottom: Spacing.xs }]}>Ödeme Hatırlatması</Text>
          <Text style={[styles.caption, { marginBottom: Spacing.base }]}>
            Değişkenler: {'{name}'}, {'{amount}'}, {'{date}'}, {'{iban}'}
          </Text>
          <TextInput
            style={[localStyles.textarea, { backgroundColor: colors.backgroundSecondary, color: colors.text, borderColor: colors.border }]}
            value={templates.paymentReminder}
            onChangeText={(text) => setTemplates({ ...templates, paymentReminder: text })}
            multiline
            numberOfLines={6}
          />
        </View>
        
        <TouchableOpacity
          style={[styles.button, { flexDirection: 'row', gap: Spacing.xs }]}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Save size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Değişiklikleri Kaydet</Text>
        </TouchableOpacity>
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
    marginBottom: Spacing.lg,
  },
  card: {
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
  },
  textarea: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    padding: Spacing.md,
    fontSize: 14,
    minHeight: 120,
    textAlignVertical: 'top',
  },
});

export default MessageTemplateScreen;
