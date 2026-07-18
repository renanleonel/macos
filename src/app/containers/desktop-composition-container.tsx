import {
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import { ManagedAppWindowContainer } from '@/app/containers/managed-app-window-container';
import { AppleMenu } from '@/features/desktop/components/apple-menu';
import { BatteryMenu } from '@/features/desktop/components/battery-menu';
import { BootScreen } from '@/features/desktop/components/boot-screen';
import { ControlCenter } from '@/features/desktop/components/control-center';
import { DesktopFiles } from '@/features/desktop/components/desktop-files';
import { DesktopShell } from '@/features/desktop/components/desktop-shell';
import { DesktopWidgets } from '@/features/desktop/components/desktop-widgets';
import { DisplayDimmer } from '@/features/desktop/components/display-dimmer';
import { Dock } from '@/features/desktop/components/dock';
import { DockHotzone } from '@/features/desktop/components/dock-hotzone';
import { EditMenu } from '@/features/desktop/components/edit-menu';
import { FileMenu } from '@/features/desktop/components/file-menu';
import { ForceQuitDialog } from '@/features/desktop/components/force-quit-dialog';
import { GoMenu } from '@/features/desktop/components/go-menu';
import { HelpMenu } from '@/features/desktop/components/help-menu';
import { Launchpad } from '@/features/desktop/components/launchpad';
import { LoginScreen } from '@/features/desktop/components/login-screen';
import { MenuBar } from '@/features/desktop/components/menu-bar';
import { NotificationCenter } from '@/features/desktop/components/notification-center';
import { ShutdownScreen } from '@/features/desktop/components/shutdown-screen';
import { SiriMenu } from '@/features/desktop/components/siri-menu';
import { SleepScreen } from '@/features/desktop/components/sleep-screen';
import { Spotlight } from '@/features/desktop/components/spotlight';
import { ViewMenu } from '@/features/desktop/components/view-menu';
import { WifiMenu } from '@/features/desktop/components/wifi-menu';
import { WindowMenu } from '@/features/desktop/components/window-menu';
import { ACCENT_COLORS } from '@/features/desktop/domain/constants/accent-colors';
import { BootMode } from '@/features/desktop/domain/enums/boot-mode';
import { OverlayId } from '@/features/desktop/domain/enums/overlay-id';
import { PowerState } from '@/features/desktop/domain/enums/power-state';
import { SystemDialogId } from '@/features/desktop/domain/enums/system-dialog-id';
import { useDesktopAppearanceActions } from '@/features/desktop/hooks/use-desktop-appearance-actions';
import { useDesktopAppearanceState } from '@/features/desktop/hooks/use-desktop-appearance-state';
import { useDesktopInteractionActions } from '@/features/desktop/hooks/use-desktop-interaction-actions';
import { useDesktopInteractionState } from '@/features/desktop/hooks/use-desktop-interaction-state';
import { useDesktopSessionActions } from '@/features/desktop/hooks/use-desktop-session-actions';
import { useDesktopSessionState } from '@/features/desktop/hooks/use-desktop-session-state';
import { useDesktopShortcuts } from '@/features/desktop/hooks/use-desktop-shortcuts';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import { useFinderActions } from '@/features/finder/hooks/use-finder-actions';
import { useFinderState } from '@/features/finder/hooks/use-finder-state';
import { NoteId } from '@/features/notes/domain/enums/note-id';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import { useNotesActions } from '@/features/notes/hooks/use-notes-actions';
import { useNotesState } from '@/features/notes/hooks/use-notes-state';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { DESKTOP_REVEAL_EDGES } from '@/features/window-manager/domain/constants/desktop-reveal-edges';
import { DesktopRevealEdge } from '@/features/window-manager/domain/enums/desktop-reveal-edge';
import {
  selectActiveWindow,
  selectFullscreenWindow,
} from '@/features/window-manager/domain/selectors/window-selectors';
import { useWindowActions } from '@/features/window-manager/hooks/use-window-actions';
import { useWindowState } from '@/features/window-manager/hooks/use-window-state';
import { AppId } from '@/shared/domain/enums/app-id';
import { DockUtilityId } from '@/shared/domain/enums/dock-utility-id';
import type { DockId } from '@/shared/domain/models/dock-id';

export function DesktopCompositionContainer() {
  const windows = useWindowState();
  const { openWindow, closeWindow, focusWindow, minimizeWindow, toggleMaximizeWindow } =
    useWindowActions();
  const { dark, accentColor, lowPower, systemPreferences, brightness } =
    useDesktopAppearanceState();
  const { setDark, setLowPower, updateSystemPreferences, setBrightness } =
    useDesktopAppearanceActions();
  const { loggedIn, bootMode, powerState, systemDialog } = useDesktopSessionState();
  const { setLoggedIn, setBootMode, setPowerState, setSystemDialog } = useDesktopSessionActions();
  const { overlay, showDesktop, selectedDesktopFile } = useDesktopInteractionState();
  const { setOverlay, setShowDesktop, setSelectedDesktopFile } = useDesktopInteractionActions();
  const { preferences: finderPreferences } = useFinderState();
  const { setSection: setFinderSection, updatePreferences: updateFinderPreferences } =
    useFinderActions();
  const { completedTasks } = useNotesState();
  const { selectNote, toggleTask } = useNotesActions();
  const [settingsSection, setSettingsSection] = useState<SettingsSectionId>(
    SettingsSectionId.APPEARANCE,
  );
  const activeWindow = useMemo(() => selectActiveWindow(windows), [windows]);
  const fullscreenWindow = useMemo(() => selectFullscreenWindow(windows), [windows]);
  const activeApp = activeWindow?.app ?? AppId.FINDER;
  const accent = ACCENT_COLORS[accentColor];
  const desktopStyle = {
    '--system-blue': accent.color,
    '--system-blue-deep': accent.deep,
    '--keyboard-focus': accent.color,
    '--link-color': accent.deep,
  } as CSSProperties;

  const openApp = useCallback(
    (app: AppId) => {
      setShowDesktop(false);
      openWindow(app);
      setOverlay(null);
    },
    [openWindow, setOverlay, setShowDesktop],
  );
  const openSettings = useCallback(
    (section: SettingsSectionId) => {
      setSettingsSection(section);
      openApp(AppId.SETTINGS);
    },
    [openApp],
  );
  const launch = useCallback(
    (app: DockId) => {
      setShowDesktop(false);
      if (app === DockUtilityId.LAUNCHPAD) {
        return setOverlay(overlay === OverlayId.LAUNCHPAD ? null : OverlayId.LAUNCHPAD);
      }
      if (app === DockUtilityId.MAIL) return openApp(AppId.MESSAGES);
      if (app === DockUtilityId.TRASH) {
        setFinderSection(FinderSection.TRASH);
        return openApp(AppId.FINDER);
      }
      openApp(app);
    },
    [openApp, overlay, setFinderSection, setOverlay, setShowDesktop],
  );
  const closeOverlay = useCallback(() => setOverlay(null), [setOverlay]);
  const minimizeActiveWindow = useCallback(() => {
    setShowDesktop(false);
    if (activeWindow) minimizeWindow(activeWindow.id);
    setOverlay(null);
  }, [activeWindow, minimizeWindow, setOverlay, setShowDesktop]);
  const maximizeActiveWindow = useCallback(() => {
    setShowDesktop(false);
    if (activeWindow) toggleMaximizeWindow(activeWindow.id);
    setOverlay(null);
  }, [activeWindow, setOverlay, setShowDesktop, toggleMaximizeWindow]);
  const focusActiveWindow = useCallback(() => {
    setShowDesktop(false);
    if (activeWindow) focusWindow(activeWindow.id);
    setOverlay(null);
  }, [activeWindow, focusWindow, setOverlay, setShowDesktop]);
  const openNote = useCallback(
    (noteId: NoteId) => {
      selectNote(noteId);
      openApp(AppId.NOTES);
    },
    [openApp, selectNote],
  );
  const toggleTodayTask = useCallback((taskId: TodayTaskId) => toggleTask(taskId), [toggleTask]);

  useDesktopShortcuts(setOverlay, setShowDesktop);

  const revealableWindows = useMemo(
    () => windows.filter((window) => !window.minimized && !window.maximized),
    [windows],
  );
  const revealEdgeByWindow = useMemo(
    () =>
      new Map(
        revealableWindows.map((window, index) => [
          window.id,
          DESKTOP_REVEAL_EDGES[index % DESKTOP_REVEAL_EDGES.length],
        ]),
      ),
    [revealableWindows],
  );
  const revealIndexByWindow = useMemo(
    () => new Map(revealableWindows.map((window, index) => [window.id, index])),
    [revealableWindows],
  );
  const onDesktopPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    setOverlay(null);
    if (event.target !== event.currentTarget) return;
    setSelectedDesktopFile(null);
    if (fullscreenWindow || revealableWindows.length === 0) return;
    setShowDesktop((current) => !current);
  };

  if (bootMode) return <BootScreen />;
  if (powerState === PowerState.SLEEPING) {
    return <SleepScreen wake={() => setPowerState(PowerState.AWAKE)} />;
  }
  if (powerState === PowerState.SHUTDOWN) {
    return (
      <ShutdownScreen
        powerOn={() => {
          setPowerState(PowerState.AWAKE);
          setBootMode(BootMode.STARTUP);
        }}
      />
    );
  }

  return (
    <DesktopShell
      dark={dark}
      fullscreen={Boolean(fullscreenWindow)}
      showingDesktop={showDesktop}
      dockAutoHide={systemPreferences.dockAutoHide}
      style={desktopStyle}
      onPointerDown={onDesktopPointerDown}
    >
      {!loggedIn ? (
        <LoginScreen enter={() => setLoggedIn(true)} />
      ) : (
        <>
          <DesktopWidgets
            windows={windows}
            dark={dark}
            lowPower={lowPower}
            brightness={brightness}
            completedTasks={completedTasks}
            onToggleTask={toggleTodayTask}
            onOpenNote={openNote}
            openSettings={() => openSettings(SettingsSectionId.APPEARANCE)}
          />
          <DesktopFiles
            openApp={openApp}
            selectedFile={selectedDesktopFile}
            onSelectFile={setSelectedDesktopFile}
          />
          {windows.map((window) => (
            <ManagedAppWindowContainer
              key={window.id}
              window={window}
              active={window.id === activeWindow?.id}
              desktopRevealed={showDesktop}
              revealEdge={revealEdgeByWindow.get(window.id) ?? DesktopRevealEdge.LEFT}
              revealIndex={revealIndexByWindow.get(window.id) ?? 0}
              openApp={openApp}
              settingsSection={settingsSection}
              setSettingsSection={setSettingsSection}
            />
          ))}
          <MenuBar
            activeApp={activeApp}
            overlay={overlay}
            onOverlay={setOverlay}
            lowPower={lowPower}
            doNotDisturb={systemPreferences.doNotDisturb}
            setDoNotDisturb={(value) => updateSystemPreferences({ doNotDisturb: value })}
          />
          {overlay === OverlayId.APPLE ? (
            <AppleMenu
              openApp={openApp}
              openSettings={() => openSettings(SettingsSectionId.APPEARANCE)}
              lock={() => {
                setShowDesktop(false);
                setLoggedIn(false);
                setOverlay(null);
              }}
              sleep={() => {
                setOverlay(null);
                setPowerState(PowerState.SLEEPING);
              }}
              forceQuit={() => {
                setOverlay(null);
                setSystemDialog(SystemDialogId.FORCE_QUIT);
              }}
              restart={() => {
                setOverlay(null);
                setLoggedIn(false);
                setBootMode(BootMode.RESTART);
              }}
              shutDown={() => {
                setOverlay(null);
                setLoggedIn(false);
                setPowerState(PowerState.SHUTDOWN);
              }}
            />
          ) : null}
          {overlay === OverlayId.FILE ? <FileMenu openApp={openApp} /> : null}
          {overlay === OverlayId.EDIT ? <EditMenu close={closeOverlay} /> : null}
          {overlay === OverlayId.VIEW ? (
            <ViewMenu
              preferences={finderPreferences}
              updatePreferences={updateFinderPreferences}
              maximize={maximizeActiveWindow}
              close={closeOverlay}
            />
          ) : null}
          {overlay === OverlayId.GO ? <GoMenu openApp={openApp} close={closeOverlay} /> : null}
          {overlay === OverlayId.WINDOW ? (
            <WindowMenu
              window={activeWindow}
              minimize={minimizeActiveWindow}
              maximize={maximizeActiveWindow}
              bringToFront={focusActiveWindow}
            />
          ) : null}
          {overlay === OverlayId.HELP ? <HelpMenu openApp={openApp} close={closeOverlay} /> : null}
          {overlay === OverlayId.WIFI ? <WifiMenu openSettings={openSettings} /> : null}
          {overlay === OverlayId.BATTERY ? (
            <BatteryMenu
              openSettings={openSettings}
              lowPower={lowPower}
              setLowPower={setLowPower}
            />
          ) : null}
          {overlay === OverlayId.SIRI ? <SiriMenu openApp={openApp} /> : null}
          {overlay === OverlayId.CONTROL ? (
            <ControlCenter
              dark={dark}
              setDark={setDark}
              brightness={brightness}
              setBrightness={setBrightness}
              doNotDisturb={systemPreferences.doNotDisturb}
              setDoNotDisturb={(value) => updateSystemPreferences({ doNotDisturb: value })}
              volume={systemPreferences.volume}
              setVolume={(value) => updateSystemPreferences({ volume: value })}
            />
          ) : null}
          {overlay === OverlayId.NOTIFICATIONS ? (
            <NotificationCenter doNotDisturb={systemPreferences.doNotDisturb} />
          ) : null}
          {overlay === OverlayId.SPOTLIGHT ? (
            <Spotlight openApp={openApp} close={closeOverlay} />
          ) : null}
          {overlay === OverlayId.LAUNCHPAD ? (
            <Launchpad openApp={openApp} close={closeOverlay} />
          ) : null}
          {systemDialog === SystemDialogId.FORCE_QUIT ? (
            <ForceQuitDialog
              windows={windows}
              onQuit={closeWindow}
              onClose={() => setSystemDialog(null)}
            />
          ) : null}
          <DockHotzone />
          <Dock
            windows={windows}
            launch={launch}
            size={systemPreferences.dockSize}
            showRecentApps={systemPreferences.showRecentApps}
          />
          <DisplayDimmer brightness={brightness} />
        </>
      )}
    </DesktopShell>
  );
}
