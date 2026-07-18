import { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import type { TodayTask } from '@/features/notes/domain/models/today-task';

export const TODAY_TASKS: readonly TodayTask[] = [
  { id: TodayTaskId.DETAILS, label: 'Polish the tiny details.' },
  { id: TodayTaskId.SHIP, label: 'Ship something memorable.' },
  { id: TodayTaskId.REPLY, label: 'Reply to good people.' },
];
