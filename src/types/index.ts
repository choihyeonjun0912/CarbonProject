export interface Tree {
  id: string;
  name: string;
  species: 'pine' | 'oak' | 'acacia' | 'other';
  speciesName?: string;
  plantedAt: string; // ISO string for JSON persistence
  location: string;
  activityType: 'gov' | 'school' | 'personal';
}

export interface TreeSpecies {
  id: Tree['species'];
  label: string;
  emoji: string;
  co2PerYear: number; // kg CO₂ per year
}

export interface Draft {
  species?: Tree['species'];
  speciesName?: string;
  name?: string;
  plantedAt?: string;
  location?: string;
  activityType?: Tree['activityType'];
}
