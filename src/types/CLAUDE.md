# Types

## Interfaces
- **Tree** — id, name, species (union: pine/oak/acacia/other), speciesName?, plantedAt (ISO string), location, activityType (gov/school/personal)
- **TreeSpecies** — id, label, emoji, co2PerYear
- **Draft** — all Tree fields optional, used during onboarding

`plantedAt` is always ISO string, never Date object (JSON persistence requirement).
