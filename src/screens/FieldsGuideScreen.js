import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, DollarSign, Star, Navigation } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';

const FieldsGuideScreen = ({ navigation }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const fields = useStore((state) => state.fields);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const renderField = ({ item: field }) => (
    <TouchableOpacity
      style={[localStyles.fieldCard, { backgroundColor: colors.card, ...Shadows.medium }]}
      onPress={() => navigation.navigate('FieldDetails', { fieldId: field.id })}
      activeOpacity={0.8}
    >
      <View style={localStyles.fieldHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.heading3, { fontSize: 18 }]}>{field.name}</Text>
          <View style={localStyles.rating}>
            <Star size={14} color={colors.mvp} fill={colors.mvp} />
            <Text style={[styles.caption, { marginLeft: 4 }]}>4.8 (124 değerlendirme)</Text>
          </View>
        </View>
        <View style={[localStyles.priceBadge, { backgroundColor: colors.successLight }]}>
          <DollarSign size={16} color={colors.success} />
          <Text style={[styles.body, { color: colors.success, fontWeight: '700' }]}>
            ₺{field.pricePerHour}
          </Text>
        </View>
      </View>
      
      <View style={localStyles.fieldLocation}>
        <MapPin size={16} color={colors.textSecondary} />
        <Text style={[styles.caption, { marginLeft: 6, flex: 1 }]}>
          {field.address?.substring(0, 60)}...
        </Text>
      </View>
      
      <View style={localStyles.amenitiesRow}>
        {field.amenities?.shower && <Text style={styles.caption}>🚿 Duş</Text>}
        {field.amenities?.parking && <Text style={styles.caption}>🚗 Park</Text>}
        {field.amenities?.cafe && <Text style={styles.caption}>☕ Kafe</Text>}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[localStyles.header, { backgroundColor: colors.fieldGreen }]}>
        <MapPin size={28} color="#FFFFFF" />
        <Text style={[styles.heading2, { color: '#FFFFFF', marginLeft: Spacing.md }]}>
          Saha Rehberi
        </Text>
      </View>
      
      <FlatList
        data={fields}
        renderItem={renderField}
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
    padding: Spacing.lg,
  },
  list: {
    padding: Spacing.base,
  },
  fieldCard: {
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
  },
  fieldHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  fieldLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  amenitiesRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
});

export default FieldsGuideScreen;
