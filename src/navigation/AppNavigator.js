import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar, Users, Wallet, Settings } from 'lucide-react-native';
import { useStore } from '../store';
import { getColor } from '../constants/theme';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import LineupScreen from '../screens/LineupScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import AdminScreen from '../screens/AdminScreen';

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
              case 'Kadro':
                IconComponent = Users;
                break;
              case 'Ödemeler':
                IconComponent = Wallet;
                break;
              case 'Admin':
                IconComponent = Settings;
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
          name="Kadro" 
          component={LineupScreen}
          options={{
            headerTitle: 'Kadro & Takımlar',
          }}
        />
        <Tab.Screen 
          name="Ödemeler" 
          component={PaymentsScreen}
          options={{
            headerTitle: 'Ödemeler & Kasa',
          }}
        />
        <Tab.Screen 
          name="Admin" 
          component={AdminScreen}
          options={{
            headerTitle: 'Yönetim Paneli',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
