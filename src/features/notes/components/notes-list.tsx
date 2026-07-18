import { cn } from '@/shared/utils/cn';
import type { NoteId } from '@/features/notes/domain/enums/note-id';
import type { Note } from '@/features/notes/domain/models/note';

type NotesListProps = {
  notes: readonly Note[];
  selectedId: NoteId;
  onSelectNote: (noteId: NoteId) => void;
};

export function NotesList({ notes, selectedId, onSelectNote }: NotesListProps) {
  return (
    <aside className='notes-list [&.notes-list]:w-61.25 [&.notes-list]:flex-[0_0_245px] [&.notes-list]:p-2 [&.notes-list]:[border-right:1px_solid_var(--separator)] [&.notes-list]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.notes-list]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.notes-list]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)] max-[900px]:[&.notes-list]:w-41.25 max-[900px]:[&.notes-list]:basis-41.25 max-[600px]:[&.notes-list]:hidden'>
      {notes.map((item) => (
        <button
          type='button'
          key={item.id}
          className={cn(
            `note-row${selectedId === item.id ? ' selected' : ''}`,
            '[&.note-row]:w-full [&.note-row]:p-2.5 [&.note-row]:grid [&.note-row]:grid-cols-[1fr_auto] [&.note-row]:[border:0] [&.note-row]:rounded-[7px] [&.note-row]:[background:transparent] [&.note-row]:text-left',
            '[&.note-row:not(.selected):hover]:[background:oklch(0.82_0.04_84/0.38)]',
            '[&.note-row.selected]:[background:oklch(0.83_0.12_84/0.84)] [&.note-row.selected]:[box-shadow:inset_0_1px_oklch(1_0_0/0.45)]',
            '[&.note-row_strong]:overflow-hidden [&.note-row_strong]:whitespace-nowrap [&.note-row_strong]:text-ellipsis',
            '[&.note-row_span]:text-[oklch(0.5_0.01_250)] [&.note-row_span]:text-[11px]',
            '[&.note-row_p]:col-span-full [&.note-row_p]:m-[3px_0_0] [&.note-row_p]:text-[oklch(0.48_0.01_250)] [&.note-row_p]:text-[12px] [&.note-row_p]:whitespace-nowrap [&.note-row_p]:overflow-hidden [&.note-row_p]:text-ellipsis',
          )}
          aria-current={selectedId === item.id ? 'page' : undefined}
          onClick={() => onSelectNote(item.id)}
        >
          <strong>{item.title}</strong>
          <span>{item.date}</span>
          <p>{item.preview}</p>
        </button>
      ))}
    </aside>
  );
}
