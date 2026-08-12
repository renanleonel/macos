import type { NoteId } from '@/features/notes/domain/enums/note-id';

export type Note = {
  id: NoteId;
  title: string;
  editorTitle: string;
  date: string;
  preview: string;
  updated: string;
  intro: string;
  sectionTitle: string;
  closing: string;
};
