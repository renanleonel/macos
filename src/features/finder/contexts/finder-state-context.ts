import { createContext } from 'react';

import type { FinderState } from '@/features/finder/domain/models/finder-state';

export const FinderStateContext = createContext<FinderState | null>(null);
