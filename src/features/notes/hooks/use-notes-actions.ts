import { useContext } from 'react';

import {
  NotesActionsContext,
  type NotesActions,
} from '@/features/notes/contexts/notes-actions-context';

export function useNotesActions(): NotesActions {
  const actions = useContext(NotesActionsContext);

  if (!actions) {
    throw new Error('useNotesActions must be used within a NotesProvider.');
  }

  return actions;
}
