import { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import type { TodayTask } from '@/features/notes/domain/models/today-task';
import { PROFILE } from '@/shared/domain/constants/profile';

/**
 * The visitor guide, shown twice: `label` in the Today widget and `detail` in
 * the note. Like a real macOS widget, the desktop card shows only the first few
 * and sends you to the app for the rest — see TODAY_WIDGET_TASK_LIMIT.
 */
export const TODAY_TASKS: readonly TodayTask[] = [
  {
    id: TodayTaskId.SAFARI,
    label: 'Open Safari',
    detail: 'Open Safari for my open-source projects and articles.',
  },
  {
    id: TodayTaskId.TERMINAL,
    label: 'Type help in Terminal',
    detail: 'Type help in Terminal for about, experience, projects, skills and contact.',
  },
  {
    id: TodayTaskId.ABOUT,
    label: 'Open About Me',
    detail: 'Open About Me in the Dock for a summary and every link.',
  },
  {
    id: TodayTaskId.EMAIL,
    label: 'Email me',
    detail: `Email me at ${PROFILE.email}.`,
  },
];

/** How many rows fit the widget at the same height as the other cards. */
export const TODAY_WIDGET_TASK_LIMIT = 3;
