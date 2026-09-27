import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Order } from '../types';
import { getServiceById } from '../data/services';
import { STATUS_LABELS } from '../store/ordersStore';
import { colors, radius, shadow, spacing, typography } from '../theme';

interface Props {
  order: Order;
  onPress: () => void;
}

const STATUS_STYLE: Record<Order['status'], { bg: string; fg: string }> = {
  confirmed: { bg: colors.primarySoft, fg: colors.primary },
  provider_assigned: { bg: colors.primarySoft, fg: colors.primary },
  on_the_way: { bg: colors.warningSoft, fg: colors.warning },
  in_progress: { bg: colors.warningSoft, fg: colors.warning },
  completed: { bg: colors.successSoft, fg: colors.success },
  cancelled: { bg: colors.dangerSoft, fg: colors.danger },
};

export default function OrderCard({ order, onPress }: Props) {
  const firstService = getServiceById(order.lines[0]?.serviceId);
  const extraCount = order.lines.length - 1;
  const statusStyle = STATUS_STYLE[order.status];

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.orderId}>#{order.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.fg }]}>{STATUS_LABELS[order.status]}</Text>
        </View>
      </View>
      <Text style={styles.serviceName} numberOfLines={1}>
        {firstService?.name}
        {extraCount > 0 ? ` + ${extraCount} more` : ''}
      </Text>
      <View style={styles.footerRow}>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>{order.slotDate} · {order.slotTime}</Text>
        </View>
        <Text style={styles.total}>₹{order.total}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.soft,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  orderId: { ...typography.captionBold, color: colors.textMuted },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.round },
  statusText: { ...typography.tiny, fontWeight: '700' },
  serviceName: { ...typography.bodyBold, color: colors.text, marginBottom: spacing.sm },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { ...typography.caption, color: colors.textMuted },
  total: { ...typography.bodyBold, color: colors.text },
});
