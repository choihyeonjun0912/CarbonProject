import type { TreeSpecies } from '@/types';

export function calcAbsorbed(co2PerYear: number, plantedAt: string): number {
  const days =
    (Date.now() - new Date(plantedAt).getTime()) / (1000 * 60 * 60 * 24);
  return (co2PerYear * Math.max(0, days)) / 365;
}

export function calcAbsorbedFromSpecies(
  species: TreeSpecies,
  plantedAt: string,
): number {
  return calcAbsorbed(species.co2PerYear, plantedAt);
}
