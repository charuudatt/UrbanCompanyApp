import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrdersStore } from '../../store/ordersStore';
import OrderCard from '../../components/OrderCard';
import EmptyState from '../../components/EmptyState';
import { colors, radius, spacing, typography } from '../../theme';

const TABS = ['Upcoming', 'Past'] as const;

export default function OrdersListScreen({ navigation }: any) {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Upcoming');
  const orders = useOrdersStore((s) => s.orders);

  const filtered = orders.filter((o) =>
    tab === 'Upcoming' ? o.status !== 'completed' && o.status !== 'cancelled' : o.status === 'completed' || o.status === 'cancelled'
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <View style={styles.tabRow}>
          {TABS.map((t) => (
            <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {filtered.length === 0 ? (
        <EmptyState
          icon="calendar-outline"
          title={tab === 'Upcoming' ? 'No upcoming bookings' : 'No past bookings'}
          subtitle="Book a service from the Home tab to see it here"
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <OrderCard order={item} onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.md },
  tabRow: { flexDirection: 'row', backgroundColor: colors.background, borderRadius: radius.md, padding: 4 },
  tab: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center', borderRadius: radius.sm },
  tabActive: { backgroundColor: colors.surface },
  tabText: { ...typography.captionBold, color: colors.textMuted },
  tabTextActive: { color: colors.primary },
  listContent: { padding: spacing.lg },
});
