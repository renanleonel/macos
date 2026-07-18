import { FinderEntryGlyph } from '@/features/finder/domain/enums/finder-entry-glyph';
import { FinderEntryKind } from '@/features/finder/domain/enums/finder-entry-kind';
import { AppId } from '@/shared/domain/enums/app-id';

export type FinderEntry = {
  name: string;
  kind: FinderEntryKind;
  glyph: FinderEntryGlyph;
  app: AppId;
};
