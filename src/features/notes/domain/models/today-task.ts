import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';

export type TodayTask = {
  id: TodayTaskId;
  /** Short form for the desktop widget, which is one narrow line per row. */
  label: string;
  /** Full sentence for the note, where there is room to explain. */
  detail: string;
};
