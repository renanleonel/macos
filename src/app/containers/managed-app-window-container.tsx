import { memo } from 'react';

import { AppContentContainer } from '@/app/containers/app-content-container';
import { AppWindow } from '@/features/window-manager/components/app-window';
import type { DesktopRevealEdge } from '@/features/window-manager/domain/enums/desktop-reveal-edge';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';
import { useWindowActions } from '@/features/window-manager/hooks/use-window-actions';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type { AppId } from '@/shared/domain/enums/app-id';

type ManagedAppWindowContainerProps = {
  window: WindowState;
  active: boolean;
  desktopRevealed: boolean;
  revealEdge: DesktopRevealEdge;
  revealIndex: number;
  openApp: (app: AppId) => void;
  settingsSection: SettingsSectionId;
  setSettingsSection: (section: SettingsSectionId) => void;
};

export const ManagedAppWindowContainer = memo(function ManagedAppWindowContainer({
  window,
  active,
  desktopRevealed,
  revealEdge,
  revealIndex,
  openApp,
  settingsSection,
  setSettingsSection,
}: ManagedAppWindowContainerProps) {
  const { focusWindow, closeWindow, moveWindow, minimizeWindow, toggleMaximizeWindow } =
    useWindowActions();

  return (
    <AppWindow
      window={window}
      active={active}
      desktopRevealed={desktopRevealed}
      revealEdge={revealEdge}
      revealIndex={revealIndex}
      focusWindow={focusWindow}
      closeWindow={closeWindow}
      moveWindow={moveWindow}
      minimizeWindow={minimizeWindow}
      toggleMaximizeWindow={toggleMaximizeWindow}
    >
      <AppContentContainer
        app={window.app}
        openApp={openApp}
        settingsSection={settingsSection}
        setSettingsSection={setSettingsSection}
      />
    </AppWindow>
  );
});
