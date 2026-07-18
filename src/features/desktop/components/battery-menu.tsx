import { BatteryCharging } from 'lucide-react';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { cn } from '@/shared/utils/cn';
type BatteryMenuProps = {
  openSettings: (section: SettingsSectionId) => void;
  lowPower: boolean;
  setLowPower: (value: boolean) => void;
};
export function BatteryMenu({ openSettings, lowPower, setLowPower }: BatteryMenuProps) {
  return (
    <SystemMenu className='status-menu battery-menu w-65! [&.battery-menu]:right-54.5'>
      <div
        className={cn(
          `battery-summary${lowPower ? ' is-low-power' : ''}`,
          'min-h-13 flex items-center gap-2.75 p-[4px_8px]',
          '[&_small]:text-[oklch(0.49_0.01_250)] [&_small]:text-[11px] [&_small]:font-normal',
          '[&.battery-summary.is-low-power_>_svg]:text-(--low-power-yellow) [&.battery-summary.is-low-power_>_svg]:filter-[drop-shadow(0_0_4px_oklch(0.82_0.17_85/0.28))]',
        )}
      >
        <BatteryCharging size={32} />
        <span className='flex flex-col'>
          <strong>Battery</strong>
          <small>{lowPower ? '84% · Low Power Mode' : '84% · Power Adapter'}</small>
        </span>
      </div>
      <hr />
      <div
        className={cn(
          'status-menu__heading',
          'min-h-10 flex items-center justify-between gap-3 p-[4px_8px]',
          '[&_small]:text-[oklch(0.49_0.01_250)] [&_small]:text-[11px] [&_small]:font-normal',
        )}
      >
        <span className='min-w-0 flex flex-col'>
          <strong>Low Power Mode</strong>
          <small>Reduces energy use</small>
        </span>
        <button
          type='button'
          className={cn(
            'mac-switch relative w-9.5 min-h-5.5 flex-[0_0_38px] p-0 rounded-[999px] [background:oklch(0.76_0.01_250)] [transition:background-color_150ms_ease-out]',
            lowPower ? '[background:var(--system-blue-deep)]' : '',
          )}
          aria-label='Toggle Low Power Mode'
          aria-pressed={lowPower}
          onClick={() => setLowPower(!lowPower)}
        >
          <i
            className={cn(
              'absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-[50%] [background:white] [box-shadow:0_1px_3px_oklch(0.2_0.01_250/0.3)] [transition:transform_170ms_var(--ease-mac)]',
              lowPower ? 'translate-x-4' : '',
            )}
          />
        </button>
      </div>
      <hr />
      <button type='button' onClick={() => openSettings(SettingsSectionId.BATTERY)}>
        Battery Settings…
      </button>
    </SystemMenu>
  );
}
