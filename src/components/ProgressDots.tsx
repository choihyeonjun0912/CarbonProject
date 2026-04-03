import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '@/constants/tokens';

interface ProgressDotsProps {
  current: number; // 0-indexed
  total: number;
}

export function ProgressDots({ current, total }: ProgressDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[styles.dot, i === current ? styles.active : styles.inactive]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  dot: {
    height: 5,
    borderRadius: 3,
  },
  active: {
    width: 32,
    backgroundColor: colors.primary,
  },
  inactive: {
    width: 20,
    backgroundColor: colors.primaryFixed,
  },
});
