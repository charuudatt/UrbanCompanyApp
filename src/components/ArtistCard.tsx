import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from '../types';
import { colors, radius, shadow, spacing, typography } from '../theme';
import StarRating from './StarRating';

interface Props {
  provider: Provider;
}

export default function ArtistCard({ provider }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.avatar, { backgroundColor: provider.avatarColor }]}>
        <Text style={styles.avatarText}>{provider.name.charAt(0)}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {provider.name}
      </Text>
      <StarRating rating={provider.rating} size={11} showValue />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginRight: spacing.md,
    ...shadow.soft,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: { color: colors.white, fontFamily: typography.h3.fontFamily, fontSize: 20 },
  name: { ...typography.captionBold, color: colors.text, marginBottom: 4 },
});
