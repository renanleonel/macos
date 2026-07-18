import type { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';
import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';

export type DesktopAppearanceState = {
  dark: boolean;
  accentColor: AccentColorId;
  lowPower: boolean;
  systemPreferences: SystemPreferences;
  brightness: number;
};
