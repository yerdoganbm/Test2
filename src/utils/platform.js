import { Platform } from 'react-native';

// Platform detection utilities
export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Safe haptics wrapper for web
export const safeHaptics = {
  impactAsync: async (style) => {
    if (!isWeb) {
      const Haptics = require('expo-haptics');
      return await Haptics.impactAsync(style);
    }
  },
  notificationAsync: async (type) => {
    if (!isWeb) {
      const Haptics = require('expo-haptics');
      return await Haptics.notificationAsync(type);
    }
  },
};

// Safe linking wrapper for web
export const safeLinking = {
  canOpenURL: async (url) => {
    if (!isWeb) {
      const Linking = require('expo-linking');
      return await Linking.canOpenURL(url);
    }
    return false;
  },
  openURL: async (url) => {
    if (!isWeb) {
      const Linking = require('expo-linking');
      return await Linking.openURL(url);
    } else {
      window.open(url, '_blank');
    }
  },
};

// Safe clipboard wrapper for web
export const safeClipboard = {
  setStringAsync: async (text) => {
    if (!isWeb) {
      const Clipboard = require('expo-clipboard');
      return await Clipboard.setStringAsync(text);
    } else {
      if (navigator.clipboard) {
        return await navigator.clipboard.writeText(text);
      }
    }
  },
};

export default {
  isWeb,
  isIOS,
  isAndroid,
  safeHaptics,
  safeLinking,
  safeClipboard,
};
