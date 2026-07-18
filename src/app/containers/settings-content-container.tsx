import { useDesktopAppearanceActions } from '@/features/desktop/hooks/use-desktop-appearance-actions';
import { useDesktopAppearanceState } from '@/features/desktop/hooks/use-desktop-appearance-state';
import { SettingsContainer } from '@/features/settings/containers/settings-container';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';

type SettingsContentContainerProps = {
  settingsSection: SettingsSectionId;
  setSettingsSection: (section: SettingsSectionId) => void;
};

export function SettingsContentContainer({
  settingsSection,
  setSettingsSection,
}: SettingsContentContainerProps) {
  const { dark, accentColor, lowPower, systemPreferences } = useDesktopAppearanceState();
  const { setDark, setAccentColor, setLowPower, updateSystemPreferences } =
    useDesktopAppearanceActions();

  return (
    <SettingsContainer
      dark={dark}
      setDark={setDark}
      accentColor={accentColor}
      setAccentColor={setAccentColor}
      selectedSection={settingsSection}
      setSelectedSection={setSettingsSection}
      lowPower={lowPower}
      setLowPower={setLowPower}
      systemPreferences={systemPreferences}
      updateSystemPreferences={updateSystemPreferences}
    />
  );
}
