import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Spacing, BorderRadius, Shadows } from '../constants/theme';

// Gradient-like Card Component (simulated with solid colors)
export const GradientCard = ({ color, children, style, onPress }) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      style={[styles.gradientCard, { backgroundColor: color }, style]}
    >
      {children}
    </Component>
  );
};

// Stat Badge Component
export const StatBadge = ({ icon: Icon, label, value, color, bgColor }) => (
  <View style={[styles.statBadge, { backgroundColor: bgColor }]}>
    {Icon && <Icon size={16} color={color} />}
    <View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={[styles.statLabel, { color }]}>{label}</Text>
    </View>
  </View>
);

// Progress Bar Component
export const ProgressBar = ({ progress, color, bgColor }) => (
  <View style={[styles.progressBar, { backgroundColor: bgColor }]}>
    <View
      style={[
        styles.progressFill,
        {
          width: `${progress}%`,
          backgroundColor: color,
        },
      ]}
    />
  </View>
);

// Avatar Component
export const Avatar = ({ name, size = 48, color, bgColor }) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';
  
  const avatarSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  
  return (
    <View
      style={[
        styles.avatar,
        avatarSize,
        { backgroundColor: bgColor, borderColor: color },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.35, color }]}>
        {initials}
      </Text>
    </View>
  );
};

// Status Chip Component
export const StatusChip = ({ label, status, onPress }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'success':
        return { backgroundColor: '#D1FAE5', color: '#10B981' };
      case 'error':
        return { backgroundColor: '#FEE2E2', color: '#EF4444' };
      case 'warning':
        return { backgroundColor: '#FEF3C7', color: '#F59E0B' };
      case 'info':
        return { backgroundColor: '#DBEAFE', color: '#3B82F6' };
      default:
        return { backgroundColor: '#F1F5F9', color: '#64748B' };
    }
  };
  
  const statusStyle = getStatusStyle();
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[styles.chip, { backgroundColor: statusStyle.backgroundColor }]}
    >
      <Text style={[styles.chipText, { color: statusStyle.color }]}>
        {label}
      </Text>
    </Component>
  );
};

// Floating Action Button
export const FloatingButton = ({ icon: Icon, onPress, color, bgColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.floatingButton, { backgroundColor: bgColor }]}
    activeOpacity={0.8}
  >
    <Icon size={24} color={color} strokeWidth={2.5} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  gradientCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.large,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.8,
  },
  progressBar: {
    height: 8,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  avatarText: {
    fontWeight: '700',
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.large,
  },
});
