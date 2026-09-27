import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Address } from '../types';
import { colors, radius, shadow, spacing, typography } from '../theme';

interface Props {
  address: Address;
  selected?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
}

const LABEL_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Work: 'briefcase',
};

export default function AddressCard({ address, selected, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={LABEL_ICON[address.label] ?? 'location'} size={18} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{address.label}</Text>
        <Text style={styles.detail} numberOfLines={2}>
          {address.line1}, {address.line2}, {address.city} - {address.pincode}
        </Text>
      </View>
      {selected ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : null}
      {onDelete ? (
        <TouchableOpacity onPress={onDelete} hitSlop={8} style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.soft,
  },
  cardSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.round,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: { flex: 1 },
  label: { ...typography.bodyBold, color: colors.text, marginBottom: 2 },
  detail: { ...typography.caption, color: colors.textMuted },
  deleteBtn: { marginLeft: spacing.sm, marginTop: 2 },
});
