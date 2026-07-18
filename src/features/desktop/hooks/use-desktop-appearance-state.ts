import { useContext } from 'react';

import { DesktopAppearanceStateContext } from '@/features/desktop/contexts/desktop-appearance-state-context';

export function useDesktopAppearanceState() {
  const state = useContext(DesktopAppearanceStateContext);
  if (!state) throw new Error('useDesktopAppearanceState must be used inside DesktopProvider.');
  return state;
}
