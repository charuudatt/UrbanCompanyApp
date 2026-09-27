import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../../data/categories';
import { getServicesByCategory } from '../../data/services';
import ScreenHeader from '../../components/ScreenHeader';
import ServiceCard from '../../components/ServiceCard';
import FloatingCartBar from '../../components/FloatingCartBar';
import { colors, spacing } from '../../theme';

export default function CategoryScreen({ route, navigation }: any) {
  const { categoryId } = route.params;
  const category = categories.find((c) => c.id === categoryId);
  const services = getServicesByCategory(categoryId);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title={category?.name ?? 'Services'} subtitle={`${services.length} services`} />
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
          />
        )}
      />
      <FloatingCartBar onPress={() => navigation.navigate('Cart')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { padding: spacing.lg, paddingBottom: 120 },
});
