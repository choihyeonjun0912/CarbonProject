import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import type { Tree, Draft } from '@/types';

interface TreeState {
  tree: Tree | null;
  isOnboarded: boolean;
  draft: Draft;
  setDraftSpecies: (species: Tree['species'], speciesName?: string) => void;
  setDraftName: (name: string) => void;
  setDraftPlanting: (
    plantedAt: string,
    location: string,
    activityType: Tree['activityType'],
  ) => void;
  commitTree: () => void;
  reset: () => void;
}

const initialDraft: Draft = {};

export const useTreeStore = create<TreeState>()(
  persist(
    (set) => ({
      tree: null,
      isOnboarded: false,
      draft: initialDraft,

      setDraftSpecies: (species, speciesName) =>
        set((state) => ({
          draft: { ...state.draft, species, speciesName },
        })),

      setDraftName: (name) =>
        set((state) => ({
          draft: { ...state.draft, name },
        })),

      setDraftPlanting: (plantedAt, location, activityType) =>
        set((state) => ({
          draft: { ...state.draft, plantedAt, location, activityType },
        })),

      commitTree: () =>
        set((state) => {
          const { species, speciesName, name, plantedAt, activityType } =
            state.draft;
          if (!species || !name || !plantedAt || !activityType) return state;

          const tree: Tree = {
            id: uuidv4(),
            name,
            species,
            speciesName: species === 'other' ? speciesName : undefined,
            plantedAt,
            location: state.draft.location ?? '',
            activityType,
          };

          return { tree, isOnboarded: true, draft: initialDraft };
        }),

      reset: () => set({ tree: null, isOnboarded: false, draft: initialDraft }),
    }),
    {
      name: 'tree-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
