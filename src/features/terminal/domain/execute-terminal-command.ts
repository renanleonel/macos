import {
  TERMINAL_COMMAND_APPS,
  terminalCommandAppLabel,
} from '@/features/terminal/domain/constants/terminal-command-apps';
import { TERMINAL_COMMAND_OUTPUT } from '@/features/terminal/domain/constants/terminal-command-output';
import { TerminalCommand } from '@/features/terminal/domain/enums/terminal-command';
import type { TerminalExecution } from '@/features/terminal/domain/models/terminal-execution';
import { PROFILE } from '@/shared/domain/constants/profile';

type ExecuteTerminalCommandInput = {
  command: string;
  currentDate: Date;
};

export function executeTerminalCommand({
  command,
  currentDate,
}: ExecuteTerminalCommandInput): TerminalExecution | null {
  const normalizedCommand = command.trim().toLowerCase();

  if (!normalizedCommand) return null;

  const prompt = `${PROFILE.shellUser}@${PROFILE.shellHost} ~ % ${command}`;

  if (normalizedCommand === TerminalCommand.CLEAR) {
    return { linesToAppend: [], clearLines: true, command: '', appToOpen: null };
  }

  // Some commands launch the window that already holds the content, and echo a
  // single line so the shell still shows that something happened.
  const appToOpen = TERMINAL_COMMAND_APPS[normalizedCommand as TerminalCommand];
  if (appToOpen) {
    return {
      linesToAppend: [prompt, `Opening ${terminalCommandAppLabel(appToOpen)}…`],
      clearLines: false,
      command: '',
      appToOpen,
    };
  }

  const commandOutput =
    normalizedCommand === TerminalCommand.DATE
      ? [currentDate.toString()]
      : TERMINAL_COMMAND_OUTPUT[normalizedCommand as TerminalCommand];

  return {
    linesToAppend: [prompt, ...(commandOutput ?? [`zsh: command not found: ${command}`])],
    clearLines: false,
    command: '',
    appToOpen: null,
  };
}
