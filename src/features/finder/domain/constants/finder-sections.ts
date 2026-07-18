import { FinderEntryGlyph } from '@/features/finder/domain/enums/finder-entry-glyph';
import { FinderEntryKind } from '@/features/finder/domain/enums/finder-entry-kind';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import type { FinderEntry } from '@/features/finder/domain/models/finder-entry';
import { AppId } from '@/shared/domain/enums/app-id';

export const FINDER_SECTIONS: Record<FinderSection, FinderEntry[]> = {
  [FinderSection.RECENTS]: [
    {
      name: 'About Me.md',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.USER,
      app: AppId.ABOUT,
    },
    {
      name: 'Résumé.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.NOTES,
    },
    {
      name: 'Project Aurora',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.CODE,
      app: AppId.SAFARI,
    },
  ],
  [FinderSection.ABOUT_ME]: [
    {
      name: 'About Me.md',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.USER,
      app: AppId.ABOUT,
    },
    {
      name: 'Résumé.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.NOTES,
    },
    {
      name: 'Contact.mail',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.MAIL,
      app: AppId.MESSAGES,
    },
  ],
  [FinderSection.APPLICATIONS]: [
    {
      name: 'Safari',
      kind: FinderEntryKind.APPLICATION,
      glyph: FinderEntryGlyph.CODE,
      app: AppId.SAFARI,
    },
    {
      name: 'Messages',
      kind: FinderEntryKind.APPLICATION,
      glyph: FinderEntryGlyph.MAIL,
      app: AppId.MESSAGES,
    },
    {
      name: 'Photos',
      kind: FinderEntryKind.APPLICATION,
      glyph: FinderEntryGlyph.IMAGES,
      app: AppId.PHOTOS,
    },
    {
      name: 'Notes',
      kind: FinderEntryKind.APPLICATION,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.NOTES,
    },
    {
      name: 'Terminal',
      kind: FinderEntryKind.APPLICATION,
      glyph: FinderEntryGlyph.TERMINAL,
      app: AppId.TERMINAL,
    },
    {
      name: 'System Settings',
      kind: FinderEntryKind.APPLICATION,
      glyph: FinderEntryGlyph.FOLDER,
      app: AppId.SETTINGS,
    },
  ],
  [FinderSection.DESKTOP]: [
    {
      name: 'Selected Work',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.IMAGES,
      app: AppId.PHOTOS,
    },
    {
      name: 'Read Me.txt',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.NOTES,
    },
  ],
  [FinderSection.PORTFOLIO]: [
    {
      name: 'About Me.md',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.USER,
      app: AppId.ABOUT,
    },
    {
      name: 'Projects',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.CODE,
      app: AppId.SAFARI,
    },
    {
      name: 'Résumé.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.NOTES,
    },
    {
      name: 'Snapshots',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.IMAGES,
      app: AppId.PHOTOS,
    },
    {
      name: 'Now.sh',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TERMINAL,
      app: AppId.TERMINAL,
    },
  ],
  [FinderSection.DOWNLOADS]: [
    {
      name: 'Résumé.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.NOTES,
    },
    {
      name: 'Selected Work',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.IMAGES,
      app: AppId.PHOTOS,
    },
  ],
  [FinderSection.ICLOUD_DRIVE]: [
    {
      name: 'Portfolio',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.FOLDER,
      app: AppId.SAFARI,
    },
    { name: 'Notes', kind: FinderEntryKind.FOLDER, glyph: FinderEntryGlyph.TEXT, app: AppId.NOTES },
  ],
  [FinderSection.TRASH]: [
    {
      name: 'Archive Projects',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.FOLDER,
      app: AppId.PHOTOS,
    },
    {
      name: 'Draft Notes.txt',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.NOTES,
    },
    {
      name: 'Old Resume.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.ABOUT,
    },
  ],
};
