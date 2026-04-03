import { Pressable, Text, View, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius, shadows } from '@/constants/tokens';
import type { TreeSpecies } from '@/types';

interface SpeciesCardProps {
  species: TreeSpecies;
  selected: boolean;
  onPress: () => void;
}

export function SpeciesCard({ species, selected, onPress }: SpeciesCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.selected]}
    >
      <View style={[styles.iconCircle, selected && styles.iconCircleSelected]}>
        <Text style={styles.emoji}>{species.emoji}</Text>
      </View>
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {species.label}
      </Text>
      <Text style={[styles.co2, selected && styles.co2Selected]}>
        {species.co2PerYear} kg/yr
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    alignItems: 'flex-start',
    padding: spacing.lg,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
    gap: spacing.sm,
    ...shadows.botanical,
  },
  selected: {
    backgroundColor: colors.surfaceContainerLowest,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  iconCircleSelected: {
    backgroundColor: colors.primaryFixedDim,
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  selectedLabel: {
    color: colors.primary,
  },
  co2: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSecondaryContainer,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  co2Selected: {
    color: colors.onSecondaryContainer,
  },
});
