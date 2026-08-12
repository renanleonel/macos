import {
  TODAY_TASKS,
  TODAY_WIDGET_TASK_LIMIT,
} from '@/features/notes/domain/constants/today-tasks';
import { NoteId } from '@/features/notes/domain/enums/note-id';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import { cn } from '@/shared/utils/cn';

type TodayWidgetProps = {
  completedTasks: TodayTaskId[];
  onToggleTask: (taskId: TodayTaskId) => void;
  onOpenNote: (noteId: NoteId) => void;
};

export function TodayWidget({ completedTasks, onToggleTask, onOpenNote }: TodayWidgetProps) {
  const completed = new Set<TodayTaskId>(completedTasks);
  const remainingTasks = TODAY_TASKS.length - completedTasks.length;
  // A macOS widget is a fixed-size summary: it shows what fits and sends you to
  // the app for the rest. It never scrolls.
  const visibleTasks = TODAY_TASKS.slice(0, TODAY_WIDGET_TASK_LIMIT);

  return (
    <section
      className={cn(
        'widget',
        'widget--today',
        '[&.widget]:min-w-0 [&.widget]:h-37 [&.widget]:flex [&.widget]:flex-col [&.widget]:p-[12px_12px] [&.widget]:overflow-hidden [&.widget]:rounded-2xl [&.widget]:[background:linear-gradient(145deg,oklch(1_0_0/0.7),oklch(0.965_0.012_245/0.57)),var(--glass-regular)] [&.widget]:[backdrop-filter:blur(30px)_saturate(1.35)] [&.widget]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_5px_12px_oklch(0.08_0.03_245/0.16)] [&.widget]:text-[13px] [&.widget]:pointer-events-auto [&.widget]:[-webkit-backdrop-filter:blur(30px)_saturate(1.35)]',
        '[&.widget_small]:text-[oklch(0.5_0.01_250)]',
        '[&.widget--today_label]:min-w-0 [&.widget--today_label]:flex [&.widget--today_label]:items-center [&.widget--today_label]:gap-1.5 [&.widget--today_label]:m-[4px_0]',
        '[&.widget--today_input]:flex-[0_0_auto] [&.widget--today_input]:m-0 [&.widget--today_input]:accent-(--system-blue)',
        '[&.widget--today_label_>_span]:min-w-0 [&.widget--today_label_>_span]:overflow-hidden [&.widget--today_label_>_span]:text-ellipsis [&.widget--today_label_>_span]:whitespace-nowrap',
        '[&.widget--today_label.is-complete_>_span]:text-[oklch(0.52_0.01_250)] [&.widget--today_label.is-complete_>_span]:[text-decoration:line-through]',
        '[&.widget--today_>_small]:block [&.widget--today_>_small]:mt-auto [&.widget--today_>_small]:pt-1',
      )}
    >
      <button
        type='button'
        className={cn(
          'widget-heading-button',
          '[&.widget-heading-button]:w-full [&.widget-heading-button]:flex [&.widget-heading-button]:items-baseline [&.widget-heading-button]:justify-between [&.widget-heading-button]:m-[0_0_2px] [&.widget-heading-button]:p-0 [&.widget-heading-button]:[border:0] [&.widget-heading-button]:text-inherit [&.widget-heading-button]:[background:transparent] [&.widget-heading-button]:font-bold [&.widget-heading-button]:text-left [&.widget-heading-button]:cursor-default [&.widget-heading-button]:[transition:scale_120ms_ease-out]',
          '[&.widget-heading-button_>_span]:text-(--system-blue-deep) [&.widget-heading-button_>_span]:text-[9px] [&.widget-heading-button_>_span]:font-semibold',
          '[&.widget-heading-button:active]:scale-[0.98]',
        )}
        onClick={() => onOpenNote(NoteId.GUIDE)}
      >
        Start here <span>Open Notes</span>
      </button>
      {visibleTasks.map((task) => (
        <label className={cn(completed.has(task.id) ? 'is-complete' : '')} key={task.id}>
          <input
            type='checkbox'
            checked={completed.has(task.id)}
            onChange={() => onToggleTask(task.id)}
          />
          <span>{task.label}</span>
        </label>
      ))}
      <small aria-live='polite'>
        {remainingTasks === 0 ? 'All complete' : `${remainingTasks} remaining`}
      </small>
    </section>
  );
}
