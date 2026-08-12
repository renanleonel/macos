import type { CSSProperties } from 'react';

import { DOCK_APPLICATIONS } from '@/features/desktop/domain/constants/dock-applications';
import { APPLICATION_REGISTRY } from '@/shared/domain/constants/application-registry';
import { AppIcon } from '@/shared/components/app-icon';
import { AppId } from '@/shared/domain/enums/app-id';
import { DockUtilityId } from '@/shared/domain/enums/dock-utility-id';
import type { DockId } from '@/shared/domain/models/dock-id';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';
import { GLASS_DOCK, GLASS_REDUCED_TRANSPARENCY } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type DockProps = {
  windows: WindowState[];
  launch: (app: DockId) => void;
  size: number;
  showRecentApps: boolean;
};

export function Dock({ windows, launch, size, showRecentApps }: DockProps) {
  const visibleApps = showRecentApps
    ? [
        ...DOCK_APPLICATIONS.slice(0, -1),
        { id: AppId.ABOUT, label: APPLICATION_REGISTRY[AppId.ABOUT].label },
        DOCK_APPLICATIONS[DOCK_APPLICATIONS.length - 1],
      ]
    : DOCK_APPLICATIONS;
  return (
    <nav
      className={cn(
        'dock',
        GLASS_DOCK,
        GLASS_REDUCED_TRANSPARENCY,
        '[&.dock]:fixed [&.dock]:z-650 [&.dock]:left-[50%] [&.dock]:bottom-2.75 [&.dock]:h-[calc(var(--dock-size,50px)+16px)] [&.dock]:flex [&.dock]:items-end [&.dock]:gap-1.25 [&.dock]:p-[8px_10px] [&.dock]:transform-[translateX(-50%)] [&.dock]:[transition:opacity_180ms_ease-out,transform_220ms_var(--ease-mac)]',
        'contrast-more:[&.dock]:[outline:1px_solid_var(--separator)]',
        'max-[900px]:[&.dock]:max-w-[calc(100vw-12px)] max-[900px]:[&.dock]:overflow-x-auto max-[900px]:[&.dock]:overflow-y-hidden max-[900px]:[&.dock]:scrollbar-none',
        'max-[900px]:[&.dock_.app-icon]:[--icon-size:44px]!',
      )}
      aria-label='Dock'
      style={{ '--dock-size': `${size}px` } as CSSProperties}
    >
      {visibleApps.map((app) => {
        const running =
          app.id !== DockUtilityId.LAUNCHPAD &&
          app.id !== DockUtilityId.MAIL &&
          app.id !== DockUtilityId.TRASH &&
          windows.some((window) => window.app === app.id);
        const separated = app.id === (showRecentApps ? AppId.ABOUT : DockUtilityId.TRASH);
        return (
          <button
            type='button'
            key={app.id}
            className={cn(
              `dock-item${separated ? ' dock-item--separated' : ''}`,
              '[&.dock-item]:relative [&.dock-item]:w-(--dock-size,50px) [&.dock-item]:h-(--dock-size,50px) [&.dock-item]:flex-[0_0_var(--dock-size,50px)] [&.dock-item]:p-0 [&.dock-item]:[border:0] [&.dock-item]:[background:transparent] [&.dock-item]:basis-(--dock-size,50px)',
              '[&.dock-item_>_i]:absolute [&.dock-item_>_i]:left-[50%] [&.dock-item_>_i]:-bottom-1.25 [&.dock-item_>_i]:w-1 [&.dock-item_>_i]:h-1 [&.dock-item_>_i]:rounded-[50%] [&.dock-item_>_i]:[background:oklch(0.2_0.01_250)] [&.dock-item_>_i]:opacity-[0] [&.dock-item_>_i]:transform-[translateX(-50%)]',
              '[&.dock-item_>_i.running]:opacity-[0.82]',
              '[&.dock-item:hover_.dock-tooltip]:opacity-[1] [&.dock-item:hover_.dock-tooltip]:transform-[translate(-50%,0)]',
              'max-[900px]:[&.dock-item]:w-11 max-[900px]:[&.dock-item]:h-11 max-[900px]:[&.dock-item]:basis-11',
              '[&.dock-item--separated]:ml-3',
              "[&.dock-item--separated::before]:[content:''] [&.dock-item--separated::before]:absolute [&.dock-item--separated::before]:-left-2.25 [&.dock-item--separated::before]:top-0.75 [&.dock-item--separated::before]:w-px [&.dock-item--separated::before]:h-10.75 [&.dock-item--separated::before]:[background:oklch(0.18_0.018_250/0.22)] [&.dock-item--separated::before]:[box-shadow:1px_0_oklch(1_0_0/0.28)]",
            )}
            aria-label={app.label}
            onClick={() => launch(app.id)}
          >
            <span className='dock-tooltip [&.dock-tooltip]:absolute [&.dock-tooltip]:left-[50%] [&.dock-tooltip]:bottom-[calc(100%+12px)] [&.dock-tooltip]:p-[5px_9px] [&.dock-tooltip]:rounded-lg [&.dock-tooltip]:text-[oklch(0.2_0.01_250)] [&.dock-tooltip]:[background:var(--glass-regular)] [&.dock-tooltip]:[backdrop-filter:blur(26px)_saturate(1.45)] [&.dock-tooltip]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),0_5px_12px_oklch(0.08_0.03_245/0.2)] [&.dock-tooltip]:opacity-[0] [&.dock-tooltip]:pointer-events-none [&.dock-tooltip]:whitespace-nowrap [&.dock-tooltip]:text-[12px] [&.dock-tooltip]:transform-[translate(-50%,5px)] [&.dock-tooltip]:[transition:opacity_130ms,transform_130ms] [&.dock-tooltip]:[-webkit-backdrop-filter:blur(26px)_saturate(1.45)]'>
              {app.label}
            </span>
            <AppIcon app={app.id} size={Math.max(34, size - 2)} />
            <i className={cn(running ? 'running' : '')} />
          </button>
        );
      })}
    </nav>
  );
}
