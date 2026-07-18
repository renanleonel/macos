import { createContext } from 'react';

import type { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';

export type SettingsActionsContextValue = {
  selectSection: (section: SettingsSectionId) => void;
  toggleAccentPicker: () => void;
  closeAccentPicker: () => void;
  toggleLocalSetting: (controlId: SettingsControlId) => void;
};

export const SettingsActionsContext = createContext<SettingsActionsContextValue | undefined>(
  undefined,
);
