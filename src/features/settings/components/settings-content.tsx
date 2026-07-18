import { AppearanceSettings } from '@/features/settings/components/appearance-settings';
import { SettingsHeading } from '@/features/settings/components/settings-heading';
import { SettingsPanel } from '@/features/settings/components/settings-panel';
import { SettingsSidebar } from '@/features/settings/components/settings-sidebar';
import { SETTINGS_PANEL_COPY } from '@/features/settings/domain/constants/settings-panel-copy';
import { SETTINGS_SECTIONS } from '@/features/settings/domain/constants/settings-sections';
import { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type { SettingsPanelSectionId } from '@/features/settings/domain/models/settings-panel';
import { useSettingsActions } from '@/features/settings/hooks/use-settings-actions';
import { useSettingsState } from '@/features/settings/hooks/use-settings-state';
import type { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';
import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';
import { cn } from '@/shared/utils/cn';

type SettingsContentProps = {
  dark: boolean;
  setDark: (value: boolean) => void;
  accentColor: AccentColorId;
  setAccentColor: (value: AccentColorId) => void;
  lowPower: boolean;
  setLowPower: (value: boolean) => void;
  systemPreferences: SystemPreferences;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
};

export function SettingsContent({
  dark,
  setDark,
  accentColor,
  setAccentColor,
  lowPower,
  setLowPower,
  systemPreferences,
  updateSystemPreferences,
}: SettingsContentProps) {
  const { selectedSection, accentOpen, toggleValues } = useSettingsState();
  const { selectSection, toggleAccentPicker, closeAccentPicker, toggleLocalSetting } =
    useSettingsActions();
  const selected =
    SETTINGS_SECTIONS.find((section) => section.id === selectedSection) ?? SETTINGS_SECTIONS[0];
  const selectedPanel = SETTINGS_PANEL_COPY[selectedSection as SettingsPanelSectionId];

  const settingChecked = (id: SettingsControlId) => {
    if (id === SettingsControlId.BATTERY_LOW_POWER) return lowPower;
    if (id === SettingsControlId.DESKTOP_AUTO_HIDE) return systemPreferences.dockAutoHide;
    if (id === SettingsControlId.DESKTOP_RECENTS) return systemPreferences.showRecentApps;
    if (id === SettingsControlId.FOCUS_DO_NOT_DISTURB) return systemPreferences.doNotDisturb;
    return toggleValues[id] ?? false;
  };

  const toggleSetting = (id: SettingsControlId) => {
    if (id === SettingsControlId.BATTERY_LOW_POWER) return setLowPower(!lowPower);
    if (id === SettingsControlId.DESKTOP_AUTO_HIDE)
      return updateSystemPreferences({ dockAutoHide: !systemPreferences.dockAutoHide });
    if (id === SettingsControlId.DESKTOP_RECENTS)
      return updateSystemPreferences({ showRecentApps: !systemPreferences.showRecentApps });
    if (id === SettingsControlId.FOCUS_DO_NOT_DISTURB)
      return updateSystemPreferences({ doNotDisturb: !systemPreferences.doNotDisturb });
    toggleLocalSetting(id);
  };

  return (
    <div
      className={cn(
        'settings-app',
        '[&.settings-app]:h-full [&.settings-app]:flex [&.settings-app]:text-[oklch(0.22_0.01_250)] [&.settings-app]:[background:var(--material-content)]',
        '[&.settings-app_>_aside]:w-56.25 [&.settings-app_>_aside]:flex-[0_0_225px] [&.settings-app_>_aside]:p-[10px_8px] [&.settings-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.settings-app_>_aside]:overflow-auto [&.settings-app_>_aside]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.settings-app_>_aside]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)]',
        '[&.settings-app_aside_nav]:flex [&.settings-app_aside_nav]:flex-col [&.settings-app_aside_nav]:gap-0.5',
        '[&.settings-app_aside_button]:w-full [&.settings-app_aside_button]:h-8 [&.settings-app_aside_button]:flex [&.settings-app_aside_button]:items-center [&.settings-app_aside_button]:gap-2 [&.settings-app_aside_button]:p-[0_8px] [&.settings-app_aside_button]:[border:0] [&.settings-app_aside_button]:rounded-[7px] [&.settings-app_aside_button]:[background:transparent] [&.settings-app_aside_button]:text-left',
        '[&.settings-app_aside_button.selected]:text-[white] [&.settings-app_aside_button.selected]:[background:var(--system-blue-deep)]',
        '[&.settings-app_aside_button.selected_.settings-sidebar-icon]:[background:oklch(1_0_0/0.22)] [&.settings-app_aside_button.selected_.settings-sidebar-icon]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.18)]',
        '[&.settings-app_main]:flex-1 [&.settings-app_main]:p-[24px_28px] [&.settings-app_main]:overflow-auto [&.settings-app_main]:[background:var(--material-content)]',
        '[&.settings-app_h1]:m-0 [&.settings-app_h1]:text-[24px]',
        '[&.settings-app_section]:mb-4.5 [&.settings-app_section]:p-4 [&.settings-app_section]:rounded-xl [&.settings-app_section]:[background:var(--material-raised)] [&.settings-app_section]:[box-shadow:0_1px_3px_oklch(0.16_0.02_250/0.12),inset_0_0_0_1px_oklch(0.3_0.01_250/0.06)]',
        '[&.settings-app_section_h2]:m-[0_0_14px] [&.settings-app_section_h2]:text-[15px]',
        'max-[900px]:[&.settings-app_>_aside]:w-41.25 max-[900px]:[&.settings-app_>_aside]:basis-41.25',
        'max-[600px]:[&.settings-app_>_aside]:hidden',
      )}
    >
      <SettingsSidebar selectedSection={selectedSection} selectSection={selectSection} />
      <main>
        <SettingsHeading selected={selected} description={selectedPanel?.description} />
        {selectedSection === SettingsSectionId.APPEARANCE ? (
          <AppearanceSettings
            dark={dark}
            setDark={setDark}
            accentColor={accentColor}
            setAccentColor={setAccentColor}
            accentOpen={accentOpen}
            toggleAccentPicker={toggleAccentPicker}
            closeAccentPicker={closeAccentPicker}
          />
        ) : (
          <SettingsPanel
            selectedSection={selectedSection}
            selectedPanel={selectedPanel}
            lowPower={lowPower}
            systemPreferences={systemPreferences}
            settingChecked={settingChecked}
            toggleSetting={toggleSetting}
            updateSystemPreferences={updateSystemPreferences}
          />
        )}
      </main>
    </div>
  );
}
