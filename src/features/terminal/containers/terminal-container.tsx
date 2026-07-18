import { useRef, useState, type FormEvent } from 'react';

import { scheduleInputFocus } from '@/features/terminal/adapters/schedule-input-focus';
import { TerminalContent } from '@/features/terminal/components/terminal-content';
import { INITIAL_TERMINAL_LINES } from '@/features/terminal/domain/constants/initial-terminal-lines';
import { executeTerminalCommand } from '@/features/terminal/domain/execute-terminal-command';

export function TerminalContainer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [lines, setLines] = useState<string[]>(INITIAL_TERMINAL_LINES);
  const [command, setCommand] = useState('');
  const currentDate = new Date();

  const submitCommand = (event: FormEvent) => {
    event.preventDefault();
    const execution = executeTerminalCommand({
      command,
      currentDate,
    });

    if (!execution) return;

    if (execution.clearLines) setLines([]);
    else setLines((currentLines) => [...currentLines, ...execution.linesToAppend]);
    setCommand(execution.command);
    scheduleInputFocus(() => inputRef.current);
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <TerminalContent
      lines={lines}
      command={command}
      inputRef={inputRef}
      onCommandChange={setCommand}
      onSubmit={submitCommand}
      onFocusRequest={focusInput}
    />
  );
}
