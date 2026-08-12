import { Moon, Search, Wifi } from 'lucide-react';

import { AppleMark } from '@/features/desktop/components/apple-mark';
import { BatteryStatusGlyph } from '@/features/desktop/components/battery-status-glyph';
import { ControlCenterGlyph } from '@/features/desktop/components/control-center-glyph';
import {
  APPLICATION_MENUS,
  FINDER_MENUS,
  MENU_OVERLAYS,
} from '@/features/desktop/domain/constants/menu-overlays';
import { OverlayId } from '@/features/desktop/domain/enums/overlay-id';
import type { Overlay } from '@/features/desktop/domain/models/overlay';
import { useClock } from '@/features/desktop/hooks/use-clock';
import { APPLICATION_REGISTRY } from '@/shared/domain/constants/application-registry';
import { AppId } from '@/shared/domain/enums/app-id';
import { cn } from '@/shared/utils/cn';

type MenuBarProps = {
  activeApp: AppId;
  overlay: Overlay;
  onOverlay: (overlay: Overlay) => void;
  lowPower: boolean;
  doNotDisturb: boolean;
  setDoNotDisturb: (value: boolean) => void;
};

export function MenuBar({
  activeApp,
  overlay,
  onOverlay,
  lowPower,
  doNotDisturb,
  setDoNotDisturb,
}: MenuBarProps) {
  const now = useClock();
  const application = APPLICATION_REGISTRY[activeApp];
  const title = application.menuBarLabel ?? application.label;
  const menus = activeApp === AppId.FINDER ? FINDER_MENUS : APPLICATION_MENUS;
  return (
    <header
      className={cn(
        'menu-bar',
        // Tahoe's menu bar has no material — no fill, no blur, no divider — and
        // macOS picks glyph colour from the wallpaper's luminance. The top band of
        // this wallpaper is dark ocean, so the glyphs are white over a soft scrim
        // rather than dark over a light one.
        '[&.menu-bar]:fixed [&.menu-bar]:inset-[0_0_auto] [&.menu-bar]:z-700 [&.menu-bar]:h-7 [&.menu-bar]:flex [&.menu-bar]:items-stretch [&.menu-bar]:justify-between [&.menu-bar]:p-[0_8px] [&.menu-bar]:text-[white] [&.menu-bar]:text-[13px] [&.menu-bar]:[--control-center-knob:oklch(0.16_0.01_250)] [&.menu-bar]:px-1.75 [&.menu-bar]:[background:linear-gradient(180deg,oklch(0.14_0.02_250/0.42),oklch(0.14_0.02_250/0.16)_62%,transparent)] [&.menu-bar]:[text-shadow:0_1px_2px_oklch(0.1_0.02_250/0.55),0_0_10px_oklch(0.1_0.02_250/0.4)]',
        '[&.menu-bar_nav]:flex [&.menu-bar_nav]:items-stretch',
        '[&.menu-bar_button]:h-7 [&.menu-bar_button]:p-[0_12px] [&.menu-bar_button]:[border:0] [&.menu-bar_button]:[background:transparent] [&.menu-bar_button]:rounded-[9px] [&.menu-bar_button]:cursor-default [&.menu-bar_button]:whitespace-nowrap [&.menu-bar_button]:[transition:background-color_160ms_var(--ease-mac),box-shadow_160ms_var(--ease-mac)]',
        // Hovering a menu title materialises a small glass pill under it.
        '[&.menu-bar_button:hover]:[background:oklch(1_0_0/0.18)] [&.menu-bar_button:hover]:[backdrop-filter:blur(16px)_saturate(1.3)] [&.menu-bar_button:hover]:[-webkit-backdrop-filter:blur(16px)_saturate(1.3)] [&.menu-bar_button:hover]:[box-shadow:inset_0_1px_oklch(1_0_0/0.28),inset_0_0_0_1px_oklch(1_0_0/0.16)]',
        '[&.menu-bar_.active-app-name]:font-bold [&.menu-bar_.active-app-name]:px-[9px_12px]',
        '[&.menu-bar_.menu-clock]:p-[0_4px_0_10px] [&.menu-bar_.menu-clock]:[font-variant-numeric:tabular-nums]',
        '[&.menu-bar_.battery-status]:[transition:color_180ms_ease-out,filter_180ms_ease-out]',
        '[&.menu-bar_.battery-status.is-low-power]:text-(--low-power-yellow) [&.menu-bar_.battery-status.is-low-power]:filter-[drop-shadow(0_0_4px_oklch(0.82_0.17_85/0.28))]',
        "[&.menu-bar_button[aria-expanded='true']]:[background:oklch(1_0_0/0.24)] [&.menu-bar_button[aria-expanded='true']]:[backdrop-filter:blur(16px)_saturate(1.3)] [&.menu-bar_button[aria-expanded='true']]:[-webkit-backdrop-filter:blur(16px)_saturate(1.3)] [&.menu-bar_button[aria-expanded='true']]:[box-shadow:inset_0_1px_oklch(1_0_0/0.34),inset_0_0_0_1px_oklch(1_0_0/0.2)]",
        '[@media(prefers-reduced-transparency:_reduce)]:[&.menu-bar]:[text-shadow:none] [@media(prefers-reduced-transparency:_reduce)]:[&.menu-bar]:text-(--label-primary) [@media(prefers-reduced-transparency:_reduce)]:[&.menu-bar]:[background:var(--window-background)]',
      )}
      aria-label='macOS menu bar'
    >
      <nav
        className='menu-bar__left [&.menu-bar\\_\\_left_.brand-button]:w-9 [&.menu-bar\\_\\_left_.brand-button]:p-[0_10px] [&.menu-bar\\_\\_left_.brand-button]:px-2.25 max-[900px]:[&.menu-bar\\_\\_left_button:not(.brand-button):not(.active-app-name)]:hidden'
        aria-label='Application menu'
      >
        <button
          type='button'
          className='brand-button [&.brand-button_svg]:w-4.25 [&.brand-button_svg]:h-4.25 [&.brand-button_svg]:fill-[currentColor] [&.brand-button_svg]:transform-[translateY(-0.2px)]'
          aria-label='Portfolio menu'
          onClick={() => onOverlay(overlay === OverlayId.APPLE ? null : OverlayId.APPLE)}
        >
          <AppleMark />
        </button>
        <button type='button' className='active-app-name' onClick={() => onOverlay(null)}>
          {title}
        </button>
        {menus.map((menu) => {
          const target = MENU_OVERLAYS[menu];
          return (
            <button
              type='button'
              key={menu}
              aria-expanded={overlay === target}
              onClick={() => onOverlay(overlay === target ? null : target)}
            >
              {menu}
            </button>
          );
        })}
      </nav>
      <nav
        className='menu-bar__right [&.menu-bar\\_\\_right]:ml-auto [&.menu-bar\\_\\_right_button]:grid [&.menu-bar\\_\\_right_button]:place-items-center [&.menu-bar\\_\\_right_button]:px-2.25 max-[900px]:[&.menu-bar\\_\\_right_>_button:nth-child(-n+2)]:hidden max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:max-w-23 max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:overflow-hidden max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:pl-1.75 max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:text-[12px] max-[600px]:[&.menu-bar\\_\\_right_.menu-clock]:text-clip'
        aria-label='System status'
      >
        {doNotDisturb ? (
          <button
            type='button'
            className='focus-status'
            aria-label='Do Not Disturb is on'
            onClick={() => setDoNotDisturb(false)}
          >
            <Moon size={14} fill='currentColor' />
          </button>
        ) : null}
        <button
          type='button'
          aria-label='Wi-Fi'
          aria-expanded={overlay === OverlayId.WIFI}
          onClick={() => onOverlay(overlay === OverlayId.WIFI ? null : OverlayId.WIFI)}
        >
          <Wifi size={15} strokeWidth={1.8} />
        </button>
        <button
          type='button'
          className={cn(`battery-status${lowPower ? ' is-low-power' : ''}`)}
          aria-label='Battery, 84 percent'
          aria-expanded={overlay === OverlayId.BATTERY}
          onClick={() => onOverlay(overlay === OverlayId.BATTERY ? null : OverlayId.BATTERY)}
        >
          <BatteryStatusGlyph />
        </button>
        <button
          type='button'
          aria-label='Spotlight'
          onClick={() => onOverlay(overlay === OverlayId.SPOTLIGHT ? null : OverlayId.SPOTLIGHT)}
        >
          <Search size={15} />
        </button>
        <button
          type='button'
          aria-label='Siri'
          aria-expanded={overlay === OverlayId.SIRI}
          className='siri-orb [&.siri-orb_span]:w-3.75 [&.siri-orb_span]:h-3.75 [&.siri-orb_span]:rounded-[50%] [&.siri-orb_span]:[background:conic-gradient(from_210deg,oklch(0.74_0.2_160),oklch(0.73_0.2_230),oklch(0.65_0.23_310),oklch(0.72_0.22_25),oklch(0.78_0.19_80),oklch(0.74_0.2_160))] [&.siri-orb_span]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.35)] max-[900px]:[&.siri-orb]:hidden'
          onClick={() => onOverlay(overlay === OverlayId.SIRI ? null : OverlayId.SIRI)}
        >
          <span />
        </button>
        <button
          type='button'
          aria-label='Control Center'
          onClick={() => onOverlay(overlay === OverlayId.CONTROL ? null : OverlayId.CONTROL)}
        >
          <ControlCenterGlyph />
        </button>
        <button
          type='button'
          className='menu-clock'
          aria-label='Notifications'
          onClick={() =>
            onOverlay(overlay === OverlayId.NOTIFICATIONS ? null : OverlayId.NOTIFICATIONS)
          }
        >
          {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
          {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </button>
      </nav>
    </header>
  );
}
