import type { BootMode } from '@/features/desktop/domain/enums/boot-mode';
import type { PowerState } from '@/features/desktop/domain/enums/power-state';
import type { SystemDialogId } from '@/features/desktop/domain/enums/system-dialog-id';

export type DesktopSessionState = {
  loggedIn: boolean;
  bootMode: BootMode | null;
  powerState: PowerState;
  systemDialog: SystemDialogId | null;
};
