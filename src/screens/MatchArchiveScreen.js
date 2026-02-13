import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Archive, Calendar, Filter } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, Spacing, BorderRadius, Shadows } from '../constants/theme';

const MatchArchiveScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const matches = useStore((state) => state.matches);
  const getFieldById = useStore((state) => state.getFieldById);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  const styles = getStyles(isDarkMode);
  
  const [filter, setFilter] = useState('all');
  const pastMatches = matches.filter(m => m.status === 'COMPLETED');
  
  const renderMatch = ({ item: match }) => {
    const field = getFieldById(match.fieldId);
    
    return (
      <TouchableOpacity
        style={[localStyles.matchCard, { backgroundColor: colors.card, ...Shadows.medium }]}
        activeOpacity={0.8}
      >
        <View style={localStyles.matchDate}>
          <Text style={[styles.caption]}>
            {new Date(match.startsAt).toLocaleDateString('tr-TR')}
          </Text>
        </View>
        <View style={localStyles.matchContent}>
          <Text style={[styles.body, { fontWeight: '600' }]}>{field?.name}</Text>
          {match.score && (
            <Text style={[styles.heading2, { color: colors.primary, marginTop: Spacing.xs }]}>
              {match.score.team1} - {match.score.team2}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={localStyles.header}>
        <Archive size={24} color={colors.primary} />
        <Text style={[styles.heading2, { marginLeft: Spacing.md }]}>Maç Arşivi</Text>
        <TouchableOpacity style={localStyles.filterButton}>
          <Filter size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={pastMatches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id}
        contentContainerStyle={localStyles.list}
      />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  filterButton: {
    marginLeft: 'auto',
    padding: Spacing.xs,
  },
  list: {
    padding: Spacing.base,
  },
  matchCard: {
    padding: Spacing.base,
    borderRadius: BorderRadius.base,
    marginBottom: Spacing.sm,
  },
  matchDate: {
    marginBottom: Spacing.xs,
  },
  matchContent: {
    alignItems: 'center',
  },
});

export default MatchArchiveScreen;
