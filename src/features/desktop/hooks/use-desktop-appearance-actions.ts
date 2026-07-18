import { useContext } from 'react';

import { DesktopAppearanceActionsContext } from '@/features/desktop/contexts/desktop-appearance-actions-context';

export function useDesktopAppearanceActions() {
  const actions = useContext(DesktopAppearanceActionsContext);
  if (!actions) throw new Error('useDesktopAppearanceActions must be used inside DesktopProvider.');
  return actions;
}
