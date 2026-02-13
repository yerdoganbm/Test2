import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Plus, Edit, Trash, X } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';

const FieldManagementScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const fields = useStore((state) => state.fields);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const [showModal, setShowModal] = useState(false);
  
  const renderField = ({ item: field }) => (
    <View style={[localStyles.fieldCard, { backgroundColor: colors.card, ...Shadows.small }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.body, { fontWeight: '600' }]}>{field.name}</Text>
        <Text style={[styles.caption, { marginTop: 2 }]}>₺{field.pricePerHour}/saat</Text>
      </View>
      <View style={localStyles.actions}>
        <TouchableOpacity style={[localStyles.iconButton, { backgroundColor: colors.infoLight }]} activeOpacity={0.7}>
          <Edit size={18} color={colors.info} />
        </TouchableOpacity>
        <TouchableOpacity style={[localStyles.iconButton, { backgroundColor: colors.errorLight }]} activeOpacity={0.7}>
          <Trash size={18} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={localStyles.header}>
        <MapPin size={24} color={colors.primary} />
        <Text style={[styles.heading2, { marginLeft: Spacing.md }]}>Saha Yönetimi</Text>
        <TouchableOpacity
          style={[localStyles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowModal(true)}
          activeOpacity={0.8}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
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
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  addButton: {
    marginLeft: 'auto',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: Spacing.base,
  },
  fieldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FieldManagementScreen;
