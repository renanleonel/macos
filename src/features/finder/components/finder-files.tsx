import { Search } from 'lucide-react';
import type { CSSProperties } from 'react';

import { FinderItem } from '@/features/finder/components/finder-item';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import { FinderView } from '@/features/finder/domain/enums/finder-view';
import type { FinderEntry } from '@/features/finder/domain/models/finder-entry';
import type { AppId } from '@/shared/domain/enums/app-id';
import { cn } from '@/shared/utils/cn';

type FinderFilesProps = {
  view: FinderView;
  iconSize: number;
  section: FinderSection;
  query: string;
  items: FinderEntry[];
  selectedItem: string | null;
  onSelectItem: (name: string) => void;
  onClearSelection: () => void;
  onOpenApp: (app: AppId) => void;
};

export function FinderFiles({
  view,
  iconSize,
  section,
  query,
  items,
  selectedItem,
  onSelectItem,
  onClearSelection,
  onOpenApp,
}: FinderFilesProps) {
  return (
    <div
      className={cn(
        `finder-files finder-files--${view}`,
        '[&.finder-files]:[--finder-icon-size:58px] [&.finder-files]:min-w-0 [&.finder-files]:flex-1 [&.finder-files]:flex [&.finder-files]:content-start [&.finder-files]:flex-wrap [&.finder-files]:gap-[26px_24px] [&.finder-files]:p-8.5 [&.finder-files]:overflow-auto [&.finder-files]:[background:var(--material-content)]',
        '[&.finder-files.finder-files--list]:block [&.finder-files.finder-files--list]:p-[20px_12px]',
        '[&.finder-files.finder-files--columns]:grid [&.finder-files.finder-files--columns]:grid-cols-[repeat(3,minmax(150px,1fr))] [&.finder-files.finder-files--columns]:grid-rows-[repeat(3,34px)] [&.finder-files.finder-files--columns]:grid-flow-col [&.finder-files.finder-files--columns]:content-stretch [&.finder-files.finder-files--columns]:gap-0 [&.finder-files.finder-files--columns]:p-[10px_0]',
        "[&.finder-files.finder-files--columns::after]:[content:''] [&.finder-files.finder-files--columns::after]:sticky [&.finder-files.finder-files--columns::after]:right-0 [&.finder-files.finder-files--columns::after]:w-px [&.finder-files.finder-files--columns::after]:h-full [&.finder-files.finder-files--columns::after]:[background:var(--separator)]",
        '[&.finder-files.finder-files--gallery]:flex-nowrap [&.finder-files.finder-files--gallery]:items-end [&.finder-files.finder-files--gallery]:justify-start [&.finder-files.finder-files--gallery]:gap-3 [&.finder-files.finder-files--gallery]:p-8 [&.finder-files.finder-files--gallery]:[background:linear-gradient(180deg,oklch(0.96_0.01_250),oklch(0.99_0_0))]',
      )}
      style={{ '--finder-icon-size': `${iconSize}px` } as CSSProperties}
      aria-label={`${section} files`}
      aria-live='polite'
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClearSelection();
      }}>
      {items.map((item) => (
        <FinderItem
          key={`${section}-${item.name}`}
          item={item}
          size={iconSize}
          selected={selectedItem === item.name}
          showMetadata={view === FinderView.LIST}
          onSelect={() => onSelectItem(item.name)}
          onOpen={() => onOpenApp(item.app)}
        />
      ))}
      {items.length === 0 ? (
        <div
          className={cn(
            'finder-empty',
            '[&.finder-empty]:w-full [&.finder-empty]:min-h-45 [&.finder-empty]:flex [&.finder-empty]:flex-col [&.finder-empty]:items-center [&.finder-empty]:justify-center [&.finder-empty]:gap-1.25 [&.finder-empty]:text-(--muted) [&.finder-empty]:text-center',
            '[&.finder-empty_strong]:text-inherit [&.finder-empty_strong]:text-[13px]',
            '[&.finder-empty_span]:text-[11px]',
          )}>
          <Search size={26} />
          <strong>No results</strong>
          <span>
            No items in {section} match “{query}”.
          </span>
        </div>
      ) : null}
    </div>
  );
}
