import { createContext, type Dispatch, type SetStateAction } from 'react';

import type { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';
import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';

export type DesktopAppearanceActions = {
  setDark: Dispatch<SetStateAction<boolean>>;
  setAccentColor: (value: AccentColorId) => void;
  setLowPower: Dispatch<SetStateAction<boolean>>;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
  setBrightness: (value: number) => void;
};

export const DesktopAppearanceActionsContext = createContext<DesktopAppearanceActions | null>(null);
