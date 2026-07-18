import { DesktopCompositionContainer } from '@/app/containers/desktop-composition-container';
import { DesktopProvider } from '@/features/desktop/containers/desktop-provider';
import { FinderProvider } from '@/features/finder/containers/finder-provider';
import { NotesProvider } from '@/features/notes/containers/notes-provider';
import { WindowManagerProvider } from '@/features/window-manager/containers/window-manager-provider';

export function App() {
  return (
    <WindowManagerProvider>
      <DesktopProvider>
        <FinderProvider>
          <NotesProvider>
            <DesktopCompositionContainer />
          </NotesProvider>
        </FinderProvider>
      </DesktopProvider>
    </WindowManagerProvider>
  );
}
