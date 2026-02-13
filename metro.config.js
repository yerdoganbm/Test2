const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Web için özel ayarlar
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs', 'mjs'];

// Web için transformer ayarları
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
};

module.exports = config;
