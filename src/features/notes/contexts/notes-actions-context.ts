import { createContext } from 'react';

import type { NoteId } from '@/features/notes/domain/enums/note-id';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';

export type NotesActions = {
  selectNote: (noteId: NoteId) => void;
  toggleTask: (taskId: TodayTaskId) => void;
};

export const NotesActionsContext = createContext<NotesActions | undefined>(undefined);
