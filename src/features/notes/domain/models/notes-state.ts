import type { NoteId } from '@/features/notes/domain/enums/note-id';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';

export type NotesState = {
  selectedNoteId: NoteId;
  completedTasks: TodayTaskId[];
};
