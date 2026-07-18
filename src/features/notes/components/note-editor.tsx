import { cn } from '@/shared/utils/cn';
import { TODAY_TASKS } from '@/features/notes/domain/constants/today-tasks';
import { NoteId } from '@/features/notes/domain/enums/note-id';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import type { Note } from '@/features/notes/domain/models/note';

type NoteEditorProps = {
  note: Note;
  completedTasks: TodayTaskId[];
  onToggleTask: (taskId: TodayTaskId) => void;
};

export function NoteEditor({ note, completedTasks, onToggleTask }: NoteEditorProps) {
  const completed = new Set<TodayTaskId>(completedTasks);

  return (
    <article
      className={cn(
        'note-editor',
        '[&.note-editor]:flex-1 [&.note-editor]:p-[35px_46px] [&.note-editor]:overflow-auto [&.note-editor]:text-[oklch(0.22_0.01_250)] [&.note-editor]:[user-select:text] [&.note-editor]:[background:var(--material-content)]',
        '[&.note-editor_time]:block [&.note-editor_time]:mb-6 [&.note-editor_time]:text-[oklch(0.58_0.01_250)] [&.note-editor_time]:text-center [&.note-editor_time]:text-[11px]',
        '[&.note-editor_h1]:m-[0_0_20px] [&.note-editor_h1]:text-[25px]',
        '[&.note-editor_h2]:m-[28px_0_8px] [&.note-editor_h2]:text-[17px]',
        '[&.note-editor_p]:text-[15px] [&.note-editor_p]:leading-[1.6]',
        '[&.note-editor_li]:text-[15px] [&.note-editor_li]:leading-[1.6]',
        '[&.note-editor_ul]:pl-5',
        '[&.note-editor_blockquote]:m-[28px_0] [&.note-editor_blockquote]:p-[12px_16px] [&.note-editor_blockquote]:rounded-[10px] [&.note-editor_blockquote]:[background:oklch(0.94_0.05_85)] [&.note-editor_blockquote]:text-[16px]',
      )}
      aria-live='polite'
    >
      <time>{note.updated}</time>
      <h1>{note.editorTitle}</h1>
      <p>{note.intro}</p>
      <h2>{note.sectionTitle}</h2>
      {note.id === NoteId.NOW ? (
        <ul
          className={cn(
            'note-task-list',
            '[&.note-task-list_input]:flex-[0_0_auto] [&.note-task-list_input]:m-0 [&.note-task-list_input]:accent-(--system-blue)',
            '[&.note-task-list_li.is-complete_span]:text-[oklch(0.52_0.01_250)] [&.note-task-list_li.is-complete_span]:[text-decoration:line-through]',
            '[&.note-task-list]:[list-style:none]',
            '[&.note-task-list_li]:m-[7px_0]',
            '[&.note-task-list_label]:flex [&.note-task-list_label]:items-center [&.note-task-list_label]:gap-2.25',
          )}
        >
          {TODAY_TASKS.map((task) => (
            <li className={cn(completed.has(task.id) ? 'is-complete' : '')} key={task.id}>
              <label>
                <input
                  type='checkbox'
                  checked={completed.has(task.id)}
                  onChange={() => onToggleTask(task.id)}
                />
                <span>{task.label}</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {note.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <blockquote>{note.quote}</blockquote>
      <p>{note.closing}</p>
    </article>
  );
}
