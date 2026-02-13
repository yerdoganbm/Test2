import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Star, ThumbsUp } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Avatar } from '../components/StitchComponents';

const MVPVotingScreen = ({ route }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const users = useStore((state) => state.users);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const [selectedMVP, setSelectedMVP] = useState(null);
  const [votes, setVotes] = useState({});
  
  const categories = [
    { id: 'mvp', title: 'Maçın Adamı', icon: Trophy, color: colors.mvp },
    { id: 'topScorer', title: 'En Golcü', icon: Star, color: colors.topScorer },
    { id: 'bestDefender', title: 'En İyi Savunma', icon: ThumbsUp, color: colors.bestDefender },
  ];
  
  const [activeCategory, setActiveCategory] = useState('mvp');
  
  const handleVote = (userId) => {
    setVotes({ ...votes, [activeCategory]: userId });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
  
  const handleSubmit = () => {
    if (Object.keys(votes).length < 3) {
      Alert.alert('Eksik', 'Lütfen tüm kategorilerde oy verin');
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Başarılı', 'Oylarınız kaydedildi!');
  };
  
  const renderPlayer = ({ item: user }) => {
    const isSelected = votes[activeCategory] === user.id;
    const category = categories.find(c => c.id === activeCategory);
    
    return (
      <TouchableOpacity
        style={[
          localStyles.playerCard,
          {
            backgroundColor: isSelected ? colors.accentLight : colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
            ...Shadows.small,
          },
        ]}
        onPress={() => handleVote(user.id)}
        activeOpacity={0.7}
      >
        <Avatar name={user.nickname} size={48} color={colors.primary} bgColor={colors.accentLight} />
        <View style={localStyles.playerInfo}>
          <Text style={[styles.body, { fontWeight: '600' }]}>{user.nickname}</Text>
          <Text style={styles.caption}>{user.preferredPositions.join(', ')}</Text>
        </View>
        {isSelected && (
          <View style={[localStyles.checkBadge, { backgroundColor: colors.primary }]}>
            <ThumbsUp size={16} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[localStyles.header, { backgroundColor: colors.primary }]}>
        <Trophy size={32} color="#FFFFFF" />
        <View style={{ flex: 1, marginLeft: Spacing.md }}>
          <Text style={[styles.heading2, { color: '#FFFFFF' }]}>Maç Sonu Oylama</Text>
          <Text style={[styles.caption, { color: '#FFFFFF', opacity: 0.9 }]}>
            En iyi oyuncuları seç
          </Text>
        </View>
      </View>
      
      {/* Category Tabs */}
      <View style={localStyles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              localStyles.categoryTab,
              {
                backgroundColor: activeCategory === cat.id ? cat.color : colors.card,
                ...Shadows.small,
              },
            ]}
            onPress={() => setActiveCategory(cat.id)}
            activeOpacity={0.8}
          >
            <cat.icon size={20} color={activeCategory === cat.id ? '#FFFFFF' : colors.textSecondary} />
            <Text
              style={[
                localStyles.categoryText,
                { color: activeCategory === cat.id ? '#FFFFFF' : colors.textSecondary },
              ]}
            >
              {cat.title}
            </Text>
            {votes[cat.id] && activeCategory !== cat.id && (
              <View style={localStyles.votedDot} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Players List */}
      <FlatList
        data={users.filter(u => u.role === 'PLAYER')}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={localStyles.list}
      />
      
      {/* Submit Button */}
      <View style={localStyles.footer}>
        <TouchableOpacity
          style={[styles.button, { width: '100%' }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Oyları Gönder ({Object.keys(votes).length}/3)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  categories: {
    flexDirection: 'row',
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
    position: 'relative',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  votedDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  list: {
    padding: Spacing.base,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
    borderWidth: 2,
  },
  playerInfo: {
    flex: 1,
  },
  checkBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});

export default MVPVotingScreen;
