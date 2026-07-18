import { useContext } from 'react';

import { DesktopInteractionStateContext } from '@/features/desktop/contexts/desktop-interaction-state-context';

export function useDesktopInteractionState() {
  const state = useContext(DesktopInteractionStateContext);
  if (!state) throw new Error('useDesktopInteractionState must be used inside DesktopProvider.');
  return state;
}
