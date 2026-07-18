import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type SystemMenuProps = { children: ReactNode; className?: string };

export function SystemMenu({ children, className = '' }: SystemMenuProps) {
  return (
    <div
      className={cn(
        `system-menu ${className}`,
        '[&.system-menu]:fixed [&.system-menu]:z-800 [&.system-menu]:rounded-[14px] [&.system-menu]:[background:linear-gradient(145deg,oklch(1_0_0/0.34),transparent_48%),var(--material-menu)] [&.system-menu]:[backdrop-filter:blur(44px)_saturate(1.55)] [&.system-menu]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_18px_44px_oklch(0.08_0.035_245/0.28),0_4px_12px_oklch(0.08_0.03_245/0.18)] [&.system-menu]:top-7.75 [&.system-menu]:w-61.25 [&.system-menu]:p-1.5 [&.system-menu]:[-webkit-backdrop-filter:blur(44px)_saturate(1.55)]',
        '[&.system-menu_button]:w-full [&.system-menu_button]:min-h-6.75 [&.system-menu_button]:flex [&.system-menu_button]:items-center [&.system-menu_button]:justify-between [&.system-menu_button]:p-[3px_9px] [&.system-menu_button]:[border:0] [&.system-menu_button]:rounded-[7px] [&.system-menu_button]:[background:transparent] [&.system-menu_button]:text-left [&.system-menu_button]:text-[13px] [&.system-menu_button]:[transition-property:scale] [&.system-menu_button]:duration-120 [&.system-menu_button]:ease-[ease-out]',
        '[&.system-menu_button:hover]:text-[white] [&.system-menu_button:hover]:[background:var(--system-blue-deep)] [&.system-menu_button:hover]:[box-shadow:inset_0_1px_oklch(1_0_0/0.2)]',
        '[&.system-menu_hr]:m-[4px_7px] [&.system-menu_hr]:[border:0] [&.system-menu_hr]:[border-top:1px_solid_var(--separator)]',
        '[&.system-menu_kbd]:opacity-[0.58] [&.system-menu_kbd]:font-[inherit]',
        '[&.system-menu_button:disabled]:text-[oklch(0.46_0.01_250/0.52)] [&.system-menu_button:disabled]:pointer-events-none',
        '[&.system-menu_.network-row]:grid [&.system-menu_.network-row]:grid-cols-[20px_1fr_18px] [&.system-menu_.network-row]:gap-1',
        '[&.system-menu_button:active]:scale-[0.96]',
        'contrast-more:[&.system-menu]:[outline:1px_solid_var(--separator)]',
        '[@media(prefers-reduced-transparency:_reduce)]:[&.system-menu]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.system-menu]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.system-menu]:[background:var(--material-menu)]',
      )}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  );
}
