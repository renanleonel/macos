import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
import { cn } from '@/shared/utils/cn';

type FinderStatusBarProps = {
  itemCount: number;
  preferences: FinderPreferences;
  canResizeIcons: boolean;
  onUpdatePreferences: (patch: Partial<FinderPreferences>) => void;
};

export function FinderStatusBar({
  itemCount,
  preferences,
  canResizeIcons,
  onUpdatePreferences,
}: FinderStatusBarProps) {
  return (
    <div
      className={cn(
        'finder-status',
        '[&.finder-status]:h-6.5 [&.finder-status]:flex [&.finder-status]:items-center [&.finder-status]:justify-between [&.finder-status]:gap-3 [&.finder-status]:p-[0_12px] [&.finder-status]:text-(--label-secondary) [&.finder-status]:[border-top:1px_solid_var(--separator)] [&.finder-status]:text-[10px] [&.finder-status]:[background:var(--material-status)]',
        '[&.finder-status_label]:flex [&.finder-status_label]:items-center [&.finder-status_label]:gap-1.75 [&.finder-status_label]:whitespace-nowrap',
        '[&.finder-status_label.is-disabled]:opacity-[0.48]',
        '[&.finder-status_input]:w-26.25 [&.finder-status_input]:accent-(--system-blue)',
        '[&.finder-status_output]:w-7.25 [&.finder-status_output]:[font-variant-numeric:tabular-nums] [&.finder-status_output]:text-right',
      )}
    >
      <span>
        {itemCount} {itemCount === 1 ? 'item' : 'items'}, 214.3 GB available
      </span>
      <label className={cn(canResizeIcons ? '' : 'is-disabled')}>
        Icon size{' '}
        <input
          aria-label='Icon size'
          aria-valuetext={`${preferences.iconSize} pixels`}
          type='range'
          min='40'
          max='88'
          step='4'
          value={preferences.iconSize}
          disabled={!canResizeIcons}
          onChange={(event) => onUpdatePreferences({ iconSize: Number(event.target.value) })}
        />
        <output>{preferences.iconSize}px</output>
      </label>
    </div>
  );
}
