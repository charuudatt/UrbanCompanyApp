import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../../data/categories';
import { popularServices } from '../../data/services';
import { providers } from '../../data/providers';
import { colors, fontFamily, gradients, radius, shadow, spacing, typography } from '../../theme';
import CategoryTile from '../../components/CategoryTile';
import ServiceCard from '../../components/ServiceCard';
import ArtistCard from '../../components/ArtistCard';
import FloatingCartBar from '../../components/FloatingCartBar';
import { useAddressStore } from '../../store/addressStore';

export default function HomeScreen({ navigation }: any) {
  const addresses = useAddressStore((s) => s.addresses);
  const selectedId = useAddressStore((s) => s.selectedId);
  const address = addresses.find((a) => a.id === selectedId) ?? addresses[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.locationRow}
          onPress={() => navigation.navigate('AddressSelect', { mode: 'switch' })}
        >
          <Ionicons name="location" size={18} color={colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {address ? `${address.label} - ${address.line1}` : 'Select location'}
          </Text>
          <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <Text style={styles.searchPlaceholder}>Search for "Bridal Makeup"</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Flat 30% OFF</Text>
            <Text style={styles.bannerSubtitle}>on your first salon booking</Text>
            <View style={styles.bannerPill}>
              <Text style={styles.bannerPillText}>Book Now</Text>
            </View>
          </View>
          <Image source={{ uri: 'https://picsum.photos/seed/beauty-banner/200/200' }} style={styles.bannerImage} />
        </LinearGradient>

        <Text style={styles.sectionTitle}>What are you looking for?</Text>
        <View style={styles.categoryGrid}>
          {categories.map((c) => (
            <CategoryTile
              key={c.id}
              category={c}
              onPress={() => navigation.navigate('Category', { categoryId: c.id })}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Trending Beauty Services</Text>
        <FlatList
          data={popularServices}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.md }}
          renderItem={({ item }) => (
            <View style={styles.popularCard}>
              <ServiceCard
                service={item}
                onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
              />
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>Meet Our Beauty Experts</Text>
        <FlatList
          data={providers}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.md }}
          renderItem={({ item }) => <ArtistCard provider={item} />}
        />
      </ScrollView>

      <FloatingCartBar onPress={() => navigation.navigate('Cart')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, gap: 6 },
  locationText: { ...typography.bodyBold, color: colors.text, flexShrink: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.round,
    paddingHorizontal: spacing.md,
    height: 46,
    gap: spacing.sm,
  },
  searchPlaceholder: { ...typography.body, color: colors.textMuted },
  scrollContent: { padding: spacing.lg, paddingBottom: 120 },
  banner: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
    overflow: 'hidden',
    ...shadow.card,
  },
  bannerTitle: { fontFamily: fontFamily.display, fontSize: 24, color: colors.white, marginBottom: 4 },
  bannerSubtitle: { ...typography.caption, color: colors.white, opacity: 0.9, marginBottom: spacing.md },
  bannerPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radius.round,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  bannerPillText: { ...typography.captionBold, color: colors.primary },
  bannerImage: { width: 84, height: 84, borderRadius: radius.md },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
  popularCard: { width: 260, marginRight: spacing.md },
});
