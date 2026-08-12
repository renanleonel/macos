import { FinderEntryGlyph } from '@/features/finder/domain/enums/finder-entry-glyph';
import { FinderEntryKind } from '@/features/finder/domain/enums/finder-entry-kind';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import type { FinderEntry } from '@/features/finder/domain/models/finder-entry';
import { APPLICATION_REGISTRY } from '@/shared/domain/constants/application-registry';
import { AppId } from '@/shared/domain/enums/app-id';

/**
 * Only user files and folders are lowercase. Applications keep their proper
 * names, taken from the registry so Finder can never disagree with the Dock.
 */
function application(id: AppId, glyph: FinderEntryGlyph): FinderEntry {
  const metadata = APPLICATION_REGISTRY[id];
  return {
    name: metadata.dockLabel ?? metadata.label,
    kind: FinderEntryKind.APPLICATION,
    glyph,
    app: id,
  };
}

export const FINDER_SECTIONS: Record<FinderSection, FinderEntry[]> = {
  [FinderSection.RECENTS]: [
    {
      name: 'about me.md',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.USER,
      app: AppId.ABOUT,
    },
    {
      name: 'resume.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.PREVIEW,
    },
    {
      name: 'open source',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.WEB,
      app: AppId.SAFARI,
    },
  ],
  [FinderSection.ABOUT_ME]: [
    {
      name: 'about me.md',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.USER,
      app: AppId.ABOUT,
    },
    {
      name: 'resume.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.PREVIEW,
    },
    {
      name: 'contact.vcf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.MAIL,
      app: AppId.MESSAGES,
    },
  ],
  [FinderSection.APPLICATIONS]: [
    application(AppId.SAFARI, FinderEntryGlyph.CODE),
    application(AppId.MESSAGES, FinderEntryGlyph.MAIL),
    application(AppId.PHOTOS, FinderEntryGlyph.IMAGES),
    application(AppId.NOTES, FinderEntryGlyph.TEXT),
    application(AppId.TERMINAL, FinderEntryGlyph.TERMINAL),
    application(AppId.SETTINGS, FinderEntryGlyph.FOLDER),
  ],
  [FinderSection.DESKTOP]: [
    {
      name: 'screenshots',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.IMAGES,
      app: AppId.PHOTOS,
    },
    {
      name: 'read me.txt',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.NOTES,
    },
  ],
  [FinderSection.PORTFOLIO]: [
    {
      name: 'about me.md',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.USER,
      app: AppId.ABOUT,
    },
    {
      name: 'projects',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.WEB,
      app: AppId.SAFARI,
    },
    {
      name: 'resume.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.PREVIEW,
    },
    {
      name: 'snapshots',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.IMAGES,
      app: AppId.PHOTOS,
    },
    {
      name: 'now.sh',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TERMINAL,
      app: AppId.TERMINAL,
    },
  ],
  [FinderSection.DOWNLOADS]: [
    {
      name: 'resume.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.PREVIEW,
    },
    {
      name: 'screenshots',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.IMAGES,
      app: AppId.PHOTOS,
    },
  ],
  [FinderSection.ICLOUD_DRIVE]: [
    {
      name: 'portfolio',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.WEB,
      app: AppId.SAFARI,
    },
    { name: 'notes', kind: FinderEntryKind.FOLDER, glyph: FinderEntryGlyph.TEXT, app: AppId.NOTES },
  ],
  [FinderSection.TRASH]: [
    {
      name: 'old portfolio',
      kind: FinderEntryKind.FOLDER,
      glyph: FinderEntryGlyph.FOLDER,
      app: AppId.PHOTOS,
    },
    {
      name: 'draft post.md',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.NOTES,
    },
    {
      name: 'resume 2024.pdf',
      kind: FinderEntryKind.DOCUMENT,
      glyph: FinderEntryGlyph.TEXT,
      app: AppId.ABOUT,
    },
  ],
};
