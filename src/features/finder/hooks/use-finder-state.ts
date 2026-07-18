import { useContext } from 'react';

import { FinderStateContext } from '@/features/finder/contexts/finder-state-context';

export function useFinderState() {
  const state = useContext(FinderStateContext);
  if (!state) throw new Error('useFinderState must be used inside FinderProvider.');
  return state;
}
