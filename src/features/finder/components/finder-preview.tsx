import { FinderEntryIcon } from '@/features/finder/components/finder-entry-icon';
import { FinderEntryKind } from '@/features/finder/domain/enums/finder-entry-kind';
import type { FinderEntry } from '@/features/finder/domain/models/finder-entry';
import {
  FINDER_ENTRY_CREATED_AT,
  finderEntryDetailedKindLabel,
  finderEntrySize,
} from '@/features/finder/domain/selectors/finder-entry-metadata';
import { AppIcon } from '@/shared/components/app-icon';
import { cn } from '@/shared/utils/cn';

type FinderPreviewProps = {
  entry: FinderEntry | null;
};

export function FinderPreview({ entry }: FinderPreviewProps) {
  return (
    <aside
      className={cn(
        'finder-preview',
        '[&.finder-preview]:w-57.5 [&.finder-preview]:flex-[0_0_230px] [&.finder-preview]:flex [&.finder-preview]:flex-col [&.finder-preview]:items-center [&.finder-preview]:gap-2.5 [&.finder-preview]:p-[34px_20px] [&.finder-preview]:[border-left:1px_solid_var(--separator)] [&.finder-preview]:[background:oklch(0.96_0.005_250)]',
        '[&.finder-preview_.finder-document]:[--finder-icon-size:88px] [&.finder-preview_.finder-folder]:[--finder-icon-size:88px] [&.finder-preview_.finder-application]:[--finder-icon-size:88px]',
        '[&.finder-preview_>_strong]:text-center [&.finder-preview_>_strong]:[overflow-wrap:anywhere]',
        '[&.finder-preview_dl]:w-full [&.finder-preview_dl]:mt-4 [&.finder-preview_dl]:text-[11px]',
        '[&.finder-preview_dl_div]:grid [&.finder-preview_dl_div]:grid-cols-[0.7fr_1.3fr] [&.finder-preview_dl_div]:gap-2 [&.finder-preview_dl_div]:m-[7px_0]',
        '[&.finder-preview_dt]:text-[oklch(0.5_0.01_250)] [&.finder-preview_dt]:text-right',
        '[&.finder-preview_dd]:m-0',
        '[&.finder-preview_.finder-preview\\_\\_empty]:m-auto [&.finder-preview_.finder-preview\\_\\_empty]:text-[oklch(0.55_0.01_250)] [&.finder-preview_.finder-preview\\_\\_empty]:text-[12px]',
      )}
      aria-label='Preview'
      aria-live='polite'
    >
      {entry ? (
        <>
          <FinderPreviewIcon entry={entry} />
          <strong>{entry.name}</strong>
          <dl>
            <div>
              <dt>Kind</dt>
              <dd>{finderEntryDetailedKindLabel(entry)}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{finderEntrySize(entry)}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{FINDER_ENTRY_CREATED_AT}</dd>
            </div>
          </dl>
        </>
      ) : (
        <span className='finder-preview__empty m-auto text-[oklch(0.55_0.01_250)] text-[12px]'>
          No selection
        </span>
      )}
    </aside>
  );
}

/** Mirrors the icon treatment used by the file rows, at preview size. */
function FinderPreviewIcon({ entry }: { entry: FinderEntry }) {
  if (entry.kind === FinderEntryKind.APPLICATION) {
    return (
      <span className='finder-application [&.finder-application]:relative [&.finder-application]:w-(--finder-icon-size) [&.finder-application]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-application]:grid [&.finder-application]:place-items-center [&.finder-application]:flex-[0_0_auto]'>
        <AppIcon app={entry.app} size={72} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        entry.kind === FinderEntryKind.FOLDER ? 'finder-folder' : 'finder-document',
        '[&.finder-folder]:relative [&.finder-folder]:w-(--finder-icon-size) [&.finder-folder]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-folder]:grid [&.finder-folder]:place-items-center [&.finder-folder]:flex-[0_0_auto] [&.finder-folder]:text-[oklch(0.98_0_0)] [&.finder-folder]:filter-[drop-shadow(0_3px_4px_oklch(0.1_0.03_245/0.2))]',
        "[&.finder-folder::before]:[content:''] [&.finder-folder::before]:absolute [&.finder-folder::before]:z-0 [&.finder-folder::before]:left-[6%] [&.finder-folder::before]:top-[4%] [&.finder-folder::before]:w-[44%] [&.finder-folder::before]:h-[26%] [&.finder-folder::before]:rounded-[12%_16%_0_0] [&.finder-folder::before]:[background:oklch(0.79_0.13_226)]",
        "[&.finder-folder::after]:[content:''] [&.finder-folder::after]:absolute [&.finder-folder::after]:z-1 [&.finder-folder::after]:inset-[17%_0_2%] [&.finder-folder::after]:rounded-[9%_9%_13%_13%] [&.finder-folder::after]:[background:linear-gradient(180deg,oklch(0.84_0.11_225),oklch(0.62_0.19_245))] [&.finder-folder::after]:[box-shadow:inset_0_1px_oklch(1_0_0/0.38)]",
        '[&.finder-folder_svg]:relative [&.finder-folder_svg]:z-2 [&.finder-folder_svg]:w-[40%] [&.finder-folder_svg]:h-[40%] [&.finder-folder_svg]:stroke-[1.8]',
        '[&.finder-document]:relative [&.finder-document]:w-(--finder-icon-size) [&.finder-document]:h-[calc(var(--finder-icon-size)*0.86)] [&.finder-document]:grid [&.finder-document]:place-items-center [&.finder-document]:flex-[0_0_auto] [&.finder-document]:text-[oklch(0.45_0.01_250)] [&.finder-document]:[background:linear-gradient(135deg,white_0_79%,oklch(0.91_0.015_245)_80%)] [&.finder-document]:rounded-[5%_5%_12%_5%] [&.finder-document]:[box-shadow:inset_0_0_0_1px_oklch(0.3_0.01_250/0.09),0_3px_7px_oklch(0.1_0.02_250/0.16)]',
        '[&.finder-document_svg]:relative [&.finder-document_svg]:z-2 [&.finder-document_svg]:w-[40%] [&.finder-document_svg]:h-[40%] [&.finder-document_svg]:stroke-[1.8]',
      )}
    >
      <FinderEntryIcon glyph={entry.glyph} />
    </span>
  );
}
