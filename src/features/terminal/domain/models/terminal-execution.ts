import type { AppId } from '@/shared/domain/enums/app-id';

export type TerminalExecution = {
  linesToAppend: string[];
  clearLines: boolean;
  command: string;
  /** Set when the command should launch an app instead of printing output. */
  appToOpen: AppId | null;
};
