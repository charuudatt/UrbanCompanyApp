import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { colors, fontFamily, gradients, radius, shadow, spacing, typography } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');
  const requestOtp = useAuthStore((s) => s.requestOtp);

  const canContinue = phone.replace(/\D/g, '').length === 10;

  const handleContinue = () => {
    requestOtp(phone);
    navigation.navigate('Otp');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://picsum.photos/seed/beauty-hero/800/900' }}
        style={styles.hero}
      >
        <LinearGradient colors={gradients.hero} style={styles.heroOverlay}>
          <SafeAreaView edges={['top']}>
            <Text style={styles.wordmark}>Blume</Text>
            <Text style={styles.tagline}>Salon & spa, at your doorstep</Text>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>

      <KeyboardAvoidingView
        style={styles.sheet}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
          <Text style={styles.title}>Get Started</Text>
          <Text style={styles.subtitle}>
            Makeup, salon, spa & grooming — booked in minutes.
          </Text>

          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputRow}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={10}
              placeholder="98765 43210"
              placeholderTextColor={colors.textFaint}
              value={phone}
              onChangeText={(t) => setPhone(t.replace(/\D/g, ''))}
            />
          </View>

          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            disabled={!canContinue}
            style={{ marginTop: spacing.xl }}
          />

          <Text style={styles.terms}>
            By continuing, you agree to our Terms of Service & Privacy Policy.
          </Text>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { height: '42%', justifyContent: 'flex-end' },
  heroOverlay: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: spacing.xl, paddingBottom: spacing.xl },
  wordmark: {
    fontFamily: fontFamily.displayExtraBold,
    fontSize: 40,
    color: colors.white,
    marginBottom: 4,
  },
  tagline: { ...typography.body, color: colors.white, opacity: 0.9 },
  sheet: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    marginTop: -28,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    ...shadow.card,
  },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.xl, lineHeight: 22 },
  label: { ...typography.captionBold, color: colors.textMuted, marginBottom: spacing.sm },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  prefix: { ...typography.bodyBold, color: colors.text, marginRight: spacing.sm },
  input: { flex: 1, height: 52, ...typography.body, color: colors.text },
  terms: { ...typography.tiny, color: colors.textFaint, marginTop: spacing.lg, textAlign: 'center' },
});
