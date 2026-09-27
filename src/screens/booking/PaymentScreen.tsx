import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, radius, shadow, spacing, typography } from '../../theme';
import { useCartStore } from '../../store/cartStore';
import { useAddressStore } from '../../store/addressStore';
import { useOrdersStore } from '../../store/ordersStore';
import { getServiceById } from '../../data/services';
import { PaymentMethod } from '../../types';

const METHODS: { id: PaymentMethod; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'upi', label: 'UPI', icon: 'qr-code-outline' },
  { id: 'card', label: 'Credit / Debit Card', icon: 'card-outline' },
  { id: 'wallet', label: 'Wallet', icon: 'wallet-outline' },
  { id: 'cash', label: 'Cash on Service', icon: 'cash-outline' },
];

export default function PaymentScreen({ route, navigation }: any) {
  const { slotDate, slotTime } = route.params;
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [processing, setProcessing] = useState(false);

  const lines = useCartStore((s) => s.lines);
  const totalAmount = useCartStore((s) => s.totalAmount());
  const clearCart = useCartStore((s) => s.clear);
  const address = useAddressStore((s) => s.addresses.find((a) => a.id === s.selectedId));
  const createOrder = useOrdersStore((s) => s.createOrder);

  const convenienceFee = 25;
  const grandTotal = totalAmount + convenienceFee;

  const handlePay = () => {
    setProcessing(true);
    const orderLines = lines.map((l) => {
      const service = getServiceById(l.serviceId)!;
      return { serviceId: l.serviceId, qty: l.qty, price: service.price };
    });
    setTimeout(() => {
      const orderId = createOrder({
        lines: orderLines,
        addressId: address?.id ?? '',
        slotDate,
        slotTime,
        paymentMethod: method,
        total: grandTotal,
      });
      clearCart();
      setProcessing(false);
      navigation.replace('OrderConfirmation', { orderId });
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Review & Pay" />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
            <Text style={styles.summaryText}>{slotDate} · {slotTime}</Text>
          </View>
          {address ? (
            <View style={styles.summaryRow}>
              <Ionicons name="location-outline" size={16} color={colors.textMuted} />
              <Text style={styles.summaryText} numberOfLines={2}>
                {address.label} - {address.line1}, {address.city}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bill Details</Text>
          {lines.map((l) => {
            const service = getServiceById(l.serviceId)!;
            return (
              <View key={l.serviceId} style={styles.billRow}>
                <Text style={styles.billLabel} numberOfLines={1}>
                  {service.name} x{l.qty}
                </Text>
                <Text style={styles.billValue}>₹{service.price * l.qty}</Text>
              </View>
            );
          })}
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Convenience Fee</Text>
            <Text style={styles.billValue}>₹{convenienceFee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.billRow}>
            <Text style={styles.billTotalLabel}>Total Amount</Text>
            <Text style={styles.billTotalValue}>₹{grandTotal}</Text>
          </View>
        </View>

        <Text style={styles.cardTitle}>Payment Method</Text>
        {METHODS.map((m) => {
          const active = m.id === method;
          return (
            <TouchableOpacity
              key={m.id}
              style={[styles.methodRow, active && styles.methodRowActive]}
              onPress={() => setMethod(m.id)}
            >
              <Ionicons name={m.icon} size={20} color={active ? colors.primary : colors.textMuted} />
              <Text style={[styles.methodLabel, active && styles.methodLabelActive]}>{m.label}</Text>
              <Ionicons
                name={active ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={active ? colors.primary : colors.textFaint}
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title={`Pay ₹${grandTotal} & Confirm`}
          onPress={handlePay}
          loading={processing}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadow.soft,
  },
  cardTitle: { ...typography.bodyBold, color: colors.text, marginBottom: spacing.md },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.sm },
  summaryText: { ...typography.body, color: colors.text, flexShrink: 1 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  billLabel: { ...typography.body, color: colors.textMuted, flexShrink: 1, marginRight: spacing.sm },
  billValue: { ...typography.body, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  billTotalLabel: { ...typography.bodyBold, color: colors.text },
  billTotalValue: { ...typography.bodyBold, color: colors.text },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadow.soft,
  },
  methodRowActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  methodLabel: { ...typography.body, color: colors.text },
  methodLabelActive: { color: colors.primary, fontWeight: '600' },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface },
});
