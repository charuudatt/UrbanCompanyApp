import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Service } from '../types';
import { colors, radius, shadow, spacing, typography } from '../theme';
import { useCartStore } from '../store/cartStore';
import StarRating from './StarRating';

interface Props {
  service: Service;
  onPress: () => void;
  layout?: 'list' | 'grid';
}

export default function ServiceCard({ service, onPress, layout = 'list' }: Props) {
  const qty = useCartStore((s) => s.qtyOf(service.id));
  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const [saved, setSaved] = useState(false);

  const discountPct = service.originalPrice
    ? Math.round(100 - (service.price / service.originalPrice) * 100)
    : null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, layout === 'grid' && styles.cardGrid]}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: service.image }} style={styles.image} />
        {discountPct ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPct}% OFF</Text>
          </View>
        ) : null}
        <TouchableOpacity style={styles.wishlistBtn} hitSlop={8} onPress={() => setSaved((v) => !v)}>
          <Ionicons name={saved ? 'heart' : 'heart-outline'} size={16} color={saved ? colors.primary : colors.textMuted} />
        </TouchableOpacity>
        <View style={styles.addWrap}>
          {qty === 0 ? (
            <TouchableOpacity style={styles.addBtn} onPress={() => add(service.id)}>
              <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.stepper}>
              <TouchableOpacity onPress={() => remove(service.id)} hitSlop={6}>
                <Ionicons name="remove" size={16} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.stepperText}>{qty}</Text>
              <TouchableOpacity onPress={() => add(service.id)} hitSlop={6}>
                <Ionicons name="add" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.ratingRow}>
          <StarRating rating={service.rating} size={12} />
          <Text style={styles.ratingCount}>({service.ratingCount.toLocaleString()})</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {service.name}
        </Text>
        <Text style={styles.duration}>{service.durationMins} mins</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{service.price}</Text>
          {service.originalPrice ? (
            <Text style={styles.originalPrice}>₹{service.originalPrice}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    paddingBottom: 14,
    ...shadow.soft,
  },
  cardGrid: { flexDirection: 'column', flex: 1 },
  imageWrap: { width: 112, height: 112, margin: 6 },
  image: { width: '100%', height: '100%', borderRadius: radius.md },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: colors.gold,
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: { ...typography.tiny, color: colors.white, fontSize: 9 },
  wishlistBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addWrap: { position: 'absolute', bottom: -14, alignSelf: 'center' },
  addBtn: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 6,
    ...shadow.soft,
  },
  addBtnText: { ...typography.captionBold, color: colors.primary, fontSize: 12 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 8,
    ...shadow.soft,
  },
  stepperText: { ...typography.captionBold, color: colors.primary, minWidth: 12, textAlign: 'center' },
  info: { flex: 1, padding: spacing.md, paddingLeft: 0 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  ratingCount: { ...typography.tiny, color: colors.textMuted, marginLeft: 4 },
  name: { ...typography.bodyBold, color: colors.text, marginBottom: 4 },
  duration: { ...typography.caption, color: colors.textMuted, marginBottom: 6 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  price: { ...typography.bodyBold, color: colors.text },
  originalPrice: {
    ...typography.caption,
    color: colors.textFaint,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
});
