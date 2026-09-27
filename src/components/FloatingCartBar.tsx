import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../store/cartStore';
import { colors, radius, spacing, typography } from '../theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
}

export default function FloatingCartBar({ onPress }: Props) {
  const count = useCartStore((s) => s.totalCount());
  const total = useCartStore((s) => s.totalAmount());

  if (count === 0) return null;

  return (
    <TouchableOpacity style={styles.bar} activeOpacity={0.9} onPress={onPress}>
      <View>
        <Text style={styles.count}>{count} item{count > 1 ? 's' : ''} added</Text>
        <Text style={styles.total}>₹{total}</Text>
      </View>
      <View style={styles.viewCart}>
        <Text style={styles.viewCartText}>View Cart</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  count: { ...typography.caption, color: colors.white, opacity: 0.85 },
  total: { ...typography.bodyBold, color: colors.white },
  viewCart: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewCartText: { ...typography.bodyBold, color: colors.white },
});
