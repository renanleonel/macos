import { DEFAULT_FINDER_PREFERENCES } from '@/features/finder/domain/constants/default-finder-preferences';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
import { readLocalStorage, writeLocalStorage } from '@/shared/adapters/local-storage';

const FINDER_PREFERENCES_STORAGE_KEY = 'macos27:finder-preferences';

export function readFinderPreferences(): FinderPreferences {
  try {
    const saved = readLocalStorage(FINDER_PREFERENCES_STORAGE_KEY);
    if (!saved) return DEFAULT_FINDER_PREFERENCES;
    return { ...DEFAULT_FINDER_PREFERENCES, ...(JSON.parse(saved) as Partial<FinderPreferences>) };
  } catch {
    return DEFAULT_FINDER_PREFERENCES;
  }
}

export function writeFinderPreferences(preferences: FinderPreferences) {
  writeLocalStorage(FINDER_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
}
