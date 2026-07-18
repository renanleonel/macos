import { FinderView } from '@/features/finder/domain/enums/finder-view';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';

export const DEFAULT_FINDER_PREFERENCES: FinderPreferences = {
  view: FinderView.ICONS,
  showSidebar: true,
  showPreview: false,
  showStatusBar: true,
  iconSize: 58,
};
