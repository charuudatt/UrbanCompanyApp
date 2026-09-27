import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAddressStore } from '../../store/addressStore';
import ScreenHeader from '../../components/ScreenHeader';
import AddressCard from '../../components/AddressCard';
import { colors, spacing, typography } from '../../theme';

export default function SavedAddressesScreen({ navigation }: any) {
  const addresses = useAddressStore((s) => s.addresses);
  const removeAddress = useAddressStore((s) => s.removeAddress);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Saved Addresses" />
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <AddressCard address={item} onDelete={() => removeAddress(item.id)} />
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.addNew} onPress={() => navigation.navigate('AddAddress')}>
            <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.addNewText}>Add New Address</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { padding: spacing.lg },
  addNew: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: spacing.md },
  addNewText: { ...typography.bodyBold, color: colors.primary },
});
