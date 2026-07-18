import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

import {
  readAccentColor,
  writeAccentColor,
} from '@/features/desktop/adapters/accent-color-storage';
import { readBrightness, writeBrightness } from '@/features/desktop/adapters/brightness-storage';
import {
  readSystemPreferences,
  writeSystemPreferences,
} from '@/features/desktop/adapters/system-preferences-storage';
import {
  DesktopAppearanceActionsContext,
  type DesktopAppearanceActions,
} from '@/features/desktop/contexts/desktop-appearance-actions-context';
import { DesktopAppearanceStateContext } from '@/features/desktop/contexts/desktop-appearance-state-context';
import {
  DesktopInteractionActionsContext,
  type DesktopInteractionActions,
} from '@/features/desktop/contexts/desktop-interaction-actions-context';
import { DesktopInteractionStateContext } from '@/features/desktop/contexts/desktop-interaction-state-context';
import {
  DesktopSessionActionsContext,
  type DesktopSessionActions,
} from '@/features/desktop/contexts/desktop-session-actions-context';
import { DesktopSessionStateContext } from '@/features/desktop/contexts/desktop-session-state-context';
import type { AccentColorId } from '@/features/desktop/domain/enums/accent-color-id';
import { BootMode } from '@/features/desktop/domain/enums/boot-mode';
import type { DesktopFileId } from '@/features/desktop/domain/enums/desktop-file-id';
import { PowerState } from '@/features/desktop/domain/enums/power-state';
import type { SystemDialogId } from '@/features/desktop/domain/enums/system-dialog-id';
import type { DesktopAppearanceState } from '@/features/desktop/domain/models/desktop-appearance-state';
import type { DesktopInteractionState } from '@/features/desktop/domain/models/desktop-interaction-state';
import type { DesktopSessionState } from '@/features/desktop/domain/models/desktop-session-state';
import type { Overlay } from '@/features/desktop/domain/models/overlay';
import type { SystemPreferences } from '@/features/desktop/domain/models/system-preferences';
import { useBootCompletion } from '@/features/desktop/hooks/use-boot-completion';

type DesktopProviderProps = {
  children: ReactNode;
};

export function DesktopProvider({ children }: DesktopProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [dark, setDark] = useState(false);
  const [accentColor, setAccentColorState] = useState<AccentColorId>(readAccentColor);
  const [lowPower, setLowPower] = useState(false);
  const [systemPreferences, setSystemPreferences] =
    useState<SystemPreferences>(readSystemPreferences);
  const systemPreferencesRef = useRef(systemPreferences);
  const [brightness, setBrightnessState] = useState(readBrightness);
  const [showDesktop, setShowDesktop] = useState(false);
  const [selectedDesktopFile, setSelectedDesktopFile] = useState<DesktopFileId | null>(null);
  const [bootMode, setBootMode] = useState<BootMode | null>(BootMode.STARTUP);
  const [powerState, setPowerState] = useState<PowerState>(PowerState.AWAKE);
  const [systemDialog, setSystemDialog] = useState<SystemDialogId | null>(null);

  useLayoutEffect(() => {
    systemPreferencesRef.current = systemPreferences;
  }, [systemPreferences]);

  const setAccentColor = (value: AccentColorId) => {
    setAccentColorState(value);
    writeAccentColor(value);
  };
  const updateSystemPreferences = (patch: Partial<SystemPreferences>) => {
    const next = { ...systemPreferencesRef.current, ...patch };
    setSystemPreferences(next);
    writeSystemPreferences(next);
  };
  const setBrightness = (value: number) => {
    setBrightnessState(value);
    writeBrightness(value);
  };
  const completeBoot = () => setBootMode(null);

  useBootCompletion(bootMode, completeBoot);

  const appearanceState: DesktopAppearanceState = {
    dark,
    accentColor,
    lowPower,
    systemPreferences,
    brightness,
  };
  const appearanceActions: DesktopAppearanceActions = {
    setDark,
    setAccentColor,
    setLowPower,
    updateSystemPreferences,
    setBrightness,
  };
  const sessionState: DesktopSessionState = { loggedIn, bootMode, powerState, systemDialog };
  const sessionActions: DesktopSessionActions = {
    setLoggedIn,
    setBootMode,
    setPowerState,
    setSystemDialog,
  };
  const interactionState: DesktopInteractionState = {
    overlay,
    showDesktop,
    selectedDesktopFile,
  };
  const interactionActions: DesktopInteractionActions = {
    setOverlay,
    setShowDesktop,
    setSelectedDesktopFile,
  };

  return (
    <DesktopSessionActionsContext value={sessionActions}>
      <DesktopSessionStateContext value={sessionState}>
        <DesktopAppearanceActionsContext value={appearanceActions}>
          <DesktopAppearanceStateContext value={appearanceState}>
            <DesktopInteractionActionsContext value={interactionActions}>
              <DesktopInteractionStateContext value={interactionState}>
                {children}
              </DesktopInteractionStateContext>
            </DesktopInteractionActionsContext>
          </DesktopAppearanceStateContext>
        </DesktopAppearanceActionsContext>
      </DesktopSessionStateContext>
    </DesktopSessionActionsContext>
  );
}
