import { useContext } from 'react';

import { FinderActionsContext } from '@/features/finder/contexts/finder-actions-context';

export function useFinderActions() {
  const actions = useContext(FinderActionsContext);
  if (!actions) throw new Error('useFinderActions must be used inside FinderProvider.');
  return actions;
}
