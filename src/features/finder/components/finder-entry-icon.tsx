import {
  Compass,
  FileCode2,
  FileText,
  Folder,
  Images,
  Mail,
  SquareTerminal,
  UserRound,
} from 'lucide-react';

import { FinderEntryGlyph } from '@/features/finder/domain/enums/finder-entry-glyph';

type FinderEntryIconProps = {
  glyph: FinderEntryGlyph;
};

export function FinderEntryIcon({ glyph }: FinderEntryIconProps) {
  switch (glyph) {
    case FinderEntryGlyph.USER:
      return <UserRound />;
    case FinderEntryGlyph.CODE:
      return <FileCode2 />;
    case FinderEntryGlyph.TEXT:
      return <FileText />;
    case FinderEntryGlyph.IMAGES:
      return <Images />;
    case FinderEntryGlyph.TERMINAL:
      return <SquareTerminal />;
    case FinderEntryGlyph.MAIL:
      return <Mail />;
    case FinderEntryGlyph.FOLDER:
      return <Folder />;
    case FinderEntryGlyph.WEB:
      return <Compass />;
  }
}
