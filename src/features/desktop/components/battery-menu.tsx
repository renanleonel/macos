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
    <SystemMenu className='status-menu battery-menu [&.status-menu]:w-65 [&.battery-menu]:right-54.5'>
      <div
        className={cn(
          `battery-summary${lowPower ? ' is-low-power' : ''}`,
          '[&.battery-summary_small]:text-[oklch(0.49_0.01_250)] [&.battery-summary_small]:text-[11px] [&.battery-summary_small]:font-normal',
          '[&.battery-summary]:min-h-13 [&.battery-summary]:flex [&.battery-summary]:items-center [&.battery-summary]:gap-2.75 [&.battery-summary]:p-[4px_8px]',
          '[&.battery-summary_>_span]:flex [&.battery-summary_>_span]:flex-col',
          '[&.battery-summary.is-low-power_>_svg]:text-(--low-power-yellow) [&.battery-summary.is-low-power_>_svg]:filter-[drop-shadow(0_0_4px_oklch(0.82_0.17_85/0.28))]',
        )}
      >
        <BatteryCharging size={32} />
        <span>
          <strong>Battery</strong>
          <small>{lowPower ? '84% · Low Power Mode' : '84% · Power Adapter'}</small>
        </span>
      </div>
      <hr />
      <div
        className={cn(
          'status-menu__heading',
          '[&.status-menu\\_\\_heading]:min-h-10 [&.status-menu\\_\\_heading]:flex [&.status-menu\\_\\_heading]:items-center [&.status-menu\\_\\_heading]:justify-between [&.status-menu\\_\\_heading]:p-[4px_8px]',
          '[&.status-menu\\_\\_heading_>_span]:flex [&.status-menu\\_\\_heading_>_span]:flex-col',
          '[&.status-menu\\_\\_heading_small]:text-[oklch(0.49_0.01_250)] [&.status-menu\\_\\_heading_small]:text-[11px] [&.status-menu\\_\\_heading_small]:font-normal',
        )}
      >
        <span>
          <strong>Low Power Mode</strong>
          <small>Reduces energy use</small>
        </span>
        <button
          type='button'
          className={cn(
            `mac-switch${lowPower ? ' is-on' : ''}`,
            '[&.mac-switch]:relative [&.mac-switch]:w-9.5! [&.mac-switch]:min-h-5.5! [&.mac-switch]:flex-[0_0_38px] [&.mac-switch]:p-0! [&.mac-switch]:rounded-[999px]! [&.mac-switch]:[background:oklch(0.76_0.01_250)]! [&.mac-switch]:[transition:background-color_150ms_ease-out]',
            '[&.mac-switch_i]:absolute [&.mac-switch_i]:top-0.5 [&.mac-switch_i]:left-0.5 [&.mac-switch_i]:w-4.5 [&.mac-switch_i]:h-4.5 [&.mac-switch_i]:rounded-[50%] [&.mac-switch_i]:[background:white] [&.mac-switch_i]:[box-shadow:0_1px_3px_oklch(0.2_0.01_250/0.3)] [&.mac-switch_i]:[transition:transform_170ms_var(--ease-mac)]',
            '[&.mac-switch.is-on]:[background:var(--system-blue-deep)]!',
            '[&.mac-switch.is-on_i]:transform-[translateX(16px)]',
          )}
          aria-label='Toggle Low Power Mode'
          aria-pressed={lowPower}
          onClick={() => setLowPower(!lowPower)}
        >
          <i />
        </button>
      </div>
      <hr />
      <button type='button' onClick={() => openSettings(SettingsSectionId.BATTERY)}>
        Battery Settings…
      </button>
    </SystemMenu>
  );
}
