import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';

export type TodayTask = {
  id: TodayTaskId;
  label: string;
};
