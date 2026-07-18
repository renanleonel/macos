import { useContext } from 'react';

import { NotesStateContext } from '@/features/notes/contexts/notes-state-context';
import type { NotesState } from '@/features/notes/domain/models/notes-state';

export function useNotesState(): NotesState {
  const state = useContext(NotesStateContext);

  if (!state) {
    throw new Error('useNotesState must be used within a NotesProvider.');
  }

  return state;
}
