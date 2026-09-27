import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderStatus } from '../types';
import { STATUS_FLOW, STATUS_LABELS } from '../store/ordersStore';
import { colors, spacing, typography } from '../theme';

interface Props {
  status: OrderStatus;
}

export default function StatusTimeline({ status }: Props) {
  if (status === 'cancelled') {
    return (
      <View style={styles.cancelledWrap}>
        <Ionicons name="close-circle" size={20} color={colors.danger} />
        <Text style={styles.cancelledText}>Booking Cancelled</Text>
      </View>
    );
  }

  const currentIndex = STATUS_FLOW.indexOf(status);

  return (
    <View>
      {STATUS_FLOW.map((step, index) => {
        const done = index <= currentIndex;
        const isLast = index === STATUS_FLOW.length - 1;
        return (
          <View key={step} style={styles.row}>
            <View style={styles.indicatorCol}>
              <View style={[styles.dot, done && styles.dotDone]}>
                {done ? <Ionicons name="checkmark" size={12} color={colors.white} /> : null}
              </View>
              {!isLast && <View style={[styles.line, index < currentIndex && styles.lineDone]} />}
            </View>
            <View style={styles.textCol}>
              <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>
                {STATUS_LABELS[step]}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  indicatorCol: { alignItems: 'center', width: 28 },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: { backgroundColor: colors.success },
  line: { width: 2, flex: 1, minHeight: 28, backgroundColor: colors.border },
  lineDone: { backgroundColor: colors.success },
  textCol: { flex: 1, paddingBottom: spacing.lg, paddingLeft: spacing.md },
  stepLabel: { ...typography.body, color: colors.textFaint },
  stepLabelDone: { color: colors.text, fontWeight: '600' },
  cancelledWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.dangerSoft,
    padding: spacing.md,
    borderRadius: 12,
  },
  cancelledText: { ...typography.bodyBold, color: colors.danger },
});
