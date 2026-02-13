import { create } from 'zustand';

// Mock Data
const mockUsers = [
  {
    id: '1',
    phone: '+905551234567',
    nickname: 'Ahmet K.',
    avatarUrl: null,
    role: 'ADMIN',
    reliabilityScore: 100,
    preferredPositions: ['Kaleci'],
    skillRating: 8.5,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    phone: '+905551234568',
    nickname: 'Mehmet Y.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 95,
    preferredPositions: ['Defans'],
    skillRating: 7.8,
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    phone: '+905551234569',
    nickname: 'Emre S.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 88,
    preferredPositions: ['Orta Saha'],
    skillRating: 8.2,
    createdAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    phone: '+905551234570',
    nickname: 'Can D.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 92,
    preferredPositions: ['Forvet'],
    skillRating: 8.0,
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    phone: '+905551234571',
    nickname: 'Burak T.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 100,
    preferredPositions: ['Orta Saha'],
    skillRating: 7.5,
    createdAt: new Date('2024-01-19'),
  },
  {
    id: '6',
    phone: '+905551234572',
    nickname: 'Serkan A.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 75,
    preferredPositions: ['Defans'],
    skillRating: 7.2,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '7',
    phone: '+905551234573',
    nickname: 'Oğuz B.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 98,
    preferredPositions: ['Forvet'],
    skillRating: 8.8,
    createdAt: new Date('2024-01-21'),
  },
  {
    id: '8',
    phone: '+905551234574',
    nickname: 'Murat K.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 85,
    preferredPositions: ['Defans', 'Orta Saha'],
    skillRating: 7.0,
    createdAt: new Date('2024-01-22'),
  },
  {
    id: '9',
    phone: '+905551234575',
    nickname: 'Cem G.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 90,
    preferredPositions: ['Orta Saha'],
    skillRating: 7.8,
    createdAt: new Date('2024-01-23'),
  },
  {
    id: '10',
    phone: '+905551234576',
    nickname: 'Volkan S.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 95,
    preferredPositions: ['Forvet'],
    skillRating: 8.3,
    createdAt: new Date('2024-01-24'),
  },
  {
    id: '11',
    phone: '+905551234577',
    nickname: 'Kaan Y.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 82,
    preferredPositions: ['Defans'],
    skillRating: 7.3,
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '12',
    phone: '+905551234578',
    nickname: 'Deniz M.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 88,
    preferredPositions: ['Orta Saha'],
    skillRating: 7.6,
    createdAt: new Date('2024-01-26'),
  },
  {
    id: '13',
    phone: '+905551234579',
    nickname: 'Barış E.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 78,
    preferredPositions: ['Forvet'],
    skillRating: 7.4,
    createdAt: new Date('2024-01-27'),
  },
  {
    id: '14',
    phone: '+905551234580',
    nickname: 'Eren P.',
    avatarUrl: null,
    role: 'PLAYER',
    reliabilityScore: 93,
    preferredPositions: ['Defans'],
    skillRating: 7.9,
    createdAt: new Date('2024-01-28'),
  },
];

const mockFields = [
  {
    id: 'f1',
    name: 'Yeşil Park Halı Saha',
    address: 'Atatürk Mahallesi, Spor Sokak No:15, Kadıköy/İstanbul',
    latitude: 40.9875,
    longitude: 29.0275,
    pricePerHour: 800,
    amenities: {
      shower: true,
      parking: true,
      cafe: true,
      lockerRoom: true,
    },
    contactPhone: '+902164567890',
  },
  {
    id: 'f2',
    name: 'Şampiyonlar Spor Tesisi',
    address: 'Merkez Mahallesi, Futbol Caddesi No:42, Üsküdar/İstanbul',
    latitude: 41.0275,
    longitude: 29.0375,
    pricePerHour: 1000,
    amenities: {
      shower: true,
      parking: true,
      cafe: false,
      lockerRoom: true,
    },
    contactPhone: '+902165678901',
  },
  {
    id: 'f3',
    name: 'Mega Spor Kompleksi',
    address: 'Yeni Mahalle, Stadium Sokak No:8, Beşiktaş/İstanbul',
    latitude: 41.0425,
    longitude: 29.0025,
    pricePerHour: 1200,
    amenities: {
      shower: true,
      parking: true,
      cafe: true,
      lockerRoom: true,
    },
    contactPhone: '+902167890123',
  },
];

const mockMatches = [
  {
    id: 'm1',
    fieldId: 'f1',
    startsAt: new Date('2026-02-16T19:00:00'), // 3 days from now
    status: 'OPEN',
    costTotal: 800,
    costPerPerson: 57.14,
    createdAt: new Date('2026-02-10'),
  },
  {
    id: 'm2',
    fieldId: 'f2',
    startsAt: new Date('2026-02-09T20:00:00'), // Past match
    status: 'COMPLETED',
    costTotal: 1000,
    costPerPerson: 71.43,
    createdAt: new Date('2026-02-01'),
    score: { team1: 7, team2: 5 },
  },
  {
    id: 'm3',
    fieldId: 'f1',
    startsAt: new Date('2026-02-02T18:30:00'), // Past match
    status: 'COMPLETED',
    costTotal: 800,
    costPerPerson: 57.14,
    createdAt: new Date('2026-01-25'),
    score: { team1: 4, team2: 6 },
  },
  {
    id: 'm4',
    fieldId: 'f3',
    startsAt: new Date('2026-02-23T19:30:00'), // Future match
    status: 'OPEN',
    costTotal: 1200,
    costPerPerson: 85.71,
    createdAt: new Date('2026-02-12'),
  },
];

const mockAttendance = [
  // Match m1 (upcoming)
  { id: 'a1', matchId: 'm1', userId: '1', status: 'YES', isLateCancel: false, isNoShow: false },
  { id: 'a2', matchId: 'm1', userId: '2', status: 'YES', isLateCancel: false, isNoShow: false },
  { id: 'a3', matchId: 'm1', userId: '3', status: 'YES', isLateCancel: false, isNoShow: false },
  { id: 'a4', matchId: 'm1', userId: '4', status: 'MAYBE', isLateCancel: false, isNoShow: false },
  { id: 'a5', matchId: 'm1', userId: '5', status: 'YES', isLateCancel: false, isNoShow: false },
  { id: 'a6', matchId: 'm1', userId: '6', status: 'NO', isLateCancel: false, isNoShow: false },
  { id: 'a7', matchId: 'm1', userId: '7', status: 'YES', isLateCancel: false, isNoShow: false },
  { id: 'a8', matchId: 'm1', userId: '8', status: 'YES', isLateCancel: false, isNoShow: false },
  { id: 'a9', matchId: 'm1', userId: '9', status: 'MAYBE', isLateCancel: false, isNoShow: false },
  { id: 'a10', matchId: 'm1', userId: '10', status: 'YES', isLateCancel: false, isNoShow: false },
  { id: 'a11', matchId: 'm1', userId: '11', status: 'YES', isLateCancel: false, isNoShow: false },
  { id: 'a12', matchId: 'm1', userId: '12', status: 'YES', isLateCancel: false, isNoShow: false },
  { id: 'a13', matchId: 'm1', userId: '13', status: 'NONE', isLateCancel: false, isNoShow: false },
  { id: 'a14', matchId: 'm1', userId: '14', status: 'YES', isLateCancel: false, isNoShow: false },
];

const mockPayments = [
  // Match m1 payments
  { id: 'p1', matchId: 'm1', userId: '1', amount: 57.14, status: 'PAID', paidAt: new Date('2026-02-14'), confirmedByAdmin: true },
  { id: 'p2', matchId: 'm1', userId: '2', amount: 57.14, status: 'PAID', paidAt: new Date('2026-02-14'), confirmedByAdmin: true },
  { id: 'p3', matchId: 'm1', userId: '3', amount: 57.14, status: 'UNPAID', paidAt: null, confirmedByAdmin: false },
  { id: 'p4', matchId: 'm1', userId: '5', amount: 57.14, status: 'PAID', paidAt: new Date('2026-02-13'), confirmedByAdmin: true },
  { id: 'p5', matchId: 'm1', userId: '7', amount: 57.14, status: 'UNPAID', paidAt: null, confirmedByAdmin: false },
  { id: 'p6', matchId: 'm1', userId: '8', amount: 57.14, status: 'PAID', paidAt: new Date('2026-02-15'), confirmedByAdmin: true },
  { id: 'p7', matchId: 'm1', userId: '10', amount: 57.14, status: 'PAID', paidAt: new Date('2026-02-14'), confirmedByAdmin: true },
  { id: 'p8', matchId: 'm1', userId: '11', amount: 57.14, status: 'UNPAID', paidAt: null, confirmedByAdmin: false },
  { id: 'p9', matchId: 'm1', userId: '12', amount: 57.14, status: 'PAID', paidAt: new Date('2026-02-15'), confirmedByAdmin: true },
  { id: 'p10', matchId: 'm1', userId: '14', amount: 57.14, status: 'PAID', paidAt: new Date('2026-02-13'), confirmedByAdmin: true },
];

const mockLineupDrafts = [
  {
    id: 'l1',
    matchId: 'm1',
    name: 'Taslak A',
    layout: {
      team1: [
        { userId: '1', position: 'GK' },
        { userId: '2', position: 'DEF' },
        { userId: '3', position: 'MID' },
        { userId: '5', position: 'MID' },
        { userId: '7', position: 'FW' },
        { userId: '8', position: 'DEF' },
        { userId: '10', position: 'FW' },
      ],
      team2: [
        { userId: '11', position: 'DEF' },
        { userId: '12', position: 'MID' },
        { userId: '14', position: 'DEF' },
        { userId: '4', position: 'FW' },
        { userId: '9', position: 'MID' },
      ],
    },
    isLocked: false,
    votes: 8,
  },
  {
    id: 'l2',
    matchId: 'm1',
    name: 'Taslak B',
    layout: {
      team1: [
        { userId: '1', position: 'GK' },
        { userId: '14', position: 'DEF' },
        { userId: '3', position: 'MID' },
        { userId: '7', position: 'FW' },
        { userId: '10', position: 'FW' },
        { userId: '12', position: 'MID' },
      ],
      team2: [
        { userId: '2', position: 'DEF' },
        { userId: '5', position: 'MID' },
        { userId: '8', position: 'DEF' },
        { userId: '11', position: 'DEF' },
        { userId: '4', position: 'FW' },
        { userId: '9', position: 'MID' },
      ],
    },
    isLocked: false,
    votes: 5,
  },
];

const mockPolls = [
  {
    id: 'poll1',
    title: 'Saha Seçimi',
    description: 'Gelecek maç için hangi sahada oynamak istersiniz?',
    options: [
      { id: 'opt1', text: 'Yeşil Park Halı Saha (800 TL)', votes: 8, fieldId: 'f1' },
      { id: 'opt2', text: 'Şampiyonlar Spor Tesisi (1000 TL)', votes: 4, fieldId: 'f2' },
      { id: 'opt3', text: 'Mega Spor Kompleksi (1200 TL)', votes: 2, fieldId: 'f3' },
    ],
    status: 'ACTIVE',
    createdAt: new Date('2026-02-10'),
  },
  {
    id: 'poll2',
    title: 'Maç Saati',
    description: '23 Şubat için en uygun saat hangisi?',
    options: [
      { id: 'opt4', text: '18:00', votes: 3 },
      { id: 'opt5', text: '19:00', votes: 7 },
      { id: 'opt6', text: '20:00', votes: 4 },
    ],
    status: 'ACTIVE',
    createdAt: new Date('2026-02-11'),
  },
];

// Zustand Store
export const useStore = create((set, get) => ({
  // App State
  isDarkMode: false,
  currentUser: mockUsers[0], // Admin user
  
  // Data
  users: mockUsers,
  fields: mockFields,
  matches: mockMatches,
  attendance: mockAttendance,
  payments: mockPayments,
  lineupDrafts: mockLineupDrafts,
  polls: mockPolls,
  
  // Settings
  appSettings: {
    ibanNumber: 'TR33 0006 1005 1978 6457 8413 26',
    whatsappTemplates: {
      matchInvite: '🏆 Maç Daveti!\n\n📅 Tarih: {date}\n⏰ Saat: {time}\n📍 Saha: {field}\n💰 Ücret: {cost} TL\n\nKatılım durumunuzu bildirin!',
      paymentReminder: '💰 Ödeme Hatırlatması\n\nMerhaba {name},\n\n{date} tarihli maç için {amount} TL ödeme bekleniyor.\n\nIBAN: {iban}',
    },
  },
  
  // Actions
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  // Attendance Actions
  updateAttendance: (matchId, userId, status) => {
    set((state) => {
      const existingIndex = state.attendance.findIndex(
        (a) => a.matchId === matchId && a.userId === userId
      );
      
      if (existingIndex >= 0) {
        const newAttendance = [...state.attendance];
        newAttendance[existingIndex] = {
          ...newAttendance[existingIndex],
          status,
          respondedAt: new Date(),
        };
        return { attendance: newAttendance };
      } else {
        return {
          attendance: [
            ...state.attendance,
            {
              id: `a${Date.now()}`,
              matchId,
              userId,
              status,
              isLateCancel: false,
              isNoShow: false,
              respondedAt: new Date(),
            },
          ],
        };
      }
    });
  },
  
  // Payment Actions
  updatePaymentStatus: (paymentId, status, confirmedByAdmin = false) => {
    set((state) => ({
      payments: state.payments.map((p) =>
        p.id === paymentId
          ? {
              ...p,
              status,
              paidAt: status === 'PAID' ? new Date() : p.paidAt,
              confirmedByAdmin,
            }
          : p
      ),
    }));
  },
  
  // Match Actions
  createMatch: (matchData) => {
    const newMatch = {
      id: `m${Date.now()}`,
      ...matchData,
      status: 'OPEN',
      createdAt: new Date(),
    };
    set((state) => ({
      matches: [...state.matches, newMatch],
    }));
    return newMatch;
  },
  
  updateMatchStatus: (matchId, status) => {
    set((state) => ({
      matches: state.matches.map((m) =>
        m.id === matchId ? { ...m, status } : m
      ),
    }));
  },
  
  // User Actions
  updateUserReliability: (userId, score) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, reliabilityScore: score } : u
      ),
    }));
  },
  
  updateUserPosition: (userId, positions) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, preferredPositions: positions } : u
      ),
    }));
  },
  
  // Lineup Actions
  updateLineupDraft: (draftId, layout) => {
    set((state) => ({
      lineupDrafts: state.lineupDrafts.map((l) =>
        l.id === draftId ? { ...l, layout } : l
      ),
    }));
  },
  
  lockLineupDraft: (draftId) => {
    set((state) => ({
      lineupDrafts: state.lineupDrafts.map((l) =>
        l.id === draftId ? { ...l, isLocked: true } : l
      ),
    }));
  },
  
  voteLineupDraft: (draftId) => {
    set((state) => ({
      lineupDrafts: state.lineupDrafts.map((l) =>
        l.id === draftId ? { ...l, votes: l.votes + 1 } : l
      ),
    }));
  },
  
  // Poll Actions
  votePoll: (pollId, optionId) => {
    set((state) => ({
      polls: state.polls.map((poll) =>
        poll.id === pollId
          ? {
              ...poll,
              options: poll.options.map((opt) =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              ),
            }
          : poll
      ),
    }));
  },
  
  // Helper Functions
  getNextMatch: () => {
    const state = get();
    const now = new Date();
    return state.matches
      .filter((m) => new Date(m.startsAt) > now && m.status === 'OPEN')
      .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))[0];
  },
  
  getMatchAttendance: (matchId) => {
    const state = get();
    return state.attendance.filter((a) => a.matchId === matchId);
  },
  
  getMatchPayments: (matchId) => {
    const state = get();
    return state.payments.filter((p) => p.matchId === matchId);
  },
  
  getUserById: (userId) => {
    const state = get();
    return state.users.find((u) => u.id === userId);
  },
  
  getFieldById: (fieldId) => {
    const state = get();
    return state.fields.find((f) => f.id === fieldId);
  },
}));

export default useStore;
