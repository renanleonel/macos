import { useContext } from 'react';

import { DesktopSessionStateContext } from '@/features/desktop/contexts/desktop-session-state-context';

export function useDesktopSessionState() {
  const state = useContext(DesktopSessionStateContext);
  if (!state) throw new Error('useDesktopSessionState must be used inside DesktopProvider.');
  return state;
}
