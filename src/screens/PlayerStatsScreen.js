import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Target, TrendingUp, Shield, Award, Calendar } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Avatar, ProgressBar } from '../components/StitchComponents';

const PlayerStatsScreen = ({ route }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const getUserById = useStore((state) => state.getUserById);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const userId = route?.params?.userId || '7';
  const user = getUserById(userId);
  
  const playerStats = {
    goals: 15,
    assists: 8,
    matches: 24,
    motm: 3,
    winRate: 65,
    avgRating: user?.skillRating || 8.5,
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={localStyles.container}>
        {/* Profile Header */}
        <View style={[localStyles.profileCard, { backgroundColor: colors.primary, ...Shadows.large }]}>
          <Avatar name={user?.nickname} size={80} color="#FFFFFF" bgColor="rgba(255,255,255,0.2)" />
          <Text style={localStyles.profileName}>{user?.nickname}</Text>
          <Text style={localStyles.profilePosition}>
            {user?.preferredPositions?.join(' • ')}
          </Text>
          <View style={localStyles.reliabilityBadge}>
            <Shield size={16} color="#FFFFFF" />
            <Text style={localStyles.reliabilityText}>
              {user?.reliabilityScore}% Güvenilir
            </Text>
          </View>
        </View>
        
        {/* Stats Grid */}
        <View style={localStyles.statsGrid}>
          <View style={[localStyles.statCard, { backgroundColor: colors.card, ...Shadows.small }]}>
            <Target size={32} color={colors.error} />
            <Text style={[styles.heading1, { marginTop: Spacing.xs }]}>{playerStats.goals}</Text>
            <Text style={styles.caption}>Gol</Text>
          </View>
          <View style={[localStyles.statCard, { backgroundColor: colors.card, ...Shadows.small }]}>
            <TrendingUp size={32} color={colors.info} />
            <Text style={[styles.heading1, { marginTop: Spacing.xs }]}>{playerStats.assists}</Text>
            <Text style={styles.caption}>Asist</Text>
          </View>
          <View style={[localStyles.statCard, { backgroundColor: colors.card, ...Shadows.small }]}>
            <Calendar size={32} color={colors.success} />
            <Text style={[styles.heading1, { marginTop: Spacing.xs }]}>{playerStats.matches}</Text>
            <Text style={styles.caption}>Maç</Text>
          </View>
          <View style={[localStyles.statCard, { backgroundColor: colors.card, ...Shadows.small }]}>
            <Award size={32} color={colors.mvp} />
            <Text style={[styles.heading1, { marginTop: Spacing.xs }]}>{playerStats.motm}</Text>
            <Text style={styles.caption}>MVP</Text>
          </View>
        </View>
        
        {/* Performance Bars */}
        <View style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.medium }]}>
          <Text style={[styles.heading3, { marginBottom: Spacing.base }]}>Performans</Text>
          
          <View style={localStyles.performanceItem}>
            <Text style={styles.body}>Kazanma Oranı</Text>
            <Text style={[styles.body, { fontWeight: '700', color: colors.primary }]}>
              %{playerStats.winRate}
            </Text>
          </View>
          <ProgressBar progress={playerStats.winRate} color={colors.success} bgColor={colors.borderLight} />
          
          <View style={[localStyles.performanceItem, { marginTop: Spacing.base }]}>
            <Text style={styles.body}>Ortalama Rating</Text>
            <Text style={[styles.body, { fontWeight: '700', color: colors.primary }]}>
              {playerStats.avgRating}/10
            </Text>
          </View>
          <ProgressBar progress={playerStats.avgRating * 10} color={colors.info} bgColor={colors.borderLight} />
        </View>
        
        {/* Recent Matches */}
        <View style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.medium }]}>
          <Text style={[styles.heading3, { marginBottom: Spacing.base }]}>Son Maçlar</Text>
          {[1, 2, 3].map((i) => (
            <View key={i} style={[localStyles.matchItem, { borderBottomColor: colors.border }]}>
              <Text style={styles.body}>16.02.2026</Text>
              <View style={localStyles.matchStats}>
                <Text style={[styles.caption, { color: colors.error }]}>⚽ 2 gol</Text>
                <Text style={[styles.caption, { color: colors.info }]}>🎯 1 asist</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: Spacing.base,
  },
  profileCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: Spacing.base,
  },
  profilePosition: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  reliabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.sm,
    gap: 6,
  },
  reliabilityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
  },
  card: {
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  matchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  matchStats: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mvpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.base,
  },
  mvpStats: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
});

export default PlayerStatsScreen;
