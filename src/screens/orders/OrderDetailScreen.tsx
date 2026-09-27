import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import StatusTimeline from '../../components/StatusTimeline';
import StarRating from '../../components/StarRating';
import PrimaryButton from '../../components/PrimaryButton';
import { useOrdersStore } from '../../store/ordersStore';
import { useAddressStore } from '../../store/addressStore';
import { getServiceById } from '../../data/services';
import { providers } from '../../data/providers';
import { colors, radius, shadow, spacing, typography } from '../../theme';

export default function OrderDetailScreen({ route, navigation }: any) {
  const { orderId } = route.params;
  const order = useOrdersStore((s) => s.orders.find((o) => o.id === orderId));
  const advanceStatus = useOrdersStore((s) => s.advanceStatus);
  const cancelOrder = useOrdersStore((s) => s.cancelOrder);
  const address = useAddressStore((s) => s.addresses.find((a) => a.id === order?.addressId));

  if (!order) return null;

  const provider = providers.find((p) => p.id === order.providerId);
  const isActive = order.status !== 'completed' && order.status !== 'cancelled';

  const handleCancel = () => {
    Alert.alert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes, Cancel', style: 'destructive', onPress: () => cancelOrder(order.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title={`Booking #${order.id}`} subtitle={`${order.slotDate} · ${order.slotTime}`} />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status</Text>
          <StatusTimeline status={order.status} />
          {isActive && (
            <TouchableOpacity style={styles.simulateBtn} onPress={() => advanceStatus(order.id)}>
              <Ionicons name="play-forward" size={14} color={colors.primary} />
              <Text style={styles.simulateText}>Simulate Next Step (Demo)</Text>
            </TouchableOpacity>
          )}
        </View>

        {provider && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Beauty Expert</Text>
            <View style={styles.providerRow}>
              <View style={[styles.avatar, { backgroundColor: provider.avatarColor }]}>
                <Text style={styles.avatarText}>{provider.name.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <StarRating rating={provider.rating} size={12} showValue />
                <Text style={styles.providerMeta}>{provider.vehicle}</Text>
              </View>
              <TouchableOpacity style={styles.callBtn}>
                <Ionicons name="call" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Services</Text>
          {order.lines.map((l) => {
            const service = getServiceById(l.serviceId);
            return (
              <View key={l.serviceId} style={styles.billRow}>
                <Text style={styles.billLabel} numberOfLines={1}>
                  {service?.name} x{l.qty}
                </Text>
                <Text style={styles.billValue}>₹{l.price * l.qty}</Text>
              </View>
            );
          })}
          <View style={styles.divider} />
          <View style={styles.billRow}>
            <Text style={styles.billTotalLabel}>Total Paid</Text>
            <Text style={styles.billTotalValue}>₹{order.total}</Text>
          </View>
          <Text style={styles.paymentMethod}>via {order.paymentMethod.toUpperCase()}</Text>
        </View>

        {address && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Service Address</Text>
            <View style={styles.summaryRow}>
              <Ionicons name="location-outline" size={16} color={colors.textMuted} />
              <Text style={styles.summaryText}>
                {address.label} - {address.line1}, {address.line2}, {address.city} - {address.pincode}
              </Text>
            </View>
          </View>
        )}

        {order.status === 'completed' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Rating</Text>
            {order.rating ? (
              <>
                <StarRating rating={order.rating} showValue />
                {order.review ? <Text style={styles.reviewText}>{order.review}</Text> : null}
              </>
            ) : (
              <PrimaryButton
                title="Rate This Service"
                variant="outline"
                onPress={() => navigation.navigate('Rating', { orderId: order.id })}
              />
            )}
          </View>
        )}

        {isActive && (
          <PrimaryButton title="Cancel Booking" variant="outline" onPress={handleCancel} style={{ marginTop: spacing.sm }} />
        )}
      </ScrollView>
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
  simulateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.round,
  },
  simulateText: { ...typography.tiny, color: colors.primary, fontWeight: '700' },
  providerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '700', fontSize: 18 },
  providerName: { ...typography.bodyBold, color: colors.text },
  providerMeta: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  billLabel: { ...typography.body, color: colors.textMuted, flexShrink: 1, marginRight: spacing.sm },
  billValue: { ...typography.body, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  billTotalLabel: { ...typography.bodyBold, color: colors.text },
  billTotalValue: { ...typography.bodyBold, color: colors.text },
  paymentMethod: { ...typography.caption, color: colors.textMuted, marginTop: 4 },
  summaryRow: { flexDirection: 'row', gap: 8 },
  summaryText: { ...typography.body, color: colors.text, flexShrink: 1, lineHeight: 20 },
  reviewText: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm, fontStyle: 'italic' },
});
