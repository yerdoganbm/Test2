import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { useStore } from './src/store';

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const isDarkMode = useStore((state) => state.isDarkMode);
  
  React.useEffect(() => {
    // Simple initialization
    setTimeout(() => setIsReady(true), 100);
  }, []);
  
  if (!isReady) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }
  
  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
  },
});
