import { FinderView } from '@/features/finder/domain/enums/finder-view';

export type FinderPreferences = {
  view: FinderView;
  showSidebar: boolean;
  showPreview: boolean;
  showStatusBar: boolean;
  iconSize: number;
};
