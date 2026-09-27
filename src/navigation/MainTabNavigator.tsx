import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import BookingsStackNavigator from './BookingsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import { colors } from '../theme';

export type MainTabParamList = {
  HomeTab: undefined;
  BookingsTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  BookingsTab: { active: 'calendar', inactive: 'calendar-outline' },
  ProfileTab: { active: 'person', inactive: 'person-outline' },
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => {
          const iconSet = ICONS[route.name as keyof MainTabParamList];
          return <Ionicons name={focused ? iconSet.active : iconSet.inactive} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="BookingsTab" component={BookingsStackNavigator} options={{ title: 'Bookings' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} options={{ title: 'Account' }} />
    </Tab.Navigator>
  );
}
