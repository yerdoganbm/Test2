import { Platform } from 'react-native';

// Color Palette
export const Colors = {
  light: {
    // Primary Colors
    primary: '#10B981', // Emerald Green
    primaryLight: '#34D399',
    primaryDark: '#059669',
    
    // Background Colors
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    card: '#F9FAFB',
    cardHover: '#F3F4F6',
    
    // Text Colors
    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    
    // Status Colors
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Functional Colors
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Accent Colors
    accent: '#10B981',
    accentLight: '#D1FAE5',
    
    // Field Colors
    fieldGreen: '#22C55E',
    fieldDark: '#16A34A',
  },
  dark: {
    // Primary Colors
    primary: '#10B981',
    primaryLight: '#34D399',
    primaryDark: '#059669',
    
    // Background Colors
    background: '#111827',
    backgroundSecondary: '#1F2937',
    card: '#1F2937',
    cardHover: '#374151',
    
    // Text Colors
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textTertiary: '#9CA3AF',
    
    // Status Colors
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Functional Colors
    border: '#374151',
    borderLight: '#4B5563',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    
    // Accent Colors
    accent: '#10B981',
    accentLight: '#065F46',
    
    // Field Colors
    fieldGreen: '#22C55E',
    fieldDark: '#16A34A',
  }
};

// Typography
export const Typography = {
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Font Weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing System (8pt grid)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

// Border Radius
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glass: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
};

// Common Styles
export const getStyles = (isDarkMode = false) => {
  const colors = isDarkMode ? Colors.dark : Colors.light;
  
  return {
    // Container Styles
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    
    // Card Styles
    card: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.base,
      padding: Spacing.base,
      ...Shadows.medium,
    },
    
    cardGlass: {
      backgroundColor: isDarkMode 
        ? 'rgba(31, 41, 55, 0.8)' 
        : 'rgba(255, 255, 255, 0.8)',
      borderRadius: BorderRadius.base,
      padding: Spacing.base,
      borderWidth: 1,
      borderColor: colors.borderLight,
      ...Shadows.glass,
    },
    
    // Text Styles
    heading1: {
      fontSize: Typography.fontSize['3xl'],
      fontWeight: Typography.fontWeight.bold,
      color: colors.text,
      lineHeight: Typography.fontSize['3xl'] * Typography.lineHeight.tight,
    },
    
    heading2: {
      fontSize: Typography.fontSize['2xl'],
      fontWeight: Typography.fontWeight.bold,
      color: colors.text,
      lineHeight: Typography.fontSize['2xl'] * Typography.lineHeight.tight,
    },
    
    heading3: {
      fontSize: Typography.fontSize.xl,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.text,
      lineHeight: Typography.fontSize.xl * Typography.lineHeight.tight,
    },
    
    body: {
      fontSize: Typography.fontSize.base,
      fontWeight: Typography.fontWeight.regular,
      color: colors.text,
      lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
    },
    
    bodySecondary: {
      fontSize: Typography.fontSize.base,
      fontWeight: Typography.fontWeight.regular,
      color: colors.textSecondary,
      lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
    },
    
    caption: {
      fontSize: Typography.fontSize.sm,
      fontWeight: Typography.fontWeight.regular,
      color: colors.textSecondary,
      lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
    },
    
    // Button Styles
    button: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.md,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      ...Shadows.small,
    },
    
    buttonText: {
      fontSize: Typography.fontSize.base,
      fontWeight: Typography.fontWeight.semibold,
      color: '#FFFFFF',
    },
    
    buttonOutline: {
      backgroundColor: 'transparent',
      borderRadius: BorderRadius.md,
      borderWidth: 2,
      borderColor: colors.primary,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    buttonOutlineText: {
      fontSize: Typography.fontSize.base,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.primary,
    },
    
    // Input Styles
    input: {
      backgroundColor: colors.background,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.base,
      fontSize: Typography.fontSize.base,
      color: colors.text,
    },
    
    // Badge Styles
    badge: {
      backgroundColor: colors.accentLight,
      borderRadius: BorderRadius.full,
      paddingVertical: Spacing.xs,
      paddingHorizontal: Spacing.sm,
    },
    
    badgeText: {
      fontSize: Typography.fontSize.xs,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.primary,
    },
    
    // Divider
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: Spacing.base,
    },
  };
};

// Helper Functions
export const getColor = (colorName, isDarkMode = false) => {
  const colors = isDarkMode ? Colors.dark : Colors.light;
  return colors[colorName] || colorName;
};

export const hexToRgba = (hex, alpha = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return hex;
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  getStyles,
  getColor,
  hexToRgba,
};
