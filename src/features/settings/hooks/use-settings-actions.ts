import { useContext } from 'react';

import { SettingsActionsContext } from '@/features/settings/contexts/settings-actions-context';

export function useSettingsActions() {
  const context = useContext(SettingsActionsContext);
  if (!context) throw new Error('useSettingsActions must be used within SettingsProvider.');
  return context;
}
