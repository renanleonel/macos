import type { CSSProperties, PointerEvent, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

type DesktopShellProps = {
  children: ReactNode;
  dark: boolean;
  fullscreen: boolean;
  showingDesktop: boolean;
  dockAutoHide: boolean;
  style: CSSProperties;
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
};

export function DesktopShell({
  children,
  dark,
  fullscreen,
  showingDesktop,
  dockAutoHide,
  style,
  onPointerDown,
}: DesktopShellProps) {
  return (
    <main
      className={cn(
        `desktop${dark ? ' desktop--dark' : ''}${fullscreen ? ' desktop--fullscreen' : ''}${showingDesktop ? ' desktop--showing-desktop' : ''}${dockAutoHide ? ' desktop--dock-autohide' : ''}`,
        '[&.desktop]:relative [&.desktop]:w-full [&.desktop]:h-full [&.desktop]:min-w-[320px] [&.desktop]:overflow-hidden [&.desktop]:isolate [&.desktop]:[user-select:none] [&.desktop]:text-(--label-primary) [&.desktop]:scheme-light',
        "[&.desktop::before]:[content:''] [&.desktop::before]:absolute [&.desktop::before]:inset-0 [&.desktop::before]:z-[-1] [&.desktop::before]:[background:oklch(0.08_0.03_245/0)] [&.desktop::before]:pointer-events-none [&.desktop::before]:[transition:background_240ms_var(--ease-mac)]",
        '[&.desktop:not(.desktop--showing-desktop)_.app-window]:delay-[0ms]',
        'contrast-more:[&.desktop]:[--separator:oklch(0.25_0.008_250/0.54)] contrast-more:[&.desktop]:[--glass-stroke:oklch(1_0_0/0.72)]',
        '[&.desktop--dark::before]:[background:oklch(0.08_0.03_245/0.46)]',
        '[&.desktop--dark_.menu-bar]:text-[white] [&.desktop--dark_.menu-bar]:[background:linear-gradient(180deg,oklch(1_0_0/0.045),transparent_42%),var(--glass-clear)] [&.desktop--dark_.menu-bar]:[--control-center-knob:oklch(0.13_0.008_250)]',
        '[&.desktop--dark_.widget]:text-[white] [&.desktop--dark_.widget]:[background:oklch(0.19_0.01_250/0.78)]',
        '[&.desktop--dark_.widget_small]:text-[oklch(0.8_0.01_250)]',
        '[&.desktop--dark_.widget-heading-button_>_span]:text-[oklch(0.8_0.12_235)]',
        '[&.desktop--dark_.widget--today_label.is-complete_>_span]:text-[oklch(0.68_0.01_250)]',
        '[&.desktop--dark_.app-window]:[--glass-strong:var(--material-content)] [&.desktop--dark_.app-window]:text-(--label-primary) [&.desktop--dark_.app-window]:[background:var(--material-content)] [&.desktop--dark_.app-window]:[box-shadow:0_26px_64px_oklch(0.01_0.005_250/0.58),0_5px_18px_oklch(0.01_0.005_250/0.42),inset_0_0_0_1px_var(--glass-stroke)]',
        '[&.desktop--dark_.window-titlebar]:[background:linear-gradient(180deg,oklch(1_0_0/0.035),transparent_42%),var(--material-toolbar)]',
        '[&.desktop--dark_.finder-sidebar]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]',
        '[&.desktop--dark_.finder-content]:text-(--label-primary) [&.desktop--dark_.finder-content]:[background:var(--material-content)]',
        '[&.desktop--dark_.dock]:[background:linear-gradient(145deg,oklch(1_0_0/0.1),oklch(0.12_0.02_250/0.1)),var(--glass-clear)]',
        '[&.desktop--dark_.dock-item_>_i]:[background:white]',
        '[&.desktop--dark]:[--system-blue:#0091ff] [&.desktop--dark]:[--system-blue-deep:#087bd9] [&.desktop--dark]:[--label-primary:oklch(0.955_0.004_250)] [&.desktop--dark]:[--label-secondary:oklch(0.75_0.006_250)] [&.desktop--dark]:[--label-tertiary:oklch(0.61_0.006_250)] [&.desktop--dark]:[--label-quaternary:oklch(0.5_0.006_250)] [&.desktop--dark]:[--window-frame-text:var(--label-primary)] [&.desktop--dark]:[--text-color:var(--label-primary)] [&.desktop--dark]:[--placeholder-text:var(--label-tertiary)] [&.desktop--dark]:[--disabled-control-text:oklch(0.7_0.005_250/0.48)] [&.desktop--dark]:[--window-background:oklch(0.17_0.007_250)] [&.desktop--dark]:[--control-background:oklch(1_0_0/0.1)] [&.desktop--dark]:[--text-background:oklch(0.135_0.006_250)] [&.desktop--dark]:[--under-page-background:oklch(0.1_0.006_250)] [&.desktop--dark]:[--control-hover:oklch(1_0_0/0.16)] [&.desktop--dark]:[--control-active:oklch(1_0_0/0.22)] [&.desktop--dark]:[--unemphasized-selection:oklch(0.38_0.008_250/0.78)] [&.desktop--dark]:[--selected-control-text:white] [&.desktop--dark]:[--keyboard-focus:#5cb8ff] [&.desktop--dark]:[--link-color:#5ac8fa] [&.desktop--dark]:[--ink:var(--label-primary)] [&.desktop--dark]:[--muted:var(--label-secondary)] [&.desktop--dark]:[--glass-clear:oklch(0.15_0.014_250/0.48)] [&.desktop--dark]:[--glass-regular:oklch(0.18_0.009_250/0.82)] [&.desktop--dark]:[--material-titlebar:oklch(0.19_0.008_250/0.94)] [&.desktop--dark]:[--material-toolbar:oklch(0.19_0.008_250/0.92)] [&.desktop--dark]:[--material-sidebar:oklch(0.17_0.009_250/0.9)] [&.desktop--dark]:[--material-menu:oklch(0.19_0.008_250/0.9)] [&.desktop--dark]:[--material-popover:oklch(0.2_0.008_250/0.94)] [&.desktop--dark]:[--material-content:var(--text-background)] [&.desktop--dark]:[--material-raised:oklch(0.22_0.007_250/0.98)] [&.desktop--dark]:[--material-status:oklch(0.19_0.006_250/0.96)] [&.desktop--dark]:[--glass-highlight:oklch(1_0_0/0.13)] [&.desktop--dark]:[--glass-stroke:oklch(1_0_0/0.16)] [&.desktop--dark]:[--separator:oklch(0.78_0.01_250/0.2)] [&.desktop--dark]:text-(--label-primary) [&.desktop--dark]:scheme-dark',
        '[&.desktop--dark_.app-window::before]:[background:linear-gradient(90deg,transparent,oklch(1_0_0/0.12)_18%,oklch(1_0_0/0.12)_82%,transparent)]',
        '[&.desktop--dark_.app-window.is-inactive]:filter-[saturate(0.65)_brightness(0.92)]',
        '[&.desktop--dark_.app-window.is-inactive_.window-titlebar]:text-[oklch(0.65_0.008_250)] [&.desktop--dark_.app-window.is-inactive_.window-titlebar]:[background:oklch(0.18_0.008_250/0.94)]',
        '[&.desktop--dark_.app-window.is-inactive_.traffic]:[background:oklch(0.39_0.008_250)]',
        '[&.desktop--dark_.finder-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.035),transparent_42%),var(--material-toolbar)]',
        '[&.desktop--dark_.safari-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.035),transparent_42%),var(--material-toolbar)]',
        '[&.desktop--dark_.notes-list]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]',
        '[&.desktop--dark_.photos-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]',
        '[&.desktop--dark_.settings-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]',
        '[&.desktop--dark_.messages-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.06),transparent_52%),var(--material-sidebar)]',
        '[&.desktop--dark_.finder-files]:text-(--label-primary) [&.desktop--dark_.finder-files]:[background:var(--material-content)]',
        '[&.desktop--dark_.notes-app]:text-(--label-primary) [&.desktop--dark_.notes-app]:[background:var(--material-content)]',
        '[&.desktop--dark_.note-editor]:text-(--label-primary) [&.desktop--dark_.note-editor]:[background:var(--material-content)]',
        '[&.desktop--dark_.photos-app]:text-(--label-primary) [&.desktop--dark_.photos-app]:[background:var(--material-content)]',
        '[&.desktop--dark_.photos-app_main]:text-(--label-primary) [&.desktop--dark_.photos-app_main]:[background:var(--material-content)]',
        '[&.desktop--dark_.messages-app]:text-(--label-primary) [&.desktop--dark_.messages-app]:[background:var(--material-content)]',
        '[&.desktop--dark_.messages-app_main]:text-(--label-primary) [&.desktop--dark_.messages-app_main]:[background:var(--material-content)]',
        '[&.desktop--dark_.settings-app]:text-(--label-primary) [&.desktop--dark_.settings-app]:[background:var(--material-content)]',
        '[&.desktop--dark_.settings-app_main]:text-(--label-primary) [&.desktop--dark_.settings-app_main]:[background:var(--material-content)]',
        '[&.desktop--dark_.about-app]:text-(--label-primary) [&.desktop--dark_.about-app]:[background:var(--material-content)]',
        '[&.desktop--dark_.finder-status]:text-(--label-secondary) [&.desktop--dark_.finder-status]:[background:var(--material-status)]',
        '[&.desktop--dark_.finder-toolbar-popover]:text-(--label-primary) [&.desktop--dark_.finder-toolbar-popover]:[background:linear-gradient(145deg,oklch(1_0_0/0.07),transparent_48%),var(--material-popover)]',
        '[&.desktop--dark_.finder-toolbar-popover_button:hover]:text-(--label-primary) [&.desktop--dark_.finder-toolbar-popover_button:hover]:[background:var(--control-hover)] [&.desktop--dark_.finder-toolbar-popover_button:hover]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.13)]',
        '[&.desktop--dark_.finder-preview]:text-(--label-primary) [&.desktop--dark_.finder-preview]:[background:var(--material-raised)]',
        '[&.desktop--dark_.finder-files--list_.finder-item:nth-child(even)]:[background:oklch(1_0_0/0.035)]',
        '[&.desktop--dark_.finder-files--gallery]:[background:linear-gradient(180deg,var(--material-content),var(--under-page-background))]',
        '[&.desktop--dark_.finder-files--gallery_.finder-item]:[background:var(--material-raised)]',
        '[&.desktop--dark_.settings-app_section]:[background:var(--material-raised)]',
        '[&.desktop--dark_.finder-sidebar_button.selected]:text-[white] [&.desktop--dark_.finder-sidebar_button.selected]:[background:oklch(0.56_0.16_247/0.68)]',
        '[&.desktop--dark_.photos-app_aside_button.selected]:text-[white] [&.desktop--dark_.photos-app_aside_button.selected]:[background:oklch(0.56_0.16_247/0.68)]',
        '[&.desktop--dark_.finder-search]:text-[white] [&.desktop--dark_.finder-search]:[background:oklch(1_0_0/0.09)]',
        '[&.desktop--dark_.address-bar]:text-[white] [&.desktop--dark_.address-bar]:[background:oklch(1_0_0/0.09)]',
        '[&.desktop--dark_.help-search]:text-[white] [&.desktop--dark_.help-search]:[background:oklch(1_0_0/0.09)]',
        '[&.desktop--dark_.messages-app_form_input]:text-[white] [&.desktop--dark_.messages-app_form_input]:[background:oklch(1_0_0/0.09)]',
        '[&.desktop--dark_.view-switcher]:[background:oklch(1_0_0/0.08)]',
        '[&.desktop--dark_.view-switcher_button.selected]:[background:oklch(1_0_0/0.16)]',
        '[&.desktop--dark_.dock-tooltip]:text-[oklch(0.96_0.004_250)] [&.desktop--dark_.dock-tooltip]:[background:oklch(0.19_0.008_250/0.94)] [&.desktop--dark_.dock-tooltip]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.16),0_5px_12px_oklch(0.01_0.01_250/0.4)]',
        '[&.desktop--dark_.control-grid_button]:bg-[oklch(1_0_0/0.1)] [&.desktop--dark_.control-grid_button]:text-(--label-primary) [&.desktop--dark_.control-grid_button]:bg-[linear-gradient(145deg,oklch(1_0_0/0.1),oklch(1_0_0/0)_62%)]',
        '[&.desktop--dark_.slider-control]:bg-[oklch(1_0_0/0.1)]',
        '[&.desktop--dark_.system-menu]:text-(--label-primary) [&.desktop--dark_.system-menu]:[background:linear-gradient(145deg,oklch(1_0_0/0.07),transparent_48%),var(--material-menu)]',
        '[&.desktop--dark_.control-center]:text-(--label-primary) [&.desktop--dark_.control-center]:[background:linear-gradient(145deg,oklch(1_0_0/0.07),transparent_48%),var(--material-menu)]',
        '[&.desktop--dark_.spotlight]:text-(--label-primary) [&.desktop--dark_.spotlight]:[background:linear-gradient(145deg,oklch(1_0_0/0.07),transparent_48%),var(--material-menu)]',
        '[&.desktop--dark_.control-grid_button:hover]:text-[oklch(0.98_0_0)] [&.desktop--dark_.control-grid_button:hover]:bg-[oklch(1_0_0/0.17)] [&.desktop--dark_.control-grid_button:hover]:bg-[linear-gradient(145deg,oklch(1_0_0/0.1),oklch(1_0_0/0)_62%)] [&.desktop--dark_.control-grid_button:hover]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.18),inset_0_1px_oklch(1_0_0/0.2),0_5px_13px_oklch(0.02_0.01_250/0.2)]',
        '[&.desktop--dark_.bubble]:text-[white] [&.desktop--dark_.bubble]:[background:oklch(0.28_0.01_250)]',
        '[&.desktop--dark_.bubble--sent]:[background:var(--system-blue-deep)]',
        '[&.desktop--dark_.sidebar-heading]:text-(--label-secondary)',
        '[&.desktop--dark_.settings-user_small]:text-(--label-secondary)',
        '[&.desktop--dark_.settings-list_small]:text-(--label-secondary)',
        '[&.desktop--dark_.note-row_span]:text-(--label-secondary)',
        '[&.desktop--dark_.note-row_p]:text-(--label-secondary)',
        '[&.desktop--dark_.note-editor_time]:text-(--label-secondary)',
        '[&.desktop--dark_.photos-heading_p]:text-(--label-secondary)',
        '[&.desktop--dark_.messages-app_main_header_small]:text-(--label-secondary)',
        '[&.desktop--dark_.conversation_time]:text-(--label-secondary)',
        '[&.desktop--dark_.finder-item\\_\\_metadata]:text-(--label-secondary)',
        'contrast-more:[&.desktop--dark]:[--separator:oklch(0.9_0.004_250/0.42)] contrast-more:[&.desktop--dark]:[--glass-stroke:oklch(1_0_0/0.32)]',
        '[&.desktop--fullscreen_.menu-bar]:hidden',
        '[&.desktop--fullscreen_.dock]:hidden',
        '[&.desktop--fullscreen_.dock-hotzone]:hidden',
        '[&.desktop--dock-autohide_.dock]:opacity-[0] [&.desktop--dock-autohide_.dock]:pointer-events-none [&.desktop--dock-autohide_.dock]:transform-[translate3d(-50%,calc(100%+18px),0)] [&.desktop--dock-autohide_.dock]:ease-[ease-in,ease-in]',
        '[&.desktop--dock-autohide_.dock-hotzone:hover+.dock]:opacity-[1] [&.desktop--dock-autohide_.dock-hotzone:hover+.dock]:pointer-events-auto [&.desktop--dock-autohide_.dock-hotzone:hover+.dock]:transform-[translateX(-50%)] [&.desktop--dock-autohide_.dock-hotzone:hover+.dock]:ease-[ease-out,var(--ease-mac)]',
        '[&.desktop--dock-autohide_.dock:hover]:opacity-[1] [&.desktop--dock-autohide_.dock:hover]:pointer-events-auto [&.desktop--dock-autohide_.dock:hover]:transform-[translateX(-50%)] [&.desktop--dock-autohide_.dock:hover]:ease-[ease-out,var(--ease-mac)]',
        '[&.desktop--dock-autohide_.dock:focus-within]:opacity-[1] [&.desktop--dock-autohide_.dock:focus-within]:pointer-events-auto [&.desktop--dock-autohide_.dock:focus-within]:transform-[translateX(-50%)] [&.desktop--dock-autohide_.dock:focus-within]:ease-[ease-out,var(--ease-mac)]',
        '[&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:transform-(--desktop-reveal-transform)! [&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:filter-[saturate(0.82)_brightness(0.94)] [&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:pointer-events-none [&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:delay-[calc(var(--desktop-reveal-index,0)*16ms)] [&.desktop--showing-desktop_.app-window:not(.is-minimized):not(.is-maximized)]:will-change-[transform,filter]',
        "max-[900px]:[&.desktop--showing-desktop_.app-window[data-desktop-edge='left']]:transform-[translate3d(calc(-100%+44px),0,0)]!",
        "max-[900px]:[&.desktop--showing-desktop_.app-window[data-desktop-edge='right']]:transform-[translate3d(calc(100%-44px),0,0)]!",
        "max-[900px]:[&.desktop--showing-desktop_.app-window[data-desktop-edge='top']]:transform-[translate3d(0,calc(-100%+44px),0)]!",
        "max-[900px]:[&.desktop--showing-desktop_.app-window[data-desktop-edge='bottom']]:transform-[translate3d(0,calc(100%-44px),0)]!",
        'motion-reduce:[&.desktop--showing-desktop_.app-window]:delay-[0ms]!',
      )}
      style={style}
      onPointerDown={onPointerDown}
    >
      {children}
    </main>
  );
}
