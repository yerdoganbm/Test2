import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Target, Shield, TrendingUp, Award } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, getColor, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Avatar, StatusChip } from '../components/StitchComponents';

const LeaderboardScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const users = useStore((state) => state.users);
  const [activeTab, setActiveTab] = useState('goals'); // 'goals', 'assists', 'reliability'
  
  const styles = getStyles(isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  // Mock statistics - would come from backend
  const getPlayerStats = (userId) => {
    const mockStats = {
      goals: Math.floor(Math.random() * 20),
      assists: Math.floor(Math.random() * 15),
      motm: Math.floor(Math.random() * 5), // Man of the match
      matches: Math.floor(Math.random() * 20) + 10,
    };
    return mockStats;
  };
  
  const sortedPlayers = [...users]
    .map((user) => ({
      ...user,
      stats: getPlayerStats(user.id),
    }))
    .sort((a, b) => {
      switch (activeTab) {
        case 'goals':
          return b.stats.goals - a.stats.goals;
        case 'assists':
          return b.stats.assists - a.stats.assists;
        case 'reliability':
          return b.reliabilityScore - a.reliabilityScore;
        default:
          return 0;
      }
    });
  
  const getMedalColor = (rank) => {
    switch (rank) {
      case 1:
        return colors.mvp; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return colors.textSecondary;
    }
  };
  
  const renderPlayer = (player, index) => {
    const rank = index + 1;
    const stat = 
      activeTab === 'goals' ? player.stats.goals :
      activeTab === 'assists' ? player.stats.assists :
      player.reliabilityScore;
    
    return (
      <View
        key={player.id}
        style={[
          localStyles.playerCard,
          {
            backgroundColor: rank <= 3 ? colors.cardSecondary : colors.card,
            ...Shadows.small,
          },
        ]}
      >
        <View style={localStyles.rankBadge}>
          {rank <= 3 ? (
            <Trophy size={24} color={getMedalColor(rank)} strokeWidth={2.5} />
          ) : (
            <Text style={[localStyles.rankText, { color: colors.textSecondary }]}>
              #{rank}
            </Text>
          )}
        </View>
        
        <Avatar
          name={player.nickname}
          size={48}
          color={colors.primary}
          bgColor={colors.accentLight}
        />
        
        <View style={localStyles.playerInfo}>
          <Text style={[styles.body, { fontWeight: '600' }]}>
            {player.nickname}
          </Text>
          <Text style={styles.caption}>
            {player.stats.matches} maç
          </Text>
        </View>
        
        <View style={localStyles.statValue}>
          <Text style={[styles.heading2, { color: colors.primary }]}>
            {stat}
          </Text>
          {activeTab === 'goals' && (
            <Text style={styles.caption}>gol</Text>
          )}
          {activeTab === 'assists' && (
            <Text style={styles.caption}>asist</Text>
          )}
          {activeTab === 'reliability' && (
            <Text style={styles.caption}>puan</Text>
          )}
        </View>
        
        {rank === 1 && (
          <View style={[localStyles.crownBadge, { backgroundColor: colors.mvp }]}>
            <Award size={16} color="#FFFFFF" />
          </View>
        )}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[localStyles.header, { backgroundColor: colors.primary }]}>
        <Trophy size={32} color="#FFFFFF" />
        <Text style={[styles.heading1, { color: '#FFFFFF', marginLeft: Spacing.md }]}>
          Liderlik Tablosu
        </Text>
      </View>
      
      {/* Category Tabs */}
      <View style={[localStyles.tabs, { backgroundColor: colors.backgroundSecondary }]}>
        <TouchableOpacity
          style={[
            localStyles.tab,
            activeTab === 'goals' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('goals')}
          activeOpacity={0.8}
        >
          <Target size={20} color={activeTab === 'goals' ? '#FFFFFF' : colors.textSecondary} />
          <Text
            style={[
              localStyles.tabText,
              { color: activeTab === 'goals' ? '#FFFFFF' : colors.textSecondary },
            ]}
          >
            Goller
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            localStyles.tab,
            activeTab === 'assists' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('assists')}
          activeOpacity={0.8}
        >
          <TrendingUp size={20} color={activeTab === 'assists' ? '#FFFFFF' : colors.textSecondary} />
          <Text
            style={[
              localStyles.tabText,
              { color: activeTab === 'assists' ? '#FFFFFF' : colors.textSecondary },
            ]}
          >
            Asistler
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            localStyles.tab,
            activeTab === 'reliability' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('reliability')}
          activeOpacity={0.8}
        >
          <Shield size={20} color={activeTab === 'reliability' ? '#FFFFFF' : colors.textSecondary} />
          <Text
            style={[
              localStyles.tabText,
              { color: activeTab === 'reliability' ? '#FFFFFF' : colors.textSecondary },
            ]}
          >
            Güven
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Players List */}
      <ScrollView
        style={localStyles.container}
        contentContainerStyle={localStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {sortedPlayers.map((player, index) => renderPlayer(player, index))}
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    padding: Spacing.xs,
    gap: Spacing.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.base,
    paddingBottom: Spacing['4xl'],
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  rankBadge: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  rankText: {
    fontSize: 18,
    fontWeight: '700',
  },
  playerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  statValue: {
    alignItems: 'flex-end',
  },
  crownBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
});

export default LeaderboardScreen;
