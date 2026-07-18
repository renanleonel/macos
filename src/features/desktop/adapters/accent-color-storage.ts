import { ACCENT_COLORS } from '@/features/desktop/domain/constants/accent-colors';
import { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';
import { readLocalStorage, writeLocalStorage } from '@/shared/adapters/local-storage';

const ACCENT_COLOR_STORAGE_KEY = 'macos27:accent-color';

export function readAccentColor(): AccentColorId {
  try {
    const saved = readLocalStorage(ACCENT_COLOR_STORAGE_KEY) as AccentColorId | null;
    return saved && saved in ACCENT_COLORS ? saved : AccentColorId.BLUE;
  } catch {
    return AccentColorId.BLUE;
  }
}

export function writeAccentColor(accentColor: AccentColorId): void {
  writeLocalStorage(ACCENT_COLOR_STORAGE_KEY, accentColor);
}
