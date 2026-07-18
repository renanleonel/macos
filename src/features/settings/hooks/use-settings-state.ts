import { useContext } from 'react';

import { SettingsStateContext } from '@/features/settings/contexts/settings-state-context';

export function useSettingsState() {
  const context = useContext(SettingsStateContext);
  if (!context) throw new Error('useSettingsState must be used within SettingsProvider.');
  return context;
}
