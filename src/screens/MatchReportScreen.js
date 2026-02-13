import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Trophy, Target, Shield, Users, TrendingUp } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Avatar, ProgressBar } from '../components/StitchComponents';

const MatchReportScreen = ({ route }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const matchReport = {
    score: { team1: 7, team2: 5 },
    mvp: { name: 'Oğuz B.', goals: 3, assists: 2 },
    topScorer: { name: 'Can D.', goals: 4 },
    attendance: 14,
    totalGoals: 12,
    avgAge: 28,
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={localStyles.container}>
        {/* Score Card */}
        <View style={[localStyles.scoreCard, { backgroundColor: colors.primary, ...Shadows.large }]}>
          <Text style={localStyles.scoreTitle}>Maç Sonucu</Text>
          <View style={localStyles.scoreDisplay}>
            <View style={localStyles.teamScore}>
              <Text style={localStyles.teamName}>Takım 1</Text>
              <Text style={localStyles.score}>{matchReport.score.team1}</Text>
            </View>
            <Text style={localStyles.scoreDivider}>-</Text>
            <View style={localStyles.teamScore}>
              <Text style={localStyles.teamName}>Takım 2</Text>
              <Text style={localStyles.score}>{matchReport.score.team2}</Text>
            </View>
          </View>
        </View>
        
        {/* MVP Card */}
        <View style={[localStyles.card, { backgroundColor: colors.card, ...Shadows.medium }]}>
          <View style={localStyles.cardHeader}>
            <Trophy size={24} color={colors.mvp} />
            <Text style={[styles.heading3, { marginLeft: Spacing.sm }]}>Maçın Adamı</Text>
          </View>
          <View style={localStyles.mvpContent}>
            <Avatar name={matchReport.mvp.name} size={64} color={colors.mvp} bgColor={colors.warningLight} />
            <View style={{ flex: 1, marginLeft: Spacing.base }}>
              <Text style={[styles.heading2, { fontSize: 20 }]}>{matchReport.mvp.name}</Text>
              <View style={localStyles.mvpStats}>
                <Text style={styles.caption}>⚽ {matchReport.mvp.goals} Gol</Text>
                <Text style={styles.caption}>🎯 {matchReport.mvp.assists} Asist</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Stats Grid */}
        <View style={localStyles.statsGrid}>
          <View style={[localStyles.statCard, { backgroundColor: colors.card }]}>
            <Target size={28} color={colors.primary} />
            <Text style={[styles.heading2, { marginTop: Spacing.xs }]}>{matchReport.totalGoals}</Text>
            <Text style={styles.caption}>Toplam Gol</Text>
          </View>
          <View style={[localStyles.statCard, { backgroundColor: colors.card }]}>
            <Users size={28} color={colors.info} />
            <Text style={[styles.heading2, { marginTop: Spacing.xs }]}>{matchReport.attendance}</Text>
            <Text style={styles.caption}>Oyuncu</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: Spacing.base,
  },
  scoreCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.base,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: Spacing.lg,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
  },
  teamScore: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  score: {
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scoreDivider: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  card: {
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.base,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  mvpContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mvpStats: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    ...Shadows.small,
  },
});

export default MatchReportScreen;
