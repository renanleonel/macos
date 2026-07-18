import { Check, ChevronRight } from 'lucide-react';

import { ACCENT_COLORS } from '@/features/desktop/domain/constants/accent-colors';
import type { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';
import { cn } from '@/shared/utils/cn';

type AppearanceSettingsProps = {
  dark: boolean;
  setDark: (value: boolean) => void;
  accentColor: AccentColorId;
  setAccentColor: (value: AccentColorId) => void;
  accentOpen: boolean;
  toggleAccentPicker: () => void;
  closeAccentPicker: () => void;
};

export function AppearanceSettings({
  dark,
  setDark,
  accentColor,
  setAccentColor,
  accentOpen,
  toggleAccentPicker,
  closeAccentPicker,
}: AppearanceSettingsProps) {
  return (
    <>
      <section>
        <h2>Appearance</h2>
        <div
          className={cn(
            'appearance-choices',
            '[&.appearance-choices]:flex [&.appearance-choices]:gap-3.75',
            '[&.appearance-choices_button]:flex [&.appearance-choices_button]:flex-col [&.appearance-choices_button]:items-center [&.appearance-choices_button]:gap-1.75 [&.appearance-choices_button]:p-1.25 [&.appearance-choices_button]:[border:2px_solid_transparent] [&.appearance-choices_button]:rounded-[10px] [&.appearance-choices_button]:[background:transparent] [&.appearance-choices_button]:text-[12px]',
            '[&.appearance-choices_button.selected]:border-(--system-blue)',
          )}
        >
          <button
            type='button'
            onClick={() => setDark(false)}
            className={cn(!dark ? 'selected' : '')}
            aria-pressed={!dark}
          >
            <span className='appearance-preview appearance-preview--light [&.appearance-preview]:w-27.5 [&.appearance-preview]:h-17.5 [&.appearance-preview]:rounded-[7px] [&.appearance-preview]:[background:linear-gradient(145deg,oklch(0.97_0_0)_0_30%,oklch(0.8_0.02_250)_30%_33%,oklch(0.91_0.01_250)_33%)] [&.appearance-preview]:[box-shadow:inset_0_0_0_1px_oklch(0.3_0.01_250/0.2)]' />
            Light
          </button>
          <button
            type='button'
            onClick={() => setDark(true)}
            className={cn(dark ? 'selected' : '')}
            aria-pressed={dark}
          >
            <span
              className={cn(
                'appearance-preview',
                'appearance-preview--dark',
                '[&.appearance-preview]:w-27.5 [&.appearance-preview]:h-17.5 [&.appearance-preview]:rounded-[7px] [&.appearance-preview]:[background:linear-gradient(145deg,oklch(0.97_0_0)_0_30%,oklch(0.8_0.02_250)_30%_33%,oklch(0.91_0.01_250)_33%)] [&.appearance-preview]:[box-shadow:inset_0_0_0_1px_oklch(0.3_0.01_250/0.2)]',
                '[&.appearance-preview--dark]:[background:linear-gradient(145deg,oklch(0.18_0.01_250)_0_30%,oklch(0.42_0.02_250)_30%_33%,oklch(0.28_0.01_250)_33%)]',
              )}
            />
            Dark
          </button>
        </div>
      </section>
      <section
        className={cn(
          'settings-list',
          '[&.settings-list]:p-0!',
          '[&.settings-list_label]:min-h-15.5 [&.settings-list_label]:flex [&.settings-list_label]:items-center [&.settings-list_label]:justify-between [&.settings-list_label]:p-[10px_15px] [&.settings-list_label]:[border-bottom:1px_solid_var(--separator)]',
          '[&.settings-list_.settings-row]:min-h-15.5 [&.settings-list_.settings-row]:flex [&.settings-list_.settings-row]:items-center [&.settings-list_.settings-row]:justify-between [&.settings-list_.settings-row]:p-[10px_15px] [&.settings-list_.settings-row]:[border-bottom:1px_solid_var(--separator)]',
          '[&.settings-list_>_:last-child]:[border-bottom:0]',
          '[&.settings-list_label_>_span]:min-w-0 [&.settings-list_label_>_span]:flex [&.settings-list_label_>_span]:flex-col',
          '[&.settings-list_.settings-row_>_span:first-child]:min-w-0 [&.settings-list_.settings-row_>_span:first-child]:flex [&.settings-list_.settings-row_>_span:first-child]:flex-col',
          '[&.settings-list_small]:text-(--label-secondary) [&.settings-list_small]:leading-[1.35]',
          '[&.settings-list_input]:w-8.5 [&.settings-list_input]:accent-(--system-blue)',
          '[&.settings-list_.accent-control:last-child]:[border-bottom:0]',
        )}
        key='appearance-settings'
      >
        <div
          className={cn(
            'accent-control',
            '[&.accent-control]:[border-bottom:1px_solid_var(--separator)]',
            '[&.accent-control_.settings-row]:[border-bottom:0]',
          )}
        >
          <button
            type='button'
            className='settings-row settings-row--button [&.settings-row--button]:w-full [&.settings-row--button]:[border:0] [&.settings-row--button]:text-inherit [&.settings-row--button]:[background:transparent] [&.settings-row--button]:text-left'
            aria-expanded={accentOpen}
            aria-controls='accent-color-picker'
            onClick={toggleAccentPicker}
          >
            <span>
              <strong>Accent color</strong>
              <small>{ACCENT_COLORS[accentColor].label} is used for selections and controls.</small>
            </span>
            <span className='accent-value [&.accent-value]:flex! [&.accent-value]:flex-row! [&.accent-value]:items-center [&.accent-value]:gap-2'>
              <i
                className='accent-dot [&.accent-dot]:w-6 [&.accent-dot]:h-6 [&.accent-dot]:rounded-[50%] [&.accent-dot]:[background:var(--system-blue)] [&.accent-dot]:[box-shadow:inset_0_0_0_2px_oklch(1_0_0/0.5)]'
                style={{ background: ACCENT_COLORS[accentColor].color }}
              />
              <ChevronRight size={15} aria-hidden='true' />
            </span>
          </button>
          {accentOpen ? (
            <dialog
              className={cn(
                'accent-picker',
                '[&.accent-picker]:p-[12px_15px_15px] [&.accent-picker]:[border-bottom:1px_solid_var(--separator)] [&.accent-picker]:animate-[accent-picker-in_150ms_var(--ease-mac)_both] [&.accent-picker]:static [&.accent-picker]:w-auto [&.accent-picker]:max-w-none [&.accent-picker]:m-0 [&.accent-picker]:[border:0] [&.accent-picker]:text-inherit [&.accent-picker]:[background:transparent]',
                '[&.accent-picker_>_strong]:block [&.accent-picker_>_strong]:mb-2.5 [&.accent-picker_>_strong]:text-[12px]',
                '[&.accent-picker_>_div]:flex [&.accent-picker_>_div]:flex-wrap [&.accent-picker_>_div]:gap-3',
                '[&.accent-picker_button]:min-w-11 [&.accent-picker_button]:flex [&.accent-picker_button]:flex-col [&.accent-picker_button]:items-center [&.accent-picker_button]:gap-1.25 [&.accent-picker_button]:p-0 [&.accent-picker_button]:[border:0] [&.accent-picker_button]:[background:transparent]',
                '[&.accent-picker_button_>_span]:w-7 [&.accent-picker_button_>_span]:h-7 [&.accent-picker_button_>_span]:grid [&.accent-picker_button_>_span]:place-items-center [&.accent-picker_button_>_span]:rounded-[50%] [&.accent-picker_button_>_span]:text-[white] [&.accent-picker_button_>_span]:[box-shadow:inset_0_0_0_2px_oklch(1_0_0/0.52),0_1px_3px_oklch(0.15_0.02_250/0.2)]',
                "[&.accent-picker_button[aria-pressed='true']_>_span]:[outline:2px_solid_var(--system-blue)] [&.accent-picker_button[aria-pressed='true']_>_span]:outline-offset-2",
                '[&.accent-picker_button_small]:text-[10px]',
              )}
              id='accent-color-picker'
              aria-label='Accent color'
              open
            >
              <strong>Accent color</strong>
              <div>
                {(
                  Object.entries(ACCENT_COLORS) as [
                    AccentColorId,
                    (typeof ACCENT_COLORS)[AccentColorId],
                  ][]
                ).map(([id, accent]) => (
                  <button
                    type='button'
                    key={id}
                    aria-label={`${accent.label} accent color`}
                    aria-pressed={accentColor === id}
                    onClick={() => {
                      setAccentColor(id);
                      closeAccentPicker();
                    }}
                  >
                    <span style={{ background: accent.color }}>
                      {accentColor === id ? <Check size={14} /> : null}
                    </span>
                    <small>{accent.label}</small>
                  </button>
                ))}
              </div>
            </dialog>
          ) : null}
        </div>
        <label>
          <span>
            <strong>Allow wallpaper tinting</strong>
            <small>Windows adapt to the desktop behind them.</small>
          </span>
          <input type='checkbox' defaultChecked />
        </label>
      </section>
    </>
  );
}
