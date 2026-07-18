import { createContext } from 'react';

import type { FinderSection } from '@/features/finder/domain/enums/finder-section';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';

export type FinderActions = {
  setSection: (section: FinderSection) => void;
  updatePreferences: (patch: Partial<FinderPreferences>) => void;
};

export const FinderActionsContext = createContext<FinderActions | null>(null);
