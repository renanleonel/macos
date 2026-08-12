import type { FormEvent, RefObject } from 'react';

import { cn } from '@/shared/utils/cn';
import { PROFILE } from '@/shared/domain/constants/profile';

type TerminalContentProps = {
  lines: string[];
  command: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onCommandChange: (command: string) => void;
  onSubmit: (event: FormEvent) => void;
  onFocusRequest: () => void;
};

export function TerminalContent({
  lines,
  command,
  inputRef,
  onCommandChange,
  onSubmit,
  onFocusRequest,
}: TerminalContentProps) {
  return (
    <div
      className={cn(
        'terminal-app',
        "[&.terminal-app]:h-full [&.terminal-app]:p-[13px_15px] [&.terminal-app]:overflow-auto [&.terminal-app]:text-[oklch(0.89_0.02_145)] [&.terminal-app]:[background:oklch(0.09_0.01_250/0.95)] [&.terminal-app]:[font:13px/1.55_'SFMono-Regular',Consolas,'Liberation_Mono',monospace] [&.terminal-app]:[user-select:text]",
        '[&.terminal-app_form]:flex [&.terminal-app_form]:gap-1.75',
        '[&.terminal-app_b]:text-[oklch(0.75_0.16_150)]',
        '[&.terminal-app_input]:min-w-0 [&.terminal-app_input]:flex-1 [&.terminal-app_input]:[border:0] [&.terminal-app_input]:[outline:0] [&.terminal-app_input]:text-[oklch(0.93_0.01_250)] [&.terminal-app_input]:[background:transparent] [&.terminal-app_input]:caret-[white]',
      )}
      role='region'
      aria-label='Terminal output'
      onPointerDown={onFocusRequest}
      onClick={onFocusRequest}
    >
      {/* `pre-wrap` keeps the column alignment in multi-field output such as
          `contact` and `experience`, while still wrapping narrow windows. */}
      {lines.map((line, index) => (
        <div className='whitespace-pre-wrap' key={`${line}-${index}`}>
          {line}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <span>
          <b>{`${PROFILE.shellUser}@${PROFILE.shellHost}`}</b> ~ %
        </span>
        <input
          ref={inputRef}
          autoFocus
          aria-label='Terminal command'
          value={command}
          onChange={(event) => onCommandChange(event.target.value)}
          spellCheck={false}
        />
      </form>
    </div>
  );
}
