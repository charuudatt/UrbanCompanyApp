import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersListScreen from '../screens/orders/OrdersListScreen';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import RatingScreen from '../screens/orders/RatingScreen';

export type BookingsStackParamList = {
  OrdersList: undefined;
  OrderDetail: { orderId: string };
  Rating: { orderId: string };
};

const Stack = createNativeStackNavigator<BookingsStackParamList>();

export default function BookingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrdersList" component={OrdersListScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="Rating" component={RatingScreen} />
    </Stack.Navigator>
  );
}
