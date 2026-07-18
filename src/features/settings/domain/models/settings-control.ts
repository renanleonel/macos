import type { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';

export type SettingsControl = {
  id: SettingsControlId;
  title: string;
  detail: string;
  defaultChecked: boolean;
};
