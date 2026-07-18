import { useContext } from 'react';

import { DesktopInteractionActionsContext } from '@/features/desktop/contexts/desktop-interaction-actions-context';

export function useDesktopInteractionActions() {
  const actions = useContext(DesktopInteractionActionsContext);
  if (!actions)
    throw new Error('useDesktopInteractionActions must be used inside DesktopProvider.');
  return actions;
}
