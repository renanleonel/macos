import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

import {
  NotesActionsContext,
  type NotesActions,
} from '@/features/notes/contexts/notes-actions-context';
import { NotesStateContext } from '@/features/notes/contexts/notes-state-context';
import {
  readCompletedTasks,
  writeCompletedTasks,
} from '@/features/notes/adapters/completed-tasks-storage';
import { NoteId } from '@/features/notes/domain/enums/note-id';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import type { NotesState } from '@/features/notes/domain/models/notes-state';
import { toggleCompletedTask } from '@/features/notes/domain/reducers/toggle-completed-task';

type NotesProviderProps = {
  children: ReactNode;
};

export function NotesProvider({ children }: NotesProviderProps) {
  const [selectedNoteId, setSelectedNoteId] = useState<NoteId>(NoteId.GUIDE);
  const [completedTasks, setCompletedTasks] = useState<TodayTaskId[]>(readCompletedTasks);
  const completedTasksRef = useRef(completedTasks);

  useLayoutEffect(() => {
    completedTasksRef.current = completedTasks;
  }, [completedTasks]);

  const selectNote = (noteId: NoteId) => {
    setSelectedNoteId(noteId);
  };

  const toggleTask = (taskId: TodayTaskId) => {
    const nextTasks = toggleCompletedTask(completedTasksRef.current, taskId);

    setCompletedTasks(nextTasks);
    writeCompletedTasks(nextTasks);
  };

  const state: NotesState = { selectedNoteId, completedTasks };
  const actions: NotesActions = { selectNote, toggleTask };

  return (
    <NotesActionsContext value={actions}>
      <NotesStateContext value={state}>{children}</NotesStateContext>
    </NotesActionsContext>
  );
}
