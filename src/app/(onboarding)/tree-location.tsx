import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ProgressDots } from '@/components/ProgressDots';
import { Button } from '@/components/Button';
import { useTreeStore } from '@/store/useTreeStore';
import { colors, typography, spacing, radius, shadows } from '@/constants/tokens';
import type { Tree } from '@/types';

const ACTIVITY_TYPES: { id: Tree['activityType']; label: string; emoji: string }[] = [
  { id: 'gov', label: '정부/지자체', emoji: '🏛️' },
  { id: 'school', label: '학교/단체', emoji: '🏫' },
  { id: 'personal', label: '개인', emoji: '🙋' },
];

export default function TreeLocationScreen() {
  const insets = useSafeAreaInsets();
  const draft = useTreeStore((s) => s.draft);
  const setDraftPlanting = useTreeStore((s) => s.setDraftPlanting);
  const commitTree = useTreeStore((s) => s.commitTree);

  const [date, setDate] = useState(
    draft.plantedAt ? new Date(draft.plantedAt) : new Date(),
  );
  const [activity, setActivity] = useState<Tree['activityType'] | null>(
    draft.activityType ?? null,
  );
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');

  const canProceed = activity !== null;

  const onDateChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleComplete = () => {
    if (!activity) return;
    setDraftPlanting(date.toISOString(), '', activity);
    commitTree();
  };

  const formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl },
      ]}
    >
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ProgressDots current={2} total={3} />

        <View style={styles.header}>
          <Text style={styles.title}>언제, 어디서{'\n'}심었나요?</Text>
          <Text style={styles.subtitle}>
            당신의 소중한 시작을 기억할게요.{'\n'}나무의 첫 터전을 알려주세요.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DATE OF PLANTING</Text>

          {Platform.OS === 'android' && (
            <Pressable style={styles.dateButton} onPress={() => setShowPicker(true)}>
              <Text style={styles.dateText}>{formattedDate}</Text>
            </Pressable>
          )}

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={new Date()}
              onChange={onDateChange}
              locale="ko"
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACTIVITY TYPE</Text>
          <View style={styles.activityRow}>
            {ACTIVITY_TYPES.map((at) => (
              <Pressable
                key={at.id}
                style={[
                  styles.activityChip,
                  activity === at.id && styles.activityChipActive,
                ]}
                onPress={() => setActivity(at.id)}
              >
                <Text style={styles.activityEmoji}>{at.emoji}</Text>
                <Text
                  style={[
                    styles.activityLabel,
                    activity === at.id && styles.activityLabelActive,
                  ]}
                >
                  {at.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={`${draft.name ?? '나무'} 등록 완료`}
          onPress={handleComplete}
          disabled={!canProceed}
          style={styles.cta}
        />
        <Text style={styles.footerHint}>
          나중에 설정에서 정보를 수정할 수 있습니다.
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
  scroll: {
    flex: 1,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.hero,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.md,
    marginLeft: 2,
  },
  dateButton: {
    height: 56,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.onSurface,
  },
  activityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceContainerHigh,
  },
  activityChipActive: {
    backgroundColor: colors.primary,
    ...shadows.botanical,
  },
  activityEmoji: {
    fontSize: 16,
  },
  activityLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  activityLabelActive: {
    color: colors.onPrimary,
  },
  footer: {
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  cta: {
    width: '100%',
  },
  footerHint: {
    ...typography.small,
    color: colors.outline,
    marginTop: spacing.md,
  },
});
