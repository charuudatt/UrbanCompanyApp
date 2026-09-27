import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, spacing, typography } from '../../theme';

export default function OrderConfirmationScreen({ route, navigation }: any) {
  const { orderId } = route.params;

  const goToBooking = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'BookingsTab',
        params: { screen: 'OrderDetail', params: { orderId } },
      })
    );
  };

  const backToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeTab' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark-circle" size={88} color={colors.success} />
        </View>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your service has been booked successfully. We'll assign a professional shortly.
        </Text>
        <View style={styles.orderIdChip}>
          <Text style={styles.orderIdLabel}>Booking ID</Text>
          <Text style={styles.orderIdValue}>{orderId}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton title="View Booking" onPress={goToBooking} style={{ marginBottom: spacing.md }} />
        <PrimaryButton title="Back to Home" variant="outline" onPress={backToHome} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  iconWrap: { marginBottom: spacing.lg },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.sm, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.xl, lineHeight: 22 },
  orderIdChip: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderIdLabel: { ...typography.caption, color: colors.textMuted, marginBottom: 2 },
  orderIdValue: { ...typography.bodyBold, color: colors.text },
  footer: { padding: spacing.xl },
});
