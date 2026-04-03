import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { colors, typography, spacing } from '@/constants/tokens';

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + spacing.xxl }]}>
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <View style={styles.hero}>
        <View style={styles.iconOuter}>
          <Text style={styles.emoji}>🌲</Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>
            내가 심은 나무가{'\n'}매일 일합니다.
          </Text>
          <Text style={styles.subtitle}>MY FOREST</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="시작하기"
          onPress={() => router.push('/(onboarding)/tree-select')}
          style={styles.cta}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  glowTopRight: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: colors.secondaryFixed,
    opacity: 0.15,
  },
  glowBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.primaryFixedDim,
    opacity: 0.2,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxl,
    paddingHorizontal: spacing.xxl,
  },
  iconOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surfaceContainerLowest + 'AA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  emoji: {
    fontSize: 56,
  },
  textBlock: {
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    ...typography.hero,
    color: colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.label,
    color: colors.onSurfaceVariant,
    opacity: 0.7,
  },
  footer: {
    paddingHorizontal: spacing.xl,
  },
  cta: {
    width: '100%',
  },
});
