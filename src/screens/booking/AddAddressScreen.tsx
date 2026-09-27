import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAddressStore } from '../../store/addressStore';
import ScreenHeader from '../../components/ScreenHeader';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, radius, spacing, typography } from '../../theme';

const LABELS = ['Home', 'Work', 'Other'];

export default function AddAddressScreen({ navigation }: any) {
  const [label, setLabel] = useState('Home');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const addAddress = useAddressStore((s) => s.addAddress);

  const canSave = line1.trim().length > 3 && city.trim().length > 1 && pincode.trim().length === 6;

  const handleSave = () => {
    addAddress({ label, line1, line2, city, pincode });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Add New Address" />
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.label}>Save As</Text>
        <View style={styles.labelRow}>
          {LABELS.map((l) => (
            <TouchableOpacity
              key={l}
              style={[styles.labelChip, label === l && styles.labelChipActive]}
              onPress={() => setLabel(l)}
            >
              <Text style={[styles.labelChipText, label === l && styles.labelChipTextActive]}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>House / Flat / Street</Text>
        <TextInput style={styles.input} value={line1} onChangeText={setLine1} placeholder="e.g. 402, Palm Residency" placeholderTextColor={colors.textFaint} />

        <Text style={styles.label}>Area / Landmark</Text>
        <TextInput style={styles.input} value={line2} onChangeText={setLine2} placeholder="e.g. Baner Road" placeholderTextColor={colors.textFaint} />

        <View style={styles.rowSplit}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="City" placeholderTextColor={colors.textFaint} />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              value={pincode}
              onChangeText={(t) => setPincode(t.replace(/\D/g, ''))}
              placeholder="000000"
              placeholderTextColor={colors.textFaint}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
        </View>

        <PrimaryButton title="Save Address" onPress={handleSave} disabled={!canSave} style={{ marginTop: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.lg },
  label: { ...typography.captionBold, color: colors.textMuted, marginBottom: spacing.sm, marginTop: spacing.md },
  labelRow: { flexDirection: 'row', gap: spacing.sm },
  labelChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.round,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  labelChipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  labelChipText: { ...typography.captionBold, color: colors.textMuted },
  labelChipTextActive: { color: colors.primary },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    height: 50,
    paddingHorizontal: spacing.md,
    color: colors.text,
    ...typography.body,
  },
  rowSplit: { flexDirection: 'row' },
});
