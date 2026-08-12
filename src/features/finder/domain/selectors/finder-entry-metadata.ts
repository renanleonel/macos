import { FinderEntryGlyph } from '@/features/finder/domain/enums/finder-entry-glyph';
import { FinderEntryKind } from '@/features/finder/domain/enums/finder-entry-kind';
import type { FinderEntry } from '@/features/finder/domain/models/finder-entry';

/** These files are props, so every one reports the same stamp and size. */
export const FINDER_ENTRY_CREATED_AT = 'Today, 10:09 AM';
const FINDER_ENTRY_FILE_SIZE = '12 KB';

const KIND_BY_EXTENSION: Record<string, string> = {
  md: 'Markdown document',
  pdf: 'PDF document',
  txt: 'Plain text document',
  sh: 'Shell script',
  vcf: 'Contact card',
};

/** The short kind shown in the list column: Folder, Application or Document. */
export function finderEntryKindLabel(entry: FinderEntry) {
  if (entry.kind === FinderEntryKind.FOLDER) return 'Folder';
  if (entry.kind === FinderEntryKind.APPLICATION) return 'Application';
  return 'Document';
}

/** The specific kind shown in the preview pane, e.g. "Markdown document". */
export function finderEntryDetailedKindLabel(entry: FinderEntry) {
  if (entry.kind === FinderEntryKind.FOLDER) return 'Folder';
  if (entry.kind === FinderEntryKind.APPLICATION) return 'Application';
  if (entry.glyph === FinderEntryGlyph.WEB) return 'Web location';

  const extension = entry.name.includes('.') ? entry.name.split('.').pop() : undefined;
  return (extension && KIND_BY_EXTENSION[extension]) ?? 'Document';
}

export function finderEntrySize(entry: FinderEntry) {
  return entry.kind === FinderEntryKind.FOLDER ? '—' : FINDER_ENTRY_FILE_SIZE;
}
