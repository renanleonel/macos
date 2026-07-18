import { createContext, type Dispatch, type SetStateAction } from 'react';

import type { BootMode } from '@/features/desktop/domain/enums/boot-mode';
import type { PowerState } from '@/features/desktop/domain/enums/power-state';
import type { SystemDialogId } from '@/features/desktop/domain/enums/system-dialog-id';

export type DesktopSessionActions = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setBootMode: Dispatch<SetStateAction<BootMode | null>>;
  setPowerState: Dispatch<SetStateAction<PowerState>>;
  setSystemDialog: Dispatch<SetStateAction<SystemDialogId | null>>;
};

export const DesktopSessionActionsContext = createContext<DesktopSessionActions | null>(null);
