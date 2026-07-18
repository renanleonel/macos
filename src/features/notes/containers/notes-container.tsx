import { NoteEditor } from '@/features/notes/components/note-editor';
import { NotesList } from '@/features/notes/components/notes-list';
import { NOTES } from '@/features/notes/domain/constants/notes';
import { selectNoteById } from '@/features/notes/domain/selectors/select-note-by-id';
import { useNotesActions } from '@/features/notes/hooks/use-notes-actions';
import { useNotesState } from '@/features/notes/hooks/use-notes-state';

export function NotesContainer() {
  const { selectedNoteId, completedTasks } = useNotesState();
  const { selectNote, toggleTask } = useNotesActions();
  const note = selectNoteById(selectedNoteId);

  return (
    <div className='notes-app [&.notes-app]:h-full [&.notes-app]:flex [&.notes-app]:[background:var(--material-content)]'>
      <NotesList notes={NOTES} selectedId={selectedNoteId} onSelectNote={selectNote} />
      <NoteEditor note={note} completedTasks={completedTasks} onToggleTask={toggleTask} />
    </div>
  );
}
