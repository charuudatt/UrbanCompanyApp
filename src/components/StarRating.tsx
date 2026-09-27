import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';

interface Props {
  rating: number;
  size?: number;
  showValue?: boolean;
  editable?: boolean;
  onChange?: (value: number) => void;
}

export default function StarRating({ rating, size = 14, showValue, editable, onChange }: Props) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={styles.row}>
      {stars.map((s) => {
        const filled = s <= Math.round(rating);
        const Star = (
          <Ionicons
            key={s}
            name={filled ? 'star' : 'star-outline'}
            size={size}
            color={colors.star}
            style={{ marginRight: 2 }}
          />
        );
        if (!editable) return Star;
        return (
          <TouchableOpacity key={s} onPress={() => onChange?.(s)} hitSlop={8}>
            {Star}
          </TouchableOpacity>
        );
      })}
      {showValue && <Text style={styles.value}>{rating.toFixed(1)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  value: { ...typography.captionBold, color: colors.text, marginLeft: 4 },
});
