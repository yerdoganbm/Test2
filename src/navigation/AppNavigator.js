import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Calendar, Vote, TrendingUp, MoreHorizontal } from 'lucide-react-native';
import { useStore } from '../store';
import { getColor } from '../constants/theme';

// Import Tab Screens
import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import PollsScreen from '../screens/PollsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import MoreScreen from '../screens/MoreScreen';

// Import Stack Screens
import LineupScreen from '../screens/LineupScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import AdminScreen from '../screens/AdminScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import InviteScreen from '../screens/InviteScreen';
import JoinApprovalScreen from '../screens/JoinApprovalScreen';
import MVPVotingScreen from '../screens/MVPVotingScreen';
import MatchReportScreen from '../screens/MatchReportScreen';
import PlayerStatsScreen from '../screens/PlayerStatsScreen';
import FieldDetailsScreen from '../screens/FieldDetailsScreen';
import FieldsGuideScreen from '../screens/FieldsGuideScreen';
import DebtTrackingScreen from '../screens/DebtTrackingScreen';
import PenaltyManagementScreen from '../screens/PenaltyManagementScreen';
import RulesScreen from '../screens/RulesScreen';
import MatchTemplatesScreen from '../screens/MatchTemplatesScreen';
import MessageTemplateScreen from '../screens/MessageTemplateScreen';
import TreasuryReportsScreen from '../screens/TreasuryReportsScreen';
import FieldManagementScreen from '../screens/FieldManagementScreen';
import WhatsAppIntegrationScreen from '../screens/WhatsAppIntegrationScreen';
import MatchArchiveScreen from '../screens/MatchArchiveScreen';
import CreatePollScreen from '../screens/CreatePollScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// More Stack Navigator
const MoreStack = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: getColor('background', isDarkMode),
        },
        headerTintColor: getColor('text', isDarkMode),
        headerTitleStyle: {
          fontWeight: '700',
        },
        animation: 'slide_from_right',
        presentation: 'card',
      }}
    >
      <Stack.Screen name="MoreMain" component={MoreScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Lineup" component={LineupScreen} options={{ title: 'Kadro & Takımlar' }} />
      <Stack.Screen name="Payments" component={PaymentsScreen} options={{ title: 'Ödemeler' }} />
      <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Yönetim Paneli' }} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: 'Profil Oluştur' }} />
      <Stack.Screen name="Invite" component={InviteScreen} options={{ title: 'Gruba Davet' }} />
      <Stack.Screen name="JoinApproval" component={JoinApprovalScreen} options={{ title: 'Katılım Onayı' }} />
      <Stack.Screen name="MVPVoting" component={MVPVotingScreen} options={{ title: 'MVP Oylama' }} />
      <Stack.Screen name="MatchReport" component={MatchReportScreen} options={{ title: 'Maç Raporu' }} />
      <Stack.Screen name="PlayerStats" component={PlayerStatsScreen} options={{ title: 'Oyuncu İstatistikleri' }} />
      <Stack.Screen name="FieldDetails" component={FieldDetailsScreen} options={{ title: 'Saha Detayları' }} />
      <Stack.Screen name="FieldsGuide" component={FieldsGuideScreen} options={{ title: 'Saha Rehberi' }} />
      <Stack.Screen name="DebtTracking" component={DebtTrackingScreen} options={{ title: 'Borç Takibi' }} />
      <Stack.Screen name="PenaltyManagement" component={PenaltyManagementScreen} options={{ title: 'Ceza Yönetimi' }} />
      <Stack.Screen name="Rules" component={RulesScreen} options={{ title: 'Grup Kuralları' }} />
      <Stack.Screen name="MatchTemplates" component={MatchTemplatesScreen} options={{ title: 'Maç Şablonları' }} />
      <Stack.Screen name="MessageTemplate" component={MessageTemplateScreen} options={{ title: 'Mesaj Şablonları' }} />
      <Stack.Screen name="TreasuryReports" component={TreasuryReportsScreen} options={{ title: 'Kasa Raporları' }} />
      <Stack.Screen name="FieldManagement" component={FieldManagementScreen} options={{ title: 'Saha Yönetimi' }} />
      <Stack.Screen name="WhatsAppIntegration" component={WhatsAppIntegrationScreen} options={{ title: 'WhatsApp' }} />
      <Stack.Screen name="MatchArchive" component={MatchArchiveScreen} options={{ title: 'Maç Arşivi' }} />
      <Stack.Screen name="CreatePoll" component={CreatePollScreen} options={{ title: 'Anket Oluştur' }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
            
            switch (route.name) {
              case 'Ana Sayfa':
                IconComponent = Home;
                break;
              case 'Maçlar':
                IconComponent = Calendar;
                break;
              case 'Anketler':
                IconComponent = Vote;
                break;
              case 'İstatistik':
                IconComponent = TrendingUp;
                break;
              case 'Daha Fazla':
                IconComponent = MoreHorizontal;
                break;
              default:
                IconComponent = Home;
            }
            
            return <IconComponent size={size} color={color} strokeWidth={focused ? 2.5 : 2} />;
          },
          tabBarActiveTintColor: getColor('primary', isDarkMode),
          tabBarInactiveTintColor: getColor('textSecondary', isDarkMode),
          tabBarStyle: {
            backgroundColor: getColor('card', isDarkMode),
            borderTopColor: getColor('border', isDarkMode),
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
          animation: 'shift',
          headerStyle: {
            backgroundColor: getColor('background', isDarkMode),
            borderBottomColor: getColor('border', isDarkMode),
            borderBottomWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '700',
            color: getColor('text', isDarkMode),
          },
          headerTintColor: getColor('text', isDarkMode),
        })}
      >
        <Tab.Screen 
          name="Ana Sayfa" 
          component={HomeScreen}
          options={{
            headerTitle: 'Halı Saha Otomasyonu',
          }}
        />
        <Tab.Screen 
          name="Maçlar" 
          component={MatchesScreen}
          options={{
            headerTitle: 'Maç Takvimi',
          }}
        />
        <Tab.Screen 
          name="Anketler" 
          component={PollsScreen}
          options={{
            headerTitle: 'Grup Anketleri',
          }}
        />
        <Tab.Screen 
          name="İstatistik" 
          component={LeaderboardScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Daha Fazla" 
          component={MoreStack}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
