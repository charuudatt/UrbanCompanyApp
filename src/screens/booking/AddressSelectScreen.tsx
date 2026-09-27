import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAddressStore } from '../../store/addressStore';
import ScreenHeader from '../../components/ScreenHeader';
import AddressCard from '../../components/AddressCard';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, spacing, typography } from '../../theme';

export default function AddressSelectScreen({ navigation, route }: any) {
  const isSwitchMode = route.params?.mode === 'switch';
  const addresses = useAddressStore((s) => s.addresses);
  const selectedId = useAddressStore((s) => s.selectedId);
  const selectAddress = useAddressStore((s) => s.selectAddress);

  const handleSelect = (id: string) => {
    selectAddress(id);
    if (isSwitchMode) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Select Address" subtitle="Where do you need the service?" />
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <AddressCard
            address={item}
            selected={item.id === selectedId}
            onPress={() => handleSelect(item.id)}
          />
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.addNew} onPress={() => navigation.navigate('AddAddress')}>
            <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.addNewText}>Add New Address</Text>
          </TouchableOpacity>
        }
      />
      {!isSwitchMode && (
        <View style={styles.footer}>
          <PrimaryButton
            title="Confirm & Proceed"
            onPress={() => navigation.navigate('SlotSelect')}
            disabled={!selectedId}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { padding: spacing.lg },
  addNew: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: spacing.md },
  addNewText: { ...typography.bodyBold, color: colors.primary },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface },
});
