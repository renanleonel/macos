import { NoteId } from '@/features/notes/domain/enums/note-id';
import type { Note } from '@/features/notes/domain/models/note';
import { PROFILE } from '@/shared/domain/constants/profile';

/** One note. Its body is the checklist in TODAY_TASKS. */
export const NOTES: readonly Note[] = [
  {
    id: NoteId.GUIDE,
    title: 'Start here',
    editorTitle: 'Start here',
    date: 'Today',
    preview: 'Where to find everything',
    updated: 'August 12, 2026 at 9:41 AM',
    intro: `I am ${PROFILE.name}, a ${PROFILE.role.toLowerCase()} based in ${PROFILE.location}. Everything about my work is on this desktop.`,
    sectionTitle: 'Where to find it',
    closing: `For anything else, email ${PROFILE.email}.`,
  },
];
