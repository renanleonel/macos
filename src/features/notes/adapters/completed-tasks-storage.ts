import { TODAY_TASKS } from '@/features/notes/domain/constants/today-tasks';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import { readLocalStorage, writeLocalStorage } from '@/shared/adapters/local-storage';

export const COMPLETED_TASKS_STORAGE_KEY = 'macos27:today-completed';

export function parseCompletedTasks(serializedTasks: string | null): TodayTaskId[] {
  try {
    const saved = JSON.parse(serializedTasks ?? '[]') as unknown;
    if (!Array.isArray(saved)) return [];

    const taskIds = new Set<string>(TODAY_TASKS.map((task) => task.id));
    return saved.filter((id): id is TodayTaskId => typeof id === 'string' && taskIds.has(id));
  } catch {
    return [];
  }
}

export function serializeCompletedTasks(completedTasks: TodayTaskId[]): string {
  return JSON.stringify(completedTasks);
}

export function readCompletedTasks(): TodayTaskId[] {
  return parseCompletedTasks(readLocalStorage(COMPLETED_TASKS_STORAGE_KEY));
}

export function writeCompletedTasks(completedTasks: TodayTaskId[]): void {
  writeLocalStorage(COMPLETED_TASKS_STORAGE_KEY, serializeCompletedTasks(completedTasks));
}
