import { NOTES } from '@/features/notes/domain/constants/notes';
import type { NoteId } from '@/features/notes/domain/enums/note-id';
import type { Note } from '@/features/notes/domain/models/note';

export function selectNoteById(noteId: NoteId): Note {
  return NOTES.find((note) => note.id === noteId) ?? NOTES[0];
}
