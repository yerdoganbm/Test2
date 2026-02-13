const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Web için özel ayarlar
config.resolver.sourceExts.push('cjs');

module.exports = config;
