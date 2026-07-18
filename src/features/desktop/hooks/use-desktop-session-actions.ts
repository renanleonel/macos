import { useContext } from 'react';

import { DesktopSessionActionsContext } from '@/features/desktop/contexts/desktop-session-actions-context';

export function useDesktopSessionActions() {
  const actions = useContext(DesktopSessionActionsContext);
  if (!actions) throw new Error('useDesktopSessionActions must be used inside DesktopProvider.');
  return actions;
}
