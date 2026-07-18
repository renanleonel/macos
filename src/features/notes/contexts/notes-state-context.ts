import { createContext } from 'react';

import type { NotesState } from '@/features/notes/domain/models/notes-state';

export const NotesStateContext = createContext<NotesState | undefined>(undefined);
