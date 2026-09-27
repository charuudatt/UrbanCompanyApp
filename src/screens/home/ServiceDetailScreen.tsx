import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getServiceById } from '../../data/services';
import ScreenHeader from '../../components/ScreenHeader';
import StarRating from '../../components/StarRating';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, radius, spacing, typography } from '../../theme';
import { useCartStore } from '../../store/cartStore';

export default function ServiceDetailScreen({ route, navigation }: any) {
  const { serviceId } = route.params;
  const service = getServiceById(serviceId);
  const qty = useCartStore((s) => s.qtyOf(serviceId));
  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const totalCount = useCartStore((s) => s.totalCount());

  if (!service) return null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Service Details" />
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <Image source={{ uri: service.image }} style={styles.image} />
        <View style={styles.body}>
          <Text style={styles.name}>{service.name}</Text>
          <View style={styles.ratingRow}>
            <StarRating rating={service.rating} showValue />
            <Text style={styles.ratingCount}>({service.ratingCount.toLocaleString()} bookings)</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{service.price}</Text>
            {service.originalPrice ? <Text style={styles.originalPrice}>₹{service.originalPrice}</Text> : null}
            <View style={styles.durationChip}>
              <Ionicons name="time-outline" size={14} color={colors.textMuted} />
              <Text style={styles.durationText}>{service.durationMins} mins</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>About this service</Text>
          <Text style={styles.description}>{service.description}</Text>

          <Text style={styles.sectionTitle}>What's included</Text>
          {service.includes.map((item) => (
            <View key={item} style={styles.includeRow}>
              <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              <Text style={styles.includeText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {qty === 0 ? (
          <PrimaryButton title={`Add · ₹${service.price}`} onPress={() => add(service.id)} style={{ flex: 1 }} />
        ) : (
          <>
            <View style={styles.stepper}>
              <TouchableOpacity onPress={() => remove(service.id)} hitSlop={10} style={styles.stepperBtn}>
                <Ionicons name="remove" size={18} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.stepperQty}>{qty}</Text>
              <TouchableOpacity onPress={() => add(service.id)} hitSlop={10} style={styles.stepperBtn}>
                <Ionicons name="add" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <PrimaryButton
              title={`View Cart (${totalCount})`}
              onPress={() => navigation.navigate('Cart')}
              style={{ flex: 1 }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  image: { width: '100%', height: 220 },
  body: { padding: spacing.lg },
  name: { ...typography.h2, color: colors.text, marginBottom: spacing.sm },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  ratingCount: { ...typography.caption, color: colors.textMuted, marginLeft: 6 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  price: { ...typography.h3, color: colors.text },
  originalPrice: {
    ...typography.body,
    color: colors.textFaint,
    textDecorationLine: 'line-through',
    marginLeft: spacing.sm,
  },
  durationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: colors.surface,
    borderRadius: radius.round,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    gap: 4,
  },
  durationText: { ...typography.caption, color: colors.textMuted },
  sectionTitle: { ...typography.h3, color: colors.text, marginTop: spacing.md, marginBottom: spacing.sm },
  description: { ...typography.body, color: colors.textMuted, lineHeight: 22 },
  includeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, gap: 8 },
  includeText: { ...typography.body, color: colors.text },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
  },
  stepperBtn: { padding: spacing.sm },
  stepperQty: { ...typography.bodyBold, color: colors.primary, minWidth: 20, textAlign: 'center' },
});
