import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Vote, Plus, X } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius } from '../constants/theme';

const CreatePollScreen = ({ navigation }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const [poll, setPoll] = useState({
    title: '',
    description: '',
    options: ['', ''],
  });
  
  const addOption = () => {
    setPoll({ ...poll, options: [...poll.options, ''] });
  };
  
  const removeOption = (index) => {
    if (poll.options.length > 2) {
      setPoll({ ...poll, options: poll.options.filter((_, i) => i !== index) });
    }
  };
  
  const handleCreate = () => {
    if (!poll.title || poll.options.some(o => !o)) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    Alert.alert('Başarılı', 'Anket oluşturuldu', [
      { text: 'Tamam', onPress: () => navigation.goBack() },
    ]);
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={localStyles.container}>
          <View style={localStyles.header}>
            <Vote size={32} color={colors.primary} />
            <Text style={[styles.heading2, { marginTop: Spacing.base }]}>Yeni Anket</Text>
          </View>
          
          <Text style={[styles.body, { marginBottom: Spacing.xs }]}>Başlık</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.backgroundSecondary }]}
            placeholder="Anket başlığı"
            placeholderTextColor={colors.textSecondary}
            value={poll.title}
            onChangeText={(text) => setPoll({ ...poll, title: text })}
          />
          
          <Text style={[styles.body, { marginTop: Spacing.base, marginBottom: Spacing.xs }]}>
            Açıklama (isteğe bağlı)
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.backgroundSecondary }]}
            placeholder="Anket açıklaması"
            placeholderTextColor={colors.textSecondary}
            value={poll.description}
            onChangeText={(text) => setPoll({ ...poll, description: text })}
            multiline
          />
          
          <View style={localStyles.optionsHeader}>
            <Text style={styles.body}>Seçenekler</Text>
            <TouchableOpacity onPress={addOption} style={localStyles.addOptionButton}>
              <Plus size={16} color={colors.primary} />
              <Text style={[styles.caption, { color: colors.primary, fontWeight: '600' }]}>
                Seçenek Ekle
              </Text>
            </TouchableOpacity>
          </View>
          
          {poll.options.map((option, index) => (
            <View key={index} style={localStyles.optionRow}>
              <TextInput
                style={[localStyles.optionInput, { backgroundColor: colors.backgroundSecondary, color: colors.text, borderColor: colors.border }]}
                placeholder={`Seçenek ${index + 1}`}
                placeholderTextColor={colors.textSecondary}
                value={option}
                onChangeText={(text) => {
                  const newOptions = [...poll.options];
                  newOptions[index] = text;
                  setPoll({ ...poll, options: newOptions });
                }}
              />
              {poll.options.length > 2 && (
                <TouchableOpacity
                  onPress={() => removeOption(index)}
                  style={localStyles.removeButton}
                >
                  <X size={20} color={colors.error} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          
          <TouchableOpacity
            style={[styles.button, { marginTop: Spacing.xl }]}
            onPress={handleCreate}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Anketi Oluştur</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: Spacing.base,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  optionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  optionInput: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    fontSize: 16,
  },
  removeButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatePollScreen;
