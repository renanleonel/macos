import { FinderEntryIcon } from '@/features/finder/components/finder-entry-icon';
import { FinderEntryKind } from '@/features/finder/domain/enums/finder-entry-kind';
import type { FinderEntry } from '@/features/finder/domain/models/finder-entry';
import { AppIcon } from '@/shared/components/app-icon';
import { cn } from '@/shared/utils/cn';

type FinderItemProps = {
  item: FinderEntry;
  size: number;
  selected: boolean;
  showMetadata: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

export function FinderItem({
  item,
  size,
  selected,
  showMetadata,
  onSelect,
  onOpen,
}: FinderItemProps) {
  const kindLabel =
    item.kind === FinderEntryKind.FOLDER
      ? 'Folder'
      : item.kind === FinderEntryKind.APPLICATION
        ? 'Application'
        : 'Document';

  return (
    <button
      type='button'
      className={cn(
        `finder-item${selected ? ' is-selected' : ''}`,
        '[&.finder-item]:w-[calc(var(--finder-icon-size)+24px)] [&.finder-item]:flex [&.finder-item]:flex-col [&.finder-item]:items-center [&.finder-item]:gap-1.5 [&.finder-item]:p-0 [&.finder-item]:[border:0] [&.finder-item]:[background:transparent] [&.finder-item]:text-[12px] [&.finder-item]:leading-[1.2]',
        '[&.finder-item_>_span:last-child]:max-w-full [&.finder-item_>_span:last-child]:p-[2px_3px] [&.finder-item_>_span:last-child]:rounded-sm',
        '[&.finder-item:focus_>_span:nth-child(2)]:text-[white] [&.finder-item:focus_>_span:nth-child(2)]:[background:var(--system-blue-deep)]',
        '[&.finder-item.is-selected_>_span:nth-child(2)]:text-[white] [&.finder-item.is-selected_>_span:nth-child(2)]:[background:var(--system-blue-deep)]',
        '[.finder-files--list_&.finder-item]:[--finder-icon-size:20px] [.finder-files--list_&.finder-item]:w-full [.finder-files--list_&.finder-item]:h-8.5 [.finder-files--list_&.finder-item]:grid [.finder-files--list_&.finder-item]:grid-cols-[28px_minmax(120px,1fr)_minmax(240px,0.85fr)] [.finder-files--list_&.finder-item]:gap-2 [.finder-files--list_&.finder-item]:p-[0_8px] [.finder-files--list_&.finder-item]:rounded-[5px] [.finder-files--list_&.finder-item]:text-left',
        '[.finder-files--list_&.finder-item:nth-child(even)]:[background:oklch(0.94_0.005_250/0.62)]',
        '[.finder-files--list_&.finder-item.is-selected]:text-[white] [.finder-files--list_&.finder-item.is-selected]:[background:var(--system-blue-deep)]',
        '[.finder-files--list_&.finder-item.is-selected_.finder-item\\_\\_metadata]:text-[oklch(1_0_0/0.78)]',
        '[.finder-files--list_&.finder-item.is-selected_>_span:nth-child(2)]:[background:transparent]',
        '[.finder-files--list_&.finder-item_>_span:nth-child(2)]:[justify-self:start]',
        '[.finder-files--columns_&.finder-item]:[--finder-icon-size:24px] [.finder-files--columns_&.finder-item]:w-full [.finder-files--columns_&.finder-item]:h-8.5 [.finder-files--columns_&.finder-item]:flex-row [.finder-files--columns_&.finder-item]:gap-1.75 [.finder-files--columns_&.finder-item]:p-[0_10px] [.finder-files--columns_&.finder-item]:rounded-[5px] [.finder-files--columns_&.finder-item]:text-left',
        '[.finder-files--gallery_&.finder-item]:[--finder-icon-size:88px] [.finder-files--gallery_&.finder-item]:flex-[0_0_126px] [.finder-files--gallery_&.finder-item]:w-31.5 [.finder-files--gallery_&.finder-item]:p-3 [.finder-files--gallery_&.finder-item]:rounded-[9px] [.finder-files--gallery_&.finder-item]:[background:oklch(1_0_0/0.72)] [.finder-files--gallery_&.finder-item]:[box-shadow:0_5px_12px_oklch(0.2_0.02_250/0.12)]',
      )}
      aria-pressed={selected}
      onDoubleClick={onOpen}
      onClick={onSelect}
    >
      <span
        className={cn(
          'finder-item__icon w-[calc(var(--finder-icon-size)+8px)] h-[calc(var(--finder-icon-size)*0.86+8px)] grid place-items-center rounded-[9px] flex-[0_0_auto]',
          showMetadata ? 'p-0' : 'p-1',
          selected && !showMetadata
            ? '[background:var(--system-blue-deep)] [box-shadow:0_0_0_4px_var(--system-blue-deep)]'
            : '',
        )}
      >
        {item.kind === FinderEntryKind.APPLICATION ? (
          <span
            className={cn(
              'finder-application',
              '[&.finder-application]:relative [&.finder-application]:w-(--finder-icon-size) [&.finder-application]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-application]:grid [&.finder-application]:place-items-center [&.finder-application]:flex-[0_0_auto] [&.finder-application]:[transition:width_160ms_var(--ease-mac),height_160ms_var(--ease-mac)]',
              '[&.finder-application_.app-icon]:[--icon-size:calc(var(--finder-icon-size)*0.82)]!',
              '[.finder-files--list_&.finder-application]:[--finder-icon-size:20px] [.finder-files--list_&.finder-application]:[transition:none]',
              '[.finder-files--columns_&.finder-application]:[--finder-icon-size:24px] [.finder-files--columns_&.finder-application]:flex-[0_0_24px]',
            )}
          >
            <AppIcon app={item.app} size={Math.round(size * 0.82)} />
          </span>
        ) : (
          <span
            className={cn(
              item.kind === FinderEntryKind.FOLDER ? 'finder-folder' : 'finder-document',
              '[&.finder-folder]:relative [&.finder-folder]:w-(--finder-icon-size) [&.finder-folder]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-folder]:grid [&.finder-folder]:place-items-center [&.finder-folder]:flex-[0_0_auto] [&.finder-folder]:[transition:width_160ms_var(--ease-mac),height_160ms_var(--ease-mac)] [&.finder-folder]:text-[oklch(0.98_0_0)] [&.finder-folder]:filter-[drop-shadow(0_3px_4px_oklch(0.1_0.03_245/0.2))]',
              "[&.finder-folder::before]:[content:''] [&.finder-folder::before]:absolute [&.finder-folder::before]:z-0 [&.finder-folder::before]:left-[6%] [&.finder-folder::before]:top-[4%] [&.finder-folder::before]:w-[44%] [&.finder-folder::before]:h-[26%] [&.finder-folder::before]:rounded-[12%_16%_0_0] [&.finder-folder::before]:[background:oklch(0.79_0.13_226)]",
              "[&.finder-folder::after]:[content:''] [&.finder-folder::after]:absolute [&.finder-folder::after]:z-1 [&.finder-folder::after]:inset-[17%_0_2%] [&.finder-folder::after]:rounded-[9%_9%_13%_13%] [&.finder-folder::after]:[background:linear-gradient(180deg,oklch(0.84_0.11_225),oklch(0.62_0.19_245))] [&.finder-folder::after]:[box-shadow:inset_0_1px_oklch(1_0_0/0.38)]",
              '[&.finder-folder_svg]:relative [&.finder-folder_svg]:z-2 [&.finder-folder_svg]:w-[40%] [&.finder-folder_svg]:h-[40%] [&.finder-folder_svg]:stroke-[1.8]',
              '[.finder-files--list_&.finder-folder]:[--finder-icon-size:20px] [.finder-files--list_&.finder-folder]:[transition:none]',
              '[.finder-files--columns_&.finder-folder]:[--finder-icon-size:24px] [.finder-files--columns_&.finder-folder]:flex-[0_0_24px]',
              '[&.finder-document]:relative [&.finder-document]:w-(--finder-icon-size) [&.finder-document]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-document]:grid [&.finder-document]:place-items-center [&.finder-document]:flex-[0_0_auto] [&.finder-document]:[transition:width_160ms_var(--ease-mac),height_160ms_var(--ease-mac)] [&.finder-document]:text-[oklch(0.45_0.01_250)] [&.finder-document]:[background:linear-gradient(135deg,white_0_79%,oklch(0.91_0.015_245)_80%)] [&.finder-document]:rounded-[5%_5%_12%_5%] [&.finder-document]:[box-shadow:inset_0_0_0_1px_oklch(0.3_0.01_250/0.09),0_3px_7px_oklch(0.1_0.02_250/0.16)]',
              '[&.finder-document_svg]:relative [&.finder-document_svg]:z-2 [&.finder-document_svg]:w-[40%] [&.finder-document_svg]:h-[40%] [&.finder-document_svg]:stroke-[1.8]',
              '[.finder-files--list_&.finder-document]:[--finder-icon-size:20px] [.finder-files--list_&.finder-document]:[transition:none]',
              '[.finder-files--columns_&.finder-document]:[--finder-icon-size:24px] [.finder-files--columns_&.finder-document]:flex-[0_0_24px]',
            )}
          >
            <FinderEntryIcon glyph={item.glyph} />
          </span>
        )}
      </span>
      <span>{item.name}</span>
      <span
        className={cn(
          'finder-item__metadata',
          showMetadata
            ? 'w-full grid grid-cols-[1fr_1.2fr_0.5fr] gap-3 text-[oklch(0.5_0.01_250)] text-[11px]'
            : 'hidden',
          selected ? 'text-[oklch(1_0_0/0.78)]' : '',
        )}
      >
        <span>{kindLabel}</span>
        <span>Today, 10:09 AM</span>
        <span>{item.kind === FinderEntryKind.FOLDER ? '—' : '12 KB'}</span>
      </span>
    </button>
  );
}
