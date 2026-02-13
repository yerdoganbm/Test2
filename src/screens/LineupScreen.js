import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Users,
  Lock,
  Unlock,
  Shuffle,
  ThumbsUp,
  Trophy,
  Shield,
} from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, getColor, Spacing, BorderRadius, Shadows } from '../constants/theme';

const { width } = Dimensions.get('window');
const FIELD_WIDTH = width - Spacing.base * 2;
const FIELD_HEIGHT = FIELD_WIDTH * 1.4;

const LineupScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);
  const getNextMatch = useStore((state) => state.getNextMatch);
  const lineupDrafts = useStore((state) => state.lineupDrafts);
  const getUserById = useStore((state) => state.getUserById);
  const lockLineupDraft = useStore((state) => state.lockLineupDraft);
  const voteLineupDraft = useStore((state) => state.voteLineupDraft);
  
  const [selectedDraft, setSelectedDraft] = useState(0);
  
  const styles = getStyles(isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  const nextMatch = getNextMatch();
  const matchDrafts = lineupDrafts.filter((d) => d.matchId === nextMatch?.id);
  const currentDraft = matchDrafts[selectedDraft];
  
  const isAdmin = currentUser.role === 'ADMIN';
  
  // Position mappings for field layout
  const getPositionCoordinates = (position, teamIndex, playerIndex, totalPlayers) => {
    const isTeam1 = teamIndex === 0;
    const baseY = isTeam1 ? 0.1 : 0.6;
    
    switch (position) {
      case 'GK':
        return { x: 0.5, y: isTeam1 ? 0.05 : 0.95 };
      case 'DEF':
        const defCount = currentDraft?.layout[isTeam1 ? 'team1' : 'team2'].filter(
          (p) => p.position === 'DEF'
        ).length;
        const defIndex = currentDraft?.layout[isTeam1 ? 'team1' : 'team2']
          .filter((p) => p.position === 'DEF')
          .findIndex((p) => p.userId === currentDraft.layout[isTeam1 ? 'team1' : 'team2'][playerIndex].userId);
        return {
          x: 0.2 + (defIndex / Math.max(defCount - 1, 1)) * 0.6,
          y: isTeam1 ? 0.2 : 0.8,
        };
      case 'MID':
        const midCount = currentDraft?.layout[isTeam1 ? 'team1' : 'team2'].filter(
          (p) => p.position === 'MID'
        ).length;
        const midIndex = currentDraft?.layout[isTeam1 ? 'team1' : 'team2']
          .filter((p) => p.position === 'MID')
          .findIndex((p) => p.userId === currentDraft.layout[isTeam1 ? 'team1' : 'team2'][playerIndex].userId);
        return {
          x: 0.2 + (midIndex / Math.max(midCount - 1, 1)) * 0.6,
          y: isTeam1 ? 0.35 : 0.65,
        };
      case 'FW':
        const fwCount = currentDraft?.layout[isTeam1 ? 'team1' : 'team2'].filter(
          (p) => p.position === 'FW'
        ).length;
        const fwIndex = currentDraft?.layout[isTeam1 ? 'team1' : 'team2']
          .filter((p) => p.position === 'FW')
          .findIndex((p) => p.userId === currentDraft.layout[isTeam1 ? 'team1' : 'team2'][playerIndex].userId);
        return {
          x: 0.25 + (fwIndex / Math.max(fwCount - 1, 1)) * 0.5,
          y: isTeam1 ? 0.5 : 0.5,
        };
      default:
        return { x: 0.5, y: baseY + playerIndex * 0.1 };
    }
  };
  
  const handleLockDraft = () => {
    if (currentDraft && isAdmin) {
      lockLineupDraft(currentDraft.id);
    }
  };
  
  const handleVoteDraft = () => {
    if (currentDraft) {
      voteLineupDraft(currentDraft.id);
    }
  };
  
  const renderPlayer = (player, teamIndex, playerIndex) => {
    const user = getUserById(player.userId);
    if (!user) return null;
    
    const coords = getPositionCoordinates(player.position, teamIndex, playerIndex, 0);
    const left = coords.x * FIELD_WIDTH - 28;
    const top = coords.y * FIELD_HEIGHT - 28;
    
    return (
      <View
        key={player.userId}
        style={[
          localStyles.playerCircle,
          {
            left,
            top,
            backgroundColor: teamIndex === 0 ? colors.primary : colors.error,
            ...Shadows.large,
          },
        ]}
      >
        <Text style={localStyles.playerInitials}>
          {user.nickname.substring(0, 2).toUpperCase()}
        </Text>
        <View style={localStyles.playerNameBadge}>
          <Text style={localStyles.playerName}>{user.nickname.split(' ')[0]}</Text>
        </View>
        <View
          style={[
            localStyles.playerRating,
            { backgroundColor: teamIndex === 0 ? colors.primaryDark : '#991B1B' },
          ]}
        >
          <Text style={localStyles.playerRatingText}>⭐{user.skillRating.toFixed(1)}</Text>
        </View>
      </View>
    );
  };
  
  if (!nextMatch || matchDrafts.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={localStyles.emptyContainer}>
          <Users size={64} color={colors.textSecondary} />
          <Text style={[styles.heading3, { marginTop: Spacing.base, color: colors.textSecondary }]}>
            Kadro Taslağı Yok
          </Text>
          <Text style={[styles.caption, { marginTop: Spacing.sm, textAlign: 'center' }]}>
            Admin panelinden kadro taslağı oluşturulabilir
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={localStyles.container}
        contentContainerStyle={localStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Draft Selector */}
        <View style={localStyles.draftSelector}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={localStyles.draftTabs}
          >
            {matchDrafts.map((draft, index) => (
              <TouchableOpacity
                key={draft.id}
                style={[
                  localStyles.draftTab,
                  {
                    backgroundColor:
                      selectedDraft === index ? colors.primary : colors.card,
                    borderColor: selectedDraft === index ? colors.primary : colors.border,
                    ...Shadows.small,
                  },
                ]}
                onPress={() => setSelectedDraft(index)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    localStyles.draftTabText,
                    { color: selectedDraft === index ? '#FFFFFF' : colors.text },
                  ]}
                >
                  {draft.name}
                </Text>
                <View
                  style={[
                    localStyles.draftTabBadge,
                    {
                      backgroundColor:
                        selectedDraft === index ? 'rgba(255,255,255,0.2)' : colors.accentLight,
                    },
                  ]}
                >
                  <ThumbsUp
                    size={12}
                    color={selectedDraft === index ? '#FFFFFF' : colors.primary}
                  />
                  <Text
                    style={[
                      localStyles.draftTabBadgeText,
                      { color: selectedDraft === index ? '#FFFFFF' : colors.primary },
                    ]}
                  >
                    {draft.votes}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Football Field */}
        <View
          style={[
            localStyles.fieldContainer,
            {
              width: FIELD_WIDTH,
              height: FIELD_HEIGHT,
              backgroundColor: colors.fieldGreen,
              ...Shadows.large,
            },
          ]}
        >
          {/* Field Lines */}
          <View style={localStyles.fieldLines}>
            {/* Center Line */}
            <View
              style={[
                localStyles.centerLine,
                { backgroundColor: 'rgba(255, 255, 255, 0.4)' },
              ]}
            />
            {/* Center Circle */}
            <View
              style={[
                localStyles.centerCircle,
                { borderColor: 'rgba(255, 255, 255, 0.4)' },
              ]}
            />
            {/* Penalty Areas */}
            <View
              style={[
                localStyles.penaltyArea,
                { top: 0, borderColor: 'rgba(255, 255, 255, 0.4)' },
              ]}
            />
            <View
              style={[
                localStyles.penaltyArea,
                { bottom: 0, borderColor: 'rgba(255, 255, 255, 0.4)' },
              ]}
            />
            {/* Goal Areas */}
            <View
              style={[
                localStyles.goalArea,
                { top: 0, borderColor: 'rgba(255, 255, 255, 0.4)' },
              ]}
            />
            <View
              style={[
                localStyles.goalArea,
                { bottom: 0, borderColor: 'rgba(255, 255, 255, 0.4)' },
              ]}
            />
          </View>
          
          {/* Team Labels */}
          <View style={[localStyles.teamLabel, { top: 10 }]}>
            <Trophy size={16} color="#FFFFFF" />
            <Text style={localStyles.teamLabelText}>Takım 1</Text>
          </View>
          <View style={[localStyles.teamLabel, { bottom: 10 }]}>
            <Shield size={16} color="#FFFFFF" />
            <Text style={localStyles.teamLabelText}>Takım 2</Text>
          </View>
          
          {/* Players */}
          {currentDraft?.layout.team1.map((player, index) =>
            renderPlayer(player, 0, index)
          )}
          {currentDraft?.layout.team2.map((player, index) =>
            renderPlayer(player, 1, index)
          )}
        </View>
        
        {/* Action Buttons */}
        {isAdmin && (
          <View style={localStyles.adminActions}>
            <TouchableOpacity
              style={[
                localStyles.adminButton,
                {
                  backgroundColor: currentDraft?.isLocked ? colors.error : colors.primary,
                  ...Shadows.medium,
                },
              ]}
              onPress={handleLockDraft}
              activeOpacity={0.8}
            >
              {currentDraft?.isLocked ? (
                <Lock size={20} color="#FFFFFF" />
              ) : (
                <Unlock size={20} color="#FFFFFF" />
              )}
              <Text style={localStyles.adminButtonText}>
                {currentDraft?.isLocked ? 'Kadro Kilitli' : 'Kadroyu Kilitle'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                localStyles.adminButton,
                {
                  backgroundColor: colors.info,
                  ...Shadows.medium,
                },
              ]}
              activeOpacity={0.8}
            >
              <Shuffle size={20} color="#FFFFFF" />
              <Text style={localStyles.adminButtonText}>Otomatik Dengele</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Vote Button */}
        {!isAdmin && (
          <TouchableOpacity
            style={[
              localStyles.voteButton,
              {
                backgroundColor: colors.primary,
                ...Shadows.medium,
              },
            ]}
            onPress={handleVoteDraft}
            activeOpacity={0.8}
          >
            <ThumbsUp size={20} color="#FFFFFF" />
            <Text style={localStyles.voteButtonText}>Bu Taslağa Oy Ver</Text>
          </TouchableOpacity>
        )}
        
        {/* Team Stats */}
        <View style={localStyles.statsContainer}>
          <View
            style={[
              localStyles.statCard,
              { backgroundColor: colors.card, borderLeftColor: colors.primary, ...Shadows.medium },
            ]}
          >
            <Text style={[styles.heading3, { fontSize: 16, color: colors.primary }]}>
              Takım 1
            </Text>
            <Text style={[styles.caption, { marginTop: 4 }]}>
              {currentDraft?.layout.team1.length} Oyuncu
            </Text>
            <Text style={[styles.heading2, { marginTop: Spacing.sm }]}>
              {(
                currentDraft?.layout.team1.reduce((sum, p) => {
                  const user = getUserById(p.userId);
                  return sum + (user?.skillRating || 0);
                }, 0) / (currentDraft?.layout.team1.length || 1)
              ).toFixed(1)}
            </Text>
            <Text style={[styles.caption]}>Ortalama Seviye</Text>
          </View>
          
          <View
            style={[
              localStyles.statCard,
              { backgroundColor: colors.card, borderLeftColor: colors.error, ...Shadows.medium },
            ]}
          >
            <Text style={[styles.heading3, { fontSize: 16, color: colors.error }]}>
              Takım 2
            </Text>
            <Text style={[styles.caption, { marginTop: 4 }]}>
              {currentDraft?.layout.team2.length} Oyuncu
            </Text>
            <Text style={[styles.heading2, { marginTop: Spacing.sm }]}>
              {(
                currentDraft?.layout.team2.reduce((sum, p) => {
                  const user = getUserById(p.userId);
                  return sum + (user?.skillRating || 0);
                }, 0) / (currentDraft?.layout.team2.length || 1)
              ).toFixed(1)}
            </Text>
            <Text style={[styles.caption]}>Ortalama Seviye</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.base,
    paddingBottom: Spacing['4xl'],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['2xl'],
  },
  draftSelector: {
    marginBottom: Spacing.base,
  },
  draftTabs: {
    gap: Spacing.sm,
  },
  draftTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    gap: Spacing.sm,
  },
  draftTabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  draftTabBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  draftTabBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  fieldContainer: {
    borderRadius: BorderRadius.base,
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  fieldLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    marginLeft: -40,
    marginTop: -40,
  },
  penaltyArea: {
    position: 'absolute',
    left: '25%',
    width: '50%',
    height: '15%',
    borderWidth: 2,
    borderTopWidth: 0,
  },
  goalArea: {
    position: 'absolute',
    left: '35%',
    width: '30%',
    height: '8%',
    borderWidth: 2,
    borderTopWidth: 0,
  },
  teamLabel: {
    position: 'absolute',
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    gap: 6,
  },
  teamLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  playerCircle: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  playerInitials: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  playerNameBadge: {
    position: 'absolute',
    bottom: -22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
    ...Shadows.medium,
  },
  playerName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  playerRating: {
    position: 'absolute',
    top: -10,
    right: -10,
    minWidth: 32,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...Shadows.small,
  },
  playerRatingText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  adminActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  adminButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  adminButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    gap: Spacing.xs,
  },
  voteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    borderLeftWidth: 4,
  },
});

export default LineupScreen;
