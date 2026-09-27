import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, addDays } from 'date-fns';
import ScreenHeader from '../../components/ScreenHeader';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, radius, spacing, typography } from '../../theme';

const TIME_SLOTS = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'];

export default function SlotSelectScreen({ navigation }: any) {
  const days = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => {
        const date = addDays(new Date(), i);
        return {
          key: format(date, 'yyyy-MM-dd'),
          dayLabel: i === 0 ? 'Today' : format(date, 'EEE'),
          dateLabel: format(date, 'd MMM'),
        };
      }),
    []
  );

  const [selectedDate, setSelectedDate] = useState(days[0].key);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Select Slot" subtitle="Choose a convenient date & time" />
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.xl }}>
          {days.map((d) => {
            const active = d.key === selectedDate;
            return (
              <TouchableOpacity
                key={d.key}
                style={[styles.dateChip, active && styles.dateChipActive]}
                onPress={() => setSelectedDate(d.key)}
              >
                <Text style={[styles.dayLabel, active && styles.dayLabelActive]}>{d.dayLabel}</Text>
                <Text style={[styles.dateLabel, active && styles.dateLabelActive]}>{d.dateLabel}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((t) => {
            const active = t === selectedTime;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.timeChip, active && styles.timeChipActive]}
                onPress={() => setSelectedTime(t)}
              >
                <Text style={[styles.timeText, active && styles.timeTextActive]}>{t}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Continue to Payment"
          disabled={!selectedTime}
          onPress={() =>
            navigation.navigate('Payment', {
              slotDate: days.find((d) => d.key === selectedDate)?.dateLabel,
              slotTime: selectedTime,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.lg },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  dateChip: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    minWidth: 68,
  },
  dateChipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  dayLabel: { ...typography.caption, color: colors.textMuted },
  dayLabelActive: { color: colors.primary, fontWeight: '700' },
  dateLabel: { ...typography.bodyBold, color: colors.text, marginTop: 2 },
  dateLabelActive: { color: colors.primary },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  timeChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.round,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  timeChipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  timeText: { ...typography.body, color: colors.text },
  timeTextActive: { color: colors.primary, fontWeight: '700' },
  footer: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface },
});
