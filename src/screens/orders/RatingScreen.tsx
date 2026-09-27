import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import StarRating from '../../components/StarRating';
import PrimaryButton from '../../components/PrimaryButton';
import { useOrdersStore } from '../../store/ordersStore';
import { colors, radius, spacing, typography } from '../../theme';

export default function RatingScreen({ route, navigation }: any) {
  const { orderId } = route.params;
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const rateOrder = useOrdersStore((s) => s.rateOrder);

  const handleSubmit = () => {
    rateOrder(orderId, rating, review);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Rate Your Experience" />
      <View style={styles.body}>
        <Text style={styles.prompt}>How was the service?</Text>
        <View style={styles.starsWrap}>
          <StarRating rating={rating} editable size={36} onChange={setRating} />
        </View>

        <Text style={styles.label}>Add a review (optional)</Text>
        <TextInput
          style={styles.textArea}
          value={review}
          onChangeText={setReview}
          placeholder="Tell us about your experience..."
          placeholderTextColor={colors.textFaint}
          multiline
          numberOfLines={4}
        />

        <PrimaryButton title="Submit Rating" onPress={handleSubmit} style={{ marginTop: spacing.xl }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.xl },
  prompt: { ...typography.h3, color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  starsWrap: { alignItems: 'center', marginBottom: spacing.xl },
  label: { ...typography.captionBold, color: colors.textMuted, marginBottom: spacing.sm },
  textArea: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    ...typography.body,
  },
});
