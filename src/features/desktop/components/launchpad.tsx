import { Search } from 'lucide-react';
import { LAUNCHPAD_APPLICATIONS } from '@/features/desktop/domain/constants/launchpad-applications';
import { AppIcon } from '@/shared/components/app-icon';
import type { AppId } from '@/shared/domain/enums/app-id';
import { cn } from '@/shared/utils/cn';
type LaunchpadProps = { openApp: (app: AppId) => void; close: () => void };
export function Launchpad({ openApp, close }: LaunchpadProps) {
  return (
    <div
      className={cn(
        'launchpad',
        '[&.launchpad]:fixed [&.launchpad]:inset-0 [&.launchpad]:z-600 [&.launchpad]:pt-[calc(24px_+_8vh)] [&.launchpad]:text-[white] [&.launchpad]:[background:oklch(0.12_0.04_245/0.55)] [&.launchpad]:[backdrop-filter:blur(38px)_saturate(1.15)] [&.launchpad]:animate-[launchpad-in_220ms_var(--ease-mac)_both]',
        '[&.launchpad_>_label]:w-57.5 [&.launchpad_>_label]:h-7 [&.launchpad_>_label]:flex [&.launchpad_>_label]:items-center [&.launchpad_>_label]:gap-2 [&.launchpad_>_label]:m-[0_auto_55px] [&.launchpad_>_label]:p-[0_10px] [&.launchpad_>_label]:rounded-[7px] [&.launchpad_>_label]:[background:oklch(1_0_0/0.2)] [&.launchpad_>_label]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.25)]',
        '[&.launchpad_label_input]:min-w-0 [&.launchpad_label_input]:flex-1 [&.launchpad_label_input]:[border:0] [&.launchpad_label_input]:[outline:0] [&.launchpad_label_input]:text-[white] [&.launchpad_label_input]:[background:transparent] [&.launchpad_label_input]:text-center',
        '[&.launchpad_label_input::placeholder]:text-[oklch(1_0_0/0.7)]',
      )}
    >
      <label>
        <Search size={16} />
        <input autoFocus placeholder='Search' />
      </label>
      <div
        className={cn(
          'launchpad-grid',
          '[&.launchpad-grid_button]:[transition-property:scale] [&.launchpad-grid_button]:duration-120 [&.launchpad-grid_button]:ease-[ease-out] [&.launchpad-grid_button]:flex [&.launchpad-grid_button]:flex-col [&.launchpad-grid_button]:items-center [&.launchpad-grid_button]:gap-2.25 [&.launchpad-grid_button]:[border:0] [&.launchpad-grid_button]:text-[white] [&.launchpad-grid_button]:[background:transparent] [&.launchpad-grid_button]:[text-shadow:0_2px_5px_oklch(0.1_0.03_245/0.5)]',
          '[&.launchpad-grid_button:active]:scale-[0.96]',
          '[&.launchpad-grid]:max-w-185 [&.launchpad-grid]:m-auto [&.launchpad-grid]:grid [&.launchpad-grid]:grid-cols-[repeat(4,1fr)] [&.launchpad-grid]:gap-[44px_80px]',
          '[&.launchpad-grid_button:hover_.app-icon]:transform-[scale(1.07)]',
          '[&.launchpad-grid_.app-icon]:[transition:transform_150ms_var(--ease-mac)]',
          'max-[900px]:[&.launchpad-grid]:max-w-130 max-[900px]:[&.launchpad-grid]:grid-cols-[repeat(4,1fr)] max-[900px]:[&.launchpad-grid]:gap-8.75',
          'max-[600px]:[&.launchpad-grid]:grid-cols-[repeat(3,1fr)] max-[600px]:[&.launchpad-grid]:gap-[32px_22px]',
          'max-[600px]:[&.launchpad-grid_.app-icon]:[--icon-size:62px]!',
        )}
      >
        {LAUNCHPAD_APPLICATIONS.map((app) => (
          <button
            type='button'
            key={app.id}
            onClick={() => {
              openApp(app.id);
              close();
            }}
          >
            <AppIcon app={app.id} size={72} />
            <span>{app.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
