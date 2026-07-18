import { Check } from 'lucide-react';

import { FinderView } from '@/features/finder/domain/enums/finder-view';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
import { FINDER_TOOLBAR_POPOVER_CLASSES } from '@/features/finder/utils/finder-toolbar-popover-classes';
import { cn } from '@/shared/utils/cn';

type FinderMoreMenuProps = {
  preferences: FinderPreferences;
  onCloseMenu: () => void;
  onUpdatePreferences: (patch: Partial<FinderPreferences>) => void;
};

export function FinderMoreMenu({
  preferences,
  onCloseMenu,
  onUpdatePreferences,
}: FinderMoreMenuProps) {
  return (
    <div
      className={cn(
        'finder-toolbar-popover',
        'finder-more-popover',
        ...FINDER_TOOLBAR_POPOVER_CLASSES,
        '[&.finder-more-popover]:right-43.5',
      )}
      role='menu'
      aria-label='Finder actions'
      onPointerDown={(event) => event.stopPropagation()}
    >
      <button
        type='button'
        role='menuitemradio'
        aria-checked={preferences.view === FinderView.ICONS}
        onClick={() => {
          onUpdatePreferences({ view: FinderView.ICONS });
          onCloseMenu();
        }}
      >
        <span>{preferences.view === FinderView.ICONS ? <Check size={13} /> : null} Icons</span>
      </button>
      <button
        type='button'
        role='menuitemradio'
        aria-checked={preferences.view === FinderView.LIST}
        onClick={() => {
          onUpdatePreferences({ view: FinderView.LIST });
          onCloseMenu();
        }}
      >
        <span>{preferences.view === FinderView.LIST ? <Check size={13} /> : null} List</span>
      </button>
      <hr />
      <button
        type='button'
        role='menuitemcheckbox'
        aria-checked={preferences.showPreview}
        onClick={() => onUpdatePreferences({ showPreview: !preferences.showPreview })}
      >
        <span>{preferences.showPreview ? <Check size={13} /> : null} Show Preview</span>
      </button>
      <button
        type='button'
        role='menuitemcheckbox'
        aria-checked={preferences.showStatusBar}
        onClick={() => onUpdatePreferences({ showStatusBar: !preferences.showStatusBar })}
      >
        <span>{preferences.showStatusBar ? <Check size={13} /> : null} Show Status Bar</span>
      </button>
    </div>
  );
}
