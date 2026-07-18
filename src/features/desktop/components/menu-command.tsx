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
          'min-w-0 flex items-center gap-1 whitespace-nowrap',
        )}
      >
        <i className='w-3.5 h-3.5 grid place-items-center -ml-0.75 flex-none'>
          {checked ? <Check size={12} strokeWidth={2.5} /> : null}
        </i>
        {children}
      </span>
      {shortcut ? <kbd>{shortcut}</kbd> : null}
    </button>
  );
}
