import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radius, typography } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'outline';
  style?: ViewStyle;
}

export default function PrimaryButton({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  style,
}: Props) {
  const isOutline = variant === 'outline';

  if (isOutline) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.base, styles.outline, (disabled || loading) && styles.disabled, style]}
      >
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Text style={[styles.text, styles.textOutline]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[(disabled || loading) && styles.disabled, style]}
    >
      <LinearGradient
        colors={gradients.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.base}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={[styles.text, styles.textSolid]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  outline: { backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.primary },
  disabled: { opacity: 0.5 },
  text: { ...typography.bodyBold },
  textSolid: { color: colors.white },
  textOutline: { color: colors.primary },
});
