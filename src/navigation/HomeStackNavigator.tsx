import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import CategoryScreen from '../screens/home/CategoryScreen';
import ServiceDetailScreen from '../screens/home/ServiceDetailScreen';
import CartScreen from '../screens/booking/CartScreen';
import AddressSelectScreen from '../screens/booking/AddressSelectScreen';
import AddAddressScreen from '../screens/booking/AddAddressScreen';
import SlotSelectScreen from '../screens/booking/SlotSelectScreen';
import PaymentScreen from '../screens/booking/PaymentScreen';
import OrderConfirmationScreen from '../screens/booking/OrderConfirmationScreen';

export type HomeStackParamList = {
  Home: undefined;
  Category: { categoryId: string };
  ServiceDetail: { serviceId: string };
  Cart: undefined;
  AddressSelect: { mode?: 'switch' } | undefined;
  AddAddress: undefined;
  SlotSelect: undefined;
  Payment: { slotDate: string; slotTime: string };
  OrderConfirmation: { orderId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="AddressSelect" component={AddressSelectScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="SlotSelect" component={SlotSelectScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
