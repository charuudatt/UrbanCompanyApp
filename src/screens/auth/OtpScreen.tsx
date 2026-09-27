import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { colors, spacing, typography } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenHeader from '../../components/ScreenHeader';

export default function OtpScreen() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const pendingPhone = useAuthStore((s) => s.pendingPhone);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);

  const handleVerify = () => {
    const ok = verifyOtp(code);
    if (!ok) setError('Enter the 4-digit code sent to you');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Verify OTP" />
      <View style={styles.body}>
        <Text style={styles.subtitle}>
          Enter the 4-digit code sent to{' '}
          <Text style={styles.phone}>+91 {pendingPhone}</Text>
        </Text>

        <TextInput
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={4}
          value={code}
          onChangeText={(t) => {
            setCode(t.replace(/\D/g, ''));
            setError('');
          }}
          placeholder="••••"
          placeholderTextColor={colors.textFaint}
          autoFocus
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.hint}>Demo mode — enter any 4 digits to continue.</Text>

        <PrimaryButton
          title="Verify & Continue"
          onPress={handleVerify}
          disabled={code.length !== 4}
          style={{ marginTop: spacing.xl }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.xl },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.xl, lineHeight: 22 },
  phone: { color: colors.text, fontWeight: '700' },
  otpInput: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    height: 56,
    fontSize: 24,
    letterSpacing: 12,
    textAlign: 'center',
    color: colors.text,
  },
  error: { ...typography.caption, color: colors.danger, marginTop: spacing.sm },
  hint: { ...typography.caption, color: colors.textFaint, marginTop: spacing.sm },
});
