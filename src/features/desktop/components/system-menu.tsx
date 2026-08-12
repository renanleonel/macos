import type { ReactNode } from 'react';
import {
  GLASS_MENU,
  GLASS_REDUCED_TRANSPARENCY,
} from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type SystemMenuProps = { children: ReactNode; className?: string };

export function SystemMenu({ children, className = '' }: SystemMenuProps) {
  return (
    <div
      className={cn(
        `system-menu ${className}`,
        GLASS_MENU,
        GLASS_REDUCED_TRANSPARENCY,
        '[&.system-menu]:fixed [&.system-menu]:z-800 [&.system-menu]:top-7.75 [&.system-menu]:w-61.25 [&.system-menu]:p-1.5 [&.system-menu]:animate-[menu-in_200ms_var(--ease-mac)_both] [&.system-menu]:origin-[top_center]',
        '[&.system-menu_>_button]:w-full [&.system-menu_>_button]:min-h-7 [&.system-menu_>_button]:flex [&.system-menu_>_button]:items-center [&.system-menu_>_button]:justify-between [&.system-menu_>_button]:p-[3px_10px] [&.system-menu_>_button]:[border:0] [&.system-menu_>_button]:rounded-[9px] [&.system-menu_>_button]:[background:transparent] [&.system-menu_>_button]:text-left [&.system-menu_>_button]:text-[13px] [&.system-menu_>_button]:[transition:background-color_140ms_var(--ease-mac),box-shadow_140ms_var(--ease-mac),scale_120ms_ease-out]',
        '[&.system-menu_>_button:hover]:text-[white] [&.system-menu_>_button:hover]:[background:linear-gradient(180deg,oklch(0.62_0.19_250),var(--system-blue-deep))] [&.system-menu_>_button:hover]:[box-shadow:inset_0_1px_oklch(1_0_0/0.34),inset_0_0_0_1px_oklch(1_0_0/0.12),0_2px_6px_oklch(0.3_0.14_250/0.34)]',
        '[&.system-menu_hr]:m-[5px_9px] [&.system-menu_hr]:[border:0] [&.system-menu_hr]:h-px [&.system-menu_hr]:[background:linear-gradient(90deg,transparent,var(--separator)_12%,var(--separator)_88%,transparent)]',
        '[&.system-menu_kbd]:opacity-[0.58] [&.system-menu_kbd]:font-[inherit]',
        '[&.system-menu_>_button:disabled]:text-[oklch(0.46_0.01_250/0.52)] [&.system-menu_>_button:disabled]:pointer-events-none',
        '[&.system-menu_.network-row]:grid [&.system-menu_.network-row]:grid-cols-[20px_1fr_18px] [&.system-menu_.network-row]:gap-1',
        '[&.system-menu_>_button:active]:scale-[0.97]',
        'contrast-more:[&.system-menu]:[outline:1px_solid_var(--separator)]',
      )}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  );
}
