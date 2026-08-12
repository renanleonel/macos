import { TerminalCommand } from '@/features/terminal/domain/enums/terminal-command';
import { APPLICATION_REGISTRY } from '@/shared/domain/constants/application-registry';
import { AppId } from '@/shared/domain/enums/app-id';

/**
 * Commands that launch an app rather than printing to the shell. The content
 * already lives in a window, so echoing it here would only duplicate it.
 */
export const TERMINAL_COMMAND_APPS: Partial<Record<TerminalCommand, AppId>> = {
  [TerminalCommand.ABOUT]: AppId.ABOUT,
  [TerminalCommand.EXPERIENCE]: AppId.PREVIEW,
  [TerminalCommand.PROJECTS]: AppId.SAFARI,
  [TerminalCommand.RESUME]: AppId.PREVIEW,
};

export function terminalCommandAppLabel(app: AppId) {
  return APPLICATION_REGISTRY[app].label;
}
