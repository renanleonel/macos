import { MenuCommand } from '@/features/desktop/components/menu-command';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { FinderView } from '@/features/finder/domain/enums/finder-view';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
type ViewMenuProps = {
  preferences: FinderPreferences;
  updatePreferences: (patch: Partial<FinderPreferences>) => void;
  finderCommandsEnabled: boolean;
  maximized: boolean;
  maximize: () => void;
  close: () => void;
};
export function ViewMenu({
  preferences,
  updatePreferences,
  finderCommandsEnabled,
  maximized,
  maximize,
  close,
}: ViewMenuProps) {
  const selectView = (view: FinderView) => {
    updatePreferences({ view });
    close();
  };
  const togglePreference = (patch: Partial<FinderPreferences>) => {
    updatePreferences(patch);
    close();
  };
  return (
    <SystemMenu className='view-menu [&.view-menu]:left-40.5'>
      <MenuCommand
        checked={preferences.view === FinderView.ICONS}
        disabled={!finderCommandsEnabled}
        onClick={() => selectView(FinderView.ICONS)}
      >
        as Icons
      </MenuCommand>
      <MenuCommand
        checked={preferences.view === FinderView.LIST}
        disabled={!finderCommandsEnabled}
        onClick={() => selectView(FinderView.LIST)}
      >
        as List
      </MenuCommand>
      <MenuCommand
        checked={preferences.view === FinderView.COLUMNS}
        disabled={!finderCommandsEnabled}
        onClick={() => selectView(FinderView.COLUMNS)}
      >
        as Columns
      </MenuCommand>
      <MenuCommand
        checked={preferences.view === FinderView.GALLERY}
        disabled={!finderCommandsEnabled}
        onClick={() => selectView(FinderView.GALLERY)}
      >
        as Gallery
      </MenuCommand>
      <hr />
      <MenuCommand
        shortcut='⌥⌘S'
        checked={preferences.showSidebar}
        disabled={!finderCommandsEnabled}
        onClick={() => togglePreference({ showSidebar: !preferences.showSidebar })}
      >
        {preferences.showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
      </MenuCommand>
      <MenuCommand
        shortcut='⇧⌘P'
        checked={preferences.showPreview}
        disabled={!finderCommandsEnabled}
        onClick={() => togglePreference({ showPreview: !preferences.showPreview })}
      >
        {preferences.showPreview ? 'Hide Preview' : 'Show Preview'}
      </MenuCommand>
      <MenuCommand
        shortcut='⌘/'
        checked={preferences.showStatusBar}
        disabled={!finderCommandsEnabled}
        onClick={() => togglePreference({ showStatusBar: !preferences.showStatusBar })}
      >
        {preferences.showStatusBar ? 'Hide Status Bar' : 'Show Status Bar'}
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⌃⌘F' onClick={maximize}>
        {maximized ? 'Exit Full Screen' : 'Enter Full Screen'}
      </MenuCommand>
    </SystemMenu>
  );
}
