import type { WindowState } from '@/features/window-manager/domain/models/window-state';
import { cn } from '@/shared/utils/cn';

type SystemStatusWidgetProps = {
  windows: WindowState[];
  dark: boolean;
  lowPower: boolean;
  brightness: number;
  openSettings: () => void;
};

export function SystemStatusWidget({
  windows,
  dark,
  lowPower,
  brightness,
  openSettings,
}: SystemStatusWidgetProps) {
  const runningApps = windows.filter((window) => !window.minimized).length;
  const headingClass = cn(
    'widget-heading-button',
    '[&.widget-heading-button]:w-full [&.widget-heading-button]:flex [&.widget-heading-button]:items-baseline [&.widget-heading-button]:justify-between [&.widget-heading-button]:m-[0_0_6px] [&.widget-heading-button]:p-0 [&.widget-heading-button]:[border:0] [&.widget-heading-button]:text-inherit [&.widget-heading-button]:[background:transparent] [&.widget-heading-button]:font-bold [&.widget-heading-button]:text-left [&.widget-heading-button]:cursor-default [&.widget-heading-button]:[transition:scale_120ms_ease-out]',
    '[&.widget-heading-button_>_span]:text-(--system-blue-deep) [&.widget-heading-button_>_span]:text-[9px] [&.widget-heading-button_>_span]:font-semibold',
    '[&.widget-heading-button:active]:scale-[0.98]',
  );
  const rowClass = cn(
    'system-widget-row',
    '[&.system-widget-row]:w-full [&.system-widget-row]:min-h-7 [&.system-widget-row]:flex [&.system-widget-row]:items-center [&.system-widget-row]:justify-between [&.system-widget-row]:p-0 [&.system-widget-row]:[border:0] [&.system-widget-row]:[border-bottom:1px_solid_oklch(0.3_0.01_250/0.1)] [&.system-widget-row]:text-inherit [&.system-widget-row]:[background:transparent] [&.system-widget-row]:text-left [&.system-widget-row]:cursor-default [&.system-widget-row]:[transition:scale_120ms_ease-out]',
    '[&.system-widget-row_strong]:text-[11px] [&.system-widget-row_strong]:font-semibold',
    '[&.system-widget-row_strong.is-low-power]:text-(--low-power-yellow)',
    '[&.system-widget-row:active]:scale-[0.98]',
  );
  return (
    <section
      className={cn(
        'widget',
        'widget--system',
        '[&.widget]:min-w-0 [&.widget]:h-37 [&.widget]:p-[14px_12px] [&.widget]:overflow-hidden [&.widget]:rounded-2xl [&.widget]:[background:linear-gradient(145deg,oklch(1_0_0/0.7),oklch(0.965_0.012_245/0.57)),var(--glass-regular)] [&.widget]:[backdrop-filter:blur(30px)_saturate(1.35)] [&.widget]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_5px_12px_oklch(0.08_0.03_245/0.16)] [&.widget]:text-[13px] [&.widget]:pointer-events-auto [&.widget]:[-webkit-backdrop-filter:blur(30px)_saturate(1.35)]',
        '[&.widget_small]:text-[oklch(0.5_0.01_250)]',
        '[&.widget--system]:col-span-full [&.widget--system]:h-40 [&.widget--system]:py-3',
        '[&.widget--system_>_small]:block [&.widget--system_>_small]:mt-2',
      )}
      aria-label='Live system status'
    >
      <button type='button' className={headingClass} onClick={openSettings}>
        System Status <span>Open Settings</span>
      </button>
      <button type='button' className={rowClass} onClick={openSettings}>
        <span>Appearance</span>
        <strong>{dark ? 'Dark' : 'Light'}</strong>
      </button>
      <button type='button' className={rowClass} onClick={openSettings}>
        <span>Display</span>
        <strong>{brightness}%</strong>
      </button>
      <button type='button' className={rowClass} onClick={openSettings}>
        <span>Battery</span>
        <strong className={cn(lowPower ? 'is-low-power' : '')}>
          {lowPower ? 'Low Power' : '84%'}
        </strong>
      </button>
      <small>
        {runningApps} {runningApps === 1 ? 'app' : 'apps'} active
      </small>
    </section>
  );
}
