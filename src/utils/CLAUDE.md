# Utils

## carbon.ts
- `calcAbsorbed(co2PerYear, plantedAt)` — kg CO2 absorbed since planting
- `calcAbsorbedFromSpecies(species, plantedAt)` — wrapper using TreeSpecies object
- Formula: `co2PerYear * max(0, daysSincePlanting) / 365`
