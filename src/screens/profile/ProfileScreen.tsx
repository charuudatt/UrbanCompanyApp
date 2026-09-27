import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { colors, radius, spacing, typography } from '../../theme';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

export default function ProfileScreen({ navigation }: any) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const menuItems: MenuItem[] = [
    { icon: 'location-outline', label: 'Saved Addresses', onPress: () => navigation.navigate('SavedAddresses') },
    {
      icon: 'card-outline',
      label: 'Payment Methods',
      onPress: () => Alert.alert('Payment Methods', 'UPI, Cards and Wallets can be managed here.'),
    },
    {
      icon: 'help-circle-outline',
      label: 'Help & Support',
      onPress: () => Alert.alert('Help & Support', 'Reach us at support@example.com for any assistance.'),
    },
    {
      icon: 'information-circle-outline',
      label: 'About',
      onPress: () => Alert.alert('About', 'A demo beauty & salon booking app built with React Native.'),
    },
    {
      icon: 'log-out-outline',
      label: 'Logout',
      danger: true,
      onPress: () => Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>Account</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) ?? 'U'}</Text>
          </View>
          <View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.phone}>+91 {user?.phone}</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.label} style={styles.menuRow} onPress={item.onPress}>
              <Ionicons name={item.icon} size={20} color={item.danger ? colors.danger : colors.textMuted} />
              <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textFaint} style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.lg },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.lg },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontWeight: '700', fontSize: 22 },
  name: { ...typography.h3, color: colors.text },
  phone: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLabel: { ...typography.body, color: colors.text },
  menuLabelDanger: { color: colors.danger },
});
