import { DEFAULT_SYSTEM_PREFERENCES } from '@/features/desktop/domain/constants/default-system-preferences';
import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';
import { readLocalStorage, writeLocalStorage } from '@/shared/adapters/local-storage';

const SYSTEM_PREFERENCES_STORAGE_KEY = 'macos27:system-preferences';

export function readSystemPreferences(): SystemPreferences {
  try {
    const saved = readLocalStorage(SYSTEM_PREFERENCES_STORAGE_KEY);
    if (!saved) return DEFAULT_SYSTEM_PREFERENCES;
    return {
      ...DEFAULT_SYSTEM_PREFERENCES,
      ...(JSON.parse(saved) as Partial<SystemPreferences>),
    };
  } catch {
    return DEFAULT_SYSTEM_PREFERENCES;
  }
}

export function writeSystemPreferences(preferences: SystemPreferences): void {
  try {
    writeLocalStorage(SYSTEM_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    /* Keep the in-memory preference. */
  }
}
