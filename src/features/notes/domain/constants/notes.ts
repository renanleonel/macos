import { NoteId } from '@/features/notes/domain/enums/note-id';
import type { Note } from '@/features/notes/domain/models/note';

export const NOTES: readonly Note[] = [
  {
    id: NoteId.WELCOME,
    title: 'Welcome to my desktop',
    editorTitle: 'Welcome to my desktop 👋',
    date: 'Today',
    preview: 'A little about this place…',
    updated: 'July 17, 2026 at 10:00 AM',
    intro: 'This website is a tiny operating system and a personal home on the internet.',
    sectionTitle: 'What you can do',
    bullets: [
      'Open apps from the Dock.',
      'Drag, focus, minimize, maximize, and close windows.',
      'Use Spotlight to jump anywhere.',
      'Explore placeholder projects in Safari and Finder.',
    ],
    quote: 'The details are not the details. They make the design.',
    closing:
      'Everything here is ready for real biography, work, contact details, and links when you are.',
  },
  {
    id: NoteId.CARE,
    title: 'Things I care about',
    editorTitle: 'Things I care about',
    date: 'Yesterday',
    preview: 'Craft, clarity, character…',
    updated: 'July 16, 2026 at 6:42 PM',
    intro: 'Good software should feel considered before it feels impressive.',
    sectionTitle: 'Principles',
    bullets: [
      'Clarity before cleverness.',
      'Character without unnecessary noise.',
      'Fast interactions with calm motion.',
      'Details that reward attention.',
    ],
    quote: 'Make every interaction explain itself.',
    closing: 'The goal is simple: useful work with a point of view.',
  },
  {
    id: NoteId.NOW,
    title: 'Now',
    editorTitle: 'Now',
    date: 'Jul 14',
    preview: 'Currently building…',
    updated: 'July 14, 2026 at 9:18 AM',
    intro: 'A small snapshot of what currently has my attention.',
    sectionTitle: 'Currently building',
    bullets: [
      'A more faithful macOS portfolio.',
      'A reusable interface system.',
      'A collection of carefully documented experiments.',
    ],
    quote: 'Small, finished things compound.',
    closing: 'Next up: replacing the remaining placeholder work with real projects and writing.',
  },
];
