import type { CSSProperties, ReactNode } from 'react';

import { WindowTitleBar } from '@/features/window-manager/components/window-title-bar';
import { desktopRevealTransform } from '@/features/window-manager/domain/desktop-reveal-transform';
import type { DesktopRevealEdge } from '@/features/window-manager/domain/enums/desktop-reveal-edge';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';
import { useWindowInteractions } from '@/features/window-manager/hooks/use-window-interactions';
import { cn } from '@/shared/utils/cn';

type AppWindowProps = {
  window: WindowState;
  active: boolean;
  desktopRevealed: boolean;
  revealEdge: DesktopRevealEdge;
  revealIndex: number;
  focusWindow: (id: number) => void;
  closeWindow: (id: number) => void;
  moveWindow: (id: number, x: number, y: number) => void;
  minimizeWindow: (id: number) => void;
  toggleMaximizeWindow: (id: number) => void;
  children: ReactNode;
};

export function AppWindow({
  window,
  active,
  desktopRevealed,
  revealEdge,
  revealIndex,
  focusWindow,
  closeWindow,
  moveWindow,
  minimizeWindow,
  toggleMaximizeWindow,
  children,
}: AppWindowProps) {
  const { windowElement, onPointerDown, onPointerMove, onPointerUp, toggleMaximize } =
    useWindowInteractions({ window, moveWindow, toggleMaximizeWindow });

  const windowStyle: CSSProperties & {
    '--desktop-reveal-transform': string;
    '--desktop-reveal-index': number;
  } = {
    ...(window.maximized
      ? { zIndex: window.z }
      : {
          left: window.x,
          top: window.y,
          width: window.width,
          height: window.height,
          zIndex: window.z,
        }),
    '--desktop-reveal-transform': desktopRevealTransform(window, revealEdge),
    '--desktop-reveal-index': revealIndex,
  };

  return (
    <section
      ref={windowElement}
      className={cn(
        `app-window app-window--${window.app}${active ? ' is-active' : ' is-inactive'}${window.minimized ? ' is-minimized' : ''}${window.maximized ? ' is-maximized' : ''}`,
        '[&.app-window]:absolute [&.app-window]:z-100 [&.app-window]:flex [&.app-window]:flex-col [&.app-window]:min-w-107.5 [&.app-window]:min-h-75 [&.app-window]:overflow-hidden [&.app-window]:rounded-[18px] [&.app-window]:[background:var(--material-content)] [&.app-window]:[box-shadow:var(--shadow),inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight)] [&.app-window]:origin-[bottom_center] [&.app-window]:animate-[window-open_220ms_var(--ease-mac)] [&.app-window]:[transition:opacity_160ms_ease-in,transform_220ms_var(--ease-mac),filter_180ms_ease-out,box-shadow_180ms_ease-out] [&.app-window]:[backdrop-filter:none] [&.app-window]:[-webkit-backdrop-filter:none]',
        '[&.app-window.is-minimized]:opacity-[0] [&.app-window.is-minimized]:transform-[translateY(calc(100vh-80px))_scale(0.08)] [&.app-window.is-minimized]:pointer-events-none',
        '[&.app-window.is-maximized]:inset-0 [&.app-window.is-maximized]:w-auto [&.app-window.is-maximized]:h-auto [&.app-window.is-maximized]:rounded-none',
        '[&.app-window.is-dragging]:[transition:none] [&.app-window.is-dragging]:will-change-transform',
        '[&.app-window.is-dragging_.window-titlebar]:cursor-grabbing',
        "[&.app-window::before]:[content:''] [&.app-window::before]:absolute [&.app-window::before]:z-30 [&.app-window::before]:inset-[0_18px_auto] [&.app-window::before]:h-px [&.app-window::before]:[background:linear-gradient(90deg,transparent,var(--glass-highlight)_18%,var(--glass-highlight)_82%,transparent)] [&.app-window::before]:pointer-events-none",
        '[&.app-window.is-inactive]:filter-[saturate(0.78)] [&.app-window.is-inactive]:[box-shadow:var(--shadow-inactive),inset_0_0_0_1px_oklch(1_0_0/0.36)]',
        '[&.app-window.is-inactive_.window-titlebar]:text-[oklch(0.42_0.01_250)] [&.app-window.is-inactive_.window-titlebar]:[background:oklch(0.91_0.006_250/0.93)] [&.app-window.is-inactive_.window-titlebar]:[backdrop-filter:blur(18px)_saturate(0.8)]',
        '[&.app-window.is-inactive_.traffic]:[background:oklch(0.71_0.008_250)] [&.app-window.is-inactive_.traffic]:[box-shadow:inset_0_0_0_0.5px_oklch(0.2_0.01_250/0.18)]',
        '[&.app-window.is-inactive_.traffic::before]:opacity-[0]',
        '[&.app-window.is-inactive_.traffic::after]:opacity-[0]',
        'contrast-more:[&.app-window]:[outline:1px_solid_var(--separator)]',
        'max-[900px]:[&.app-window:not(.is-maximized)]:inset-[34px_8px_82px]! max-[900px]:[&.app-window:not(.is-maximized)]:w-auto! max-[900px]:[&.app-window:not(.is-maximized)]:h-auto! max-[900px]:[&.app-window:not(.is-maximized)]:min-w-0 max-[900px]:[&.app-window:not(.is-maximized)]:min-h-0',
        'max-[900px]:[&.app-window.is-maximized]:inset-0! max-[900px]:[&.app-window.is-maximized]:w-auto! max-[900px]:[&.app-window.is-maximized]:h-auto! max-[900px]:[&.app-window.is-maximized]:min-w-0 max-[900px]:[&.app-window.is-maximized]:min-h-0',
      )}
      style={windowStyle}
      data-desktop-edge={revealEdge}
      aria-hidden={desktopRevealed || undefined}
      onPointerDown={() => focusWindow(window.id)}
      aria-label={`${window.title} window`}
    >
      <WindowTitleBar
        title={window.title}
        maximized={window.maximized}
        close={() => closeWindow(window.id)}
        minimize={() => minimizeWindow(window.id)}
        toggleMaximize={toggleMaximize}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      <div className='window-body [&.window-body]:flex-1 [&.window-body]:min-h-0 [&.window-body]:overflow-hidden'>
        {children}
      </div>
    </section>
  );
}
