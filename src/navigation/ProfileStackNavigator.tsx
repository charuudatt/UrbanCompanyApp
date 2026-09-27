import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SavedAddressesScreen from '../screens/profile/SavedAddressesScreen';
import AddAddressScreen from '../screens/booking/AddAddressScreen';

export type ProfileStackParamList = {
  Profile: undefined;
  SavedAddresses: undefined;
  AddAddress: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
    </Stack.Navigator>
  );
}
