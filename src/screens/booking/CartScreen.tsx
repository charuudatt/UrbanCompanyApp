import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../../store/cartStore';
import { getServiceById } from '../../data/services';
import ScreenHeader from '../../components/ScreenHeader';
import PrimaryButton from '../../components/PrimaryButton';
import EmptyState from '../../components/EmptyState';
import { colors, radius, shadow, spacing, typography } from '../../theme';

export default function CartScreen({ navigation }: any) {
  const lines = useCartStore((s) => s.lines);
  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const totalAmount = useCartStore((s) => s.totalAmount());

  const items = lines
    .map((l) => ({ line: l, service: getServiceById(l.serviceId) }))
    .filter((x) => x.service);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Your Cart" subtitle={`${lines.length} service${lines.length !== 1 ? 's' : ''}`} />
      {items.length === 0 ? (
        <EmptyState icon="cart-outline" title="Your cart is empty" subtitle="Add services to get started" />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.line.serviceId}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Image source={{ uri: item.service!.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={2}>
                    {item.service!.name}
                  </Text>
                  <Text style={styles.price}>₹{item.service!.price}</Text>
                </View>
                <View style={styles.stepper}>
                  <TouchableOpacity onPress={() => remove(item.line.serviceId)} hitSlop={8}>
                    <Ionicons name="remove" size={16} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.stepperQty}>{item.line.qty}</Text>
                  <TouchableOpacity onPress={() => add(item.line.serviceId)} hitSlop={8}>
                    <Ionicons name="add" size={16} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{totalAmount}</Text>
            </View>
            <PrimaryButton title="Proceed to Book" onPress={() => navigation.navigate('AddressSelect')} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { padding: spacing.lg },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.soft,
  },
  image: { width: 56, height: 56, borderRadius: radius.sm, marginRight: spacing.md },
  info: { flex: 1 },
  name: { ...typography.bodyBold, color: colors.text, marginBottom: 4 },
  price: { ...typography.body, color: colors.textMuted },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    gap: spacing.sm,
  },
  stepperQty: { ...typography.bodyBold, color: colors.primary, minWidth: 14, textAlign: 'center' },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  totalLabel: { ...typography.bodyBold, color: colors.textMuted },
  totalValue: { ...typography.h3, color: colors.text },
});
