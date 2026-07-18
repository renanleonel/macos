import { useCallback, useMemo, useState, type ReactNode } from 'react';

import {
  SettingsActionsContext,
  type SettingsActionsContextValue,
} from '@/features/settings/contexts/settings-actions-context';
import {
  SettingsStateContext,
  type SettingsStateContextValue,
} from '@/features/settings/contexts/settings-state-context';
import { SETTINGS_PANEL_COPY } from '@/features/settings/domain/constants/settings-panel-copy';
import type { SettingsControlId } from '@/features/settings/domain/enums/settings-control-id';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';

type SettingsProviderProps = {
  children: ReactNode;
  selectedSection: SettingsSectionId;
  setSelectedSection: (section: SettingsSectionId) => void;
};

function createInitialToggleValues(): Record<SettingsControlId, boolean> {
  return Object.fromEntries(
    Object.values(SETTINGS_PANEL_COPY).flatMap((panel) =>
      panel.controls.map((control) => [control.id, control.defaultChecked]),
    ),
  ) as Record<SettingsControlId, boolean>;
}

export function SettingsProvider({
  children,
  selectedSection,
  setSelectedSection,
}: SettingsProviderProps) {
  const [accentOpen, setAccentOpen] = useState(false);
  const [toggleValues, setToggleValues] = useState(createInitialToggleValues);

  const selectSection = useCallback(
    (section: SettingsSectionId) => {
      setSelectedSection(section);
      setAccentOpen(false);
    },
    [setSelectedSection],
  );
  const toggleAccentPicker = useCallback(() => {
    setAccentOpen((open) => !open);
  }, []);
  const closeAccentPicker = useCallback(() => {
    setAccentOpen(false);
  }, []);
  const toggleLocalSetting = useCallback((controlId: SettingsControlId) => {
    setToggleValues((current) => ({
      ...current,
      [controlId]: !current[controlId],
    }));
  }, []);

  const state = useMemo<SettingsStateContextValue>(
    () => ({ selectedSection, accentOpen, toggleValues }),
    [accentOpen, selectedSection, toggleValues],
  );
  const actions = useMemo<SettingsActionsContextValue>(
    () => ({
      selectSection,
      toggleAccentPicker,
      closeAccentPicker,
      toggleLocalSetting,
    }),
    [closeAccentPicker, selectSection, toggleAccentPicker, toggleLocalSetting],
  );

  return (
    <SettingsActionsContext value={actions}>
      <SettingsStateContext value={state}>{children}</SettingsStateContext>
    </SettingsActionsContext>
  );
}
