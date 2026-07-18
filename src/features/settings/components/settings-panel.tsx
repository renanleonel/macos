import { BatteryCharging } from 'lucide-react';

import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';
import type { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type { SettingsPanel as SettingsPanelModel } from '@/features/settings/domain/models/settings-panel';
import { cn } from '@/shared/utils/cn';

type SettingsPanelProps = {
  selectedSection: SettingsSectionId;
  selectedPanel: SettingsPanelModel;
  lowPower: boolean;
  systemPreferences: SystemPreferences;
  settingChecked: (id: SettingsControlId) => boolean;
  toggleSetting: (id: SettingsControlId) => void;
  updateSystemPreferences: (patch: Partial<SystemPreferences>) => void;
};

export function SettingsPanel({
  selectedSection,
  selectedPanel,
  lowPower,
  systemPreferences,
  settingChecked,
  toggleSetting,
  updateSystemPreferences,
}: SettingsPanelProps) {
  return (
    <>
      {selectedSection === SettingsSectionId.BATTERY ? (
        <section
          className={cn(
            `battery-settings-summary${lowPower ? ' is-low-power' : ''}`,
            '[&.battery-settings-summary]:flex [&.battery-settings-summary]:items-center [&.battery-settings-summary]:gap-3.25 [&.battery-settings-summary]:min-h-18',
            '[&.battery-settings-summary_>_svg]:text-[#48a65d]',
            '[&.battery-settings-summary.is-low-power_>_svg]:text-(--low-power-yellow) [&.battery-settings-summary.is-low-power_>_svg]:filter-[drop-shadow(0_0_5px_oklch(0.82_0.17_85/0.3))]',
            '[&.battery-settings-summary_>_span]:flex [&.battery-settings-summary_>_span]:flex-col',
            '[&.battery-settings-summary_>_span_>_strong]:text-[22px] [&.battery-settings-summary_>_span_>_strong]:[font-variant-numeric:tabular-nums]',
            '[&.battery-settings-summary_small]:text-(--label-secondary)',
          )}
          aria-label='Battery status'
        >
          <BatteryCharging size={34} />
          <span>
            <strong>84%</strong>
            <small>{lowPower ? 'Low Power Mode is active' : 'Power adapter connected'}</small>
          </span>
        </section>
      ) : null}
      <section
        className={cn(
          'settings-list',
          'settings-list--section',
          '[&.settings-list]:p-0!',
          '[&.settings-list_label]:min-h-15.5 [&.settings-list_label]:flex [&.settings-list_label]:items-center [&.settings-list_label]:justify-between [&.settings-list_label]:p-[10px_15px] [&.settings-list_label]:[border-bottom:1px_solid_var(--separator)]',
          '[&.settings-list_.settings-row]:min-h-15.5 [&.settings-list_.settings-row]:flex [&.settings-list_.settings-row]:items-center [&.settings-list_.settings-row]:justify-between [&.settings-list_.settings-row]:p-[10px_15px] [&.settings-list_.settings-row]:[border-bottom:1px_solid_var(--separator)]',
          '[&.settings-list_>_:last-child]:[border-bottom:0]',
          '[&.settings-list_label_>_span]:min-w-0 [&.settings-list_label_>_span]:flex [&.settings-list_label_>_span]:flex-col',
          '[&.settings-list_.settings-row_>_span:first-child]:min-w-0 [&.settings-list_.settings-row_>_span:first-child]:flex [&.settings-list_.settings-row_>_span:first-child]:flex-col',
          '[&.settings-list_small]:text-(--label-secondary) [&.settings-list_small]:leading-[1.35]',
          '[&.settings-list_input]:w-8.5 [&.settings-list_input]:accent-(--system-blue)',
          '[&.settings-list_.accent-control:last-child]:[border-bottom:0]',
          '[&.settings-list--section]:overflow-hidden',
        )}
        key={`${selectedSection}-settings`}
      >
        {selectedPanel.controls.map((control) => (
          <label key={control.id}>
            <span>
              <strong>{control.title}</strong>
              <small>{control.detail}</small>
            </span>
            <input
              type='checkbox'
              checked={settingChecked(control.id)}
              onChange={() => toggleSetting(control.id)}
            />
          </label>
        ))}
        {selectedSection === SettingsSectionId.SOUND ||
        selectedSection === SettingsSectionId.DESKTOP ? (
          <label className="settings-slider-row [&.settings-slider-row]:gap-5 [&.settings-slider-row_input[type='range']]:w-[min(180px,45%)]">
            <span>
              <strong>
                {selectedSection === SettingsSectionId.SOUND ? 'Output volume' : 'Dock size'}
              </strong>
              <small>
                {selectedSection === SettingsSectionId.SOUND
                  ? 'Adjust the level used for interface audio.'
                  : 'Resize application icons in the Dock.'}
              </small>
            </span>
            <input
              aria-label={
                selectedSection === SettingsSectionId.SOUND ? 'Output volume' : 'Dock size'
              }
              type='range'
              min={selectedSection === SettingsSectionId.SOUND ? 0 : 36}
              max={selectedSection === SettingsSectionId.SOUND ? 100 : 64}
              value={
                selectedSection === SettingsSectionId.SOUND
                  ? systemPreferences.volume
                  : systemPreferences.dockSize
              }
              onChange={(event) =>
                updateSystemPreferences(
                  selectedSection === SettingsSectionId.SOUND
                    ? { volume: Number(event.target.value) }
                    : { dockSize: Number(event.target.value) },
                )
              }
            />
          </label>
        ) : null}
      </section>
    </>
  );
}
