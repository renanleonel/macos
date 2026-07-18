import { SettingsContent } from '@/features/settings/components/settings-content';
import { SettingsProvider } from '@/features/settings/containers/settings-provider';
import type { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';
import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';

export type SettingsContainerProps = {
  dark: boolean;
  setDark: (value: boolean) => void;
  accentColor: AccentColorId;
  setAccentColor: (value: AccentColorId) => void;
  selectedSection: SettingsSectionId;
  setSelectedSection: (value: SettingsSectionId) => void;
  lowPower: boolean;
  setLowPower: (value: boolean) => void;
  systemPreferences: SystemPreferences;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
};

export function SettingsContainer({
  selectedSection,
  setSelectedSection,
  ...contentProps
}: SettingsContainerProps) {
  return (
    <SettingsProvider selectedSection={selectedSection} setSelectedSection={setSelectedSection}>
      <SettingsContent {...contentProps} />
    </SettingsProvider>
  );
}
