import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressDots } from '@/components/ProgressDots';
import { SpeciesCard } from '@/components/SpeciesCard';
import { Button } from '@/components/Button';
import { SPECIES } from '@/constants/species';
import { useTreeStore } from '@/store/useTreeStore';
import { colors, typography, spacing, radius } from '@/constants/tokens';
import type { Tree } from '@/types';

export default function TreeSelectScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const draft = useTreeStore((s) => s.draft);
  const setDraftSpecies = useTreeStore((s) => s.setDraftSpecies);

  const [selected, setSelected] = useState<Tree['species'] | null>(
    draft.species ?? null,
  );
  const [customName, setCustomName] = useState(draft.speciesName ?? '');

  const isOther = selected === 'other';
  const canProceed = selected !== null && (!isOther || customName.trim().length > 0);

  const handleNext = () => {
    if (!selected) return;
    setDraftSpecies(selected, isOther ? customName.trim() : undefined);
    router.push('/(onboarding)/tree-name');
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl },
      ]}
    >
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ProgressDots current={0} total={3} />

        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>STEP 01 • SELECTION</Text>
        </View>

        <Text style={styles.title}>어떤 나무를{'\n'}심었나요?</Text>
        <Text style={styles.description}>
          식재하신 나무의 종류를 선택해 주세요.{'\n'}종류별 탄소 흡수량을 자동으로 계산해 드립니다.
        </Text>

        <View style={styles.grid}>
          {SPECIES.map((sp) => (
            <SpeciesCard
              key={sp.id}
              species={sp}
              selected={selected === sp.id}
              onPress={() => setSelected(sp.id)}
            />
          ))}
        </View>

        {isOther && (
          <TextInput
            style={styles.input}
            placeholder="나무 종류를 입력해주세요"
            placeholderTextColor={colors.outline}
            value={customName}
            onChangeText={setCustomName}
            maxLength={20}
          />
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="다음"
          onPress={handleNext}
          disabled={!canProceed}
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
    paddingHorizontal: spacing.xl,
  },
  scroll: {
    flex: 1,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryFixed,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  stepBadgeText: {
    ...typography.label,
    color: colors.primary,
  },
  title: {
    ...typography.hero,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  input: {
    ...typography.body,
    height: 56,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    paddingTop: spacing.lg,
  },
  cta: {
    width: '100%',
  },
});
