import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';

export function toggleCompletedTask(
  completedTasks: TodayTaskId[],
  taskId: TodayTaskId,
): TodayTaskId[] {
  return completedTasks.includes(taskId)
    ? completedTasks.filter((id) => id !== taskId)
    : [...completedTasks, taskId];
}
