import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type MenuCommandProps = {
  children: ReactNode;
  shortcut?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function MenuCommand({
  children,
  shortcut,
  checked = false,
  disabled = false,
  onClick,
}: MenuCommandProps) {
  return (
    <button type='button' disabled={disabled} onClick={onClick}>
      <span
        className={cn(
          'menu-command__label',
          '[&.menu-command\\_\\_label]:min-w-0 [&.menu-command\\_\\_label]:flex [&.menu-command\\_\\_label]:items-center [&.menu-command\\_\\_label]:gap-1',
          '[&.menu-command\\_\\_label_>_i]:w-3.5 [&.menu-command\\_\\_label_>_i]:h-3.5 [&.menu-command\\_\\_label_>_i]:grid [&.menu-command\\_\\_label_>_i]:place-items-center [&.menu-command\\_\\_label_>_i]:-ml-0.75',
        )}
      >
        <i>{checked ? <Check size={12} strokeWidth={2.5} /> : null}</i>
        {children}
      </span>
      {shortcut ? <kbd>{shortcut}</kbd> : null}
    </button>
  );
}
