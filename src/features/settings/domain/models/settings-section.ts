import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';

export type SettingsSection = {
  id: SettingsSectionId;
  label: string;
  tint: string;
};
