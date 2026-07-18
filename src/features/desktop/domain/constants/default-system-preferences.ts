import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';

export const DEFAULT_SYSTEM_PREFERENCES: SystemPreferences = {
  dockAutoHide: false,
  showRecentApps: true,
  dockSize: 50,
  doNotDisturb: false,
  volume: 45,
};
