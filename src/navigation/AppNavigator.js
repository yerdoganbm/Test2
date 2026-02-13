import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar, Vote, TrendingUp, MoreHorizontal } from 'lucide-react-native';
import { useStore } from '../store';
import { getColor } from '../constants/theme';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import PollsScreen from '../screens/PollsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

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
          component={MoreScreen}
          options={{
            headerTitle: 'Menü',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
