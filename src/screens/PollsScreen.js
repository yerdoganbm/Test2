import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Vote, Plus, X, Check } from 'lucide-react-native';
import { useStore } from '../store';
import { getStyles, getColor, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { ProgressBar, StatusChip } from '../components/StitchComponents';

const PollsScreen = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const polls = useStore((state) => state.polls);
  const votePoll = useStore((state) => state.votePoll);
  const currentUser = useStore((state) => state.currentUser);
  
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPoll, setNewPoll] = useState({
    title: '',
    description: '',
    options: ['', ''],
  });
  
  const styles = getStyles(isDarkMode);
  const colors = isDarkMode ? require('../constants/theme').Colors.dark : require('../constants/theme').Colors.light;
  
  const isAdmin = currentUser.role === 'ADMIN';
  
  const handleVote = (pollId, optionId) => {
    votePoll(pollId, optionId);
    Alert.alert('Başarılı', 'Oyunuz kaydedildi!');
  };
  
  const renderPoll = (poll) => {
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
    
    return (
      <View
        key={poll.id}
        style={[
          localStyles.pollCard,
          {
            backgroundColor: colors.card,
            ...Shadows.medium,
          },
        ]}
      >
        <View style={localStyles.pollHeader}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.heading3, { fontSize: 18 }]}>{poll.title}</Text>
            {poll.description && (
              <Text style={[styles.caption, { marginTop: 4 }]}>
                {poll.description}
              </Text>
            )}
          </View>
          <StatusChip
            label={poll.status === 'ACTIVE' ? 'Aktif' : 'Kapandı'}
            status={poll.status === 'ACTIVE' ? 'success' : 'error'}
          />
        </View>
        
        <View style={localStyles.optionsList}>
          {poll.options.map((option) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  localStyles.optionCard,
                  {
                    backgroundColor: colors.backgroundSecondary,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => handleVote(poll.id, option.id)}
                activeOpacity={0.7}
              >
                <View style={localStyles.optionHeader}>
                  <Text style={[styles.body, { fontWeight: '600', flex: 1 }]}>
                    {option.text}
                  </Text>
                  <View style={localStyles.voteCount}>
                    <Vote size={16} color={colors.primary} />
                    <Text style={[styles.body, { fontWeight: '700', color: colors.primary }]}>
                      {option.votes}
                    </Text>
                  </View>
                </View>
                
                <View style={localStyles.progressContainer}>
                  <ProgressBar
                    progress={percentage}
                    color={colors.primary}
                    bgColor={colors.borderLight}
                  />
                  <Text style={[styles.caption, { marginTop: 4 }]}>
                    %{percentage.toFixed(0)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <Text style={[styles.caption, { marginTop: Spacing.md }]}>
          Toplam {totalVotes} oy • {new Date(poll.createdAt).toLocaleDateString('tr-TR')}
        </Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={localStyles.container}
        contentContainerStyle={localStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={localStyles.header}>
          <Text style={styles.heading2}>Grup Anketleri</Text>
          {isAdmin && (
            <TouchableOpacity
              style={[localStyles.createButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowCreatePoll(true)}
              activeOpacity={0.8}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Yeni</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Polls List */}
        {polls.length === 0 ? (
          <View style={localStyles.emptyState}>
            <Vote size={64} color={colors.textSecondary} />
            <Text style={[styles.heading3, { marginTop: Spacing.base, color: colors.textSecondary }]}>
              Henüz Anket Yok
            </Text>
            <Text style={[styles.caption, { marginTop: Spacing.sm }]}>
              {isAdmin ? 'İlk anketi siz oluşturun!' : 'Admin bir anket oluşturduğunda göreceksiniz'}
            </Text>
          </View>
        ) : (
          polls.map(renderPoll)
        )}
      </ScrollView>
      
      {/* Create Poll Modal - Simplified for demo */}
      <Modal
        visible={showCreatePoll}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreatePoll(false)}
      >
        <View style={localStyles.modalOverlay}>
          <View style={[localStyles.modalContent, { backgroundColor: colors.card }]}>
            <View style={localStyles.modalHeader}>
              <Text style={styles.heading2}>Yeni Anket</Text>
              <TouchableOpacity onPress={() => setShowCreatePoll(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={localStyles.modalBody}>
              <Text style={[styles.body, { marginBottom: Spacing.xs }]}>Başlık</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.backgroundSecondary }]}
                placeholder="Anket başlığı"
                placeholderTextColor={colors.textSecondary}
                value={newPoll.title}
                onChangeText={(text) => setNewPoll({ ...newPoll, title: text })}
              />
              
              <Text style={[styles.body, { marginTop: Spacing.base, marginBottom: Spacing.xs }]}>
                Açıklama (İsteğe Bağlı)
              </Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.backgroundSecondary }]}
                placeholder="Anket açıklaması"
                placeholderTextColor={colors.textSecondary}
                value={newPoll.description}
                onChangeText={(text) => setNewPoll({ ...newPoll, description: text })}
                multiline
              />
            </ScrollView>
            
            <View style={localStyles.modalFooter}>
              <TouchableOpacity
                style={[styles.buttonOutline, { flex: 1 }]}
                onPress={() => setShowCreatePoll(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonOutlineText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { flex: 1 }]}
                onPress={() => {
                  Alert.alert('Başarılı', 'Anket oluşturuldu!');
                  setShowCreatePoll(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Oluştur</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  pollCard: {
    borderRadius: BorderRadius.base,
    padding: Spacing.base,
    marginBottom: Spacing.base,
  },
  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.base,
    gap: Spacing.md,
  },
  optionsList: {
    gap: Spacing.sm,
  },
  optionCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  voteCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressContainer: {
    marginTop: Spacing.xs,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['5xl'],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalBody: {
    padding: Spacing.base,
    maxHeight: 400,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default PollsScreen;
