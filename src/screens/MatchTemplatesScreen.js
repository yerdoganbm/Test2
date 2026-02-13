import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, Users, Edit } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';

const MatchTemplatesScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const getFieldById = useStore((state) => state.getFieldById);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const templates = [
    { id: 't1', name: 'Pazartesi Maçı', dayOfWeek: 1, time: '19:00', fieldId: 'f1', active: true },
    { id: 't2', name: 'Çarşamba Maçı', dayOfWeek: 3, time: '20:00', fieldId: 'f2', active: true },
    { id: 't3', name: 'Cumartesi Maçı', dayOfWeek: 6, time: '18:00', fieldId: 'f1', active: false },
  ];
  
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  
  const renderTemplate = ({ item: template }) => {
    const field = getFieldById(template.fieldId);
    
    return (
      <View style={[localStyles.templateCard, { backgroundColor: colors.card, ...Shadows.medium }]}>
        <View style={localStyles.templateHeader}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.heading3, { fontSize: 18 }]}>{template.name}</Text>
            <Text style={[styles.caption, { marginTop: 4 }]}>
              Her {dayNames[template.dayOfWeek]} • {template.time}
            </Text>
          </View>
          <Switch value={template.active} trackColor={{ true: colors.primary }} />
        </View>
        
        <View style={localStyles.templateInfo}>
          <View style={localStyles.infoRow}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={[styles.caption, { marginLeft: 6 }]}>{field?.name}</Text>
          </View>
          <View style={localStyles.infoRow}>
            <Users size={16} color={colors.primary} />
            <Text style={[styles.caption, { marginLeft: 6, color: colors.primary }]}>
              Otomatik oluştur
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[localStyles.editButton, { backgroundColor: colors.backgroundSecondary }]}
          activeOpacity={0.7}
        >
          <Edit size={16} color={colors.primary} />
          <Text style={[styles.caption, { color: colors.primary, fontWeight: '600', marginLeft: 4 }]}>
            Düzenle
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={localStyles.header}>
        <Calendar size={28} color={colors.primary} />
        <Text style={[styles.heading2, { marginLeft: Spacing.md }]}>
          Haftalık Maç Şablonları
        </Text>
      </View>
      
      <FlatList
        data={templates}
        renderItem={renderTemplate}
        keyExtractor={(item) => item.id}
        contentContainerStyle={localStyles.list}
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
  list: {
    padding: Spacing.base,
  },
  templateCard: {
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  templateInfo: {
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
});

export default MatchTemplatesScreen;
