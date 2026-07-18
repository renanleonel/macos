import { MenuCommand } from '@/features/desktop/components/menu-command';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { FinderView } from '@/features/finder/domain/enums/finder-view';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
type ViewMenuProps = {
  preferences: FinderPreferences;
  updatePreferences: (patch: Partial<FinderPreferences>) => void;
  maximize: () => void;
  close: () => void;
};
export function ViewMenu({ preferences, updatePreferences, maximize, close }: ViewMenuProps) {
  const selectView = (view: FinderView) => {
    updatePreferences({ view });
    close();
  };
  return (
    <SystemMenu className='view-menu [&.view-menu]:left-40.5'>
      <MenuCommand
        checked={preferences.view === FinderView.ICONS}
        onClick={() => selectView(FinderView.ICONS)}
      >
        as Icons
      </MenuCommand>
      <MenuCommand
        checked={preferences.view === FinderView.LIST}
        onClick={() => selectView(FinderView.LIST)}
      >
        as List
      </MenuCommand>
      <MenuCommand
        checked={preferences.view === FinderView.COLUMNS}
        onClick={() => selectView(FinderView.COLUMNS)}
      >
        as Columns
      </MenuCommand>
      <MenuCommand
        checked={preferences.view === FinderView.GALLERY}
        onClick={() => selectView(FinderView.GALLERY)}
      >
        as Gallery
      </MenuCommand>
      <hr />
      <MenuCommand
        shortcut='⌥⌘S'
        checked={preferences.showSidebar}
        onClick={() => updatePreferences({ showSidebar: !preferences.showSidebar })}
      >
        Show Sidebar
      </MenuCommand>
      <MenuCommand
        shortcut='⇧⌘P'
        checked={preferences.showPreview}
        onClick={() => updatePreferences({ showPreview: !preferences.showPreview })}
      >
        Show Preview
      </MenuCommand>
      <MenuCommand
        shortcut='⌘/'
        checked={preferences.showStatusBar}
        onClick={() => updatePreferences({ showStatusBar: !preferences.showStatusBar })}
      >
        Show Status Bar
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⌃⌘F' onClick={maximize}>
        Enter Full Screen
      </MenuCommand>
    </SystemMenu>
  );
}
