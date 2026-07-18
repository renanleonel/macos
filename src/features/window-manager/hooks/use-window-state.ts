import { useContext } from 'react';

import { WindowStateContext } from '@/features/window-manager/contexts/window-state-context';

export function useWindowState() {
  const windows = useContext(WindowStateContext);
  if (!windows) throw new Error('useWindowState must be used inside WindowManagerProvider.');
  return windows;
}
