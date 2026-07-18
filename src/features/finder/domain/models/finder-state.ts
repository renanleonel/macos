import type { FinderSection } from '@/features/finder/domain/enums/finder-section';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';

export type FinderState = {
  preferences: FinderPreferences;
  section: FinderSection;
};
