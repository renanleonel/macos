import { useContext } from 'react';

import { WindowActionsContext } from '@/features/window-manager/contexts/window-actions-context';

export function useWindowActions() {
  const actions = useContext(WindowActionsContext);
  if (!actions) throw new Error('useWindowActions must be used inside WindowManagerProvider.');
  return actions;
}
