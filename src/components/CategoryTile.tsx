import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../types';
import { colors, radius, shadow, spacing, typography } from '../theme';

interface Props {
  category: Category;
  onPress: () => void;
}

export default function CategoryTile({ category, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.iconWrap, { backgroundColor: `${category.color}17` }]}>
        <Ionicons name={category.icon as any} size={26} color={category.color} />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: '25%', alignItems: 'center', marginBottom: spacing.lg, paddingHorizontal: 4 },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    ...shadow.soft,
  },
  name: { ...typography.tiny, color: colors.text, textAlign: 'center' },
});
