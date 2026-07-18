import { TERMINAL_COMMAND_OUTPUT } from '@/features/terminal/domain/constants/terminal-command-output';
import { TerminalCommand } from '@/features/terminal/domain/enums/terminal-command';
import type { TerminalExecution } from '@/features/terminal/domain/models/terminal-execution';

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

  if (normalizedCommand === TerminalCommand.CLEAR) {
    return { linesToAppend: [], clearLines: true, command: '' };
  }

  const commandOutput =
    normalizedCommand === TerminalCommand.DATE
      ? [currentDate.toString()]
      : TERMINAL_COMMAND_OUTPUT[normalizedCommand as TerminalCommand];

  return {
    linesToAppend: [
      `renan@portfolio ~ % ${command}`,
      ...(commandOutput ?? [`zsh: command not found: ${command}`]),
    ],
    clearLines: false,
    command: '',
  };
}
