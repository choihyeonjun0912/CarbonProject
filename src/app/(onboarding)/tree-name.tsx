import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressDots } from '@/components/ProgressDots';
import { Button } from '@/components/Button';
import { useTreeStore } from '@/store/useTreeStore';
import { getSpecies } from '@/constants/species';
import { colors, typography, spacing, radius, shadows } from '@/constants/tokens';

const MAX_NAME_LENGTH = 20;
const SUGGESTED_NAMES = ['초록이', '포레', '모모', '솔이'];

export default function TreeNameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const draft = useTreeStore((s) => s.draft);
  const setDraftName = useTreeStore((s) => s.setDraftName);

  const [name, setName] = useState(draft.name ?? '');
  const species = getSpecies(draft.species ?? 'pine');

  const canProceed = name.trim().length > 0;

  const handleNext = () => {
    setDraftName(name.trim());
    router.push('/(onboarding)/tree-location');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        {/* Background glows */}
        <View style={styles.glowTopRight} />
        <View style={styles.glowBottomLeft} />

        <ProgressDots current={1} total={3} />

        <View style={styles.content}>
          <View style={styles.speciesInfo}>
            <Text style={styles.emoji}>{species.emoji}</Text>
          </View>

          <Text style={styles.title}>내 나무의 이름을{'\n'}지어주세요.</Text>
          <Text style={styles.subtitle}>
            이름을 지으면 나무가 당신에게{'\n'}말을 걸기 시작합니다.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="나무 이름 입력"
            placeholderTextColor={colors.outline}
            value={name}
            onChangeText={setName}
            maxLength={MAX_NAME_LENGTH}
            autoFocus
          />
          <Text style={styles.counter}>
            {name.length}/{MAX_NAME_LENGTH}
          </Text>

          <View style={styles.suggestions}>
            {SUGGESTED_NAMES.map((s) => (
              <Pressable
                key={s}
                onPress={() => setName(s)}
                style={[
                  styles.chip,
                  name === s && styles.chipActive,
                ]}
              >
                <Text style={[styles.chipText, name === s && styles.chipTextActive]}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="다음"
            onPress={handleNext}
            disabled={!canProceed}
            style={styles.cta}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
  },
  glowTopRight: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.secondaryFixed,
    opacity: 0.15,
  },
  glowBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.primaryFixedDim,
    opacity: 0.15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speciesInfo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emoji: {
    fontSize: 40,
  },
  title: {
    ...typography.hero,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    ...shadows.botanical,
  },
  counter: {
    ...typography.small,
    color: colors.outline,
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceContainerHigh,
  },
  chipActive: {
    backgroundColor: colors.primary,
    ...shadows.botanical,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  chipTextActive: {
    color: colors.onPrimary,
  },
  footer: {
    paddingTop: spacing.lg,
  },
  cta: {
    width: '100%',
  },
});
