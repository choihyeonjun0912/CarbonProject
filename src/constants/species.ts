import type { TreeSpecies } from '@/types';

export const SPECIES: TreeSpecies[] = [
  { id: 'pine', label: '소나무', emoji: '🌲', co2PerYear: 6.6 },
  { id: 'oak', label: '참나무', emoji: '🌳', co2PerYear: 14.0 },
  { id: 'acacia', label: '아까시나무', emoji: '🌿', co2PerYear: 8.8 },
  { id: 'other', label: '기타', emoji: '🌱', co2PerYear: 8.0 },
];

export function getSpecies(id: string): TreeSpecies {
  return SPECIES.find((s) => s.id === id) ?? SPECIES[3];
}
