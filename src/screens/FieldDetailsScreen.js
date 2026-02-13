import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Phone, DollarSign, Clock, Wifi, Coffee, Car, Droplet, Navigation } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';

const FieldDetailsScreen = ({ route }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const getFieldById = useStore((state) => state.getFieldById);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const fieldId = route?.params?.fieldId || 'f1';
  const field = getFieldById(fieldId);
  
  const amenitiesIcons = {
    shower: Droplet,
    parking: Car,
    cafe: Coffee,
    lockerRoom: Wifi,
  };
  
  const openMaps = () => {
    const url = `https://maps.apple.com/?q=${field.latitude},${field.longitude}`;
    Linking.openURL(url);
  };
  
  const callField = () => {
    Linking.openURL(`tel:${field.contactPhone}`);
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={localStyles.container}>
        {/* Hero Card */}
        <View style={[localStyles.heroCard, { backgroundColor: colors.fieldGreen, ...Shadows.large }]}>
          <Text style={localStyles.fieldName}>{field?.name}</Text>
          <View style={localStyles.priceTag}>
            <DollarSign size={20} color="#FFFFFF" />
            <Text style={localStyles.priceText}>₺{field?.pricePerHour}/saat</Text>
          </View>
        </View>
        
        {/* Location Card */}
        <View style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.medium }]}>
          <View style={localStyles.cardHeader}>
            <MapPin size={24} color={colors.primary} />
            <Text style={[styles.heading3, { marginLeft: Spacing.sm }]}>Konum</Text>
          </View>
          <Text style={[styles.body, { marginTop: Spacing.sm }]}>{field?.address}</Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: Spacing.base }]}
            onPress={openMaps}
            activeOpacity={0.8}
          >
            <Navigation size={20} color="#FFFFFF" />
            <Text style={[styles.buttonText, { marginLeft: Spacing.xs }]}>Yol Tarifi Al</Text>
          </TouchableOpacity>
        </View>
        
        {/* Contact Card */}
        <View style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.medium }]}>
          <View style={localStyles.cardHeader}>
            <Phone size={24} color={colors.info} />
            <Text style={[styles.heading3, { marginLeft: Spacing.sm }]}>İletişim</Text>
          </View>
          <TouchableOpacity
            style={[localStyles.phoneButton, { backgroundColor: colors.infoLight }]}
            onPress={callField}
            activeOpacity={0.7}
          >
            <Phone size={20} color={colors.info} />
            <Text style={[styles.body, { color: colors.info, fontWeight: '600' }]}>
              {field?.contactPhone}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Amenities */}
        <View style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.medium }]}>
          <Text style={[styles.heading3, { marginBottom: Spacing.base }]}>Olanaklar</Text>
          <View style={localStyles.amenitiesGrid}>
            {Object.entries(field?.amenities || {}).map(([key, value]) => {
              const Icon = amenitiesIcons[key] || Wifi;
              return (
                <View
                  key={key}
                  style={[
                    localStyles.amenityItem,
                    {
                      backgroundColor: value ? colors.successLight : colors.borderLight,
                      opacity: value ? 1 : 0.5,
                    },
                  ]}
                >
                  <Icon size={24} color={value ? colors.success : colors.textSecondary} />
                  <Text style={[styles.caption, { marginTop: 4, textAlign: 'center' }]}>
                    {key === 'shower' && 'Duş'}
                    {key === 'parking' && 'Park'}
                    {key === 'cafe' && 'Kafe'}
                    {key === 'lockerRoom' && 'Soyunma'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: Spacing.base,
  },
  heroCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.base,
    alignItems: 'center',
  },
  fieldName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.base,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  card: {
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.base,
    gap: Spacing.sm,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  amenityItem: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.sm,
  },
});

export default FieldDetailsScreen;
