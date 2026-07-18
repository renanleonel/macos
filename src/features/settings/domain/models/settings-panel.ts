import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type { SettingsControl } from '@/features/settings/domain/models/settings-control';

export type SettingsPanelSectionId = Exclude<SettingsSectionId, SettingsSectionId.APPEARANCE>;

export type SettingsPanel = {
  description: string;
  controls: SettingsControl[];
};
