import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useStore } from '../store';
import { getColor, Spacing } from '../constants/theme';

export const LoadingSpinner = ({ size = 'large', color }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const defaultColor = color || getColor('primary', isDarkMode);
  
  return <ActivityIndicator size={size} color={defaultColor} />;
};

export const LoadingScreen = ({ message = 'Yükleniyor...' }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LoadingSpinner />
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
    </View>
  );
};

export const EmptyState = ({ icon: Icon, title, message, action }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  return (
    <View style={styles.emptyContainer}>
      {Icon && <Icon size={64} color={colors.textSecondary} />}
      <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>{title}</Text>
      {message && (
        <Text style={[styles.emptyMessage, { color: colors.textTertiary }]}>{message}</Text>
      )}
      {action}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: Spacing.base,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['3xl'],
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: Spacing.base,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
});
