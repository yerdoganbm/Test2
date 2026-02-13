import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Users, Send, FileText } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';

const WhatsAppIntegrationScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const messageTypes = [
    { id: 1, title: 'Maç Daveti Gönder', icon: Send, desc: 'Tüm gruba maç daveti', color: colors.primary },
    { id: 2, title: 'Ödeme Hatırlatması', icon: FileText, desc: 'Borçlulara hatırlat', color: colors.warning },
    { id: 3, title: 'Anket Bildirimi', icon: Users, desc: 'Anket için bilgilendirme', color: colors.info },
  ];
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={localStyles.container}>
        <View style={[localStyles.header, { backgroundColor: '#DCFCE7', ...Shadows.large }]}>
          <MessageCircle size={48} color="#25D366" />
          <Text style={[styles.heading1, { color: '#16A34A', marginTop: Spacing.base }]}>
            WhatsApp Hub
          </Text>
          <Text style={[styles.caption, { color: '#16A34A', marginTop: Spacing.xs }]}>
            Toplu mesaj gönderimi
          </Text>
        </View>
        
        {messageTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[localStyles.typeCard, { backgroundColor: colors.card, ...Shadows.medium }]}
            activeOpacity={0.8}
          >
            <View style={[localStyles.typeIcon, { backgroundColor: `${type.color}20` }]}>
              <type.icon size={28} color={type.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.body, { fontWeight: '600' }]}>{type.title}</Text>
              <Text style={[styles.caption, { marginTop: 2 }]}>{type.desc}</Text>
            </View>
            <Send size={20} color={colors.textSecondary} />
          </TouchableOpacity>
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
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  typeIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WhatsAppIntegrationScreen;
