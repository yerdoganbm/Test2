import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, getColor, Spacing, BorderRadius, Shadows } from '../constants/theme';

const MatchesScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const matches = useStore((state) => state.matches);
  const getFieldById = useStore((state) => state.getFieldById);
  const getMatchAttendance = useStore((state) => state.getMatchAttendance);
  
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);
  
  const styles = getStyles(isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  // Filter matches
  const now = new Date();
  const upcomingMatches = matches
    .filter((m) => new Date(m.startsAt) > now)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
  const pastMatches = matches
    .filter((m) => new Date(m.startsAt) <= now)
    .sort((a, b) => new Date(b.startsAt) - new Date(a.startsAt));
  
  const displayMatches = activeTab === 'upcoming' ? upcomingMatches : pastMatches;
  
  // Generate calendar weeks
  const getWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ...
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1 + weekOffset * 7);
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      week.push(date);
    }
    return week;
  };
  
  const weekDates = getWeekDates(selectedWeek);
  const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };
  
  const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const renderMatchCard = ({ item: match }) => {
    const field = getFieldById(match.fieldId);
    const attendance = getMatchAttendance(match.id);
    const yesCount = attendance.filter((a) => a.status === 'YES').length;
    const isPast = match.status === 'COMPLETED';
    
    return (
      <TouchableOpacity
        style={[
          localStyles.matchCard,
          {
            backgroundColor: colors.card,
            borderLeftColor: isPast ? colors.textSecondary : colors.primary,
            borderLeftWidth: 4,
            ...Shadows.medium,
          },
        ]}
        activeOpacity={0.8}
      >
        {/* Date Badge */}
        <View style={[localStyles.dateBadge, { backgroundColor: isPast ? colors.backgroundSecondary : colors.accentLight }]}>
          <Text style={[localStyles.dateBadgeDay, { color: isPast ? colors.textSecondary : colors.primary }]}>
            {new Date(match.startsAt).getDate()}
          </Text>
          <Text style={[localStyles.dateBadgeMonth, { color: isPast ? colors.textSecondary : colors.primary }]}>
            {new Date(match.startsAt).toLocaleDateString('tr-TR', { month: 'short' }).toUpperCase()}
          </Text>
        </View>
        
        <View style={localStyles.matchCardContent}>
          <View style={localStyles.matchCardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.heading3, { fontSize: 18 }]}>{field?.name}</Text>
              <Text style={[styles.caption, { marginTop: 4 }]}>
                {formatTime(match.startsAt)} • {yesCount} oyuncu
              </Text>
            </View>
            {isPast && match.score && (
              <View style={[localStyles.scoreContainer, { backgroundColor: colors.accentLight }]}>
                <Text style={[localStyles.scoreText, { color: colors.primary }]}>
                  {match.score.team1} - {match.score.team2}
                </Text>
              </View>
            )}
            {!isPast && (
              <View
                style={[
                  localStyles.statusBadge,
                  {
                    backgroundColor:
                      match.status === 'OPEN' ? colors.successLight : colors.borderLight,
                  },
                ]}
              >
                <Text
                  style={[
                    localStyles.statusBadgeText,
                    { color: match.status === 'OPEN' ? colors.success : colors.textSecondary },
                  ]}
                >
                  {match.status === 'OPEN' ? '✓ Açık' : '🔒 Kilitli'}
                </Text>
              </View>
            )}
          </View>
          
          <View style={localStyles.matchCardInfo}>
            <View style={localStyles.matchCardInfoItem}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text style={[styles.caption, { marginLeft: 6 }]}>
                {field?.address?.substring(0, 40)}...
              </Text>
            </View>
            
            <View style={localStyles.matchCardInfoRow}>
              <View style={localStyles.matchCardInfoItem}>
                <Users size={16} color={colors.primary} />
                <Text style={[styles.caption, { marginLeft: 6, color: colors.primary }]}>
                  {yesCount} Oyuncu
                </Text>
              </View>
              
              <View style={localStyles.matchCardInfoItem}>
                <Clock size={16} color={colors.textSecondary} />
                <Text style={[styles.caption, { marginLeft: 6 }]}>
                  ₺{match.costPerPerson.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          
          {isPast && (
            <TouchableOpacity
              style={[
                localStyles.reportButton,
                { backgroundColor: colors.backgroundSecondary, borderColor: colors.border },
              ]}
              activeOpacity={0.7}
            >
              <FileText size={18} color={colors.primary} />
              <Text style={[localStyles.reportButtonText, { color: colors.primary }]}>
                Maç Raporu
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Calendar Header */}
      <View style={[localStyles.calendarContainer, { backgroundColor: colors.card }]}>
        <View style={localStyles.calendarHeader}>
          <TouchableOpacity
            style={localStyles.calendarNavButton}
            onPress={() => setSelectedWeek(selectedWeek - 1)}
          >
            <ChevronLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <Text style={[styles.heading3, { fontSize: 16 }]}>
            {weekDates[0].toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
          </Text>
          
          <TouchableOpacity
            style={localStyles.calendarNavButton}
            onPress={() => setSelectedWeek(selectedWeek + 1)}
          >
            <ChevronRight size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={localStyles.calendarDays}
        >
          {weekDates.map((date, index) => {
            const isToday =
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth();
            const hasMatch = matches.some((m) => {
              const matchDate = new Date(m.startsAt);
              return (
                matchDate.getDate() === date.getDate() &&
                matchDate.getMonth() === date.getMonth()
              );
            });
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  localStyles.calendarDay,
                  {
                    backgroundColor: isToday ? colors.primary : 'transparent',
                    borderColor: colors.border,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    localStyles.calendarDayName,
                    { color: isToday ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {dayNames[index]}
                </Text>
                <Text
                  style={[
                    localStyles.calendarDayNumber,
                    { color: isToday ? '#FFFFFF' : colors.text },
                  ]}
                >
                  {date.getDate()}
                </Text>
                {hasMatch && !isToday && (
                  <View
                    style={[
                      localStyles.calendarDayDot,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      
      {/* Tab Selector */}
      <View style={[localStyles.tabContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[
            localStyles.tab,
            {
              backgroundColor: activeTab === 'upcoming' ? colors.primary : 'transparent',
              borderBottomColor: colors.primary,
            },
          ]}
          onPress={() => setActiveTab('upcoming')}
          activeOpacity={0.8}
        >
          <Calendar
            size={20}
            color={activeTab === 'upcoming' ? '#FFFFFF' : colors.textSecondary}
          />
          <Text
            style={[
              localStyles.tabText,
              { color: activeTab === 'upcoming' ? '#FFFFFF' : colors.textSecondary },
            ]}
          >
            Gelecek ({upcomingMatches.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            localStyles.tab,
            {
              backgroundColor: activeTab === 'past' ? colors.primary : 'transparent',
              borderBottomColor: colors.primary,
            },
          ]}
          onPress={() => setActiveTab('past')}
          activeOpacity={0.8}
        >
          <TrendingUp
            size={20}
            color={activeTab === 'past' ? '#FFFFFF' : colors.textSecondary}
          />
          <Text
            style={[
              localStyles.tabText,
              { color: activeTab === 'past' ? '#FFFFFF' : colors.textSecondary },
            ]}
          >
            Geçmiş ({pastMatches.length})
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Matches List */}
      <FlatList
        data={displayMatches}
        renderItem={renderMatchCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={localStyles.matchesList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          <View style={localStyles.emptyContainer}>
            <Calendar size={48} color={colors.textSecondary} />
            <Text style={[styles.bodySecondary, { marginTop: Spacing.base }]}>
              {activeTab === 'upcoming' ? 'Yaklaşan maç yok' : 'Geçmiş maç yok'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  calendarContainer: {
    paddingVertical: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
  },
  calendarNavButton: {
    padding: Spacing.xs,
  },
  calendarDays: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  calendarDay: {
    width: 50,
    height: 70,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  calendarDayName: {
    fontSize: 12,
    fontWeight: '500',
  },
  calendarDayNumber: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  calendarDayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: Spacing.base,
    gap: Spacing.sm,
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
  matchesList: {
    padding: Spacing.base,
    paddingBottom: Spacing['4xl'],
  },
  matchCard: {
    flexDirection: 'row',
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    gap: Spacing.md,
  },
  dateBadge: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBadgeDay: {
    fontSize: 24,
    fontWeight: '700',
  },
  dateBadgeMonth: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  matchCardContent: {
    flex: 1,
  },
  matchCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  scoreContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  matchCardInfo: {
    gap: Spacing.sm,
  },
  matchCardInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchCardInfoRow: {
    flexDirection: 'row',
    gap: Spacing.base,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  reportButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['4xl'],
  },
});

export default MatchesScreen;
