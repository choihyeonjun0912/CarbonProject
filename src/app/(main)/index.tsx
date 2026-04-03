import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTreeStore } from '@/store/useTreeStore';
import { getSpecies } from '@/constants/species';
import { calcAbsorbed } from '@/utils/carbon';
import { colors, typography, spacing, radius, shadows } from '@/constants/tokens';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tree = useTreeStore((s) => s.tree);

  if (!tree) return null;

  const species = getSpecies(tree.species);
  const absorbed = calcAbsorbed(species.co2PerYear, tree.plantedAt);
  const days = Math.floor(
    (Date.now() - new Date(tree.plantedAt).getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xxl }]}>
      {/* Background glow */}
      <View style={styles.glow} />

      <View style={styles.header}>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveBadgeText}>LIVE MONITORING</Text>
        </View>
        <Text style={styles.heroTitle}>{tree.name}'s Growth</Text>
        <Text style={styles.heroSubtitle}>실시간 누적 탄소 흡수량</Text>
      </View>

      <View style={styles.carbonCard}>
        <Text style={styles.carbonLabel}>Carbon Absorbed</Text>
        <View style={styles.carbonRow}>
          <Text style={styles.carbonValue}>{absorbed.toFixed(3)}</Text>
          <Text style={styles.carbonUnit}>kg</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>{species.emoji}</Text>
          <Text style={styles.statValue}>{tree.name}</Text>
          <Text style={styles.statLabel}>{species.label}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📅</Text>
          <Text style={styles.statValue}>{days}일</Text>
          <Text style={styles.statLabel}>함께한 날</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>더 많은 기능이 곧 추가됩니다</Text>
        <Text style={styles.infoBody}>
          독백, 성장 그래프, 탄소 계산기, 공유 카드 등{'\n'}다양한 기능이 준비 중입니다.
        </Text>
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
  glow: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.secondaryFixed,
    opacity: 0.15,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
  },
  liveBadgeText: {
    ...typography.label,
    color: colors.onSecondaryContainer,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1.5,
    color: colors.primary,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
  },
  carbonCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '30',
    marginBottom: spacing.lg,
    ...shadows.botanical,
  },
  carbonLabel: {
    ...typography.label,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.sm,
  },
  carbonRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  carbonValue: {
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: -2,
    color: colors.primary,
  },
  carbonUnit: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginLeft: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant + '20',
    ...shadows.botanical,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    ...typography.small,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: colors.primaryContainer,
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  infoTitle: {
    ...typography.h2,
    color: colors.onPrimary,
    marginBottom: spacing.sm,
  },
  infoBody: {
    ...typography.body,
    color: colors.primaryFixed,
    opacity: 0.8,
  },
});
