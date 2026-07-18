import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

import {
  readFinderPreferences,
  writeFinderPreferences,
} from '@/features/finder/adapters/finder-preferences-storage';
import {
  FinderActionsContext,
  type FinderActions,
} from '@/features/finder/contexts/finder-actions-context';
import { FinderStateContext } from '@/features/finder/contexts/finder-state-context';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
import type { FinderState } from '@/features/finder/domain/models/finder-state';

type FinderProviderProps = {
  children: ReactNode;
};

export function FinderProvider({ children }: FinderProviderProps) {
  const [preferences, setPreferences] = useState<FinderPreferences>(readFinderPreferences);
  const preferencesRef = useRef(preferences);
  const [section, setSection] = useState<FinderSection>(FinderSection.PORTFOLIO);

  useLayoutEffect(() => {
    preferencesRef.current = preferences;
  }, [preferences]);

  const updatePreferences = (patch: Partial<FinderPreferences>) => {
    const next = { ...preferencesRef.current, ...patch };
    setPreferences(next);
    writeFinderPreferences(next);
  };

  const state: FinderState = { preferences, section };
  const actions: FinderActions = { setSection, updatePreferences };

  return (
    <FinderActionsContext value={actions}>
      <FinderStateContext value={state}>{children}</FinderStateContext>
    </FinderActionsContext>
  );
}
